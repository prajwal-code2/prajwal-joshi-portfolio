
import { useEffect, useRef } from "react";

const AnimatedGradientBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Define gradient colors and positions
    const colors = [
      [255, 0, 0],    // Red
      [255, 165, 0],  // Orange
      [255, 0, 128],  // Pink
      [128, 0, 255],  // Purple
      [0, 0, 255],    // Blue
      [0, 128, 128],  // Teal
    ];

    let step = 0;
    const colorSteps = 0.002; // Speed of color change

    const drawGradient = () => {
      step += colorSteps;
      
      // Create dynamic gradient positions
      const time = Date.now() * 0.0005;
      const x1 = Math.sin(time) * canvas.width;
      const y1 = Math.cos(time) * canvas.height;
      const x2 = Math.cos(time) * canvas.width;
      const y2 = Math.sin(time) * canvas.height;
      
      const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
      
      // Add color stops
      for (let i = 0; i < colors.length; i++) {
        const idx1 = i % colors.length;
        const idx2 = (i + 1) % colors.length;
        
        const r = Math.floor(colors[idx1][0] * (1 - step) + colors[idx2][0] * step);
        const g = Math.floor(colors[idx1][1] * (1 - step) + colors[idx2][1] * step);
        const b = Math.floor(colors[idx1][2] * (1 - step) + colors[idx2][2] * step);
        
        const offset = i / (colors.length - 1);
        gradient.addColorStop(offset, `rgb(${r}, ${g}, ${b})`);
      }
      
      // Reset step when reaching the end
      if (step >= 1) {
        step = 0;
        colors.push(colors.shift() || [0, 0, 0]); // Rotate colors
      }
      
      // Draw gradient
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      animationFrameId.current = requestAnimationFrame(drawGradient);
    };
    
    drawGradient();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 -z-20 w-full h-full"
      style={{ display: "block" }}
    />
  );
};

export default AnimatedGradientBackground;
