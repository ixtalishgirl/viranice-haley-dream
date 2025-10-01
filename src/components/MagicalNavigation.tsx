import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Search, Menu, X, Sparkles, Heart, Wand2, Settings } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const themes = [
  { id: 'default', label: '☀️ Light', icon: '☀️' },
  { id: 'dark', label: '🌙 Dark', icon: '🌙' },
  { id: 'horror', label: '👻 Horror', icon: '👻' },
  { id: 'nightmare', label: '💀 Nightmare', icon: '💀' },
  { id: 'rain', label: '🌧️ Rain Scene', icon: '🌧️' },
  { id: '3d-forest', label: '🌲 Forest Dream', icon: '🌲' },
  { id: 'cyberpunk', label: '🌆 Cyberpunk', icon: '🌆' },
  { id: 'galaxy', label: '🌌 Galaxy', icon: '🌌' },
  { id: 'ocean', label: '🌊 Ocean', icon: '🌊' },
];

const applyTheme = (id: string) => {
  const root = document.documentElement;
  root.removeAttribute('data-theme');
  root.classList.remove('dark');
  if (id !== 'default') root.setAttribute('data-theme', id);
  if (id === 'dark') root.classList.add('dark');
};

const MagicalNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<string>(() => localStorage.getItem('theme') || 'default');

  useEffect(() => {
    applyTheme(currentTheme);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleThemeSelect = (id: string) => {
    setCurrentTheme(id);
    applyTheme(id);
    localStorage.setItem('theme', id);
  };

  const navItems = [
    { name: 'Home', icon: <Sparkles className="w-4 h-4" />, href: '#home' },
    { name: 'AI Tools', icon: <Wand2 className="w-4 h-4" />, href: '#tools' },
    { name: 'Anime', icon: <Heart className="w-4 h-4" />, href: '#anime' },
    { name: 'Haley Chat', icon: <Sparkles className="w-4 h-4" />, href: '#haley' },
  ];

  return (
    <nav className={`
      fixed top-0 left-0 right-0 z-40 transition-all duration-300
      ${isScrolled ? 'bg-card/90' : 'bg-transparent'}
    `}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-sakura-primary to-purple-primary rounded-full flex items-center justify-center glow-element">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold magic-text font-nunito">ViraLux</h1>
              <p className="text-xs text-muted-foreground font-poppins">Haley's Dreamland ✨</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center space-x-2 text-foreground hover:text-sakura-primary transition-colors duration-200 group"
              >
                <span className="group-hover:animate-glow-pulse">{item.icon}</span>
                <span className="font-medium font-poppins">{item.name}</span>
              </a>
            ))}
          </div>

          {/* Search & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search anime, tools..."
                className="pl-10 pr-4 py-2 rounded-full border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-sakura-primary font-poppins"
              />
            </div>
            <Button className="btn-sakura">
              Get Started ✨
            </Button>
            
            {/* Theme Settings */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="btn-sakura rounded-full p-3" aria-label="Theme settings">
                  <Settings className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="glass-card p-3 w-56">
                <div className="text-xs font-semibold mb-2 text-muted-foreground px-2">Choose Theme</div>
                {themes.map(t => (
                  <DropdownMenuItem key={t.id} onClick={() => handleThemeSelect(t.id)} className="cursor-pointer py-2">
                    <span className={`flex items-center gap-2 ${currentTheme === t.id ? 'font-bold text-neon-blue' : ''}`}>
                      {t.label}
                    </span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg glass-card"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4 glass-card p-4 rounded-xl">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center space-x-3 py-2 text-foreground hover:text-sakura-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.icon}
                <span className="font-medium font-poppins">{item.name}</span>
              </a>
            ))}
            
            <div className="pt-4 border-t border-border space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-sakura-primary font-poppins"
                />
              </div>
              <Button className="w-full btn-sakura">
                Get Started ✨
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default MagicalNavigation;