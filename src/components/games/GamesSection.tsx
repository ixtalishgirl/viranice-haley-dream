import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Gamepad2, Trophy, Star, Zap } from 'lucide-react';
import GameModal from './GameModal';
import haleyNew from '@/assets/haley-new.jpg';

const games = [
  {
    id: 1,
    name: "Haley's Shadow Escape",
    description: "Help Haley escape the haunted mansion! Horror meets puzzle.",
    difficulty: "Hard",
    type: "Horror",
    emoji: "👻",
    color: "from-purple-600 to-black"
  },
  {
    id: 2,
    name: "Memory Match Magic",
    description: "Match magical anime cards with Haley!",
    difficulty: "Easy",
    type: "Puzzle",
    emoji: "🌸",
    color: "from-pink-500 to-purple-500"
  },
  {
    id: 3,
    name: "Dreamland Runner",
    description: "Run through Haley's dreamland, collect stars!",
    difficulty: "Medium",
    type: "Action",
    emoji: "⭐",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 4,
    name: "Anime Quiz Master",
    description: "Test your anime knowledge with Haley!",
    difficulty: "Medium",
    type: "Trivia",
    emoji: "📚",
    color: "from-green-500 to-teal-500"
  },
  {
    id: 5,
    name: "Nightmare Maze",
    description: "Navigate the dark maze, avoid the monsters!",
    difficulty: "Hard",
    type: "Horror",
    emoji: "💀",
    color: "from-red-900 to-black"
  },
  {
    id: 6,
    name: "Sakura Catcher",
    description: "Catch falling sakura petals with Haley!",
    difficulty: "Easy",
    type: "Casual",
    emoji: "🌺",
    color: "from-pink-300 to-rose-400"
  },
  {
    id: 7,
    name: "Spirit Finder",
    description: "Find hidden spirits before time runs out!",
    difficulty: "Medium",
    type: "Horror",
    emoji: "👁️",
    color: "from-indigo-900 to-purple-900"
  },
  {
    id: 8,
    name: "Rhythm Beat",
    description: "Hit the beats perfectly with anime music!",
    difficulty: "Hard",
    type: "Music",
    emoji: "🎵",
    color: "from-orange-500 to-pink-500"
  },
  {
    id: 9,
    name: "Word Wizard",
    description: "Make words from anime character names!",
    difficulty: "Easy",
    type: "Word",
    emoji: "✍️",
    color: "from-yellow-500 to-orange-500"
  },
  {
    id: 10,
    name: "Dark Forest Quest",
    description: "Survive the cursed forest with Haley's guidance!",
    difficulty: "Hard",
    type: "Horror Adventure",
    emoji: "🌲",
    color: "from-green-900 to-black"
  }
];

const GamesSection = () => {
  const [showPopup, setShowPopup] = useState(true);
  const [selectedGame, setSelectedGame] = useState<number | null>(null);

  return (
    <section id="games" className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Haley Game Invitation Popup */}
        {showPopup && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 animate-scale-in">
            <div className="relative">
              {/* Haley Avatar */}
              <div className="absolute -top-24 left-1/2 transform -translate-x-1/2 w-32 h-32 rounded-full overflow-hidden border-4 border-pink-400 shadow-2xl animate-float">
                <img src={haleyNew} alt="Haley" className="w-full h-full object-cover" />
                <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              
              {/* Popup Message */}
              <div className="bg-gradient-to-br from-pink-500 via-purple-500 to-pink-600 p-8 rounded-3xl shadow-2xl text-white text-center max-w-md animate-glow-pulse">
                <h3 className="text-3xl font-bold mb-4 animate-bounce">
                  Wanna play games with me? 🎮
                </h3>
                <p className="text-lg mb-6 font-poppins">
                  I've created 10 amazing games just for you! Let's have some fun together! ✨
                </p>
                <div className="flex gap-3 justify-center">
                  <Button 
                    onClick={() => setShowPopup(false)}
                    className="bg-white text-pink-600 hover:bg-pink-50 font-bold px-8 py-3 rounded-full shadow-lg"
                  >
                    Let's Play! 🎉
                  </Button>
                  <Button 
                    onClick={() => setShowPopup(false)}
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white/20 px-6 py-3 rounded-full"
                  >
                    Maybe Later
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="magic-text">Haley's Game Arcade</span> 🎮
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-poppins">
            Play premium games with Haley! From horror adventures to casual fun, 
            challenge yourself and compete for the highest scores! 🏆
          </p>
        </div>

        {/* Games Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {games.map((game) => (
            <div
              key={game.id}
              onClick={() => setSelectedGame(game.id)}
              className="group cursor-pointer"
            >
              <div className="glass-card-hover rounded-2xl overflow-hidden border-2 border-transparent hover:border-primary transition-all duration-300">
                {/* Game Card Header */}
                <div className={`bg-gradient-to-br ${game.color} p-6 text-white relative overflow-hidden`}>
                  <div className="absolute top-2 right-2 text-5xl opacity-20 animate-float">
                    {game.emoji}
                  </div>
                  <div className="relative z-10">
                    <div className="text-6xl mb-3 animate-bounce">{game.emoji}</div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`
                        px-3 py-1 rounded-full text-xs font-bold
                        ${game.difficulty === 'Easy' ? 'bg-green-500' : 
                          game.difficulty === 'Medium' ? 'bg-yellow-500' : 
                          'bg-red-500'}
                      `}>
                        {game.difficulty}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20">
                        {game.type}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Game Info */}
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                    {game.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 font-poppins line-clamp-2">
                    {game.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Trophy className="w-4 h-4" />
                      <span>High Score: ---</span>
                    </div>
                    <Button className="btn-sakura text-xs px-4 py-2">
                      Play <Gamepad2 className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Leaderboard Section */}
        <div className="mt-16 glass-card p-8 rounded-3xl max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500 animate-bounce" />
            <h3 className="text-3xl font-bold magic-text mb-2">🏆 Top Players Leaderboard 🏆</h3>
            <p className="text-muted-foreground font-poppins">Compete with players worldwide!</p>
          </div>
          
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((rank) => (
              <div key={rank} className="flex items-center gap-4 p-4 glass-card rounded-xl hover:scale-105 transition-transform">
                <div className={`
                  w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl
                  ${rank === 1 ? 'bg-yellow-500 text-white' : 
                    rank === 2 ? 'bg-gray-400 text-white' : 
                    rank === 3 ? 'bg-orange-600 text-white' : 
                    'bg-primary/20 text-primary'}
                `}>
                  #{rank}
                </div>
                <div className="flex-1">
                  <div className="font-bold">Player {rank}</div>
                  <div className="text-xs text-muted-foreground">Total Score: {10000 - (rank * 1000)}</div>
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: rank <= 3 ? 5 : 3 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Game Modal */}
      {selectedGame && (
        <GameModal
          game={games.find(g => g.id === selectedGame)!}
          onClose={() => setSelectedGame(null)}
        />
      )}
    </section>
  );
};

export default GamesSection;