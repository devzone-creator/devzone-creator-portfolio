import { BookOpen, Calendar, ExternalLink, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  created_at: string;
  created_utc?: number;
  source: string;
  category?: string;
  subreddit?: string;
  featured?: boolean;
  score?: number;
  read_time?: string;
  url?: string;
}

const BlogsSection = () => {
  const { toast } = useToast();
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch blog posts from Supabase
  const { data: blogPosts = [], isLoading, refetch } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: async (): Promise<BlogPost[]> => {
      console.log('Fetching blog posts from Supabase...');
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching blog posts:', error);
        return [];
      }
      
      console.log('Fetched blog posts:', data?.length || 0);
      
      // Convert unknown data to BlogPost[] with proper type handling
      return (data || []).map(post => ({
        id: post.id || '',
        title: post.title || '',
        excerpt: post.excerpt || '',
        created_at: post.created_at || '',
        created_utc: post.created_utc,
        source: post.source || '',
        category: post.category,
        subreddit: post.subreddit,
        featured: post.featured,
        score: post.score,
        read_time: post.read_time,
        url: post.url
      })) as BlogPost[];
    },
  });

  const refreshRedditPosts = async () => {
    console.log('Starting Reddit posts refresh...');
    setIsRefreshing(true);
    try {
      const { data, error } = await supabase.functions.invoke('scrape-reddit-posts');
      
      console.log('Edge function response:', { data, error });
      
      if (error) {
        console.error('Error refreshing Reddit posts:', error);
        toast({
          title: "Error",
          description: `Failed to refresh Reddit posts: ${error.message || 'Unknown error'}`,
          variant: "destructive",
        });
      } else {
        console.log('Reddit posts refreshed successfully:', data);
        toast({
          title: "Success",
          description: data?.message || "Reddit posts refreshed successfully!",
        });
        // Refresh the blog posts query after a short delay
        setTimeout(() => {
          refetch();
        }, 1000);
      }
    } catch (error) {
      console.error('Unexpected error during refresh:', error);
      toast({
        title: "Error",
        description: `Failed to refresh Reddit posts: ${error instanceof Error ? error.message : 'Unknown error'}`,
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
      <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 text-white">Blog Posts</h2>
          <div className="text-center text-slate-300">Loading blog posts...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Blog Posts</h2>
          <Button
            onClick={refreshRedditPosts}
            disabled={isRefreshing}
            variant="outline"
            size="sm"
            className="w-full sm:w-auto border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-slate-900"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh Reddit Posts
          </Button>
        </div>
        <p className="text-center text-slate-300 mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
          A curated mix of my personal blog posts and trending content from the programming community.
        </p>
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className={`hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-slate-800/80 backdrop-blur-sm border-slate-700 ${post.featured ? 'ring-2 ring-emerald-500' : ''}`}>
              <CardHeader className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className={post.source === 'reddit' ? 'bg-orange-50 text-orange-700' : 'bg-emerald-50 text-emerald-700'}>
                    {post.source === 'reddit' ? `r/${post.subreddit || 'unknown'}` : post.category || 'Blog'}
                  </Badge>
                  <div className="flex gap-2">
                    {post.featured && (
                      <Badge className="bg-gradient-to-r from-emerald-600 to-cyan-600 text-white text-xs">
                        Featured
                      </Badge>
                    )}
                    {post.source === 'reddit' && post.score && (
                      <Badge variant="outline" className="text-xs border-slate-600 text-slate-300">
                        {post.score} upvotes
                      </Badge>
                    )}
                  </div>
                </div>
                <CardTitle className="text-lg sm:text-xl leading-tight text-white">{post.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-4 sm:p-6 pt-0">
                <p className="text-slate-300 leading-relaxed text-sm sm:text-base">{post.excerpt}</p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-slate-400">
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
                  className="w-full border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-slate-900" 
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
        
        <div className="text-center mt-8 sm:mt-12">
          <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 w-full sm:w-auto">
            <BookOpen className="w-5 h-5 mr-2" />
            View All Posts
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogsSection;
