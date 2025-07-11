
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useMobileAuth } from '@/hooks/useMobileAuth';
import PaymentHeader from './payment/PaymentHeader';
import OrderSummary from './payment/OrderSummary';
import PaymentForm from './payment/PaymentForm';
import SecurityInfo from './payment/SecurityInfo';
import { 
  detectCardType, 
  validatePaymentForm 
} from './payment/PaymentValidation';
import { 
  formatCardNumber, 
  formatExpiryDate, 
  formatPhoneNumber 
} from './payment/PaymentFormatters';
import { processPayment } from './payment/PaymentProcessor';
import { useTransactionProcessing } from '@/hooks/useTransactionProcessing';
import { CartItem as DealCartItem } from '@/types/deals';

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
  const { processTransaction } = useTransactionProcessing();
  
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
    const formatted = formatExpiryDate(value, toast);
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

  // Handle generic input changes
  const handleInputChange = (field: string, value: string) => {
    switch (field) {
      case 'cardholderName':
        setCardholderName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'phone':
        setPhone(formatPhoneNumber(value));
        break;
      case 'address':
        setAddress(value);
        getAddressSuggestions(value);
        break;
      case 'city':
        setCity(value);
        break;
      case 'postalCode':
        setPostalCode(value);
        break;
    }
  };

  // Handle address suggestion click
  const handleAddressSuggestionClick = (suggestion: string) => {
    const parts = suggestion.split(', ');
    setAddress(parts[0]);
    setCity(parts[1] || '');
    setAddressSuggestions([]);
  };

  // Validate and move to next step
  const handleNextStep = () => {
    const formData = {
      cardNumber,
      expiryDate,
      cvv,
      cardholderName,
      email,
      phone,
      address,
      city,
      postalCode
    };
    
    const validationErrors = validatePaymentForm(formData, currentStep);
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length === 0) {
      setCurrentStep(2);
    }
  };

  // Handle form submission with full transaction processing
  const handleSubmit = async () => {
    const formData = {
      cardNumber,
      expiryDate,
      cvv,
      cardholderName,
      email,
      phone,
      address,
      city,
      postalCode,
      cardType,
      amount: total, // Add the total amount to form data
      totalAmount: total // Also add as totalAmount for compatibility
    };
    
    const validationErrors = validatePaymentForm(formData, currentStep);
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length === 0) {
      setIsProcessing(true);
      try {
        // First process payment
        const paymentResult = await processPayment(formData, saveCard, toast, onBack);
        
        if (paymentResult?.success) {
          // Then activate full transaction processing
          const userType = 'customer'; // Default to customer
          const customerPhone = phone || '0123456789';
          
          // Convert cart items to match expected type
          const dealCartItems: DealCartItem[] = cartItems.map(item => ({
            id: item.id.toString(),
            network: 'MTN',
            amount: item.price,
            originalPrice: item.price,
            discountedPrice: item.price,
            discount: 0,
            vendor: 'Platform Vendor',
            dealType: 'airtime',
            bonus: '5% cashback',
            networkPrice: item.price * 1.1,
            markupAmount: item.price * 0.05
          }));
          
          // Process transaction with mock data for demonstration
          const recipientData = {
            name: cardholderName,
            phone: customerPhone,
            relationship: 'self'
          };
          
          const profitSharing = {
            customerCashback: total * 0.02, // 2% cashback
            adminProfit: total * 0.01,      // 1% admin fee
            vendorProfit: total * 0.05      // 5% vendor commission
          };
          
          await processTransaction(
            dealCartItems,
            currentUser,
            customerPhone,
            'self',
            recipientData,
            userType as 'customer' | 'vendor' | 'admin',
            profitSharing,
            total,
            total * 1.1, // Mock network cost
            'MTN'
          );
        }
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const formData = {
    cardNumber,
    expiryDate,
    cvv,
    cardholderName,
    email,
    phone,
    address,
    city,
    postalCode
  };

  return (
    <div className="h-full flex flex-col">
      <PaymentHeader onBack={onBack} />
      
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <OrderSummary cartItems={cartItems} />
        
        <PaymentForm
          currentStep={currentStep}
          formData={formData}
          errors={errors}
          showCvv={showCvv}
          saveCard={saveCard}
          addressSuggestions={addressSuggestions}
          onCardNumberChange={handleCardNumberChange}
          onExpiryDateChange={handleExpiryDateChange}
          onCvvChange={handleCvvChange}
          onInputChange={handleInputChange}
          onToggleCvv={() => setShowCvv(!showCvv)}
          onToggleSaveCard={setSaveCard}
          onAddressSuggestionClick={handleAddressSuggestionClick}
          onNextStep={handleNextStep}
          onPrevStep={() => setCurrentStep(1)}
          onSubmit={handleSubmit}
          isProcessing={isProcessing}
          total={total}
          getCardIcon={getCardIcon}
          cardType={cardType}
        />
        
        <SecurityInfo />
      </div>
    </div>
  );
};

export default EnhancedPaymentProcessor;
