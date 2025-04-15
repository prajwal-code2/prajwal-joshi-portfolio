
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
      [255, 0, 128],  // Vivid Pink
      [128, 0, 255],  // Purple
      [0, 0, 255],    // Blue
      [0, 128, 255],  // Sky Blue
      [0, 255, 255],  // Cyan
      [255, 0, 255],  // Magenta
    ];

    let step = 0;
    const colorSteps = 0.0015; // Speed of color change

    const drawGradient = () => {
      step += colorSteps;
      
      // Create dynamic gradient positions with more movement
      const time = Date.now() * 0.0003; // Slower movement for smoother transitions
      const x1 = Math.sin(time * 0.7) * canvas.width;
      const y1 = Math.cos(time * 0.6) * canvas.height;
      const x2 = Math.cos(time * 0.9) * canvas.width;
      const y2 = Math.sin(time * 0.8) * canvas.height;
      
      const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
      
      // Add color stops with more vibrant transitions
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
      
      // Draw gradient with subtle opacity effect
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add a subtle noise effect
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      // Apply a very subtle noise to the image data
      for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() * 5 - 2.5;
        data[i] = Math.min(255, Math.max(0, data[i] + noise));
        data[i+1] = Math.min(255, Math.max(0, data[i+1] + noise));
        data[i+2] = Math.min(255, Math.max(0, data[i+2] + noise));
      }
      
      ctx.putImageData(imageData, 0, 0);
      
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
