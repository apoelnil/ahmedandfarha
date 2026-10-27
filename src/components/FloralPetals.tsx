import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  flip: number;
  flipSpeed: number;
  swayAmplitude: number;
  swayFrequency: number;
  swayPhase: number;
  opacity: number;
  colorType: number;
}

export const FloralPetals: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Subtle luxury palette: Champagne blush, soft rose gold, and deep romantic wine
    const petalPalettes = [
      { start: 'rgba(224, 216, 203, 0.40)', end: 'rgba(195, 175, 155, 0.15)' }, // Champagne
      { start: 'rgba(180, 50, 70, 0.45)', end: 'rgba(120, 20, 35, 0.20)' },    // Romantic Rose
      { start: 'rgba(215, 160, 165, 0.35)', end: 'rgba(150, 60, 75, 0.15)' },  // Blush Velvet
      { start: 'rgba(130, 25, 45, 0.40)', end: 'rgba(80, 10, 25, 0.15)' },     // Deep Wine
    ];

    // Subtle petal count: 60% less for an ultra-delicate, airy floating ambiance
    const petalCount = Math.min(13, Math.max(7, Math.floor(width / 115)));

    const createPetal = (initialY?: number): Petal => ({
      x: Math.random() * width,
      y: initialY !== undefined ? initialY : Math.random() * height,
      size: 10 + Math.random() * 14, // 10px to 24px natural petal size
      speedY: 0.15 + Math.random() * 0.22, // 75% slower (quarter-speed gentle floating descent)
      speedX: -0.05 + Math.random() * 0.1,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.005,
      flip: Math.random() * Math.PI,
      flipSpeed: 0.0038 + Math.random() * 0.005,
      swayAmplitude: 0.4 + Math.random() * 0.6,
      swayFrequency: 0.0025 + Math.random() * 0.0038,
      swayPhase: Math.random() * Math.PI * 2,
      opacity: 0.35 + Math.random() * 0.45,
      colorType: Math.floor(Math.random() * petalPalettes.length),
    });

    const petals: Petal[] = Array.from({ length: petalCount }, () => createPetal());

    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.scale(Math.cos(p.flip), 1); // 3D flip effect

      const palette = petalPalettes[p.colorType];
      const grad = ctx.createRadialGradient(0, 0, 1, 0, 0, p.size);
      grad.addColorStop(0, palette.start);
      grad.addColorStop(1, palette.end);

      ctx.fillStyle = grad;
      ctx.beginPath();

      // Smooth organic curved floral petal silhouette
      ctx.moveTo(0, -p.size * 0.9);
      ctx.bezierCurveTo(
        p.size * 0.65,
        -p.size * 0.6,
        p.size * 0.85,
        p.size * 0.4,
        0,
        p.size
      );
      ctx.bezierCurveTo(
        -p.size * 0.85,
        p.size * 0.4,
        -p.size * 0.65,
        -p.size * 0.6,
        0,
        -p.size * 0.9
      );
      ctx.closePath();
      ctx.fill();

      // Subtle delicate center petal vein
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 0.6;
      ctx.beginPath();
      ctx.moveTo(0, -p.size * 0.6);
      ctx.lineTo(0, p.size * 0.65);
      ctx.stroke();

      ctx.restore();
    };

    let tick = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      tick += 1;

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];

        // Horizontal sway calculation
        const sway = Math.sin(tick * p.swayFrequency + p.swayPhase) * p.swayAmplitude;

        p.x += p.speedX + sway;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;
        p.flip += p.flipSpeed;

        // Wrap around smoothly when leaving bottom or side
        if (p.y > height + p.size * 2) {
          petals[i] = createPetal(-p.size * 2);
        }
        if (p.x < -p.size * 2) {
          p.x = width + p.size;
        } else if (p.x > width + p.size * 2) {
          p.x = -p.size;
        }

        drawPetal(p);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-1 w-full h-full"
      style={{ opacity: 0.95 }}
      aria-hidden="true"
    />
  );
};
