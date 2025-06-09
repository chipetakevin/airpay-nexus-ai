
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
    // Check if user is already registered
    const isAuthenticated = localStorage.getItem('userAuthenticated') === 'true';
    const userType = localStorage.getItem('userCredentials') ? 
      JSON.parse(localStorage.getItem('userCredentials') || '{}').userType : null;
    
    if (isAuthenticated && (userType === 'vendor' || userType === 'admin')) {
      // Redirect to deals (onecard tab)
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
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in">
            Airtime & Data
            <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              AI-Powered Deals
            </span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl sm:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto animate-fade-in delay-200">
            Discover the best airtime and data deals with our AI-driven platform. 
            Earn OneCard rewards on every purchase and save more with recommendations.
          </p>
          
          {/* Enhanced Key benefits with glassmorphism */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-12 animate-fade-in delay-300">
            <div className="group flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
              <div className="relative">
                <Zap className="w-5 h-5 text-yellow-400 group-hover:animate-pulse" />
                <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-sm group-hover:blur-none transition-all duration-300"></div>
              </div>
              <span className="text-sm font-medium">Instant Rewards</span>
            </div>
            <div className="group flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
              <div className="relative">
                <Shield className="w-5 h-5 text-green-400 group-hover:animate-pulse" />
                <div className="absolute inset-0 bg-green-400/20 rounded-full blur-sm group-hover:blur-none transition-all duration-300"></div>
              </div>
              <span className="text-sm font-medium">Secure Transactions</span>
            </div>
            <div className="group flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
              <div className="relative">
                <Star className="w-5 h-5 text-purple-400 group-hover:animate-pulse" />
                <div className="absolute inset-0 bg-purple-400/20 rounded-full blur-sm group-hover:blur-none transition-all duration-300"></div>
              </div>
              <span className="text-sm font-medium">Best Deals</span>
            </div>
          </div>
          
          {/* CTA Buttons with enhanced effects */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in delay-500">
            <Button
              onClick={handleStartEarning}
              size="lg"
              className="relative bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 text-lg rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-white/20 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
              <span className="relative z-10 flex items-center">
                Start Earning Rewards
                <ArrowRight className="ml-2 w-5 h-5" />
              </span>
            </Button>
            
            <Button
              onClick={handleBecomeVendor}
              size="lg"
              variant="outline"
              className="relative bg-yellow-500 hover:bg-yellow-600 text-black font-bold border-yellow-400 hover:border-yellow-500 px-8 py-4 text-lg rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-white/20 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
              <span className="relative z-10">Become a Vendor</span>
            </Button>
          </div>
          
          {/* Enhanced Stats preview with glassmorphism */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto animate-fade-in delay-700">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div className="text-3xl font-bold text-yellow-400 mb-1 group-hover:animate-pulse">50K+</div>
                <div className="text-sm text-blue-100">Happy Customers</div>
              </div>
            </div>
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-teal-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div className="text-3xl font-bold text-green-400 mb-1 group-hover:animate-pulse">R2.5M+</div>
                <div className="text-sm text-blue-100">Rewards Earned</div>
              </div>
            </div>
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div className="text-3xl font-bold text-purple-400 mb-1 group-hover:animate-pulse">99.9%</div>
                <div className="text-sm text-blue-100">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Why Choose AirPay Section */}
      <div className="relative mt-20 py-16">
        {/* Glassmorphism background */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Section Title */}
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                Why Choose <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">AirPay</span>?
              </h2>
              <p className="text-lg text-blue-100 max-w-2xl mx-auto">
                Experience the future of airtime and data purchasing with our cutting-edge AI technology
              </p>
            </div>

            {/* Enhanced Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Feature 1 - AI-Powered Recommendations */}
              <div className="group relative animate-fade-in delay-200">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 hover:bg-white/20 transition-all duration-500 transform hover:scale-105 hover:rotate-1">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center mb-4 group-hover:animate-pulse">
                      <Zap className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-ping"></div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">AI-Powered Recommendations</h3>
                  <p className="text-blue-100 text-sm leading-relaxed">
                    Our advanced AI analyzes your usage patterns to suggest the most cost-effective deals tailored specifically for you.
                  </p>
                  <div className="absolute inset-0 bg-white/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>

              {/* Feature 2 - Instant OneCard Rewards */}
              <div className="group relative animate-fade-in delay-300">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 hover:bg-white/20 transition-all duration-500 transform hover:scale-105 hover:-rotate-1">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-teal-500 rounded-2xl flex items-center justify-center mb-4 group-hover:animate-pulse">
                      <Star className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-ping delay-200"></div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Instant OneCard Rewards</h3>
                  <p className="text-blue-100 text-sm leading-relaxed">
                    Earn valuable OneCard points with every purchase that can be redeemed for future deals and exclusive offers.
                  </p>
                  <div className="absolute inset-0 bg-white/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>

              {/* Feature 3 - Secure & Fast */}
              <div className="group relative animate-fade-in delay-400">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 hover:bg-white/20 transition-all duration-500 transform hover:scale-105 hover:rotate-1">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mb-4 group-hover:animate-pulse">
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-ping delay-400"></div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Secure & Lightning Fast</h3>
                  <p className="text-blue-100 text-sm leading-relaxed">
                    Bank-grade security with instant processing ensures your transactions are safe and completed in seconds.
                  </p>
                  <div className="absolute inset-0 bg-white/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            </div>

            {/* Floating particles effect */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-400/30 rounded-full animate-ping"></div>
              <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-400/40 rounded-full animate-pulse delay-1000"></div>
              <div className="absolute bottom-1/4 left-1/2 w-3 h-3 bg-blue-400/20 rounded-full animate-bounce delay-500"></div>
              <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-green-400/30 rounded-full animate-ping delay-700"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
