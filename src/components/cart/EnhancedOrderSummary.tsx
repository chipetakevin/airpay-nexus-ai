import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, CheckCircle, User, Smartphone, Mail, Lock } from 'lucide-react';

interface EnhancedOrderSummaryProps {
  subtotal: number;
  savings: number;
  total: number;
  cashbackEarned: number;
  paymentMethod?: {
    displayName: string;
    type: string;
    lastFour?: string;
  };
  isReadyToProceed?: boolean;
  onCompletePurchase?: () => void;
  isProcessing?: boolean;
}

const EnhancedOrderSummary = ({
  subtotal,
  savings,
  total,
  cashbackEarned,
  paymentMethod,
  isReadyToProceed = false,
  onCompletePurchase,
  isProcessing = false
}: EnhancedOrderSummaryProps) => {
  return (
    <Card className="bg-white shadow-lg border border-gray-200 rounded-2xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          Order Summary
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6 space-y-4">
        {/* Order Totals */}
        <div className="space-y-3">
          <div className="flex justify-between text-gray-700">
            <span>Subtotal:</span>
            <span className="font-medium">R{subtotal.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between text-green-600">
            <span>You Save:</span>
            <span className="font-medium">-R{savings.toFixed(2)}</span>
          </div>
          
          <div className="border-t border-gray-200 pt-3">
            <div className="flex justify-between text-lg font-bold text-gray-900">
              <span>Total:</span>
              <span>R{total.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="flex justify-between text-blue-600">
            <span>Cashback Earned:</span>
            <span className="font-semibold">R{cashbackEarned.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment Details */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="flex items-center gap-2 text-blue-800 mb-3">
            <User className="w-4 h-4" />
            <span className="font-semibold">Payment Details</span>
          </div>
          
          {paymentMethod ? (
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Method:</strong> {paymentMethod.displayName}</p>
              <p><strong>Type:</strong> {paymentMethod.type}</p>
              {paymentMethod.lastFour && (
                <p><strong>Card:</strong> ****{paymentMethod.lastFour}</p>
              )}
            </div>
          ) : (
            <p className="text-sm text-gray-500">Please select a payment method above</p>
          )}
        </div>

        {/* Complete Purchase Button */}
        <Button
          onClick={onCompletePurchase}
          disabled={!isReadyToProceed || isProcessing}
          className={`w-full py-4 text-base font-bold transition-all duration-300 ${
            isReadyToProceed 
              ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg' 
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          {isProcessing ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Processing...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Complete Purchase - R{total.toFixed(2)}
            </div>
          )}
        </Button>

        {/* Ready to Process Status */}
        {isReadyToProceed && (
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <div className="flex items-center justify-center gap-2 text-green-700 mb-2">
              <CheckCircle className="w-4 h-4" />
              <span className="font-semibold">Ready to Process</span>
            </div>
            
            <div className="flex items-center justify-center gap-6 text-xs text-green-600">
              <div className="flex items-center gap-1">
                <Lock className="w-3 h-3" />
                <span>Secure payment</span>
              </div>
              <div className="flex items-center gap-1">
                <Smartphone className="w-3 h-3" />
                <span>Instant WhatsApp receipt</span>
              </div>
              <div className="flex items-center gap-1">
                <Mail className="w-3 h-3" />
                <span>Email confirmation</span>
              </div>
            </div>
          </div>
        )}

        {/* VIP Badge */}
        <div className="flex items-center justify-center">
          <Badge className="bg-green-600 text-white font-semibold px-3 py-1">
            <CheckCircle className="w-3 h-3 mr-1" />
            VIP
          </Badge>
        </div>

        {/* Security Message */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-gray-600 text-sm">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
              <img src="/lovable-uploads/788fddcb-574c-4f1d-9c73-54cc003a95d1.png" alt="Divine Mobile" className="w-4 h-4" />
            </div>
            <div className="text-xs">
              <p className="font-medium">Your payment information is secure and encrypted.</p>
              <p>All transactions are processed safely for all user types.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedOrderSummary;