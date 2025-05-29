
import { Github, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">Let's Connect</h3>
          <p className="text-gray-300 mb-6">
            I'm always excited to discuss technology, share ideas, or collaborate on interesting projects.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 max-w-md mx-auto sm:max-w-none">
            <Button variant="outline" size="lg" className="border-gray-600 text-gray-300 hover:bg-gray-700 flex-1 sm:flex-none" asChild>
              <a href="https://github.com/devzone-creator" target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5 mr-2" />
                GitHub
              </a>
            </Button>
            <Button variant="outline" size="lg" className="border-gray-600 text-gray-300 hover:bg-gray-700 flex-1 sm:flex-none" asChild>
              <a href="mailto:fraizyglime@gmail.com">
                <Mail className="w-5 h-5 mr-2" />
                Email
              </a>
            </Button>
            <Button variant="outline" size="lg" className="border-gray-600 text-gray-300 hover:bg-gray-700 flex-1 sm:flex-none" asChild>
              <a href="tel:+233599882901">
                <Phone className="w-5 h-5 mr-2" />
                Call
              </a>
            </Button>
          </div>
          <Separator className="my-8 bg-gray-600" />
          <p className="text-gray-400">
            © 2024 Munkaila Sule - Built with passion and code | Level 300 CS Student Portfolio
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
