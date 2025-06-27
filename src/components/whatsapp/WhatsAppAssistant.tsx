
import React, { useState } from 'react';
import WhatsAppNavigation from './WhatsAppNavigation';
import WhatsAppChatView from './WhatsAppChatView';
import WhatsAppShoppingFlow from './WhatsAppShoppingFlow';
import WhatsAppCart from './WhatsAppCart';
import { useWhatsAppReceipt } from './WhatsAppReceiptSystem';

interface Message {
  id: number;
  type: 'user' | 'bot';
  message: string;
  timestamp: string;
}

const WhatsAppAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
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
  const { processCheckout } = useWhatsAppReceipt();

  const addMessage = (message: string, type: 'user' | 'bot') => {
    const newMessage: Message = {
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

  const getCartCount = () => cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="flex flex-col h-full max-w-md mx-auto bg-white relative">
      <WhatsAppNavigation
        activeView={activeView}
        cartCount={getCartCount()}
        onViewChange={setActiveView}
      />

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
          <WhatsAppChatView
            messages={messages}
            currentInput={currentInput}
            setCurrentInput={setCurrentInput}
            onSendMessage={handleSendMessage}
          />
        )}
      </div>
    </div>
  );
};

export default WhatsAppAssistant;
