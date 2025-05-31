
import React from 'react';
import { Button } from '@/components/ui/button';
import { CreditCard } from 'lucide-react';

interface PurchaseButtonProps {
  isProcessing: boolean;
  validationError: string;
  cartItemsCount: number;
  currentUser: any;
  total: number;
  onPurchase: () => void;
}

const PurchaseButton = ({
  isProcessing,
  validationError,
  cartItemsCount,
  total,
  onPurchase
}: PurchaseButtonProps) => {
  return (
    <>
      <Button
        onClick={onPurchase}
        disabled={isProcessing || !!validationError || cartItemsCount === 0}
        className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 h-11 sm:h-10"
      >
        {isProcessing ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Processing...
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            <span className="text-sm sm:text-base">Complete Purchase - R{total.toFixed(2)}</span>
          </div>
        )}
      </Button>

      <div className="text-xs text-gray-500 text-center px-2">
        🔒 Secured by OneCard • No Re-login Required • Fast Checkout Enabled
      </div>
    </>
  );
};

export default PurchaseButton;
