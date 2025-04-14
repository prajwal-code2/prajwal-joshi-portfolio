
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface BlobBackgroundProps {
  className?: string;
}

const BlobBackground = ({ className }: BlobBackgroundProps) => {
  return (
    <div className={cn("fixed inset-0 -z-10 overflow-hidden", className)}>
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500/20 rounded-full filter blur-3xl opacity-50 animate-blob" />
      <div className="absolute -top-10 right-20 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-2000" />
      <div className="absolute bottom-10 left-1/3 w-72 h-72 bg-cyan-500/20 rounded-full filter blur-3xl opacity-40 animate-blob animation-delay-4000" />
      <div className="absolute -bottom-10 right-10 w-80 h-80 bg-purple-700/20 rounded-full filter blur-3xl opacity-40 animate-blob animation-delay-6000" />
    </div>
  );
};

export default BlobBackground;
