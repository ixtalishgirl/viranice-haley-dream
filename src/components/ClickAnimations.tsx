import React, { useEffect, useState } from 'react';

interface ClickEffect {
  id: number;
  x: number;
  y: number;
  type: 'flowers' | 'boom';
}

const ClickAnimations = () => {
  const [effects, setEffects] = useState<ClickEffect[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newEffect: ClickEffect = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
        type: Math.random() > 0.5 ? 'flowers' : 'boom'
      };

      setEffects(prev => [...prev, newEffect]);

      // Remove effect after animation
      setTimeout(() => {
        setEffects(prev => prev.filter(effect => effect.id !== newEffect.id));
      }, 600);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-30">
      {effects.map(effect => (
        <div
          key={effect.id}
          className={`absolute ${
            effect.type === 'flowers' 
              ? 'animate-flower-explosion text-2xl' 
              : 'animate-boom-effect text-3xl'
          }`}
          style={{
            left: effect.x - 16,
            top: effect.y - 16,
          }}
        >
          {effect.type === 'flowers' ? (
            <div className="flex space-x-1">
              <span className="text-neon-blue">🌸</span>
              <span className="text-neon-green">✨</span>
              <span className="text-neon-blue">💫</span>
            </div>
          ) : (
            <div className="text-neon-green">💥</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ClickAnimations;