import React, { useEffect, useRef } from 'react';

interface ThemeBackground3DProps {
  theme: string;
}

const ThemeBackground3D = ({ theme }: ThemeBackground3DProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      opacity: number;
    }> = [];

    // Initialize particles based on theme
    const initParticles = () => {
      particles = [];
      const particleCount = theme === 'rain' ? 150 : 80;
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 2,
          speedY: theme === 'rain' ? Math.random() * 5 + 2 : Math.random() * 2 + 0.5,
          color: getParticleColor(),
          opacity: Math.random() * 0.5 + 0.3
        });
      }
    };

    const getParticleColor = () => {
      switch (theme) {
        case 'rain':
          return '#4fc3f7';
        case 'dark':
          return '#9333ea';
        case 'horror':
          return '#dc2626';
        case 'nightmare':
          return '#ec4899';
        case '3d-forest':
          return '#10b981';
        default:
          return '#8b5cf6';
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 2
      );

      switch (theme) {
        case 'rain':
          gradient.addColorStop(0, 'rgba(15, 23, 42, 0.95)');
          gradient.addColorStop(1, 'rgba(30, 58, 138, 0.95)');
          break;
        case 'horror':
          gradient.addColorStop(0, 'rgba(15, 23, 42, 0.98)');
          gradient.addColorStop(1, 'rgba(127, 29, 29, 0.95)');
          break;
        case 'nightmare':
          gradient.addColorStop(0, 'rgba(88, 28, 135, 0.95)');
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0.98)');
          break;
        case '3d-forest':
          gradient.addColorStop(0, 'rgba(6, 78, 59, 0.95)');
          gradient.addColorStop(1, 'rgba(2, 44, 34, 0.98)');
          break;
        default:
          gradient.addColorStop(0, 'rgba(15, 23, 42, 0.9)');
          gradient.addColorStop(1, 'rgba(30, 41, 59, 0.95)');
      }

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw and update particles
      particles.forEach((particle, index) => {
        ctx.beginPath();
        
        if (theme === 'rain') {
          // Rain drops
          ctx.strokeStyle = `rgba(79, 195, 247, ${particle.opacity})`;
          ctx.lineWidth = particle.size;
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(particle.x + particle.speedX, particle.y + particle.speedY * 3);
          ctx.stroke();
        } else {
          // Floating particles
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = `${particle.color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`;
          ctx.fill();
        }

        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = canvas.height;
      });

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    initParticles();
    drawParticles();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]);

  if (!['rain', 'dark', 'horror', 'nightmare', '3d-forest'].includes(theme)) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default ThemeBackground3D;
