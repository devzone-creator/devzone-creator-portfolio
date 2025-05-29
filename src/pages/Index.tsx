
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
import Navigation from "@/components/Navigation";

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-900 overflow-x-hidden">
      <Navigation />
      <div className="pt-16">
        <HeroSection />
        <div id="about">
          <AboutSection />
        </div>
        <div id="skills">
          <SkillsSection />
        </div>
        <div id="experience">
          <ExperienceSection />
        </div>
        <div id="projects">
          <ProjectsSection />
        </div>
        <div id="blog">
          <BlogsSection />
        </div>
        <CurrentFocusSection />
        <PhilosophySection />
        <CallToAction />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
