
import React, { useState } from 'react';
import { useMobileAuth } from '@/hooks/useMobileAuth';
import WhatsAppShoppingHeader from './WhatsAppShoppingHeader';
import WhatsAppTabNavigation from './WhatsAppTabNavigation';
import WhatsAppCategoryGrid from './WhatsAppCategoryGrid';  
import WhatsAppProductsList from './WhatsAppProductsList';
import { CreditCard } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  type: string;
  network: string;
  amount: string;
  price: number;
  category: string;
  icon: React.ReactNode;
  description: string;
  popular?: boolean;
}

interface CartItem extends Omit<Product, 'category'> {
  quantity: number;
}

const WhatsAppShoppingInterface = () => {
  const { isAuthenticated } = useMobileAuth();
  const [activeTab, setActiveTab] = useState('shop');
  const [activeCategory, setActiveCategory] = useState('airtime');
  const [cart, setCart] = useState<CartItem[]>([]);

  const handleExitToDeals = () => {
    window.location.href = '/ai-powered-deals';
  };

  const products: Product[] = [
    {
      id: '1',
      name: 'R10 Airtime',
      type: 'airtime',
      network: 'All Networks',
      amount: '10',
      price: 10,
      category: 'airtime',
      icon: <CreditCard className="w-6 h-6" />,
      description: 'All Networks • R10'
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
      description: 'All Networks • R50'
    }
  ];

  const addToCart = (product: Omit<Product, 'category'> & { quantity?: number }) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: product.quantity || 1 }];
    });
  };

  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <WhatsAppShoppingHeader 
        isAuthenticated={isAuthenticated}
        onExit={handleExitToDeals} 
      />
      <WhatsAppTabNavigation 
        activeTab={activeTab} 
        cartCount={getCartCount()}
        onTabChange={setActiveTab} 
      />
      <WhatsAppCategoryGrid 
        activeCategory={activeCategory} 
        onCategoryChange={setActiveCategory} 
      />
      <WhatsAppProductsList 
        products={products} 
        activeCategory={activeCategory} 
        onAddToCart={addToCart} 
      />
    </div>
  );
};

export default WhatsAppShoppingInterface;
