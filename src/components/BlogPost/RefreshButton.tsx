
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
      console.log('Calling Supabase edge function...');
      
      const { data, error } = await supabase.functions.invoke('scrape-reddit-posts', {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({})
      });
      
      console.log('Edge function response:', { data, error });
      
      if (error) {
        console.error('Error refreshing Reddit posts:', error);
        
        // Provide more specific error messages
        let errorMessage = 'Failed to refresh Reddit posts';
        if (error.message?.includes('Failed to send')) {
          errorMessage = 'Edge function is not responding. Please try again in a moment.';
        } else if (error.message?.includes('timeout')) {
          errorMessage = 'Request timed out. Please try again.';
        } else if (error.message) {
          errorMessage = `Error: ${error.message}`;
        }
        
        toast({
          title: "Refresh Failed",
          description: errorMessage,
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
        title: "Network Error",
        description: "Failed to connect to the refresh service. Please check your internet connection and try again.",
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
      {isRefreshing ? 'Refreshing...' : 'Refresh Reddit Posts'}
    </Button>
  );
};
