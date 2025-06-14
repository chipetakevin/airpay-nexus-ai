
import React from 'react';
import { Button } from '@/components/ui/button';
import { Gift, ArrowRight } from 'lucide-react';

interface OneCardVisualSectionProps {
  onAccessRewards: () => void;
}

export const OneCardVisualSection = ({ onAccessRewards }: OneCardVisualSectionProps) => {
  return (
    <>
      {/* OneCard Visual */}
      <div className="relative w-full mb-6">
        <img 
          src="/lovable-uploads/ba334c5a-5d5a-4c29-a99b-3961e7a7f11a.png" 
          alt="AirPay OneCard Gold"
          className="w-full h-auto rounded-2xl shadow-2xl"
        />
      </div>

      {/* Rewards Access Button */}
      <div className="mb-6">
        <Button
          onClick={onAccessRewards}
          className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold py-4 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          <div className="flex items-center justify-center gap-3">
            <Gift className="w-6 h-6" />
            <span className="text-lg">Access Divine Mobile Deals</span>
            <ArrowRight className="w-6 h-6" />
          </div>
        </Button>
      </div>
    </>
  );
};
