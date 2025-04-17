
import { cn } from "@/lib/utils";
import { Computer } from "lucide-react";

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer 
      className={cn(
        "py-4 px-6 border-t border-border/30 bg-black/70 backdrop-blur-sm", 
        className
      )}
    >
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <a href="#home" className="text-3xl font-bold gradient-text flex items-center">
              <Computer className="mr-2 inline-block" size={28} />
              <span>PJ</span>
            </a>
          </div>
          
          <div className="text-sm text-muted-foreground">
            &copy; {currentYear} Prajwal Joshi. All rights reserved.
          </div>
          
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="https://www.upwork.com/freelancers/~0158b40f97683abbe7?mp_source=share" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors flex items-center"
              aria-label="Upwork profile"
            >
              <img 
                src="/lovable-uploads/9b01c748-7bdc-4735-8dac-944455ff1dbc.png" 
                alt="Upwork" 
                className="w-5 h-5 mr-1" 
              />
              <span>Upwork</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
