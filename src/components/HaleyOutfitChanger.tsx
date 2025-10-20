import React, { useState } from 'react';
import { Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import haleyNew from '@/assets/haley-new.jpg';
import haleyHero from '@/assets/haley-hero.jpg';

interface HaleyOutfitChangerProps {
  onOutfitChange?: (src: string) => void;
}

const outfits = [
  { name: 'Classic Dress', src: haleyNew },
  { name: 'Casual Hoodie', src: haleyHero },
];

const HaleyOutfitChanger: React.FC<HaleyOutfitChangerProps> = ({ onOutfitChange }) => {
  const [selected, setSelected] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (index: number) => {
    setSelected(index);
    onOutfitChange?.(outfits[index].src);
  };

  return (
    <div className="absolute top-2 right-2 z-20">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="btn-sakura rounded-full p-2 shadow-lg"
        aria-label="Change outfit"
      >
        <Palette className="w-4 h-4" />
      </Button>

      {isOpen && (
        <div className="absolute top-12 right-0 glass-card p-3 rounded-2xl shadow-xl animate-scale-in w-44">
          <p className="text-xs font-semibold mb-2 text-center">Haley's Outfits</p>
          <div className="flex flex-col gap-2">
            {outfits.map((o, index) => (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                className={`flex items-center gap-2 p-2 rounded-lg transition-all duration-300 ${selected === index ? 'bg-primary/20 scale-105' : 'hover:bg-accent/10'}`}
              >
                <img src={o.src} alt={o.name} className="w-8 h-8 rounded-full object-cover border" />
                <span className="text-xs font-medium whitespace-nowrap">{o.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HaleyOutfitChanger;