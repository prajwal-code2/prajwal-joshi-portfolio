
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
      // Create multiple Holi-inspired color spots
      const spots = [
        { x: canvas.width * 0.2, y: canvas.height * 0.3, color: '#FF719A' }, // Pink
        { x: canvas.width * 0.8, y: canvas.height * 0.7, color: '#33C3F0' }, // Blue
        { x: canvas.width * 0.5, y: canvas.height * 0.5, color: '#F97316' }, // Orange
        { x: canvas.width * 0.15, y: canvas.height * 0.8, color: '#D946EF' }, // Magenta
        { x: canvas.width * 0.85, y: canvas.height * 0.2, color: '#FDE1D3' }, // Peach
        { x: canvas.width * 0.4, y: canvas.height * 0.6, color: '#8B5CF6' }, // Purple
        { x: canvas.width * 0.7, y: canvas.height * 0.4, color: '#D6BCFA' }, // Light Purple
        { x: canvas.width * 0.25, y: canvas.height * 0.7, color: '#FFDEE2' }, // Soft Pink
      ];

      // Create vibrant base gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#7E69AB');
      gradient.addColorStop(1, '#6E59A5');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add color spots with increased size and overlap
      spots.forEach(spot => {
        const gradient = ctx.createRadialGradient(
          spot.x, spot.y, 0,
          spot.x, spot.y, canvas.width * 0.3
        );
        gradient.addColorStop(0, `${spot.color}60`); // 37% opacity
        gradient.addColorStop(0.6, `${spot.color}20`); // 12% opacity
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      // Add stronger noise texture for a powdery effect
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() * 20 - 10; // Increased noise range
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
      className="absolute top-24 left-6 right-6 rounded-3xl opacity-90"
      style={{ 
        WebkitFilter: 'blur(80px)',
        filter: 'blur(80px)',
      }}
    />
  );
};

export default GradientCanvas;
