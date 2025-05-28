
import { Card, CardContent } from "@/components/ui/card";

const PhilosophySection = () => {
  return (
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
  );
};

export default PhilosophySection;
