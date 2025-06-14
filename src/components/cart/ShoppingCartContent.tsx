
import React, { useState } from 'react';
import { CardContent } from '@/components/ui/card';
import { CartItem } from '@/types/deals';
import { useShoppingCart } from '@/hooks/useShoppingCart';
import { usePhoneValidation } from '@/hooks/usePhoneValidation';
import { useAutoReceiptGenerator } from '@/components/receipts/AutoReceiptGenerator';
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
  const { sendReceiptNotifications } = useAutoReceiptGenerator();

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
    
    // Enhanced purchase processing with automated receipt delivery
    const success = await processPurchase(effectiveValidationError, detectedNetwork);
    
    if (success) {
      // Automatically generate and send receipts via WhatsApp and Email
      const receiptData = {
        sessionId: `DM${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
        customerPhone: customerPhone,
        customerEmail: currentUser?.email || '',
        recipientPhone: purchaseMode === 'self' ? customerPhone : recipientData.phone,
        recipientName: purchaseMode === 'self' ? 'Self' : recipientData.name,
        deal: {
          network: cartItems[0]?.network || detectedNetwork,
          amount: cartItems[0]?.amount || 0,
          price: total,
          type: cartItems[0]?.dealType || 'airtime'
        },
        timestamp: new Date().toISOString(),
        paymentMethod: 'card' as const
      };

      // Send automated receipts
      await sendReceiptNotifications(receiptData);
      
      // Cart will be closed by parent component
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
