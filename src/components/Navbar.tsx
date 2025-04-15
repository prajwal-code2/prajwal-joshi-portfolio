import { useState, useEffect } from "react";
import { Menu, X, Computer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavbarProps {
  className?: string;
}

const Navbar = ({ className }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Always keep navbar visible but update styling on scroll
      setIsVisible(true);
      
      // Set scrolled state for background effects
      setScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header 
      className={cn(
        "fixed top-4 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-10 mx-auto max-w-7xl rounded-full shadow-lg border border-border/10",
        scrolled ? "bg-background/90 backdrop-blur-md" : "bg-background/80 backdrop-blur-sm",
        isVisible ? "translate-y-0" : "-translate-y-full",
        className
      )}
      style={{
        width: "calc(100% - 2rem)",
        marginLeft: "auto",
        marginRight: "auto",
        animation: "float 6s ease-in-out infinite"
      }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <a href="#home" className="text-3xl font-bold gradient-text flex items-center">
          <Computer className="mr-2 inline-block" size={28} />
          <span>PJ</span>
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="nav-link">
              {link.name}
            </a>
          ))}
        </nav>
        
        {/* Mobile Navigation Toggle */}
        <button 
          className="md:hidden text-foreground" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md shadow-lg py-6 px-6 border-t border-border/30 animate-slide-up mt-4 rounded-xl">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-lg py-2 nav-link"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
