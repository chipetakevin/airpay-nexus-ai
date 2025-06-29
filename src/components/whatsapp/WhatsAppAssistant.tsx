
import React, { useState } from 'react';
import { useWhatsAppShopping } from '@/hooks/useWhatsAppShopping';
import WhatsAppShoppingHeader from './WhatsAppShoppingHeader';
import WhatsAppTabNavigation from './WhatsAppTabNavigation';
import WhatsAppCategoryGrid from './WhatsAppCategoryGrid';
import WhatsAppProductsList from './WhatsAppProductsList';
import WhatsAppCart from './WhatsAppCart';
import { CreditCard } from 'lucide-react';

const WhatsAppAssistant = () => {
  const [activeTab, setActiveTab] = useState('shop');
  const [activeCategory, setActiveCategory] = useState('airtime');
  
  const {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    getCartTotal,
    getCartCount,
    processCheckout,
    isProcessing,
    isAuthenticated
  } = useWhatsAppShopping();

  const handleExitToDeals = () => {
    window.location.href = '/ai-powered-deals';
  };

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
    const success = await processCheckout();
    if (success) {
      // Auto-switch back to shop tab after successful checkout
      setTimeout(() => {
        setActiveTab('shop');
      }, 3000);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white max-w-md mx-auto">
      <WhatsAppShoppingHeader 
        isAuthenticated={isAuthenticated}
        onExit={handleExitToDeals}
      />
      
      <WhatsAppTabNavigation 
        activeTab={activeTab} 
        cartCount={getCartCount()}
        onTabChange={setActiveTab} 
      />
      
      {activeTab === 'shop' && (
        <>
          <WhatsAppCategoryGrid 
            activeCategory={activeCategory} 
            onCategoryChange={setActiveCategory} 
          />
          <WhatsAppProductsList 
            products={products} 
            activeCategory={activeCategory} 
            onAddToCart={addToCart} 
          />
        </>
      )}

      {activeTab === 'cart' && (
        <div className="flex-1 p-4">
          <WhatsAppCart 
            items={cart}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeFromCart}
            onCheckout={handleCheckout}
            onBackToShopping={() => setActiveTab('shop')}
            isProcessing={isProcessing}
          />
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
    </div>
  );
};

export default WhatsAppAssistant;
