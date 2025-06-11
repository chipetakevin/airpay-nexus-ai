
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingCart, Plus, Minus, MessageCircle, Star, 
  Zap, Gift, TrendingUp, CheckCircle, CreditCard
} from 'lucide-react';
import { useMobileAuth } from '@/hooks/useMobileAuth';

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
}

interface CartItem extends Product {
  quantity: number;
}

const WhatsAppShoppingInterface = () => {
  const { currentUser, isAuthenticated } = useMobileAuth();
  const [activeTab, setActiveTab] = useState('shop');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState(0);

  const products: Product[] = [
    {
      id: 1,
      name: 'Airtime R50',
      price: 50,
      category: 'airtime',
      icon: '📞',
      description: 'Instant airtime top-up for all networks',
      features: ['Instant delivery', 'All networks supported', '24/7 availability'],
      network: 'All Networks'
    },
    {
      id: 2,
      name: 'Data 1GB',
      price: 89,
      category: 'data',
      icon: '📊',
      description: 'High-speed 1GB data bundle',
      features: ['30-day validity', 'High-speed 4G/5G', 'No throttling'],
      validity: '30 days'
    },
    {
      id: 3,
      name: 'Premium Combo',
      price: 199,
      category: 'bundle',
      icon: '📦',
      description: 'Airtime + Data combo package',
      features: ['R100 Airtime', '2GB Data', 'Best value deal'],
      validity: '30 days'
    },
    {
      id: 4,
      name: 'Gift Voucher R100',
      price: 100,
      category: 'gift',
      icon: '🎁',
      description: 'Perfect gift for friends & family',
      features: ['Flexible amount', 'Digital delivery', 'Personal message']
    },
    {
      id: 5,
      name: 'Airtime R100',
      price: 100,
      category: 'airtime',
      icon: '📞',
      description: 'Premium airtime top-up',
      features: ['Instant delivery', 'All networks', 'Bonus minutes included'],
      network: 'All Networks'
    },
    {
      id: 6,
      name: 'Data 5GB',
      price: 299,
      category: 'data',
      icon: '📊',
      description: 'Premium 5GB data bundle',
      features: ['60-day validity', 'Ultra-fast speeds', 'Anytime data'],
      validity: '60 days'
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

  const getCartItemCount = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getProductsByCategory = (category: string) => {
    if (category === 'shop') return products;
    return products.filter(product => product.category === category);
  };

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;

    const orderSummary = cart.map(item => 
      `${item.name} x${item.quantity} - R${item.price * item.quantity}`
    ).join('\n');

    const customerInfo = isAuthenticated && currentUser 
      ? `\n👤 Customer: ${currentUser.firstName} ${currentUser.lastName}\n📱 Account: ${currentUser.registeredPhone}\n🎯 OneCard: ${currentUser.cardNumber}`
      : '';

    const message = encodeURIComponent(
      `🛍️ *New Order from Divinely Mobile*${customerInfo}\n\n${orderSummary}\n\n💰 *Total: R${cartTotal}*\n\n✅ Ready for secure checkout!\nPlease process my order. Thank you!`
    );

    const phoneNumber = isAuthenticated && currentUser?.registeredPhone 
      ? currentUser.registeredPhone.replace('+', '')
      : '27832466539';

    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const ProductCard = ({ product }: { product: Product }) => (
    <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="text-3xl">{product.icon}</div>
          <div className="text-right">
            <div className="text-lg font-bold text-green-600">R{product.price}</div>
            {product.network && (
              <Badge variant="outline" className="text-xs">{product.network}</Badge>
            )}
            {product.validity && (
              <Badge variant="outline" className="text-xs">{product.validity}</Badge>
            )}
          </div>
        </div>
        
        <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-3">{product.description}</p>
        
        <div className="space-y-1 mb-4">
          {product.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-xs text-gray-500">
              <CheckCircle className="w-3 h-3 text-green-500" />
              {feature}
            </div>
          ))}
        </div>
        
        <Button 
          onClick={() => addToCart(product)}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );

  const CartTab = () => (
    <div className="space-y-4">
      {cart.length === 0 ? (
        <div className="text-center py-8">
          <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">Your cart is empty</p>
          <p className="text-sm text-gray-400">Add some products to get started!</p>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {cart.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{item.icon}</span>
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <div className="text-sm text-gray-600">R{item.price} each</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-8 h-8 p-0"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="font-medium min-w-[2rem] text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-8 h-8 p-0"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                      <div className="font-bold text-green-600 min-w-[4rem] text-right">
                        R{item.price * item.quantity}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-bold">Total:</span>
                <span className="text-2xl font-bold text-green-600">R{cartTotal}</span>
              </div>
              <Button 
                onClick={handleWhatsAppCheckout}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 h-12"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Checkout via WhatsApp
              </Button>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );

  const tabs = [
    { id: 'shop', label: '🛍️ Shop', icon: ShoppingCart },
    { id: 'airtime', label: '📞 Airtime', icon: CreditCard },
    { id: 'data', label: '📊 Data', icon: Zap },
    { id: 'cart', label: '🛒 Cart', icon: ShoppingCart }
  ];

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl overflow-hidden shadow-2xl">
      {/* WhatsApp Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-green-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">Divinely Mobile Shopping</h3>
            <p className="text-xs opacity-90">AI-Powered • Always Available</p>
          </div>
          {isAuthenticated && (
            <Badge className="bg-green-800 text-green-100">
              <Star className="w-3 h-3 mr-1" />
              VIP
            </Badge>
          )}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex bg-gray-50 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 p-3 text-xs font-medium transition-all duration-200 relative ${
              activeTab === tab.id
                ? 'text-green-600 bg-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {tab.label}
            {tab.id === 'cart' && getCartItemCount() > 0 && (
              <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center p-0">
                {getCartItemCount()}
              </Badge>
            )}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-4 max-h-[600px] overflow-y-auto">
        {activeTab === 'shop' && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="text-4xl mb-2">🛍️</div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Welcome to Smart Shopping</h2>
              <p className="text-gray-600 text-sm">Browse our exclusive deals and checkout instantly via WhatsApp</p>
            </div>
            
            <div className="grid gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {(activeTab === 'airtime' || activeTab === 'data') && (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <div className="text-4xl mb-2">
                {activeTab === 'airtime' ? '📞' : '📊'}
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {activeTab === 'airtime' ? 'Airtime Top-ups' : 'Data Bundles'}
              </h2>
              <p className="text-gray-600 text-sm">
                {activeTab === 'airtime' 
                  ? 'Quick & secure airtime for all networks'
                  : 'High-speed data packages with great value'
                }
              </p>
            </div>
            
            <div className="grid gap-4">
              {getProductsByCategory(activeTab).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'cart' && <CartTab />}
      </div>
    </div>
  );
};

export default WhatsAppShoppingInterface;
