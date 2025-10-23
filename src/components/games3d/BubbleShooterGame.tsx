import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface GameProps { onClose: () => void }

interface Bubble {
  id: number;
  x: number;
  y: number;
  color: string;
  popped: boolean;
}

const BubbleShooterGame: React.FC<GameProps> = ({ onClose }) => {
  const [score, setScore] = useState(0);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [level, setLevel] = useState(1);

  const colors = ['#FF6B9D', '#C44569', '#4E54C8', '#8F94FB', '#00D2FF', '#3A7BD5'];

  useEffect(() => {
    generateBubbles();
  }, [level]);

  const generateBubbles = () => {
    const newBubbles: Bubble[] = [];
    for (let row = 0; row < 5 + level; row++) {
      for (let col = 0; col < 8; col++) {
        newBubbles.push({
          id: row * 8 + col,
          x: col * 60 + (row % 2) * 30,
          y: row * 60,
          color: colors[Math.floor(Math.random() * colors.length)],
          popped: false
        });
      }
    }
    setBubbles(newBubbles);
  };

  const popBubble = (id: number) => {
    setBubbles(prev => prev.map(b => b.id === id ? { ...b, popped: true } : b));
    setScore(prev => prev + 10);
    
    // Check if all popped
    setTimeout(() => {
      const remaining = bubbles.filter(b => !b.popped).length;
      if (remaining <= 1) {
        setLevel(prev => prev + 1);
        setScore(prev => prev + 100);
      }
    }, 100);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 backdrop-blur-md animate-fade-in">
      <div className="glass-card rounded-3xl w-full max-w-4xl h-[90vh] overflow-hidden flex flex-col relative border-2 border-primary/30">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-3 rounded-full glass-card-hover z-10 hover:bg-destructive/20 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-6 border-b border-border flex justify-between items-center">
          <h3 className="text-3xl font-bold magic-text">Bubble Shooter 🫧</h3>
          <div className="flex gap-4">
            <div className="glass-card px-4 py-2 rounded-lg">
              <span className="text-sm text-muted-foreground">Level: </span>
              <span className="text-xl font-bold text-primary">{level}</span>
            </div>
            <div className="glass-card px-4 py-2 rounded-lg">
              <span className="text-sm text-muted-foreground">Score: </span>
              <span className="text-xl font-bold text-neon-green">{score}</span>
            </div>
          </div>
        </div>

        <div className="flex-1 p-6 flex flex-col items-center justify-start overflow-y-auto">
          {/* Game Area */}
          <div className="relative w-full max-w-lg h-[500px] bg-gradient-to-b from-blue-500/20 to-purple-500/20 rounded-2xl border-2 border-primary/30 overflow-hidden">
            {/* Bubbles */}
            <div className="absolute inset-0 p-4">
              {bubbles.map(bubble => (
                !bubble.popped && (
                  <button
                    key={bubble.id}
                    onClick={() => popBubble(bubble.id)}
                    className="absolute w-12 h-12 rounded-full shadow-2xl transform transition-all duration-300 hover:scale-110 animate-float"
                    style={{
                      left: `${bubble.x}px`,
                      top: `${bubble.y}px`,
                      backgroundColor: bubble.color,
                      boxShadow: `0 0 20px ${bubble.color}80, inset 0 -5px 10px rgba(0,0,0,0.2)`,
                    }}
                  >
                    <div className="w-full h-full rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 bg-white/40 rounded-full"></div>
                    </div>
                  </button>
                )
              ))}
            </div>

            {/* Shooter */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 shadow-2xl animate-pulse border-4 border-white/30"></div>
            </div>
          </div>

          {/* Instructions */}
          <div className="glass-card p-4 rounded-xl text-center mt-6 max-w-md">
            <p className="text-sm">🎯 Click bubbles to pop them! Clear all to advance! 🫧</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BubbleShooterGame;
