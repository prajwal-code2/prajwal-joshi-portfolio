
import { useState, useEffect, useRef } from "react";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

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
  const [activeIndex, setActiveIndex] = useState(0);
  const autoplayIntervalRef = useRef<number>();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isPaused) {
      autoplayIntervalRef.current = window.setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 4000);
    }
    
    return () => {
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
      }
    };
  }, [isPaused, testimonials.length]);

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
        
        <div className="relative max-w-5xl mx-auto">
          <div 
            className="testimonials-container overflow-hidden" 
            ref={containerRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div 
              className="testimonials-slider flex transition-all duration-700 ease-in-out" 
              style={{ 
                transform: `translateX(-${activeIndex * 100 / testimonials.length}%)`,
                width: `${testimonials.length * 100}%` 
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div 
                  key={testimonial.id}
                  className="w-full md:w-1/3 px-4 flex-shrink-0"
                  style={{ width: `${100 / testimonials.length}%` }}
                >
                  <div 
                    className={cn(
                      "glass-panel gradient-border p-6 md:p-6 transition-all duration-500 h-full",
                      index === activeIndex % testimonials.length 
                        ? "scale-105 z-10 shadow-xl" 
                        : "opacity-70 hover:opacity-90"
                    )}
                    onClick={() => setActiveIndex(index)}
                    style={{
                      transition: "all 0.5s ease",
                      transform: index === activeIndex % testimonials.length ? "scale(1.05)" : "scale(1)",
                      animation: index === activeIndex % testimonials.length ? "float 4s ease-in-out infinite" : "none"
                    }}
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
          </div>
          
          <div className="flex justify-center gap-2 mt-10">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === activeIndex % testimonials.length ? "bg-primary w-8" : "bg-muted-foreground/30"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .testimonials-container {
          overflow: hidden;
          position: relative;
          width: 100%;
        }
        
        .testimonials-slider {
          display: flex;
          flex-wrap: nowrap;
          transition: transform 0.7s ease-in-out;
        }
        
        @media (max-width: 768px) {
          .testimonials-slider > div {
            width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;
