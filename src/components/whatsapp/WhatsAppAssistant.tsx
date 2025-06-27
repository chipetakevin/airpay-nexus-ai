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

🛍️ Shop instantly below or chat for assistance!

🌟 Available:
• Airtime (all networks)
• Data bundles (discounted)
• Gift options
• International top-ups

💬 Browse below or ask me anything!`,
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
    
    const customerPhone = '27832466539';
    const transactionId = processCheckout(cart, customerPhone);
    
    addMessage(`✅ Order confirmed! Transaction ID: ${transactionId}. WhatsApp receipt will open automatically.`, 'bot');
    
    setTimeout(() => {
      setCart([]);
      setActiveView('chat');
    }, 2000);
  };

  const handleSendMessage = () => {
    if (currentInput.trim()) {
      addMessage(currentInput, 'user');
      
      const lowerInput = currentInput.toLowerCase();
      let response = '';
      
      if (lowerInput.includes('help') || lowerInput.includes('support')) {
        response = `🆘 I'm here to help!

• Browse products below for instant shopping
• Ask about networks or amounts
• Customer support: +27 100 2827

What can I help you with? 😊`;
      } else if (lowerInput.includes('airtime')) {
        response = `💰 Airtime options available below:

• R10, R20, R50, R100
• All networks supported
• Instant delivery

Browse and add to cart below! 🛒`;
        setActiveView('shop');
      } else if (lowerInput.includes('data')) {
        response = `📊 Data bundles with savings:

• 1GB - R29 (17% OFF!)
• 2GB - R49 - Popular
• 5GB - R99 - Best value
• 10GB - R149 - Power users

Check them out below! 📱`;
        setActiveView('shop');
      } else if (lowerInput.includes('cart')) {
        setActiveView('cart');
        response = `🛒 Opening your cart! You have ${cart.length} items.`;
      } else {
        response = `Thanks! 😊

I can help with:
• Airtime purchases
• Data bundles with discounts
• Gift options
• Order assistance

Browse products below or ask questions! 💬`;
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
      {/* Minimal Navigation */}
      <div className="bg-gray-50 p-1 sticky top-0 z-10">
        <div className="flex gap-1">
          <Button
            variant={activeView === 'shop' ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveView('shop')}
            className="flex-1 h-7 text-xs"
          >
            Shop
          </Button>
          <Button
            variant={activeView === 'chat' ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveView('chat')}
            className="flex-1 h-7 text-xs"
          >
            Chat
          </Button>
          <Button
            variant={activeView === 'cart' ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveView('cart')}
            className="flex-1 h-7 text-xs relative"
          >
            Cart
            {getCartCount() > 0 && (
              <Badge className="absolute -top-1 -right-1 bg-red-500 text-white w-3 h-3 rounded-full text-xs flex items-center justify-center p-0 text-[10px]">
                {getCartCount()}
              </Badge>
            )}
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        {activeView === 'shop' && (
          <div className="p-2">
            <WhatsAppShoppingFlow
              onAddToCart={handleAddToCart}
              onViewCart={() => setActiveView('cart')}
              cartCount={getCartCount()}
            />
          </div>
        )}

        {activeView === 'cart' && (
          <div className="p-2">
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
          <div className="p-2 space-y-2 bg-gray-100 min-h-full">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs px-2 py-1 rounded-lg text-xs ${
                  msg.type === 'user' 
                    ? 'bg-green-600 text-white rounded-br-none' 
                    : 'bg-white text-gray-900 rounded-bl-none shadow'
                }`}>
                  <p className="whitespace-pre-line">{msg.message}</p>
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
        <div className="p-2 bg-white border-t flex items-center gap-2 sticky bottom-0">
          <input
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 px-2 py-1 text-xs border rounded-full focus:outline-none focus:ring-1 focus:ring-green-500"
          />
          <Button 
            onClick={handleSendMessage}
            size="sm"
            className="rounded-full bg-green-600 hover:bg-green-700 w-6 h-6 p-0"
            disabled={!currentInput.trim()}
          >
            <Send className="w-3 h-3" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default WhatsAppAssistant;
