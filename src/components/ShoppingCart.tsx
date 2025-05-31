
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CartItem } from '@/types/deals';
import { useShoppingCart } from '@/hooks/useShoppingCart';
import { usePhoneValidation } from '@/hooks/usePhoneValidation';
import CartHeader from '@/components/cart/CartHeader';
import CartItems from '@/components/cart/CartItems';
import UserTypeIndicator from '@/components/cart/UserTypeIndicator';
import PurchaseModeSelector from '@/components/cart/PurchaseModeSelector';
import StreamlinedRecipientDetails from '@/components/cart/StreamlinedRecipientDetails';
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
    if (!acceptedSATerms) {
      return;
    }

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
    if (validationError && !acceptedUnknownNumber) {
      acceptUnknownNumberTerms();
    }
  };

  const isPurchaseDisabled = isProcessing || 
    !acceptedSATerms ||
    cartItems.length === 0;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-3 z-50">
      <Card className="w-full max-w-md max-h-[95vh] overflow-y-auto bg-white">
        <CartHeader onClose={onClose} />

        <CardContent className="space-y-4 p-4">
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

          <StreamlinedRecipientDetails
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
            onPurchase={handlePurchase}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ShoppingCart;
