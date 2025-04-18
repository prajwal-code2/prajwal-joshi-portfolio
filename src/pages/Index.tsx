
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import AnimatedGradientBackground from "@/components/AnimatedGradientBackground";

const Index = () => {
  // Smooth scroll function already implemented in Navbar.tsx now

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <AnimatedGradientBackground />
      <div className="fixed top-0 left-0 right-0 z-50 bg-secondary/80 backdrop-blur-md border-b border-secondary/50 shadow-md">
        <Navbar />
      </div>
      <main id="home" className="pt-20"> {/* Added id="home" here */}
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
