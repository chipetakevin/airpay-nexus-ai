
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Coins, TrendingUp, Gift } from 'lucide-react';
import { getPendingRecipientRewards } from '@/services/cashbackService';

interface CashbackDisplayProps {
  userData: any;
}

export const CashbackDisplay = ({ userData }: CashbackDisplayProps) => {
  const currentUser = localStorage.getItem('userCredentials');
  let pendingRewards = 0;
  
  if (currentUser) {
    const parsedUser = JSON.parse(currentUser);
    pendingRewards = getPendingRecipientRewards(parsedUser.phone || '');
  }

  return (
    <div className="grid grid-cols-1 gap-4 mb-6">
      {/* Current Cashback Balance */}
      <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-200 rounded-lg">
                <Coins className="w-5 h-5 text-green-700" />
              </div>
              <div>
                <p className="text-sm text-green-600 font-medium">Current Cashback</p>
                <p className="text-2xl font-bold text-green-800">
                  R{userData.cashbackBalance?.toFixed(2) || '0.00'}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-green-600">Available Now</p>
              <p className="text-sm font-semibold text-green-700">2.5% Rate</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Total Earned */}
      <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-200 rounded-lg">
                <TrendingUp className="w-5 h-5 text-blue-700" />
              </div>
              <div>
                <p className="text-sm text-blue-600 font-medium">Total Earned</p>
                <p className="text-2xl font-bold text-blue-800">
                  R{userData.totalEarned?.toFixed(2) || '0.00'}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-blue-600">All Time</p>
              <p className="text-sm font-semibold text-blue-700">Since Registration</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pending Rewards (if any) */}
      {pendingRewards > 0 && (
        <Card className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-200 rounded-lg">
                  <Gift className="w-5 h-5 text-yellow-700" />
                </div>
                <div>
                  <p className="text-sm text-yellow-600 font-medium">Pending Rewards</p>
                  <p className="text-xl font-bold text-yellow-800">
                    R{pendingRewards.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-yellow-600">From Received Airtime</p>
                <p className="text-sm font-semibold text-yellow-700">Auto-Added</p>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
