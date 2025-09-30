import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import MagicalNavigation from '@/components/MagicalNavigation';
import HeroSection from '@/components/HeroSection';
import ToolsSection from '@/components/ToolsSection';
import AnimeSection from '@/components/AnimeSection';
import HaleyAssistant from '@/components/HaleyAssistant';
import SakuraPetals from '@/components/SakuraPetals';
import HaleyPopupChat from '@/components/HaleyPopupChat';
import ClickAnimations from '@/components/ClickAnimations';
import darkJungleBg from '@/assets/dark-jungle-bg.jpg';
import ThemeSettings from '@/components/ThemeSettings';

const Index = () => {
  const [showPopupChat, setShowPopupChat] = useState(false);

  // Chat popup is now controlled manually by user
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setShowPopupChat(true);
  //   }, 3000);
  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Beautiful Mountain River Background */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${darkJungleBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/30 via-black/40 to-neon-green/30"></div>
      </div>
      
      {/* Magical overlay */}
      <div className="magic-bg">
        {/* Animated Background Effects */}
        
        
        {/* Click Animations */}
        <ClickAnimations />
        
        {/* Navigation */}
        <MagicalNavigation />
        
        {/* Main Content */}
        <main className="relative z-20">
          {/* Hero Section */}
          <HeroSection />
          
          {/* Anime Section */}
          <AnimeSection />
          
          {/* Tools Section */}
          <ToolsSection />
        
        {/* Footer */}
        <footer className="py-12 relative">
          <div className="container mx-auto px-4">
            <div className="glass-card p-6 rounded-2xl text-center">
              <h3 className="text-xl font-bold magic-text mb-3">
                Made with 💖 by Haley & the ViraLux Team
              </h3>
              <p className="text-muted-foreground mb-4 max-w-xl mx-auto font-poppins text-sm">
                ViraLux | Haley's Dreamland is where anime dreams come true and AI magic happens. 
                Join our community of creators, dreamers, and anime lovers! ✨
              </p>
              
              {/* Footer Links */}
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <a href="#" className="hover:text-neon-blue transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-neon-blue transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-neon-blue transition-colors">Contact Us</a>
                <a href="#" className="hover:text-neon-blue transition-colors">Support</a>
                <a href="#" className="hover:text-neon-blue transition-colors">Blog</a>
              </div>
              
              <div className="mt-6 pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  © 2024 ViraLux | Haley's Dreamland. All rights reserved. 
                  <span className="ml-2">🌲 Made with love and AI magic ✨</span>
                </p>
              </div>
            </div>
          </div>
        </footer>
        </main>
        
        {/* Floating Haley Assistant with Chat Toggle */}
        <HaleyAssistant />
        
        {/* Chat Toggle Button */}
        <Button
          onClick={() => setShowPopupChat(true)}
          className="fixed bottom-8 left-8 z-40 btn-sakura rounded-full p-4"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>

        <ThemeSettings />
      </div>
      
      {/* Popup Chat */}
      <HaleyPopupChat 
        isOpen={showPopupChat}
        onClose={() => setShowPopupChat(false)}
      />
    </div>
  );
};

export default Index;