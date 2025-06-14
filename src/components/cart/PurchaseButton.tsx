
import React from 'react';
import { Button } from '@/components/ui/button';
import { CreditCard, Lock, ArrowRight } from 'lucide-react';

interface PurchaseButtonProps {
  isProcessing: boolean;
  validationError: string;
  cartItemsCount: number;
  currentUser: any;
  total: number;
  hasAcceptedTerms: boolean;
  onPurchase: () => void;
}

const PurchaseButton = ({
  isProcessing,
  validationError,
  cartItemsCount,
  total,
  hasAcceptedTerms,
  onPurchase
}: PurchaseButtonProps) => {
  const isDisabled = isProcessing || !!validationError || cartItemsCount === 0;
  
  // Dynamic styling based on terms acceptance
  const getButtonStyles = () => {
    if (hasAcceptedTerms) {
      return "w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 h-12 text-base font-semibold shadow-lg transition-all duration-500 ease-in-out";
    }
    return "w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 h-12 text-base font-semibold shadow-lg transition-all duration-500 ease-in-out";
  };

  const getButtonText = () => {
    if (!hasAcceptedTerms) {
      return "Accept Terms to Continue";
    }
    return `Pay R${total.toFixed(2)}`;
  };

  return (
    <div className="space-y-3 pt-2">
      <Button
        onClick={onPurchase}
        disabled={isDisabled || !hasAcceptedTerms}
        className={getButtonStyles()}
      >
        {isProcessing ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Processing Payment...
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            <span>{getButtonText()}</span>
          </div>
        )}
      </Button>

      {hasAcceptedTerms && (
        <div className="text-xs text-gray-600 bg-blue-50 p-3 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 mb-1">
            <ArrowRight className="w-3 h-3 text-blue-600" />
            <span className="font-medium">After payment:</span>
          </div>
          <ul className="space-y-1 ml-5 text-gray-600">
            <li>• Receipt sent to your WhatsApp & Email</li>
            <li>• Auto-redirect to Divinely Mobile deals</li>
            <li>• Continue shopping with exclusive discounts</li>
          </ul>
        </div>
      )}

      <div className="text-xs text-gray-500 text-center px-2 flex items-center justify-center gap-2">
        <Lock className="w-3 h-3" />
        <span>Secured by OneCard • Fast Checkout</span>
      </div>
    </div>
  );
};

export default PurchaseButton;
