
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log('Starting Reddit posts scraping...')
    
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    )

    console.log('Supabase client initialized')

    // Test Supabase connection first
    const { data: testData, error: testError } = await supabaseClient
      .from('blog_posts')
      .select('count', { count: 'exact', head: true })

    if (testError) {
      console.error('Supabase connection test failed:', testError)
      return new Response(
        JSON.stringify({ 
          error: 'Database connection failed', 
          details: testError.message 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500,
        },
      )
    }

    console.log('Supabase connection successful')

    // Fetch posts from programming-related subreddits
    const subreddits = ['programming', 'webdev', 'reactjs', 'javascript']
    const allPosts = []

    for (const subreddit of subreddits) {
      try {
        console.log(`Fetching from r/${subreddit}...`)
        
        const response = await fetch(`https://www.reddit.com/r/${subreddit}/hot.json?limit=5`, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; portfolio-bot/1.0)'
          }
        })
        
        if (!response.ok) {
          console.error(`Failed to fetch r/${subreddit}: ${response.status} ${response.statusText}`)
          continue
        }
        
        const data = await response.json()
        console.log(`Fetched data from r/${subreddit}:`, data.data?.children?.length || 0, 'posts')
        
        if (data.data && data.data.children) {
          const posts = data.data.children.map((post: any) => ({
            title: post.data.title || 'Untitled',
            excerpt: post.data.selftext 
              ? (post.data.selftext.length > 200 ? post.data.selftext.substring(0, 200) + '...' : post.data.selftext)
              : 'External link post - click to view on Reddit',
            url: `https://reddit.com${post.data.permalink}`,
            subreddit: post.data.subreddit,
            score: post.data.score || 0,
            created_utc: post.data.created_utc,
            author: post.data.author || 'unknown',
            category: 'Reddit',
            source: 'reddit'
          }))
          allPosts.push(...posts)
          console.log(`Added ${posts.length} posts from r/${subreddit}`)
        }
      } catch (error) {
        console.error(`Error fetching from r/${subreddit}:`, error)
        // Continue with other subreddits even if one fails
      }
    }

    console.log(`Total posts collected: ${allPosts.length}`)

    if (allPosts.length === 0) {
      console.log('No posts collected, returning existing data')
      return new Response(
        JSON.stringify({ 
          success: true, 
          posts: [],
          message: 'No new Reddit posts found at this time'
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        },
      )
    }

    // Sort by score and take top 10
    const topPosts = allPosts
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)

    console.log(`Top posts selected: ${topPosts.length}`)

    // Store in database
    console.log('Clearing old Reddit posts...')
    // First, clear old Reddit posts
    const { error: deleteError } = await supabaseClient
      .from('blog_posts')
      .delete()
      .eq('source', 'reddit')

    if (deleteError) {
      console.error('Error deleting old posts:', deleteError)
      return new Response(
        JSON.stringify({ 
          error: 'Failed to clear old posts', 
          details: deleteError.message 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500,
        },
      )
    }

    console.log('Old Reddit posts cleared successfully')

    console.log('Inserting new posts...')
    // Insert new posts
    const { error: insertError } = await supabaseClient
      .from('blog_posts')
      .insert(topPosts)

    if (insertError) {
      console.error('Error inserting posts:', insertError)
      return new Response(
        JSON.stringify({ 
          error: 'Failed to insert posts', 
          details: insertError.message 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500,
        },
      )
    }

    console.log('New posts inserted successfully')

    return new Response(
      JSON.stringify({ 
        success: true, 
        posts: topPosts,
        message: `Successfully refreshed ${topPosts.length} Reddit posts`
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Unexpected error in scrape-reddit-posts:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error', 
        message: error.message,
        stack: error.stack 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})
