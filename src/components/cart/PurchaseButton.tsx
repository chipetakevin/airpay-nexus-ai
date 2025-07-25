
import React from 'react';
import { Button } from '@/components/ui/button';
import { CreditCard, Lock, ArrowRight, Smartphone, Mail } from 'lucide-react';

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
        <div className="text-xs text-gray-600 bg-gradient-to-r from-blue-50 to-green-50 p-3 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <ArrowRight className="w-3 h-3 text-green-600" />
            <span className="font-medium text-green-700">Auto-Receipt Delivery:</span>
          </div>
          <ul className="space-y-1 ml-5 text-gray-600">
            <li className="flex items-center gap-1">
              <Smartphone className="w-3 h-3 text-green-500" />
              <span>WhatsApp receipt with auto-redirect</span>
            </li>
            <li className="flex items-center gap-1">
              <Mail className="w-3 h-3 text-blue-500" />
              <span>Email receipt to registered address</span>
            </li>
            <li className="flex items-center gap-1">
              <ArrowRight className="w-3 h-3 text-purple-500" />
              <span>Continue shopping at Divine Mobile</span>
            </li>
          </ul>
        </div>
      )}

      <div className="text-xs text-gray-500 text-center px-2 flex items-center justify-center gap-2">
        <Lock className="w-3 h-3" />
        <span>Secured by OneCard • Auto-Receipt Generation</span>
      </div>
    </div>
  );
};

export default PurchaseButton;
