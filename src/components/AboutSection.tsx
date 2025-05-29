
import { Card, CardContent } from "@/components/ui/card";

const AboutSection = () => {
  return (
    <section className="py-16 container mx-auto px-6 bg-slate-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">About Me</h2>
        <Card className="bg-slate-800/80 backdrop-blur-sm border-slate-700 shadow-lg">
          <CardContent className="p-8">
            <p className="text-lg text-slate-300 leading-relaxed text-center">
              I'm Munkaila Sule, a Level 300 Computer Science student from Ghana with a genuine passion for coding and building innovative solutions. 
              My journey combines full-stack web development, compiler engineering, and graphic design. I believe in 
              learning by doing rather than just theory - every line of code I write brings me closer to my goals. 
              Currently preparing to host my first project on Wikipedia Cloud and actively building my GitHub portfolio.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AboutSection;
