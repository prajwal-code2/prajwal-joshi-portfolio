
import { useEffect, useRef } from 'react';

const GradientCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth - 48;
      canvas.height = window.innerHeight - 100;
      drawGradient();
    };

    const drawGradient = () => {
      // Create vibrant Holi-inspired color spots with increased variety and intensity
      const spots = [
        { x: canvas.width * 0.2, y: canvas.height * 0.3, color: '#00ffaa' },  // Bright Turquoise
        { x: canvas.width * 0.8, y: canvas.height * 0.7, color: '#0ea5e9' },  // Sky Blue
        { x: canvas.width * 0.5, y: canvas.height * 0.5, color: '#8b5cf6' },  // Vibrant Purple
        { x: canvas.width * 0.15, y: canvas.height * 0.8, color: '#f472b6' }, // Hot Pink
        { x: canvas.width * 0.85, y: canvas.height * 0.2, color: '#06b6d4' }, // Bright Cyan
        { x: canvas.width * 0.4, y: canvas.height * 0.6, color: '#f43f5e' },  // Vivid Red
        { x: canvas.width * 0.7, y: canvas.height * 0.4, color: '#c026d3' },  // Magenta
        { x: canvas.width * 0.25, y: canvas.height * 0.7, color: '#84cc16' }, // Lime Green
        { x: canvas.width * 0.6, y: canvas.height * 0.3, color: '#3b82f6' },  // Royal Blue
        { x: canvas.width * 0.35, y: canvas.height * 0.5, color: '#d946ef' }, // Fuchsia
        { x: canvas.width * 0.55, y: canvas.height * 0.25, color: '#22c55e'}, // Emerald
        { x: canvas.width * 0.8, y: canvas.height * 0.4, color: '#fbbf24' },  // Amber
      ];

      // Create deep, rich base gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#0f172a');  // Navy Blue
      gradient.addColorStop(0.5, '#1e1b4b');  // Deep Indigo
      gradient.addColorStop(1, '#312e81');  // Rich Purple
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add color spots with increased size, overlap and brightness
      spots.forEach(spot => {
        const gradient = ctx.createRadialGradient(
          spot.x, spot.y, 0,
          spot.x, spot.y, canvas.width * 0.4 // Increased radius
        );
        gradient.addColorStop(0, `${spot.color}90`);  // 56% opacity
        gradient.addColorStop(0.4, `${spot.color}50`); // 31% opacity
        gradient.addColorStop(0.8, `${spot.color}20`); // 12% opacity
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      // Apply stronger powdery texture
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() * 30 - 15; // Enhanced noise range
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
