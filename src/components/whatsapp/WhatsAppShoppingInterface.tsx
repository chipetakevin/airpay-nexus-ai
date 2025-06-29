import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingCart, Plus, MessageCircle, Star, 
  CreditCard, Wifi, Gift, Globe, Home, MessageSquare, X
} from 'lucide-react';
import { useMobileAuth } from '@/hooks/useMobileAuth';
import { useLocation } from 'react-router-dom';

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
  const { currentUser, isAuthenticated } = useMobileAuth();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('shop');
  const [activeCategory, setActiveCategory] = useState('airtime');
  const [cart, setCart] = useState<CartItem[]>([]);

  const handleExitToDeals = () => {
    // Intelligent exit to AI-Powered Deals page
    window.location.href = '/ai-powered-deals';
  };

  const handleExitToHome = () => {
    // Seamless navigation to landing homepage
    if (location.pathname === '/') {
      // Already on home page, scroll to top smoothly
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Navigate to homepage
      window.location.href = '/';
    }
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

  const categories = [
    { id: 'airtime', label: 'Airtime', icon: <CreditCard className="w-6 h-6" /> },
    { id: 'data', label: 'Data', icon: <Wifi className="w-6 h-6" /> },
    { id: 'bundles', label: 'Bundles', icon: <Gift className="w-6 h-6" /> },
    { id: 'international', label: 'International', icon: <Globe className="w-6 h-6" /> }
  ];

  const bottomNavItems = [
    { id: 'sanctuary', label: 'Sanctuary', icon: <Home className="w-5 h-5" />, hasNotification: false },
    { id: 'cards', label: 'Cards', icon: <CreditCard className="w-5 h-5" />, hasNotification: false },
    { id: 'transact', label: 'Transact', icon: <ShoppingCart className="w-5 h-5" />, hasNotification: true },
    { id: 'messages', label: 'Messages', icon: <MessageSquare className="w-5 h-5" />, hasNotification: true, active: true },
    { id: 'explore', label: 'Explore', icon: <MessageCircle className="w-5 h-5" />, hasNotification: true }
  ];

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header with Exit Button */}
      <div className="bg-green-600 text-white p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-6 h-6" />
          <h2 className="text-lg font-semibold">WhatsApp Shopping</h2>
        </div>
        <Button
          onClick={handleExitToDeals}
          variant="ghost"
          size="sm"
          className="w-8 h-8 p-0 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200"
          title="Exit to AI Deals"
        >
          <X className="w-4 h-4 text-white" />
        </Button>
      </div>

      {/* Tab Navigation */}
      <div className="flex bg-gray-100 border-b">
        <button
          onClick={() => setActiveTab('shop')}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-all ${
            activeTab === 'shop'
              ? 'bg-black text-white rounded-lg mx-1 my-1'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Shop
        </button>
        <button
          onClick={() => setActiveTab('chat')}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-all ${
            activeTab === 'chat'
              ? 'bg-black text-white rounded-lg mx-1 my-1'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Chat
        </button>
        <button
          onClick={() => setActiveTab('cart')}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-all ${
            activeTab === 'cart'
              ? 'bg-black text-white rounded-lg mx-1 my-1'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Cart
        </button>
      </div>

      {/* Category Grid */}
      <div className="p-4 grid grid-cols-4 gap-3">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`p-4 rounded-2xl flex flex-col items-center gap-2 transition-all ${
              activeCategory === category.id
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.icon}
            <span className="text-sm font-medium">{category.label}</span>
          </button>
        ))}
      </div>

      {/* Products List */}
      <div className="flex-1 px-4 pb-4 space-y-3 overflow-y-auto">
        {products
          .filter(product => product.category === activeCategory)
          .map((product) => (
            <Card key={product.id} className="border-2 border-gray-100 rounded-2xl hover:shadow-md transition-all">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                      {product.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{product.name}</h3>
                        {product.popular && (
                          <Badge className="bg-orange-500 text-white text-xs px-2 py-1">
                            ⭐ Popular
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{product.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-xl font-bold text-green-600">R{product.price}</div>
                    </div>
                    <Button
                      onClick={() => addToCart(product)}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl font-medium"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-between items-center">
          {bottomNavItems.map((item) => (
            <button
              key={item.id}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all relative ${
                item.active 
                  ? 'text-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {item.hasNotification && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">New</span>
                </div>
              )}
              {item.icon}
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhatsAppShoppingInterface;
