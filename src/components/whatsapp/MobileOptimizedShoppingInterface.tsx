import React, { useState, useEffect } from 'react';
import { useMobileAuth } from '@/hooks/useMobileAuth';
import { useMobileProductData } from '@/hooks/useMobileProductData';
import EnhancedPaymentProcessor from './EnhancedPaymentProcessor';
import MobileShoppingHeader from './MobileShoppingHeader';
import MobileTabNavigation from './MobileTabNavigation';
import MobileProductCard from './MobileProductCard';
import MobileCart from './MobileCart';

interface Product {
  id: number;
  name: string;
  price: number;
  category: 'airtime' | 'data' | 'bundle' | 'gift';
  icon: string;
  description: string;
  features: string[];
  network?: string;
  validity?: string;
  popular?: boolean;
  discount?: number;
}

interface CartItem extends Product {
  quantity: number;
}

const MobileOptimizedShoppingInterface = () => {
  const { isAuthenticated } = useMobileAuth();
  const { getProductsByCategory } = useMobileProductData();
  const [activeTab, setActiveTab] = useState('featured');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleExitToDeals = () => {
    window.location.href = '/ai-powered-deals';
  };

  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setCartTotal(total);
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const quickCheckout = (product: Product) => {
    setSelectedProduct(product);
    setShowPayment(true);
  };

  const updateQuantity = (productId: number, change: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === productId) {
          const newQuantity = item.quantity + change;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const getCartCount = () => cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="max-w-md mx-auto bg-white rounded-3xl overflow-hidden shadow-2xl border-4 border-green-100">
      {showPayment ? (
        <EnhancedPaymentProcessor 
          product={selectedProduct}
          cartItems={selectedProduct ? [{ ...selectedProduct, quantity: 1 }] : cart}
          onBack={() => setShowPayment(false)}
        />
      ) : (
        <>
          <MobileShoppingHeader 
            isAuthenticated={isAuthenticated}
            onExit={handleExitToDeals}
          />

          <MobileTabNavigation 
            activeTab={activeTab}
            cartCount={getCartCount()}
            onTabChange={setActiveTab}
          />

          <div className="max-h-[70vh] overflow-y-auto bg-gray-50">
            {activeTab !== 'cart' && (
              <div className="p-4 space-y-6">
                <div className="text-center">
                  <div className="text-5xl mb-3">
                    {activeTab === 'featured' ? '⭐' : activeTab === 'airtime' ? '📞' : '📊'}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {activeTab === 'featured' ? 'Featured Deals' : 
                     activeTab === 'airtime' ? 'Airtime Top-ups' : 'Data Bundles'}
                  </h2>
                  <p className="text-gray-600 text-sm px-4">
                    {activeTab === 'featured' ? 'Best value mobile services for you' :
                     activeTab === 'airtime' ? 'Quick airtime top-ups for all networks' :
                     'High-speed data bundles with great value'}
                  </p>
                </div>
                
                <div className="space-y-4">
                  {getProductsByCategory(activeTab).map((product) => (
                    <MobileProductCard 
                      key={product.id} 
                      product={product}
                      onAddToCart={addToCart}
                      onQuickCheckout={quickCheckout}
                    />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'cart' && (
              <div className="p-4">
                <MobileCart 
                  cart={cart}
                  cartTotal={cartTotal}
                  onQuantityUpdate={updateQuantity}
                  onCheckout={() => setShowPayment(true)}
                  onBrowseServices={() => setActiveTab('featured')}
                />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MobileOptimizedShoppingInterface;
