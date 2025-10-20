import React, { useState } from 'react';
import { Gamepad2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import HaleyGames from './HaleyGames';

const HaleyGameInvite = () => {
  const [showInvite, setShowInvite] = useState(true);
  const [showGames, setShowGames] = useState(false);

  if (!showInvite && !showGames) return null;

  return (
    <>
      {/* Small Popup Bubble outside Haley's Circle */}
      <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 z-30 animate-scale-in">
        <div className="relative">
          {/* Small Speech Bubble */}
          <div className="bg-gradient-to-br from-pink-500 via-purple-500 to-pink-600 px-4 py-3 rounded-2xl shadow-2xl relative animate-glow-pulse">
            {/* Close button */}
            <button
              onClick={() => setShowInvite(false)}
              className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
            >
              <X className="w-3 h-3 text-pink-600" />
            </button>
            
            {/* Green Online Dot */}
            <div className="absolute -top-1 -left-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
            
            {/* Message */}
            <div className="text-white text-center">
              <div className="text-sm font-bold mb-2">
                Wanna play games with me? 🎮
              </div>
              <Button
                onClick={() => {
                  setShowInvite(false);
                  setShowGames(true);
                }}
                className="bg-white text-pink-600 hover:bg-pink-50 font-bold px-4 py-1.5 rounded-full shadow-lg text-xs"
              >
                Let's Play! 🎉
              </Button>
            </div>

            {/* Bubble Tail pointing to Haley */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-t-6 border-l-transparent border-r-transparent border-t-pink-600"></div>
          </div>
        </div>
      </div>

      {/* Games Modal */}
      {showGames && <HaleyGames onClose={() => setShowGames(false)} />}
    </>
  );
};

export default HaleyGameInvite;
