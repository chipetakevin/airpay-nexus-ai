
import React from 'react';

interface QuickStatsSectionProps {
  userData: any;
}

export const QuickStatsSection = ({ userData }: QuickStatsSectionProps) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="bg-gradient-to-r from-yellow-400/20 to-yellow-500/20 rounded-xl p-4 text-center border border-yellow-300">
        <div className="text-xl font-bold text-gray-800 mb-1">
          R{userData.cashbackBalance?.toFixed(2) || '0.00'}
        </div>
        <div className="text-sm text-gray-600">Cashback Balance</div>
      </div>
      <div className="bg-gradient-to-r from-yellow-400/20 to-yellow-500/20 rounded-xl p-4 text-center border border-yellow-300">
        <div className="text-xl font-bold text-gray-800 mb-1">2.5%</div>
        <div className="text-sm text-gray-600">Cashback Rate</div>
      </div>
    </div>
  );
};
