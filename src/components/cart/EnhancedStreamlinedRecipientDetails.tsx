
import React, { useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User, Phone, CreditCard, Wallet } from 'lucide-react';
import NetworkDetector from '../NetworkDetector';
import TermsSelector from './TermsSelector';
import SmartRecipientInput from './SmartRecipientInput';
import { usePhoneAutofill } from '@/hooks/usePhoneAutofill';
import { useToast } from '@/hooks/use-toast';

interface EnhancedStreamlinedRecipientDetailsProps {
  purchaseMode: 'self' | 'other';
  recipientData: {
    name: string;
    phone: string;
    relationship: string;
  };
  customerPhone: string;
  detectedNetwork: string;
  validationError: string;
  acceptedSATerms: boolean;
  cartItems: any[];
  onRecipientDataChange: (data: any) => void;
  onCustomerPhoneChange: (phone: string) => void;
  onPhoneValidation: (phone: string) => void;
  onAcceptSATerms: () => void;
}

const EnhancedStreamlinedRecipientDetails = ({
  purchaseMode,
  recipientData,
  customerPhone,
  detectedNetwork,
  validationError,
  acceptedSATerms,
  cartItems = [],
  onRecipientDataChange,
  onCustomerPhoneChange,
  onPhoneValidation,
  onAcceptSATerms
}: EnhancedStreamlinedRecipientDetailsProps) => {
  const { detectedPhone, savedBankingInfo, autoFillPhone } = usePhoneAutofill();
  const { toast } = useToast();
  const targetPhone = purchaseMode === 'self' ? customerPhone : recipientData.phone;
  const dealType = cartItems.length > 0 ? cartItems[0].dealType : 'airtime';

  // Auto-fill phone number when component mounts
  useEffect(() => {
    if (purchaseMode === 'self' && detectedPhone && !customerPhone) {
      onCustomerPhoneChange(detectedPhone);
      onPhoneValidation(detectedPhone);
      toast({
        title: "Phone Auto-Filled",
        description: "Your registered phone number has been automatically filled.",
      });
    }
  }, [detectedPhone, purchaseMode, customerPhone, onCustomerPhoneChange, onPhoneValidation, toast]);

  const handleUseCashbackBalance = () => {
    const userData = JSON.parse(localStorage.getItem('onecardUser') || '{}');
    const cashbackBalance = userData.cashbackBalance || 0;
    
    if (cashbackBalance > 0) {
      toast({
        title: "Cashback Balance Available",
        description: `You have R${cashbackBalance.toFixed(2)} available in cashback rewards to use for this purchase.`,
      });
    } else {
      toast({
        title: "No Cashback Available",
        description: "You don't have any cashback balance to use for this purchase.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="border-gray-200">
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center gap-2 mb-3">
          <User className="w-4 h-4 text-blue-600" />
          <h3 className="font-semibold text-sm">
            {purchaseMode === 'self' ? 'Your Details' : 'Recipient Details'}
          </h3>
        </div>
        
        {purchaseMode === 'self' ? (
          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="customerPhone" className="text-sm font-medium">
                Your Phone Number
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  id="customerPhone"
                  value={customerPhone}
                  onChange={(e) => {
                    onCustomerPhoneChange(e.target.value);
                    onPhoneValidation(e.target.value);
                  }}
                  placeholder="Enter your phone number"
                  className="pl-10"
                />
                {detectedPhone && !customerPhone && (
                  <Button
                    onClick={() => {
                      onCustomerPhoneChange(detectedPhone);
                      onPhoneValidation(detectedPhone);
                    }}
                    variant="outline"
                    size="sm"
                    className="absolute right-2 top-2 h-6 text-xs"
                  >
                    Auto-Fill
                  </Button>
                )}
              </div>
              
              {detectedNetwork && (
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {detectedNetwork}
                  </Badge>
                  <NetworkDetector
                    phoneNumber={customerPhone}
                    onNetworkDetected={() => {}}
                  />
                </div>
              )}
            </div>

            {/* Payment Options */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Wallet className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">Payment Options</span>
              </div>
              
              <div className="space-y-2">
                {savedBankingInfo && (
                  <div className="flex items-center justify-between bg-white p-2 rounded border">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-green-600" />
                      <span className="text-xs text-gray-700">
                        {savedBankingInfo.bankName} ****{savedBankingInfo.accountNumber}
                      </span>
                    </div>
                    <Badge variant="outline" className="text-xs">Saved</Badge>
                  </div>
                )}
                
                <Button
                  onClick={handleUseCashbackBalance}
                  variant="outline"
                  size="sm"
                  className="w-full border-green-300 text-green-700 hover:bg-green-50"
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  Use Cashback Balance
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <SmartRecipientInput
            recipientData={recipientData}
            onRecipientDataChange={onRecipientDataChange}
            onPhoneValidation={onPhoneValidation}
            detectedNetwork={detectedNetwork}
          />
        )}

        <TermsSelector
          phoneNumber={targetPhone}
          recipientName={purchaseMode === 'self' ? 'Self' : recipientData.name}
          purchaseType={purchaseMode === 'self' ? 'self' : 'third_party'}
          dealType={dealType}
          validationError={validationError}
          hasAcceptedTerms={acceptedSATerms}
          onAcceptTerms={onAcceptSATerms}
        />
      </CardContent>
    </Card>
  );
};

export default EnhancedStreamlinedRecipientDetails;
