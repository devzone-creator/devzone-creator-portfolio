
import { Mail, Github, Phone, MessageCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const CallToAction = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Build Something Amazing?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Let's collaborate and create innovative solutions together. I'm always open to new opportunities and exciting projects.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white">
                  <MessageCircle className="w-6 h-6" />
                  Let's Talk
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-blue-100">
                  Whether you have a project idea, want to collaborate, or just want to chat about technology, I'd love to hear from you.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    Full-Stack Development
                  </Badge>
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    Compiler Engineering
                  </Badge>
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    Graphic Design
                  </Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white">
                  <Github className="w-6 h-6" />
                  Follow My Journey
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-blue-100">
                  I'm actively building my GitHub portfolio and will be sharing my projects soon. Follow along to see my progress!
                </p>
                <div className="text-sm text-blue-200">
                  <p>🚀 First project launching on Wikipedia Cloud soon</p>
                  <p>💻 Local projects being prepared for GitHub</p>
                  <p>📚 Continuous learning and skill development</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50" asChild>
              <a href="mailto:fraizyglime@gmail.com">
                <Mail className="w-5 h-5 mr-2" />
                Send Email
              </a>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600" asChild>
              <a href="https://github.com/devzone-creator" target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5 mr-2" />
                GitHub
              </a>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600" asChild>
              <a href="tel:+233599882901">
                <Phone className="w-5 h-5 mr-2" />
                Call Me
              </a>
            </Button>
          </div>
          
          <div className="mt-8 text-blue-200">
            <p className="text-sm">
              📍 Based in Ghana | 🎓 Level 300 CS Student | 💡 Passionate about innovation
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
