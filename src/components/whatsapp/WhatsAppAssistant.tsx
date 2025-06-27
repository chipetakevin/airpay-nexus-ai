
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, Send, Phone, CreditCard, 
  Activity, Gift, Globe, BarChart, 
  Shield, CheckCircle, AlertTriangle, Wifi,
  ShoppingCart, ArrowLeft
} from 'lucide-react';
import WhatsAppShoppingFlow from './WhatsAppShoppingFlow';
import WhatsAppCart from './WhatsAppCart';
import { useWhatsAppReceipt } from './WhatsAppReceiptSystem';

const WhatsAppAssistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      message: `👋 Welcome to Divinely Mobile!
Your complete shopping destination right here in WhatsApp!

🛍️ Shop our amazing deals below or chat with me for personalized assistance!

🌟 What's available:
• Instant airtime for all networks
• High-speed data bundles with discounts
• Gift options for friends & family
• International top-ups
• 24/7 customer support

💬 Just browse and shop below, or ask me anything!`,
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  
  const [currentInput, setCurrentInput] = useState('');
  const [activeView, setActiveView] = useState<'chat' | 'shop' | 'cart'>('shop');
  const [cart, setCart] = useState([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { processCheckout } = useWhatsAppReceipt();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const addMessage = (message: string, type: 'user' | 'bot') => {
    const newMessage = {
      id: messages.length + 1,
      type,
      message,
      timestamp: new Date().toLocaleTimeString()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleAddToCart = (product: any) => {
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
    
    addMessage(`Added ${product.name} to cart! 🛒`, 'bot');
  };

  const handleUpdateQuantity = (id: string, change: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQuantity = item.quantity + change;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const handleRemoveItem = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    const customerPhone = '27832466539'; // Default customer phone
    const transactionId = processCheckout(cart, customerPhone);
    
    addMessage(`✅ Order confirmed! Transaction ID: ${transactionId}. WhatsApp receipt will open automatically.`, 'bot');
    
    // Clear cart after successful checkout
    setTimeout(() => {
      setCart([]);
      setActiveView('chat');
    }, 2000);
  };

  const handleSendMessage = () => {
    if (currentInput.trim()) {
      addMessage(currentInput, 'user');
      
      // Simple response logic
      const lowerInput = currentInput.toLowerCase();
      let response = '';
      
      if (lowerInput.includes('help') || lowerInput.includes('support')) {
        response = `🆘 I'm here to help! 

Our services:
• Browse products below for instant shopping
• Ask about specific networks or amounts
• Need help with your order? Just ask!
• Customer support: +27 100 2827

What can I help you with? 😊`;
      } else if (lowerInput.includes('airtime')) {
        response = `💰 Great choice! Check out our airtime options below:

• R10, R20, R50, R100 available
• All networks supported (Vodacom, MTN, Cell C, Telkom)
• Instant delivery guaranteed
• Special bulk discounts available

Browse and add to your cart below! 🛒`;
        setActiveView('shop');
      } else if (lowerInput.includes('data')) {
        response = `📊 Data bundles with amazing savings!

• 1GB - R29 (was R35) - 17% OFF! 🔥
• 2GB - R49 (was R59) - Popular choice
• 5GB - R99 (was R120) - Best value
• 10GB - R149 (was R180) - Power users

Check them out below and add to cart! 📱`;
        setActiveView('shop');
      } else if (lowerInput.includes('cart')) {
        setActiveView('cart');
        response = `🛒 Opening your cart now! You have ${cart.length} items ready for checkout.`;
      } else {
        response = `Thanks for your message! 😊

I can help you with:
• Airtime purchases (all networks)
• Data bundles with discounts
• Gift options for others
• Order assistance & support

Browse our products below or ask me specific questions! 💬`;
      }
      
      setTimeout(() => addMessage(response, 'bot'), 800);
      setCurrentInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const getCartCount = () => cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="flex flex-col h-full max-w-md mx-auto bg-white relative">
      {/* WhatsApp Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 flex items-center gap-3 sticky top-0 z-10">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
          <MessageCircle className="w-6 h-6 text-green-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold">Divinely Mobile Shop</h3>
          <p className="text-xs opacity-90">Shop • Chat • Instant Delivery</p>
        </div>
        <div className="flex gap-2">
          <Badge className="bg-green-800">AI Shopping</Badge>
          {getCartCount() > 0 && (
            <Badge className="bg-red-500">{getCartCount()} items</Badge>
          )}
        </div>
      </div>

      {/* View Toggle */}
      <div className="bg-gray-50 border-b p-2">
        <div className="flex gap-1">
          <Button
            variant={activeView === 'shop' ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveView('shop')}
            className="flex-1"
          >
            <ShoppingCart className="w-4 h-4 mr-1" />
            Shop
          </Button>
          <Button
            variant={activeView === 'chat' ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveView('chat')}
            className="flex-1"
          >
            <MessageCircle className="w-4 h-4 mr-1" />
            Chat
          </Button>
          <Button
            variant={activeView === 'cart' ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveView('cart')}
            className="flex-1 relative"
          >
            <ShoppingCart className="w-4 h-4 mr-1" />
            Cart
            {getCartCount() > 0 && (
              <Badge className="absolute -top-1 -right-1 bg-red-500 text-white w-4 h-4 rounded-full text-xs">
                {getCartCount()}
              </Badge>
            )}
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        {activeView === 'shop' && (
          <div className="p-4">
            <WhatsAppShoppingFlow
              onAddToCart={handleAddToCart}
              onViewCart={() => setActiveView('cart')}
              cartCount={getCartCount()}
            />
          </div>
        )}

        {activeView === 'cart' && (
          <div className="p-4">
            <WhatsAppCart
              items={cart}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onCheckout={handleCheckout}
              onBackToShopping={() => setActiveView('shop')}
            />
          </div>
        )}

        {activeView === 'chat' && (
          <div className="p-4 space-y-4 bg-gray-100 min-h-full">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  msg.type === 'user' 
                    ? 'bg-green-600 text-white rounded-br-none' 
                    : 'bg-white text-gray-900 rounded-bl-none shadow'
                }`}>
                  <p className="text-sm whitespace-pre-line">{msg.message}</p>
                  <p className={`text-xs mt-1 ${
                    msg.type === 'user' ? 'text-green-200' : 'text-gray-500'
                  }`}>
                    {msg.timestamp}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area - Only show in chat mode */}
      {activeView === 'chat' && (
        <div className="p-4 bg-white border-t flex items-center gap-2 sticky bottom-0">
          <input
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 px-3 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <Button 
            onClick={handleSendMessage}
            size="sm"
            className="rounded-full bg-green-600 hover:bg-green-700"
            disabled={!currentInput.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Status Bar */}
      <div className="px-4 py-2 bg-gray-50 border-t flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-3 h-3 text-green-600" />
          <span className="text-gray-600">Instant Delivery</span>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="w-3 h-3 text-blue-600" />
          <span className="text-gray-600">Secure Checkout</span>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppAssistant;
