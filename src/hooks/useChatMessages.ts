import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text?: string;
  imageUrl?: string;
  fileName?: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  session_id?: string;
}

export const useChatMessages = (sessionId?: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Load messages for a session
  const loadMessages = async (sid: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('haley_messages')
        .select('*')
        .eq('session_id', sid)
        .order('created_at', { ascending: true });

      if (error) throw error;

      const formattedMessages: Message[] = (data || []).map(msg => ({
        id: msg.id,
        text: msg.content,
        role: msg.role as 'user' | 'assistant',
        timestamp: new Date(msg.created_at!),
        session_id: msg.session_id || undefined,
      }));

      setMessages(formattedMessages);
    } catch (error) {
      console.error('Error loading messages:', error);
      toast({
        title: 'Error',
        description: 'Failed to load messages',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Save a message to database
  const saveMessage = async (text: string, role: 'user' | 'assistant', sid?: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('haley_messages')
        .insert({
          user_id: user.id,
          content: text,
          role: role,
          session_id: sid,
        })
        .select()
        .single();

      if (error) throw error;

      // Add to local state
      const newMessage: Message = {
        id: data.id,
        text: text,
        role: role,
        timestamp: new Date(data.created_at!),
        session_id: sid,
      };

      setMessages(prev => [...prev, newMessage]);

      // Update session last_message_at
      if (sid) {
        await supabase
          .from('haley_chat_sessions')
          .update({ last_message_at: new Date().toISOString() })
          .eq('id', sid);
      }

      return newMessage;
    } catch (error) {
      console.error('Error saving message:', error);
      toast({
        title: 'Error',
        description: 'Failed to save message',
        variant: 'destructive',
      });
      return null;
    }
  };

  // Add message to local state only (for immediate UI update)
  const addLocalMessage = (message: Message) => {
    setMessages(prev => [...prev, message]);
  };

  useEffect(() => {
    if (sessionId) {
      loadMessages(sessionId);
    }
  }, [sessionId]);

  return {
    messages,
    loading,
    saveMessage,
    addLocalMessage,
    loadMessages,
    setMessages,
  };
};
