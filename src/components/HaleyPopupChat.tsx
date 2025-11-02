import React, { useState, useEffect, useRef } from 'react';
import { X, MessageCircle, Heart, Sparkles, Send, Paperclip, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import haleyNew from '@/assets/haley-new.jpg';
import { useChatMessages } from '@/hooks/useChatMessages';
import { useMessageLimit } from '@/hooks/useMessageLimit';
import MessageLimitBadge from '@/components/MessageLimitBadge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface HaleyPopupChatProps {
  isOpen?: boolean;
  onClose?: () => void;
}

interface LocalMessage {
  id: string;
  text?: string;
  imageUrl?: string;
  fileName?: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  session_id?: string;
}

const HaleyPopupChat = ({ isOpen: propIsOpen, onClose }: HaleyPopupChatProps) => {
  const [isOpen, setIsOpen] = useState(propIsOpen ?? false);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [showGreeting, setShowGreeting] = useState(true);
  const [inputMessage, setInputMessage] = useState('');
  const [currentSessionId, setCurrentSessionId] = useState<string | undefined>();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const { messages, saveMessage, addLocalMessage, setMessages } = useChatMessages(currentSessionId);
  const { remainingMessages, canSendMessage, incrementCount, loading: limitLoading } = useMessageLimit();

  const greetingMessages = [
    "Hello! I'm your Haley Assistant 💫",
    "I can help you with anything! ✨",
    "Want to discover some anime magic? 🌸",
    "Let's create something beautiful together! 💖",
    "I'm here whenever you need me! 🌟"
  ];

  useEffect(() => {
    if (propIsOpen !== undefined) {
      setIsOpen(propIsOpen);
    }
  }, [propIsOpen]);

  // Check authentication and create session
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setIsAuthenticated(!!user);

      if (user && isOpen && !currentSessionId) {
        // Create a new chat session
        const { data, error } = await supabase
          .from('haley_chat_sessions')
          .insert({
            user_id: user.id,
            session_name: 'New Chat',
          })
          .select()
          .single();

        if (!error && data) {
          setCurrentSessionId(data.id);
        }
      }
    };

    if (isOpen) {
      checkAuth();
      const interval = setInterval(() => {
        setCurrentMessage((prev) => (prev + 1) % greetingMessages.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Check if user can send message (limit check)
    if (isAuthenticated && !canSendMessage) {
      toast({
        title: 'Message Limit Reached',
        description: 'You\'ve reached your daily limit of 5 messages. Messages will reset in 24 hours!',
        variant: 'destructive',
      });
      return;
    }

    const userText = inputMessage;
    setInputMessage('');

    // Add user message to UI immediately
    const localUserMsg: LocalMessage = {
      id: Date.now().toString(),
      text: userText,
      role: 'user',
      timestamp: new Date(),
    };
    addLocalMessage(localUserMsg);

    // Increment message count if authenticated
    if (isAuthenticated) {
      const success = await incrementCount();
      if (!success) return;
      
      // Save to database
      await saveMessage(userText, 'user', currentSessionId);
    }

    // Auto-reply from Haley
    setTimeout(async () => {
      const haleyResponse = "Thanks for your message! I'm here to help you with anything you need! 🌸✨";
      const localHaleyMsg: LocalMessage = {
        id: (Date.now() + 1).toString(),
        text: haleyResponse,
        role: 'assistant',
        timestamp: new Date(),
      };
      addLocalMessage(localHaleyMsg);

      // Save Haley's response if authenticated
      if (isAuthenticated) {
        await saveMessage(haleyResponse, 'assistant', currentSessionId);
      }
    }, 1000);
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        const imgMessage: LocalMessage = {
          id: Date.now().toString(),
          imageUrl: url,
          fileName: file.name,
          role: 'user',
          timestamp: new Date()
        };
        addLocalMessage(imgMessage);
      } else {
        const fileMessage: LocalMessage = {
          id: Date.now().toString(),
          text: `📎 Shared file: ${file.name}`,
          fileName: file.name,
          role: 'user',
          timestamp: new Date()
        };
        addLocalMessage(fileMessage);
      }
      
      // Haley's response to file
      setTimeout(() => {
        const haleyResponse: LocalMessage = {
          id: (Date.now() + 1).toString(),
          text: "Thanks for sharing! I can preview images and note files. How can I help with this? 🌟",
          role: 'assistant',
          timestamp: new Date()
        };
        addLocalMessage(haleyResponse);
      }, 1000);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 animate-fade-in flex items-center justify-center p-4">
      <div className="w-full max-w-4xl h-[90vh] glass-card animate-scale-in flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-neon-blue">
              <img 
                src={haleyNew} 
                alt="Haley Assistant" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-neon-green rounded-full border-2 border-background"></div>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">Haley Assistant</h3>
              <p className="text-xs text-neon-green">● Online</p>
            </div>
            {isAuthenticated && !limitLoading && (
              <MessageLimitBadge remaining={remainingMessages} />
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="hover:bg-destructive/10"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Chat Content */}
        <div className="flex-1 p-6 space-y-4 overflow-y-auto">
          {/* Greeting Message */}
          {showGreeting && messages.length === 0 && (
            <div className="flex items-start space-x-3 animate-fade-in">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-neon-blue flex-shrink-0">
                <img 
                  src={haleyNew} 
                  alt="Haley" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="glass-card p-3 rounded-lg max-w-[280px]">
                <p className="text-sm">{greetingMessages[currentMessage]}</p>
                {!isAuthenticated && (
                  <p className="text-xs text-muted-foreground mt-2">
                    💡 Sign in to save your conversations and get 5 free messages daily!
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Chat Messages */}
          {messages.map((message) => (
            <div key={message.id} className={`flex items-start space-x-3 animate-fade-in ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              {message.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full overflow-hidden border border-neon-blue flex-shrink-0">
                  <img 
                    src={haleyNew} 
                    alt="Haley" 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className={`glass-card p-3 rounded-lg max-w-[280px] ${message.role === 'user' ? 'bg-neon-blue/15' : ''}`}>
                {message.imageUrl ? (
                  <div className="space-y-2">
                    <img src={message.imageUrl} alt={message.fileName || 'shared image'} className="rounded-md max-h-48 object-cover" />
                    {message.fileName && <p className="text-xs text-muted-foreground">{message.fileName}</p>}
                  </div>
                ) : (
                  <p className="text-sm">{message.text}</p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-border flex-shrink-0">
          <div className="flex items-end space-x-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={handleFileUpload}
              className="hover:bg-accent/10"
            >
              <Paperclip className="w-5 h-5" />
            </Button>
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1 bg-background/50"
            />
            <Button
              onClick={handleSendMessage}
              className="rounded-full px-4 py-2 bg-gradient-to-r from-neon-blue to-neon-green text-primary-foreground shadow-md hover:opacity-90"
              disabled={!inputMessage.trim() || (isAuthenticated && !canSendMessage)}
              title={!canSendMessage ? 'Message limit reached' : ''}
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HaleyPopupChat;