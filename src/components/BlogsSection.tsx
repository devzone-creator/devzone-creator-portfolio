
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { BlogPostCard } from "@/components/BlogPost/BlogPostCard";
import { RefreshButton } from "@/components/BlogPost/RefreshButton";

const BlogsSection = () => {
  const { data: blogPosts = [], isLoading, error, refetch } = useBlogPosts();

  if (isLoading) {
    return (
      <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 text-white">Blog Posts</h2>
          <div className="text-center text-slate-300">Testing Supabase connection and loading blog posts...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 text-white">Blog Posts</h2>
          <div className="text-center text-red-400">
            <p>Failed to load blog posts</p>
            <p className="text-sm mt-2">Error: {error.message}</p>
            <Button 
              onClick={() => refetch()} 
              className="mt-4 bg-red-600 hover:bg-red-700"
            >
              Retry Connection
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Blog Posts</h2>
          <RefreshButton onRefreshComplete={() => refetch()} />
        </div>
        <p className="text-center text-slate-300 mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
          A curated mix of my personal blog posts and trending content from the programming community.
        </p>
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {blogPosts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
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
