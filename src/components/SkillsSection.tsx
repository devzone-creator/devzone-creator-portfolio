
import { Code, Palette, Server, Database, Cpu } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const SkillsSection = () => {
  const skills = [
    { category: "Frontend", items: ["React", "JavaScript", "HTML/CSS", "Tailwind CSS", "Responsive Design"], icon: <Code className="w-5 h-5" /> },
    { category: "Backend", items: ["Node.js", "Express", "JavaScript", "Java", "API Development", "Database Design"], icon: <Server className="w-5 h-5" /> },
    { category: "Compiler Engineering", items: ["Lexical Analysis", "Parsing", "Code Generation", "Optimization"], icon: <Cpu className="w-5 h-5" /> },
    { category: "Database & Others", items: ["Git", "GitHub", "VS Code", "Linux", "Requirements Analysis", "Tax Systems"], icon: <Database className="w-5 h-5" /> }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-900 via-slate-900 to-emerald-900/20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">Technical Skills</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skillGroup, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-slate-700/80 backdrop-blur-sm border-slate-600">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-lg text-white">
                  <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400">
                    {skillGroup.icon}
                  </div>
                  {skillGroup.category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="secondary" className="bg-emerald-900/50 text-emerald-100 hover:bg-emerald-800/50">
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
  );
};

export default SkillsSection;
