
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
      title: "E-commerce Platform",
      description: "A full-featured online store with payment integration",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      demoUrl: "#",
      githubUrl: "#",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      longDescription: "A comprehensive e-commerce solution built with React and Node.js. Features include product catalog, user authentication, shopping cart, order management, and secure payments via Stripe integration. The platform is fully responsive and optimized for all devices."
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A productivity tool for teams to manage projects efficiently",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      demoUrl: "#",
      githubUrl: "#",
      technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
      longDescription: "A robust task management application designed for teams. Features include project creation, task assignment, progress tracking, and real-time notifications. Built with Next.js and TypeScript for optimal performance and type safety, with a PostgreSQL database managed through Prisma ORM."
    },
    {
      id: 3,
      title: "Personal Finance Dashboard",
      description: "Visualize and manage your finances with interactive charts",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      demoUrl: "#",
      githubUrl: "#",
      technologies: ["Vue.js", "D3.js", "Firebase", "Tailwind CSS"],
      longDescription: "An intuitive finance tracking dashboard built using Vue.js and D3.js for data visualization. Users can track expenses, set budgets, and visualize spending patterns through interactive charts. The application uses Firebase for authentication and real-time database, with a responsive design implemented using Tailwind CSS."
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
            A showcase of my recent work, including web applications, design projects, and experiments.
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
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <p className="text-muted-foreground">{project.description}</p>
                
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
