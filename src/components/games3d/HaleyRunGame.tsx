import React from 'react';
import { Button } from '@/components/ui/button';

interface GameProps { onClose: () => void }

const HaleyRunGame: React.FC<GameProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in">
      <div className="glass-card rounded-3xl w-full max-w-3xl overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h3 className="text-2xl font-bold magic-text">Haley Run — Temple Adventure ✨</h3>
          <Button variant="ghost" onClick={onClose}>Close</Button>
        </div>
        <div className="p-6 text-center space-y-4">
          <p className="text-muted-foreground">3D premium version coming soon. For now, enjoy this preview screen.</p>
          <div className="h-56 rounded-xl magic-border flex items-center justify-center text-lg">Beautiful 3D runner preview</div>
          <Button className="btn-sakura" onClick={onClose}>Back to Arcade</Button>
        </div>
      </div>
    </div>
  );
};

export default HaleyRunGame;
