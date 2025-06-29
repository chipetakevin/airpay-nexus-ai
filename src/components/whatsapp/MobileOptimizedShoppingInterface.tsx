import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingCart, Plus, Minus, MessageCircle, Star, 
  Zap, Gift, TrendingUp, CheckCircle, CreditCard,
  Smartphone, Wifi, Phone, Send, ArrowRight, X
} from 'lucide-react';
import { useMobileAuth } from '@/hooks/useMobileAuth';
import { Link, useLocation } from 'react-router-dom';
import EnhancedPaymentProcessor from './EnhancedPaymentProcessor';

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
  const { currentUser, isAuthenticated } = useMobileAuth();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('featured');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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

  const featuredProducts: Product[] = [
    {
      id: 1,
      name: 'Airtime R20',
      price: 20,
      category: 'airtime',
      icon: '📞',
      description: 'Perfect for quick top-ups',
      features: ['Instant delivery', 'All networks', 'Never expires'],
      network: 'All Networks',
      popular: true
    },
    {
      id: 2,
      name: 'Data 1GB',
      price: 49,
      category: 'data',
      icon: '📊',
      description: 'High-speed internet bundle',
      features: ['30-day validity', '4G/5G speed', 'Anytime data'],
      validity: '30 days',
      popular: true,
      discount: 10
    },
    {
      id: 3,
      name: 'WhatsApp Bundle',
      price: 15,
      category: 'data',
      icon: '💬',
      description: 'Unlimited WhatsApp for 7 days',
      features: ['7-day validity', 'Unlimited messaging', 'Video calls included'],
      validity: '7 days',
      popular: true
    }
  ];

  const airtimeProducts: Product[] = [
    {
      id: 4,
      name: 'Airtime R10',
      price: 10,
      category: 'airtime',
      icon: '📞',
      description: 'Emergency top-up',
      features: ['Instant delivery', 'All networks', 'SMS & calls'],
      network: 'All Networks'
    },
    {
      id: 5,
      name: 'Airtime R50',
      price: 50,
      category: 'airtime',
      icon: '📞',
      description: 'Standard top-up',
      features: ['Instant delivery', 'All networks', 'Bonus minutes'],
      network: 'All Networks'
    },
    {
      id: 6,
      name: 'Airtime R100',
      price: 100,
      category: 'airtime',
      icon: '📞',
      description: 'Premium top-up',
      features: ['Instant delivery', 'All networks', 'Extra bonuses'],
      network: 'All Networks'
    }
  ];

  const dataProducts: Product[] = [
    {
      id: 7,
      name: 'Data 500MB',
      price: 29,
      category: 'data',
      icon: '📊',
      description: 'Light usage bundle',
      features: ['7-day validity', 'High-speed', 'Social media'],
      validity: '7 days'
    },
    {
      id: 8,
      name: 'Data 2GB',
      price: 79,
      category: 'data',
      icon: '📊',
      description: 'Standard usage bundle',
      features: ['30-day validity', 'High-speed', 'Streaming ready'],
      validity: '30 days'
    },
    {
      id: 9,
      name: 'Data 5GB',
      price: 149,
      category: 'data',
      icon: '📊',
      description: 'Heavy usage bundle',
      features: ['30-day validity', 'Ultra-fast', 'Unlimited streaming'],
      validity: '30 days'
    }
  ];

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

  const getProductsByCategory = (category: string) => {
    switch (category) {
      case 'featured': return featuredProducts;
      case 'airtime': return airtimeProducts;
      case 'data': return dataProducts;
      default: return featuredProducts;
    }
  };

  const ProductCard = ({ product }: { product: Product }) => (
    <Card className="hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-2 hover:border-green-200 relative overflow-hidden">
      <CardContent className="p-4">
        {/* Popular badge positioned at top left, not overlapping price */}
        {product.popular && (
          <div className="absolute top-2 left-2 z-10">
            <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full font-bold flex items-center gap-1">
              <span className="text-yellow-300">🔥</span>
              Popular
            </Badge>
          </div>
        )}
        
        {/* Discount badge positioned at top right if no popular badge */}
        {product.discount && !product.popular && (
          <div className="absolute top-2 right-2 z-10">
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-2 py-1 rounded-full font-bold">
              {product.discount}% OFF
            </Badge>
          </div>
        )}
        
        <div className="flex justify-between items-start mb-4 mt-8">
          <div className="text-4xl">{product.icon}</div>
          <div className="text-right">
            <div className="flex items-center gap-2">
              {product.discount ? (
                <>
                  <span className="text-sm text-gray-400 line-through">R{(product.price * 1.1).toFixed(0)}</span>
                  <span className="text-xl font-bold text-green-600">R{product.price}</span>
                </>
              ) : (
                <span className="text-xl font-bold text-green-600">R{product.price}</span>
              )}
            </div>
            <div className="flex gap-1 mt-1">
              {product.network && (
                <Badge variant="outline" className="text-xs">{product.network}</Badge>
              )}
              {product.validity && (
                <Badge variant="outline" className="text-xs">{product.validity}</Badge>
              )}
            </div>
          </div>
        </div>
        
        <h3 className="font-bold text-gray-900 mb-2 text-lg">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-3">{product.description}</p>
        
        <div className="space-y-2 mb-4">
          {product.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
        
        {/* Action buttons */}
        <div className="space-y-2">
          <Button 
            onClick={() => addToCart(product)}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 h-11 text-base font-semibold"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
          
          <Button 
            onClick={() => quickCheckout(product)}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 h-11 text-base font-semibold"
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Quick Checkout
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const tabs = [
    { id: 'featured', label: '⭐ Featured', icon: Star },
    { id: 'airtime', label: '📞 Airtime', icon: Phone },
    { id: 'data', label: '📊 Data', icon: Wifi },
    { id: 'cart', label: '🛒 Cart', icon: ShoppingCart }
  ];

  if (showPayment) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-3xl overflow-hidden shadow-2xl border-4 border-green-100">
        <EnhancedPaymentProcessor 
          product={selectedProduct}
          cartItems={selectedProduct ? [{ ...selectedProduct, quantity: 1 }] : cart}
          onBack={() => setShowPayment(false)}
        />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-3xl overflow-hidden shadow-2xl border-4 border-green-100">
      {/* WhatsApp-style Header with Exit Button */}
      <div className="bg-gradient-to-r from-green-600 via-green-700 to-emerald-700 text-white p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20"></div>
        <div className="relative flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity flex-1">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
              <Smartphone className="w-7 h-7 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg">Divinely Mobile</h3>
              <p className="text-xs opacity-90 flex items-center gap-1">
                <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                Mobile Services • Always Available
              </p>
            </div>
          </Link>
          
          {/* Exit Button */}
          <div className="flex flex-col items-end gap-2">
            {isAuthenticated && (
              <Badge className="bg-yellow-500 text-yellow-900 text-xs font-bold">
                <Star className="w-3 h-3 mr-1" />
                VIP
              </Badge>
            )}
            <Button
              onClick={handleExitToHome}
              variant="ghost"
              size="sm"
              className="w-8 h-8 p-0 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200"
              title="Exit to Home"
            >
              <X className="w-4 h-4 text-white" />
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Tab Navigation */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 p-4 text-sm font-semibold transition-all duration-300 relative ${
                activeTab === tab.id
                  ? 'text-green-600 bg-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              <div className="flex flex-col items-center gap-1">
                <span className="text-lg">{tab.label.split(' ')[0]}</span>
                <span className="text-xs">{tab.label.split(' ').slice(1).join(' ')}</span>
              </div>
              {tab.id === 'cart' && cart.length > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center p-0 animate-bounce">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </Badge>
              )}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-t-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-h-[70vh] overflow-y-auto bg-gray-50">
        {activeTab !== 'cart' && (
          <div className="p-4 space-y-6">
            {/* Header for current tab */}
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
            
            {/* Products Grid */}
            <div className="space-y-4">
              {getProductsByCategory(activeTab).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {/* Cart Tab */}
        {activeTab === 'cart' && (
          <div className="p-4">
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🛒</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h3>
                <p className="text-gray-500 mb-6">Add some mobile services to get started!</p>
                <Button 
                  onClick={() => setActiveTab('featured')}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                >
                  Browse Services
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Your Order</h3>
                
                {/* Cart Items */}
                <div className="space-y-3">
                  {cart.map((item) => (
                    <Card key={item.id} className="p-4 border-2 border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <span className="text-2xl">{item.icon}</span>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline" className="text-xs">{item.network || item.category}</Badge>
                              <span className="font-semibold text-sm">{item.name}</span>
                            </div>
                            <div className="text-xs text-gray-600">R{item.price} each</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2 bg-gray-100 rounded-full p-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-8 h-8 p-0 rounded-full hover:bg-red-100"
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="font-bold min-w-[2rem] text-center">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-8 h-8 p-0 rounded-full hover:bg-green-100"
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="font-bold text-green-600 min-w-[4rem] text-right">
                            R{item.price * item.quantity}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
                
                {/* Order Summary */}
                <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-lg">
                      <span className="font-bold">Total:</span>
                      <span className="text-2xl font-bold text-green-600">R{cartTotal}</span>
                    </div>
                    
                    <div className="border-t border-green-200 pt-3">
                      <Button 
                        onClick={() => setShowPayment(true)}
                        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 h-14 text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300"
                      >
                        <CreditCard className="w-6 h-6 mr-3" />
                        <span>Secure Checkout</span>
                        <ArrowRight className="w-5 h-5 ml-3" />
                      </Button>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-xs text-gray-600 mb-2">
                        ✅ Instant delivery • 🔒 Secure payment • 📱 Mobile optimized
                      </p>
                      <p className="text-xs text-green-600 font-semibold">
                        Complete your purchase safely and securely
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileOptimizedShoppingInterface;
