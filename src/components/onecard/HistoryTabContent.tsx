
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const HistoryTabContent = () => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <Card>
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="text-lg sm:text-xl">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6 sm:py-8 text-gray-500">
            <p className="text-sm sm:text-base">
              No transactions yet. Start purchasing airtime and data to earn rewards!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
