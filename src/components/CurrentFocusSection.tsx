
import { ExternalLink, Github } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CurrentFocusSection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-slate-900 via-gray-900 to-emerald-900/20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">Current Focus</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-slate-800/80 backdrop-blur-sm border-slate-700 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white">
                <ExternalLink className="w-6 h-6 text-emerald-400" />
                Upcoming Project
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300">
                Preparing to host my first major project on Wikipedia Cloud. This milestone represents 
                my transition from local development to sharing my work with the world.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/80 backdrop-blur-sm border-slate-700 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white">
                <Github className="w-6 h-6 text-emerald-400" />
                GitHub Journey
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300">
                Building my GitHub portfolio by pushing local projects online. Each commit represents 
                hours of passionate coding and learning through hands-on experience.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CurrentFocusSection;
