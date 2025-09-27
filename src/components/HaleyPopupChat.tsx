import React, { useState, useEffect } from 'react';
import { X, MessageCircle, Heart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import haleyNew from '@/assets/haley-new.jpg';

interface HaleyPopupChatProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const HaleyPopupChat = ({ isOpen: propIsOpen, onClose }: HaleyPopupChatProps) => {
  const [isOpen, setIsOpen] = useState(propIsOpen ?? false);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [showGreeting, setShowGreeting] = useState(false);

  const messages = [
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
        setCurrentMessage((prev) => (prev + 1) % messages.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 animate-fade-in">
      <div className="fixed bottom-4 right-4 w-80 glass-card animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-neon-blue animate-glow-pulse">
              <img 
                src={haleyNew} 
                alt="Haley Assistant" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold magic-text">Haley Assistant</h3>
              <p className="text-xs text-muted-foreground">Online & Ready to Help</p>
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
          {showGreeting && (
            <div className="flex items-start space-x-3 animate-fade-in">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-neon-blue flex-shrink-0">
                <img 
                  src={haleyNew} 
                  alt="Haley" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="glass-card p-3 rounded-lg max-w-[200px] animate-float">
                <p className="text-sm">{messages[currentMessage]}</p>
                <div className="flex items-center space-x-1 mt-2">
                  <Heart className="w-3 h-3 text-neon-green animate-glow-pulse" />
                  <Sparkles className="w-3 h-3 text-neon-blue animate-glow-pulse delay-500" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="p-4 border-t border-border space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <Button 
              size="sm" 
              className="btn-sakura text-xs"
              onClick={() => document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Sparkles className="w-3 h-3 mr-1" />
              Explore Tools
            </Button>
            <Button 
              size="sm" 
              className="btn-purple text-xs"
              onClick={() => document.getElementById('anime')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Heart className="w-3 h-3 mr-1" />
              Watch Anime
            </Button>
          </div>
          <p className="text-xs text-center text-muted-foreground">
            Click anywhere to explore my magical world! ✨
          </p>
        </div>
      </div>
    </div>
  );
};

export default HaleyPopupChat;