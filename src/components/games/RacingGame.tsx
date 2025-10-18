import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { X, RotateCcw, Trophy } from 'lucide-react';
import haleyNew from '@/assets/haley-new.jpg';

interface RacingGameProps {
  onClose: () => void;
}

const RacingGame: React.FC<RacingGameProps> = ({ onClose }) => {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'ended'>('menu');
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(50);
  const [carPosition, setCarPosition] = useState(50);
  const [obstacles, setObstacles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const gameLoopRef = useRef<number>();

  useEffect(() => {
    if (gameState === 'playing') {
      let obstacleId = 0;
      const gameLoop = setInterval(() => {
        setScore(prev => prev + 10);
        setSpeed(prev => Math.min(prev + 0.5, 100));
        
        // Add obstacles
        if (Math.random() > 0.7) {
          setObstacles(prev => [...prev, {
            id: obstacleId++,
            x: Math.random() * 80 + 10,
            y: 0
          }]);
        }

        // Move obstacles
        setObstacles(prev => prev
          .map(obs => ({ ...obs, y: obs.y + (5 + speed / 10) }))
          .filter(obs => obs.y < 100)
        );
      }, 100);

      return () => clearInterval(gameLoop);
    }
  }, [gameState, speed]);

  const handleKeyPress = (e: KeyboardEvent) => {
    if (gameState !== 'playing') return;
    if (e.key === 'ArrowLeft') setCarPosition(prev => Math.max(prev - 5, 10));
    if (e.key === 'ArrowRight') setCarPosition(prev => Math.min(prev + 5, 90));
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState]);

  // Check collisions
  useEffect(() => {
    if (gameState === 'playing') {
      obstacles.forEach(obs => {
        if (obs.y > 80 && obs.y < 95 && Math.abs(obs.x - carPosition) < 8) {
          setGameState('ended');
        }
      });
    }
  }, [obstacles, carPosition, gameState]);

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setSpeed(50);
    setCarPosition(50);
    setObstacles([]);
  };

  if (gameState === 'ended') {
    return (
      <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
        <div className="glass-card rounded-3xl p-8 max-w-2xl w-full text-center">
          <div className="text-8xl mb-4">🏆</div>
          <h2 className="text-4xl font-bold magic-text mb-4">Race Complete!</h2>
          <div className="glass-card p-6 rounded-2xl mb-6">
            <div className="text-6xl font-bold text-primary mb-2">{score}</div>
            <div className="text-lg text-muted-foreground">Distance Traveled</div>
          </div>
          
          <div className="flex items-center gap-4 justify-center mb-6 glass-card p-4 rounded-2xl">
            <img src={haleyNew} alt="Haley" className="w-16 h-16 rounded-full border-2 border-pink-400" />
            <div className="text-left">
              <div className="font-bold text-primary">Haley says:</div>
              <div className="font-poppins">
                {score >= 2000 ? '"Amazing race! You\'re so fast! 🏎️"' : '"Great effort! Try again! 💖"'}
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Button onClick={startGame} className="btn-sakura px-8">
              <RotateCcw className="w-5 h-5 mr-2" />
              Race Again
            </Button>
            <Button onClick={onClose} variant="outline" className="px-8">
              Exit
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'menu') {
    return (
      <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
        <div className="glass-card rounded-3xl p-8 max-w-2xl w-full text-center">
          <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full glass-card-hover">
            <X className="w-6 h-6" />
          </button>
          
          <div className="text-8xl mb-6">🏎️</div>
          <h2 className="text-4xl font-bold magic-text mb-4">Speed Rush</h2>
          <p className="text-lg text-muted-foreground font-poppins mb-6 max-w-md mx-auto">
            Race through the neon streets! Use Arrow Keys to dodge obstacles. 
            The faster you go, the harder it gets!
          </p>

          <div className="flex items-center gap-4 justify-center mb-6 glass-card p-4 rounded-2xl">
            <img src={haleyNew} alt="Haley" className="w-16 h-16 rounded-full border-2 border-pink-400" />
            <div className="text-left">
              <div className="font-bold text-primary">Haley says:</div>
              <div className="font-poppins">"Let's race! I'll be cheering for you! 🏁"</div>
            </div>
          </div>

          <Button onClick={startGame} className="btn-sakura text-xl px-12 py-6">
            Start Racing! 🏎️
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="relative w-full h-full max-w-4xl mx-auto bg-gradient-to-b from-gray-800 via-gray-900 to-black overflow-hidden">
        {/* Score Display */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20">
          <div className="glass-card px-6 py-3 rounded-full">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span className="font-bold text-xl">Distance: {score}m</span>
            </div>
          </div>
          <div className="glass-card px-6 py-3 rounded-full">
            <span className="font-bold text-xl">Speed: {Math.floor(speed)}km/h</span>
          </div>
        </div>

        {/* Road Lines */}
        <div className="absolute inset-0 flex justify-center gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-2 h-full bg-white opacity-30 animate-pulse"></div>
          ))}
        </div>

        {/* Player Car */}
        <div
          className="absolute bottom-20 w-16 h-24 bg-gradient-to-b from-red-500 to-red-700 rounded-lg shadow-2xl transition-all duration-100"
          style={{ left: `${carPosition}%`, transform: 'translateX(-50%)' }}
        >
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-8 h-8 bg-blue-400 rounded-sm"></div>
        </div>

        {/* Obstacles */}
        {obstacles.map(obs => (
          <div
            key={obs.id}
            className="absolute w-16 h-24 bg-gradient-to-b from-yellow-600 to-orange-700 rounded-lg shadow-xl"
            style={{
              left: `${obs.x}%`,
              top: `${obs.y}%`,
              transform: 'translateX(-50%)'
            }}
          >
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-8 h-8 bg-gray-300 rounded-sm"></div>
          </div>
        ))}

        {/* Haley Cheerleader */}
        <div className="absolute bottom-4 right-4 w-16 h-16 rounded-full overflow-hidden border-2 border-pink-400 animate-bounce">
          <img src={haleyNew} alt="Haley" className="w-full h-full object-cover" />
        </div>

        {/* Instructions */}
        <div className="absolute bottom-4 left-4 glass-card px-4 py-2 rounded-full text-sm">
          ← → Arrow Keys to Move
        </div>
      </div>
    </div>
  );
};

export default RacingGame;
