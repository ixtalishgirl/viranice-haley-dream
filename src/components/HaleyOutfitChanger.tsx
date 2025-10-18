import React, { useState } from 'react';
import { Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HaleyOutfitChangerProps {
  onColorChange?: (color: string) => void;
}

const outfitColors = [
  { name: 'Sakura Pink', color: '#FF69B4', filter: 'hue-rotate(0deg) saturate(1.2)' },
  { name: 'Ocean Blue', color: '#00CED1', filter: 'hue-rotate(180deg) saturate(1.3)' },
  { name: 'Forest Green', color: '#32CD32', filter: 'hue-rotate(100deg) saturate(1.1)' },
  { name: 'Royal Purple', color: '#9370DB', filter: 'hue-rotate(260deg) saturate(1.2)' },
  { name: 'Sunset Orange', color: '#FF8C00', filter: 'hue-rotate(30deg) saturate(1.4)' },
];

const HaleyOutfitChanger: React.FC<HaleyOutfitChangerProps> = ({ onColorChange }) => {
  const [selectedColor, setSelectedColor] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const handleColorSelect = (index: number) => {
    setSelectedColor(index);
    if (onColorChange) {
      onColorChange(outfitColors[index].filter);
    }
  };

  return (
    <div className="absolute top-4 right-4 z-20">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="btn-sakura rounded-full p-3 shadow-lg animate-glow-pulse"
        aria-label="Change outfit color"
      >
        <Palette className="w-5 h-5" />
      </Button>

      {isOpen && (
        <div className="absolute top-14 right-0 glass-card p-4 rounded-2xl shadow-xl animate-scale-in">
          <p className="text-xs font-semibold mb-3 text-center">✨ Haley's Outfits ✨</p>
          <div className="flex flex-col gap-2">
            {outfitColors.map((outfit, index) => (
              <button
                key={index}
                onClick={() => handleColorSelect(index)}
                className={`
                  flex items-center gap-3 p-2 rounded-lg transition-all duration-300
                  ${selectedColor === index ? 'bg-primary/20 scale-105' : 'hover:bg-accent/10'}
                `}
              >
                <div
                  className="w-8 h-8 rounded-full border-2 border-white shadow-lg"
                  style={{ backgroundColor: outfit.color }}
                />
                <span className="text-sm font-medium whitespace-nowrap">{outfit.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HaleyOutfitChanger;