
import { CartItem } from './CartManager';

interface CheckoutProcessorProps {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  setActiveView: (view: 'chat' | 'shop' | 'cart') => void;
  addMessage: (message: string, type: 'user' | 'bot') => void;
}

export const useCheckoutProcessor = ({ cart, setCart, setActiveView, addMessage }: CheckoutProcessorProps) => {
  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    const customerPhone = '27832466539';
    const transactionId = 'DM' + Date.now().toString().slice(-8);
    
    const itemsList = cart.map(item => 
      `• ${item.name} (${item.network}) x${item.quantity} - R${item.price * item.quantity}`
    ).join('\n');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const message = `🟢 *DIVINELY MOBILE RECEIPT*

✅ *PURCHASE COMPLETED*

📋 *ORDER DETAILS:*
${itemsList}

💰 *TOTAL PAID:* R${total}
🆔 *Transaction ID:* ${transactionId}
📱 *Customer:* ${customerPhone}
⏰ *Date:* ${new Date().toLocaleString()}

✅ *All items delivered instantly!*

🌐 divinely-mobile.com
📞 Support: +27 100 2827

*Thank you for shopping with us!*
_Fast • Secure • Reliable_`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${customerPhone.replace('+', '')}?text=${encodedMessage}`;
    
    addMessage(`✅ Order confirmed! Transaction ID: ${transactionId}. WhatsApp receipt will open automatically.`, 'bot');
    
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 1000);
    
    setTimeout(() => {
      setCart([]);
      setActiveView('chat');
    }, 2000);
  };

  return {
    handleCheckout
  };
};
