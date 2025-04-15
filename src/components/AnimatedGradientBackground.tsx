
import { useEffect, useRef } from "react";

const AnimatedGradientBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawGradient(); // Redraw gradient on resize
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);

    function drawGradient() {
      // Create a beautiful gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      
      // Add rich colors to the gradient
      gradient.addColorStop(0, "#4a0080");    // Deep purple
      gradient.addColorStop(0.4, "#5c2a9d");  // Rich purple
      gradient.addColorStop(0.6, "#45108a");  // Violet
      gradient.addColorStop(1, "#3d0066");    // Dark purple
      
      // Fill the canvas with the gradient
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add a subtle noise texture
      addNoiseTexture(ctx, canvas.width, canvas.height, 0.03);
    }
    
    function addNoiseTexture(ctx: CanvasRenderingContext2D, width: number, height: number, alpha: number) {
      // Get the current image data
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;
      
      // Add subtle noise
      for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() * 15 - 7.5;
        
        data[i] = Math.min(255, Math.max(0, data[i] + noise));         // R
        data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise)); // G
        data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise)); // B
      }
      
      // Put the modified image data back
      ctx.putImageData(imageData, 0, 0);
    }
    
    drawGradient();

    return () => {
      window.removeEventListener("resize", handleResize);
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
