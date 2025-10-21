import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { Helmet } from 'react-helmet';
import MagicalNavigation from '@/components/MagicalNavigation';
import HeroSection from '@/components/HeroSection';
import ToolsSection from '@/components/ToolsSection';
import AnimeSection from '@/components/AnimeSection';

import ClickAnimations from '@/components/ClickAnimations';
import JellyClick from '@/components/JellyClick';
import ThemeBackground3D from '@/components/ThemeBackground3D';
import darkJungleBg from '@/assets/dark-jungle-bg.jpg';

const Index = () => {
  const [currentTheme, setCurrentTheme] = useState('dark');

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const theme = document.documentElement.getAttribute('data-theme') || 'dark';
      setCurrentTheme(theme);
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  // Chat popup is now controlled manually by user
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setShowPopupChat(true);
  //   }, 3000);
  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <>
      <Helmet>
        <title>ViraLux | Haley's Dreamland - AI-Powered Content Creation Tools</title>
        <meta name="description" content="Transform your content creation with ViraLux AI tools. Generate viral YouTube titles, predict content success, and explore anime with Haley's magical assistant." />
        <meta name="keywords" content="AI tools, viral content, YouTube titles, content creation, anime, AI assistant, viral prediction" />
        <meta property="og:title" content="ViraLux | Haley's Dreamland - AI Content Creation" />
        <meta property="og:description" content="AI-powered tools for viral content creation and anime discovery" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://viralux.lovable.app" />
      </Helmet>
      
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
        <JellyClick />
        <ThemeBackground3D theme={currentTheme} />
        
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
                <Link to="/privacy" className="hover:text-neon-blue transition-colors">Privacy Policy</Link>
                <Link to="/terms" className="hover:text-neon-blue transition-colors">Terms of Service</Link>
                <Link to="/contact" className="hover:text-neon-blue transition-colors">Contact Us</Link>
                <a href="mailto:viraluxsupport@gmail.com" className="hover:text-neon-blue transition-colors">Support</a>
                <Link to="/blog" className="hover:text-neon-blue transition-colors">Blog</Link>
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
        
        {/* Haley chat removed as requested */}
      </div>
      </div>
    </>
  );
};

export default Index;