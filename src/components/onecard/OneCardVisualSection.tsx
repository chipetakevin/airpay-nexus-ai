
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Gift, ArrowRight, RefreshCw } from 'lucide-react';
import { AirPayCard } from './AirPayCard';

interface OneCardVisualSectionProps {
  onAccessRewards: () => void;
}

export const OneCardVisualSection = ({ onAccessRewards }: OneCardVisualSectionProps) => {
  const [showAirPay, setShowAirPay] = useState(false);

  const handleAccessAddexHubMobile = () => {
    // Redirect to Addex-Hub Mobile deals with default filters
    window.location.href = '/portal?tab=deals&network=addex-hub%20mobile&dealType=airtime';
  };

  const toggleCard = () => {
    setShowAirPay(!showAirPay);
  };

  return (
    <>
      {/* Card Toggle */}
      <div className="flex justify-center mb-4">
        <Button
          onClick={toggleCard}
          variant="outline"
          size="sm"
          className="bg-gradient-to-r from-yellow-100 to-amber-100 border-yellow-300 hover:from-yellow-200 hover:to-amber-200 text-black font-medium transition-all duration-300"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Switch to {showAirPay ? 'OneCard Visual' : 'AirPay Card'}
        </Button>
      </div>

      {/* OneCard Visual with Smooth Transition */}
      <div className="relative w-full mb-6 min-h-[200px]">
        <div 
          className={`transition-all duration-500 ease-in-out ${
            showAirPay ? 'opacity-100 scale-100' : 'opacity-0 scale-95 absolute inset-0'
          }`}
        >
          {showAirPay && (
            <AirPayCard 
              cardNumber="0CP9 1V4W W0"
              cardHolder="KEVIN CHIPETA"
              memberSince="2025"
              validThru="06/28"
              className="w-full"
            />
          )}
        </div>

        <div 
          className={`transition-all duration-500 ease-in-out ${
            !showAirPay ? 'opacity-100 scale-100' : 'opacity-0 scale-95 absolute inset-0'
          }`}
        >
          {!showAirPay && (
            <img 
              src="/lovable-uploads/ba334c5a-5d5a-4c29-a99b-3961e7a7f11a.png" 
              alt="AirPay OneCard Gold"
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
          )}
        </div>
      </div>

      {/* Rewards Access Button */}
      <div className="mb-6">
        <Button
          onClick={handleAccessAddexHubMobile}
          className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold py-4 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          <div className="flex items-center justify-center gap-3">
            <Gift className="w-6 h-6" />
            <span className="text-lg">Access Addex-Hub Mobile Deals</span>
            <ArrowRight className="w-6 h-6" />
          </div>
        </Button>
      </div>
    </>
  );
};
