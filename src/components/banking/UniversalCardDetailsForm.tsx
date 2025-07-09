
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  CreditCard, Eye, EyeOff, Shield, Trash2, 
  Plus, Check, AlertCircle, Star 
} from 'lucide-react';
import { useUniversalBankingStorage, CardProfile } from '@/hooks/useUniversalBankingStorage';

interface UniversalCardDetailsFormProps {
  userType: 'customer' | 'vendor' | 'admin';
  onCardSaved?: (card: CardProfile) => void;
  showSavedCards?: boolean;
  compact?: boolean;
}

const UniversalCardDetailsForm: React.FC<UniversalCardDetailsFormProps> = ({
  userType,
  onCardSaved,
  showSavedCards = true,
  compact = false
}) => {
  const [showForm, setShowForm] = useState(false);
  const [showCardNumber, setShowCardNumber] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    holderName: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);

  const {
    bankingData,
    saveCardProfile,
    deleteCardProfile,
    setPrimaryCardProfile
  } = useUniversalBankingStorage(userType);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 15 }, (_, i) => currentYear + i);
  const months = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));

  const validateCard = () => {
    const newErrors: Record<string, string> = {};

    // Card number validation
    const cardNumber = formData.cardNumber.replace(/\s/g, '');
    if (!cardNumber) {
      newErrors.cardNumber = 'Card number is required';
    } else if (cardNumber.length < 13 || cardNumber.length > 19) {
      newErrors.cardNumber = 'Invalid card number length';
    } else if (!/^\d+$/.test(cardNumber)) {
      newErrors.cardNumber = 'Card number must contain only digits';
    }

    // Expiry validation
    if (!formData.expiryMonth) newErrors.expiryMonth = 'Month is required';
    if (!formData.expiryYear) newErrors.expiryYear = 'Year is required';
    
    // Check if card is expired
    if (formData.expiryMonth && formData.expiryYear) {
      const expiry = new Date(parseInt(formData.expiryYear), parseInt(formData.expiryMonth) - 1);
      const now = new Date();
      if (expiry < now) {
        newErrors.expiryMonth = 'Card has expired';
      }
    }

    // CVV validation
    if (!formData.cvv) {
      newErrors.cvv = 'CVV is required';
    } else if (formData.cvv.length < 3 || formData.cvv.length > 4) {
      newErrors.cvv = 'CVV must be 3 or 4 digits';
    }

    // Holder name validation
    if (!formData.holderName.trim()) {
      newErrors.holderName = 'Cardholder name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    let processedValue = value;

    // Format card number with spaces
    if (field === 'cardNumber') {
      processedValue = value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
    }

    // Format CVV
    if (field === 'cvv') {
      processedValue = value.replace(/\D/g, '').slice(0, 4);
    }

    // Format holder name
    if (field === 'holderName') {
      processedValue = value.toUpperCase();
    }

    setFormData(prev => ({ ...prev, [field]: processedValue }));
    
    // Clear errors
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSaveCard = async () => {
    if (!validateCard()) return;

    setIsSaving(true);
    try {
      const savedCard = await saveCardProfile({
        cardNumber: formData.cardNumber.replace(/\s/g, ''),
        expiryMonth: formData.expiryMonth,
        expiryYear: formData.expiryYear,
        cvv: formData.cvv,
        holderName: formData.holderName,
        isPrimary: bankingData?.cardProfiles.length === 0
      });

      // Reset form
      setFormData({
        cardNumber: '',
        expiryMonth: '',
        expiryYear: '',
        cvv: '',
        holderName: ''
      });
      setShowForm(false);

      if (onCardSaved && savedCard) {
        onCardSaved(savedCard);
      }
    } catch (error) {
      console.error('Error saving card:', error);
    } finally {
      setIsSaving(false);
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

  if (compact) {
    return (
      <div className="space-y-3">
        {!showForm && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowForm(true)}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Payment Card
          </Button>
        )}

        {showForm && (
          <Card className="border-blue-200">
            <CardContent className="p-3 space-y-3">
              <div className="grid grid-cols-1 gap-2">
                <div>
                  <Input
                    placeholder="Card Number"
                    value={formData.cardNumber}
                    onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                    className={errors.cardNumber ? 'border-red-500' : ''}
                    maxLength={19}
                  />
                  {errors.cardNumber && <p className="text-red-500 text-xs">{errors.cardNumber}</p>}
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <Select value={formData.expiryMonth} onValueChange={(value) => handleInputChange('expiryMonth', value)}>
                    <SelectTrigger className={errors.expiryMonth ? 'border-red-500' : ''}>
                      <SelectValue placeholder="MM" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map(month => (
                        <SelectItem key={month} value={month}>{month}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={formData.expiryYear} onValueChange={(value) => handleInputChange('expiryYear', value)}>
                    <SelectTrigger className={errors.expiryYear ? 'border-red-500' : ''}>
                      <SelectValue placeholder="YYYY" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map(year => (
                        <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Input
                    placeholder="CVV"
                    type="password"
                    value={formData.cvv}
                    onChange={(e) => handleInputChange('cvv', e.target.value)}
                    className={errors.cvv ? 'border-red-500' : ''}
                    maxLength={4}
                  />
                </div>

                <Input
                  placeholder="Cardholder Name"
                  value={formData.holderName}
                  onChange={(e) => handleInputChange('holderName', e.target.value)}
                  className={errors.holderName ? 'border-red-500' : ''}
                />
              </div>

              <div className="flex gap-2">
                <Button
                  type="button"
                  onClick={handleSaveCard}
                  disabled={isSaving}
                  size="sm"
                  className="flex-1"
                >
                  {isSaving ? 'Saving...' : 'Save Card'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                  size="sm"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Saved cards compact view */}
        {bankingData?.cardProfiles && bankingData.cardProfiles.length > 0 && (
          <div className="space-y-1">
            {bankingData.cardProfiles.slice(0, 2).map((card) => (
              <div key={card.id} className="flex items-center justify-between p-2 bg-gray-50 rounded text-xs">
                <div className="flex items-center gap-2">
                  <span>{getCardIcon(card.cardType)}</span>
                  <span>****{card.lastFourDigits}</span>
                  {card.isPrimary && <Star className="w-3 h-3 text-yellow-500 fill-current" />}
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteCardProfile(card.id)}
                  className="h-6 w-6 p-0"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="border-blue-200 bg-blue-50/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-blue-800">
            <CreditCard className="w-5 h-5" />
            Payment Card Details
            <Badge variant="outline" className="bg-blue-100 text-blue-700">
              <Shield className="w-3 h-3 mr-1" />
              Secure
            </Badge>
          </CardTitle>
          <p className="text-sm text-blue-600">
            Add and manage your payment cards for seamless transactions
          </p>
        </CardHeader>

        {!showForm && (
          <CardContent>
            <Button
              type="button"
              onClick={() => setShowForm(true)}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Payment Card
            </Button>
          </CardContent>
        )}

        {showForm && (
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number *</Label>
                <div className="relative">
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                    className={errors.cardNumber ? 'border-red-500' : ''}
                    maxLength={19}
                    type={showCardNumber ? 'text' : 'password'}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowCardNumber(!showCardNumber)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                  >
                    {showCardNumber ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
                {errors.cardNumber && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.cardNumber}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Expiry Month *</Label>
                  <Select value={formData.expiryMonth} onValueChange={(value) => handleInputChange('expiryMonth', value)}>
                    <SelectTrigger className={errors.expiryMonth ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select Month" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map(month => (
                        <SelectItem key={month} value={month}>
                          {month} - {new Date(2000, parseInt(month) - 1).toLocaleString('default', { month: 'long' })}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.expiryMonth && <p className="text-red-500 text-sm">{errors.expiryMonth}</p>}
                </div>

                <div className="space-y-2">
                  <Label>Expiry Year *</Label>
                  <Select value={formData.expiryYear} onValueChange={(value) => handleInputChange('expiryYear', value)}>
                    <SelectTrigger className={errors.expiryYear ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select Year" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map(year => (
                        <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.expiryYear && <p className="text-red-500 text-sm">{errors.expiryYear}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV *</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    type="password"
                    value={formData.cvv}
                    onChange={(e) => handleInputChange('cvv', e.target.value)}
                    className={errors.cvv ? 'border-red-500' : ''}
                    maxLength={4}
                  />
                  {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="holderName">Cardholder Name *</Label>
                  <Input
                    id="holderName"
                    placeholder="JOHN MTHEMBU"
                    value={formData.holderName}
                    onChange={(e) => handleInputChange('holderName', e.target.value)}
                    className={errors.holderName ? 'border-red-500' : ''}
                  />
                  {errors.holderName && <p className="text-red-500 text-sm">{errors.holderName}</p>}
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t border-blue-200">
              <Button
                type="button"
                onClick={handleSaveCard}
                disabled={isSaving}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                {isSaving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Saving Securely...
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4 mr-2" />
                    Save Card Securely
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowForm(false)}
                className="border-blue-300 text-blue-700 hover:bg-blue-50"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Saved Cards Display */}
      {showSavedCards && bankingData?.cardProfiles && bankingData.cardProfiles.length > 0 && (
        <Card className="border-green-200 bg-green-50/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2 text-green-800">
              <Check className="w-5 h-5" />
              Saved Payment Cards
              <Badge className="bg-green-100 text-green-700">
                {bankingData.cardProfiles.length} Card{bankingData.cardProfiles.length !== 1 ? 's' : ''}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {bankingData.cardProfiles.map((card) => (
              <div
                key={card.id}
                className={`p-4 rounded-lg border-2 ${
                  card.isPrimary 
                    ? 'border-green-300 bg-green-100' 
                    : 'border-gray-200 bg-white'
                }`}
              >
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
                        {card.holderName} • Expires {card.expiryMonth}/{card.expiryYear}
                      </div>
                      <div className="text-xs text-gray-500 capitalize">
                        {card.cardType} • Added {new Date(card.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    {!card.isPrimary && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setPrimaryCardProfile(card.id)}
                        className="text-xs"
                      >
                        <Star className="w-3 h-3 mr-1" />
                        Set Primary
                      </Button>
                    )}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => deleteCardProfile(card.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="text-xs text-green-600 bg-white p-2 rounded border border-green-200">
              <Shield className="w-3 h-3 inline mr-1" />
              All card information is encrypted and stored securely. Your primary card will be used for automatic payments.
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UniversalCardDetailsForm;
