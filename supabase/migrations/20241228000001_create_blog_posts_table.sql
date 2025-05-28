
-- Create blog_posts table
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    excerpt TEXT,
    content TEXT,
    url TEXT,
    category TEXT NOT NULL,
    source TEXT NOT NULL DEFAULT 'personal',
    subreddit TEXT,
    score INTEGER DEFAULT 0,
    author TEXT,
    read_time TEXT,
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    created_utc BIGINT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create RLS policies
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Enable read access for all users" ON public.blog_posts
    FOR SELECT USING (true);

-- Allow insert/update for authenticated users (for admin purposes)
CREATE POLICY "Enable insert for authenticated users only" ON public.blog_posts
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users only" ON public.blog_posts
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER handle_updated_at
    BEFORE UPDATE ON public.blog_posts
    FOR EACH ROW
    EXECUTE PROCEDURE public.handle_updated_at();

-- Insert some sample personal blog posts
INSERT INTO public.blog_posts (title, excerpt, content, category, source, read_time, featured) VALUES
('Getting Started with Compiler Design', 'My journey into understanding how programming languages work under the hood, from lexical analysis to code generation.', 'Full content here...', 'Compiler Engineering', 'personal', '5 min read', true),
('Building Responsive UIs with Tailwind CSS', 'Tips and tricks I''ve learned while working on frontend projects at COLDSIS Ghana Limited.', 'Full content here...', 'Frontend Development', 'personal', '3 min read', false),
('From Theory to Practice: Why I Prefer Hands-On Learning', 'Reflecting on my computer science journey and why I believe practical experience trumps theoretical knowledge.', 'Full content here...', 'Personal', 'personal', '4 min read', false);
