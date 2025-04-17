
import { useState, useEffect, useRef } from "react";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface TestimonialsSectionProps {
  className?: string;
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  text: string;
}

const TestimonialsSection = ({ className }: TestimonialsSectionProps) => {
  // Real testimonials from your HTML
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Philipp Wagner",
      role: "Client",
      company: "Upwork",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      text: "The freelancer did a great Job in setting up these two Python notebooks and I can recommend to work with him."
    },
    {
      id: 2,
      name: "Mohamed Talib",
      role: "Client",
      company: "Upwork",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
      text: "Prajwal is one of the most sincere, smart, and dedicated freelancers I have ever worked with; he was most resourceful, creative, diligent, alert, polite, and always quick to respond! I will hire him again, for sure! The amazing thing about him was his penchant for prefection."
    },
    {
      id: 3,
      name: "Kunal Kumar",
      role: "Client",
      company: "Upwork",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      text: "I had a wonderful experience working with Prajwal. He demonstrated deep expertise in Machine Learning, Convolutional Neural Networks, and Image Processing throughout the project. His commitment to delivering high-quality results and their excellent communication skills made the collaboration highly productive. I would highly recommend Prajwal for any project requiring expertise in these areas."
    },
    {
      id: 4,
      name: "Petr Zoul",
      role: "Client",
      company: "Upwork",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857",
      text: "I was afraid to use upwork, but he pleasantly surprised me, the communication was pleasant and even though I set the rules of what I wanted to do at the beginning and changed them several times over time, he always remodeled the project as I wanted. If I need anything again next time, I will definitely come back to this gentleman."
    },
    {
      id: 5,
      name: "Petr Zoul",
      role: "Repeat Client",
      company: "Upwork",
      image: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56",
      text: "This was my second time working with the worker and I am again extremely satisfied. If I need advice in the future, I will definitely contact them again."
    },
  ];

  const [isPaused, setIsPaused] = useState(false);
  const [visibleTestimonials, setVisibleTestimonials] = useState<Testimonial[]>([]);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [isAnimating, setIsAnimating] = useState(false);
  const [exitingIndex, setExitingIndex] = useState<number | null>(null);
  const [enteringIndex, setEnteringIndex] = useState<number | null>(null);
  const autoplayIntervalRef = useRef<number>();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [lastChangedIndex, setLastChangedIndex] = useState<number | null>(null);

  // Initialize active indices based on itemsPerView
  useEffect(() => {
    // Get random indices for initial testimonials
    const initialIndices: number[] = [];
    while (initialIndices.length < itemsPerView) {
      const randomIndex = Math.floor(Math.random() * testimonials.length);
      if (!initialIndices.includes(randomIndex)) {
        initialIndices.push(randomIndex);
      }
    }
    setActiveIndices(initialIndices);
  }, [itemsPerView]);

  // Update visible testimonials based on active indices
  useEffect(() => {
    const visible = activeIndices.map(index => testimonials[index]);
    setVisibleTestimonials(visible);
  }, [activeIndices]);

  // Update itemsPerView based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };
    
    // Initial check
    handleResize();
    
    // Set up the event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Set up autoplay to change one testimonial at a time
  useEffect(() => {
    if (!isPaused && !isAnimating) {
      autoplayIntervalRef.current = window.setInterval(() => {
        rotateOneTestimonial();
      }, 5000); // Change one testimonial every 5 seconds
    }
    
    return () => {
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
      }
    };
  }, [isPaused, activeIndices, itemsPerView, isAnimating]);

  // Function to handle the animation sequence for rotating a testimonial
  const rotateOneTestimonial = () => {
    if (itemsPerView >= testimonials.length || isAnimating) return;

    // Set animating state to prevent multiple animations
    setIsAnimating(true);

    // Choose a random position to change (different from the last one if possible)
    let positionToChange = Math.floor(Math.random() * itemsPerView);
    
    // If we have more than one item and this was the last changed, try to pick a different one
    if (itemsPerView > 1 && positionToChange === lastChangedIndex) {
      positionToChange = (positionToChange + 1) % itemsPerView;
    }
    
    setLastChangedIndex(positionToChange);
    setExitingIndex(positionToChange);
    
    // Get a new random testimonial index that isn't currently shown
    const unusedIndices = Array.from({ length: testimonials.length }, (_, i) => i)
      .filter(i => !activeIndices.includes(i));
    
    if (unusedIndices.length === 0) {
      setIsAnimating(false);
      return; // All testimonials are currently shown
    }
    
    const newTestimonialIndex = unusedIndices[Math.floor(Math.random() * unusedIndices.length)];
    
    // Begin exit animation
    setTimeout(() => {
      // After exit animation completes, update the testimonial and start enter animation
      setActiveIndices(prev => {
        const newIndices = [...prev];
        newIndices[positionToChange] = newTestimonialIndex;
        return newIndices;
      });
      
      setExitingIndex(null);
      setEnteringIndex(positionToChange);
      
      // After enter animation completes, reset animation states
      setTimeout(() => {
        setEnteringIndex(null);
        setIsAnimating(false);
      }, 800); // Match the duration of the fade-in animation
    }, 800); // Match the duration of the fade-out animation
  };

  // Reset all testimonials at once
  const resetAllTestimonials = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    // Start exit animation for all
    setActiveIndices(prev => prev.map((_, i) => {
      setExitingIndex(i);
      return i;
    }));
    
    // After exit animation completes
    setTimeout(() => {
      // Get random indices without duplicates
      const newIndices: number[] = [];
      while (newIndices.length < itemsPerView) {
        const randomIndex = Math.floor(Math.random() * testimonials.length);
        if (!newIndices.includes(randomIndex)) {
          newIndices.push(randomIndex);
        }
      }
      
      setActiveIndices(newIndices);
      setExitingIndex(null);
      
      // Start enter animation for all
      newIndices.forEach((_, i) => setEnteringIndex(i));
      
      // After enter animation completes
      setTimeout(() => {
        setEnteringIndex(null);
        setIsAnimating(false);
      }, 800); // Match the duration of the fade-in animation
    }, 800); // Match the duration of the fade-out animation
  };

  // Determine the animation class for a testimonial card
  const getAnimationClass = (index: number) => {
    if (index === exitingIndex) {
      return "animate-fade-out";
    }
    if (index === enteringIndex) {
      return "animate-fade-in";
    }
    return "";
  };

  return (
    <section
      id="testimonials"
      className={cn(
        "py-20 px-6 md:py-32 relative",
        className
      )}
    >
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <p className="text-primary font-medium mb-2">Testimonials</p>
          <h2 className="text-3xl md:text-4xl font-bold">Loved by Industry Leaders</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Don't just take my word for it - hear what my clients have to say about working with me.
          </p>
        </div>
        
        <div 
          className="relative max-w-5xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="flex flex-wrap justify-center gap-6" ref={containerRef}>
            {visibleTestimonials.map((testimonial, index) => (
              <div 
                key={`${testimonial.id}-${index}`}
                className={cn(
                  "testimonial-card w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] transition-all duration-500",
                  getAnimationClass(index)
                )}
                style={{ minHeight: "280px" }} // Ensures consistent height during animations
              >
                <div 
                  className="glass-panel gradient-border p-6 h-full rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <div className="relative">
                    <Quote 
                      size={36} 
                      className="absolute -top-4 -left-2 text-primary opacity-40" 
                    />
                    
                    <div className="relative z-10 flex flex-col h-full">
                      <p className="text-foreground/90 mb-6 overflow-hidden">
                        {testimonial.text}
                      </p>
                      
                      <div className="flex items-center mt-auto">
                        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div>
                          <div className="font-semibold">{testimonial.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {testimonial.role}, {testimonial.company}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center mt-8 gap-4">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full"
              onClick={resetAllTestimonials}
              disabled={isAnimating}
              aria-label="Refresh testimonials"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-refresh-cw"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></svg>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
