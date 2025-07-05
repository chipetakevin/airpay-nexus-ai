import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CreditCard, Wallet, Plus, Check, Shield, Globe } from 'lucide-react';
import { useOneCardSystem } from '@/hooks/useOneCardSystem';
import InternationalPaymentCardForm from './InternationalPaymentCardForm';

interface PaymentMethodSelectorProps {
  userId: string;
  onPaymentMethodSelected: (method: {
    type: 'onecard_balance' | 'cashback' | 'international_card' | 'bank_account';
    details: any;
  }) => void;
  availableBalance?: number;
  purchaseAmount: number;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  userId,
  onPaymentMethodSelected,
  availableBalance = 0,
  purchaseAmount
}) => {
  const { oneCardAccount, paymentCards, getPaymentCards, addPaymentCard } = useOneCardSystem();
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [showAddCard, setShowAddCard] = useState(false);

  useEffect(() => {
    if (userId) {
      getPaymentCards(userId);
    }
  }, [userId, getPaymentCards]);

  const handlePaymentMethodChange = (value: string) => {
    setSelectedMethod(value);
    
    const [type, id] = value.split(':');
    
    switch (type) {
      case 'onecard_balance':
        onPaymentMethodSelected({
          type: 'onecard_balance',
          details: {
            accountId: oneCardAccount?.id,
            availableBalance: oneCardAccount?.cashback_balance || 0
          }
        });
        break;
      
      case 'cashback':
        onPaymentMethodSelected({
          type: 'cashback',
          details: {
            accountId: oneCardAccount?.id,
            availableBalance: oneCardAccount?.cashback_balance || 0
          }
        });
        break;
      
      case 'international_card':
        const selectedCard = paymentCards.find(card => card.id === id);
        if (selectedCard) {
          onPaymentMethodSelected({
            type: 'international_card',
            details: selectedCard
          });
        }
        break;
    }
  };

  const handleCardAdded = async (cardData: any) => {
    try {
      await addPaymentCard(cardData);
      setShowAddCard(false);
    } catch (error) {
      console.error('Failed to add payment card:', error);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR'
    }).format(amount);
  };

  const canAffordWithBalance = (oneCardAccount?.cashback_balance || 0) >= purchaseAmount;
  const canAffordWithCashback = (oneCardAccount?.cashback_balance || 0) >= purchaseAmount;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          Select Payment Method
        </CardTitle>
        <p className="text-sm text-gray-600">
          Purchase Amount: <strong>{formatCurrency(purchaseAmount)}</strong>
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        <RadioGroup value={selectedMethod} onValueChange={handlePaymentMethodChange}>
          {/* OneCard Balance */}
          {oneCardAccount && (
            <div className="flex items-center space-x-2 p-3 border rounded-lg">
              <RadioGroupItem 
                value="onecard_balance" 
                id="onecard_balance"
                disabled={!canAffordWithBalance}
              />
              <Label 
                htmlFor="onecard_balance" 
                className="flex-1 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded flex items-center justify-center">
                      <Wallet className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">OneCard Balance</p>
                      <p className="text-sm text-gray-500">
                        Available: {formatCurrency(oneCardAccount.cashback_balance || 0)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {canAffordWithBalance && (
                      <Badge className="bg-green-100 text-green-700">
                        <Check className="w-3 h-3 mr-1" />
                        Sufficient
                      </Badge>
                    )}
                    {!canAffordWithBalance && (
                      <Badge variant="secondary">
                        Insufficient
                      </Badge>
                    )}
                  </div>
                </div>
              </Label>
            </div>
          )}

          {/* Cashback Balance */}
          {oneCardAccount && oneCardAccount.cashback_balance > 0 && (
            <div className="flex items-center space-x-2 p-3 border rounded-lg">
              <RadioGroupItem 
                value="cashback" 
                id="cashback"
                disabled={!canAffordWithCashback}
              />
              <Label 
                htmlFor="cashback" 
                className="flex-1 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-6 bg-gradient-to-r from-yellow-500 to-orange-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">%</span>
                    </div>
                    <div>
                      <p className="font-medium">Cashback Rewards</p>
                      <p className="text-sm text-gray-500">
                        Available: {formatCurrency(oneCardAccount.cashback_balance || 0)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {canAffordWithCashback && (
                      <Badge className="bg-yellow-100 text-yellow-700">
                        <Check className="w-3 h-3 mr-1" />
                        Sufficient
                      </Badge>
                    )}
                  </div>
                </div>
              </Label>
            </div>
          )}

          {/* International Payment Cards */}
          {paymentCards.map((card) => (
            <div key={card.id} className="flex items-center space-x-2 p-3 border rounded-lg">
              <RadioGroupItem 
                value={`international_card:${card.id}`} 
                id={`card_${card.id}`}
              />
              <Label 
                htmlFor={`card_${card.id}`} 
                className="flex-1 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded flex items-center justify-center">
                      <CreditCard className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">{card.card_brand}</p>
                      <p className="text-sm text-gray-500">
                        •••• {card.last_four_digits} • Expires {card.expiry_month}/{card.expiry_year}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {card.is_primary && (
                      <Badge variant="outline">
                        Primary
                      </Badge>
                    )}
                    {card.is_verified && (
                      <Badge className="bg-green-100 text-green-700">
                        <Shield className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                    <div className="flex items-center gap-1">
                      <Globe className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-400">
                        {card.billing_country}
                      </span>
                    </div>
                  </div>
                </div>
              </Label>
            </div>
          ))}

          {/* Add New Card Option */}
          <div className="flex items-center space-x-2 p-3 border-2 border-dashed border-gray-300 rounded-lg">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setShowAddCard(true)}
              className="w-full justify-start"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add International Payment Card
            </Button>
          </div>
        </RadioGroup>

        {/* Add Card Form */}
        {showAddCard && oneCardAccount && (
          <div className="mt-6">
            <InternationalPaymentCardForm
              userId={userId}
              oneCardAccountId={oneCardAccount.id}
              onCardAdded={handleCardAdded}
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowAddCard(false)}
              className="mt-4 w-full"
            >
              Cancel
            </Button>
          </div>
        )}

        {/* Payment Summary */}
        {selectedMethod && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">Payment Summary</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Purchase Amount:</span>
                <span>{formatCurrency(purchaseAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span>Payment Method:</span>
                <span className="font-medium">
                  {selectedMethod.startsWith('onecard_balance') && 'OneCard Balance'}
                  {selectedMethod.startsWith('cashback') && 'Cashback Rewards'}
                  {selectedMethod.startsWith('international_card') && 'International Card'}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t font-medium">
                <span>Total:</span>
                <span>{formatCurrency(purchaseAmount)}</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentMethodSelector;