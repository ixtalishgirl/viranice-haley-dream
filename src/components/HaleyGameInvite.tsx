import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import HaleyGames from './HaleyGames';

const HaleyGameInvite = () => {
  const [showGames, setShowGames] = useState(false);

  

  return (
    <>
      {/* Compact Speech Bubble - Close to Haley (left side) */}
      <div className="absolute top-1/2 -left-2 transform -translate-x-full -translate-y-1/2 z-50">
        <button
          onClick={() => setShowGames(true)}
          className="group relative flex items-center gap-2 px-3 py-2 rounded-full shadow-2xl border border-destructive/40 bg-destructive/80 text-white text-xs font-semibold backdrop-blur-md hover:scale-105 transition-all duration-300"
          aria-label="Open Haley Games"
        >
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-destructive animate-pulse" />
          <span>Do you wanna play games with me? 🎮</span>
        </button>
      </div>

      {/* Games Modal */}
      {showGames && <HaleyGames onClose={() => setShowGames(false)} />}
    </>
  );
};

export default HaleyGameInvite;
