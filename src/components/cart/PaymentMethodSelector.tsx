
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CreditCard, Building2, Plus, Star, Shield } from 'lucide-react';
import { useUniversalBankingStorage, BankingProfile, CardProfile } from '@/hooks/useUniversalBankingStorage';
import UniversalCardDetailsForm from '@/components/banking/UniversalCardDetailsForm';

interface PaymentMethodSelectorProps {
  userType: 'customer' | 'vendor' | 'admin';
  onPaymentMethodSelect: (method: any) => void;
  selectedMethod?: string;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  userType,
  onPaymentMethodSelect,
  selectedMethod
}) => {
  const [showAddCard, setShowAddCard] = useState(false);
  const [selectedPaymentId, setSelectedPaymentId] = useState(selectedMethod || '');
  
  const { bankingData, loadBankingData } = useUniversalBankingStorage(userType);

  useEffect(() => {
    loadBankingData();
  }, [loadBankingData]);

  // Auto-select primary payment method
  useEffect(() => {
    if (bankingData && !selectedPaymentId) {
      const primaryCard = bankingData.cardProfiles.find(c => c.isPrimary);
      const primaryBank = bankingData.bankingProfiles.find(b => b.isPrimary);
      
      if (primaryCard) {
        setSelectedPaymentId(primaryCard.id);
        onPaymentMethodSelect({
          type: 'card',
          id: primaryCard.id,
          method: primaryCard,
          displayName: `****${primaryCard.lastFourDigits} (${primaryCard.cardType.toUpperCase()})`
        });
      } else if (primaryBank) {
        setSelectedPaymentId(primaryBank.id);
        onPaymentMethodSelect({
          type: 'bank',
          id: primaryBank.id,
          method: primaryBank,
          displayName: `${primaryBank.bankName} (${primaryBank.accountType})`
        });
      }
    }
  }, [bankingData, selectedPaymentId, onPaymentMethodSelect]);

  const handlePaymentSelection = (paymentId: string) => {
    setSelectedPaymentId(paymentId);
    
    // Find the selected payment method
    const selectedCard = bankingData?.cardProfiles.find(c => c.id === paymentId);
    const selectedBank = bankingData?.bankingProfiles.find(b => b.id === paymentId);
    
    if (selectedCard) {
      onPaymentMethodSelect({
        type: 'card',
        id: selectedCard.id,
        method: selectedCard,
        displayName: `****${selectedCard.lastFourDigits} (${selectedCard.cardType.toUpperCase()})`
      });
    } else if (selectedBank) {
      onPaymentMethodSelect({
        type: 'bank',
        id: selectedBank.id,
        method: selectedBank,
        displayName: `${selectedBank.bankName} (${selectedBank.accountType})`
      });
    }
  };

  const getCardIcon = (cardType: string) => {
    switch (cardType) {
      case 'visa': return '💳';
      case 'mastercard': return '💳';
      case 'amex': return '💳';
      default: return '💳';
    }
  };

  const hasPaymentMethods = (bankingData?.cardProfiles.length || 0) > 0 || (bankingData?.bankingProfiles.length || 0) > 0;

  if (!hasPaymentMethods && !showAddCard) {
    return (
      <Card className="border-yellow-200 bg-yellow-50/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-yellow-800">
            <CreditCard className="w-5 h-5" />
            No Payment Methods
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-yellow-700 text-sm">
            You haven't added any payment methods yet. Add a card or bank account to complete your purchase.
          </p>
          
          <Button
            onClick={() => setShowAddCard(true)}
            className="w-full bg-yellow-600 hover:bg-yellow-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Payment Method
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (showAddCard) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Add Payment Method</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAddCard(false)}
          >
            Back to Payment Selection
          </Button>
        </div>
        
        <UniversalCardDetailsForm
          userType={userType}
          onCardSaved={(card) => {
            setShowAddCard(false);
            loadBankingData(); // Refresh data
          }}
          compact={true}
        />
      </div>
    );
  }

  return (
    <Card className="border-blue-200 bg-blue-50/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center justify-between gap-2 text-blue-800">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Select Payment Method
          </div>
          <Badge className="bg-blue-100 text-blue-700">
            <Shield className="w-3 h-3 mr-1" />
            Secure
          </Badge>
        </CardTitle>
        <p className="text-sm text-blue-600">
          Choose from your saved payment methods
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <RadioGroup value={selectedPaymentId} onValueChange={handlePaymentSelection}>
          {/* Saved Cards */}
          {bankingData?.cardProfiles.map((card) => (
            <div key={card.id} className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={card.id} id={card.id} />
                <Label htmlFor={card.id} className="flex-1 cursor-pointer">
                  <div className={`p-3 rounded-lg border-2 transition-all ${
                    selectedPaymentId === card.id 
                      ? 'border-blue-300 bg-blue-100' 
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{getCardIcon(card.cardType)}</div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-medium">****-****-****-{card.lastFourDigits}</span>
                            {card.isPrimary && (
                              <Badge className="bg-yellow-100 text-yellow-800">
                                <Star className="w-3 h-3 mr-1 fill-current" />
                                Primary
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-gray-600">
                            {card.holderName} • {card.cardType.toUpperCase()}
                          </div>
                          <div className="text-xs text-gray-500">
                            Expires {card.expiryMonth}/{card.expiryYear}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Label>
              </div>
            </div>
          ))}

          {/* Saved Bank Accounts */}
          {bankingData?.bankingProfiles.map((bank) => (
            <div key={bank.id} className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={bank.id} id={bank.id} />
                <Label htmlFor={bank.id} className="flex-1 cursor-pointer">
                  <div className={`p-3 rounded-lg border-2 transition-all ${
                    selectedPaymentId === bank.id 
                      ? 'border-blue-300 bg-blue-100' 
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Building2 className="w-6 h-6 text-gray-600" />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{bank.bankName}</span>
                            {bank.isPrimary && (
                              <Badge className="bg-yellow-100 text-yellow-800">
                                <Star className="w-3 h-3 mr-1 fill-current" />
                                Primary
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-gray-600">
                            {bank.accountType.charAt(0).toUpperCase() + bank.accountType.slice(1)} Account
                          </div>
                          <div className="text-xs text-gray-500">
                            Branch Code: {bank.branchCode}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Label>
              </div>
            </div>
          ))}
        </RadioGroup>

        {/* Add New Payment Method */}
        <div className="pt-4 border-t border-blue-200">
          <Button
            variant="outline"
            onClick={() => setShowAddCard(true)}
            className="w-full border-blue-300 text-blue-700 hover:bg-blue-50"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Payment Method
          </Button>
        </div>

        {selectedPaymentId && (
          <div className="bg-white p-3 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 text-sm text-blue-800">
              <Shield className="w-4 h-4" />
              <span className="font-medium">Payment Method Selected</span>
            </div>
            <p className="text-xs text-blue-600 mt-1">
              Your payment will be processed securely using the selected method above.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentMethodSelector;
