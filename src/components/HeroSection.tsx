
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Shield, Star } from 'lucide-react';
import { useLogoutNotification } from '@/hooks/useLogoutNotification';

const HeroSection = () => {
  const navigate = useNavigate();
  useLogoutNotification();

  const handleStartEarning = () => {
    // Check if user is already registered
    const isAuthenticated = localStorage.getItem('userAuthenticated') === 'true';
    
    if (isAuthenticated) {
      // Redirect to smart deals (onecard tab)
      navigate('/portal?tab=onecard');
    } else {
      // Redirect to customer registration
      navigate('/portal?tab=registration');
    }
  };

  const handleBecomeVendor = () => {
    // Check if user is already registered
    const isAuthenticated = localStorage.getItem('userAuthenticated') === 'true';
    const userType = localStorage.getItem('userCredentials') ? 
      JSON.parse(localStorage.getItem('userCredentials') || '{}').userType : null;
    
    if (isAuthenticated && (userType === 'vendor' || userType === 'admin')) {
      // Redirect to smart deals (onecard tab)
      navigate('/portal?tab=onecard');
    } else {
      // Redirect to vendor registration
      navigate('/portal?tab=vendor');
    }
  };

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background with animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-teal-500">
        <div className="absolute inset-0 bg-black/10"></div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-yellow-400/20 rounded-full animate-bounce delay-300"></div>
      <div className="absolute bottom-32 left-20 w-12 h-12 bg-purple-400/20 rounded-full animate-pulse delay-700"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          {/* Main headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Smart Airtime & Data
            <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              AI-Powered Deals
            </span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl sm:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Discover the best airtime and data deals with our AI-driven platform. 
            Earn OneCard rewards on every purchase and save more with smart recommendations.
          </p>
          
          {/* Key benefits */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span className="text-sm font-medium">Instant Rewards</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Shield className="w-5 h-5 text-green-400" />
              <span className="text-sm font-medium">Secure Transactions</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Star className="w-5 h-5 text-purple-400" />
              <span className="text-sm font-medium">Best Deals</span>
            </div>
          </div>
          
          {/* CTA Buttons - Both using yellow color */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              onClick={handleStartEarning}
              size="lg"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 text-lg rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
            >
              Start Earning Rewards
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <Button
              onClick={handleBecomeVendor}
              size="lg"
              variant="outline"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold border-yellow-400 hover:border-yellow-500 px-8 py-4 text-lg rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
            >
              Become a Vendor
            </Button>
          </div>
          
          {/* Stats preview */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-1">50K+</div>
              <div className="text-sm text-blue-100">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-1">R2.5M+</div>
              <div className="text-sm text-blue-100">Rewards Earned</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-1">99.9%</div>
              <div className="text-sm text-blue-100">Uptime</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
