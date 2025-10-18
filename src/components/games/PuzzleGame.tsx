import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, RotateCcw, Star } from 'lucide-react';
import haleyNew from '@/assets/haley-new.jpg';

interface PuzzleGameProps {
  onClose: () => void;
}

const magicSymbols = ['⭐', '🌸', '💖', '✨', '🌙', '🦋'];

const PuzzleGame: React.FC<PuzzleGameProps> = ({ onClose }) => {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'ended'>('menu');
  const [score, setScore] = useState(0);
  const [tiles, setTiles] = useState<string[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  const initGame = () => {
    const symbols = [...magicSymbols, ...magicSymbols];
    const shuffled = symbols.sort(() => Math.random() - 0.5);
    setTiles(shuffled);
    setSelected([]);
    setMatched([]);
    setMoves(0);
    setScore(0);
    setGameState('playing');
  };

  useEffect(() => {
    if (selected.length === 2) {
      setMoves(prev => prev + 1);
      const [first, second] = selected;
      
      if (tiles[first] === tiles[second]) {
        setMatched(prev => [...prev, first, second]);
        setScore(prev => prev + 100);
        setSelected([]);
      } else {
        setTimeout(() => setSelected([]), 600);
      }
    }
  }, [selected, tiles]);

  useEffect(() => {
    if (matched.length === tiles.length && tiles.length > 0) {
      setTimeout(() => setGameState('ended'), 500);
    }
  }, [matched, tiles]);

  const handleTileClick = (index: number) => {
    if (
      selected.length < 2 &&
      !selected.includes(index) &&
      !matched.includes(index)
    ) {
      setSelected(prev => [...prev, index]);
    }
  };

  if (gameState === 'menu') {
    return (
      <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
        <div className="glass-card rounded-3xl p-8 max-w-2xl w-full text-center">
          <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full glass-card-hover">
            <X className="w-6 h-6" />
          </button>
          
          <div className="text-8xl mb-6">✨</div>
          <h2 className="text-4xl font-bold magic-text mb-4">Magic Tiles</h2>
          <p className="text-lg text-muted-foreground font-poppins mb-6 max-w-md mx-auto">
            Match the magical symbols! Find pairs by clicking tiles. 
            Complete the puzzle in as few moves as possible!
          </p>

          <div className="flex items-center gap-4 justify-center mb-6 glass-card p-4 rounded-2xl">
            <img src={haleyNew} alt="Haley" className="w-16 h-16 rounded-full border-2 border-pink-400" />
            <div className="text-left">
              <div className="font-bold text-primary">Haley says:</div>
              <div className="font-poppins">"Let's find the matching magic! ✨"</div>
            </div>
          </div>

          <Button onClick={initGame} className="btn-sakura text-xl px-12 py-6">
            Start Puzzle! 🧩
          </Button>
        </div>
      </div>
    );
  }

  if (gameState === 'ended') {
    return (
      <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
        <div className="glass-card rounded-3xl p-8 max-w-2xl w-full text-center">
          <div className="text-8xl mb-4">🎉</div>
          <h2 className="text-4xl font-bold magic-text mb-4">Puzzle Complete!</h2>
          <div className="glass-card p-6 rounded-2xl mb-6">
            <div className="text-6xl font-bold text-primary mb-2">{score}</div>
            <div className="text-lg text-muted-foreground">Points • {moves} Moves</div>
          </div>
          
          <div className="flex items-center gap-4 justify-center mb-6 glass-card p-4 rounded-2xl">
            <img src={haleyNew} alt="Haley" className="w-16 h-16 rounded-full border-2 border-pink-400" />
            <div className="text-left">
              <div className="font-bold text-primary">Haley says:</div>
              <div className="font-poppins">
                {moves <= 10 ? '"Perfect! You\'re amazing! 🌟"' : '"Great job! Try to beat this! 💖"'}
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Button onClick={initGame} className="btn-sakura px-8">
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
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      <div className="glass-card rounded-3xl p-8 max-w-4xl w-full">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full glass-card-hover">
          <X className="w-6 h-6" />
        </button>

        {/* HUD */}
        <div className="flex justify-between items-center mb-6">
          <div className="glass-card px-6 py-3 rounded-full flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <span className="font-bold text-xl">Score: {score}</span>
          </div>
          <div className="glass-card px-6 py-3 rounded-full">
            <span className="font-bold text-xl">Moves: {moves}</span>
          </div>
        </div>

        {/* Puzzle Grid */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {tiles.map((tile, index) => (
            <div
              key={index}
              onClick={() => handleTileClick(index)}
              className={`
                aspect-square rounded-2xl flex items-center justify-center text-6xl
                cursor-pointer transition-all duration-300 transform
                ${matched.includes(index)
                  ? 'bg-green-500/50 scale-95'
                  : selected.includes(index)
                  ? 'bg-purple-500/50 scale-105'
                  : 'glass-card hover:scale-105'
                }
              `}
            >
              {(selected.includes(index) || matched.includes(index)) ? tile : '❓'}
            </div>
          ))}
        </div>

        {/* Haley */}
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-pink-400 animate-float">
            <img src={haleyNew} alt="Haley" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PuzzleGame;
