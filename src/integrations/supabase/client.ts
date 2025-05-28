
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Create a proxy that throws errors only when the client is actually used
const createSupabaseClient = () => {
  if (!supabaseUrl) {
    throw new Error('Missing VITE_SUPABASE_URL environment variable. Please connect to Supabase using the green Supabase button in the top right of Lovable.')
  }

  if (!supabaseAnonKey) {
    throw new Error('Missing VITE_SUPABASE_ANON_KEY environment variable. Please connect to Supabase using the green Supabase button in the top right of Lovable.')
  }

  return createClient(supabaseUrl, supabaseAnonKey)
}

// Export a proxy that creates the client only when accessed
export const supabase = new Proxy({} as ReturnType<typeof createClient>, {
  get(target, prop) {
    const client = createSupabaseClient()
    return client[prop as keyof typeof client]
  }
})
