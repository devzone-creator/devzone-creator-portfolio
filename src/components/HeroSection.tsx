
import { Github, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const HeroSection = () => {
  return (
    <header className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <Avatar className="w-32 h-32 mx-auto mb-6 border-4 border-white/30">
              <AvatarImage src="/lovable-uploads/a8a73724-1aee-489a-9410-effb8e8b8151.png" alt="Munkaila Sule" />
              <AvatarFallback className="bg-white/20 text-white text-2xl">MS</AvatarFallback>
            </Avatar>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            Munkaila Sule (fritzbeing)
          </h1>
          <p className="text-xl mb-2 text-blue-100">
            Level 300 CS Student & Aspiring Full-Stack Developer
          </p>
          <p className="text-lg mb-8 text-blue-200 max-w-2xl mx-auto">
            Junior Full-Stack Developer | Compiler Engineer | Graphic Designer | Driven by passion, not profit
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="secondary" size="lg" className="bg-white text-blue-700 hover:bg-blue-50" asChild>
              <a href="https://github.com/devzone-creator" target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5 mr-2" />
                GitHub Profile
              </a>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-700" asChild>
              <a href="mailto:fraizyglime@gmail.com">
                <Mail className="w-5 h-5 mr-2" />
                Contact Me
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
