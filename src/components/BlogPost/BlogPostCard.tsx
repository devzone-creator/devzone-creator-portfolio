
import { BookOpen, Calendar, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BlogPost } from "@/types/BlogPost";

interface BlogPostCardProps {
  post: BlogPost;
}

export const BlogPostCard = ({ post }: BlogPostCardProps) => {
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

  return (
    <Card className={`hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-slate-800/80 backdrop-blur-sm border-slate-700 ${post.featured ? 'ring-2 ring-emerald-500' : ''}`}>
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
  );
};
