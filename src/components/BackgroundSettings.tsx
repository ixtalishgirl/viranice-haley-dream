import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Settings, X, Image as ImageIcon, Palette } from 'lucide-react';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from '@/components/ui/sheet';
import darkJungleBg from '@/assets/dark-jungle-bg.jpg';
import mountainRiverBg from '@/assets/mountain-river-bg.jpg';
import fantasyBg from '@/assets/fantasy-bg.png';

const backgrounds = [
  { id: 'dark-jungle', name: 'Dark Jungle 🌲', image: darkJungleBg },
  { id: 'mountain-river', name: 'Mountain River 🏔️', image: mountainRiverBg },
  { id: 'fantasy', name: 'Fantasy World ✨', image: fantasyBg },
];

const themes = [
  { id: 'dark', name: 'Dark Mode 🌙', icon: '🌙' },
  { id: 'light', name: 'Light Mode ☀️', icon: '☀️' },
];

interface BackgroundSettingsProps {
  currentBackground: string;
  onBackgroundChange: (bg: string) => void;
}

const BackgroundSettings: React.FC<BackgroundSettingsProps> = ({ 
  currentBackground, 
  onBackgroundChange 
}) => {
  const [currentTheme, setCurrentTheme] = useState('dark');

  useEffect(() => {
    const theme = document.documentElement.getAttribute('data-theme') || 'dark';
    setCurrentTheme(theme);
  }, []);

  const handleThemeChange = (themeId: string) => {
    document.documentElement.setAttribute('data-theme', themeId);
    setCurrentTheme(themeId);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="fixed top-20 right-4 z-40 glass-card-hover rounded-full w-12 h-12 hidden md:flex"
          aria-label="Settings"
        >
          <Settings className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="glass-card border-neon-blue/20 overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="magic-text text-2xl">Settings ⚙️</SheetTitle>
        </SheetHeader>
        
        <div className="space-y-8 mt-6">
          {/* Background Selection */}
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-neon-blue" />
              Background
            </h3>
            <div className="space-y-3">
              {backgrounds.map((bg) => (
                <button
                  key={bg.id}
                  onClick={() => onBackgroundChange(bg.id)}
                  className={`
                    w-full p-3 rounded-xl border-2 transition-all duration-300
                    ${currentBackground === bg.id 
                      ? 'border-neon-blue bg-neon-blue/10' 
                      : 'border-border glass-card-hover'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={bg.image} 
                      alt={bg.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <span className="font-semibold">{bg.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Theme Selection */}
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Palette className="w-5 h-5 text-neon-green" />
              Theme
            </h3>
            <div className="space-y-3">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => handleThemeChange(theme.id)}
                  className={`
                    w-full p-4 rounded-xl border-2 transition-all duration-300 text-left
                    ${currentTheme === theme.id 
                      ? 'border-neon-green bg-neon-green/10' 
                      : 'border-border glass-card-hover'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{theme.icon}</span>
                    <span className="font-semibold">{theme.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BackgroundSettings;
