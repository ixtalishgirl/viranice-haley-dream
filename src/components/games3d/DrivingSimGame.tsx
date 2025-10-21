import React from 'react';
import { Button } from '@/components/ui/button';

interface GameProps { onClose: () => void }

const DrivingSimGame: React.FC<GameProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in">
      <div className="glass-card rounded-3xl w-full max-w-3xl overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h3 className="text-2xl font-bold magic-text">Driving Simulator 🚗</h3>
          <Button variant="ghost" onClick={onClose}>Close</Button>
        </div>
        <div className="p-6 text-center space-y-4">
          <p className="text-muted-foreground">Premium driving sim is on the way with realistic graphics.</p>
          <div className="h-56 rounded-xl magic-border flex items-center justify-center text-lg">Haley city drive preview</div>
          <Button className="btn-sakura" onClick={onClose}>Back to Arcade</Button>
        </div>
      </div>
    </div>
  );
};

export default DrivingSimGame;
