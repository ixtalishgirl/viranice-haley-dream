import React, { useEffect, useState } from 'react';

interface JellyEffect {
  id: number;
  x: number;
  y: number;
}

const JellyClick = () => {
  const [effects, setEffects] = useState<JellyEffect[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newEffect: JellyEffect = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY
      };

      setEffects(prev => [...prev, newEffect]);

      setTimeout(() => {
        setEffects(prev => prev.filter(effect => effect.id !== newEffect.id));
      }, 500);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <>
      {effects.map(effect => (
        <div
          key={effect.id}
          className="fixed pointer-events-none z-50"
          style={{
            left: effect.x - 25,
            top: effect.y - 25,
            width: '50px',
            height: '50px'
          }}
        >
          <div className="w-full h-full rounded-full border-4 border-neon-blue/50 jelly-click" />
        </div>
      ))}
    </>
  );
};

export default JellyClick;
