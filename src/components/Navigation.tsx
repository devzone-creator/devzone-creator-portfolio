
import { useState } from "react";
import { Menu, X, Github, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-gray-900 via-slate-800 to-gray-900 backdrop-blur-md border-b border-gray-700/50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/4220cf09-e957-4428-93d6-eae0a8486c3d.png" 
              alt="Devzone Creator" 
              className="w-8 h-8 object-contain"
            />
            <div className="text-white">
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Devzone
              </span>
              <div className="text-xs text-gray-400 -mt-1">CREATOR</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#about" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200">
              About
            </a>
            <a href="#skills" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200">
              Skills
            </a>
            <a href="#experience" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200">
              Experience
            </a>
            <a href="#projects" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200">
              Projects
            </a>
            <a href="#blog" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200">
              Blog
            </a>
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" asChild className="text-gray-300 hover:text-white hover:bg-gray-700">
                <a href="https://github.com/devzone-creator" target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4" />
                </a>
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white" asChild>
                <a href="mailto:fraizyglime@gmail.com">
                  <Mail className="w-4 h-4 mr-2" />
                  Contact
                </a>
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={toggleMenu} className="text-gray-300 hover:text-white hover:bg-gray-700">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-800/95 backdrop-blur-sm border-t border-gray-700/50">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a 
                href="#about" 
                className="block px-3 py-2 text-gray-300 hover:text-emerald-400 hover:bg-gray-700/50 rounded-md transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <a 
                href="#skills" 
                className="block px-3 py-2 text-gray-300 hover:text-emerald-400 hover:bg-gray-700/50 rounded-md transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Skills
              </a>
              <a 
                href="#experience" 
                className="block px-3 py-2 text-gray-300 hover:text-emerald-400 hover:bg-gray-700/50 rounded-md transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Experience
              </a>
              <a 
                href="#projects" 
                className="block px-3 py-2 text-gray-300 hover:text-emerald-400 hover:bg-gray-700/50 rounded-md transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Projects
              </a>
              <a 
                href="#blog" 
                className="block px-3 py-2 text-gray-300 hover:text-emerald-400 hover:bg-gray-700/50 rounded-md transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </a>
              <div className="flex items-center space-x-3 px-3 py-2">
                <Button variant="ghost" size="sm" asChild className="text-gray-300 hover:text-white hover:bg-gray-700">
                  <a href="https://github.com/devzone-creator" target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4" />
                  </a>
                </Button>
                <Button size="sm" className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white" asChild>
                  <a href="mailto:fraizyglime@gmail.com">
                    <Mail className="w-4 h-4 mr-2" />
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
