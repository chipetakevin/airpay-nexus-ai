
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-500 text-white">
      <div className="container mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">
          Ready to Start Saving on Airtime?
        </h2>
        <p className="text-lg sm:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
          Join thousands of satisfied customers earning cashback rewards on every purchase
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <Link to="/portal" className="flex-1">
            <Button size="lg" className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold">
              Register Now
            </Button>
          </Link>
          <Link to="/portal" className="flex-1">
            <Button size="lg" className="w-full bg-white text-blue-600 hover:bg-gray-100 hover:text-blue-700 font-semibold border-none">
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
