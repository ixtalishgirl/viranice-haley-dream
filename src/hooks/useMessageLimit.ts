import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useMessageLimit = () => {
  const [remainingMessages, setRemainingMessages] = useState<number>(5);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const checkLimit = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setRemainingMessages(5); // Default for non-authenticated
        setLoading(false);
        return;
      }

      const { data, error } = await supabase.rpc('get_remaining_messages', {
        user_uuid: user.id,
      });

      if (error) throw error;

      setRemainingMessages(data || 5);
    } catch (error) {
      console.error('Error checking message limit:', error);
      setRemainingMessages(5);
    } finally {
      setLoading(false);
    }
  };

  const incrementCount = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return false;

      // Check if user can send
      const { data: canSend } = await supabase.rpc('check_message_limit', {
        user_uuid: user.id,
      });

      if (!canSend) {
        toast({
          title: 'Message Limit Reached',
          description: 'You\'ve reached your daily limit of 5 messages. Upgrade to Pro for unlimited messages!',
          variant: 'destructive',
        });
        return false;
      }

      // Increment count
      const { error } = await supabase.rpc('increment_message_count', {
        user_uuid: user.id,
      });

      if (error) throw error;

      // Refresh remaining count
      await checkLimit();
      return true;
    } catch (error) {
      console.error('Error incrementing message count:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message',
        variant: 'destructive',
      });
      return false;
    }
  };

  useEffect(() => {
    checkLimit();

    // Set up realtime subscription for limit changes
    const channel = supabase
      .channel('chat_limits')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'haley_chat_limits',
        },
        () => {
          checkLimit();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    remainingMessages,
    loading,
    canSendMessage: remainingMessages > 0,
    incrementCount,
    checkLimit,
  };
};
