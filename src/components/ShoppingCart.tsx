import React, { useState, useEffect } from 'react';
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

  // Hide footer and navigation elements when cart is open for maximum shopping visibility
  useEffect(() => {
    const elementsToHide = [
      'footer',
      '.homepage-button',
      '.return-home-button',
      '.back-to-home',
      '.navigation-home',
      '[data-testid="home-button"]',
      '[aria-label*="home"]',
      '[aria-label*="Homepage"]',
      'nav .home-link',
      '.header-home-link'
    ];

    const hiddenElements: HTMLElement[] = [];

    elementsToHide.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        const htmlElement = element as HTMLElement;
        if (htmlElement && htmlElement.style.display !== 'none') {
          // Store original display value
          htmlElement.dataset.originalDisplay = htmlElement.style.display || 'block';
          htmlElement.style.display = 'none';
          htmlElement.style.transition = 'opacity 0.3s ease-out';
          hiddenElements.push(htmlElement);
        }
      });
    });

    // Hide any background overlays or images that might interfere
    const backgroundElements = document.querySelectorAll('.background-overlay, .hero-background, .page-background');
    backgroundElements.forEach(element => {
      const htmlElement = element as HTMLElement;
      if (htmlElement) {
        htmlElement.dataset.originalOpacity = htmlElement.style.opacity || '1';
        htmlElement.style.opacity = '0.1';
        htmlElement.style.transition = 'opacity 0.3s ease-out';
        hiddenElements.push(htmlElement);
      }
    });

    // Cleanup function to restore elements when cart closes
    return () => {
      hiddenElements.forEach(element => {
        if (element.dataset.originalDisplay) {
          element.style.display = element.dataset.originalDisplay;
          delete element.dataset.originalDisplay;
        } else {
          element.style.display = 'block';
        }
        
        if (element.dataset.originalOpacity) {
          element.style.opacity = element.dataset.originalOpacity;
          delete element.dataset.originalOpacity;
        }
      });
    };
  }, []);

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
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-3 z-50 backdrop-blur-sm">
      <Card className="w-full max-w-md max-h-[95vh] overflow-y-auto bg-white shadow-2xl">
        <CartHeader 
          onClose={onClose} 
          currentUser={currentUser}
          isVendor={isVendor}
        />

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
            hasAcceptedTerms={acceptedSATerms}
            onPurchase={handlePurchase}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ShoppingCart;
