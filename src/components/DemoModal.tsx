
import React from "react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  demoUrl: string;
  projectTitle: string;
}

const DemoModal = ({ isOpen, onClose, demoUrl, projectTitle }: DemoModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl h-[80vh] p-0 bg-secondary/90 backdrop-blur-xl border-secondary/50">
        <DialogHeader className="p-4 border-b border-secondary/30 flex justify-between items-center">
          <DialogTitle className="text-xl font-bold">{projectTitle} Demo</DialogTitle>
          <DialogClose className="text-white/70 hover:text-primary transition-colors">
            <X size={24} />
          </DialogClose>
        </DialogHeader>
        <div className="w-full h-full flex-1 overflow-hidden">
          <iframe 
            src={demoUrl} 
            className="w-full h-full border-0" 
            title={`${projectTitle} Demo`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            loading="lazy"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DemoModal;
