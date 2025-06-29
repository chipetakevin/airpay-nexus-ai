
import { useState, useEffect } from 'react';
import { useMobileAuth } from './useMobileAuth';
import { useToast } from './use-toast';

export interface CartItem {
  id: string;
  name: string;
  type: string;
  network: string;
  amount: string;
  price: number;
  quantity: number;
  icon: React.ReactNode;
}

export const useWhatsAppShopping = () => {
  const { isAuthenticated, currentUser } = useMobileAuth();
  const { toast } = useToast();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCart(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });

    toast({
      title: "Added to Cart! 🛒",
      description: `${item.name} has been added to your cart`,
      duration: 2000,
    });
  };

  const updateQuantity = (itemId: string, change: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === itemId) {
          const newQuantity = item.quantity + change;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
    toast({
      title: "Item Removed",
      description: "Item has been removed from your cart",
      duration: 2000,
    });
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const processCheckout = async () => {
    if (!isAuthenticated || !currentUser) {
      toast({
        title: "Authentication Required",
        description: "Please register to complete your purchase",
        variant: "destructive"
      });
      return false;
    }

    if (cart.length === 0) {
      toast({
        title: "Cart Empty",
        description: "Please add items to your cart first",
        variant: "destructive"
      });
      return false;
    }

    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Generate transaction data
      const transactionId = `WA${Date.now().toString().slice(-8)}`;
      const total = getCartTotal();
      const customerPhone = currentUser.registeredPhone;

      // Create serializable cart items (without React components)
      const serializableItems = cart.map(item => ({
        id: item.id,
        name: item.name,
        type: item.type,
        network: item.network,
        amount: item.amount,
        price: item.price,
        quantity: item.quantity
      }));

      // Create receipt data without circular references
      const receiptData = {
        transactionId,
        customerName: `${currentUser.firstName} ${currentUser.lastName}`,
        customerPhone,
        items: serializableItems,
        total,
        timestamp: new Date().toISOString(),
        paymentMethod: 'WhatsApp Payment'
      };

      // Store transaction locally
      const existingTransactions = JSON.parse(localStorage.getItem('whatsappTransactions') || '[]');
      existingTransactions.push(receiptData);
      localStorage.setItem('whatsappTransactions', JSON.stringify(existingTransactions));

      // Generate and send WhatsApp receipt
      await sendWhatsAppReceipt(receiptData);

      // Clear cart after successful checkout
      setCart([]);

      toast({
        title: "Payment Successful! ✅",
        description: `Transaction ${transactionId} completed. Receipt sent to WhatsApp!`,
        duration: 5000,
      });

      return true;

    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  const sendWhatsAppReceipt = async (receiptData: any) => {
    const { transactionId, customerName, customerPhone, items, total, timestamp } = receiptData;

    const itemsList = items.map((item: any) => 
      `• ${item.network?.toUpperCase() || 'DIVINE'} ${item.type?.toUpperCase() || 'AIRTIME'} R${item.amount} (${item.quantity}x) - R${item.price * item.quantity}`
    ).join('\n');

    const loyaltyPoints = Math.round(total * 2);
    const cashback = (total * 0.015).toFixed(2);

    const receiptMessage = `🌟 **DIVINE MOBILE** 📱
✨ **WhatsApp Receipt** ✨

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 **TRANSACTION: CONFIRMED** ✅
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Receipt #**: ${transactionId}
**Date**: ${new Date(timestamp).toLocaleString('en-ZA', { timeZone: 'Africa/Johannesburg' })} SAST

**Customer**: ${customerName}
**Mobile**: ${customerPhone}

**Provider**: Divine Mobile
**Platform**: WhatsApp Assistant
**Support**: +27 100 2827

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🛒 **PURCHASE SUMMARY**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${itemsList}

**Total Paid**: R${total}
**Payment**: WhatsApp Mobile
**Status**: Payment Successful ✅

**Rewards**:
• Cashback: R${cashback}
• Loyalty: ${loyaltyPoints} pts
• VIP Status: Active

**Delivery**:
• To: ${customerPhone.replace('+27', '0')}
• Status: Instantly Delivered ⚡
• Confirmation: 100% Success

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 **SUPPORT & POLICIES**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Keep this receipt for records
• 24/7 Support: +27 100 2827
• Help: www.divinemobile.co.za/support
• Refunds: T&Cs apply

🌟 **Thank you for choosing Divine Mobile!** 🌟
⚡ Fast • 🔒 Secure • 🎯 Reliable

🔐 **Digital Verification**
• Verified: ${new Date().toISOString()}
• Platform: WhatsApp Secure
• Trusted by thousands daily`;

    // Create WhatsApp URL and auto-open
    const encodedMessage = encodeURIComponent(receiptMessage);
    const whatsappUrl = `https://wa.me/${customerPhone.replace('+', '')}?text=${encodedMessage}`;
    
    // Auto-open WhatsApp with receipt
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 1000);

    return whatsappUrl;
  };

  return {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    getCartTotal,
    getCartCount,
    processCheckout,
    isProcessing,
    isAuthenticated,
    currentUser
  };
};
