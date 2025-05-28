
import BlogsSection from "@/components/BlogsSection";
import ProjectsSection from "@/components/ProjectsSection";
import CallToAction from "@/components/CallToAction";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import CurrentFocusSection from "@/components/CurrentFocusSection";
import PhilosophySection from "@/components/PhilosophySection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <BlogsSection />
      <CurrentFocusSection />
      <PhilosophySection />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
