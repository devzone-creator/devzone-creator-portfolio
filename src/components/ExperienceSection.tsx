
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ExperienceSection = () => {
  const experiences = [
    {
      role: "Tax Officer (Intern)",
      company: "Ghana Revenue Authority",
      period: "Current",
      description: "Currently interning as a Tax Officer, gaining hands-on experience in tax administration, revenue collection systems, and government digital services."
    },
    {
      role: "Junior Frontend Developer",
      company: "COLDSIS Ghana Limited",
      period: "Previous",
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
    <section className="py-16 bg-gradient-to-br from-slate-900 via-gray-900 to-cyan-900/20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">Experience</h2>
        <div className="max-w-4xl mx-auto space-y-6">
          {experiences.map((exp, index) => (
            <Card key={index} className="bg-slate-800/80 backdrop-blur-sm border-slate-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <h3 className="text-xl font-semibold text-white">{exp.role}</h3>
                  <Badge variant="outline" className="w-fit mt-2 md:mt-0 border-cyan-400 text-cyan-400">{exp.period}</Badge>
                </div>
                <h4 className="text-lg text-cyan-400 font-medium mb-3">{exp.company}</h4>
                <p className="text-slate-300 leading-relaxed">{exp.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
