import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface GameProps { onClose: () => void }

const CarromGame: React.FC<GameProps> = ({ onClose }) => {
  const [playerScore, setPlayerScore] = useState(0);
  const [haleyScore, setHaleyScore] = useState(0);
  const [message, setMessage] = useState("Your turn! Aim and shoot! 🎯");

  const handleShoot = () => {
    const playerHit = Math.random() > 0.4;
    if (playerHit) {
      setPlayerScore(prev => prev + 10);
      setMessage("Great shot! 🎉");
    } else {
      setMessage("Missed! Haley's turn now 💫");
      setTimeout(() => {
        const haleyHit = Math.random() > 0.3;
        if (haleyHit) {
          setHaleyScore(prev => prev + 10);
          setMessage("Haley scored! Try again! 😊");
        } else {
          setMessage("Haley missed! Your turn! 🎯");
        }
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md animate-fade-in">
      <div className="glass-card rounded-3xl w-full max-w-4xl h-[90vh] overflow-hidden flex flex-col relative border-2 border-primary/30">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-3 rounded-full glass-card-hover z-10 hover:bg-destructive/20 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-6 border-b border-border">
          <h3 className="text-3xl font-bold magic-text text-center">Play Carrom with Haley 🎯</h3>
        </div>

        <div className="flex-1 p-6 flex flex-col items-center justify-center space-y-6">
          {/* Score Board */}
          <div className="flex gap-8 mb-4">
            <div className="glass-card p-4 rounded-xl text-center">
              <p className="text-sm text-muted-foreground mb-1">You</p>
              <p className="text-3xl font-bold text-primary">{playerScore}</p>
            </div>
            <div className="glass-card p-4 rounded-xl text-center">
              <p className="text-sm text-muted-foreground mb-1">Haley</p>
              <p className="text-3xl font-bold text-neon-pink">{haleyScore}</p>
            </div>
          </div>

          {/* Carrom Board */}
          <div className="relative w-full max-w-md aspect-square bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-800 dark:to-amber-900 rounded-lg border-8 border-amber-900 dark:border-amber-950 shadow-2xl">
            {/* Board corners */}
            <div className="absolute top-2 left-2 w-12 h-12 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-800"></div>
            <div className="absolute top-2 right-2 w-12 h-12 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-800"></div>
            <div className="absolute bottom-2 left-2 w-12 h-12 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-800"></div>
            <div className="absolute bottom-2 right-2 w-12 h-12 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-800"></div>
            
            {/* Center circle */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-24 h-24 rounded-full border-4 border-red-500 flex items-center justify-center">
                {/* Coins */}
                <div className="grid grid-cols-3 gap-1">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className={`w-4 h-4 rounded-full ${i === 4 ? 'bg-red-500' : 'bg-white'} border border-gray-800 shadow-lg animate-pulse`}></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Striker */}
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-blue-500 border-2 border-blue-700 shadow-xl animate-bounce"></div>
          </div>

          {/* Message */}
          <div className="glass-card p-4 rounded-xl text-center min-w-[300px]">
            <p className="text-lg font-semibold">{message}</p>
          </div>

          {/* Controls */}
          <Button 
            onClick={handleShoot} 
            className="btn-sakura px-8 py-6 text-lg"
          >
            Shoot Striker! 🎯
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CarromGame;
