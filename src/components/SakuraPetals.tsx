import React, { useEffect, useState } from 'react';

interface Petal {
  id: number;
  left: number;
  animationDuration: number;
  delay: number;
  size: number;
}

const SakuraPetals: React.FC = () => {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const createPetals = () => {
      const newPetals: Petal[] = [];
      for (let i = 0; i < 8; i++) {
        newPetals.push({
          id: i,
          left: Math.random() * 100,
          animationDuration: 8 + Math.random() * 4,
          delay: Math.random() * 8,
          size: 0.8 + Math.random() * 0.4,
        });
      }
      setPetals(newPetals);
    };

    createPetals();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute animate-sakura-fall opacity-30"
          style={{
            left: `${petal.left}%`,
            animationDuration: `${petal.animationDuration}s`,
            animationDelay: `${petal.delay}s`,
            fontSize: `${petal.size}rem`,
            color: `hsl(var(--sakura-primary))`,
          }}
        >
          🌸
        </div>
      ))}
    </div>
  );
};

export default SakuraPetals;