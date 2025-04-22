
import { useEffect, useRef } from 'react';

const GradientCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth - 48; // 24px padding on each side
      canvas.height = window.innerHeight - 100; // Account for navbar
      drawGradient();
    };

    const drawGradient = () => {
      // Create multiple gradient spots
      const spots = [
        { x: canvas.width * 0.2, y: canvas.height * 0.3, color: '#D946EF' },
        { x: canvas.width * 0.8, y: canvas.height * 0.7, color: '#8B5CF6' },
        { x: canvas.width * 0.5, y: canvas.height * 0.5, color: '#6E59A5' },
        { x: canvas.width * 0.15, y: canvas.height * 0.8, color: '#E5DEFF' },
        { x: canvas.width * 0.85, y: canvas.height * 0.2, color: '#9b87f5' },
      ];

      // Create base gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#4a0080');
      gradient.addColorStop(1, '#3d0066');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add color spots with blur
      spots.forEach(spot => {
        const gradient = ctx.createRadialGradient(
          spot.x, spot.y, 0,
          spot.x, spot.y, canvas.width * 0.4
        );
        gradient.addColorStop(0, `${spot.color}40`); // 25% opacity
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      // Add noise texture
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() * 15 - 7.5;
        data[i] = Math.min(255, Math.max(0, data[i] + noise));
        data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
        data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
      }
      ctx.putImageData(imageData, 0, 0);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-24 left-6 right-6 rounded-3xl opacity-80"
      style={{ 
        WebkitFilter: 'blur(60px)',
        filter: 'blur(60px)',
      }}
    />
  );
};

export default GradientCanvas;
