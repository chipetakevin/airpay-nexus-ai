
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Phone, Wifi, CreditCard, Gift, Settings, MessageCircle, 
  Star, ShoppingCart, BarChart3, Menu, ArrowRight, CheckCircle,
  Zap, Users, Clock, Shield
} from 'lucide-react';
import { useMobileAuth } from '@/hooks/useMobileAuth';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

interface DataBundle {
  id: string;
  name: string;
  data: string;
  price: number;
  validity: string;
  color: string;
  network: string;
  amount: number;
  dealType: 'data';
}

const MobileShoppingInterface = () => {
  const { currentUser, isAuthenticated } = useMobileAuth();
  const { toast } = useToast();
  const [currentView, setCurrentView] = useState('home');
  const [balance] = useState(125.50);
  const [cart, setCart] = useState<DataBundle[]>([]);

  const menuItems = [
    { 
      id: 1, 
      title: 'Buy Airtime', 
      subtitle: 'Instant top-ups for all networks', 
      icon: Phone,
      action: () => setCurrentView('airtime')
    },
    { 
      id: 2, 
      title: 'Purchase Data Bundles', 
      subtitle: 'High-speed internet packages', 
      icon: Wifi,
      action: () => setCurrentView('data')
    },
    { 
      id: 3, 
      title: 'Check Balance', 
      subtitle: 'View your current balance', 
      icon: CreditCard,
      action: () => setCurrentView('balance')
    },
    { 
      id: 4, 
      title: 'Gift Airtime/Data', 
      subtitle: 'Send to friends & family', 
      icon: Gift,
      action: () => setCurrentView('gifting')
    },
    { 
      id: 5, 
      title: 'Manage Bundles', 
      subtitle: 'View and control your packages', 
      icon: Settings,
      action: () => setCurrentView('bundles')
    },
    { 
      id: 6, 
      title: 'International Airtime', 
      subtitle: 'Global top-up services', 
      icon: Phone,
      action: () => setCurrentView('international')
    }
  ];

  const dataBundles: DataBundle[] = [
    { 
      id: 'starter-1gb', 
      name: 'Starter Pack', 
      data: '1GB', 
      price: 29, 
      validity: '7 days', 
      color: 'bg-green-500',
      network: 'vodacom',
      amount: 1024,
      dealType: 'data'
    },
    { 
      id: 'social-3gb', 
      name: 'Social Bundle', 
      data: '3GB', 
      price: 59, 
      validity: '14 days', 
      color: 'bg-red-500',
      network: 'mtn',
      amount: 3072,
      dealType: 'data'
    },
    { 
      id: 'power-10gb', 
      name: 'Power Pack', 
      data: '10GB', 
      price: 149, 
      validity: '30 days', 
      color: 'bg-blue-500',
      network: 'vodacom',
      amount: 10240,
      dealType: 'data'
    },
    { 
      id: 'unlimited-50gb', 
      name: 'Unlimited', 
      data: '50GB', 
      price: 299, 
      validity: '30 days', 
      color: 'bg-purple-500',
      network: 'mtn',
      amount: 51200,
      dealType: 'data'
    }
  ];

  const addToCart = (bundle: DataBundle) => {
    setCart([...cart, bundle]);
    toast({
      title: "Added to Cart",
      description: `${bundle.name} (${bundle.data}) added to your cart`,
    });
  };

  const removeFromCart = (bundleId: string) => {
    setCart(cart.filter(item => item.id !== bundleId));
    toast({
      title: "Removed from Cart",
      description: "Item removed from your cart",
    });
  };

  const getTotalCartPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const handleQuickBuy = (bundle: DataBundle) => {
    // Integrate with existing shopping cart system
    window.location.href = `/portal?tab=deals&quickbuy=${bundle.id}`;
  };

  const HomeView = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center">
            <Phone className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Divinely</h1>
            <p className="text-blue-500 font-medium">Mobile</p>
          </div>
        </div>
        <Menu className="w-6 h-6 text-gray-600" />
      </div>

      {/* Welcome Message for Authenticated Users */}
      {isAuthenticated && currentUser && (
        <div className="p-4">
          <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold">Welcome back, {currentUser.firstName}!</h2>
                  <p className="text-green-100">Your mobile services are ready</p>
                </div>
                <Badge className="bg-yellow-500 text-yellow-900">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  VIP
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Menu Items */}
      <div className="p-4 space-y-3">
        {menuItems.map((item) => (
          <div
            key={item.id}
            onClick={item.action}
            className="bg-white rounded-2xl p-4 shadow-sm flex items-center space-x-4 cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-500 font-bold text-lg">{item.id}</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.subtitle}</p>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400" />
          </div>
        ))}
      </div>

      {/* Chat Prompt */}
      <div className="p-4 mt-4">
        <div className="bg-blue-50 rounded-2xl p-4">
          <p className="text-gray-600 mb-2">Simply reply with a number or tell me what you need! 💬</p>
          <p className="text-gray-400 text-sm">{new Date().toLocaleTimeString()}</p>
        </div>
      </div>

      {/* WhatsApp Button */}
      <div className="fixed bottom-4 left-4 right-4">
        <Link to="/whatsapp-assistant">
          <Button className="bg-green-500 text-white rounded-2xl p-4 flex items-center justify-center space-x-3 w-full shadow-lg hover:bg-green-600">
            <MessageCircle className="w-6 h-6" />
            <span className="font-semibold">Start Shopping on WhatsApp</span>
            <ArrowRight className="w-5 h-5" />
          </Button>
        </Link>
      </div>
    </div>
  );

  const DataView = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button onClick={() => setCurrentView('home')}>
            <ArrowRight className="w-6 h-6 text-gray-600 rotate-180" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Data Bundles</h1>
        </div>
      </div>

      {/* Data Bundles Section */}
      <div className="p-4">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-8 h-8 text-blue-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Data Bundles</h3>
          <p className="text-gray-600">High-speed data bundles with great value</p>
        </div>

        <div className="space-y-4">
          {dataBundles.map((bundle) => (
            <Card key={bundle.id} className="border-2 border-green-100 hover:border-green-300 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <div className="flex space-x-1">
                        <div className={`w-2 h-6 ${bundle.color} rounded-sm`}></div>
                        <div className={`w-2 h-4 ${bundle.color} rounded-sm opacity-60`}></div>
                        <div className={`w-2 h-8 ${bundle.color} rounded-sm opacity-80`}></div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{bundle.name}</h4>
                      <p className="text-gray-500 text-sm">{bundle.data} • {bundle.validity}</p>
                      <p className="text-xs text-gray-400 capitalize">{bundle.network}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">R{bundle.price}</div>
                    <div className="space-y-2 mt-2">
                      <Button
                        onClick={() => addToCart(bundle)}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600"
                      >
                        Add to Cart
                      </Button>
                      <Button
                        onClick={() => handleQuickBuy(bundle)}
                        variant="outline"
                        className="px-4 py-2 rounded-lg text-sm font-medium border-blue-500 text-blue-500 hover:bg-blue-50"
                      >
                        Quick Buy
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Cart Button */}
      {cart.length > 0 && (
        <div className="fixed bottom-4 right-4">
          <Button
            onClick={() => setCurrentView('cart')}
            className="bg-blue-500 hover:bg-blue-600 rounded-full p-4 shadow-lg relative"
          >
            <ShoppingCart className="w-6 h-6" />
            <Badge className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
              {cart.length}
            </Badge>
          </Button>
        </div>
      )}
    </div>
  );

  const CartView = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button onClick={() => setCurrentView('data')}>
            <ArrowRight className="w-6 h-6 text-gray-600 rotate-180" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Shopping Cart</h1>
        </div>
        <div className="flex items-center space-x-2">
          <ShoppingCart className="w-6 h-6 text-gray-600" />
          <span className="text-sm text-gray-500">{cart.length} items</span>
        </div>
      </div>

      {/* Cart Items */}
      <div className="p-4">
        {cart.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Your cart is empty</h3>
            <p className="text-gray-500 mb-6">Add some data bundles to get started</p>
            <Button
              onClick={() => setCurrentView('data')}
              className="bg-green-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-600"
            >
              Browse Data Bundles
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {cart.map((item, index) => (
              <Card key={index} className="shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <BarChart3 className="w-6 h-6 text-blue-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{item.name}</h4>
                        <p className="text-gray-500 text-sm">{item.data} • {item.validity}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">R{item.price}</div>
                      <Button
                        onClick={() => removeFromCart(item.id)}
                        variant="ghost"
                        className="text-red-500 text-sm hover:text-red-700 mt-1"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Total */}
            <Card className="bg-green-50 border-2 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-green-600">R{getTotalCartPrice()}</span>
                </div>
              </CardContent>
            </Card>

            {/* Checkout Button */}
            <Link to="/portal?tab=deals">
              <Button className="bg-green-500 text-white rounded-2xl p-4 w-full font-semibold text-lg hover:bg-green-600">
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );

  // Additional views for other menu items
  const BalanceView = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="bg-white shadow-sm p-4 flex items-center space-x-3">
        <button onClick={() => setCurrentView('home')}>
          <ArrowRight className="w-6 h-6 text-gray-600 rotate-180" />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Account Balance</h1>
      </div>
      
      <div className="p-4">
        <Card className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
          <CardContent className="p-6 text-center">
            <CreditCard className="w-12 h-12 mx-auto mb-4 text-purple-200" />
            <p className="text-purple-100 mb-2">Current Balance</p>
            <p className="text-4xl font-bold">R{balance.toFixed(2)}</p>
            {isAuthenticated && currentUser && (
              <p className="text-purple-100 mt-2">OneCard: ****{currentUser.cardNumber?.slice(-4)}</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Main render based on current view
  const renderCurrentView = () => {
    switch (currentView) {
      case 'data':
        return <DataView />;
      case 'cart':
        return <CartView />;
      case 'balance':
        return <BalanceView />;
      default:
        return <HomeView />;
    }
  };

  return renderCurrentView();
};

export default MobileShoppingInterface;
