import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Wallet, TrendingUp, RefreshCw } from 'lucide-react';
import { AirPayCard } from './AirPayCard';

interface UnifiedCardSwitcherProps {
  unifiedAccountNumber: string;
  totalConsolidatedBalance: number;
  totalLifetimeEarnings: number;
  className?: string;
}

export const UnifiedCardSwitcher = ({
  unifiedAccountNumber,
  totalConsolidatedBalance,
  totalLifetimeEarnings,
  className = ""
}: UnifiedCardSwitcherProps) => {
  const [showAirPay, setShowAirPay] = useState(false);

  const toggleCard = () => {
    setShowAirPay(!showAirPay);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Card Type Toggle */}
      <div className="flex justify-center">
        <Button
          onClick={toggleCard}
          variant="outline"
          size="sm"
          className="bg-gradient-to-r from-yellow-100 to-amber-100 border-yellow-300 hover:from-yellow-200 hover:to-amber-200 text-black font-medium transition-all duration-300"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Switch to {showAirPay ? 'OneCard Gold' : 'AirPay Card'}
        </Button>
      </div>

      {/* Card Display with Smooth Transition */}
      <div className="relative min-h-[300px]">
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
            />
          )}
        </div>

        <div 
          className={`transition-all duration-500 ease-in-out ${
            !showAirPay ? 'opacity-100 scale-100' : 'opacity-0 scale-95 absolute inset-0'
          }`}
        >
          {!showAirPay && (
            <Card className="relative overflow-hidden bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600 text-black shadow-2xl border-0">
              {/* Background decorative elements */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-black/5 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/5 rounded-full translate-y-12 -translate-x-12"></div>
              
              {/* Status badge */}
              <div className="absolute -top-2 -right-2">
                <Badge className="bg-green-100 text-green-800 border-green-300 font-semibold">
                  ACTIVE
                </Badge>
              </div>
              
              <CardContent className="p-4 sm:p-6 relative z-10">
                {/* Header with AirPay branding */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-black rounded-lg flex items-center justify-center">
                      <span className="text-yellow-400 font-bold text-lg sm:text-xl">A</span>
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-black">AirPay</h2>
                      <p className="text-black/70 text-xs sm:text-sm">Powered by OneCard</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-black rounded-full flex items-center justify-center">
                      <span className="text-yellow-400 font-bold text-xs sm:text-sm">1</span>
                    </div>
                    <Badge className="bg-black text-yellow-400 border-none text-xs font-semibold">
                      CARD
                    </Badge>
                  </div>
                </div>

                {/* Card Number */}
                <div className="mb-8">
                  <p className="text-2xl sm:text-3xl font-mono font-bold tracking-[0.3em] text-black">
                    {unifiedAccountNumber}
                  </p>
                </div>

                {/* Card Details */}
                <div className="flex justify-between items-end">
                  <div>
                    <div className="mb-1">
                      <p className="text-black/70 text-xs font-medium">CARD HOLDER</p>
                      <p className="text-black font-bold text-sm sm:text-base">KEVIN CHIPETA</p>
                    </div>
                    <p className="text-black/70 text-xs">Member Since 2025</p>
                  </div>
                  <div className="text-right">
                    <p className="text-black/70 text-xs font-medium">VALID THRU</p>
                    <p className="text-black font-bold text-lg">06/28</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Card Type Indicator */}
      <div className="flex justify-center">
        <Badge className={`${
          showAirPay 
            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' 
            : 'bg-gradient-to-r from-yellow-400 to-amber-500 text-black'
        } font-semibold px-4 py-2 text-sm border-0 shadow-lg transition-all duration-300`}>
          <img src="/lovable-uploads/788fddcb-574c-4f1d-9c73-54cc003a95d1.png" alt="Divine Mobile" className="w-4 h-4 mr-2" />
          {showAirPay ? 'AirPay Card Active' : 'OneCard Gold Premium'}
        </Badge>
      </div>
    </div>
  );
};

export default UnifiedCardSwitcher;