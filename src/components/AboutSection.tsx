
import { Card, CardContent } from "@/components/ui/card";

const AboutSection = () => {
  return (
    <section className="py-16 container mx-auto px-6 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">About Me</h2>
        <Card className="bg-slate-800/80 backdrop-blur-sm border-slate-700 shadow-lg">
          <CardContent className="p-8">
            <p className="text-lg text-slate-300 leading-relaxed text-center">
              I'm Munkaila Sule, a Level 300 Computer Science student from Ghana with a genuine passion for coding and building innovative solutions. 
              Currently interning as a Tax Officer at Ghana Revenue Authority while pursuing my studies. My journey combines full-stack web development, compiler engineering, and practical government systems experience. I believe in 
              learning by doing rather than just theory - every line of code I write brings me closer to my goals. 
              My live projects showcase real-world applications and I'm actively expanding my portfolio with meaningful solutions.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AboutSection;
