import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import HaleyGames from './HaleyGames';

const HaleyGameInvite = () => {
  const [showGames, setShowGames] = useState(false);

  

  return (
    <>
      {/* Compact Speech Bubble - Close to Haley */}
      <div className="absolute top-1/2 -right-2 transform translate-x-full -translate-y-1/2 z-30">
        <div className="relative">
          {/* Transparent Glass Bubble */}
          <div className="bg-gradient-to-br from-pink-500/80 via-purple-500/80 to-blue-500/80 backdrop-blur-md px-3 py-2 rounded-xl shadow-2xl relative border border-white/20">
            
            {/* Message */}
            <div className="text-white text-center">
              <div className="text-xs font-semibold mb-1.5 drop-shadow-lg">
                Do you wanna play games with me? 🎮
              </div>
              <Button
                onClick={() => {
                  setShowGames(true);
                }}
                className="bg-white/90 hover:bg-white text-purple-600 font-bold px-3 py-1 rounded-full text-xs shadow-lg transition-all duration-300 hover:scale-105"
              >
                Let's Play! 🎉
              </Button>
            </div>

            {/* Bubble Tail pointing to Haley (left side) */}
            <div className="absolute top-1/2 -left-2 transform -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent border-r-pink-500/80"></div>
          </div>
        </div>
      </div>

      {/* Games Modal */}
      {showGames && <HaleyGames onClose={() => setShowGames(false)} />}
    </>
  );
};

export default HaleyGameInvite;
