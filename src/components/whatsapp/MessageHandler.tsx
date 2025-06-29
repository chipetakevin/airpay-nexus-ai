
import React from 'react';

export interface Message {
  id: number;
  type: 'user' | 'bot';
  message: string;
  timestamp: string;
}

interface MessageHandlerProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setActiveView: (view: 'chat' | 'shop' | 'cart') => void;
  cartLength: number;
}

export const useMessageHandler = ({ messages, setMessages, setActiveView, cartLength }: MessageHandlerProps) => {
  const addMessage = (message: string, type: 'user' | 'bot') => {
    const newMessage: Message = {
      id: messages.length + 1,
      type,
      message,
      timestamp: new Date().toLocaleTimeString()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = (currentInput: string) => {
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
        response = `🛒 Opening your cart! You have ${cartLength} items.`;
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
    }
  };

  return {
    addMessage,
    handleSendMessage
  };
};
