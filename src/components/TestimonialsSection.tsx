
import { useState, useEffect, useRef } from "react";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";

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
      text: "We've worked with many computer vision specialists, but PJ stands out. They not only understood our technical requirements but also grasped our business goals and delivered solutions that perfectly address both aspects."
    },
  ];

  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const intervalRef = useRef<number>();

  // Auto rotate testimonials
  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setActiveTestimonial((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 6000);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [testimonials.length]);

  // Pause rotation on hover
  const pauseRotation = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  // Resume rotation when not hovering
  const resumeRotation = () => {
    intervalRef.current = window.setInterval(() => {
      setActiveTestimonial((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 6000);
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
          onMouseEnter={pauseRotation}
          onMouseLeave={resumeRotation}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id} 
                className={cn(
                  "glass-panel gradient-border p-6 md:p-8 transition-all duration-500 transform",
                  index === activeTestimonial 
                    ? "scale-105 z-10 shadow-xl" 
                    : "opacity-70 hover:opacity-90"
                )}
                onClick={() => setActiveTestimonial(index)}
              >
                <div className="relative">
                  <Quote 
                    size={36} 
                    className="absolute -top-4 -left-2 text-primary opacity-40" 
                  />
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <p className="text-foreground/90 flex-grow mb-6">
                      {testimonial.text}
                    </p>
                    
                    <div className="flex items-center">
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
            ))}
          </div>
          
          <div className="flex justify-center gap-2 mt-10">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === activeTestimonial ? "bg-primary w-8" : "bg-muted-foreground/30"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
