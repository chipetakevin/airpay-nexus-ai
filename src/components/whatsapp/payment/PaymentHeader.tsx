
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield } from 'lucide-react';

interface PaymentHeaderProps {
  onBack: () => void;
}

const PaymentHeader = ({ onBack }: PaymentHeaderProps) => {
  return (
    <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white p-4">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="text-white hover:bg-white/20 p-2"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h2 className="font-bold text-lg text-white drop-shadow-md">Secure Checkout</h2>
          <p className="text-xs text-white opacity-90 drop-shadow-sm">SSL Protected • Bank Grade Security</p>
        </div>
        <Shield className="w-6 h-6 text-green-300" />
      </div>
    </div>
  );
};

export default PaymentHeader;
