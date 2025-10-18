import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { X, RotateCcw, Target } from 'lucide-react';
import haleyNew from '@/assets/haley-new.jpg';

interface ShootingGameProps {
  onClose: () => void;
}

interface Monster {
  id: number;
  x: number;
  y: number;
  emoji: string;
  hp: number;
}

interface Bullet {
  id: number;
  x: number;
  y: number;
}

const monsterEmojis = ['👻', '💀', '🧟', '🦇', '🕷️'];

const ShootingGame: React.FC<ShootingGameProps> = ({ onClose }) => {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'ended'>('menu');
  const [score, setScore] = useState(0);
  const [playerX, setPlayerX] = useState(50);
  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [bullets, setBullets] = useState<Bullet[]>([]);
  const [health, setHealth] = useState(100);

  useEffect(() => {
    if (gameState === 'playing') {
      // Spawn monsters
      const spawnInterval = setInterval(() => {
        if (monsters.length < 10) {
          setMonsters(prev => [...prev, {
            id: Date.now(),
            x: Math.random() * 90 + 5,
            y: 0,
            emoji: monsterEmojis[Math.floor(Math.random() * monsterEmojis.length)],
            hp: 1
          }]);
        }
      }, 1500);

      // Move monsters down
      const moveInterval = setInterval(() => {
        setMonsters(prev => prev.map(m => ({
          ...m,
          y: m.y + 2
        })).filter(m => {
          if (m.y > 95) {
            setHealth(h => h - 10);
            return false;
          }
          return true;
        }));
      }, 100);

      // Move bullets up
      const bulletInterval = setInterval(() => {
        setBullets(prev => prev.map(b => ({
          ...b,
          y: b.y - 5
        })).filter(b => b.y > 0));
      }, 50);

      return () => {
        clearInterval(spawnInterval);
        clearInterval(moveInterval);
        clearInterval(bulletInterval);
      };
    }
  }, [gameState, monsters.length]);

  // Check collisions
  useEffect(() => {
    bullets.forEach(bullet => {
      monsters.forEach(monster => {
        if (
          Math.abs(bullet.x - monster.x) < 5 &&
          Math.abs(bullet.y - monster.y) < 5
        ) {
          setScore(prev => prev + 100);
          setMonsters(prev => prev.filter(m => m.id !== monster.id));
          setBullets(prev => prev.filter(b => b.id !== bullet.id));
        }
      });
    });
  }, [bullets, monsters]);

  // Game over
  useEffect(() => {
    if (health <= 0 && gameState === 'playing') {
      setGameState('ended');
    }
  }, [health, gameState]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setPlayerX(Math.max(5, Math.min(95, x)));
  };

  const shoot = () => {
    if (gameState === 'playing') {
      setBullets(prev => [...prev, {
        id: Date.now(),
        x: playerX,
        y: 85
      }]);
    }
  };

  if (gameState === 'menu') {
    return (
      <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
        <div className="glass-card rounded-3xl p-8 max-w-2xl w-full text-center">
          <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full glass-card-hover">
            <X className="w-6 h-6" />
          </button>
          
          <div className="text-8xl mb-6">🎯</div>
          <h2 className="text-4xl font-bold magic-text mb-4">Monster Hunt</h2>
          <p className="text-lg text-muted-foreground font-poppins mb-6 max-w-md mx-auto">
            Shoot the night creatures before they reach you! 
            Move your mouse to aim and click to shoot!
          </p>

          <div className="flex items-center gap-4 justify-center mb-6 glass-card p-4 rounded-2xl">
            <img src={haleyNew} alt="Haley" className="w-16 h-16 rounded-full border-2 border-pink-400" />
            <div className="text-left">
              <div className="font-bold text-primary">Haley says:</div>
              <div className="font-poppins">"Protect us from the monsters! 👻"</div>
            </div>
          </div>

          <Button onClick={() => setGameState('playing')} className="btn-sakura text-xl px-12 py-6">
            Start Hunting! 🎯
          </Button>
        </div>
      </div>
    );
  }

  if (gameState === 'ended') {
    return (
      <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
        <div className="glass-card rounded-3xl p-8 max-w-2xl w-full text-center">
          <div className="text-8xl mb-4">💀</div>
          <h2 className="text-4xl font-bold magic-text mb-4">Game Over!</h2>
          <div className="glass-card p-6 rounded-2xl mb-6">
            <div className="text-6xl font-bold text-primary mb-2">{score}</div>
            <div className="text-lg text-muted-foreground">Final Score</div>
          </div>
          
          <div className="flex items-center gap-4 justify-center mb-6 glass-card p-4 rounded-2xl">
            <img src={haleyNew} alt="Haley" className="w-16 h-16 rounded-full border-2 border-pink-400" />
            <div className="text-left">
              <div className="font-bold text-primary">Haley says:</div>
              <div className="font-poppins">
                {score >= 1000 ? '"Amazing! You\'re my hero! 🏆"' : '"Good try! Let\'s go again! 💖"'}
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Button onClick={() => {
              setGameState('playing');
              setScore(0);
              setHealth(100);
              setMonsters([]);
              setBullets([]);
            }} className="btn-sakura px-8">
              <RotateCcw className="w-5 h-5 mr-2" />
              Play Again
            </Button>
            <Button onClick={onClose} variant="outline" className="px-8">
              Exit
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black z-50">
      <div
        className="relative w-full h-full bg-gradient-to-b from-purple-900 via-indigo-900 to-black overflow-hidden cursor-crosshair"
        onMouseMove={handleMouseMove}
        onClick={shoot}
      >
        {/* HUD */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20">
          <div className="glass-card px-6 py-3 rounded-full flex items-center gap-2">
            <Target className="w-5 h-5 text-red-500" />
            <span className="font-bold text-xl">Score: {score}</span>
          </div>
          <div className="glass-card px-6 py-3 rounded-full">
            <div className="w-48 h-4 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-red-500 to-green-500 transition-all duration-300"
                style={{ width: `${health}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Monsters */}
        {monsters.map(monster => (
          <div
            key={monster.id}
            className="absolute text-5xl animate-pulse"
            style={{
              left: `${monster.x}%`,
              top: `${monster.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            {monster.emoji}
          </div>
        ))}

        {/* Bullets */}
        {bullets.map(bullet => (
          <div
            key={bullet.id}
            className="absolute w-2 h-4 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50"
            style={{
              left: `${bullet.x}%`,
              top: `${bullet.y}%`,
              transform: 'translateX(-50%)'
            }}
          ></div>
        ))}

        {/* Player */}
        <div
          className="absolute bottom-10 w-16 h-16 rounded-full overflow-hidden border-4 border-pink-400 shadow-2xl transition-all duration-100"
          style={{ left: `${playerX}%`, transform: 'translateX(-50%)' }}
        >
          <img src={haleyNew} alt="Player" className="w-full h-full object-cover" />
        </div>

        {/* Instructions */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 glass-card px-6 py-2 rounded-full text-sm">
          Move mouse to aim • Click to shoot 🎯
        </div>
      </div>
    </div>
  );
};

export default ShootingGame;
