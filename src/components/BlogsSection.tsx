
import { BookOpen, Calendar, ExternalLink, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const BlogsSection = () => {
  const { toast } = useToast();
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch blog posts from Supabase
  const { data: blogPosts = [], isLoading, refetch } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching blog posts:', error);
        return [];
      }
      
      return data || [];
    },
  });

  const refreshRedditPosts = async () => {
    setIsRefreshing(true);
    try {
      const { data, error } = await supabase.functions.invoke('scrape-reddit-posts');
      
      if (error) {
        console.error('Error refreshing Reddit posts:', error);
        toast({
          title: "Error",
          description: "Failed to refresh Reddit posts. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Reddit posts refreshed successfully!",
        });
        refetch(); // Refresh the blog posts query
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to refresh Reddit posts. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const formatDate = (dateString: string, createdUtc?: number) => {
    if (createdUtc) {
      // Reddit timestamp
      return new Date(createdUtc * 1000).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
    }
    
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">Blog Posts</h2>
          <div className="text-center">Loading blog posts...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white/50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-center gap-4 mb-4">
          <h2 className="text-3xl font-bold text-gray-800">Blog Posts</h2>
          <Button
            onClick={refreshRedditPosts}
            disabled={isRefreshing}
            variant="outline"
            size="sm"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh Reddit Posts
          </Button>
        </div>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          A curated mix of my personal blog posts and trending content from the programming community.
        </p>
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className={`hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm border-0 ${post.featured ? 'ring-2 ring-blue-500' : ''}`}>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className={post.source === 'reddit' ? 'bg-orange-50 text-orange-700' : 'bg-blue-50 text-blue-700'}>
                    {post.source === 'reddit' ? `r/${post.subreddit}` : post.category}
                  </Badge>
                  <div className="flex gap-2">
                    {post.featured && (
                      <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                        Featured
                      </Badge>
                    )}
                    {post.source === 'reddit' && (
                      <Badge variant="outline" className="text-xs">
                        {post.score} upvotes
                      </Badge>
                    )}
                  </div>
                </div>
                <CardTitle className="text-xl leading-tight">{post.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 leading-relaxed">{post.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {formatDate(post.created_at, post.created_utc)}
                  </div>
                  {post.read_time && (
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      {post.read_time}
                    </div>
                  )}
                </div>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  size="sm"
                  onClick={() => {
                    if (post.url) {
                      window.open(post.url, '_blank');
                    }
                  }}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {post.source === 'reddit' ? 'View on Reddit' : 'Read More'}
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
