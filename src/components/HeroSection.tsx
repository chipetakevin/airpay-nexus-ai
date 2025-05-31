
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Phone, Wifi, Star, ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-teal-500 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative container mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              South Africa's
              <span className="block text-yellow-300">Smartest Airtime</span>
              <span className="block">& Data Platform</span>
            </h1>
            <p className="text-lg sm:text-xl mb-8 opacity-90 max-w-2xl mx-auto lg:mx-0">
              Join thousands of South Africans saving money on airtime and data while earning cashback rewards. 
              Purchase from all major networks with unbeatable deals and instant delivery.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/portal">
                <Button size="lg" className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 text-lg">
                  Start Earning Rewards
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/portal">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full sm:w-auto border-white bg-white text-blue-600 hover:bg-gray-100 hover:text-blue-700 px-8 py-4 text-lg font-semibold"
                >
                  Become a Vendor
                </Button>
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-6 text-sm">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span>USSD: *120*888#</span>
              </div>
              <div className="flex items-center">
                <Wifi className="w-4 h-4 mr-2" />
                <span>App Available</span>
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-2 text-yellow-300" />
                <span>4.8/5 Rating</span>
              </div>
            </div>
          </div>

          <div className="relative lg:block hidden">
            <div className="relative z-10 bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black p-6 rounded-xl mb-6">
                <div className="text-lg font-bold mb-2">OneCard Gold</div>
                <div className="text-2xl font-bold">R2,847.50</div>
                <div className="text-sm opacity-80">Available Cashback</div>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Total Earned:</span>
                  <span className="font-bold">R5,694.75</span>
                </div>
                <div className="flex justify-between">
                  <span>Transactions:</span>
                  <span className="font-bold">1,247</span>
                </div>
                <div className="flex justify-between">
                  <span>Savings Rate:</span>
                  <span className="font-bold text-green-300">15.2%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
