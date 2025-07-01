import React from 'react';
import { useToast } from '@/hooks/use-toast';

interface PurchaseItem {
  network: string;
  type: string;
  amount: string;
  price: number;
}

interface SimplifiedReceiptData {
  items: PurchaseItem[];
  subtotal: number;
  totalPaid: number;
  paymentMethod: string;
  status: string;
  cashback: number;
  loyaltyPoints: number;
  deliveryPhone: string;
}

export const useSimplifiedWhatsAppReceipt = () => {
  const { toast } = useToast();

  const generateSimplifiedWhatsAppReceipt = (data: SimplifiedReceiptData): string => {
    const itemsList = data.items.map(item => 
      `• **${item.network.toUpperCase().replace('DIVINELY', 'ADDEX-HUB')} ${item.type.toUpperCase()} R${item.amount}**
📱 Network: ${item.network.toUpperCase().replace('DIVINELY', 'ADDEX-HUB')}
💎 Service: ${item.type.toUpperCase()}
💰 Amount: R${item.price.toFixed(2)}`
    ).join('\n\n');

    return `🛒 **PURCHASE SUMMARY**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${itemsList}

**Subtotal**: R${data.subtotal.toFixed(2)}
**Total Paid**: R${data.totalPaid.toFixed(2)}
**Payment**: ${data.paymentMethod}
**Status**: ${data.status} ✅

**Rewards**:
• Cashback: R${data.cashback.toFixed(2)}
• Loyalty: ${data.loyaltyPoints} pts
• VIP: Active

**Delivery**:
• To: ${data.deliveryPhone.replace('+27', '0')}
• Status: Instantly Delivered ⚡
• Confirmation: 100% Success

🌟 **Thank you for choosing Addex-Hub Mobile!** 🌟
⚡ Fast • 🔒 Secure • 🎯 Reliable`;
  };

  const sendSimplifiedWhatsAppReceipt = (receiptData: SimplifiedReceiptData, customerPhone: string) => {
    try {
      const message = generateSimplifiedWhatsAppReceipt(receiptData);
      
      // Clean phone number for WhatsApp
      const cleanPhone = customerPhone
        .replace(/\+/g, '')
        .replace(/\s/g, '')
        .replace(/[^\d]/g, '');
      
      // Create WhatsApp URL with simplified message
      const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
      
      // Auto-open WhatsApp
      setTimeout(() => {
        try {
          window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        } catch (error) {
          console.error('Error opening WhatsApp:', error);
          // Fallback: copy to clipboard
          navigator.clipboard?.writeText(message);
          toast({
            title: "Receipt Copied! 📋",
            description: "Purchase summary copied to clipboard. Open WhatsApp manually and paste.",
            duration: 5000
          });
        }
      }, 500);

      toast({
        title: "📱 Purchase Summary Sent!",
        description: "Simplified receipt delivered via WhatsApp",
        duration: 3000
      });

      return { success: true, whatsappUrl };
    } catch (error) {
      console.error('Error sending simplified WhatsApp receipt:', error);
      toast({
        title: "WhatsApp Receipt Failed",
        description: "Unable to send WhatsApp receipt. Please try again.",
        variant: "destructive"
      });
      return { success: false };
    }
  };

  return {
    generateSimplifiedWhatsAppReceipt,
    sendSimplifiedWhatsAppReceipt
  };
};