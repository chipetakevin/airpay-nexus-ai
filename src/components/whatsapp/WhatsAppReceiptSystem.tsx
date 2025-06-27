
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
      `• ${item.name} (${item.network}) x${item.quantity} - R${item.price * item.quantity}`
    ).join('\n');

    return `🟢 *DIVINELY MOBILE RECEIPT*

✅ *PURCHASE COMPLETED*

📋 *ORDER DETAILS:*
${itemsList}

💰 *TOTAL PAID:* R${data.total}
🆔 *Transaction ID:* ${data.transactionId}
📱 *Customer:* ${data.customerPhone}
⏰ *Date:* ${new Date(data.timestamp).toLocaleString()}

✅ *All items delivered instantly!*

🌐 divinely-mobile.com
📞 Support: +27 100 2827

*Thank you for shopping with us!*
_Fast • Secure • Reliable_`;
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
