
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ShoppingCart, Plus, Minus, Trash2, 
  CreditCard, MessageCircle
} from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  type: string;
  network: string;
  amount: string;
  price: number;
  quantity: number;
  icon: React.ReactNode;
}

interface WhatsAppCartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, change: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
  onBackToShopping: () => void;
}

const WhatsAppCart: React.FC<WhatsAppCartProps> = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onBackToShopping
}) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (items.length === 0) {
    return (
      <div className="text-center py-8">
        <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
        <p className="text-gray-600 mb-4">Add some products to get started!</p>
        <Button onClick={onBackToShopping} className="bg-green-600 hover:bg-green-700">
          Start Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Cart Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Your Cart ({items.length})</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={onBackToShopping}
        >
          ← Continue Shopping
        </Button>
      </div>

      {/* Cart Items */}
      <div className="space-y-2">
        {items.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{item.name}</div>
                    <div className="text-xs text-gray-600">{item.network}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="w-6 h-6 p-0"
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="w-6 h-6 p-0"
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                  <div className="text-right min-w-[60px]">
                    <div className="font-medium text-sm">R{item.price * item.quantity}</div>
                    <div className="text-xs text-gray-500">R{item.price} each</div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveItem(item.id)}
                    className="w-6 h-6 p-0 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Cart Summary */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-2xl font-bold text-green-600">R{total}</span>
            </div>
            
            <Button
              onClick={onCheckout}
              className="w-full bg-green-600 hover:bg-green-700 h-12 text-base"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Checkout via WhatsApp
            </Button>
            
            <div className="text-xs text-center text-gray-600">
              ✅ Instant delivery • 🔒 Secure payment • 📱 WhatsApp receipt
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WhatsAppCart;
