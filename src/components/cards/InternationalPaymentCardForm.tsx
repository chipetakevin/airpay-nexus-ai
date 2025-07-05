import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Shield, Globe, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface InternationalPaymentCardFormProps {
  onCardAdded: (cardData: any) => void;
  userId: string;
  oneCardAccountId: string;
}

const InternationalPaymentCardForm: React.FC<InternationalPaymentCardFormProps> = ({
  onCardAdded,
  userId,
  oneCardAccountId
}) => {
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    cardType: '',
    cardBrand: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    cardholderName: '',
    billingCountry: 'ZA',
    billingAddress: {
      street: '',
      city: '',
      province: '',
      postalCode: '',
      country: 'ZA'
    },
    isPrimary: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cardTypes = [
    { value: 'visa', label: 'Visa', icon: '💳' },
    { value: 'mastercard', label: 'Mastercard', icon: '💳' },
    { value: 'american_express', label: 'American Express', icon: '💳' },
    { value: 'diners_club', label: 'Diners Club', icon: '💳' },
    { value: 'discovery', label: 'Discovery', icon: '💳' },
    { value: 'jcb', label: 'JCB', icon: '💳' }
  ];

  const countries = [
    { value: 'ZA', label: 'South Africa' },
    { value: 'US', label: 'United States' },
    { value: 'GB', label: 'United Kingdom' },
    { value: 'CA', label: 'Canada' },
    { value: 'AU', label: 'Australia' },
    { value: 'DE', label: 'Germany' },
    { value: 'FR', label: 'France' },
    { value: 'NL', label: 'Netherlands' },
    { value: 'BE', label: 'Belgium' },
    { value: 'IT', label: 'Italy' },
    { value: 'ES', label: 'Spain' },
    { value: 'BR', label: 'Brazil' },
    { value: 'IN', label: 'India' },
    { value: 'SG', label: 'Singapore' },
    { value: 'JP', label: 'Japan' }
  ];

  const detectCardType = (cardNumber: string) => {
    const number = cardNumber.replace(/\s/g, '');
    
    // Visa
    if (/^4/.test(number)) {
      return { type: 'visa', brand: 'Visa' };
    }
    // Mastercard
    if (/^5[1-5]/.test(number) || /^2[2-7]/.test(number)) {
      return { type: 'mastercard', brand: 'Mastercard' };
    }
    // American Express
    if (/^3[47]/.test(number)) {
      return { type: 'american_express', brand: 'American Express' };
    }
    // Diners Club
    if (/^3[0689]/.test(number)) {
      return { type: 'diners_club', brand: 'Diners Club' };
    }
    // Discover
    if (/^6/.test(number)) {
      return { type: 'discovery', brand: 'Discover' };
    }
    // JCB
    if (/^35/.test(number)) {
      return { type: 'jcb', brand: 'JCB' };
    }

    return { type: '', brand: '' };
  };

  const formatCardNumber = (value: string) => {
    const number = value.replace(/\s/g, '').replace(/[^0-9]/g, '');
    const groups = number.match(/.{1,4}/g);
    return groups ? groups.join(' ').substr(0, 19) : number;
  };

  const handleInputChange = (field: string, value: string) => {
    if (field === 'cardNumber') {
      const formatted = formatCardNumber(value);
      const detected = detectCardType(formatted);
      
      setFormData(prev => ({
        ...prev,
        [field]: formatted,
        cardType: detected.type,
        cardBrand: detected.brand
      }));
    } else if (field.startsWith('billingAddress.')) {
      const addressField = field.split('.')[1];
      setFormData(prev => ({
        ...prev,
        billingAddress: {
          ...prev.billingAddress,
          [addressField]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.cardNumber.replace(/\s/g, '')) {
      newErrors.cardNumber = 'Card number is required';
    } else if (formData.cardNumber.replace(/\s/g, '').length < 13) {
      newErrors.cardNumber = 'Invalid card number';
    }

    if (!formData.expiryMonth) {
      newErrors.expiryMonth = 'Expiry month is required';
    }

    if (!formData.expiryYear) {
      newErrors.expiryYear = 'Expiry year is required';
    }

    if (!formData.cvv) {
      newErrors.cvv = 'CVV is required';
    } else if (formData.cvv.length < 3) {
      newErrors.cvv = 'Invalid CVV';
    }

    if (!formData.cardholderName.trim()) {
      newErrors.cardholderName = 'Cardholder name is required';
    }

    if (!formData.billingAddress.street.trim()) {
      newErrors['billingAddress.street'] = 'Billing address is required';
    }

    if (!formData.billingAddress.city.trim()) {
      newErrors['billingAddress.city'] = 'City is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Please fix the errors",
        description: "Check all required fields and try again.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const cardData = {
        userId,
        oneCardAccountId,
        cardType: formData.cardType,
        cardBrand: formData.cardBrand,
        lastFourDigits: formData.cardNumber.slice(-4),
        expiryMonth: parseInt(formData.expiryMonth),
        expiryYear: parseInt(formData.expiryYear),
        cardholderName: formData.cardholderName,
        billingCountry: formData.billingCountry,
        billingAddress: formData.billingAddress,
        isPrimary: formData.isPrimary
      };

      await onCardAdded(cardData);

      // Reset form
      setFormData({
        cardType: '',
        cardBrand: '',
        cardNumber: '',
        expiryMonth: '',
        expiryYear: '',
        cvv: '',
        cardholderName: '',
        billingCountry: 'ZA',
        billingAddress: {
          street: '',
          city: '',
          province: '',
          postalCode: '',
          country: 'ZA'
        },
        isPrimary: false
      });

    } catch (error) {
      console.error('Failed to add payment card:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-blue-200 bg-blue-50/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-800">
          <CreditCard className="w-5 h-5" />
          Add International Payment Card
        </CardTitle>
        <div className="flex items-center gap-2 text-sm text-blue-600">
          <Shield className="w-4 h-4" />
          <span>PCI-DSS Compliant • AES-256 Encrypted</span>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Card Number */}
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number *</Label>
            <div className="relative">
              <Input
                id="cardNumber"
                value={formData.cardNumber}
                onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                placeholder="1234 5678 9012 3456"
                className={`font-mono ${errors.cardNumber ? 'border-red-500' : ''}`}
                maxLength={19}
              />
              {formData.cardBrand && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Badge variant="outline" className="text-xs">
                    {formData.cardBrand}
                  </Badge>
                </div>
              )}
            </div>
            {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber}</p>}
          </div>

          {/* Expiry and CVV */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiryMonth">Month *</Label>
              <Select value={formData.expiryMonth} onValueChange={(value) => handleInputChange('expiryMonth', value)}>
                <SelectTrigger className={errors.expiryMonth ? 'border-red-500' : ''}>
                  <SelectValue placeholder="MM" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => {
                    const month = (i + 1).toString().padStart(2, '0');
                    return (
                      <SelectItem key={month} value={month}>
                        {month}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              {errors.expiryMonth && <p className="text-red-500 text-xs">{errors.expiryMonth}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="expiryYear">Year *</Label>
              <Select value={formData.expiryYear} onValueChange={(value) => handleInputChange('expiryYear', value)}>
                <SelectTrigger className={errors.expiryYear ? 'border-red-500' : ''}>
                  <SelectValue placeholder="YYYY" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 15 }, (_, i) => {
                    const year = (new Date().getFullYear() + i).toString();
                    return (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              {errors.expiryYear && <p className="text-red-500 text-xs">{errors.expiryYear}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="cvv">CVV *</Label>
              <Input
                id="cvv"
                type="password"
                value={formData.cvv}
                onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, '').substring(0, 4))}
                placeholder="123"
                className={`font-mono ${errors.cvv ? 'border-red-500' : ''}`}
                maxLength={4}
              />
              {errors.cvv && <p className="text-red-500 text-xs">{errors.cvv}</p>}
            </div>
          </div>

          {/* Cardholder Name */}
          <div className="space-y-2">
            <Label htmlFor="cardholderName">Cardholder Name *</Label>
            <Input
              id="cardholderName"
              value={formData.cardholderName}
              onChange={(e) => handleInputChange('cardholderName', e.target.value.toUpperCase())}
              placeholder="JOHN DOE"
              className={errors.cardholderName ? 'border-red-500' : ''}
            />
            {errors.cardholderName && <p className="text-red-500 text-sm">{errors.cardholderName}</p>}
          </div>

          {/* Billing Country */}
          <div className="space-y-2">
            <Label htmlFor="billingCountry">Billing Country *</Label>
            <Select value={formData.billingCountry} onValueChange={(value) => handleInputChange('billingCountry', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country.value} value={country.value}>
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      {country.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Billing Address */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Billing Address *</Label>
            
            <Input
              placeholder="Street Address"
              value={formData.billingAddress.street}
              onChange={(e) => handleInputChange('billingAddress.street', e.target.value)}
              className={errors['billingAddress.street'] ? 'border-red-500' : ''}
            />
            {errors['billingAddress.street'] && <p className="text-red-500 text-sm">{errors['billingAddress.street']}</p>}
            
            <div className="grid grid-cols-2 gap-3">
              <Input
                placeholder="City"
                value={formData.billingAddress.city}
                onChange={(e) => handleInputChange('billingAddress.city', e.target.value)}
                className={errors['billingAddress.city'] ? 'border-red-500' : ''}
              />
              <Input
                placeholder="Province/State"
                value={formData.billingAddress.province}
                onChange={(e) => handleInputChange('billingAddress.province', e.target.value)}
              />
            </div>
            {errors['billingAddress.city'] && <p className="text-red-500 text-sm">{errors['billingAddress.city']}</p>}
            
            <Input
              placeholder="Postal Code"
              value={formData.billingAddress.postalCode}
              onChange={(e) => handleInputChange('billingAddress.postalCode', e.target.value)}
            />
          </div>

          {/* Primary Card Option */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isPrimary"
              checked={formData.isPrimary}
              onChange={(e) => handleInputChange('isPrimary', e.target.checked.toString())}
              className="w-4 h-4"
            />
            <Label htmlFor="isPrimary" className="text-sm">
              Make this my primary payment method
            </Label>
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Securing Card...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Add Secure Payment Card
              </div>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default InternationalPaymentCardForm;