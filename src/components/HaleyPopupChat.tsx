import React, { useState, useEffect, useRef } from 'react';
import { X, MessageCircle, Heart, Sparkles, Send, Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import haleyNew from '@/assets/haley-new.jpg';

interface HaleyPopupChatProps {
  isOpen?: boolean;
  onClose?: () => void;
}

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const HaleyPopupChat = ({ isOpen: propIsOpen, onClose }: HaleyPopupChatProps) => {
  const [isOpen, setIsOpen] = useState(propIsOpen ?? false);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [showGreeting, setShowGreeting] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const greetingMessages = [
    "Hello! I'm your Haley Assistant 💫",
    "I can help you explore amazing tools! ✨",
    "Want to discover some anime magic? 🌸",
    "Let's create something beautiful together! 💖",
    "I'm here whenever you need me! 🌟"
  ];

  useEffect(() => {
    if (propIsOpen !== undefined) {
      setIsOpen(propIsOpen);
    }
  }, [propIsOpen]);

  useEffect(() => {
    if (isOpen) {
      setShowGreeting(true);
      const interval = setInterval(() => {
        setCurrentMessage((prev) => (prev + 1) % greetingMessages.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage: Message = {
        id: Date.now(),
        text: inputMessage,
        isUser: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newMessage]);
      setInputMessage('');
      
      // Auto-reply from Haley
      setTimeout(() => {
        const haleyResponse: Message = {
          id: Date.now() + 1,
          text: "Thanks for your message! I'm here to help you with any questions about our tools and anime content! 🌸✨",
          isUser: false,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, haleyResponse]);
      }, 1000);
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileMessage: Message = {
        id: Date.now(),
        text: `📎 Shared file: ${file.name}`,
        isUser: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, fileMessage]);
      
      // Haley's response to file
      setTimeout(() => {
        const haleyResponse: Message = {
          id: Date.now() + 1,
          text: "Thanks for sharing! I can see your file. How can I help you with it? 🌟",
          isUser: false,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, haleyResponse]);
      }, 1000);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/10 z-50 animate-fade-in">
      <div className="fixed bottom-4 right-4 w-80 glass-card animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-neon-blue">
              <img 
                src={haleyNew} 
                alt="Haley Assistant" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold">Haley Assistant</h3>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="hover:bg-destructive/10"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Chat Content */}
        <div className="p-4 space-y-4 max-h-64 overflow-y-auto">
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
              <div className="glass-card p-3 rounded-lg max-w-[200px]">
                <p className="text-sm">{greetingMessages[currentMessage]}</p>
              </div>
            </div>
          )}

          {/* Chat Messages */}
          {messages.map((message) => (
            <div key={message.id} className={`flex items-start space-x-3 animate-fade-in ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
              {!message.isUser && (
                <div className="w-8 h-8 rounded-full overflow-hidden border border-neon-blue flex-shrink-0">
                  <img 
                    src={haleyNew} 
                    alt="Haley" 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className={`glass-card p-3 rounded-lg max-w-[200px] ${message.isUser ? 'bg-neon-blue/20' : ''}`}>
                <p className="text-sm">{message.text}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>


      </div>
    </div>
  );
};

export default HaleyPopupChat;