
import { Github, Linkedin, Mail, Code, Palette, Server, Database, Cpu, ExternalLink, Phone, BookOpen, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import BlogsSection from "@/components/BlogsSection";
import ProjectsSection from "@/components/ProjectsSection";
import CallToAction from "@/components/CallToAction";

const Index = () => {
  const skills = [
    { category: "Frontend", items: ["React", "JavaScript", "TypeScript", "HTML/CSS", "Tailwind CSS"], icon: <Code className="w-5 h-5" /> },
    { category: "Backend", items: ["Node.js", "Express", "API Development", "Database Design"], icon: <Server className="w-5 h-5" /> },
    { category: "Compiler Engineering", items: ["Lexical Analysis", "Parsing", "Code Generation", "Optimization"], icon: <Cpu className="w-5 h-5" /> },
    { category: "Design", items: ["UI/UX Design", "Graphic Design", "Adobe Creative Suite", "Figma"], icon: <Palette className="w-5 h-5" /> },
    { category: "Tools & Others", items: ["Git", "GitHub", "VS Code", "Linux", "Requirements Analysis"], icon: <Database className="w-5 h-5" /> }
  ];

  const experiences = [
    {
      role: "Junior Frontend Developer",
      company: "COLDSIS Ghana Limited",
      period: "Year 2 (Recent)",
      description: "Developed responsive web interfaces and collaborated with design teams to implement user-friendly solutions."
    },
    {
      role: "Software Requirements Specifications Intern",
      company: "University",
      period: "Year 1",
      description: "Analyzed user needs and documented technical requirements for software development projects."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header/Hero Section */}
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

      {/* About Section */}
      <section className="py-16 container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">About Me</h2>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-8">
              <p className="text-lg text-gray-700 leading-relaxed text-center">
                I'm Munkaila Sule, a Level 300 Computer Science student from Ghana with a genuine passion for coding and building innovative solutions. 
                My journey combines full-stack web development, compiler engineering, and graphic design. I believe in 
                learning by doing rather than just theory - every line of code I write brings me closer to my goals. 
                Currently preparing to host my first project on Wikipedia Cloud and actively building my GitHub portfolio.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Technical Skills</h2>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skillGroup, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm border-0">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                      {skillGroup.icon}
                    </div>
                    {skillGroup.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Experience</h2>
          <div className="max-w-4xl mx-auto space-y-6">
            {experiences.map((exp, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                    <h3 className="text-xl font-semibold text-gray-800">{exp.role}</h3>
                    <Badge variant="outline" className="w-fit mt-2 md:mt-0">{exp.period}</Badge>
                  </div>
                  <h4 className="text-lg text-blue-600 font-medium mb-3">{exp.company}</h4>
                  <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <ProjectsSection />

      {/* Blogs Section */}
      <BlogsSection />

      {/* Current Focus Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Current Focus</h2>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <ExternalLink className="w-6 h-6 text-blue-600" />
                  Upcoming Project
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Preparing to host my first major project on Wikipedia Cloud. This milestone represents 
                  my transition from local development to sharing my work with the world.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Github className="w-6 h-6 text-blue-600" />
                  GitHub Journey
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Building my GitHub portfolio by pushing local projects online. Each commit represents 
                  hours of passionate coding and learning through hands-on experience.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">My Philosophy</h2>
            <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0">
              <CardContent className="p-8">
                <blockquote className="text-xl italic font-medium leading-relaxed">
                  "I code not for money, but for the pure enthusiasm and passion of building something meaningful. 
                  I believe in learning by doing - theory has its place, but nothing beats the satisfaction of 
                  creating solutions that work."
                </blockquote>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <CallToAction />

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Let's Connect</h3>
            <p className="text-gray-300 mb-6">
              I'm always excited to discuss technology, share ideas, or collaborate on interesting projects.
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="outline" size="lg" className="border-gray-600 text-gray-300 hover:bg-gray-700" asChild>
                <a href="https://github.com/devzone-creator" target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5 mr-2" />
                  GitHub
                </a>
              </Button>
              <Button variant="outline" size="lg" className="border-gray-600 text-gray-300 hover:bg-gray-700" asChild>
                <a href="mailto:fraizyglime@gmail.com">
                  <Mail className="w-5 h-5 mr-2" />
                  Email
                </a>
              </Button>
              <Button variant="outline" size="lg" className="border-gray-600 text-gray-300 hover:bg-gray-700" asChild>
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
    </div>
  );
};

export default Index;
