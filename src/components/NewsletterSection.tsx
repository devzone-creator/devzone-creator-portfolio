
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, CheckCircle, Newspaper } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { AuthModal } from './AuthModal';

export const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setAuthModalOpen(true);
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .insert({
          user_id: user.id,
          email: email || user.email || '',
        });

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          toast({
            title: "Already subscribed!",
            description: "You're already subscribed to our newsletter.",
            variant: "destructive",
          });
        } else {
          throw error;
        }
      } else {
        setSubscribed(true);
        toast({
          title: "Successfully subscribed!",
          description: "You'll receive our weekly newsletter every Monday.",
        });
        setEmail('');
      }
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (subscribed) {
    return (
      <section className="py-16 px-3 sm:px-4 lg:px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <Card className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border-emerald-500/20">
            <CardContent className="pt-6">
              <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">You're all set!</h3>
              <p className="text-slate-300">
                Thanks for subscribing! You'll receive our weekly tech newsletter every Monday.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-16 px-3 sm:px-4 lg:px-6 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="flex items-center justify-center mb-6">
            <Newspaper className="w-12 h-12 text-emerald-400 mr-3" />
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Tech Weekly</h2>
          </div>
          
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl">
                Stay Updated with Weekly Tech Insights
              </CardTitle>
              <CardDescription className="text-slate-300 text-base sm:text-lg">
                Get curated tech articles, development tips, and industry insights delivered to your inbox every Monday.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <div className="flex-1 relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={user ? user.email || "Your email" : "Enter your email"}
                    className="pl-10 bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                    required={!user}
                    disabled={!!user}
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 whitespace-nowrap"
                >
                  {loading ? "Subscribing..." : user ? "Subscribe" : "Sign up & Subscribe"}
                </Button>
              </form>
              
              <div className="mt-4 text-sm text-slate-400 space-y-1">
                <p>✓ Weekly tech insights and tutorials</p>
                <p>✓ Latest development trends and tools</p>
                <p>✓ No spam, unsubscribe anytime</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)}
        defaultMode="signup"
      />
    </>
  );
};
