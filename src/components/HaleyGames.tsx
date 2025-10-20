import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, Gamepad2 } from 'lucide-react';
import RacingGame from './games/RacingGame';
import FarmingGame from './games/FarmingGame';
import ShootingGame from './games/ShootingGame';
import PuzzleGame from './games/PuzzleGame';
import haleyNew from '@/assets/haley-new.jpg';

const games = [
  {
    id: 'racing',
    name: 'Speed Rush 🏎️',
    description: 'Race through neon city streets!',
    difficulty: 'Hard',
    color: 'from-red-600 to-orange-500',
    component: RacingGame
  },
  {
    id: 'farming',
    name: 'Dream Farm 🌾',
    description: 'Build your magical farm with Haley!',
    difficulty: 'Easy',
    color: 'from-green-500 to-emerald-600',
    component: FarmingGame
  },
  {
    id: 'shooting',
    name: 'Monster Hunt 🎯',
    description: 'Shoot the night creatures!',
    difficulty: 'Hard',
    color: 'from-purple-600 to-indigo-700',
    component: ShootingGame
  },
  {
    id: 'puzzle',
    name: 'Magic Tiles ✨',
    description: 'Match magical patterns!',
    difficulty: 'Medium',
    color: 'from-pink-500 to-rose-600',
    component: PuzzleGame
  },
];

interface HaleyGamesProps {
  onClose: () => void;
}

const HaleyGames: React.FC<HaleyGamesProps> = ({ onClose }) => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const SelectedGameComponent = games.find(g => g.id === selectedGame)?.component;

  if (selectedGame && SelectedGameComponent) {
    return <SelectedGameComponent onClose={() => setSelectedGame(null)} />;
  }

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="glass-card rounded-3xl p-8 max-w-6xl w-full max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-3 rounded-full glass-card-hover"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header with Haley */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-pink-400 shadow-2xl animate-float">
              <img src={haleyNew} alt="Haley" className="w-full h-full object-cover" />
              <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
            </div>
          </div>
          <h2 className="text-4xl font-bold magic-text mb-2">Haley's Game Arcade 🎮</h2>
          <p className="text-lg text-muted-foreground font-poppins">
            Choose your game and let's have fun together! 💖
          </p>
        </div>

        {/* Games Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {games.map((game) => (
            <div
              key={game.id}
              onClick={() => setSelectedGame(game.id)}
              className="cursor-pointer group"
            >
              <div className="glass-card-hover rounded-2xl overflow-hidden border-2 border-transparent hover:border-primary transition-all duration-300">
                <div className={`bg-gradient-to-br ${game.color} p-6 text-white relative overflow-hidden h-40 flex items-center justify-center`}>
                  <div className="text-6xl group-hover:scale-125 transition-transform duration-300">
                    {game.name.split(' ')[1]}
                  </div>
                  <div className="absolute top-2 right-2">
                    <span className={`
                      px-3 py-1 rounded-full text-xs font-bold
                      ${game.difficulty === 'Easy' ? 'bg-green-500' : 
                        game.difficulty === 'Medium' ? 'bg-yellow-500' : 
                        'bg-red-500'}
                    `}>
                      {game.difficulty}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">
                    {game.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 font-poppins">
                    {game.description}
                  </p>
                  <Button className="btn-sakura w-full" onClick={() => setSelectedGame(game.id)}>
                    Play Now <Gamepad2 className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Message */}
        <div className="mt-8 text-center glass-card p-4 rounded-2xl">
          <p className="text-muted-foreground font-poppins">
            ✨ More amazing games coming soon! Stay tuned! 🌸
          </p>
        </div>
      </div>
    </div>
  );
};

export default HaleyGames;
