
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  className?: string;
}

const roles = [
  "Computer Vision Specialist",
  "Transforming Pixels into Actionable Insight"
];

const HeroSection = ({ className }: HeroSectionProps) => {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [isWaiting, setIsWaiting] = useState(false);
  const typingSpeed = 100;
  const deleteSpeed = 50;
  const waitTime = 1500;

  useEffect(() => {
    let timer: number;
    
    if (isWaiting) {
      timer = window.setTimeout(() => {
        setIsWaiting(false);
        setIsDeleting(true);
      }, waitTime);
      return () => clearTimeout(timer);
    }

    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      if (displayText === "") {
        setIsDeleting(false);
        setRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
      } else {
        timer = window.setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, deleteSpeed);
      }
    } else {
      if (displayText === currentRole) {
        setIsWaiting(true);
      } else {
        timer = window.setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        }, typingSpeed);
      }
    }
    
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex, isWaiting]);

  return (
    <section 
      id="home" 
      className={cn(
        "min-h-screen pt-24 relative",
        className
      )}
    >
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="space-y-4 text-center md:text-left">
          <div className="space-y-6"> 
            <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg">
              Hello, I'm <span className="gradient-text">Prajwal Joshi</span>
            </h1>
            <h2 className="text-xl md:text-3xl text-white min-h-10 mt-4">
              <span className="relative inline-block">
                {displayText}
                <span className="absolute -right-4 animate-cursor-blink">|</span>
              </span>
            </h2>
          </div>
          
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto md:mx-0 mt-4">
            I build elegant, performant, and user-friendly computer vision systems. 
            Focused on creating cutting-edge AI solutions for real-world problems.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-6">
            <Button size="lg" className="group text-lg" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
              View My Work
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </Button>
            <Button variant="outline" size="lg" className="text-lg" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Contact Me
            </Button>
          </div>

          {/* Social links */}
          <div className="flex justify-center md:justify-start items-center gap-6 pt-4">
            {/* GitHub */}
            <a href="https://github.com/prajwal-code2" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-primary transition-colors" aria-label="GitHub">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
            </a>
            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/prajwal-joshi-570935165/" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-primary transition-colors" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
            {/* Upwork */}
            <a href="https://www.upwork.com/freelancers/~0158b40f97683abbe7?mp_source=share" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-primary transition-colors" aria-label="Upwork">
              <img 
                src="/lovable-uploads/9b01c748-7bdc-4735-8dac-944455ff1dbc.png"
                alt="Upwork"
                className="w-8 h-8"
              />
            </a>
          </div>
        </div>
      </div>
      
      {/* Code editor background image */}
      <div className="absolute bottom-0 left-0 right-0 z-0 overflow-hidden">
        <img 
          src="/lovable-uploads/2be5afe3-9b68-40cc-819b-ca14d9df7292.png" 
          alt="Code editor" 
          className="w-full object-cover opacity-70 h-auto"
{/*           style={{ maxHeight: "70vh" }} */}
          style={{ maxHeight: "70vh", position: 'relative', top: '100px' }}
        />
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block z-10">
        <a href="#about" className="text-white hover:text-primary transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6"></path></svg>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
