import { useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProjectModal, { Project } from "./ProjectModal";

interface ProjectsSectionProps {
  className?: string;
}

const ProjectsSection = ({ className }: ProjectsSectionProps) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projects: Project[] = [
    {
      id: 1,
      title: "Object Detection System",
      description: "Real-time vehicle and object detection using YOLO",
      image: "/lovable-uploads/4eac47c9-30f3-4758-8a31-250e9f79a30b.png", // object-detection.jpg
      demoUrl: "#",
      githubUrl: "https://github.com/prajwal-code2",
      technologies: ["YOLO", "OpenCV", "Python", "Computer Vision"],
      longDescription: "A comprehensive object detection solution built with YOLO and OpenCV. This system provides real-time detection and classification of vehicles and other objects with high accuracy. The implementation uses optimized algorithms to ensure low latency and high throughput, making it suitable for traffic monitoring and security applications."
    },
    {
      id: 2,
      title: "Parking Time Monitor",
      description: "Automated tracking of parking duration with alerts",
      image: "/lovable-uploads/501746e3-a9de-4ec5-b4ac-547ef63db4dd.png", // parking-automation.jpg
      demoUrl: "#",
      githubUrl: "https://github.com/prajwal-code2",
      technologies: ["OpenCV", "MQTT", "Python", "Computer Vision"],
      longDescription: "An intelligent parking management system that monitors vehicle duration in parking spaces and triggers alerts for violations. The solution uses computer vision techniques to identify parking spots, detect vehicles, and track their presence over time. MQTT protocol is used for efficient communication between system components, enabling real-time notifications and seamless integration with existing parking management infrastructure."
    },
    {
      id: 3,
      title: "Pill Counting Automation",
      description: "High-speed pill detection for packaging systems",
      image: "/lovable-uploads/70795a08-e3a0-49f3-b155-453b83458b3e.png", // pill-counter.jpg
      demoUrl: "#",
      githubUrl: "https://github.com/prajwal-code2",
      technologies: ["Edge Computing", "OpenCV", "YOLO (Ultralytics)", "OrangePi", "ESP32CAM", "Groov Vision"],
      longDescription: "A sophisticated pill counting system for pharmaceutical packaging operations. This solution employs ultralytics YOLO for accurate detection and counting of pills at high speeds. The system is deployed on edge devices including OrangePi and ESP32CAM, with optional Groov Vision integration. The solution achieves exceptional accuracy even with varying pill shapes, sizes, and colors, while maintaining high throughput required for industrial applications."
    },
  ];

  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeProjectModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section
      id="projects"
      className={cn(
        "py-20 px-6 md:py-32 relative bg-secondary/30",
        className
      )}
    >
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <p className="text-primary font-medium mb-2">My Work</p>
          <h2 className="text-3xl md:text-4xl font-bold">Featured Projects</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            A showcase of my computer vision projects, transforming visual data into actionable insights.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="group glass-panel gradient-border overflow-hidden transition-transform duration-300 hover:translate-y-[-5px]"
            >
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                <p className="text-primary text-md font-medium">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 py-2">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <Badge key={tech} variant="secondary" className="bg-secondary/70 text-primary">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 3 && (
                    <Badge variant="secondary" className="bg-secondary/70 text-primary">
                      +{project.technologies.length - 3}
                    </Badge>
                  )}
                </div>
                
                <div className="flex gap-3 pt-2">
                  <Button 
                    size="sm" 
                    variant="default"
                    onClick={() => openProjectModal(project)}
                  >
                    View Details
                  </Button>
                  <Button 
                    size="sm"
                    variant="outline"
                    className="gap-1"
                    onClick={() => window.open(project.demoUrl, "_blank")}
                  >
                    <ExternalLink size={14} />
                    Demo
                  </Button>
                  <Button 
                    size="sm"
                    variant="ghost"
                    className="gap-1"
                    onClick={() => window.open(project.githubUrl, "_blank")}
                  >
                    <Github size={14} />
                    Code
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <ProjectModal 
        project={selectedProject} 
        isOpen={isModalOpen} 
        onClose={closeProjectModal} 
      />
    </section>
  );
};

export default ProjectsSection;
