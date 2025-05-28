
import { ExternalLink, Github } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CurrentFocusSection = () => {
  return (
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
  );
};

export default CurrentFocusSection;
