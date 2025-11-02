-- Create chat limits table for message tracking
CREATE TABLE public.haley_chat_limits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.haley_users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  messages_sent int DEFAULT 0 NOT NULL,
  limit_reset_at timestamptz DEFAULT (now() + interval '24 hours') NOT NULL,
  plan_type text DEFAULT 'free' NOT NULL CHECK (plan_type IN ('free', 'pro', 'premium')),
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Enable RLS on chat limits
ALTER TABLE public.haley_chat_limits ENABLE ROW LEVEL SECURITY;

-- RLS policies for chat limits
CREATE POLICY "Users can view their own limits"
ON public.haley_chat_limits FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own limits"
ON public.haley_chat_limits FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own limits"
ON public.haley_chat_limits FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

-- Create chat sessions table for organizing conversations
CREATE TABLE public.haley_chat_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.haley_users(id) ON DELETE CASCADE NOT NULL,
  session_name text NOT NULL DEFAULT 'New Chat',
  created_at timestamptz DEFAULT now() NOT NULL,
  last_message_at timestamptz DEFAULT now() NOT NULL
);

-- Enable RLS on chat sessions
ALTER TABLE public.haley_chat_sessions ENABLE ROW LEVEL SECURITY;

-- RLS policies for chat sessions
CREATE POLICY "Users can view their own sessions"
ON public.haley_chat_sessions FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own sessions"
ON public.haley_chat_sessions FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own sessions"
ON public.haley_chat_sessions FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own sessions"
ON public.haley_chat_sessions FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Add session_id to haley_messages
ALTER TABLE public.haley_messages 
ADD COLUMN session_id uuid REFERENCES public.haley_chat_sessions(id) ON DELETE CASCADE;

-- Create index for faster queries
CREATE INDEX idx_messages_session_id ON public.haley_messages(session_id);
CREATE INDEX idx_messages_user_created ON public.haley_messages(user_id, created_at DESC);
CREATE INDEX idx_sessions_user_updated ON public.haley_chat_sessions(user_id, last_message_at DESC);

-- Function to check if user has reached message limit
CREATE OR REPLACE FUNCTION public.check_message_limit(user_uuid uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(
    (SELECT messages_sent < 5 
     FROM public.haley_chat_limits 
     WHERE user_id = user_uuid 
     AND plan_type = 'free'
     AND limit_reset_at > now()),
    true
  );
$$;

-- Function to increment message count
CREATE OR REPLACE FUNCTION public.increment_message_count(user_uuid uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.haley_chat_limits (user_id, messages_sent, limit_reset_at)
  VALUES (user_uuid, 1, now() + interval '24 hours')
  ON CONFLICT (user_id) 
  DO UPDATE SET 
    messages_sent = CASE 
      WHEN haley_chat_limits.limit_reset_at < now() THEN 1
      ELSE haley_chat_limits.messages_sent + 1
    END,
    limit_reset_at = CASE
      WHEN haley_chat_limits.limit_reset_at < now() THEN now() + interval '24 hours'
      ELSE haley_chat_limits.limit_reset_at
    END;
END;
$$;

-- Function to get remaining messages
CREATE OR REPLACE FUNCTION public.get_remaining_messages(user_uuid uuid)
RETURNS int
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(
    (SELECT 
      CASE 
        WHEN limit_reset_at < now() THEN 5
        ELSE GREATEST(0, 5 - messages_sent)
      END
     FROM public.haley_chat_limits 
     WHERE user_id = user_uuid 
     AND plan_type = 'free'),
    5
  );
$$;