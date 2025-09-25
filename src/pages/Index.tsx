import React from 'react';
import MagicalNavigation from '@/components/MagicalNavigation';
import HeroSection from '@/components/HeroSection';
import ToolsSection from '@/components/ToolsSection';
import AnimeSection from '@/components/AnimeSection';
import HaleyAssistant from '@/components/HaleyAssistant';
import SakuraPetals from '@/components/SakuraPetals';

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-x-hidden magic-bg">
      {/* Animated Background Effects */}
      <SakuraPetals />
      
      {/* Navigation */}
      <MagicalNavigation />
      
      {/* Main Content */}
      <main className="relative z-20">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Tools Section */}
        <ToolsSection />
        
        {/* Anime Section */}
        <AnimeSection />
        
        {/* Footer */}
        <footer className="py-16 relative">
          <div className="container mx-auto px-6">
            <div className="glass-card p-8 rounded-2xl text-center">
              <h3 className="text-2xl font-bold magic-text mb-4">
                Made with 💖 by Haley & the ViraLux Team
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto font-poppins">
                ViraLux | Haley's Dreamland is where anime dreams come true and AI magic happens. 
                Join our community of creators, dreamers, and anime lovers! ✨
              </p>
              
              {/* Footer Links */}
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <a href="#" className="hover:text-sakura-primary transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-sakura-primary transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-sakura-primary transition-colors">Contact Us</a>
                <a href="#" className="hover:text-sakura-primary transition-colors">Support</a>
                <a href="#" className="hover:text-sakura-primary transition-colors">Blog</a>
              </div>
              
              <div className="mt-8 pt-8 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  © 2024 ViraLux | Haley's Dreamland. All rights reserved. 
                  <span className="ml-2">🌸 Made with love and AI magic ✨</span>
                </p>
              </div>
            </div>
          </div>
        </footer>
      </main>
      
      {/* Floating Haley Assistant */}
      <HaleyAssistant />
    </div>
  );
};

export default Index;