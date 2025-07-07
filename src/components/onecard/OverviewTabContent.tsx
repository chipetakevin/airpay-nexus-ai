
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CreditCard } from 'lucide-react';
import { AccountInfoCards } from './AccountInfoCards';
import { OneCardVisualSection } from './OneCardVisualSection';
import { CashbackDisplay } from './CashbackDisplay';

interface OverviewTabContentProps {
  userData: any;
  showPhoneNumber: boolean;
  showCardNumber: boolean;
  onTogglePhoneVisibility: () => void;
  onToggleCardVisibility: () => void;
  onAccessRewards: () => void;
}

export const OverviewTabContent = ({ 
  userData, 
  showPhoneNumber, 
  showCardNumber, 
  onTogglePhoneVisibility, 
  onToggleCardVisibility, 
  onAccessRewards 
}: OverviewTabContentProps) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Modern OneCard Account Display */}
      <div className="w-full max-w-lg mx-auto">
        {/* Header Section */}
        <div className="mb-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <CreditCard className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Your OneCard Account</h2>
          </div>
        </div>

        {/* Single Card Display - Show Account Cards OR Visual Section, not both */}
        <AccountInfoCards
          userData={userData}
          showPhoneNumber={showPhoneNumber}
          showCardNumber={showCardNumber}
          onTogglePhoneVisibility={onTogglePhoneVisibility}
          onToggleCardVisibility={onToggleCardVisibility}
        />

        {/* Access Rewards Button (without duplicate card) */}
        <div className="mb-6">
          <button
            onClick={() => window.location.href = '/portal?tab=deals&network=addex-hub%20mobile&dealType=airtime'}
            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold py-4 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3"
          >
            <span className="text-xl">🎁</span>
            <span className="text-lg">Access Addex-Hub Mobile Deals</span>
            <span className="text-xl">→</span>
          </button>
        </div>

        {/* Enhanced Cashback Display */}
        <CashbackDisplay userData={userData} />
      </div>

      {/* Security Notice */}
      <Card className="bg-blue-50 border-blue-200 mt-6">
        <CardContent className="p-3 sm:p-4">
          <p className="text-xs sm:text-sm text-blue-800">
            🔐 <strong>Automated Rewards:</strong> Your cashback and rewards are automatically calculated and added to your OneCard balance with each transaction.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
