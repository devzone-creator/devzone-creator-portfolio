
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    )

    // Fetch posts from programming-related subreddits
    const subreddits = ['programming', 'webdev', 'reactjs', 'javascript']
    const allPosts = []

    for (const subreddit of subreddits) {
      try {
        const response = await fetch(`https://www.reddit.com/r/${subreddit}/hot.json?limit=5`)
        const data = await response.json()
        
        if (data.data && data.data.children) {
          const posts = data.data.children.map((post: any) => ({
            title: post.data.title,
            excerpt: post.data.selftext ? post.data.selftext.substring(0, 200) + '...' : 'External link post',
            url: `https://reddit.com${post.data.permalink}`,
            subreddit: post.data.subreddit,
            score: post.data.score,
            created_utc: post.data.created_utc,
            author: post.data.author,
            category: 'Reddit',
            source: 'reddit'
          }))
          allPosts.push(...posts)
        }
      } catch (error) {
        console.error(`Error fetching from r/${subreddit}:`, error)
      }
    }

    // Sort by score and take top 10
    const topPosts = allPosts
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)

    // Store in database
    if (topPosts.length > 0) {
      // First, clear old Reddit posts
      await supabaseClient
        .from('blog_posts')
        .delete()
        .eq('source', 'reddit')

      // Insert new posts
      const { error } = await supabaseClient
        .from('blog_posts')
        .insert(topPosts)

      if (error) {
        console.error('Error inserting posts:', error)
      }
    }

    return new Response(
      JSON.stringify({ success: true, posts: topPosts }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})
