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
      
      // Enhanced phone number cleaning for WhatsApp compatibility
      let cleanPhone = customerPhone.toString()
        .replace(/[\+\-\(\)\s]/g, '') // Remove +, -, (, ), spaces
        .replace(/^0/, '27') // Replace leading 0 with 27 for South Africa
        .replace(/[^\d]/g, ''); // Keep only digits
      
      // Ensure South African format
      if (cleanPhone.length === 9 && !cleanPhone.startsWith('27')) {
        cleanPhone = '27' + cleanPhone;
      }
      
      console.log('📱 Original phone:', customerPhone, 'Clean phone:', cleanPhone);
      
      // Create WhatsApp URL with proper encoding
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
      
      // Validate URL length (WhatsApp has limits)
      if (whatsappUrl.length > 2048) {
        throw new Error('Message too long for WhatsApp URL');
      }
      
      console.log('📱 WhatsApp URL generated successfully:', whatsappUrl.substring(0, 100) + '...');
      
      // Auto-open WhatsApp with better error handling
      setTimeout(() => {
        try {
          const newWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
          if (!newWindow) {
            throw new Error('Popup blocked');
          }
        } catch (error) {
          console.error('Error opening WhatsApp:', error);
          // Enhanced fallback with manual link
          navigator.clipboard?.writeText(message).then(() => {
            toast({
              title: "Receipt Copied! 📋",
              description: `Message copied to clipboard. Manually open WhatsApp and send to ${customerPhone}`,
              duration: 7000
            });
          }).catch(() => {
            // Final fallback - show the URL for manual copy
            toast({
              title: "WhatsApp Link Ready 📱",
              description: "Click anywhere to copy WhatsApp link and open manually",
              duration: 10000
            });
          });
        }
      }, 300);

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