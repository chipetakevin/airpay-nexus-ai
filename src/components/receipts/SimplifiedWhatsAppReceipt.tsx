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
      console.log('🔧 DEBUG: Starting WhatsApp receipt generation');
      console.log('🔧 DEBUG: Original phone:', customerPhone);
      console.log('🔧 DEBUG: Receipt data:', receiptData);
      
      const message = generateSimplifiedWhatsAppReceipt(receiptData);
      console.log('🔧 DEBUG: Generated message length:', message.length);
      
      // Enhanced phone number cleaning for WhatsApp compatibility
      let cleanPhone = customerPhone.toString()
        .replace(/[\+\-\(\)\s]/g, '') // Remove +, -, (, ), spaces
        .replace(/^0/, '27') // Replace leading 0 with 27 for South Africa
        .replace(/[^\d]/g, ''); // Keep only digits
      
      // Ensure South African format
      if (cleanPhone.length === 9 && !cleanPhone.startsWith('27')) {
        cleanPhone = '27' + cleanPhone;
      }
      
      // Validate phone number
      if (cleanPhone.length < 10 || cleanPhone.length > 15) {
        throw new Error('Invalid phone number format');
      }
      
      console.log('🔧 DEBUG: Cleaned phone:', cleanPhone);
      
      // Truncate message if too long (WhatsApp has URL length limits)
      let finalMessage = message;
      if (message.length > 1500) {
        finalMessage = message.substring(0, 1500) + '\n\n...Message truncated. Full receipt available via email.';
        console.log('🔧 DEBUG: Message truncated to:', finalMessage.length, 'characters');
      }
      
      // Create WhatsApp URL with proper encoding
      const encodedMessage = encodeURIComponent(finalMessage);
      const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
      
      console.log('🔧 DEBUG: Final WhatsApp URL length:', whatsappUrl.length);
      console.log('🔧 DEBUG: WhatsApp URL preview:', whatsappUrl.substring(0, 150) + '...');
      
      // Validate URL length (WhatsApp has limits around 2048 characters)
      if (whatsappUrl.length > 2000) {
        console.log('🔧 DEBUG: URL too long, using fallback');
        // Fallback to very short message
        const shortMessage = `🌟 ADDEX-HUB MOBILE 📱\n\nPurchase Complete ✅\nTotal: R${receiptData.totalPaid.toFixed(2)}\nCashback: R${receiptData.cashback.toFixed(2)}\n\nFull receipt emailed to you.\n\nSupport: +27 100 2827`;
        const shortUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(shortMessage)}`;
        console.log('🔧 DEBUG: Short URL length:', shortUrl.length);
        
        // Use short URL instead
        setTimeout(() => {
          try {
            console.log('🔧 DEBUG: Attempting to open WhatsApp with short URL');
            const newWindow = window.open(shortUrl, '_blank', 'noopener,noreferrer');
            if (!newWindow) {
              throw new Error('Popup blocked');
            }
            console.log('🔧 DEBUG: WhatsApp opened successfully');
          } catch (error) {
            console.error('🔧 DEBUG: Error opening WhatsApp:', error);
            navigator.clipboard?.writeText(shortMessage);
            toast({
              title: "Receipt Copied! 📋",
              description: `Short receipt copied. Open WhatsApp and send to ${customerPhone}`,
              duration: 7000
            });
          }
        }, 300);
        
        toast({
          title: "📱 Short Receipt Sent!",
          description: "Quick purchase summary delivered via WhatsApp",
          duration: 3000
        });
        
        return { success: true, whatsappUrl: shortUrl };
      }
      
      // Auto-open WhatsApp with enhanced error handling
      setTimeout(() => {
        try {
          console.log('🔧 DEBUG: Attempting to open WhatsApp');
          const newWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
          if (!newWindow) {
            throw new Error('Popup blocked');
          }
          console.log('🔧 DEBUG: WhatsApp opened successfully');
        } catch (error) {
          console.error('🔧 DEBUG: Error opening WhatsApp:', error);
          // Enhanced fallback with manual link
          navigator.clipboard?.writeText(finalMessage).then(() => {
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
      console.error('🔧 DEBUG: Error in sendSimplifiedWhatsAppReceipt:', error);
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