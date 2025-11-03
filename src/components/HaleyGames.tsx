import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, Gamepad2 } from 'lucide-react';
import HaleyRunGame from './games3d/HaleyRunGame';
import VoxelBuilderGame from './games3d/VoxelBuilderGame';
import DrivingSimGame from './games3d/DrivingSimGame';
import haleyNew from '@/assets/haley-new.jpg';

const games = [
  {
    id: 'haley-run',
    name: 'Haley Run ✨',
    description: 'Temple-run style adventure with Haley!',
    difficulty: 'Medium',
    color: 'from-pink-500 to-purple-600',
    component: HaleyRunGame
  },
  {
    id: 'voxel',
    name: 'Haley Craft 🧊',
    description: 'Build magical voxel worlds!',
    difficulty: 'Easy',
    color: 'from-blue-500 to-cyan-600',
    component: VoxelBuilderGame
  },
  {
    id: 'driving',
    name: 'Haley Drive 🚗',
    description: 'Relaxing driving simulator in neon city.',
    difficulty: 'Hard',
    color: 'from-emerald-500 to-teal-600',
    component: DrivingSimGame
  },
];

interface HaleyGamesProps {
  onClose?: () => void;
}

const HaleyGames: React.FC<HaleyGamesProps> = ({ onClose }) => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const SelectedGameComponent = games.find(g => g.id === selectedGame)?.component;

  return (
    <section id="games" className="py-12 relative">
      <div className="container mx-auto px-4">
        {/* Header with Haley */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-neon-pink shadow-2xl animate-float">
              <img src={haleyNew} alt="Haley" className="w-full h-full object-cover" />
              <div className="absolute bottom-1 right-1 w-5 h-5 bg-neon-green rounded-full border-2 border-background animate-pulse-slow"></div>
            </div>
          </div>
          <h2 className="text-4xl font-bold magic-text mb-2">Haley's Game Arcade 🎮</h2>
          <p className="text-lg text-muted-foreground font-poppins">
            Choose your game and let's have fun together! 💖
          </p>
        </div>

        {/* Games Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {games.map((game) => (
            <div
              key={game.id}
              onClick={() => setSelectedGame(game.id)}
              className="cursor-pointer group"
            >
              <div className="glass-card-hover rounded-2xl overflow-hidden border-2 border-transparent hover:border-neon-blue transition-all duration-300">
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
                  <h3 className="font-bold text-xl mb-2 group-hover:text-neon-blue transition-colors">
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
        <div className="mt-8 text-center glass-card p-4 rounded-2xl max-w-2xl mx-auto">
          <p className="text-muted-foreground font-poppins">
            ✨ More amazing games coming soon! Stay tuned! 🌸
          </p>
        </div>
      </div>
      
      {/* Game Modals */}
      {selectedGame && SelectedGameComponent && (
        <SelectedGameComponent onClose={() => setSelectedGame(null)} />
      )}
    </section>
  );
};

export default HaleyGames;
