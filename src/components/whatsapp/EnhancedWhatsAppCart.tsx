import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Minus, 
  CreditCard, 
  ArrowLeft, 
  Trash2, 
  ShoppingBag,
  Zap,
  Shield,
  Heart,
  Star
} from 'lucide-react';
import { CartItem } from '@/hooks/useWhatsAppShopping';

interface EnhancedWhatsAppCartProps {
  items: CartItem[];
  onUpdateQuantity: (itemId: string, change: number) => void;
  onRemoveItem: (itemId: string) => void;
  onCheckout: () => void;
  onBackToShopping: () => void;
  isProcessing: boolean;
}

const EnhancedWhatsAppCart: React.FC<EnhancedWhatsAppCartProps> = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onBackToShopping,
  isProcessing
}) => {
  const [showCelebration, setShowCelebration] = useState(false);
  const [savedAmount, setSavedAmount] = useState(0);
  
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const originalTotal = total * 1.15; // Simulate 15% savings
  const savings = originalTotal - total;

  useEffect(() => {
    setSavedAmount(savings);
  }, [savings]);

  const triggerCelebration = () => {
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 2000);
  };

  if (items.length === 0) {
    return (
      <div className="p-6 text-center animate-fade-in">
        <div className="text-6xl mb-4 animate-scale-in">🛒</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Your WhatsApp Cart is Empty</h3>
        <p className="text-gray-600 mb-6">
          Start shopping to add amazing deals to your cart!
        </p>
        <Button 
          onClick={onBackToShopping}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-2xl hover-scale"
        >
          <ShoppingBag className="w-5 h-5 mr-2" />
          Browse Products
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-green-50/30 to-emerald-50/30 animate-fade-in">
      {/* Enhanced Header */}
      <div className="bg-white p-4 border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-gray-900">
              🛒 Your Cart ({totalItems})
            </h2>
            {totalItems > 0 && (
              <Badge className="bg-green-600 text-white animate-pulse">
                WhatsApp Ready
              </Badge>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onBackToShopping}
            className="flex items-center gap-2 border-gray-300 hover-scale"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Button>
        </div>

        {/* Savings Banner */}
        {savings > 0 && (
          <div className="bg-gradient-to-r from-amber-100 to-yellow-100 border border-amber-200 rounded-xl p-3 animate-scale-in">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-600" />
              <span className="text-sm font-medium text-amber-800">
                🎉 You're saving R{savings.toFixed(2)} with our WhatsApp specials!
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Cart Items */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        {items.map((item, index) => (
          <Card 
            key={item.id} 
            className="bg-white p-4 border border-gray-200 rounded-2xl shadow-sm hover-scale animate-fade-in transition-all duration-300 hover:shadow-md" 
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center gap-3">
              {/* Enhanced Item Icon */}
              <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-green-600" />
              </div>
              
              {/* Enhanced Item Details */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-gray-600">{item.network}</span>
                  <Badge variant="outline" className="text-xs bg-green-50 border-green-200 text-green-700">
                    {item.type.toUpperCase()}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-500">R{item.price} each</p>
                  <span className="text-xs text-green-600">• Instant delivery</span>
                </div>
              </div>
              
              {/* Enhanced Quantity Controls */}
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-2 bg-gray-50 rounded-full p-1 border">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onUpdateQuantity(item.id, -1)}
                    className="w-8 h-8 p-0 rounded-full hover:bg-red-100 text-red-600 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="font-bold text-lg min-w-[2rem] text-center animate-scale-in">
                    {item.quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onUpdateQuantity(item.id, 1)}
                    className="w-8 h-8 p-0 rounded-full hover:bg-green-100 text-green-600 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                
                {/* Enhanced Item Total and Actions */}
                <div className="flex items-center gap-2">
                  <span className="font-bold text-green-600 animate-pulse">
                    R{item.price * item.quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveItem(item.id)}
                    className="w-8 h-8 p-0 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Enhanced Total and Checkout Section */}
      <div className="bg-white border-t border-gray-200 p-4 space-y-4 animate-slide-in-right">
        {/* Enhanced Total Display */}
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 p-4 rounded-2xl animate-scale-in">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-gray-900">Total Amount:</span>
              <span className="text-2xl font-bold text-green-600 animate-pulse">R{total}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-green-700">
                {totalItems} item{totalItems !== 1 ? 's' : ''} • Ready for WhatsApp checkout
              </span>
              {savings > 0 && (
                <span className="text-amber-600 font-medium">
                  Saved: R{savings.toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </Card>

        {/* Enhanced Checkout Button */}
        <Button
          onClick={() => {
            triggerCelebration();
            onCheckout();
          }}
          disabled={isProcessing || items.length === 0}
          className="w-full h-16 bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 hover:from-green-700 hover:via-emerald-700 hover:to-green-700 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover-scale animate-fade-in relative overflow-hidden"
        >
          {showCelebration && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-slide-in-right" />
          )}
          {isProcessing ? (
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Processing WhatsApp Payment...</span>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Zap className="w-6 h-6" />
              <span>🚀 Secure WhatsApp Checkout</span>
              <Shield className="w-5 h-5" />
            </div>
          )}
        </Button>

        {/* Enhanced Security Info */}
        <div className="text-center space-y-3 animate-fade-in">
          <div className="flex items-center justify-center gap-1 text-xs text-gray-600">
            <Shield className="w-4 h-4" />
            <span>Secure payment • ⚡ Instant delivery • 📱 Mobile optimized</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="flex flex-col items-center gap-1 text-green-600">
              <span>🔒</span>
              <span>End-to-end encrypted</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-blue-600">
              <span>📱</span>
              <span>WhatsApp receipt</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-purple-600">
              <span>🛡️</span>
              <span>24/7 support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedWhatsAppCart;