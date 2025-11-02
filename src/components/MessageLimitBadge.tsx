import React from 'react';
import { AlertCircle, Zap } from 'lucide-react';

interface MessageLimitBadgeProps {
  remaining: number;
  total?: number;
}

const MessageLimitBadge: React.FC<MessageLimitBadgeProps> = ({ remaining, total = 5 }) => {
  const percentage = (remaining / total) * 100;
  
  return (
    <div className="flex items-center gap-2 px-3 py-2 glass-card rounded-lg border border-border">
      {remaining > 2 ? (
        <Zap className="w-4 h-4 text-neon-green" />
      ) : (
        <AlertCircle className="w-4 h-4 text-neon-pink" />
      )}
      <div className="flex flex-col">
        <span className="text-xs font-semibold">
          {remaining}/{total} messages left
        </span>
        <div className="w-24 h-1 bg-muted rounded-full overflow-hidden mt-1">
          <div 
            className={`h-full transition-all duration-300 ${
              percentage > 40 
                ? 'bg-gradient-to-r from-neon-green to-neon-green-light' 
                : 'bg-gradient-to-r from-neon-pink to-destructive'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default MessageLimitBadge;
