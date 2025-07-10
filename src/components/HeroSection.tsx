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
          {/* Left column: Enhanced Content with sophisticated blending */}
          <div className="text-center lg:text-left text-white order-2 lg:order-1 relative">
            {/* Ambient background effects for content area */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/5 via-purple-500/8 to-teal-500/5 blur-2xl rounded-3xl animate-gentle-pulse"></div>
            
            {/* Main headline with enhanced glassmorphism and depth */}
            <div className="relative mb-6 group">
              {/* Multi-layered glassmorphism background */}
              <div className="absolute inset-0 bg-white/12 backdrop-blur-md rounded-3xl border border-white/25 shadow-2xl"></div>
              <div className="absolute inset-1 bg-gradient-to-br from-white/8 to-white/2 rounded-[1.4rem] border border-white/15"></div>
              
              {/* Interactive light overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 via-orange-400/8 to-pink-400/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
              
              <h1 className="relative text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold py-6 lg:py-8 px-4 lg:px-6 leading-tight">
                <span className="inline-block transform group-hover:scale-105 transition-all duration-500">
                  Airtime & Data
                </span>
                <span className="block bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-300 bg-clip-text text-transparent transform group-hover:scale-105 transition-all duration-500 delay-100">
                  AI-Powered Deals
                </span>
              </h1>
              
              {/* Subtle accent lines */}
              <div className="absolute bottom-2 left-6 w-12 h-0.5 bg-gradient-to-r from-yellow-400/60 to-orange-400/60 rounded-full"></div>
              <div className="absolute top-2 right-6 w-8 h-0.5 bg-gradient-to-r from-purple-400/40 to-blue-400/40 rounded-full"></div>
            </div>
            
            {/* Enhanced subheadline with sophisticated layering */}
            <div className="relative mb-8 group">
              <div className="absolute inset-0 bg-white/8 backdrop-blur-lg rounded-2xl border border-white/15 shadow-lg"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 via-transparent to-purple-400/5 rounded-2xl opacity-70"></div>
              
              <p className="relative text-lg sm:text-xl lg:text-2xl py-4 lg:py-6 px-4 lg:px-6 text-blue-50 leading-relaxed">
                Best airtime and data deals with our{' '}
                <span className="text-yellow-300 font-semibold">AI-driven platform</span>. 
                Earn <span className="text-green-300 font-semibold">OneCard rewards</span> on every purchase and save more with intelligent recommendations.
              </p>
              
              {/* Floating accent dots */}
              <div className="absolute -top-2 -right-2 w-2 h-2 bg-yellow-400/50 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-2 -left-2 w-1.5 h-1.5 bg-purple-400/40 rounded-full animate-pulse delay-500"></div>
            </div>
            
            {/* Enhanced key benefits with unified color harmonization */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 lg:gap-6 mb-8 lg:mb-12">
              <div className="group relative transform hover:scale-105 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/25 to-orange-400/25 backdrop-blur-lg rounded-full border border-yellow-300/40 shadow-lg group-hover:shadow-xl group-hover:shadow-yellow-400/25 transition-all duration-300"></div>
                <div className="absolute inset-0.5 bg-gradient-to-r from-yellow-400/10 to-orange-400/10 rounded-full"></div>
                <div className="relative flex items-center space-x-2 px-4 lg:px-6 py-2 lg:py-3">
                  <Zap className="w-4 h-4 lg:w-5 lg:h-5 text-yellow-300 group-hover:text-yellow-200 transition-colors duration-300" />
                  <span className="text-xs lg:text-sm font-medium group-hover:text-yellow-100 transition-colors duration-300">Instant Rewards</span>
                </div>
              </div>
              
              <div className="group relative transform hover:scale-105 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/25 to-emerald-400/25 backdrop-blur-lg rounded-full border border-green-300/40 shadow-lg group-hover:shadow-xl group-hover:shadow-green-400/25 transition-all duration-300"></div>
                <div className="absolute inset-0.5 bg-gradient-to-r from-green-400/10 to-emerald-400/10 rounded-full"></div>
                <div className="relative flex items-center space-x-2 px-4 lg:px-6 py-2 lg:py-3">
                  <Shield className="w-4 h-4 lg:w-5 lg:h-5 text-green-300 group-hover:text-green-200 transition-colors duration-300" />
                  <span className="text-xs lg:text-sm font-medium group-hover:text-green-100 transition-colors duration-300">Secure Transactions</span>
                </div>
              </div>
              
              <div className="group relative transform hover:scale-105 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/25 to-pink-400/25 backdrop-blur-lg rounded-full border border-purple-300/40 shadow-lg group-hover:shadow-xl group-hover:shadow-purple-400/25 transition-all duration-300"></div>
                <div className="absolute inset-0.5 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full"></div>
                <div className="relative flex items-center space-x-2 px-4 lg:px-6 py-2 lg:py-3">
                  <Star className="w-4 h-4 lg:w-5 lg:h-5 text-purple-300 group-hover:text-purple-200 transition-colors duration-300" />
                  <span className="text-xs lg:text-sm font-medium group-hover:text-purple-100 transition-colors duration-300">Best Deals</span>
                </div>
              </div>
            </div>
            
            {/* Enhanced CTA Buttons with sophisticated visual effects */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-8 lg:mb-12">
              <div className="group relative w-full sm:w-auto">
                {/* Multi-layered button background */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 to-orange-400/30 backdrop-blur-md rounded-xl border border-yellow-300/40 shadow-2xl group-hover:shadow-3xl group-hover:shadow-yellow-400/30 transition-all duration-300"></div>
                <div className="absolute inset-0.5 bg-gradient-to-r from-yellow-400/15 to-orange-400/15 rounded-[0.7rem]"></div>
                
                <Button
                  onClick={handleStartEarning}
                  size="lg"
                  className="relative bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-lg rounded-xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto border-0 shadow-lg hover:shadow-xl"
                >
                  Start Earning Rewards
                  <ArrowRight className="ml-2 w-4 h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>
              
              <div className="group relative w-full sm:w-auto">
                <div className="absolute inset-0 bg-white/25 backdrop-blur-md rounded-xl border border-white/40 shadow-2xl group-hover:shadow-3xl group-hover:bg-white/30 transition-all duration-300"></div>
                <div className="absolute inset-0.5 bg-white/5 rounded-[0.7rem]"></div>
                
                <Button
                  onClick={handleBecomeVendor}
                  size="lg"
                  variant="outline"
                  className="relative bg-transparent hover:bg-white/15 text-white font-bold border-white/60 hover:border-white/80 px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-lg rounded-xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
                >
                  Check Out Our Smart Deals
                </Button>
              </div>
            </div>
            
            {/* Enhanced stats with unified design language */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
              <div className="group relative transform hover:scale-105 transition-all duration-300">
                <div className="absolute inset-0 bg-white/12 backdrop-blur-lg rounded-2xl border border-white/25 shadow-lg group-hover:shadow-xl group-hover:bg-white/15 transition-all duration-300"></div>
                <div className="absolute inset-1 bg-gradient-to-br from-yellow-400/10 to-orange-400/5 rounded-xl"></div>
                <div className="relative text-center p-4 lg:p-6">
                  <div className="text-2xl lg:text-3xl font-bold text-yellow-300 mb-1 group-hover:text-yellow-200 transition-colors duration-300">50K+</div>
                  <div className="text-xs lg:text-sm text-blue-100">Happy Customers</div>
                </div>
              </div>
              
              <div className="group relative transform hover:scale-105 transition-all duration-300">
                <div className="absolute inset-0 bg-white/12 backdrop-blur-lg rounded-2xl border border-white/25 shadow-lg group-hover:shadow-xl group-hover:bg-white/15 transition-all duration-300"></div>
                <div className="absolute inset-1 bg-gradient-to-br from-green-400/10 to-emerald-400/5 rounded-xl"></div>
                <div className="relative text-center p-4 lg:p-6">
                  <div className="text-2xl lg:text-3xl font-bold text-green-300 mb-1 group-hover:text-green-200 transition-colors duration-300">R2.5M+</div>
                  <div className="text-xs lg:text-sm text-blue-100">Rewards Earned</div>
                </div>
              </div>
              
              <div className="group relative transform hover:scale-105 transition-all duration-300">
                <div className="absolute inset-0 bg-white/12 backdrop-blur-lg rounded-2xl border border-white/25 shadow-lg group-hover:shadow-xl group-hover:bg-white/15 transition-all duration-300"></div>
                <div className="absolute inset-1 bg-gradient-to-br from-purple-400/10 to-pink-400/5 rounded-xl"></div>
                <div className="relative text-center p-4 lg:p-6">
                  <div className="text-2xl lg:text-3xl font-bold text-purple-300 mb-1 group-hover:text-purple-200 transition-colors duration-300">99.9%</div>
                  <div className="text-xs lg:text-sm text-blue-100">Uptime</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column: Enhanced Phone mockup with advanced blending */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2 relative">
            {/* Multiple layered background effects for depth */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 via-blue-400/15 to-teal-400/10 blur-3xl rounded-full transform scale-150 animate-pulse"></div>
            <div className="absolute inset-0 bg-gradient-to-tl from-yellow-400/5 via-orange-400/10 to-pink-400/5 blur-2xl rounded-full transform scale-125 animate-pulse delay-1000"></div>
            
            {/* Main phone container with sophisticated effects */}
            <div className="relative group z-10">
              {/* Primary glassmorphism background */}
              <div className="absolute inset-0 bg-white/8 backdrop-blur-lg rounded-[2.5rem] border border-white/25 shadow-2xl transform rotate-2 group-hover:rotate-3 transition-all duration-700 ease-out"></div>
              
              {/* Secondary depth layer */}
              <div className="absolute inset-2 bg-gradient-to-br from-white/5 to-transparent rounded-[2rem] transform -rotate-1 group-hover:rotate-0 transition-all duration-500"></div>
              
              {/* Phone mockup with enhanced seamless edge fading */}
              <div className="relative z-20 transform group-hover:scale-105 transition-all duration-700 ease-out">
                <div className="relative">
                  {/* Multi-layer gradient masking for ultra-smooth blending */}
                  
                  {/* Primary blue background matching layer */}
                  <div className="absolute inset-0 bg-gradient-radial from-transparent 35% via-blue-600/40 65% to-blue-600/90 z-10 rounded-[2.5rem] pointer-events-none"></div>
                  
                  {/* Secondary purple gradient layer */}
                  <div className="absolute inset-0 bg-gradient-radial from-transparent 40% via-purple-600/30 70% to-purple-600/80 z-10 rounded-[2.5rem] pointer-events-none"></div>
                  
                  {/* Teal accent blending layer */}
                  <div className="absolute inset-0 bg-gradient-radial from-transparent 45% via-teal-500/20 75% to-teal-500/60 z-10 rounded-[2.5rem] pointer-events-none"></div>
                  
                  {/* Ultra-soft outer feathering */}
                  <div className="absolute inset-0 bg-gradient-radial from-transparent 55% via-blue-500/30 80% to-blue-500/70 blur-lg z-10 rounded-[2.5rem] pointer-events-none"></div>
                  
                  {/* Final edge softening layer */}
                  <div className="absolute inset-0 bg-gradient-radial from-transparent 65% to-blue-600/50 blur-xl z-10 rounded-[2.5rem] pointer-events-none"></div>
                  
                  <img
                    src="/lovable-uploads/ed233f0a-c6a9-4ad8-92f4-4e42419035d4.png"
                    alt="Divine Mobile app mockup with seamless edge fading"
                    className="max-w-[280px] sm:max-w-[320px] lg:max-w-[360px] xl:max-w-[420px] w-full h-auto relative z-0"
                    style={{
                      filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.25)) drop-shadow(0 15px 35px rgba(59, 130, 246, 0.15))',
                      maskImage: 'radial-gradient(ellipse at center, black 25%, black 40%, rgba(0,0,0,0.8) 55%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0.1) 80%, transparent 90%)',
                      WebkitMaskImage: 'radial-gradient(ellipse at center, black 25%, black 40%, rgba(0,0,0,0.8) 55%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0.1) 80%, transparent 90%)'
                    }}
                  />
                </div>
              </div>
              
              {/* Ambient glow effects */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-purple-400/20 via-blue-400/10 to-transparent blur-xl scale-110 animate-pulse"></div>
              
              {/* Interactive light rays */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-yellow-400/30 via-transparent to-transparent blur-sm group-hover:w-2 transition-all duration-500"></div>
              <div className="absolute bottom-0 right-1/4 transform w-1 h-3/4 bg-gradient-to-t from-blue-400/20 via-transparent to-transparent blur-sm group-hover:h-full transition-all duration-700"></div>
              
              {/* Floating accent elements */}
              <div className="absolute -top-4 -right-4 w-6 h-6 bg-yellow-400/40 rounded-full blur-sm animate-bounce delay-300"></div>
              <div className="absolute -bottom-6 -left-6 w-4 h-4 bg-purple-400/30 rounded-full blur-sm animate-pulse delay-700"></div>
              <div className="absolute top-1/3 -left-8 w-3 h-3 bg-blue-400/25 rounded-full blur-sm animate-bounce delay-1000"></div>
            </div>
            
            {/* Parallax background elements */}
            <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-xl animate-float delay-200"></div>
            <div className="absolute bottom-20 left-5 w-24 h-24 bg-gradient-to-tl from-purple-400/10 to-transparent rounded-full blur-lg animate-float delay-500"></div>
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
