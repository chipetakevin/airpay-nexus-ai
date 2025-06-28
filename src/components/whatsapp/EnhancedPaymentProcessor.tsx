import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft, CreditCard, Shield, Check, X, 
  AlertCircle, MapPin, Phone, User, Mail,
  Eye, EyeOff, Loader2, Smartphone
} from 'lucide-react';
import { useMobileAuth } from '@/hooks/useMobileAuth';

interface Product {
  id: number;
  name: string;
  price: number;
  icon: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface PaymentProcessorProps {
  product?: Product | null;
  cartItems: CartItem[];
  onBack: () => void;
}

const EnhancedPaymentProcessor = ({ product, cartItems, onBack }: PaymentProcessorProps) => {
  const { toast } = useToast();
  const { currentUser } = useMobileAuth();
  
  // Form states
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  
  // UI states
  const [cardType, setCardType] = useState('');
  const [showCvv, setShowCvv] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [saveCard, setSaveCard] = useState(false);
  const [addressSuggestions, setAddressSuggestions] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  
  // Validation states
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Card type detection
  const detectCardType = (number: string) => {
    const patterns = {
      visa: /^4/,
      mastercard: /^5[1-5]|^2[2-7]/,
      amex: /^3[47]/,
      discover: /^6(?:011|5)/
    };
    
    for (const [type, pattern] of Object.entries(patterns)) {
      if (pattern.test(number)) {
        return type;
      }
    }
    return '';
  };

  // Luhn algorithm validation
  const validateCardNumber = (number: string) => {
    const cleanNumber = number.replace(/\s+/g, '');
    if (cleanNumber.length < 13 || cleanNumber.length > 19) return false;
    
    let sum = 0;
    let alternate = false;
    
    for (let i = cleanNumber.length - 1; i >= 0; i--) {
      let n = parseInt(cleanNumber.charAt(i), 10);
      
      if (alternate) {
        n *= 2;
        if (n > 9) n = (n % 10) + 1;
      }
      
      sum += n;
      alternate = !alternate;
    }
    
    return sum % 10 === 0;
  };

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const cleanValue = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = cleanValue.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return cleanValue;
    }
  };

  // Format expiry date
  const formatExpiryDate = (value: string) => {
    const cleanValue = value.replace(/\D/g, '');
    if (cleanValue.length >= 2) {
      const month = cleanValue.substring(0, 2);
      const year = cleanValue.substring(2, 4);
      
      // Validate month
      if (parseInt(month) > 12) {
        toast({
          title: "Invalid Month",
          description: "Please enter a valid month (01-12)",
          variant: "destructive"
        });
        return '';
      }
      
      return `${month}/${year}`;
    }
    return cleanValue;
  };

  // Auto-detect and format South African phone numbers
  const formatPhoneNumber = (value: string) => {
    let cleanValue = value.replace(/\D/g, '');
    
    // Remove leading zeros
    if (cleanValue.startsWith('0')) {
      cleanValue = cleanValue.substring(1);
    }
    
    // Add South African country code if not present
    if (!cleanValue.startsWith('27')) {
      cleanValue = '27' + cleanValue;
    }
    
    return '+' + cleanValue;
  };

  // Validate card holder name (first and last name required)
  const validateCardholderName = (name: string) => {
    const nameParts = name.trim().split(' ');
    return nameParts.length >= 2 && nameParts.every(part => part.length > 0);
  };

  // Mock address suggestions for South Africa
  const getAddressSuggestions = (query: string) => {
    if (query.length < 3) {
      setAddressSuggestions([]);
      return;
    }
    
    const mockSuggestions = [
      `${query} Street, Sandton, Johannesburg`,
      `${query} Road, Cape Town, Western Cape`,
      `${query} Avenue, Durban, KwaZulu-Natal`,
      `${query} Drive, Pretoria, Gauteng`,
      `${query} Close, Port Elizabeth, Eastern Cape`
    ];
    
    setAddressSuggestions(mockSuggestions.slice(0, 3));
  };

  // Handle card number input
  const handleCardNumberChange = (value: string) => {
    const formatted = formatCardNumber(value);
    setCardNumber(formatted);
    setCardType(detectCardType(formatted));
    
    // Auto-focus to expiry when card number is complete
    if (formatted.replace(/\s/g, '').length >= 16) {
      const expiryInput = document.getElementById('expiry-input') as HTMLInputElement;
      if (expiryInput) expiryInput.focus();
    }
  };

  // Handle expiry date input
  const handleExpiryDateChange = (value: string) => {
    const formatted = formatExpiryDate(value);
    setExpiryDate(formatted);
    
    // Auto-focus to CVV when expiry is complete
    if (formatted.length === 5) {
      const cvvInput = document.getElementById('cvv-input') as HTMLInputElement;
      if (cvvInput) cvvInput.focus();
    }
  };

  // Handle CVV input
  const handleCvvChange = (value: string) => {
    const cleanValue = value.replace(/\D/g, '');
    const maxLength = cardType === 'amex' ? 4 : 3;
    setCvv(cleanValue.substring(0, maxLength));
    
    // Auto-focus to name when CVV is complete
    if (cleanValue.length === maxLength) {
      const nameInput = document.getElementById('name-input') as HTMLInputElement;
      if (nameInput) nameInput.focus();
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!validateCardNumber(cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Invalid card number';
    }
    
    if (!expiryDate || expiryDate.length !== 5) {
      newErrors.expiryDate = 'Invalid expiry date';
    } else {
      const [month, year] = expiryDate.split('/');
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100;
      const currentMonth = currentDate.getMonth() + 1;
      
      if (parseInt(year) < currentYear || 
          (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
        newErrors.expiryDate = 'Card has expired';
      }
    }
    
    if (!cvv || cvv.length < 3) {
      newErrors.cvv = 'Invalid CVV';
    }
    
    if (!validateCardholderName(cardholderName)) {
      newErrors.cardholderName = 'Please enter first and last name as they appear on card';
    }
    
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!phone) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (currentStep === 2) {
      if (!address) newErrors.address = 'Address is required';
      if (!city) newErrors.city = 'City is required';
      if (!postalCode) newErrors.postalCode = 'Postal code is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Simulate payment processing
  const processPayment = async () => {
    if (!validateForm()) return;
    
    setIsProcessing(true);
    
    try {
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Simulate success/failure (90% success rate)
      const isSuccess = Math.random() > 0.1;
      
      if (isSuccess) {
        const transactionId = `TXN${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
        
        // Save card if enabled (only last 4 digits, no CVV)
        if (saveCard) {
          const maskedCard = {
            lastFour: cardNumber.replace(/\s/g, '').slice(-4),
            type: cardType,
            expiryMonth: expiryDate.split('/')[0],
            expiryYear: expiryDate.split('/')[1]
          };
          localStorage.setItem('savedCard', JSON.stringify(maskedCard));
        }
        
        toast({
          title: "Payment Successful! ✅",
          description: `Transaction ID: ${transactionId}. Your order will be processed shortly.`,
        });
        
        // Simulate email and WhatsApp confirmation
        setTimeout(() => {
          toast({
            title: "Confirmation Sent 📧",
            description: "Check your email and WhatsApp for order confirmation",
          });
        }, 1000);
        
        // Redirect back after success
        setTimeout(() => {
          onBack();
        }, 3000);
        
      } else {
        // Simulate various decline reasons
        const declineReasons = [
          'Insufficient funds',
          'Card declined by issuer',
          'Invalid card details',
          'Transaction limit exceeded',
          'Card has been blocked'
        ];
        
        const reason = declineReasons[Math.floor(Math.random() * declineReasons.length)];
        
        toast({
          title: "Payment Declined ❌",
          description: `Reason: ${reason}. Please try a different card or contact your bank.`,
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Payment Error ⚠️",
        description: "An error occurred while processing your payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Get card type icon
  const getCardIcon = () => {
    switch (cardType) {
      case 'visa': return '💳';
      case 'mastercard': return '💳';
      case 'amex': return '💳';
      case 'discover': return '💳';
      default: return '💳';
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header - Fixed text visibility */}
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

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Order Summary */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{item.icon}</span>
                  <div>
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-bold text-green-600">R{item.price * item.quantity}</p>
              </div>
            ))}
            <div className="border-t pt-3 flex justify-between items-center">
              <p className="font-bold">Total Amount:</p>
              <p className="text-xl font-bold text-green-600">R{total}</p>
            </div>
          </CardContent>
        </Card>

        {/* Payment Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Payment Details
              <Badge variant="outline" className="ml-auto">
                Step {currentStep} of 2
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentStep === 1 && (
              <>
                {/* Card Number */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Card Number {getCardIcon()}
                  </label>
                  <Input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) => handleCardNumberChange(e.target.value)}
                    className={errors.cardNumber ? 'border-red-500' : ''}
                    maxLength={19}
                  />
                  {cardType && (
                    <p className="text-xs text-green-600 mt-1 capitalize">
                      {cardType} detected
                    </p>
                  )}
                  {errors.cardNumber && (
                    <p className="text-xs text-red-500 mt-1">{errors.cardNumber}</p>
                  )}
                </div>

                {/* Expiry and CVV */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">Expiry Date</label>
                    <Input
                      id="expiry-input"
                      type="text"
                      placeholder="MM/YY"
                      value={expiryDate}
                      onChange={(e) => handleExpiryDateChange(e.target.value)}
                      className={errors.expiryDate ? 'border-red-500' : ''}
                      maxLength={5}
                    />
                    {errors.expiryDate && (
                      <p className="text-xs text-red-500 mt-1">{errors.expiryDate}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">CVV</label>
                    <div className="relative">
                      <Input
                        id="cvv-input"
                        type={showCvv ? 'text' : 'password'}
                        placeholder="123"
                        value={cvv}
                        onChange={(e) => handleCvvChange(e.target.value)}
                        className={errors.cvv ? 'border-red-500' : ''}
                        maxLength={cardType === 'amex' ? 4 : 3}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 h-auto"
                        onClick={() => setShowCvv(!showCvv)}
                      >
                        {showCvv ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                    {errors.cvv && (
                      <p className="text-xs text-red-500 mt-1">{errors.cvv}</p>
                    )}
                  </div>
                </div>

                {/* Cardholder Name */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Cardholder Name (as it appears on card)
                  </label>
                  <Input
                    id="name-input"
                    type="text"
                    placeholder="John Smith"
                    value={cardholderName}
                    onChange={(e) => setCardholderName(e.target.value)}
                    className={errors.cardholderName ? 'border-red-500' : ''}
                  />
                  {errors.cardholderName && (
                    <p className="text-xs text-red-500 mt-1">{errors.cardholderName}</p>
                  )}
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">Email Address</label>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={errors.email ? 'border-red-500' : ''}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone Number</label>
                    <Input
                      type="tel"
                      placeholder="+27 XX XXX XXXX"
                      value={phone}
                      onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
                      className={errors.phone ? 'border-red-500' : ''}
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>

                {/* Save Card Option */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="save-card"
                    checked={saveCard}
                    onChange={(e) => setSaveCard(e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="save-card" className="text-sm">
                    Save card for future purchases (secure)
                  </label>
                </div>

                <Button 
                  onClick={() => {
                    if (validateForm()) setCurrentStep(2);
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Continue to Billing Address
                  <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                </Button>
              </>
            )}

            {currentStep === 2 && (
              <>
                {/* Billing Address */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Street Address
                  </label>
                  <Input
                    type="text"
                    placeholder="Start typing your address..."
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                      getAddressSuggestions(e.target.value);
                    }}
                    className={errors.address ? 'border-red-500' : ''}
                  />
                  {addressSuggestions.length > 0 && (
                    <div className="mt-1 bg-white border rounded-md shadow-sm">
                      {addressSuggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                          onClick={() => {
                            const parts = suggestion.split(', ');
                            setAddress(parts[0]);
                            setCity(parts[1] || '');
                            setAddressSuggestions([]);
                          }}
                        >
                          {suggestion}
                        </div>
                      ))}
                    </div>
                  )}
                  {errors.address && (
                    <p className="text-xs text-red-500 mt-1">{errors.address}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">City</label>
                    <Input
                      type="text"
                      placeholder="Cape Town"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className={errors.city ? 'border-red-500' : ''}
                    />
                    {errors.city && (
                      <p className="text-xs text-red-500 mt-1">{errors.city}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Postal Code</label>
                    <Input
                      type="text"
                      placeholder="8001"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className={errors.postalCode ? 'border-red-500' : ''}
                    />
                    {errors.postalCode && (
                      <p className="text-xs text-red-500 mt-1">{errors.postalCode}</p>
                    )}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    variant="outline"
                    onClick={() => setCurrentStep(1)}
                    className="flex-1"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  <Button 
                    onClick={processPayment}
                    disabled={isProcessing}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Shield className="w-4 h-4 mr-2" />
                        Pay R{total}
                      </>
                    )}
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Security Info */}
        <div className="text-center text-xs text-gray-600 space-y-1">
          <p className="flex items-center justify-center gap-1">
            <Shield className="w-3 h-3" />
            256-bit SSL encryption • PCI DSS compliant
          </p>
          <p>Your payment information is secure and encrypted</p>
        </div>
      </div>
    </div>
  );
};

export default EnhancedPaymentProcessor;
