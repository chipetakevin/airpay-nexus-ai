import React, { useState } from 'react';
import { useMobileAuth } from '@/hooks/useMobileAuth';
import WhatsAppShoppingHeader from './WhatsAppShoppingHeader';
import WhatsAppTabNavigation from './WhatsAppTabNavigation';
import WhatsAppCategoryGrid from './WhatsAppCategoryGrid';  
import WhatsAppProductsList from './WhatsAppProductsList';
import { CreditCard } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  category: 'airtime' | 'data' | 'bundle' | 'gift';
  icon: React.ReactNode;
  description: string;
  network?: string;
  popular?: boolean;
}

interface CartItem extends Product {
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
      id: 1,
      name: 'R10 Airtime',
      price: 10,
      category: 'airtime',
      icon: <CreditCard className="w-6 h-6" />,
      description: 'All Networks • R10',
      network: 'All Networks'
    },
    {
      id: 2,
      name: 'R20 Airtime',
      price: 20,
      category: 'airtime',
      icon: <CreditCard className="w-6 h-6" />,
      description: 'All Networks • R20',
      network: 'All Networks',
      popular: true
    },
    {
      id: 3,
      name: 'R50 Airtime',
      price: 50,
      category: 'airtime',
      icon: <CreditCard className="w-6 h-6" />,
      description: 'All Networks • R50',
      network: 'All Networks'
    }
  ];

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

  return (
    <div className="flex flex-col h-full bg-white">
      <WhatsAppShoppingHeader onExit={handleExitToDeals} />
      <WhatsAppTabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      <WhatsAppCategoryGrid activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      <WhatsAppProductsList 
        products={products} 
        activeCategory={activeCategory} 
        onAddToCart={addToCart} 
      />
    </div>
  );
};

export default WhatsAppShoppingInterface;
