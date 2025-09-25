import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Wand2, Heart, Play, Star } from 'lucide-react';
import HaleyAssistant from './HaleyAssistant';
import haleyHero from '@/assets/haley-hero.jpg';

const HeroSection = () => {
  const [currentText, setCurrentText] = useState(0);
  const [showHaley, setShowHaley] = useState(false);

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
        <div className="absolute top-20 left-10 w-32 h-32 bg-sakura-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-32 right-16 w-40 h-40 bg-purple-primary/10 rounded-full blur-3xl animate-float delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-haley-blue/10 rounded-full blur-2xl animate-glow-pulse"></div>
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <h1 className="haley-title leading-tight">
                {heroTexts[currentText]}
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl font-poppins">
                Join <span className="magic-text font-semibold">Haley</span>, your magical AI assistant, 
                in a world where anime dreams meet cutting-edge AI tools. Stream anime, create viral content, 
                and discover the magic of technology! 🌟
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 text-center">
              <div className="glass-card p-4 rounded-xl">
                <div className="text-2xl font-bold magic-text">32+</div>
                <div className="text-sm text-muted-foreground">AI Tools</div>
              </div>
              <div className="glass-card p-4 rounded-xl">
                <div className="text-2xl font-bold magic-text">1000+</div>
                <div className="text-sm text-muted-foreground">Anime Titles</div>
              </div>
              <div className="glass-card p-4 rounded-xl">
                <div className="text-2xl font-bold magic-text">∞</div>
                <div className="text-sm text-muted-foreground">Magic Moments</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button className="btn-sakura text-lg px-8 py-4">
                <Play className="w-5 h-5 mr-2" />
                Start Your Journey ✨
              </Button>
              <Button className="btn-purple text-lg px-8 py-4">
                <Wand2 className="w-5 h-5 mr-2" />
                Explore AI Tools
              </Button>
            </div>

            {/* Features */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-8">
              <div className="flex items-center space-x-2 text-sm">
                <Sparkles className="w-4 h-4 text-sakura-primary" />
                <span>Free AI Tools</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Heart className="w-4 h-4 text-purple-primary" />
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
            <div className="relative w-80 h-80 lg:w-96 lg:h-96">
              {/* Beautiful Haley Image */}
              <div className="absolute inset-0 rounded-full overflow-hidden glass-card">
                <img 
                  src={haleyHero} 
                  alt="Haley - Your magical AI assistant" 
                  className="w-full h-full object-cover animate-float"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sakura-primary/20 via-transparent to-purple-primary/20"></div>
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

              {/* Floating Elements */}
              <div className="absolute top-10 right-10 text-4xl animate-float">🌸</div>
              <div className="absolute bottom-20 left-10 text-3xl animate-glow-pulse delay-500">✨</div>
              <div className="absolute top-1/3 left-5 text-2xl animate-float delay-1000">⭐</div>
              <div className="absolute bottom-10 right-20 text-3xl animate-glow-pulse delay-1500">💖</div>
              
              {/* Magical Circles */}
              <div className="absolute inset-0 border border-sakura-primary/20 rounded-full animate-glow-pulse"></div>
              <div className="absolute inset-8 border border-purple-primary/20 rounded-full animate-glow-pulse delay-1000"></div>
              <div className="absolute inset-16 border border-haley-blue/20 rounded-full animate-glow-pulse delay-2000"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-sakura-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-sakura-primary rounded-full mt-2 animate-glow-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;