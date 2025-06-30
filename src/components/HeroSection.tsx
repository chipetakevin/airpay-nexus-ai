
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
      // Redirect to deals (onecard tab)
      navigate('/portal?tab=onecard');
    } else {
      // Redirect to customer registration
      navigate('/portal?tab=registration');
    }
  };

  const handleBecomeVendor = () => {
    // Always redirect to vendor tab - let the vendor registration component handle the logic
    navigate('/portal?tab=vendor');
  };

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Enhanced background with glassmorphism */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-teal-500">
        <div className="absolute inset-0 bg-black/10"></div>
        
        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 backdrop-blur-[2px] bg-white/5"></div>
      </div>
      
      {/* Enhanced floating elements with glassmorphism */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/20 backdrop-blur-md rounded-full animate-pulse border border-white/30 shadow-lg"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-yellow-400/30 backdrop-blur-md rounded-full animate-bounce delay-300 border border-yellow-300/50 shadow-lg"></div>
      <div className="absolute bottom-32 left-20 w-12 h-12 bg-purple-400/30 backdrop-blur-md rounded-full animate-pulse delay-700 border border-purple-300/50 shadow-lg"></div>
      
      {/* Shimmer effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          {/* Main headline with enhanced glassmorphism background */}
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 shadow-2xl"></div>
            <h1 className="relative text-4xl sm:text-5xl lg:text-6xl font-bold py-8 px-6 leading-tight">
              Airtime & Data
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                AI-Powered Deals
              </span>
            </h1>
          </div>
          
          {/* Subheadline with glassmorphism */}
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"></div>
            <p className="relative text-xl sm:text-2xl py-6 px-6 text-blue-100 max-w-3xl mx-auto">
              Best airtime and data deals with our AI-driven platform. 
              Earn OneCard rewards on every purchase and save more with recommendations.
            </p>
          </div>
          
          {/* Enhanced key benefits with glassmorphism */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 backdrop-blur-md rounded-full border border-yellow-300/30 shadow-lg group-hover:shadow-xl transition-all duration-300"></div>
              <div className="relative flex items-center space-x-2 px-6 py-3">
                <Zap className="w-5 h-5 text-yellow-400" />
                <span className="text-sm font-medium">Instant Rewards</span>
              </div>
            </div>
            
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 backdrop-blur-md rounded-full border border-green-300/30 shadow-lg group-hover:shadow-xl transition-all duration-300"></div>
              <div className="relative flex items-center space-x-2 px-6 py-3">
                <Shield className="w-5 h-5 text-green-400" />
                <span className="text-sm font-medium">Secure Transactions</span>
              </div>
            </div>
            
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 backdrop-blur-md rounded-full border border-purple-300/30 shadow-lg group-hover:shadow-xl transition-all duration-300"></div>
              <div className="relative flex items-center space-x-2 px-6 py-3">
                <Star className="w-5 h-5 text-purple-400" />
                <span className="text-sm font-medium">Best Deals</span>
              </div>
            </div>
          </div>
          
          {/* Enhanced CTA Buttons with glassmorphism */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <div className="group relative w-full sm:w-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 backdrop-blur-sm rounded-xl border border-yellow-300/30 shadow-2xl group-hover:shadow-3xl transition-all duration-300"></div>
              <Button
                onClick={handleStartEarning}
                size="lg"
                className="relative bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 text-lg rounded-xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto border-0"
              >
                Start Earning Rewards
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
            
            <div className="group relative w-full sm:w-auto">
              <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 shadow-2xl group-hover:shadow-3xl transition-all duration-300"></div>
              <Button
                onClick={handleBecomeVendor}
                size="lg"
                variant="outline"
                className="relative bg-transparent hover:bg-white/10 text-white font-bold border-white/50 hover:border-white/70 px-8 py-4 text-lg rounded-xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
              >
                Become a Vendor
              </Button>
            </div>
          </div>
          
          {/* Enhanced stats preview with glassmorphism */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="group relative">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg group-hover:shadow-xl transition-all duration-300"></div>
              <div className="relative text-center p-6">
                <div className="text-3xl font-bold text-yellow-400 mb-1">50K+</div>
                <div className="text-sm text-blue-100">Happy Customers</div>
              </div>
            </div>
            
            <div className="group relative">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg group-hover:shadow-xl transition-all duration-300"></div>
              <div className="relative text-center p-6">
                <div className="text-3xl font-bold text-green-400 mb-1">R2.5M+</div>
                <div className="text-sm text-blue-100">Rewards Earned</div>
              </div>
            </div>
            
            <div className="group relative">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg group-hover:shadow-xl transition-all duration-300"></div>
              <div className="relative text-center p-6">
                <div className="text-3xl font-bold text-purple-400 mb-1">99.9%</div>
                <div className="text-sm text-blue-100">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
