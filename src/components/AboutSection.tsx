
import { Code, Laptop, Palette, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface AboutSectionProps {
  className?: string;
}

const AboutSection = ({ className }: AboutSectionProps) => {
  const skills = [
    { icon: Code, name: "Frontend", description: "React, NextJS, TypeScript, Tailwind CSS" },
    { icon: Laptop, name: "Backend", description: "Node.js, Express, Python, PostgreSQL" },
    { icon: Palette, name: "Design", description: "Figma, Responsive Design, UI/UX" },
    { icon: Sparkles, name: "Other", description: "Git, Docker, CI/CD, AWS" },
  ];

  return (
    <section
      id="about"
      className={cn(
        "py-20 px-6 md:py-32 relative",
        className
      )}
    >
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6">
            <div>
              <p className="text-primary font-medium mb-2">About Me</p>
              <h2 className="text-3xl md:text-4xl font-bold">
                A passionate developer creating amazing digital experiences
              </h2>
            </div>
            
            <div className="space-y-4 text-muted-foreground">
              <p>
                Hello! I'm Alex, a Full Stack Developer based in San Francisco. 
                I enjoy building everything from small business sites to rich 
                interactive web applications.
              </p>
              <p>
                With 5+ years of experience in web development, I specialize in
                creating fast, accessible, and responsive websites with smooth
                user experiences. I'm always learning and exploring new
                technologies to stay at the forefront of web development.
              </p>
              <p>
                When I'm not coding, you'll find me hiking, playing chess, or 
                experimenting with new recipes in the kitchen.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="glass-panel p-6 space-y-4 transition-all duration-300 hover:translate-y-[-5px]"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <skill.icon size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{skill.name}</h3>
                  <p className="text-muted-foreground mt-2">{skill.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
