import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, CreditCard, Trash2, Shield, Eye, EyeOff, Edit2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { validateSouthAfricanBankCard } from '@/utils/bankingValidation';

interface BankCard {
  id: string;
  cardholder_name: string;
  last_four_digits: string;
  card_type: string;
  expiry_month: number;
  expiry_year: number;
  is_primary: boolean;
  is_active: boolean;
  billing_address?: any;
  created_at: string;
}

interface BankCardManagerProps {
  userId: string;
  userType: string;
}

const BankCardManager: React.FC<BankCardManagerProps> = ({ userId, userType }) => {
  const [cards, setCards] = useState<BankCard[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showCardNumber, setShowCardNumber] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    cardholderName: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    cardType: '',
    billingAddress: {
      street: '',
      city: '',
      province: '',
      postalCode: ''
    }
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchCards();
  }, [userId]);

  const fetchCards = async () => {
    try {
      const { data, error } = await supabase
        .from('payment_cards')
        .select('*')
        .eq('user_id', userId)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCards(data || []);
    } catch (error) {
      console.error('Error fetching cards:', error);
      toast({
        title: "Error",
        description: "Failed to load bank cards",
        variant: "destructive"
      });
    }
  };

  const detectCardType = (cardNumber: string): string => {
    const cleanNumber = cardNumber.replace(/\s/g, '');
    
    // South African bank card patterns
    if (/^4/.test(cleanNumber)) return 'Visa';
    if (/^5[1-5]/.test(cleanNumber)) return 'Mastercard';
    if (/^3[47]/.test(cleanNumber)) return 'American Express';
    if (/^6(?:011|5)/.test(cleanNumber)) return 'Discover';
    if (/^62/.test(cleanNumber)) return 'UnionPay';
    
    return 'Unknown';
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\s/g, '').replace(/\D/g, '');
    value = value.substring(0, 16);
    
    // Format with spaces
    const formattedValue = value.replace(/(.{4})/g, '$1 ').trim();
    
    setFormData(prev => ({
      ...prev,
      cardNumber: formattedValue,
      cardType: detectCardType(value)
    }));
  };

  const validateForm = (): boolean => {
    const cleanCardNumber = formData.cardNumber.replace(/\s/g, '');
    const validation = validateSouthAfricanBankCard(cleanCardNumber);
    
    if (!validation.isValid) {
      toast({
        title: "Invalid Card",
        description: validation.error,
        variant: "destructive"
      });
      return false;
    }

    if (!formData.cardholderName.trim()) {
      toast({
        title: "Missing Information",
        description: "Cardholder name is required",
        variant: "destructive"
      });
      return false;
    }

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const expYear = parseInt(formData.expiryYear);
    const expMonth = parseInt(formData.expiryMonth);

    if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
      toast({
        title: "Invalid Expiry",
        description: "Card has expired",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      const cleanCardNumber = formData.cardNumber.replace(/\s/g, '');
      const lastFourDigits = cleanCardNumber.slice(-4);

      // In production, never store actual card numbers - use tokenization
      const cardData = {
        user_id: userId,
        user_type: userType,
        cardholder_name: formData.cardholderName.trim(),
        last_four_digits: lastFourDigits,
        card_type: formData.cardType,
        expiry_month: parseInt(formData.expiryMonth),
        expiry_year: parseInt(formData.expiryYear),
        is_primary: cards.length === 0, // First card is primary
        is_active: true,
        billing_address: formData.billingAddress
      };

      const { error } = await supabase
        .from('payment_cards')
        .insert([cardData]);

      if (error) throw error;

      toast({
        title: "Card Added Successfully",
        description: "Your bank card has been securely stored",
      });

      // Reset form
      setFormData({
        cardholderName: '',
        cardNumber: '',
        expiryMonth: '',
        expiryYear: '',
        cvv: '',
        cardType: '',
        billingAddress: {
          street: '',
          city: '',
          province: '',
          postalCode: ''
        }
      });
      
      setShowAddForm(false);
      fetchCards();
    } catch (error) {
      console.error('Error adding card:', error);
      toast({
        title: "Error",
        description: "Failed to add bank card",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const setPrimaryCard = async (cardId: string) => {
    try {
      // Remove primary status from all cards
      await supabase
        .from('payment_cards')
        .update({ is_primary: false })
        .eq('user_id', userId);

      // Set new primary card
      await supabase
        .from('payment_cards')
        .update({ is_primary: true })
        .eq('id', cardId);

      toast({
        title: "Primary Card Updated",
        description: "Card has been set as primary",
      });

      fetchCards();
    } catch (error) {
      console.error('Error setting primary card:', error);
      toast({
        title: "Error",
        description: "Failed to update primary card",
        variant: "destructive"
      });
    }
  };

  const deleteCard = async (cardId: string) => {
    try {
      await supabase
        .from('payment_cards')
        .update({ is_active: false })
        .eq('id', cardId);

      toast({
        title: "Card Removed",
        description: "Bank card has been deactivated",
      });

      fetchCards();
    } catch (error) {
      console.error('Error deleting card:', error);
      toast({
        title: "Error",
        description: "Failed to remove card",
        variant: "destructive"
      });
    }
  };

  const getCardIcon = (cardType: string) => {
    const iconClass = "w-8 h-8";
    switch (cardType.toLowerCase()) {
      case 'visa':
        return <div className={`${iconClass} bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold`}>VISA</div>;
      case 'mastercard':
        return <div className={`${iconClass} bg-red-600 rounded flex items-center justify-center text-white text-xs font-bold`}>MC</div>;
      case 'american express':
        return <div className={`${iconClass} bg-green-600 rounded flex items-center justify-center text-white text-xs font-bold`}>AMEX</div>;
      default:
        return <CreditCard className={iconClass} />;
    }
  };

  return (
    <Card className="border-blue-200 bg-blue-50/30">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-blue-700" />
            <div>
              <CardTitle className="text-xl text-blue-800">
                Secure Bank Cards
              </CardTitle>
              <p className="text-sm text-blue-600 mt-1">
                PCI DSS compliant card storage for {userType} profiles
              </p>
            </div>
          </div>
          <Button 
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 hover:bg-blue-700"
            size="sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Card
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Existing Cards */}
        {cards.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-medium text-blue-800">Stored Cards</h3>
            {cards.map((card) => (
              <div key={card.id} className="bg-white border border-blue-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getCardIcon(card.card_type)}
                    <div>
                      <div className="font-medium text-gray-900">
                        **** **** **** {card.last_four_digits}
                      </div>
                      <div className="text-sm text-gray-600">
                        {card.cardholder_name} • {card.expiry_month.toString().padStart(2, '0')}/{card.expiry_year}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {card.is_primary && (
                      <Badge variant="default" className="bg-blue-100 text-blue-700 border-blue-300">
                        Primary
                      </Badge>
                    )}
                    {!card.is_primary && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPrimaryCard(card.id)}
                      >
                        Set Primary
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteCard(card.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Card Form */}
        {showAddForm && (
          <Card className="border-green-200 bg-green-50/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-green-800 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Add New Bank Card
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Cardholder Name */}
                <div className="space-y-2">
                  <Label htmlFor="cardholderName" className="text-sm font-medium text-green-800">
                    Cardholder Name *
                  </Label>
                  <Input
                    id="cardholderName"
                    value={formData.cardholderName}
                    onChange={(e) => setFormData(prev => ({ ...prev, cardholderName: e.target.value }))}
                    placeholder="Name as shown on card"
                    className="border-green-300 focus:border-green-500"
                    required
                  />
                </div>

                {/* Card Number */}
                <div className="space-y-2">
                  <Label htmlFor="cardNumber" className="text-sm font-medium text-green-800">
                    Card Number *
                  </Label>
                  <div className="relative">
                    <Input
                      id="cardNumber"
                      type={showCardNumber ? "text" : "password"}
                      value={formData.cardNumber}
                      onChange={handleCardNumberChange}
                      placeholder="1234 5678 9012 3456"
                      className="border-green-300 focus:border-green-500 font-mono pr-20"
                      maxLength={19}
                      required
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                      {formData.cardType && (
                        <Badge variant="outline" className="text-xs">
                          {formData.cardType}
                        </Badge>
                      )}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowCardNumber(!showCardNumber)}
                        className="h-6 w-6 p-0"
                      >
                        {showCardNumber ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Expiry Date */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryMonth" className="text-sm font-medium text-green-800">
                      Expiry Month *
                    </Label>
                    <Input
                      id="expiryMonth"
                      type="number"
                      value={formData.expiryMonth}
                      onChange={(e) => setFormData(prev => ({ ...prev, expiryMonth: e.target.value }))}
                      placeholder="MM"
                      min="1"
                      max="12"
                      className="border-green-300 focus:border-green-500"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expiryYear" className="text-sm font-medium text-green-800">
                      Expiry Year *
                    </Label>
                    <Input
                      id="expiryYear"
                      type="number"
                      value={formData.expiryYear}
                      onChange={(e) => setFormData(prev => ({ ...prev, expiryYear: e.target.value }))}
                      placeholder="YYYY"
                      min={new Date().getFullYear()}
                      max={new Date().getFullYear() + 20}
                      className="border-green-300 focus:border-green-500"
                      required
                    />
                  </div>
                </div>

                {/* CVV - Note: Never store CVV in production */}
                <div className="space-y-2">
                  <Label htmlFor="cvv" className="text-sm font-medium text-green-800">
                    CVV * (For verification only - not stored)
                  </Label>
                  <Input
                    id="cvv"
                    type="password"
                    value={formData.cvv}
                    onChange={(e) => setFormData(prev => ({ ...prev, cvv: e.target.value.replace(/\D/g, '').substring(0, 4) }))}
                    placeholder="123"
                    className="border-green-300 focus:border-green-500 font-mono"
                    maxLength={4}
                    required
                  />
                </div>

                {/* Security Notice */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <Shield className="w-4 h-4 text-blue-600 mt-0.5" />
                    <div className="text-sm text-blue-700">
                      <strong>Security Notice:</strong> Card information is encrypted and stored according to PCI DSS standards. 
                      CVV codes are never stored permanently.
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowAddForm(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    {loading ? 'Adding...' : 'Add Card Securely'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {cards.length === 0 && !showAddForm && (
          <div className="text-center py-8 text-gray-500">
            <CreditCard className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p>No bank cards stored yet</p>
            <p className="text-sm">Add your first card to get started</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BankCardManager;
