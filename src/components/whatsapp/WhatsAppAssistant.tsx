
import React, { useState } from 'react';
import WhatsAppNavigation from './WhatsAppNavigation';
import WhatsAppChatView from './WhatsAppChatView';
import WhatsAppShoppingFlow from './WhatsAppShoppingFlow';
import WhatsAppCart from './WhatsAppCart';
import { useMessageHandler, Message } from './MessageHandler';
import { useCartManager, CartItem } from './CartManager';
import { useCheckoutProcessor } from './CheckoutProcessor';

const WhatsAppAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'bot',
      message: `👋 Welcome to Divine Mobile!

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
  const [cart, setCart] = useState<CartItem[]>([]);

  const { addMessage, handleSendMessage } = useMessageHandler({
    messages,
    setMessages,
    setActiveView,
    cartLength: cart.length
  });

  const { handleAddToCart, handleUpdateQuantity, handleRemoveItem, getCartCount } = useCartManager({
    cart,
    setCart,
    addMessage
  });

  const { handleCheckout } = useCheckoutProcessor({
    cart,
    setCart,
    setActiveView,
    addMessage
  });

  const onSendMessage = () => {
    handleSendMessage(currentInput);
    setCurrentInput('');
  };

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
            onSendMessage={onSendMessage}
          />
        )}
      </div>
    </div>
  );
};

export default WhatsAppAssistant;
