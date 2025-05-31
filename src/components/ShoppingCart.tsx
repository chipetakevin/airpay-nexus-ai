
import React from 'react';
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
    calculateTotals,
    processPurchase
  } = useShoppingCart(initialDeal);

  const {
    detectedNetwork,
    isValidating,
    validationError,
    validatePhoneNumber
  } = usePhoneValidation();

  const { total, profitSharing } = calculateTotals();

  const handlePurchase = async () => {
    const success = await processPurchase(validationError, detectedNetwork);
    if (success) {
      onClose();
    }
  };

  const handlePhoneValidation = (phone: string) => {
    validatePhoneNumber(phone, cartItems);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <CartHeader onClose={onClose} />

        <CardContent className="space-y-6">
          <CartItems 
            cartItems={cartItems} 
            onClearCart={() => setCartItems([])} 
          />

          <UserTypeIndicator 
            isVendor={isVendor} 
            currentUser={currentUser} 
          />

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
            onRecipientDataChange={setRecipientData}
            onCustomerPhoneChange={setCustomerPhone}
            onPhoneValidation={handlePhoneValidation}
          />

          <OrderSummary
            total={total}
            isVendor={isVendor}
            purchaseMode={purchaseMode}
            profitSharing={profitSharing}
          />

          <PurchaseButton
            isProcessing={isProcessing}
            validationError={validationError}
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
