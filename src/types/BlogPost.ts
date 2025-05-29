
export interface BlogPost {
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
