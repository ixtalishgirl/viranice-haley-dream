import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import HaleyGames from './HaleyGames';

const HaleyGameInvite = () => {
  const [showGames, setShowGames] = useState(false);

  

  return (
    <>
      {/* Small Popup Bubble outside Haley's Circle */}
      <div className="absolute top-1/2 -left-3 transform -translate-y-1/2 -translate-x-full z-30 animate-scale-in">
        <div className="relative">
          {/* Small Speech Bubble */}
          <div className="bg-gradient-to-br from-neon-pink via-neon-blue to-neon-pink px-4 py-3 rounded-2xl shadow-2xl relative animate-glow-pulse">
            
            {/* Green Online Dot */}
            <div className="absolute -top-1 -left-1 w-3 h-3 bg-neon-green rounded-full border-2 border-background animate-pulse-slow"></div>
            
            {/* Message */}
            <div className="text-white text-center">
              <div className="text-sm font-bold mb-2">
                Wanna play games with me? 🎮
              </div>
              <Button
                onClick={() => {
                  setShowGames(true);
                }}
                className="btn-sakura font-bold px-4 py-1.5 rounded-full text-xs"
              >
                Let's Play! 🎉
              </Button>
            </div>

            {/* Bubble Tail pointing to Haley */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-t-6 border-l-transparent border-r-transparent border-t-neon-pink"></div>
          </div>
        </div>
      </div>

      {/* Games Modal */}
      {showGames && <HaleyGames onClose={() => setShowGames(false)} />}
    </>
  );
};

export default HaleyGameInvite;
