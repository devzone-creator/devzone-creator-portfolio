
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

    // Fetch posts from programming-related subreddits using RSS feeds
    const subreddits = ['programming', 'webdev', 'reactjs', 'javascript']
    const allPosts = []

    for (const subreddit of subreddits) {
      try {
        console.log(`Fetching RSS from r/${subreddit}...`)
        
        const response = await fetch(`https://www.reddit.com/r/${subreddit}/hot.rss?limit=5`, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; portfolio-bot/1.0)'
          }
        })
        
        if (!response.ok) {
          console.error(`Failed to fetch r/${subreddit} RSS: ${response.status} ${response.statusText}`)
          continue
        }
        
        const rssText = await response.text()
        console.log(`Fetched RSS from r/${subreddit}, length: ${rssText.length}`)
        
        // Parse RSS XML using regex patterns (compatible with Deno)
        const itemMatches = rssText.match(/<item>[\s\S]*?<\/item>/g) || []
        console.log(`Found ${itemMatches.length} items in RSS feed for r/${subreddit}`)
        
        for (const itemXml of itemMatches) {
          try {
            // Extract title
            const titleMatch = itemXml.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)
            const title = titleMatch ? titleMatch[1].trim() : 'Untitled'
            
            // Extract link
            const linkMatch = itemXml.match(/<link>(.*?)<\/link>/)
            const link = linkMatch ? linkMatch[1].trim() : ''
            
            // Extract description
            const descMatch = itemXml.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/)
            const description = descMatch ? descMatch[1] : ''
            
            // Extract publication date
            const pubDateMatch = itemXml.match(/<pubDate>(.*?)<\/pubDate>/)
            const pubDate = pubDateMatch ? pubDateMatch[1].trim() : ''
            
            // Extract score from description if available (Reddit RSS includes this)
            const scoreMatch = description.match(/(\d+) points?/)
            const score = scoreMatch ? parseInt(scoreMatch[1]) : 0
            
            // Extract author from description
            const authorMatch = description.match(/submitted by.*?\/u\/([^\s<&]+)/)
            const author = authorMatch ? authorMatch[1] : 'unknown'
            
            // Clean up description text
            let excerpt = description.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ').trim()
            if (excerpt.length > 200) {
              excerpt = excerpt.substring(0, 200) + '...'
            }
            if (!excerpt || excerpt.length < 10) {
              excerpt = 'External link post - click to view on Reddit'
            }
            
            // Convert pubDate to Unix timestamp
            const pubDateTime = new Date(pubDate)
            const created_utc = Math.floor(pubDateTime.getTime() / 1000)
            
            const post = {
              title: title,
              excerpt: excerpt,
              url: link,
              subreddit: subreddit,
              score: score,
              created_utc: created_utc,
              author: author,
              category: 'Reddit',
              source: 'reddit'
            }
            
            allPosts.push(post)
          } catch (itemError) {
            console.error(`Error parsing item from r/${subreddit}:`, itemError)
          }
        }
        
        console.log(`Added ${itemMatches.length} posts from r/${subreddit}`)
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
