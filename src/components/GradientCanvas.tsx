
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
      // Create vibrant color spots with a mix of cool, dark, and bright colors
      const spots = [
        // Bright colors
        { x: canvas.width * 0.2, y: canvas.height * 0.3, color: '#3bffcc' },  // Bright Turquoise
        { x: canvas.width * 0.8, y: canvas.height * 0.7, color: '#38bdf8' },  // Bright Sky Blue
        { x: canvas.width * 0.5, y: canvas.height * 0.5, color: '#a78bfa' },  // Bright Purple
        { x: canvas.width * 0.15, y: canvas.height * 0.8, color: '#fb7185' }, // Bright Pink
        
        // Cool colors
        { x: canvas.width * 0.85, y: canvas.height * 0.2, color: '#06b6d4' }, // Cyan
        { x: canvas.width * 0.35, y: canvas.height * 0.45, color: '#3b82f6' }, // Royal Blue
        { x: canvas.width * 0.65, y: canvas.height * 0.35, color: '#2563eb' }, // Blue
        { x: canvas.width * 0.25, y: canvas.height * 0.6, color: '#0ea5e9' },  // Sky Blue
        
        // Vibrant colors
        { x: canvas.width * 0.4, y: canvas.height * 0.6, color: '#ff5757' },  // Vibrant Red
        { x: canvas.width * 0.7, y: canvas.height * 0.4, color: '#d946ef' },  // Bright Magenta
        { x: canvas.width * 0.25, y: canvas.height * 0.7, color: '#a3e635' }, // Bright Lime
        { x: canvas.width * 0.6, y: canvas.height * 0.3, color: '#60a5fa' },  // Bright Blue
        
        // Additional vibrant colors
        { x: canvas.width * 0.35, y: canvas.height * 0.5, color: '#e879f9' }, // Bright Fuchsia
        { x: canvas.width * 0.55, y: canvas.height * 0.25, color: '#34d399'}, // Bright Emerald
        { x: canvas.width * 0.8, y: canvas.height * 0.4, color: '#fcd34d' },  // Bright Amber
        { x: canvas.width * 0.45, y: canvas.height * 0.15, color: '#f97316' }, // Orange
        
        // Dark and cool colors for contrast
        { x: canvas.width * 0.1, y: canvas.height * 0.2, color: '#1e3a8a' }, // Dark Blue
        { x: canvas.width * 0.9, y: canvas.height * 0.8, color: '#4c1d95' }, // Dark Purple
        { x: canvas.width * 0.3, y: canvas.height * 0.9, color: '#0f766e' }, // Dark Teal
        { x: canvas.width * 0.75, y: canvas.height * 0.15, color: '#6d28d9' }, // Indigo
      ];

      // Create deeper base gradient with dark colors
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#0f172a');  // Dark Navy Blue
      gradient.addColorStop(0.5, '#1e1b4b');  // Deep Indigo
      gradient.addColorStop(1, '#3730a3');  // Rich Purple
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add color spots with increased size and opacity for vibrance
      spots.forEach(spot => {
        const gradient = ctx.createRadialGradient(
          spot.x, spot.y, 0,
          spot.x, spot.y, canvas.width * 0.45 // Increased radius for more color spread
        );
        gradient.addColorStop(0, `${spot.color}b0`);  // 69% opacity (increased)
        gradient.addColorStop(0.4, `${spot.color}80`); // 50% opacity (increased)
        gradient.addColorStop(0.8, `${spot.color}40`); // 25% opacity (increased) 
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      // Apply balanced noise texture for dimension without losing vibrancy
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() * 15 - 7.5; // Subtle noise for texture without diminishing colors
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
