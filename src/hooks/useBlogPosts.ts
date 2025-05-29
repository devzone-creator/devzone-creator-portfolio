
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { BlogPost } from "@/types/BlogPost";

export const useBlogPosts = () => {
  const { toast } = useToast();

  return useQuery({
    queryKey: ['blog-posts'],
    queryFn: async (): Promise<BlogPost[]> => {
      console.log('Starting Supabase connection test...');
      
      try {
        // Test basic Supabase connection first
        const { data: healthCheck, error: healthError } = await supabase
          .from('blog_posts')
          .select('count', { count: 'exact', head: true });
        
        console.log('Supabase health check:', { healthCheck, healthError });
        
        if (healthError) {
          console.error('Supabase connection failed:', healthError);
          toast({
            title: "Database Connection Error",
            description: `Failed to connect to database: ${healthError.message}`,
            variant: "destructive",
          });
          return [];
        }
        
        console.log('Supabase connection successful, fetching blog posts...');
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error('Error fetching blog posts:', error);
          toast({
            title: "Database Error",
            description: `Failed to fetch blog posts: ${error.message}`,
            variant: "destructive",
          });
          return [];
        }
        
        console.log('Successfully fetched blog posts:', data?.length || 0);
        
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
      } catch (error) {
        console.error('Unexpected error in blog posts fetch:', error);
        toast({
          title: "Connection Error",
          description: `Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`,
          variant: "destructive",
        });
        return [];
      }
    },
  });
};
