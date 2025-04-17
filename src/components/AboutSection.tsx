
import { Code, Laptop, Palette, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface AboutSectionProps {
  className?: string;
}

const AboutSection = ({ className }: AboutSectionProps) => {
  const skills = [
    { icon: Code, name: "Computer Vision", description: "YOLO, Object Detection, Object Tracking, Action Recognition" },
    { icon: Laptop, name: "Programming", description: "Python, OpenCV, TensorFlow, Data Analytics" },
    { icon: Palette, name: "Development", description: "Edge Computing, Automation, MQTT" },
    { icon: Sparkles, name: "Tools", description: "Linux, GitHub, VSCode" },
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
                Computer Vision Expert
              </h2>
            </div>
            
            <div className="space-y-4 text-muted-foreground">
              <p>
                I'm Prajwal Joshi, a passionate Computer Vision Expert. With a mission to transform raw visual data into powerful, 
                actionable insights, I leverage cutting-edge techniques in object detection, tracking, and automation.
              </p>
              <p>
                Holding a Deep Learning Specialization and an Advanced Computer Vision Certification, I've pioneered solutions 
                like real-time parking monitoring systems and high-speed pill-counting automation, driving precision and innovation 
                in every project.
              </p>
              <p>
                Currently serving as Head of Technology at Insight Fusion Analytics since June 2024, I've also collaborated on 
                numerous client projects through Upwork.
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
