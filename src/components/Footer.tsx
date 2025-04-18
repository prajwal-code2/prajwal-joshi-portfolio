
import { cn } from "@/lib/utils";

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
        <div className="flex justify-center items-center">
          <div className="text-sm text-muted-foreground">
            &copy; {currentYear} Prajwal Joshi. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
