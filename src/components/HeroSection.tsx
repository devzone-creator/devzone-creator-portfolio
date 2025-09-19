
import { Github, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const HeroSection = () => {
  return (
    <header className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative container mx-auto px-3 sm:px-4 lg:px-6 py-8 sm:py-12 lg:py-16 max-w-full">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-4 sm:mb-6">
            <Avatar className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 mx-auto mb-4 sm:mb-6 border-4 border-white/30">
              <AvatarImage 
                src="/lovable-uploads/a8a73724-1aee-489a-9410-effb8e8b8151.png" 
                alt="Munkaila Sule" 
                className="object-cover"
              />
              <AvatarFallback className="bg-white/20 text-white text-base sm:text-lg lg:text-xl xl:text-2xl">MS</AvatarFallback>
            </Avatar>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 sm:mb-3 lg:mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent break-words">
            Munkaila Sule (fritzbeing)
          </h1>
          <p className="text-sm sm:text-base lg:text-lg xl:text-xl mb-2 text-blue-100 break-words">
            Level 300 CS Student & Aspiring Full-Stack Developer
          </p>
          <p className="text-xs sm:text-sm lg:text-base xl:text-lg mb-4 sm:mb-6 lg:mb-8 text-blue-200 max-w-2xl mx-auto px-2 sm:px-4 break-words">
            Junior Full-Stack Developer | Tax Officer Intern | Compiler Engineer | Driven by passion, not profit
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-2 sm:gap-3 lg:gap-4 px-2 sm:px-4">
            <Button variant="secondary" size="lg" className="bg-white text-blue-700 hover:bg-blue-50 w-full sm:w-auto text-sm" asChild>
              <a href="https://github.com/devzone-creator" target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                GitHub Profile
              </a>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-700 w-full sm:w-auto text-sm" asChild>
              <a href="mailto:fraizyglime@gmail.com">
                <Mail className="w-4 h-4 mr-2" />
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
