
import React, { useState, useEffect } from 'react';
import { CardContent } from '@/components/ui/card';
import { CartItem } from '@/types/deals';
import { useShoppingCart } from '@/hooks/useShoppingCart';
import { usePhoneValidation } from '@/hooks/usePhoneValidation';
import { useRegistrationGuard } from '@/hooks/useRegistrationGuard';
import CartItems from './CartItems';
import UserTypeIndicator from './UserTypeIndicator';
import PurchaseModeSelector from './PurchaseModeSelector';
import EnhancedStreamlinedRecipientDetails from './EnhancedStreamlinedRecipientDetails';
import OrderSummary from './OrderSummary';
import PurchaseButton from './PurchaseButton';

interface ShoppingCartContentProps {
  initialDeal?: CartItem;
}

const ShoppingCartContent = ({ initialDeal }: ShoppingCartContentProps) => {
  const [acceptedSATerms, setAcceptedSATerms] = useState(false);
  const { getStoredPhoneNumber, userProfile } = useRegistrationGuard();

  const {
    cartItems,
    setCartItems,
    purchaseMode,
    setPurchaseMode,
    recipientData,
    setRecipientData,
    customerPhone,
    setCustomerPhone,
    isProcessing,
    currentUser,
    isVendor,
    isAuthenticated,
    calculateTotals,
    processPurchase
  } = useShoppingCart(initialDeal);

  // Auto-fill customer phone from profile
  useEffect(() => {
    const storedPhone = getStoredPhoneNumber();
    if (storedPhone && !customerPhone) {
      setCustomerPhone(storedPhone);
    }
  }, [getStoredPhoneNumber, customerPhone, setCustomerPhone]);

  const {
    detectedNetwork,
    isValidating,
    validationError,
    acceptedUnknownNumber,
    requiresTermsAcceptance,
    validatePhoneNumber,
    acceptUnknownNumberTerms
  } = usePhoneValidation();

  const { total, profitSharing } = calculateTotals();

  const handlePurchase = async () => {
    if (!acceptedSATerms) {
      return;
    }

    const effectiveValidationError = acceptedUnknownNumber ? '' : validationError;
    
    // Process purchase - receipts will ONLY be generated after payment completion
    console.log('🔄 Starting purchase process...');
    const success = await processPurchase(effectiveValidationError, detectedNetwork);
    
    // NO manual receipt generation here - it's handled in processTransaction ONLY after payment success
    if (success) {
      console.log('✅ Purchase completed successfully - receipts sent automatically');
      // Cart will be closed by parent component
    } else {
      console.log('❌ Purchase failed - no receipts generated');
    }
  };

  const handlePhoneValidation = (phone: string) => {
    validatePhoneNumber(phone, cartItems);
  };

  const handleAcceptSATerms = () => {
    setAcceptedSATerms(true);
    if (validationError && !acceptedUnknownNumber) {
      acceptUnknownNumberTerms();
    }
  };

  const isPurchaseDisabled = isProcessing || 
    !acceptedSATerms ||
    cartItems.length === 0;

  return (
    <CardContent className="space-y-4 p-4 bg-white">
      <CartItems 
        cartItems={cartItems} 
        onClearCart={() => setCartItems([])} 
      />

      {isVendor && (
        <UserTypeIndicator 
          isVendor={isVendor} 
          currentUser={currentUser} 
        />
      )}

      <PurchaseModeSelector 
        purchaseMode={purchaseMode} 
        onModeChange={setPurchaseMode} 
      />

      <EnhancedStreamlinedRecipientDetails
        purchaseMode={purchaseMode}
        recipientData={recipientData}
        customerPhone={customerPhone}
        detectedNetwork={detectedNetwork}
        validationError={validationError}
        acceptedSATerms={acceptedSATerms}
        cartItems={cartItems}
        onRecipientDataChange={setRecipientData}
        onCustomerPhoneChange={setCustomerPhone}
        onPhoneValidation={handlePhoneValidation}
        onAcceptSATerms={handleAcceptSATerms}
      />

      <OrderSummary
        total={total}
        isVendor={isVendor}
        purchaseMode={purchaseMode}
        profitSharing={profitSharing}
      />

      <PurchaseButton
        isProcessing={isProcessing}
        validationError={isPurchaseDisabled ? '' : ''}
        cartItemsCount={cartItems.length}
        currentUser={currentUser}
        total={total}
        hasAcceptedTerms={acceptedSATerms}
        onPurchase={handlePurchase}
      />
    </CardContent>
  );
};

export default ShoppingCartContent;
