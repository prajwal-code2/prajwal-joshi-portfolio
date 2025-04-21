
import { Mail, MapPin, Phone, Send, Github, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState, FormEvent } from "react";

interface ContactSectionProps {
  className?: string;
}

const ContactSection = ({ className }: ContactSectionProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send form data to formsubmit.co using POST via fetch to prevent default redirect behavior
      const response = await fetch("https://formsubmit.co/ajax/prajwaljoshi421@gmail.com", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast({
          title: "Message sent",
          description: "Your message has been sent successfully. Prajwal will get back to you soon."
        });

        setFormData({
          name: "",
          email: "",
          subject: "",
          message: ""
        });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error submitting your message. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className={cn(
        "py-20 px-6 md:py-32 relative bg-secondary/30",
        className
      )}
    >
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="space-y-6">
            <div>
              <p className="text-primary font-medium mb-2">Contact</p>
              <h2 className="text-3xl md:text-4xl font-bold">Get In Touch</h2>
              <p className="text-muted-foreground mt-4">
                Have a computer vision project in mind or just want to say hello? Feel free to reach out!
              </p>
            </div>

            <div className="space-y-6 mt-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                   <Mail size={20} />
                 </div>
                {/* Removed Mail icon and email icon block as per user request */}
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-muted-foreground mt-1">
                    <a
                      href="mailto:prajwaljoshi421@gmail.com"
                      className="hover:text-primary transition-colors"
                    >
                      prajwaljoshi421@gmail.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-muted-foreground mt-1">+91 9811789311</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                  <MapPin size={20} />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-medium">Location</h3>
                  <p className="text-muted-foreground mt-1">Noida, India</p>

                  {/* Icon row moved below location with bigger icons and aligned left with location icon */}
                  <div className="flex flex-row mt-6">
                    <a
                      href="https://github.com/prajwal-code2"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      className="hover:text-primary transition-colors flex items-center"
                    >
                      <Github size={36} />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/prajwal-joshi-570935165/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="hover:text-primary transition-colors flex items-center"
                    >
                      <Linkedin size={36} />
                    </a>
                    <a
                      href="https://www.upwork.com/freelancers/~0158b40f97683abbe7?mp_source=share"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Upwork"
                      className="hover:text-primary transition-colors flex items-center"
                    >
                      <img
                        src="/lovable-uploads/9b01c748-7bdc-4735-8dac-944455ff1dbc.png"
                        alt="Upwork"
                        className="w-9 h-9"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel gradient-border p-8">
            <form onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="bg-secondary/50 border-secondary/60"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="bg-secondary/50 border-secondary/60"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project Inquiry"
                  className="bg-secondary/50 border-secondary/60"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  rows={5}
                  className="bg-secondary/50 border-secondary/60 resize-none"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending Message..." : "Send Message"}
                <Send size={16} />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

