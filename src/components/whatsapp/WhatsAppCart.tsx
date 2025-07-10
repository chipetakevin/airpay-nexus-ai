
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Plus, Minus, CreditCard, ArrowLeft, Trash2 } from 'lucide-react';
import { CartItem } from '@/hooks/useWhatsAppShopping';

interface WhatsAppCartProps {
  items: CartItem[];
  onUpdateQuantity: (itemId: string, change: number) => void;
  onRemoveItem: (itemId: string) => void;
  onCheckout: () => void;
  onBackToShopping: () => void;
  isProcessing: boolean;
}

const WhatsAppCart: React.FC<WhatsAppCartProps> = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onBackToShopping,
  isProcessing
}) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="p-6 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
        <p className="text-gray-600 mb-6">Add some items to get started!</p>
        <Button 
          onClick={onBackToShopping}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-50 animate-fade-in">
      {/* Header Section */}
      <div className="bg-white p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Your Cart ({totalItems})</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={onBackToShopping}
            className="flex items-center gap-2 border-gray-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Button>
        </div>
      </div>

      {/* Cart Items */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        {items.map((item, index) => (
          <Card key={item.id} className="bg-white p-4 border border-gray-200 rounded-2xl shadow-sm hover-scale animate-fade-in transition-all duration-300" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="flex items-center gap-3">
              {/* Item Icon */}
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-gray-600" />
              </div>
              
              {/* Item Details */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-gray-600">{item.network}</span>
                  <Badge variant="outline" className="text-xs bg-gray-100">
                    {item.type.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-sm text-gray-500">R{item.price} each</p>
              </div>
              
              {/* Quantity Controls */}
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-2 bg-gray-100 rounded-full p-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onUpdateQuantity(item.id, -1)}
                    className="w-8 h-8 p-0 rounded-full hover:bg-red-100 text-red-600"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="font-bold text-lg min-w-[2rem] text-center">
                    {item.quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onUpdateQuantity(item.id, 1)}
                    className="w-8 h-8 p-0 rounded-full hover:bg-green-100 text-green-600"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                
                {/* Item Total and Remove */}
                <div className="flex items-center gap-2">
                  <span className="font-bold text-green-600">
                    R{item.price * item.quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveItem(item.id)}
                    className="w-8 h-8 p-0 text-red-500 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Total and Checkout Section */}
      <div className="bg-white border-t border-gray-200 p-4 space-y-4 animate-slide-in-right">
        {/* Total Display */}
        <Card className="bg-green-50 border-2 border-green-200 p-4 rounded-2xl animate-scale-in">
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-gray-900">Total:</span>
            <span className="text-2xl font-bold text-green-600 animate-pulse">R{total}</span>
          </div>
          <div className="text-sm text-green-700 mt-1">
            {totalItems} item{totalItems !== 1 ? 's' : ''} • Ready for checkout
          </div>
        </Card>

        {/* Checkout Button */}
        <Button
          onClick={onCheckout}
          disabled={isProcessing || items.length === 0}
          className="w-full h-14 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover-scale animate-fade-in"
        >
          {isProcessing ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Processing Payment...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <CreditCard className="w-6 h-6" />
              🚀 Secure WhatsApp Checkout
            </div>
          )}
        </Button>

        {/* Security Info */}
        <div className="text-center space-y-2 animate-fade-in">
          <p className="text-xs text-gray-600">
            🔒 Secure payment • ⚡ Instant delivery • 📱 Mobile optimized
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-green-600">
            <span>✅ End-to-end encrypted</span>
            <span>✅ WhatsApp receipt</span>
            <span>✅ 24/7 support</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppCart;
