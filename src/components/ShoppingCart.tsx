
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CartItem } from '@/types/deals';
import { useShoppingCart } from '@/hooks/useShoppingCart';
import { usePhoneValidation } from '@/hooks/usePhoneValidation';
import CartHeader from '@/components/cart/CartHeader';
import CartItems from '@/components/cart/CartItems';
import UserTypeIndicator from '@/components/cart/UserTypeIndicator';
import PurchaseModeSelector from '@/components/cart/PurchaseModeSelector';
import RecipientDetails from '@/components/cart/RecipientDetails';
import OrderSummary from '@/components/cart/OrderSummary';
import PurchaseButton from '@/components/cart/PurchaseButton';

interface ShoppingCartProps {
  initialDeal?: CartItem;
  onClose: () => void;
}

const ShoppingCart = ({ initialDeal, onClose }: ShoppingCartProps) => {
  const [acceptedSATerms, setAcceptedSATerms] = useState(false);

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
    // Check if SA terms are accepted when required
    if (requiresTermsAcceptance && !acceptedSATerms) {
      return; // Don't proceed if terms not accepted
    }

    // Allow purchase if terms are accepted for unknown numbers
    const effectiveValidationError = acceptedUnknownNumber ? '' : validationError;
    const success = await processPurchase(effectiveValidationError, detectedNetwork);
    if (success) {
      onClose();
    }
  };

  const handlePhoneValidation = (phone: string) => {
    validatePhoneNumber(phone, cartItems);
  };

  const handleAcceptSATerms = () => {
    setAcceptedSATerms(true);
  };

  // Determine if purchase should be disabled
  const isPurchaseDisabled = isProcessing || 
    (validationError && !acceptedUnknownNumber) || 
    (requiresTermsAcceptance && !acceptedSATerms) ||
    cartItems.length === 0;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-2 sm:p-4 z-50">
      <Card className="w-full max-w-lg max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        <CartHeader onClose={onClose} />

        <CardContent className="space-y-4 sm:space-y-6 p-3 sm:p-6">
          <CartItems 
            cartItems={cartItems} 
            onClearCart={() => setCartItems([])} 
          />

          {/* Only show user type indicator for vendors, not authentication warnings */}
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

          <RecipientDetails
            purchaseMode={purchaseMode}
            recipientData={recipientData}
            customerPhone={customerPhone}
            currentUser={currentUser}
            detectedNetwork={detectedNetwork}
            isValidating={isValidating}
            validationError={validationError}
            acceptedUnknownNumber={acceptedUnknownNumber}
            requiresTermsAcceptance={requiresTermsAcceptance}
            acceptedSATerms={acceptedSATerms}
            cartItems={cartItems}
            onRecipientDataChange={setRecipientData}
            onCustomerPhoneChange={setCustomerPhone}
            onPhoneValidation={handlePhoneValidation}
            onAcceptUnknownTerms={acceptUnknownNumberTerms}
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
            validationError={isPurchaseDisabled ? 'Terms must be accepted' : ''}
            cartItemsCount={cartItems.length}
            currentUser={currentUser}
            total={total}
            onPurchase={handlePurchase}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ShoppingCart;
