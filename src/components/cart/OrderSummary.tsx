
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ProfitAllocation } from '@/types/deals';

interface OrderSummaryProps {
  total: number;
  isVendor: boolean;
  purchaseMode: 'self' | 'other';
  profitSharing: ProfitAllocation;
}

const OrderSummary = ({ total, isVendor, purchaseMode, profitSharing }: OrderSummaryProps) => {
  return (
    <Card className="bg-gray-50">
      <CardContent className="p-4 space-y-2">
        <h3 className="font-semibold text-sm mb-3">Order Summary</h3>
        <div className="flex justify-between text-sm">
          <span>Total:</span>
          <span>R{total.toFixed(2)}</span>
        </div>
        
        {isVendor && profitSharing.vendorProfit && (
          <div className="flex justify-between text-sm text-yellow-600">
            <span>Vendor Profit (75%):</span>
            <span>+R{profitSharing.vendorProfit.toFixed(2)}</span>
          </div>
        )}
        
        {!isVendor && purchaseMode === 'self' && profitSharing.customerCashback && (
          <div className="flex justify-between text-sm text-green-600">
            <span>Your Cashback (50%):</span>
            <span>+R{profitSharing.customerCashback.toFixed(2)}</span>
          </div>
        )}
        
        {!isVendor && purchaseMode === 'other' && profitSharing.registeredCustomerReward && (
          <>
            <div className="flex justify-between text-sm text-blue-600">
              <span>Your Reward (50%):</span>
              <span>+R{profitSharing.registeredCustomerReward.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-purple-600">
              <span>Recipient Reward (50%):</span>
              <span>+R{profitSharing.unregisteredRecipientReward?.toFixed(2)}</span>
            </div>
          </>
        )}
        
        <div className="border-t pt-2 flex justify-between font-bold">
          <span>You Pay:</span>
          <span>R{total.toFixed(2)}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
