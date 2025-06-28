
import React from 'react';
import { useToast } from '@/hooks/use-toast';

interface ReceiptItem {
  name: string;
  type: string;
  network: string;
  amount: string;
  price: number;
  quantity: number;
}

interface ReceiptData {
  items: ReceiptItem[];
  total: number;
  customerPhone: string;
  customerName?: string;
  transactionId: string;
  timestamp: string;
}

export const useWhatsAppReceipt = () => {
  const { toast } = useToast();

  const generateWhatsAppReceipt = (data: ReceiptData): string => {
    const itemsList = data.items.map(item => 
      `• ${item.network?.toUpperCase().replace('DIVINELY', 'DIVINE') || 'DIVINE'} ${item.type?.toUpperCase() || 'AIRTIME'} R${item.amount} - R${item.price * item.quantity}`
    ).join('\n');

    const loyaltyPoints = Math.round(data.total * 2);

    return `🌟 **DIVINE MOBILE** 📱
✨ **Premium Digital Receipt** ✨

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 **TRANSACTION: CONFIRMED** ✅
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Receipt #**: DM${Date.now().toString().slice(-8)}
**Transaction ID**: ${data.transactionId}
**Date**: ${new Date(data.timestamp).toLocaleString('en-ZA', { timeZone: 'Africa/Johannesburg' })} SAST

**Customer**: ${data.customerName || 'Valued Customer'}
**Mobile**: ${data.customerPhone}

**Provider**: Divine Mobile
**Website**: www.divinemobile.co.za
**Support**: +27 100 2827
**Platform**: Addex-Hub

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🛒 **PURCHASE SUMMARY**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${itemsList}

**Total Paid**: R${data.total}
**Payment**: OneCard Mobile
**Status**: Payment Successful ✅

**Rewards**:
• Cashback: R${(data.total * 0.015).toFixed(2)}
• Loyalty: ${loyaltyPoints} pts
• VIP: Active

**Delivery**:
• To: ${data.customerPhone.replace('+27', '0')}
• Status: Instantly Delivered ⚡
• Confirmation: 100% Success

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 **SUPPORT & POLICIES**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Keep this receipt for records
• 24/7 Support: +27 100 2827
• Help: www.divinemobile.co.za/support
• Live Chat: On website
• Refunds: T&Cs apply

🌟 **Thank you for choosing Divine Mobile!** 🌟
⚡ Fast • 🔒 Secure • 🎯 Reliable

🔐 **Digital Verification**
• Verified: ${new Date().toISOString()}
• Platform: Addex-Hub Secure
• Trusted by thousands daily`;
  };

  const sendWhatsAppReceipt = (receiptData: ReceiptData) => {
    const message = generateWhatsAppReceipt(receiptData);
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${receiptData.customerPhone.replace('+', '')}?text=${encodedMessage}`;
    
    // Auto-open WhatsApp with receipt
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 1000);

    toast({
      title: "Receipt Generated! 📱",
      description: "WhatsApp receipt will open automatically",
      duration: 3000
    });

    return whatsappUrl;
  };

  const processCheckout = (items: ReceiptItem[], customerPhone: string, customerName?: string) => {
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const transactionId = 'DM' + Date.now().toString().slice(-8);
    
    const receiptData: ReceiptData = {
      items,
      total,
      customerPhone,
      customerName,
      transactionId,
      timestamp: new Date().toISOString()
    };

    // Store transaction locally
    const existingTransactions = JSON.parse(localStorage.getItem('whatsappTransactions') || '[]');
    existingTransactions.push(receiptData);
    localStorage.setItem('whatsappTransactions', JSON.stringify(existingTransactions));

    // Send receipt
    sendWhatsAppReceipt(receiptData);

    return transactionId;
  };

  return {
    generateWhatsAppReceipt,
    sendWhatsAppReceipt,
    processCheckout
  };
};

export default useWhatsAppReceipt;
