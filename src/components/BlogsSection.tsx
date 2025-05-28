
import { BookOpen, Calendar, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const BlogsSection = () => {
  const blogPosts = [
    {
      title: "Getting Started with Compiler Design",
      excerpt: "My journey into understanding how programming languages work under the hood, from lexical analysis to code generation.",
      date: "2024-12-15",
      category: "Compiler Engineering",
      readTime: "5 min read",
      featured: true
    },
    {
      title: "Building Responsive UIs with Tailwind CSS",
      excerpt: "Tips and tricks I've learned while working on frontend projects at COLDSIS Ghana Limited.",
      date: "2024-12-10",
      category: "Frontend Development",
      readTime: "3 min read",
      featured: false
    },
    {
      title: "From Theory to Practice: Why I Prefer Hands-On Learning",
      excerpt: "Reflecting on my computer science journey and why I believe practical experience trumps theoretical knowledge.",
      date: "2024-12-05",
      category: "Personal",
      readTime: "4 min read",
      featured: false
    }
  ];

  return (
    <section className="py-16 bg-white/50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">Blog Posts</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Sharing my thoughts, experiences, and learnings in web development, compiler engineering, and the tech world.
        </p>
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <Card key={index} className={`hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm border-0 ${post.featured ? 'ring-2 ring-blue-500' : ''}`}>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                    {post.category}
                  </Badge>
                  {post.featured && (
                    <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                      Featured
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-xl leading-tight">{post.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 leading-relaxed">{post.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    {post.readTime}
                  </div>
                </div>
                <Button variant="outline" className="w-full" size="sm">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Read More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
            <BookOpen className="w-5 h-5 mr-2" />
            View All Posts
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogsSection;
