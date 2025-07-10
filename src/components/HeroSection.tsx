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
    // Redirect directly to vendor dashboard (main portal) instead of vendor registration
    navigate('/portal?tab=deals');
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
        {/* Two-column layout: text left, phone mockup right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
          {/* Left column: Content */}
          <div className="text-center lg:text-left text-white order-2 lg:order-1">
            {/* Main headline with enhanced glassmorphism background */}
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 shadow-2xl"></div>
              <h1 className="relative text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold py-6 lg:py-8 px-4 lg:px-6 leading-tight">
                Airtime & Data
                <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  AI-Powered Deals
                </span>
              </h1>
            </div>
            
            {/* Subheadline with glassmorphism */}
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"></div>
              <p className="relative text-lg sm:text-xl lg:text-2xl py-4 lg:py-6 px-4 lg:px-6 text-blue-100">
                Best airtime and data deals with our AI-driven platform. 
                Earn OneCard rewards on every purchase and save more with recommendations.
              </p>
            </div>
            
            {/* Enhanced key benefits with glassmorphism */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 lg:gap-6 mb-8 lg:mb-12">
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 backdrop-blur-md rounded-full border border-yellow-300/30 shadow-lg group-hover:shadow-xl transition-all duration-300"></div>
                <div className="relative flex items-center space-x-2 px-4 lg:px-6 py-2 lg:py-3">
                  <Zap className="w-4 h-4 lg:w-5 lg:h-5 text-yellow-400" />
                  <span className="text-xs lg:text-sm font-medium">Instant Rewards</span>
                </div>
              </div>
              
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 backdrop-blur-md rounded-full border border-green-300/30 shadow-lg group-hover:shadow-xl transition-all duration-300"></div>
                <div className="relative flex items-center space-x-2 px-4 lg:px-6 py-2 lg:py-3">
                  <Shield className="w-4 h-4 lg:w-5 lg:h-5 text-green-400" />
                  <span className="text-xs lg:text-sm font-medium">Secure Transactions</span>
                </div>
              </div>
              
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 backdrop-blur-md rounded-full border border-purple-300/30 shadow-lg group-hover:shadow-xl transition-all duration-300"></div>
                <div className="relative flex items-center space-x-2 px-4 lg:px-6 py-2 lg:py-3">
                  <Star className="w-4 h-4 lg:w-5 lg:h-5 text-purple-400" />
                  <span className="text-xs lg:text-sm font-medium">Best Deals</span>
                </div>
              </div>
            </div>
            
            {/* Enhanced CTA Buttons with glassmorphism */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-8 lg:mb-12">
              <div className="group relative w-full sm:w-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 backdrop-blur-sm rounded-xl border border-yellow-300/30 shadow-2xl group-hover:shadow-3xl transition-all duration-300"></div>
                <Button
                  onClick={handleStartEarning}
                  size="lg"
                  className="relative bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-lg rounded-xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto border-0"
                >
                  Start Earning Rewards
                  <ArrowRight className="ml-2 w-4 h-4 lg:w-5 lg:h-5" />
                </Button>
              </div>
              
              <div className="group relative w-full sm:w-auto">
                <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 shadow-2xl group-hover:shadow-3xl transition-all duration-300"></div>
                <Button
                  onClick={handleBecomeVendor}
                  size="lg"
                  variant="outline"
                  className="relative bg-transparent hover:bg-white/10 text-white font-bold border-white/50 hover:border-white/70 px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-lg rounded-xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
                >
                  Check Out Our Smart Deals
                </Button>
              </div>
            </div>
            
            {/* Enhanced stats preview with glassmorphism */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
              <div className="group relative">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg group-hover:shadow-xl transition-all duration-300"></div>
                <div className="relative text-center p-4 lg:p-6">
                  <div className="text-2xl lg:text-3xl font-bold text-yellow-400 mb-1">50K+</div>
                  <div className="text-xs lg:text-sm text-blue-100">Happy Customers</div>
                </div>
              </div>
              
              <div className="group relative">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg group-hover:shadow-xl transition-all duration-300"></div>
                <div className="relative text-center p-4 lg:p-6">
                  <div className="text-2xl lg:text-3xl font-bold text-green-400 mb-1">R2.5M+</div>
                  <div className="text-xs lg:text-sm text-blue-100">Rewards Earned</div>
                </div>
              </div>
              
              <div className="group relative">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg group-hover:shadow-xl transition-all duration-300"></div>
                <div className="relative text-center p-4 lg:p-6">
                  <div className="text-2xl lg:text-3xl font-bold text-purple-400 mb-1">99.9%</div>
                  <div className="text-xs lg:text-sm text-blue-100">Uptime</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column: Phone mockup */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative group">
              {/* Glassmorphism background for phone */}
              <div className="absolute inset-0 bg-white/5 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl transform rotate-3 group-hover:rotate-6 transition-all duration-500"></div>
              
              {/* Phone mockup image */}
              <img
                src="/lovable-uploads/813385b3-918b-4473-806c-5aaf935282f5.png"
                alt="Divine Mobile app on smartphone"
                className="relative z-10 max-w-[280px] sm:max-w-[320px] lg:max-w-[360px] xl:max-w-[400px] w-full h-auto transform hover:scale-105 transition-all duration-500 drop-shadow-2xl"
              />
              
              {/* Subtle glow effect around phone */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-400/20 blur-xl rounded-3xl opacity-70 transform scale-110"></div>
            </div>
          </div>
        </div>

        {/* Smart Services Quick Access */}
        <div className="mt-12 max-w-4xl mx-auto text-white">
          <div className="text-center mb-6">
            <p className="text-white/80 text-sm mb-3">Smart Mobile Services</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* RICA Service */}
            <Link to="/rica-registration" className="group relative">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:bg-white/15"></div>
              <div className="relative text-center p-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Shield className="w-6 h-6 text-green-400" />
                </div>
                <div className="text-sm font-medium text-white">RICA</div>
                <div className="text-xs text-white/60">Registration</div>
              </div>
            </Link>

            {/* Port Service */}
            <Link to="/porting-system" className="group relative">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:bg-white/15"></div>
              <div className="relative text-center p-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <ArrowRight className="w-6 h-6 text-blue-400" />
                </div>
                <div className="text-sm font-medium text-white">Port</div>
                <div className="text-xs text-white/60">Numbers</div>
              </div>
            </Link>

            {/* Registration Hub */}
            <Link to="/registration-hub" className="group relative">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:bg-white/15"></div>
              <div className="relative text-center p-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Star className="w-6 h-6 text-purple-400" />
                </div>
                <div className="text-sm font-medium text-white">Register</div>
                <div className="text-xs text-white/60">Accounts</div>
              </div>
            </Link>

            {/* AI Deals */}
            <Link to="/ai-powered-deals" className="group relative">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:bg-white/15"></div>
              <div className="relative text-center p-4">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Zap className="w-6 h-6 text-yellow-400" />
                </div>
                <div className="text-sm font-medium text-white">AI Deals</div>
                <div className="text-xs text-white/60">Smart Offers</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
