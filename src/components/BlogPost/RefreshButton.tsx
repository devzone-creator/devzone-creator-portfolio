
import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface RefreshButtonProps {
  onRefreshComplete: () => void;
}

export const RefreshButton = ({ onRefreshComplete }: RefreshButtonProps) => {
  const { toast } = useToast();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshRedditPosts = async () => {
    console.log('Starting Reddit posts refresh...');
    setIsRefreshing(true);
    try {
      console.log('Testing Supabase functions connection...');
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
          onRefreshComplete();
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

  return (
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
  );
};
