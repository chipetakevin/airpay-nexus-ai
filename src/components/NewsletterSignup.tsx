
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Mail, Check } from 'lucide-react';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubscribed(true);
      toast({
        title: "Successfully Subscribed!",
        description: "Thank you for joining our newsletter. You'll receive the latest deals and updates.",
      });
      setEmail('');
    }, 1000);
  };

  if (isSubscribed) {
    return (
      <div className="bg-gradient-to-r from-green-600 to-green-700 p-8 rounded-2xl text-center">
        <Check className="w-16 h-16 text-white mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">You're All Set!</h3>
        <p className="text-green-100">Thanks for subscribing to our newsletter.</p>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-500">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <Mail className="w-16 h-16 text-white mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Stay Updated with AirPay
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            Get exclusive deals, product updates, and cashback tips delivered to your inbox
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white text-gray-900 border-none"
              required
            />
            <Button 
              type="submit" 
              disabled={isLoading}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8"
            >
              {isLoading ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </form>
          
          <p className="text-sm text-blue-100 mt-4">
            No spam, unsubscribe at any time. Your privacy is protected.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
