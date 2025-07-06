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
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-black/5 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/5 rounded-full translate-y-12 -translate-x-12"></div>
              
              <CardContent className="p-4 sm:p-6 relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-black/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <img src="/lovable-uploads/788fddcb-574c-4f1d-9c73-54cc003a95d1.png" alt="Divine Mobile" className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-black">OneCard Gold</h2>
                      <p className="text-black/80 text-xs sm:text-sm">Unified Rewards Account</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-black animate-pulse" />
                    <Badge className="bg-black/20 text-black border-black/30 text-xs">
                      Premium
                    </Badge>
                  </div>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <p className="text-black/70 text-xs sm:text-sm mb-1">Unified Account Number</p>
                    <p className="text-xl sm:text-2xl font-mono font-bold tracking-wider break-all text-black">{unifiedAccountNumber}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-black/10 rounded-xl p-3 sm:p-4 backdrop-blur-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <Wallet className="w-4 h-4 text-black/70" />
                        <p className="text-black/70 text-xs sm:text-sm">Available Balance</p>
                      </div>
                      <p className="text-xl sm:text-2xl font-bold text-black">R{totalConsolidatedBalance.toFixed(2)}</p>
                    </div>
                    <div className="bg-black/10 rounded-xl p-3 sm:p-4 backdrop-blur-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-black/70" />
                        <p className="text-black/70 text-xs sm:text-sm">Lifetime Earnings</p>
                      </div>
                      <p className="text-lg sm:text-xl font-semibold text-black">R{totalLifetimeEarnings.toFixed(2)}</p>
                    </div>
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