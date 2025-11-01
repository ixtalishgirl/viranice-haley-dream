-- ============================================
-- HALEY DREAMLAND DATABASE SCHEMA
-- ============================================

-- Create haley_users table
CREATE TABLE IF NOT EXISTS public.haley_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  username TEXT,
  display_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create haley_messages table (chat archive)
CREATE TABLE IF NOT EXISTS public.haley_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.haley_users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  content_plain TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create haley_thumbnails table
CREATE TABLE IF NOT EXISTS public.haley_thumbnails (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  user_id UUID REFERENCES public.haley_users(id) ON DELETE CASCADE,
  video_title TEXT,
  prompt TEXT,
  model_used TEXT,
  thumbnail_url TEXT,
  language TEXT DEFAULT 'en',
  rating INT DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  is_public BOOLEAN DEFAULT false,
  views INT DEFAULT 0,
  tags TEXT[],
  ai_feedback TEXT,
  uuid UUID DEFAULT gen_random_uuid() UNIQUE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_haley_messages_user_id ON public.haley_messages(user_id);
CREATE INDEX IF NOT EXISTS idx_haley_messages_created_at ON public.haley_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_haley_thumbnails_user_id ON public.haley_thumbnails(user_id);
CREATE INDEX IF NOT EXISTS idx_haley_thumbnails_is_public ON public.haley_thumbnails(is_public);
CREATE INDEX IF NOT EXISTS idx_haley_thumbnails_created_at ON public.haley_thumbnails(created_at DESC);

-- ============================================
-- STORAGE BUCKET
-- ============================================

-- Create storage bucket for thumbnails
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'haley-thumbnails',
  'haley-thumbnails',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE public.haley_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.haley_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.haley_thumbnails ENABLE ROW LEVEL SECURITY;

-- haley_users policies
CREATE POLICY "users_select_own" ON public.haley_users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "users_insert_authenticated" ON public.haley_users
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "users_update_own" ON public.haley_users
  FOR UPDATE USING (auth.uid() = id);

-- haley_messages policies
CREATE POLICY "messages_select_own" ON public.haley_messages
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "messages_insert_own" ON public.haley_messages
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "messages_update_own" ON public.haley_messages
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "messages_delete_own" ON public.haley_messages
  FOR DELETE USING (auth.uid() = user_id);

-- haley_thumbnails policies
CREATE POLICY "thumbnails_select_public_or_own" ON public.haley_thumbnails
  FOR SELECT USING (is_public = true OR auth.uid() = user_id);

CREATE POLICY "thumbnails_insert_own" ON public.haley_thumbnails
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "thumbnails_update_own" ON public.haley_thumbnails
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "thumbnails_delete_own" ON public.haley_thumbnails
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- STORAGE POLICIES
-- ============================================

-- Allow authenticated users to upload their own files
CREATE POLICY "Users can upload thumbnails"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'haley-thumbnails' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Allow users to update their own files
CREATE POLICY "Users can update own thumbnails"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'haley-thumbnails' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Allow users to delete their own files
CREATE POLICY "Users can delete own thumbnails"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'haley-thumbnails' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Allow public read access to all thumbnails (since bucket is public)
CREATE POLICY "Public can view all thumbnails"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'haley-thumbnails');

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Function to auto-create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.haley_users (id, email, username, display_name)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
    COALESCE(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1))
  );
  RETURN new;
END;
$$;

-- Trigger to create user profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to increment view count
CREATE OR REPLACE FUNCTION public.increment_thumbnail_views(thumbnail_uuid UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.haley_thumbnails
  SET views = views + 1
  WHERE uuid = thumbnail_uuid;
END;
$$;