import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Wand2, Heart, Play, Star, MessageCircle } from 'lucide-react';
import HaleyAssistant from './HaleyAssistant';
import HaleyPopupChat from './HaleyPopupChat';
import haleyNew from '@/assets/haley-new.jpg';


const HeroSection = () => {
  const [currentText, setCurrentText] = useState(0);
  const [showHaley, setShowHaley] = useState(false);
  const [haleyImage, setHaleyImage] = useState(haleyNew);
  const [showChat, setShowChat] = useState(false);

  const heroTexts = [
    "Welcome to Haley's Magical Dreamland! ✨",
    "Your Personal AI Assistant & Memory Vault 🌸",
    "Create, Save & Share Your Moments 🚀",
    "Your Digital Paradise Awaits 💖"
  ];

  useEffect(() => {
    const timer = setTimeout(() => setShowHaley(true), 1000);
    
    const textInterval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % heroTexts.length);
    }, 4000);

    return () => {
      clearTimeout(timer);
      clearInterval(textInterval);
    };
  }, []);

  return (
    <section id="home" className="min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Corner Stats Badges - 24/7 and Secure */}
      <div className="fixed top-4 right-4 z-40 hidden lg:block">
        <div className="glass-card px-4 py-2 rounded-full border-2 border-neon-green/30 backdrop-blur-md animate-float-slow shadow-lg">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse-slow"></div>
            <span className="text-sm font-bold text-foreground/95" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>24/7 Always Available</span>
          </div>
        </div>
      </div>
      
      <div className="fixed top-4 left-4 z-40 hidden lg:block">
        <div className="glass-card px-4 py-2 rounded-full border-2 border-neon-blue/30 backdrop-blur-md animate-float-slower shadow-lg">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-neon-blue rounded-full animate-pulse-slow"></div>
            <span className="text-sm font-bold text-foreground/95" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>100% Private & Secure</span>
          </div>
        </div>
      </div>

      {/* Magical Background Elements */}
      <div className="absolute inset-0 magic-bg">
        <div className="absolute top-20 left-10 w-32 h-32 bg-neon-blue/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-32 right-16 w-40 h-40 bg-neon-green/10 rounded-full blur-3xl animate-float delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-haley-blue/10 rounded-full blur-2xl animate-glow-pulse"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Hero Content */}
          <div className="text-center lg:text-left space-y-6">
            <div className="space-y-3">
              <h1 className="haley-title leading-tight text-4xl md:text-6xl font-bold">
                {heroTexts[currentText]}
              </h1>
              <p className="text-lg text-foreground/95 max-w-xl font-poppins font-medium" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                Meet <span className="magic-text font-semibold">Haley</span>, your personal AI assistant and creative companion. 
                Save your conversations, create stunning thumbnails, and keep all your memories in one magical place! 🌟
              </p>
            </div>

            {/* Stats - kept for mobile, hidden on desktop */}
            <div className="flex lg:hidden flex-wrap justify-center gap-4 text-center">
              <div className="glass-card p-3 rounded-xl animate-float">
                <div className="text-lg font-bold magic-text">∞</div>
                <div className="text-sm text-foreground/95 font-semibold">Conversations</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Button className="btn-sakura text-base px-6 py-3">
                <Play className="w-4 h-4 mr-2" />
                Start Chatting ✨
              </Button>
              <Button className="btn-purple text-base px-6 py-3">
                <Wand2 className="w-4 h-4 mr-2" />
                Explore Features
              </Button>
            </div>

            {/* Features */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
              <div className="flex items-center space-x-2 text-sm animate-scale-in">
                <Sparkles className="w-4 h-4 text-neon-blue animate-glow-pulse" />
                <span className="text-foreground/90 font-medium">Memory Vault</span>
              </div>
              <div className="flex items-center space-x-2 text-sm animate-scale-in" style={{ animationDelay: '0.1s' }}>
                <Heart className="w-4 h-4 text-neon-green animate-glow-pulse" />
                <span className="text-foreground/90 font-medium">Creative Studio</span>
              </div>
              <div className="flex items-center space-x-2 text-sm animate-scale-in" style={{ animationDelay: '0.2s' }}>
                <Star className="w-4 h-4 text-haley-blue animate-glow-pulse" />
                <span className="text-foreground/90 font-medium">AI Companion</span>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Background gradient wrapper to fix white background issue */}
            <div className="absolute inset-0 flex justify-center lg:justify-end items-center">
              <div className="w-96 h-96 lg:w-[28rem] lg:h-[28rem] rounded-full bg-gradient-to-br from-neon-blue/5 via-haley-blue/5 to-neon-green/5 blur-3xl"></div>
            </div>
            
            <div className="relative w-72 h-72 lg:w-80 lg:h-80 z-10">
              {/* Beautiful Haley Image with fixed background */}
              <div className="absolute inset-0 rounded-full overflow-hidden glass-card bg-gradient-to-br from-background/95 to-background/90">
                <img 
                  src={haleyImage} 
                  alt="Haley - Your magical AI assistant" 
                  className="w-full h-full object-cover animate-float-super-slow transition-all duration-500"
                  style={{ objectPosition: 'center' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neon-blue/20 via-transparent to-neon-green/20"></div>
                
                {/* Green Online Dot */}
                <div className="absolute top-4 right-4 w-5 h-5 bg-neon-green rounded-full border-2 border-background animate-pulse-slow shadow-lg"></div>

                {/* Chat Button */}
                <button
                  onClick={() => setShowChat(true)}
                  aria-label="Chat with Haley"
                  className="absolute bottom-3 left-3 w-9 h-9 rounded-full border border-neon-blue/40 text-neon-blue bg-transparent hover:bg-neon-blue/10 shadow-lg flex items-center justify-center transition-colors backdrop-blur-sm"
                >
                  <MessageCircle className="w-5 h-5" />
                </button>
              </div>

              {/* Interactive Haley Assistant */}
              {showHaley && (
                <div className="absolute bottom-4 right-4 z-10">
                  <HaleyAssistant 
                    position="relative" 
                    mood="excited"
                    message="Welcome to my magical world! 🌸"
                  />
                </div>
              )}

              {/* Subtle Background Elements - Not blocking view */}
              <div className="absolute top-8 -right-4 text-xl animate-float opacity-30">🌲</div>
              <div className="absolute bottom-16 -left-4 text-lg animate-glow-pulse delay-500 opacity-40">🍃</div>
              
              {/* Magical Circles */}
              <div className="absolute inset-0 border border-neon-blue/20 rounded-full animate-glow-pulse-slow"></div>
              <div className="absolute inset-6 border border-neon-green/20 rounded-full animate-glow-pulse-slow delay-1000"></div>
              <div className="absolute inset-12 border border-haley-blue/20 rounded-full animate-glow-pulse-slow delay-2000"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Modal */}
      {showChat && (
        <HaleyPopupChat isOpen onClose={() => setShowChat(false)} />
      )}

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-neon-blue rounded-full flex justify-center">
          <div className="w-1 h-3 bg-neon-blue rounded-full mt-2 animate-glow-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;