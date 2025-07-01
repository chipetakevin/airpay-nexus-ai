
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

  const generateDivineMobileReceipt = (data: DivineMobileReceiptData): string => {
    const date = new Date(data.timestamp);
    const formattedDate = date.toLocaleDateString('en-ZA', {
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric'
    }).replace(/\//g, '-');
    const formattedTime = date.toLocaleTimeString('en-ZA', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });

    // Fix amount formatting - ensure we have valid numbers
    const totalAmount = typeof data.amount === 'number' && !isNaN(data.amount) ? data.amount : 0;
    const cashback = typeof data.cashbackEarned === 'number' && !isNaN(data.cashbackEarned) ? data.cashbackEarned : 0;

    const itemsList = data.items.map(item => {
      const itemPrice = typeof item.price === 'number' && !isNaN(item.price) ? item.price : 0;
      return `${item.network?.toUpperCase() || 'DIVINE MOBILE'} ${item.type?.toUpperCase() || 'AIRTIME'} R${item.amount || itemPrice.toFixed(2)}`;
    }).join('\n');

    return `
📱 **DIVINE MOBILE RECEIPT** 📱

          Divine Mobile
           Promotions
     22 9th Avenue
Tel: +27832466539

Entry:           Contactless EMV
PAN:             **** **** **** ${data.customerPhone.slice(-4)}
Expiry:          ${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear().toString().slice(-2)}
APL:             ONECARD MOBILE
AID:             A0000000041010

                 APPROVED ✅

Transaction ID:  ${data.transactionId}
PIN statement:   No CVM
Authorization ID: ${data.authorizationId || 'AUTH-' + Math.random().toString(36).substr(2, 8).toUpperCase()}
Transaction Type: DIGITAL SERVICES

-----------------------------

SERVICES PURCHASED:
${itemsList}

${cashback > 0 ? `CASHBACK EARNED:     R${cashback.toFixed(2)}\n` : ''}
AMOUNT           R${totalAmount.toFixed(2)}
TIPS             R0.00

TOTAL            R${totalAmount.toFixed(2)}

DATE             ${formattedDate}
TIME             ${formattedTime}

Customer: ${data.customerName || 'Valued Customer'}
Mobile:   ${data.customerPhone}
${data.userType ? `Type:     ${data.userType.toUpperCase()}` : ''}

PLEASE RETAIN FOR YOUR RECORDS

               ORIGINAL

🌟 Thank you for choosing Divine Mobile! 🌟
⚡ Fast • 🔒 Secure • 🎯 Reliable
Support: +27832466539
`;
  };

  const generateWhatsAppReceipt = (data: DivineMobileReceiptData): string => {
    const receiptText = generateDivineMobileReceipt(data);
    return `${receiptText}

🌐 www.divinemobile.co.za
💬 WhatsApp Support: +27832466539

*Digital receipt delivered instantly*`;
  };

  const sendDivineMobileReceipt = (receiptData: DivineMobileReceiptData) => {
    const whatsappMessage = generateWhatsAppReceipt(receiptData);
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${receiptData.customerPhone.replace('+', '')}?text=${encodedMessage}`;
    
    // Auto-open WhatsApp with receipt
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 1000);

    toast({
      title: "Divine Mobile Receipt Generated! 📱",
      description: "Professional receipt sent via WhatsApp",
      duration: 3000
    });

    return whatsappUrl;
  };

  const processDivineMobileTransaction = (
    items: any[], 
    customerPhone: string, 
    customerName?: string,
    userType?: 'customer' | 'vendor' | 'admin',
    cashbackEarned?: number
  ) => {
    // Calculate total with proper number handling
    const total = items.reduce((sum, item) => {
      const itemPrice = typeof item.price === 'number' && !isNaN(item.price) ? item.price : 0;
      const quantity = typeof item.quantity === 'number' && !isNaN(item.quantity) ? item.quantity : 1;
      return sum + (itemPrice * quantity);
    }, 0);

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
    generateDivineMobileReceipt,
    generateWhatsAppReceipt,
    sendDivineMobileReceipt,
    processDivineMobileTransaction,
    generateTransactionId
  };
};
