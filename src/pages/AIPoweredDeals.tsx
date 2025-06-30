
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Crown, Zap, Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import MobileLayout from '@/components/navigation/MobileLayout';

const AIPoweredDeals = () => {
  return (
    <MobileLayout showTopNav={false} showBottomNav={true}>
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-purple-700 relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 relative z-10">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
            <Crown className="w-7 h-7 text-blue-600" />
          </div>
          <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
            <div className="space-y-1">
              <div className="w-5 h-0.5 bg-white"></div>
              <div className="w-5 h-0.5 bg-white"></div>
              <div className="w-5 h-0.5 bg-white"></div>
            </div>
          </button>
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-yellow-300 to-orange-400 rounded-full blur-2xl"></div>
          <div className="absolute top-40 right-10 w-24 h-24 bg-gradient-to-r from-pink-300 to-purple-400 rounded-full blur-xl"></div>
          <div className="absolute bottom-40 left-20 w-40 h-40 bg-gradient-to-r from-blue-300 to-cyan-400 rounded-full blur-3xl"></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 px-6 py-8">
          {/* Hero Card */}
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 rounded-3xl mb-8">
            <CardContent className="p-8 text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Airtime & Data
              </h1>
              <h2 className="text-3xl md:text-4xl font-bold text-yellow-300 mb-6">
                AI-Powered Deals
              </h2>
            </CardContent>
          </Card>

          {/* Description Card */}
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 rounded-3xl mb-8">
            <CardContent className="p-8 text-center">
              <p className="text-lg text-white/90 leading-relaxed">
                Best airtime and data deals with our AI-driven platform. Earn 
                OneCard rewards on every purchase and save more with 
                recommendations.
              </p>
            </CardContent>
          </Card>

          {/* Action Buttons - Using correct design */}
          <div className="space-y-4">
            <Button 
              asChild
              className="w-full h-14 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold text-lg rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Link to="/portal?tab=deals">
                <Zap className="w-6 h-6 mr-3" />
                Instant Rewards
                <ArrowRight className="w-5 h-5 ml-3" />
              </Link>
            </Button>

            <Button 
              asChild
              variant="outline"
              className="w-full h-14 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 font-bold text-lg rounded-2xl"
            >
              <Link to="/whatsapp-assistant">
                <Shield className="w-6 h-6 mr-3 text-green-400" />
                Secure Transactions
                <ArrowRight className="w-5 h-5 ml-3" />
              </Link>
            </Button>
          </div>

          {/* Quick Access */}
          <div className="mt-12 text-center">
            <p className="text-white/70 text-sm mb-4">Quick Access</p>
            <div className="flex justify-center gap-4">
              <Link 
                to="/portal" 
                className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/30 transition-all"
              >
                <Crown className="w-6 h-6 text-white" />
              </Link>
              <Link 
                to="/whatsapp-assistant" 
                className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/30 transition-all"
              >
                <Zap className="w-6 h-6 text-white" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default AIPoweredDeals;
