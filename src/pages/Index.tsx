import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { Helmet } from 'react-helmet';
import MagicalNavigation from '@/components/MagicalNavigation';
import HeroSection from '@/components/HeroSection';
import HaleyGames from '@/components/HaleyGames';
import FeaturesSection from '@/components/FeaturesSection';
import AnimeSection from '@/components/AnimeSection';

import ClickAnimations from '@/components/ClickAnimations';
import JellyClick from '@/components/JellyClick';
import ThemeBackground3D from '@/components/ThemeBackground3D';
import FloatingChatButton from '@/components/FloatingChatButton';
import BackgroundSettings from '@/components/BackgroundSettings';
import darkJungleBg from '@/assets/dark-jungle-bg.jpg';
import mountainRiverBg from '@/assets/mountain-river-bg.jpg';
import fantasyBg from '@/assets/fantasy-bg.png';

const Index = () => {
  const [currentTheme, setCurrentTheme] = useState('dark');
  const [currentBackground, setCurrentBackground] = useState('dark-jungle');

  const backgrounds = {
    'dark-jungle': darkJungleBg,
    'mountain-river': mountainRiverBg,
    'fantasy': fantasyBg,
  };

  useEffect(() => {
    const savedBg = localStorage.getItem('haley-background');
    if (savedBg) {
      setCurrentBackground(savedBg);
    }
  }, []);

  const handleBackgroundChange = (bgId: string) => {
    setCurrentBackground(bgId);
    localStorage.setItem('haley-background', bgId);
  };

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
        <title>Haley Dreamland - Your Personal AI Companion & Memory Vault</title>
        <meta name="description" content="Meet Haley, your personal AI assistant. Save conversations forever, create stunning thumbnails, and keep all your memories in one magical place. Private, secure, and always available." />
        <meta name="keywords" content="AI assistant, memory vault, chat archive, thumbnail creator, personal AI, conversation storage, Haley Dreamland" />
        <meta property="og:title" content="Haley Dreamland - Personal AI Companion" />
        <meta property="og:description" content="Your personal AI assistant, memory vault, and creative studio in one beautiful place" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://viralux.lovable.app" />
      </Helmet>
      
      <div className="min-h-screen relative overflow-x-hidden">
      {/* Dynamic Background */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${backgrounds[currentBackground as keyof typeof backgrounds]})`,
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
          
          {/* Games Section */}
          <section id="games">
            <HaleyGames />
          </section>
          
          {/* Features Section */}
          <FeaturesSection />
        
        {/* Footer */}
        <footer className="py-12 relative">
          <div className="container mx-auto px-4">
            <div className="glass-card p-6 rounded-2xl text-center">
              <h3 className="text-xl font-bold magic-text mb-3">
                Made with 💖 by Haley Dreamland
              </h3>
              <p className="text-muted-foreground mb-4 max-w-xl mx-auto font-poppins text-sm">
                Haley Dreamland is where memories are saved, creativity blooms, and AI magic happens. 
                Join our community of dreamers and creators! ✨
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
                  © 2024 Haley Dreamland. All rights reserved. 
                  <span className="ml-2">🌸 Made with love and AI magic ✨</span>
                </p>
              </div>
            </div>
          </div>
        </footer>
        </main>
        
        {/* Global floating chat button */}
        <FloatingChatButton />
        
        {/* Background Settings */}
        <BackgroundSettings 
          currentBackground={currentBackground}
          onBackgroundChange={handleBackgroundChange}
        />
      </div>
      </div>
    </>
  );
};

export default Index;