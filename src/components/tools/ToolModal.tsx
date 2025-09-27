import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import ViralPredictionTool from './ViralPredictionTool';
import YouTubeTitleGenerator from './YouTubeTitleGenerator';

interface ToolModalProps {
  isOpen: boolean;
  onClose: () => void;
  toolId: number;
  toolName: string;
}

const ToolModal = ({ isOpen, onClose, toolId, toolName }: ToolModalProps) => {
  const renderTool = () => {
    switch (toolId) {
      case 1:
        return <ViralPredictionTool />;
      case 2:
        return <YouTubeTitleGenerator />;
      default:
        return (
          <div className="glass-card p-8 text-center">
            <h3 className="text-2xl font-bold magic-text mb-4">Coming Soon! ✨</h3>
            <p className="text-muted-foreground mb-6">
              Haley is working hard to bring you this amazing tool. 
              Stay tuned for magical updates! 🌟
            </p>
            <div className="text-6xl mb-4">🚧</div>
            <p className="text-sm text-muted-foreground">
              Meanwhile, try our other working tools! 💫
            </p>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto glass-card border-neon-blue/20">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="magic-text text-xl">{toolName}</span>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          {renderTool()}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ToolModal;