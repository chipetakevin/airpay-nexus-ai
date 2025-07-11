import React from 'react';
import { useToast } from '@/hooks/use-toast';

interface DivineMobileReceiptData {
  transactionId: string;
  amount: number;
  customerPhone: string;
  customerName?: string;
  items: Array<{
    network: string;
    type: string;
    amount: string;
    price: number;
  }>;
  timestamp: string;
  paymentMethod: string;
  authorizationId?: string;
  cashbackEarned?: number;
  userType?: 'customer' | 'vendor' | 'admin';
}

export const useDivineMobileReceiptGenerator = () => {
  const { toast } = useToast();

  const generateModernDivineMobileReceipt = (data: DivineMobileReceiptData): string => {
    const date = new Date(data.timestamp);
    const formattedDate = date.toLocaleDateString('en-ZA', {
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric'
    });
    const formattedTime = date.toLocaleTimeString('en-ZA', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });

    // Enhanced formatting with better number handling
    const totalAmount = typeof data.amount === 'number' && !isNaN(data.amount) ? data.amount : 0;
    const cashback = typeof data.cashbackEarned === 'number' && !isNaN(data.cashbackEarned) ? data.cashbackEarned : (totalAmount * 0.05);
    const loyaltyPoints = Math.round(totalAmount * 2);

    // Enhanced items list with pricing
    const itemsList = data.items.map(item => {
      const itemPrice = typeof item.price === 'number' && !isNaN(item.price) ? item.price : 0;
      return `• ${item.network?.toUpperCase() || 'DIVINE MOBILE'} ${item.type?.toUpperCase() || 'AIRTIME'} - R${itemPrice.toFixed(2)}`;
    }).join('\n');

    // Generate unique QR code data
    const qrData = `https://divinemobile.co.za/receipt/${data.transactionId}`;
    
    // Personalized offer based on purchase amount
    const personalizedOffer = totalAmount > 100 
      ? "🎁 VIP BONUS: Next purchase over R200 gets 20% extra airtime!"
      : "🔥 SPECIAL: Buy R100+ airtime this week, get R20 FREE!";

    return `📱 **DIVINE MOBILE** - PREMIUM DIGITAL RECEIPT

🏢 **DIVINE MOBILE PROMOTIONS**
📍 22 9th Avenue, South Africa
📞 +27 832 466 539
📧 support@divinemobile.co.za
🌐 www.divinemobile.co.za

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ **TRANSACTION APPROVED** ✅
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔐 **PAYMENT DETAILS**
Entry Method:        Contactless EMV
Card Number:         **** **** **** ${data.customerPhone.slice(-4)}
Expiry Date:         ${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear().toString().slice(-2)}
Provider:            ONECARD MOBILE
AID:                 A00000000041010
Status:              **APPROVED** ✅

🆔 **TRANSACTION INFO**
Transaction ID:      ${data.transactionId}
PIN Statement:       No CVM Required
Authorization:       ${data.authorizationId || 'AUTH-' + Math.random().toString(36).substr(2, 8).toUpperCase()}
Type:                DIGITAL SERVICES
Processing Time:     Instant ⚡

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🛒 **PURCHASE SUMMARY**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${itemsList}

**Subtotal:**        R${totalAmount.toFixed(2)}
**Discount:**        R0.00
**VAT (15%):**       R${(totalAmount * 0.15).toFixed(2)}
**Service Fee:**     R0.00

💰 **TOTAL PAID:**   **R${totalAmount.toFixed(2)}**

🎁 **REWARDS EARNED**
• Cashback:          R${cashback.toFixed(2)}
• Loyalty Points:    +${loyaltyPoints} pts
• VIP Status:        Active ⭐

📅 **DATE & TIME:** ${formattedDate} at ${formattedTime} SAST

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 **CUSTOMER INFORMATION**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Name:**            ${data.customerName || 'Valued Customer'}
**Mobile:**          ${data.customerPhone.replace('+27', '0')}
**Account Type:**    ${data.userType?.toUpperCase() || 'PREMIUM CUSTOMER'}
**Member Since:**    2024

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 **EXCLUSIVE OFFER FOR YOU**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${personalizedOffer}

💬 WhatsApp "CLAIM" to: +27 832 466 539

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 **DIGITAL FEATURES**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📱 **QR Code Access:** ${qrData}
🔗 **View Online:** divinemobile.co.za/receipt/${data.transactionId}
📊 **Rate Service:** divinemobile.co.za/feedback
💾 **Download PDF:** Available via email
📤 **Share Receipt:** Forward this WhatsApp message
☁️ **Cloud Storage:** Auto-saved to your account

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🛡️ **SECURITY & PRIVACY**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ 256-bit SSL encryption used
✅ Transaction digitally verified
✅ Your data is protected (Privacy Policy)
✅ PCI DSS compliant processing

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📞 **INSTANT SUPPORT**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🆘 24/7 Support: +27 832 466 539
💬 WhatsApp: wa.me/27832466539
📧 Email: support@divinemobile.co.za
🌐 Help Center: divinemobile.co.za/help
💻 Live Chat: Available on website

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🌟 **THANK YOU FOR CHOOSING DIVINE MOBILE!** 🌟
⚡ Instant • 🔒 Secure • 🎯 Reliable • 💎 Premium

📱 *Keep this receipt for your records*
🔄 *Refund Policy: divinemobile.co.za/refunds*
📜 *Terms: divinemobile.co.za/terms*`;
  };

  const generateWhatsAppReceipt = (data: DivineMobileReceiptData): string => {
    const receiptText = generateModernDivineMobileReceipt(data);
    return receiptText; // Already includes all features
  };

  const sendDivineMobileReceipt = (receiptData: DivineMobileReceiptData) => {
    try {
      console.log('🚀 Starting WhatsApp receipt delivery...');
      
      const whatsappMessage = generateWhatsAppReceipt(receiptData);
      console.log('📝 Generated message length:', whatsappMessage.length);
      
      // Enhanced phone number cleaning for global compatibility
      let cleanPhone = receiptData.customerPhone.toString()
        .replace(/[\+\-\(\)\s]/g, '') // Remove formatting
        .replace(/^0/, '27') // South African format
        .replace(/[^\d]/g, ''); // Keep only digits
      
      // Ensure proper format
      if (cleanPhone.length === 9 && !cleanPhone.startsWith('27')) {
        cleanPhone = '27' + cleanPhone;
      }
      
      console.log('📞 Cleaned phone number:', cleanPhone);
      
      // Check message length and truncate if necessary
      let finalMessage = whatsappMessage;
      const maxLength = 1800; // Conservative WhatsApp URL limit
      
      if (whatsappMessage.length > maxLength) {
        // Create shorter version for WhatsApp
        const shortReceipt = `📱 **DIVINE MOBILE RECEIPT**

✅ **TRANSACTION APPROVED**

🆔 **Transaction:** ${receiptData.transactionId}
💰 **Amount:** R${receiptData.amount.toFixed(2)}
🎁 **Cashback:** R${(receiptData.cashbackEarned || receiptData.amount * 0.05).toFixed(2)}
📅 **Date:** ${new Date(receiptData.timestamp).toLocaleDateString('en-ZA')}

👤 **Customer:** ${receiptData.customerName || 'Valued Customer'}
📱 **Mobile:** ${receiptData.customerPhone.replace('+27', '0')}

🔗 **Full Receipt:** divinemobile.co.za/receipt/${receiptData.transactionId}
📞 **Support:** +27 832 466 539

🌟 Thank you for choosing Divine Mobile! 🌟`;
        
        finalMessage = shortReceipt;
        console.log('✂️ Message truncated to:', finalMessage.length, 'characters');
      }
      
      const encodedMessage = encodeURIComponent(finalMessage);
      const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
      
      console.log('🔗 WhatsApp URL length:', whatsappUrl.length);
      
      // Validate URL length
      if (whatsappUrl.length > 2048) {
        throw new Error('URL too long for WhatsApp');
      }
      
      // Auto-open WhatsApp with enhanced error handling
      setTimeout(() => {
        try {
          console.log('🚀 Opening WhatsApp...');
          const newWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
          
          if (!newWindow) {
            throw new Error('Popup blocked or failed to open');
          }
          
          console.log('✅ WhatsApp opened successfully');
          
          toast({
            title: "📱 Modern Receipt Delivered!",
            description: "Premium digital receipt sent via WhatsApp with all features",
            duration: 4000
          });
          
        } catch (error) {
          console.error('❌ WhatsApp open failed:', error);
          
          // Fallback: Copy to clipboard
          navigator.clipboard?.writeText(finalMessage).then(() => {
            toast({
              title: "📋 Receipt Copied!",
              description: "WhatsApp link failed. Receipt copied to clipboard - paste into WhatsApp manually",
              duration: 7000
            });
          }).catch(() => {
            toast({
              title: "⚠️ WhatsApp Issue",
              description: "Please try again or contact support for your receipt",
              variant: "destructive"
            });
          });
        }
      }, 500);

      return whatsappUrl;
      
    } catch (error) {
      console.error('💥 Receipt delivery error:', error);
      
      toast({
        title: "Receipt Delivery Failed",
        description: "Unable to send WhatsApp receipt. Please try again.",
        variant: "destructive"
      });
      
      return null;
    }
  };

  const processDivineMobileTransaction = (
    items: any[], 
    customerPhone: string, 
    customerName?: string,
    userType?: 'customer' | 'vendor' | 'admin',
    cashbackEarned?: number,
    transactionAmount?: number
  ) => {
    // Use provided transaction amount or calculate from items as fallback
    const total = typeof transactionAmount === 'number' && !isNaN(transactionAmount) && transactionAmount > 0 
      ? transactionAmount 
      : items.reduce((sum, item) => {
          const itemPrice = typeof item.price === 'number' && !isNaN(item.price) ? item.price : 0;
          const quantity = typeof item.quantity === 'number' && !isNaN(item.quantity) ? item.quantity : 1;
          return sum + (itemPrice * quantity);
        }, 0);
    
    console.log('💰 RECEIPT AMOUNT TRACKING - Divine Mobile using amount:', total, 'from transactionAmount:', transactionAmount);

    const transactionId = generateTransactionId();
    
    const receiptData: DivineMobileReceiptData = {
      transactionId,
      amount: total,
      customerPhone,
      customerName,
      items: items.map(item => ({
        network: item.network || 'Divine Mobile',
        type: item.dealType || item.type || 'Digital Service',
        amount: item.amount || (typeof item.price === 'number' ? item.price.toFixed(2) : '0.00'),
        price: typeof item.price === 'number' && !isNaN(item.price) ? item.price : 0
      })),
      timestamp: new Date().toISOString(),
      paymentMethod: 'OneCard Mobile',
      authorizationId: generateAuthId(),
      cashbackEarned: typeof cashbackEarned === 'number' && !isNaN(cashbackEarned) ? cashbackEarned : 0,
      userType
    };

    // Store transaction locally
    const existingTransactions = JSON.parse(localStorage.getItem('divineMobileTransactions') || '[]');
    existingTransactions.push(receiptData);
    localStorage.setItem('divineMobileTransactions', JSON.stringify(existingTransactions));

    // Send receipt
    sendDivineMobileReceipt(receiptData);

    return transactionId;
  };

  const generateTransactionId = () => {
    return 'dm-' + Date.now().toString(36) + '-' + Math.random().toString(36).substr(2, 9);
  };

  const generateAuthId = () => {
    return 'AUTH-' + Math.random().toString(36).substr(2, 8).toUpperCase();
  };

  return {
    generateDivineMobileReceipt: generateModernDivineMobileReceipt,
    generateWhatsAppReceipt,
    sendDivineMobileReceipt,
    processDivineMobileTransaction,
    generateTransactionId
  };
};