import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, RotateCcw, Sprout, Coins } from 'lucide-react';
import haleyNew from '@/assets/haley-new.jpg';

interface FarmingGameProps {
  onClose: () => void;
}

interface Crop {
  id: number;
  x: number;
  y: number;
  type: string;
  emoji: string;
  planted: number;
  growthTime: number;
  value: number;
}

const cropTypes = [
  { type: 'wheat', emoji: '🌾', growthTime: 3000, value: 10 },
  { type: 'corn', emoji: '🌽', growthTime: 5000, value: 20 },
  { type: 'tomato', emoji: '🍅', growthTime: 4000, value: 15 },
  { type: 'carrot', emoji: '🥕', growthTime: 3500, value: 12 },
];

const FarmingGame: React.FC<FarmingGameProps> = ({ onClose }) => {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'ended'>('menu');
  const [money, setMoney] = useState(100);
  const [crops, setCrops] = useState<Crop[]>([]);
  const [selectedCrop, setSelectedCrop] = useState(0);
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    if (gameState === 'playing') {
      const timer = setInterval(() => {
        setCurrentTime(Date.now());
      }, 100);
      return () => clearInterval(timer);
    }
  }, [gameState]);

  const plantCrop = (x: number, y: number) => {
    const crop = cropTypes[selectedCrop];
    if (money >= 5 && crops.length < 50) {
      setMoney(prev => prev - 5);
      setCrops(prev => [...prev, {
        id: Date.now(),
        x,
        y,
        type: crop.type,
        emoji: crop.emoji,
        planted: Date.now(),
        growthTime: crop.growthTime,
        value: crop.value
      }]);
    }
  };

  const harvestCrop = (cropId: number) => {
    const crop = crops.find(c => c.id === cropId);
    if (crop && currentTime - crop.planted >= crop.growthTime) {
      setMoney(prev => prev + crop.value);
      setCrops(prev => prev.filter(c => c.id !== cropId));
    }
  };

  const isGrown = (crop: Crop) => {
    return currentTime - crop.planted >= crop.growthTime;
  };

  const getGrowthStage = (crop: Crop) => {
    const progress = (currentTime - crop.planted) / crop.growthTime;
    if (progress >= 1) return crop.emoji;
    if (progress >= 0.66) return '🌱';
    if (progress >= 0.33) return '🌿';
    return '🌾';
  };

  if (gameState === 'menu') {
    return (
      <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
        <div className="glass-card rounded-3xl p-8 max-w-2xl w-full text-center">
          <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full glass-card-hover">
            <X className="w-6 h-6" />
          </button>
          
          <div className="text-8xl mb-6">🌾</div>
          <h2 className="text-4xl font-bold magic-text mb-4">Dream Farm</h2>
          <p className="text-lg text-muted-foreground font-poppins mb-6 max-w-md mx-auto">
            Build your magical farm! Plant crops, wait for them to grow, 
            and harvest for money. Each crop costs $5 to plant!
          </p>

          <div className="flex items-center gap-4 justify-center mb-6 glass-card p-4 rounded-2xl">
            <img src={haleyNew} alt="Haley" className="w-16 h-16 rounded-full border-2 border-pink-400" />
            <div className="text-left">
              <div className="font-bold text-primary">Haley says:</div>
              <div className="font-poppins">"Let's grow a beautiful farm together! 🌸"</div>
            </div>
          </div>

          <Button onClick={() => setGameState('playing')} className="btn-sakura text-xl px-12 py-6">
            Start Farming! 🌾
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      <div className="glass-card rounded-3xl p-8 max-w-6xl w-full max-h-[90vh] overflow-hidden">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full glass-card-hover z-10">
          <X className="w-6 h-6" />
        </button>

        {/* HUD */}
        <div className="flex justify-between items-center mb-4">
          <div className="glass-card px-6 py-3 rounded-full flex items-center gap-2">
            <Coins className="w-5 h-5 text-yellow-500" />
            <span className="font-bold text-xl">${money}</span>
          </div>
          <div className="glass-card px-6 py-3 rounded-full flex items-center gap-2">
            <Sprout className="w-5 h-5 text-green-500" />
            <span className="font-bold text-xl">{crops.length} Crops</span>
          </div>
        </div>

        {/* Crop Selector */}
        <div className="flex gap-2 mb-4">
          {cropTypes.map((crop, idx) => (
            <button
              key={crop.type}
              onClick={() => setSelectedCrop(idx)}
              className={`glass-card px-4 py-2 rounded-xl ${selectedCrop === idx ? 'ring-2 ring-primary' : ''}`}
            >
              <div className="text-3xl">{crop.emoji}</div>
              <div className="text-xs">${crop.value}</div>
            </button>
          ))}
        </div>

        {/* Farm Grid */}
        <div
          className="relative bg-gradient-to-br from-green-800 to-green-900 rounded-2xl overflow-hidden"
          style={{ height: '500px' }}
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            plantCrop(x, y);
          }}
        >
          {/* Grid Pattern */}
          <div className="absolute inset-0 grid grid-cols-8 grid-rows-6 opacity-20">
            {[...Array(48)].map((_, i) => (
              <div key={i} className="border border-green-600"></div>
            ))}
          </div>

          {/* Crops */}
          {crops.map(crop => (
            <div
              key={crop.id}
              className="absolute cursor-pointer hover:scale-125 transition-transform"
              style={{
                left: `${crop.x}%`,
                top: `${crop.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              onClick={(e) => {
                e.stopPropagation();
                harvestCrop(crop.id);
              }}
            >
              <div className={`text-4xl ${isGrown(crop) ? 'animate-bounce' : ''}`}>
                {getGrowthStage(crop)}
              </div>
            </div>
          ))}

          {/* Haley Helper */}
          <div className="absolute bottom-4 right-4 w-20 h-20 rounded-full overflow-hidden border-4 border-pink-400 animate-float">
            <img src={haleyNew} alt="Haley" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="mt-4 text-center text-sm text-muted-foreground font-poppins">
          Click to plant crops ($5 each) • Click grown crops to harvest 🌾
        </div>
      </div>
    </div>
  );
};

export default FarmingGame;
