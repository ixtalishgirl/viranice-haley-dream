import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Play, RotateCcw, Trophy, Home } from 'lucide-react';
import haleyNew from '@/assets/haley-new.jpg';

interface Game {
  id: number;
  name: string;
  description: string;
  difficulty: string;
  type: string;
  emoji: string;
  color: string;
}

interface GameModalProps {
  game: Game;
  onClose: () => void;
}

const GameModal: React.FC<GameModalProps> = ({ game, onClose }) => {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'ended'>('menu');
  const [score, setScore] = useState(0);
  const [haleyPosition, setHaleyPosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    // Animate Haley moving around during gameplay
    if (gameState === 'playing') {
      const interval = setInterval(() => {
        setHaleyPosition({
          x: Math.random() * 80 + 10,
          y: Math.random() * 80 + 10
        });
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [gameState]);

  const startGame = () => {
    setGameState('playing');
    setScore(0);
  };

  const endGame = () => {
    setGameState('ended');
  };

  const restartGame = () => {
    setScore(0);
    setGameState('playing');
  };

  const renderGameContent = () => {
    if (gameState === 'menu') {
      return (
        <div className="text-center space-y-6">
          <div className="text-8xl mb-6 animate-bounce">{game.emoji}</div>
          <h2 className="text-4xl font-bold magic-text">{game.name}</h2>
          <p className="text-lg text-muted-foreground font-poppins max-w-md mx-auto">
            {game.description}
          </p>
          
          <div className="flex gap-4 justify-center items-center">
            <div className="glass-card p-4 rounded-xl">
              <div className="text-sm text-muted-foreground">Difficulty</div>
              <div className={`
                font-bold text-lg
                ${game.difficulty === 'Easy' ? 'text-green-500' : 
                  game.difficulty === 'Medium' ? 'text-yellow-500' : 
                  'text-red-500'}
              `}>
                {game.difficulty}
              </div>
            </div>
            <div className="glass-card p-4 rounded-xl">
              <div className="text-sm text-muted-foreground">Type</div>
              <div className="font-bold text-lg text-primary">{game.type}</div>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <Button onClick={startGame} className="btn-sakura text-xl px-12 py-6 w-full max-w-md">
              <Play className="w-6 h-6 mr-3" />
              Start Game!
            </Button>
            <Button onClick={onClose} variant="outline" className="w-full max-w-md">
              <Home className="w-5 h-5 mr-2" />
              Back to Arcade
            </Button>
          </div>

          {/* Haley Encouraging */}
          <div className="mt-8 glass-card p-6 rounded-2xl max-w-md mx-auto">
            <div className="flex items-center gap-4">
              <img src={haleyNew} alt="Haley" className="w-16 h-16 rounded-full border-2 border-pink-400" />
              <div className="text-left">
                <div className="font-bold text-primary">Haley says:</div>
                <div className="text-sm font-poppins">"You've got this! Let's have fun together! 🌸"</div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (gameState === 'playing') {
      return (
        <div className="relative h-[600px] bg-gradient-to-br from-purple-900 via-black to-blue-900 rounded-3xl overflow-hidden">
          {/* Game Title Bar */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20">
            <div className="glass-card px-6 py-3 rounded-full">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <span className="font-bold text-xl">Score: {score}</span>
              </div>
            </div>
            <Button onClick={endGame} className="btn-sakura px-6">
              End Game
            </Button>
          </div>

          {/* Animated Haley in Game */}
          <div 
            className="absolute w-24 h-24 rounded-full overflow-hidden border-4 border-pink-400 shadow-2xl transition-all duration-1000 ease-in-out animate-float"
            style={{ 
              left: `${haleyPosition.x}%`, 
              top: `${haleyPosition.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <img src={haleyNew} alt="Haley" className="w-full h-full object-cover" />
          </div>

          {/* Game Instructions */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 glass-card px-8 py-4 rounded-full">
            <p className="text-center font-poppins">
              🎮 Click on Haley to score points! {game.emoji}
            </p>
          </div>

          {/* Interactive Game Area */}
          <div 
            className="absolute inset-0"
            onClick={() => {
              const newScore = score + Math.floor(Math.random() * 100) + 50;
              setScore(newScore);
              if (newScore > 1000) {
                endGame();
              }
            }}
          >
            {/* Floating Game Elements */}
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="absolute text-4xl animate-float"
                style={{
                  left: `${Math.random() * 90}%`,
                  top: `${Math.random() * 90}%`,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}
              >
                {['⭐', '🌸', '💖', '✨', '🎮'][Math.floor(Math.random() * 5)]}
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Game Ended
    return (
      <div className="text-center space-y-8">
        <div className="text-8xl mb-4">🏆</div>
        <h2 className="text-4xl font-bold magic-text">Game Complete!</h2>
        
        <div className="glass-card p-8 rounded-3xl max-w-md mx-auto">
          <div className="text-6xl font-bold text-primary mb-2">{score}</div>
          <div className="text-lg text-muted-foreground">Final Score</div>
          
          <div className="mt-6 pt-6 border-t border-border">
            <div className="text-sm text-muted-foreground mb-2">Performance</div>
            <div className="text-2xl font-bold">
              {score >= 1000 ? '🌟 Amazing!' : score >= 500 ? '⭐ Great!' : '💖 Good Try!'}
            </div>
          </div>
        </div>

        {/* Haley Reaction */}
        <div className="glass-card p-6 rounded-2xl max-w-md mx-auto">
          <div className="flex items-center gap-4">
            <img src={haleyNew} alt="Haley" className="w-20 h-20 rounded-full border-4 border-pink-400 animate-bounce" />
            <div className="text-left">
              <div className="font-bold text-primary mb-1">Haley says:</div>
              <div className="font-poppins">
                {score >= 1000 
                  ? '"Wow! You\'re incredible! 🎉"' 
                  : score >= 500 
                  ? '"Great job! Let\'s play again! 💖"'
                  : '"Don\'t give up! You can do better! 🌸"'}
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <Button onClick={restartGame} className="btn-purple px-8 py-4">
            <RotateCcw className="w-5 h-5 mr-2" />
            Play Again
          </Button>
          <Button onClick={onClose} variant="outline" className="px-8 py-4">
            <Home className="w-5 h-5 mr-2" />
            Back to Arcade
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="glass-card rounded-3xl p-8 max-w-6xl w-full max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full glass-card-hover z-30"
        >
          <X className="w-6 h-6" />
        </button>
        
        {renderGameContent()}
      </div>
    </div>
  );
};

export default GameModal;