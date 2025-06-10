
import React from 'react';
import { Button } from '@/components/ui/button';
import { Smartphone, Menu, Zap, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';

const AirtimeDataDeals = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 relative overflow-hidden">
      {/* Header */}
      <header className="relative z-20 w-full p-4">
        <div className="flex items-center justify-between">
          {/* Devine Mobile Logo */}
          <Link to="/" className="flex items-center space-x-2 group cursor-pointer">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-all duration-300 ease-out">
                <Smartphone className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl text-white">Devine</span>
              <span className="font-montserrat font-bold text-lg text-white -mt-1">
                Mobile
              </span>
            </div>
          </Link>

          {/* Hamburger Menu */}
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-4">
        <div className="w-full max-w-4xl space-y-6">
          {/* Primary Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center border border-white/20">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Airtime & Data
            </h1>
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              AI-Powered Deals
            </h2>
          </div>

          {/* Secondary Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <p className="text-white text-lg md:text-xl leading-relaxed text-center">
              Discover the best airtime and data deals with our AI-driven platform. 
              Earn OneCard rewards on every purchase and save more with personalized recommendations.
            </p>
          </div>

          {/* Action Buttons Container */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            {/* Instant Rewards Button */}
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-semibold px-8 py-4 rounded-xl text-lg shadow-lg"
            >
              <Zap className="w-5 h-5 mr-2" />
              Instant Rewards
            </Button>

            {/* VIP Access Badge */}
            <div className="flex items-center space-x-2 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg">
              <CheckCircle className="w-5 h-5" />
              <span className="font-semibold">VIP Access</span>
            </div>
          </div>
        </div>
      </main>

      {/* WhatsApp Floating Button */}
      <WhatsAppFloatingButton />

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/5 rounded-full"></div>
        <div className="absolute top-32 right-16 w-16 h-16 bg-white/5 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-white/5 rounded-full"></div>
        <div className="absolute bottom-40 right-8 w-12 h-12 bg-white/5 rounded-full"></div>
      </div>
    </div>
  );
};

export default AirtimeDataDeals;
