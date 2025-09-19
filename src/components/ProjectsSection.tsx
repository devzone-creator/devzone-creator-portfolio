
import { Code, ExternalLink, Github, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const ProjectsSection = () => {
  const projects = [
    {
      title: "Ghana Supreme Cases",
      description: "A comprehensive legal database system for Ghana Supreme Court cases, hosted on Wikimedia Toolforge infrastructure.",
      status: "Live",
      technologies: ["JavaScript", "Node.js", "Express", "Database"],
      category: "Backend",
      featured: true,
      demoUrl: "https://ghanasupremecases.toolforge.org/",
      githubUrl: "https://github.com/devzone-creator",
      inProgress: false
    },
    {
      title: "File Frenzy",
      description: "A powerful file management and sharing platform with advanced features for organizing and distributing digital content.",
      status: "Live",
      technologies: ["JavaScript", "Node.js", "React", "Database"],
      category: "Full-Stack",
      featured: true,
      demoUrl: "https://filefrenzy.onrender.com/",
      githubUrl: "https://github.com/devzone-creator",
      inProgress: false
    },
    {
      title: "ICT Analyzer Assignment",
      description: "An analytical tool for ICT data processing and visualization, deployed on Vercel with modern web technologies.",
      status: "Live",
      technologies: ["JavaScript", "React", "Data Analysis", "Vercel"],
      category: "Frontend",
      featured: true,
      demoUrl: "https://ict-analyzer-assignment.vercel.app/",
      githubUrl: "https://github.com/devzone-creator",
      inProgress: false
    },
    {
      title: "Portfolio Website",
      description: "This very website! Built with modern web technologies to showcase my skills and journey as a developer.",
      status: "Live",
      technologies: ["React", "JavaScript", "Tailwind CSS", "Shadcn/ui"],
      category: "Frontend",
      featured: false,
      demoUrl: "#",
      githubUrl: "https://github.com/devzone-creator",
      inProgress: false
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
