import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Shield, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import IntelligentCollapsibleSections from './home/IntelligentCollapsibleSections';

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white overflow-hidden">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'url(/dot-grid-white.png)',
          backgroundSize: '40px 40px',
        }}
      ></div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <h1 
              className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight"
              style={{ textShadow: '0 0 30px rgba(255,255,255,0.3)' }}
            >
              Smart Deals Shopping
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed">
              Your one-stop platform for airtime, data, and mobile services across South Africa
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/portal?tab=deals">
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Start Shopping Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              
              <Link to="/whatsapp-assistant">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <Shield className="mr-2 h-5 w-5" />
                  WhatsApp Shopping
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white mb-2">50K+</div>
                <div className="text-blue-100">Happy Customers</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white mb-2">24/7</div>
                <div className="text-blue-100">AI Support</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white mb-2">99.9%</div>
                <div className="text-blue-100">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Intelligent Collapsible Sections */}
      <div className="relative z-20 bg-gray-50 py-12">
        <div className="container mx-auto">
          <IntelligentCollapsibleSections />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
