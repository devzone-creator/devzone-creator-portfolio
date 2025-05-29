
import { useState } from "react";
import { Menu, X, Github, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserMenu } from "./UserMenu";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-gray-900 via-slate-800 to-gray-900 backdrop-blur-md border-b border-gray-700/50">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 max-w-full">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 min-w-0 flex-shrink-0">
            <img 
              src="/lovable-uploads/4220cf09-e957-4428-93d6-eae0a8486c3d.png" 
              alt="Devzone Creator" 
              className="w-6 h-6 sm:w-8 sm:h-8 object-contain flex-shrink-0"
            />
            <div className="text-white min-w-0">
              <span className="text-base sm:text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Devzone
              </span>
              <div className="text-xs text-gray-400 -mt-1 hidden sm:block">CREATOR</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <a href="#about" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 text-sm">
              About
            </a>
            <a href="#skills" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 text-sm">
              Skills
            </a>
            <a href="#experience" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 text-sm">
              Experience
            </a>
            <a href="#projects" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 text-sm">
              Projects
            </a>
            <a href="#blog" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 text-sm">
              Blog
            </a>
            <a href="#newsletter" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 text-sm">
              Newsletter
            </a>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" asChild className="text-gray-300 hover:text-white hover:bg-gray-700 p-2">
                <a href="https://github.com/devzone-creator" target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4" />
                </a>
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white text-xs px-3" asChild>
                <a href="mailto:fraizyglime@gmail.com">
                  <Mail className="w-3 h-3 mr-1" />
                  Contact
                </a>
              </Button>
              <UserMenu />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2 flex-shrink-0">
            <UserMenu />
            <Button variant="ghost" size="sm" onClick={toggleMenu} className="text-gray-300 hover:text-white hover:bg-gray-700 p-2">
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-gray-800/95 backdrop-blur-sm border-t border-gray-700/50">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a 
                href="#about" 
                className="block px-3 py-2 text-gray-300 hover:text-emerald-400 hover:bg-gray-700/50 rounded-md transition-all duration-200 text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <a 
                href="#skills" 
                className="block px-3 py-2 text-gray-300 hover:text-emerald-400 hover:bg-gray-700/50 rounded-md transition-all duration-200 text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                Skills
              </a>
              <a 
                href="#experience" 
                className="block px-3 py-2 text-gray-300 hover:text-emerald-400 hover:bg-gray-700/50 rounded-md transition-all duration-200 text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                Experience
              </a>
              <a 
                href="#projects" 
                className="block px-3 py-2 text-gray-300 hover:text-emerald-400 hover:bg-gray-700/50 rounded-md transition-all duration-200 text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                Projects
              </a>
              <a 
                href="#blog" 
                className="block px-3 py-2 text-gray-300 hover:text-emerald-400 hover:bg-gray-700/50 rounded-md transition-all duration-200 text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </a>
              <a 
                href="#newsletter" 
                className="block px-3 py-2 text-gray-300 hover:text-emerald-400 hover:bg-gray-700/50 rounded-md transition-all duration-200 text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                Newsletter
              </a>
              <div className="flex items-center space-x-3 px-3 py-2">
                <Button variant="ghost" size="sm" asChild className="text-gray-300 hover:text-white hover:bg-gray-700 p-2">
                  <a href="https://github.com/devzone-creator" target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4" />
                  </a>
                </Button>
                <Button size="sm" className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white text-xs px-3" asChild>
                  <a href="mailto:fraizyglime@gmail.com">
                    <Mail className="w-3 h-3 mr-1" />
                    Contact
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
