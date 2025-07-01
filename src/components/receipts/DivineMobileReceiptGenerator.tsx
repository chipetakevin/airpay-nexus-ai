
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

    const itemsList = data.items.map(item => 
      `${item.network?.toUpperCase() || 'DIVINE'} ${item.type?.toUpperCase() || 'AIRTIME'} R${item.amount}`
    ).join('\n');

    return `
             
          Divine Mobile
           Promotions
     22 9th Avenue
Tel: +27832466539

Entry:           Contactless EMV
PAN:             **** **** **** ${data.customerPhone.slice(-4)}
Expiry:          ${date.getMonth() + 1 < 10 ? '0' : ''}${date.getMonth() + 1}/${date.getFullYear().toString().slice(-2)}
APL:             ${data.paymentMethod.toUpperCase()}
AID:             A0000000041010

                 APPROVED ✅

Transaction ID:  ${data.transactionId}
PIN statement:   No CVM
Authorization ID: ${data.authorizationId || 'AUTO-APPROVED'}
Transaction Type: DIGITAL SERVICES

-----------------------------

SERVICES PURCHASED:
${itemsList}

${data.cashbackEarned ? `CASHBACK EARNED:     R${data.cashbackEarned.toFixed(2)}\n` : ''}
AMOUNT           R${data.amount.toFixed(2)}
TIPS             R0.00

TOTAL            R${data.amount.toFixed(2)}

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
    return `📱 **DIVINE MOBILE RECEIPT** 📱

\`\`\`
${receiptText}
\`\`\`

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
    const total = items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    const transactionId = generateTransactionId();
    
    const receiptData: DivineMobileReceiptData = {
      transactionId,
      amount: total,
      customerPhone,
      customerName,
      items: items.map(item => ({
        network: item.network || 'Divine',
        type: item.dealType || item.type || 'Digital Service',
        amount: item.amount || item.price.toString(),
        price: item.price
      })),
      timestamp: new Date().toISOString(),
      paymentMethod: 'OneCard Mobile',
      authorizationId: generateAuthId(),
      cashbackEarned,
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
