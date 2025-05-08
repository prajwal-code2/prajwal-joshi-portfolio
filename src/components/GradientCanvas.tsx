
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
      // Create vibrant Holi-inspired color spots with increased brightness
      const spots = [
        { x: canvas.width * 0.2, y: canvas.height * 0.3, color: '#3bffcc' },  // Brighter Turquoise
        { x: canvas.width * 0.8, y: canvas.height * 0.7, color: '#38bdf8' },  // Brighter Sky Blue
        { x: canvas.width * 0.5, y: canvas.height * 0.5, color: '#a78bfa' },  // Brighter Purple
        { x: canvas.width * 0.15, y: canvas.height * 0.8, color: '#fb7185' }, // Brighter Pink
        { x: canvas.width * 0.85, y: canvas.height * 0.2, color: '#22d3ee' }, // Brighter Cyan
        { x: canvas.width * 0.4, y: canvas.height * 0.6, color: '#ff5757' },  // Vibrant Red
        { x: canvas.width * 0.7, y: canvas.height * 0.4, color: '#d946ef' },  // Brighter Magenta
        { x: canvas.width * 0.25, y: canvas.height * 0.7, color: '#a3e635' }, // Brighter Lime
        { x: canvas.width * 0.6, y: canvas.height * 0.3, color: '#60a5fa' },  // Brighter Blue
        { x: canvas.width * 0.35, y: canvas.height * 0.5, color: '#e879f9' }, // Brighter Fuchsia
        { x: canvas.width * 0.55, y: canvas.height * 0.25, color: '#34d399'}, // Brighter Emerald
        { x: canvas.width * 0.8, y: canvas.height * 0.4, color: '#fcd34d' },  // Brighter Amber
      ];

      // Create lighter base gradient for increased brightness
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#1e293b');  // Lighter Navy Blue
      gradient.addColorStop(0.5, '#312e81');  // Mid Indigo
      gradient.addColorStop(1, '#4c1d95');  // Lighter Purple
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add color spots with increased opacity for more brightness
      spots.forEach(spot => {
        const gradient = ctx.createRadialGradient(
          spot.x, spot.y, 0,
          spot.x, spot.y, canvas.width * 0.4
        );
        gradient.addColorStop(0, `${spot.color}a0`);  // 63% opacity (increased)
        gradient.addColorStop(0.4, `${spot.color}70`); // 44% opacity (increased)
        gradient.addColorStop(0.8, `${spot.color}30`); // 19% opacity (increased)
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      // Apply softer noise texture to maintain brightness
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() * 20 - 10; // Reduced noise range for brighter effect
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
