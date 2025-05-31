
import React from 'react';
import { Button } from '@/components/ui/button';
import { CreditCard, Lock } from 'lucide-react';

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
  const isDisabled = isProcessing || !!validationError || cartItemsCount === 0;

  return (
    <div className="space-y-3 pt-2">
      <Button
        onClick={onPurchase}
        disabled={isDisabled}
        className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 h-12 text-base font-semibold shadow-lg"
      >
        {isProcessing ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Processing Payment...
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            <span>Pay R{total.toFixed(2)}</span>
          </div>
        )}
      </Button>

      <div className="text-xs text-gray-500 text-center px-2 flex items-center justify-center gap-2">
        <Lock className="w-3 h-3" />
        <span>Secured by OneCard • Fast Checkout</span>
      </div>
    </div>
  );
};

export default PurchaseButton;
