import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Wand2, Heart, Play, Star } from 'lucide-react';
import HaleyAssistant from './HaleyAssistant';
import HaleyGameInvite from './HaleyGameInvite';
import HaleyOutfitChanger from './HaleyOutfitChanger';
import haleyNew from '@/assets/haley-new.jpg';
import haleyHero from '@/assets/haley-hero.jpg';

const HeroSection = () => {
  const [currentText, setCurrentText] = useState(0);
  const [showHaley, setShowHaley] = useState(false);
  const [haleyImage, setHaleyImage] = useState(haleyNew);

  const heroTexts = [
    "Welcome to Haley's Magical Dreamland! ✨",
    "Discover Amazing Anime & AI Tools 🌸",
    "Create Viral Content with AI Magic 🚀",
    "Your Anime Paradise Awaits 💖"
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
              <p className="text-base text-muted-foreground max-w-xl font-poppins">
                Join <span className="magic-text font-semibold">Haley</span>, your magical AI assistant, 
                in a world where anime dreams meet cutting-edge AI tools. Stream anime, create viral content, 
                and discover the magic of technology! 🌟
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-center">
              <div className="glass-card p-3 rounded-xl">
                <div className="text-lg font-bold magic-text">32+</div>
                <div className="text-xs text-muted-foreground">AI Tools</div>
              </div>
              <div className="glass-card p-3 rounded-xl">
                <div className="text-lg font-bold magic-text">1000+</div>
                <div className="text-xs text-muted-foreground">Anime Shows</div>
              </div>
              <div className="glass-card p-3 rounded-xl">
                <div className="text-lg font-bold magic-text">∞</div>
                <div className="text-xs text-muted-foreground">Magic Moments</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Button className="btn-sakura text-base px-6 py-3">
                <Play className="w-4 h-4 mr-2" />
                Start Your Journey ✨
              </Button>
              <Button className="btn-purple text-base px-6 py-3">
                <Wand2 className="w-4 h-4 mr-2" />
                Explore AI Tools
              </Button>
            </div>

            {/* Features */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
              <div className="flex items-center space-x-2 text-sm">
                <Sparkles className="w-4 h-4 text-neon-blue" />
                <span>Free AI Tools</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Heart className="w-4 h-4 text-neon-green" />
                <span>Premium Anime</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Star className="w-4 h-4 text-haley-blue" />
                <span>Haley Assistant</span>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-72 h-72 lg:w-80 lg:h-80">
              {/* Game Invite Popup + Outfit Changer */}
              <HaleyGameInvite />
              <div className="absolute -top-2 -left-2 z-20">
                <HaleyOutfitChanger onOutfitChange={setHaleyImage} />
              </div>
              
              {/* Beautiful Haley Image */}
              <div className="absolute inset-0 rounded-full overflow-hidden glass-card">
                <img 
                  src={haleyImage} 
                  alt="Haley - Your magical AI assistant" 
                  className="w-full h-full object-cover animate-float-slow transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neon-blue/20 via-transparent to-neon-green/20"></div>
                
                {/* Green Online Dot */}
                <div className="absolute top-4 right-4 w-5 h-5 bg-green-500 rounded-full border-2 border-white animate-pulse shadow-lg"></div>
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
              <div className="absolute inset-0 border border-neon-blue/20 rounded-full animate-glow-pulse"></div>
              <div className="absolute inset-6 border border-neon-green/20 rounded-full animate-glow-pulse delay-1000"></div>
              <div className="absolute inset-12 border border-haley-blue/20 rounded-full animate-glow-pulse delay-2000"></div>
            </div>
          </div>
        </div>
      </div>

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