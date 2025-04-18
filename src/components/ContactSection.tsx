
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import emailjs from 'emailjs-com';

interface ContactSectionProps {
  className?: string;
}

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactSection = ({ className }: ContactSectionProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize EmailJS on component mount
  useEffect(() => {
    emailjs.init("Replace_With_Your_User_ID");
  }, []);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Prepare the template parameters
      const templateParams = {
        from_name: data.name,
        reply_to: data.email,
        subject: data.subject,
        message: data.message
      };
      
      // Send the email using EmailJS
      await emailjs.send(
        "Replace_With_Your_Service_ID", 
        "Replace_With_Your_Template_ID", 
        templateParams
      );
      
      // Show success message
      toast({
        title: "Message sent",
        description: "Your message has been sent successfully. I'll get back to you soon.",
      });
      
      // Reset form
      reset();
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        title: "Error sending message",
        description: "There was an error sending your message. Please try again later.",
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
            
            <div className="space-y-6 mt-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-muted-foreground mt-1">
                    <a href="mailto:prajwaljoshi421@gmail.com" className="hover:text-primary transition-colors">
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
                <div>
                  <h3 className="font-medium">Location</h3>
                  <p className="text-muted-foreground mt-1">Noida, India</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="glass-panel gradient-border p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Name</label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    className="bg-secondary/50 border-secondary/60"
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    className="bg-secondary/50 border-secondary/60"
                    {...register("email", { 
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    })}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                <Input
                  id="subject"
                  placeholder="Project Inquiry"
                  className="bg-secondary/50 border-secondary/60"
                  {...register("subject", { required: "Subject is required" })}
                />
                {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">Message</label>
                <Textarea
                  id="message"
                  placeholder="Tell me about your project..."
                  rows={5}
                  className="bg-secondary/50 border-secondary/60 resize-none"
                  {...register("message", { required: "Message is required" })}
                />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
              </div>
              
              <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
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
