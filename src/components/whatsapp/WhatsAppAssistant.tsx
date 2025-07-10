
import React, { useState } from 'react';
import { useWhatsAppShopping } from '@/hooks/useWhatsAppShopping';
import ServiceAccessGate from '@/components/auth/ServiceAccessGate';
import WhatsAppShoppingHeader from './WhatsAppShoppingHeader';
import WhatsAppTabNavigation from './WhatsAppTabNavigation';
import WhatsAppCategoryGrid from './WhatsAppCategoryGrid';
import WhatsAppProductsList from './WhatsAppProductsList';
import WhatsAppCart from './WhatsAppCart';
import WhatsAppLanguageSelector from './WhatsAppLanguageSelector';
import WhatsAppPaymentProcessor from './WhatsAppPaymentProcessor';
import WhatsAppReceiptGenerator from './WhatsAppReceiptGenerator';
import { CreditCard, X, Minimize2 } from 'lucide-react';

const WhatsAppAssistant = () => {
  const [activeTab, setActiveTab] = useState('shop');
  const [activeCategory, setActiveCategory] = useState('airtime');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  
  const {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    getCartTotal,
    getCartCount,
    processCheckout,
    completePayment,
    sendWhatsAppReceipt,
    isProcessing,
    isAuthenticated,
    currentUser,
    selectedLanguage,
    setSelectedLanguage,
    showPaymentProcessor,
    setShowPaymentProcessor,
    showReceipt,
    setShowReceipt,
    lastTransaction
  } = useWhatsAppShopping();

  const handleExitToHome = () => {
    window.location.href = '/';
  };

  const handleNavigateToRegistration = () => {
    window.location.href = '/portal?tab=registration';
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleClose = () => {
    setIsClosed(true);
  };

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    setShowLanguageSelector(false);
  };

  const handlePaymentComplete = async (paymentData: any) => {
    const success = await completePayment(paymentData);
    if (success) {
      // Receipt will be shown via state
    }
  };

  const handleSendToWhatsApp = () => {
    if (lastTransaction) {
      sendWhatsAppReceipt(lastTransaction);
    }
  };

  const handleDownloadReceipt = () => {
    // Implementation for downloading receipt as PDF/image
    console.log('Download receipt functionality');
  };

  if (isClosed) {
    return null;
  }

  // Show language selector on first visit or when requested
  if (showLanguageSelector) {
    return (
      <div className="bg-white rounded-t-3xl overflow-hidden flex flex-col h-[600px] p-6">
        <WhatsAppLanguageSelector 
          onLanguageSelect={handleLanguageSelect}
          currentLanguage={selectedLanguage}
        />
      </div>
    );
  }

  // Show payment processor
  if (showPaymentProcessor && currentUser) {
    return (
      <div className="bg-white rounded-t-3xl overflow-hidden flex flex-col h-[600px] p-6">
        <WhatsAppPaymentProcessor 
          items={cart}
          total={getCartTotal()}
          customerData={currentUser}
          onPaymentComplete={handlePaymentComplete}
          onBack={() => setShowPaymentProcessor(false)}
          language={selectedLanguage}
        />
      </div>
    );
  }

  // Show receipt
  if (showReceipt && lastTransaction) {
    return (
      <div className="bg-white rounded-t-3xl overflow-hidden flex flex-col h-[600px] p-6">
        <WhatsAppReceiptGenerator 
          receiptData={lastTransaction}
          onSendToWhatsApp={handleSendToWhatsApp}
          onDownload={handleDownloadReceipt}
          onClose={() => {
            setShowReceipt(false);
            setActiveTab('shop');
          }}
        />
      </div>
    );
  }

  const products = [
    {
      id: '1',
      name: 'R10 Airtime',
      type: 'airtime',
      network: 'All Networks',
      amount: '10',
      price: 10,
      category: 'airtime',
      icon: <CreditCard className="w-6 h-6" />,
      description: 'All Networks • R10',
      popular: false
    },
    {
      id: '2',
      name: 'R20 Airtime',
      type: 'airtime',
      network: 'All Networks',
      amount: '20',
      price: 20,
      category: 'airtime',
      icon: <CreditCard className="w-6 h-6" />,
      description: 'All Networks • R20',
      popular: true
    },
    {
      id: '3',
      name: 'R50 Airtime',
      type: 'airtime',
      network: 'All Networks',
      amount: '50',
      price: 50,
      category: 'airtime',
      icon: <CreditCard className="w-6 h-6" />,
      description: 'All Networks • R50',
      popular: false
    }
  ];

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      handleNavigateToRegistration();
      return;
    }
    
    const success = await processCheckout();
    if (success) {
      // Payment processor will be shown via state
    }
  };

  const protectedAddToCart = (product: any) => {
    if (!isAuthenticated) {
      handleNavigateToRegistration();
      return;
    }
    addToCart(product);
  };

  return (
    <div className="bg-white rounded-t-3xl overflow-hidden flex flex-col h-[600px]">
      <WhatsAppShoppingHeader 
        isAuthenticated={isAuthenticated}
        onExit={handleExitToHome}
        onMinimize={handleMinimize}
        onClose={handleClose}
        isMinimized={isMinimized}
      />
      
      {!isMinimized && (
        <>
          <WhatsAppTabNavigation
            activeTab={activeTab}
            onTabChange={setActiveTab}
            cartCount={getCartCount()}
          />

          {activeTab === 'shop' && (
            <ServiceAccessGate
              serviceName="WhatsApp shopping services"
              onNavigateToRegistration={handleNavigateToRegistration}
              isAuthenticated={isAuthenticated}
            >
              <WhatsAppCategoryGrid 
                activeCategory={activeCategory} 
                onCategoryChange={setActiveCategory} 
              />
              <WhatsAppProductsList 
                products={products} 
                activeCategory={activeCategory} 
                onAddToCart={protectedAddToCart} 
              />
            </ServiceAccessGate>
          )}

          {activeTab === 'cart' && (
            <div className="flex-1">
              {isAuthenticated ? (
                <WhatsAppCart 
                  items={cart}
                  onUpdateQuantity={updateQuantity}
                  onRemoveItem={removeFromCart}
                  onCheckout={handleCheckout}
                  onBackToShopping={() => setActiveTab('shop')}
                  isProcessing={isProcessing}
                />
              ) : (
                <ServiceAccessGate
                  serviceName="shopping cart"
                  onNavigateToRegistration={handleNavigateToRegistration}
                  isAuthenticated={false}
                >
                  <div className="text-center p-8">
                    <p>Your cart is empty</p>
                  </div>
                </ServiceAccessGate>
              )}
            </div>
          )}

          {activeTab === 'chat' && (
            <div className="flex-1 p-4 text-center">
              <div className="text-6xl mb-4">💬</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Chat Support</h3>
              <p className="text-gray-600">
                Chat support coming soon! For now, use our shopping interface to make purchases.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default WhatsAppAssistant;
