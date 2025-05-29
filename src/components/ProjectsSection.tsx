
import { Code, ExternalLink, Github, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const ProjectsSection = () => {
  const projects = [
    {
      title: "Wikipedia Cloud Project",
      description: "My upcoming project that will be hosted on Wikipedia Cloud - a milestone in my journey from local development to public deployment.",
      status: "Coming Soon",
      technologies: ["React", "Node.js", "Express", "Database"],
      category: "Full-Stack",
      featured: true,
      demoUrl: null,
      githubUrl: null,
      inProgress: true
    },
    {
      title: "Compiler Design Project",
      description: "A basic compiler implementation showcasing lexical analysis, parsing, and code generation techniques learned in my CS studies.",
      status: "In Development",
      technologies: ["C++", "Lexical Analysis", "Parsing", "Code Generation"],
      category: "Compiler Engineering",
      featured: true,
      demoUrl: null,
      githubUrl: null,
      inProgress: true
    },
    {
      title: "Portfolio Website",
      description: "This very website! Built with modern web technologies to showcase my skills and journey as a developer.",
      status: "Live",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Shadcn/ui"],
      category: "Frontend",
      featured: false,
      demoUrl: "#",
      githubUrl: "https://github.com/devzone-creator",
      inProgress: false
    },
    {
      title: "Local Projects Collection",
      description: "Various projects developed during my studies and internships, currently being prepared for GitHub deployment.",
      status: "Preparing",
      technologies: ["JavaScript", "React", "CSS", "HTML"],
      category: "Mixed",
      featured: false,
      demoUrl: null,
      githubUrl: null,
      inProgress: true
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-900 via-slate-900 to-emerald-900/30">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-4 text-white">Projects</h2>
        <p className="text-center text-slate-300 mb-12 max-w-2xl mx-auto">
          A collection of my work spanning full-stack development, compiler engineering, and graphic design projects.
        </p>
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className={`hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-slate-700/80 backdrop-blur-sm border-slate-600 ${project.featured ? 'ring-2 ring-emerald-500' : ''}`}>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="bg-emerald-900/50 text-emerald-100">
                    {project.category}
                  </Badge>
                  <div className="flex gap-2">
                    {project.featured && (
                      <Badge className="bg-gradient-to-r from-emerald-600 to-cyan-600 text-white">
                        Featured
                      </Badge>
                    )}
                    <Badge 
                      variant={project.status === 'Live' ? 'default' : project.inProgress ? 'secondary' : 'outline'}
                      className={project.status === 'Live' ? 'bg-green-600' : ''}
                    >
                      {project.status}
                    </Badge>
                  </div>
                </div>
                <CardTitle className="text-xl leading-tight flex items-center gap-2 text-white">
                  <Code className="w-5 h-5 text-emerald-400" />
                  {project.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-300 leading-relaxed">{project.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="outline" className="text-xs border-slate-500 text-slate-300">
                      {tech}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-2 pt-2">
                  {project.demoUrl && (
                    <Button variant="outline" size="sm" className="border-slate-500 text-slate-300 hover:bg-slate-600" asChild>
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                        <Eye className="w-4 h-4 mr-2" />
                        Demo
                      </a>
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button variant="outline" size="sm" className="border-slate-500 text-slate-300 hover:bg-slate-600" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </a>
                    </Button>
                  )}
                  {project.inProgress && (
                    <Button variant="ghost" size="sm" disabled className="text-slate-400">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Coming Soon
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700" asChild>
            <a href="https://github.com/devzone-creator" target="_blank" rel="noopener noreferrer">
              <Github className="w-5 h-5 mr-2" />
              View All Projects on GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
