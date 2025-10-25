import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Heart } from 'lucide-react';

interface GameProps { onClose: () => void }

interface Cat {
  id: number;
  x: number;
  isSafe: boolean;
}

const SaveCatGame: React.FC<GameProps> = ({ onClose }) => {
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [cats, setCats] = useState<Cat[]>([]);
  const [basketX, setBasketX] = useState(50);

  useEffect(() => {
    const spawnCat = () => {
      const newCat: Cat = {
        id: Date.now(),
        x: Math.random() * 90 + 5,
        isSafe: false
      };
      setCats(prev => [...prev, newCat]);
    };

    const interval = setInterval(spawnCat, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const moveCats = setInterval(() => {
      setCats(prev => {
        const updated = prev.filter(cat => {
          const catElement = document.getElementById(`cat-${cat.id}`);
          const basketElement = document.getElementById('basket');
          
          if (catElement && basketElement) {
            const catRect = catElement.getBoundingClientRect();
            const basketRect = basketElement.getBoundingClientRect();
            
            // Check collision
            if (catRect.bottom >= basketRect.top &&
                catRect.left >= basketRect.left - 20 &&
                catRect.right <= basketRect.right + 20) {
              setScore(prev => prev + 10);
              return false; // Remove cat
            }
            
            // Cat fell
            if (catRect.top > window.innerHeight) {
              setLives(prev => Math.max(0, prev - 1));
              return false;
            }
          }
          return true;
        });
        return updated;
      });
    }, 100);

    return () => clearInterval(moveCats);
  }, []);

  const moveBasket = (direction: 'left' | 'right') => {
    setBasketX(prev => {
      if (direction === 'left') return Math.max(10, prev - 10);
      return Math.min(90, prev + 10);
    });
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') moveBasket('left');
      if (e.key === 'ArrowRight') moveBasket('right');
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  if (lives === 0) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md animate-fade-in">
        <div className="glass-card rounded-3xl p-12 text-center max-w-md">
          <h3 className="text-4xl font-bold magic-text mb-4">Game Over! 😿</h3>
          <p className="text-2xl mb-2">Final Score: <span className="text-primary font-bold">{score}</span></p>
          <p className="text-muted-foreground mb-6">You saved {score / 10} cats! 🐱</p>
          <div className="flex gap-4">
            <Button onClick={() => {
              setScore(0);
              setLives(3);
              setCats([]);
            }} className="btn-sakura flex-1">
              Play Again
            </Button>
            <Button onClick={onClose} variant="outline" className="flex-1">
              Exit
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-b from-sky-400 via-blue-300 to-blue-500 animate-fade-in overflow-hidden">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-3 rounded-full glass-card-hover z-10 hover:bg-destructive/20 transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Score & Lives */}
      <div className="absolute top-4 left-4 glass-card p-4 rounded-xl z-10">
        <div className="flex items-center gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Score</p>
            <p className="text-2xl font-bold text-primary">{score}</p>
          </div>
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <Heart key={i} className={`w-6 h-6 ${i < lives ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 glass-card px-6 py-3 rounded-full z-10">
        <h3 className="text-2xl font-bold magic-text">Save the Cats! 🐱</h3>
      </div>

      {/* Game Area */}
      <div className="relative w-full h-full">
        {/* Falling Cats */}
        {cats.map(cat => (
          <div
            key={cat.id}
            id={`cat-${cat.id}`}
            className="absolute animate-fall"
            style={{ left: `${cat.x}%`, top: '-80px' }}
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-4 border-white shadow-2xl flex items-center justify-center">
              {/* Cat face */}
              <div className="text-3xl">🐱</div>
            </div>
            {/* Blue eyes effect */}
            <div className="absolute top-5 left-4 w-2 h-2 bg-blue-200 rounded-full animate-pulse"></div>
            <div className="absolute top-5 right-4 w-2 h-2 bg-blue-200 rounded-full animate-pulse"></div>
          </div>
        ))}

        {/* Basket */}
        <div
          id="basket"
          className="absolute bottom-20 w-24 h-16 transition-all duration-200"
          style={{ left: `${basketX}%`, transform: 'translateX(-50%)' }}
        >
          <div className="w-full h-full bg-gradient-to-br from-amber-600 to-amber-800 rounded-t-xl border-4 border-amber-900 shadow-2xl relative">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-4xl">🧺</div>
          </div>
        </div>

        {/* Controls */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
          <Button onClick={() => moveBasket('left')} className="btn-sakura px-8 py-6 text-lg">
            ← Left
          </Button>
          <Button onClick={() => moveBasket('right')} className="btn-sakura px-8 py-6 text-lg">
            Right →
          </Button>
        </div>

        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center text-white text-sm drop-shadow-lg">
          Use Arrow Keys or Buttons
        </div>
      </div>

      <style>{`
        @keyframes fall {
          from { transform: translateY(0); }
          to { transform: translateY(calc(100vh + 100px)); }
        }
        .animate-fall {
          animation: fall 4s linear forwards;
        }
      `}</style>
    </div>
  );
};

export default SaveCatGame;
