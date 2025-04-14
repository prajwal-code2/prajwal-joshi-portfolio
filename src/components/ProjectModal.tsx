
import React from "react";
import { X, ExternalLink, Github } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  demoUrl: string;
  githubUrl: string;
  technologies: string[];
  longDescription: string;
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl bg-secondary/90 backdrop-blur-xl border-secondary/50">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{project.title}</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {project.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 gap-6">
          <div className="aspect-video w-full overflow-hidden rounded-lg border border-border/30">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="space-y-4">
            <p className="text-foreground/90">{project.longDescription}</p>
            
            <div className="flex flex-wrap gap-2 mt-4">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="secondary" className="bg-secondary/70 text-primary">
                  {tech}
                </Badge>
              ))}
            </div>
            
            <div className="flex gap-4 mt-6">
              <Button 
                variant="default" 
                className="gap-2"
                onClick={() => window.open(project.demoUrl, "_blank")}
              >
                <ExternalLink size={16} />
                Live Demo
              </Button>
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={() => window.open(project.githubUrl, "_blank")}
              >
                <Github size={16} />
                View Code
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;
