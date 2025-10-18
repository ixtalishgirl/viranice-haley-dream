import React, { useState } from 'react';
import { Gamepad2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import HaleyGames from './HaleyGames';

const HaleyGameInvite = () => {
  const [showInvite, setShowInvite] = useState(true);
  const [showGames, setShowGames] = useState(false);

  if (!showInvite) return null;

  return (
    <>
      {/* Popup Bubble outside Haley */}
      <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 z-20 animate-scale-in">
        <div className="relative">
          {/* Speech Bubble */}
          <div className="bg-gradient-to-br from-pink-500 via-purple-500 to-pink-600 px-6 py-4 rounded-3xl shadow-2xl relative animate-glow-pulse">
            {/* Close button */}
            <button
              onClick={() => setShowInvite(false)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
            >
              <X className="w-4 h-4 text-pink-600" />
            </button>
            
            {/* Green Online Dot */}
            <div className="absolute -top-1 -left-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
            
            {/* Message */}
            <div className="text-white text-center">
              <div className="text-lg font-bold mb-1 animate-bounce">
                Wanna play games with me? 🎮
              </div>
              <div className="text-sm opacity-90 mb-3">
                Challenge me in awesome games! 💖
              </div>
              <Button
                onClick={() => {
                  setShowInvite(false);
                  setShowGames(true);
                }}
                className="bg-white text-pink-600 hover:bg-pink-50 font-bold px-6 py-2 rounded-full shadow-lg"
              >
                Let's Play! 🎉
              </Button>
            </div>

            {/* Bubble Tail pointing to Haley */}
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-pink-600"></div>
          </div>
        </div>
      </div>

      {/* Games Modal */}
      {showGames && <HaleyGames onClose={() => setShowGames(false)} />}
    </>
  );
};

export default HaleyGameInvite;
