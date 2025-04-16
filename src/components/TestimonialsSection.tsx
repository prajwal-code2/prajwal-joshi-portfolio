
import { useState, useEffect, useRef } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
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
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Product Manager",
      company: "TechCorp",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      text: "Working with PJ was a fantastic experience. They delivered our project ahead of schedule and the quality of work exceeded our expectations. Their attention to detail and problem-solving skills are outstanding."
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "CEO",
      company: "StartupX",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
      text: "PJ transformed our computer vision pipeline completely. The model performance is exceptional, and our detection accuracy has increased by 40%. I highly recommend their services to anyone looking for a skilled CV specialist."
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Research Director",
      company: "AILabs",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      text: "We've worked with many computer vision specialists, but PJ stands out. They not only understood our technical requirements but also grasped our business goals and delivered solutions that perfectly address both aspects. The attention to detail and willingness to go above and beyond made all the difference to our project."
    },
    {
      id: 4,
      name: "David Kim",
      role: "CTO",
      company: "VisionTech",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857",
      text: "Exceptional talent! PJ built our entire image recognition system from scratch. Their deep understanding of both theoretical and practical aspects of computer vision is impressive. They're not just a developer but a true technical partner."
    },
    {
      id: 5,
      name: "Sophia Martinez",
      role: "Lead Developer",
      company: "DataSense",
      image: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56",
      text: "I had the pleasure of collaborating with PJ on a complex ML project. Their knowledge of the latest computer vision algorithms and ability to implement them efficiently saved us countless hours of development time."
    },
  ];

  const [isPaused, setIsPaused] = useState(false);
  const [visibleTestimonials, setVisibleTestimonials] = useState<Testimonial[]>([]);
  const [itemsPerView, setItemsPerView] = useState(3);
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
    if (!isPaused) {
      autoplayIntervalRef.current = window.setInterval(() => {
        rotateOneTestimonial();
      }, 5000); // Change one testimonial every 5 seconds
    }
    
    return () => {
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
      }
    };
  }, [isPaused, activeIndices, itemsPerView]);

  // Function to rotate just one testimonial
  const rotateOneTestimonial = () => {
    if (itemsPerView >= testimonials.length) return;

    // Choose a random position to change (different from the last one if possible)
    let positionToChange = Math.floor(Math.random() * itemsPerView);
    
    // If we have more than one item and this was the last changed, try to pick a different one
    if (itemsPerView > 1 && positionToChange === lastChangedIndex) {
      positionToChange = (positionToChange + 1) % itemsPerView;
    }
    
    setLastChangedIndex(positionToChange);
    
    // Get a new random testimonial index that isn't currently shown
    const unusedIndices = Array.from({ length: testimonials.length }, (_, i) => i)
      .filter(i => !activeIndices.includes(i));
    
    if (unusedIndices.length === 0) return; // All testimonials are currently shown
    
    const newIndex = unusedIndices[Math.floor(Math.random() * unusedIndices.length)];
    
    // Update the active indices by replacing just the one at positionToChange
    setActiveIndices(prev => {
      const newIndices = [...prev];
      newIndices[positionToChange] = newIndex;
      return newIndices;
    });
  };

  // Reset all testimonials at once
  const resetAllTestimonials = () => {
    // Get random indices without duplicates
    const newIndices: number[] = [];
    while (newIndices.length < itemsPerView) {
      const randomIndex = Math.floor(Math.random() * testimonials.length);
      if (!newIndices.includes(randomIndex)) {
        newIndices.push(randomIndex);
      }
    }
    setActiveIndices(newIndices);
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
                className="testimonial-card w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] transition-all duration-500"
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
              aria-label="Refresh testimonials"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-refresh-cw"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></svg>
            </Button>
          </div>
        </div>
      </div>
      
      <style>
        {`
        .testimonial-card {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.5s forwards;
        }
        
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .testimonial-card:nth-child(1) { animation-delay: 0.1s; }
        .testimonial-card:nth-child(2) { animation-delay: 0.2s; }
        .testimonial-card:nth-child(3) { animation-delay: 0.3s; }
        `}
      </style>
    </section>
  );
};

export default TestimonialsSection;
