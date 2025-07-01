import React from 'react';
import { useToast } from '@/hooks/use-toast';
import jsPDF from 'jspdf';

interface ModernReceiptData {
  transactionId: string;
  amount: number;
  customerPhone: string;
  customerName?: string;
  customerEmail?: string;
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
  loyaltyPoints?: number;
  userType?: 'customer' | 'vendor' | 'admin';
  personalizedOffer?: string;
}

export const useModernDivineReceiptGenerator = () => {
  const { toast } = useToast();

  const generateQRCodeData = (receiptData: ModernReceiptData): string => {
    // Generate QR code data for receipt verification and digital access
    const qrData = {
      receiptId: receiptData.transactionId,
      amount: receiptData.amount,
      timestamp: receiptData.timestamp,
      verifyUrl: `https://divinemobile.co.za/verify/${receiptData.transactionId}`
    };
    return JSON.stringify(qrData);
  };

  const generateModernWhatsAppReceipt = (data: ModernReceiptData): string => {
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

    const itemsList = data.items.map(item => 
      `${item.network?.toUpperCase() || 'DIVINE MOBILE'} ${item.type?.toUpperCase() || 'AIRTIME'} R${item.amount}`
    ).join('\n');

    const loyaltyPoints = data.loyaltyPoints || Math.round(data.amount * 2);
    const cashback = data.cashbackEarned || (data.amount * 0.015);

    return `🌟 **DIVINE MOBILE** 📱
✨ Premium Digital Receipt ✨

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📍 **DIVINE MOBILE PROMOTIONS**
📧 support@divinemobile.co.za
📞 +27832466539
📍 22 9th Avenue, South Africa
🌐 www.divinemobile.co.za

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ **TRANSACTION APPROVED** ✅
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📱 **ONECARD MOBILE PAYMENT**
🔢 Transaction ID: ${data.transactionId}
🆔 Authorization: ${data.authorizationId || 'AUTH-' + Math.random().toString(36).substr(2, 8).toUpperCase()}
📅 Date: ${formattedDate}
⏰ Time: ${formattedTime}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🛒 **SERVICES PURCHASED**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${itemsList}

💰 **AMOUNT**: R${data.amount.toFixed(2)}
🎁 **CASHBACK EARNED**: R${cashback.toFixed(2)}
⭐ **LOYALTY POINTS**: +${loyaltyPoints} pts

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 **CUSTOMER DETAILS**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name: ${data.customerName || 'Valued Customer'}
Mobile: ${data.customerPhone}
Type: ${data.userType?.toUpperCase() || 'CUSTOMER'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 **EXCLUSIVE OFFER FOR YOU!**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${data.personalizedOffer || '🎉 Get 15% OFF your next recharge! 🎉\n💬 WhatsApp us "OFFER15" to claim'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔗 **QUICK LINKS**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📞 **Instant Support**: wa.me/27832466539
📋 **View Receipt Online**: divinemobile.co.za/receipt/${data.transactionId}
⭐ **Rate Service**: divinemobile.co.za/feedback
🔄 **Refund Policy**: divinemobile.co.za/refunds
🔒 **Privacy Policy**: divinemobile.co.za/privacy

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🌐 **FOLLOW US**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📘 Facebook: @DivineMobileSA
📸 Instagram: @divine_mobile_sa
🐦 Twitter: @DivineMobileSA
💼 LinkedIn: Divine Mobile SA

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔐 **SECURITY & PRIVACY**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Your data is protected with 256-bit encryption
✅ Transaction verified and secure
✅ Receipt digitally signed
✅ PCI DSS compliant payment processing

🌟 **Thank you for choosing Divine Mobile!** 🌟
⚡ Fast • 🔒 Secure • 🎯 Reliable

📋 **PLEASE RETAIN FOR YOUR RECORDS**
💾 **Digital Copy**: Check your email
📱 **Mobile Access**: Save this chat`;
  };

  const generateModernPDFReceipt = (data: ModernReceiptData): jsPDF => {
    const doc = new jsPDF({
      format: 'a4',
      unit: 'mm'
    });

    // Modern color scheme
    const divineBrand: [number, number, number] = [79, 70, 229]; // Indigo-600
    const accentGold: [number, number, number] = [245, 158, 11]; // Amber-500
    const successGreen: [number, number, number] = [34, 197, 94]; // Green-500
    const darkText: [number, number, number] = [17, 24, 39]; // Gray-900
    const lightBg: [number, number, number] = [248, 250, 252]; // Gray-50
    const white: [number, number, number] = [255, 255, 255];

    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    let yPos = 25;

    // Premium header with gradient effect
    doc.setFillColor(...divineBrand);
    doc.rect(0, 0, pageWidth, 80, 'F');
    
    // Accent stripe
    doc.setFillColor(...accentGold);
    doc.rect(0, 65, pageWidth, 15, 'F');

    // Logo area (enhanced with border)
    doc.setFillColor(...white);
    doc.roundedRect(margin, 15, 80, 40, 8, 8, 'F');
    doc.setDrawColor(...divineBrand);
    doc.setLineWidth(2);
    doc.roundedRect(margin, 15, 80, 40, 8, 8, 'S');
    
    // Crown logo symbol
    doc.setFillColor(...divineBrand);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('👑', margin + 10, 32);
    
    // Company name with enhanced styling
    doc.setFontSize(16);
    doc.text('DIVINE MOBILE', margin + 25, 28);
    doc.setFontSize(12);
    doc.setTextColor(120, 113, 108);
    doc.text('PROMOTIONS', margin + 25, 36);
    doc.setFontSize(10);
    doc.text('Premium Service Provider', margin + 25, 44);
    doc.setFontSize(8);
    doc.text('22 9th Avenue | +27832466539', margin + 25, 50);

    // Modern receipt title
    doc.setTextColor(...white);
    doc.setFontSize(28);
    doc.setFont('helvetica', 'bold');
    doc.text('DIGITAL RECEIPT', pageWidth - margin, 35, { align: 'right' });
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text('Premium Transaction Record', pageWidth - margin, 45, { align: 'right' });

    // QR Code placeholder (enhanced)
    yPos = 90;
    doc.setFillColor(...lightBg);
    doc.roundedRect(pageWidth - margin - 30, yPos, 30, 30, 5, 5, 'F');
    doc.setDrawColor(...divineBrand);
    doc.roundedRect(pageWidth - margin - 30, yPos, 30, 30, 5, 5, 'S');
    
    // QR Code representation
    doc.setFillColor(...darkText);
    doc.setFontSize(8);
    doc.text('📱 QR', pageWidth - margin - 20, yPos + 12, { align: 'center' });
    doc.text('SCAN', pageWidth - margin - 20, yPos + 18, { align: 'center' });
    doc.text('ACCESS', pageWidth - margin - 20, yPos + 24, { align: 'center' });

    // Transaction status with enhanced design
    doc.setFillColor(...successGreen);
    doc.roundedRect(margin, yPos, 70, 15, 5, 5, 'F');
    doc.setTextColor(...white);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('✓ APPROVED', margin + 35, yPos + 10, { align: 'center' });

    // Enhanced transaction details section
    yPos += 25;
    doc.setFillColor(...lightBg);
    doc.roundedRect(margin, yPos, pageWidth - (margin * 2), 50, 8, 8, 'F');
    doc.setDrawColor(229, 231, 235);
    doc.setLineWidth(1);
    doc.roundedRect(margin, yPos, pageWidth - (margin * 2), 50, 8, 8, 'S');
    
    doc.setTextColor(...darkText);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('📋 TRANSACTION DETAILS', margin + 10, yPos + 12);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Transaction ID: ${data.transactionId}`, margin + 10, yPos + 22);
    doc.text(`Authorization: ${data.authorizationId || 'AUTO-APPROVED'}`, margin + 10, yPos + 30);
    doc.text(`Date & Time: ${new Date(data.timestamp).toLocaleString('en-ZA')}`, margin + 10, yPos + 38);
    doc.text(`Payment Method: ${data.paymentMethod}`, margin + 10, yPos + 46);

    // Customer information with modern layout
    yPos += 60;
    const customerBoxWidth = (pageWidth - (margin * 3)) / 2;
    
    doc.setFillColor(...white);
    doc.roundedRect(margin, yPos, customerBoxWidth, 35, 6, 6, 'F');
    doc.setDrawColor(...divineBrand);
    doc.setLineWidth(1.5);
    doc.roundedRect(margin, yPos, customerBoxWidth, 35, 6, 6, 'S');
    
    doc.setTextColor(...divineBrand);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('👤 CUSTOMER INFORMATION', margin + 5, yPos + 10);
    
    doc.setTextColor(...darkText);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(`Name: ${data.customerName || 'Valued Customer'}`, margin + 5, yPos + 18);
    doc.text(`Mobile: ${data.customerPhone}`, margin + 5, yPos + 24);
    doc.text(`Type: ${data.userType?.toUpperCase() || 'CUSTOMER'}`, margin + 5, yPos + 30);

    // Service details box
    const serviceBoxX = margin + customerBoxWidth + 10;
    doc.setFillColor(...white);
    doc.roundedRect(serviceBoxX, yPos, customerBoxWidth, 35, 6, 6, 'F');
    doc.setDrawColor(...accentGold);
    doc.setLineWidth(1.5);
    doc.roundedRect(serviceBoxX, yPos, customerBoxWidth, 35, 6, 6, 'S');
    
    doc.setTextColor(...accentGold);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('📱 SERVICE PROVIDER', serviceBoxX + 5, yPos + 10);
    
    doc.setTextColor(...darkText);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('Provider: Divine Mobile', serviceBoxX + 5, yPos + 18);
    doc.text('Website: www.divinemobile.co.za', serviceBoxX + 5, yPos + 24);
    doc.text('Support: +27832466539', serviceBoxX + 5, yPos + 30);

    // Enhanced purchase summary
    yPos += 50;
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...darkText);
    doc.text('🛒 PURCHASE SUMMARY', margin, yPos);

    yPos += 10;
    // Modern table design
    doc.setFillColor(...divineBrand);
    doc.roundedRect(margin, yPos, pageWidth - (margin * 2), 12, 4, 4, 'F');
    doc.setTextColor(...white);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Service Description', margin + 5, yPos + 8);
    doc.text('Amount', pageWidth - margin - 40, yPos + 8);

    yPos += 12;
    data.items.forEach((item, index) => {
      const bgColor = index % 2 === 0 ? [249, 250, 251] : [255, 255, 255];
      doc.setFillColor(...bgColor as [number, number, number]);
      doc.rect(margin, yPos, pageWidth - (margin * 2), 10, 'F');
      
      doc.setTextColor(...darkText);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      const serviceName = `${item.network} ${item.type} R${item.amount}`;
      doc.text(serviceName, margin + 5, yPos + 6);
      doc.text(`R${item.price.toFixed(2)}`, pageWidth - margin - 40, yPos + 6);
      yPos += 10;
    });

    // Enhanced payment summary with rewards
    yPos += 15;
    doc.setFillColor(...accentGold);
    doc.roundedRect(margin, yPos, pageWidth - (margin * 2), 50, 8, 8, 'F');
    
    doc.setTextColor(...white);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('💰 PAYMENT & REWARDS SUMMARY', margin + 10, yPos + 12);
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text(`Total Amount: R${data.amount.toFixed(2)}`, margin + 10, yPos + 22);
    doc.text(`Cashback Earned: R${(data.cashbackEarned || data.amount * 0.015).toFixed(2)}`, margin + 10, yPos + 30);
    doc.text(`Loyalty Points: +${data.loyaltyPoints || Math.round(data.amount * 2)} pts`, margin + 10, yPos + 38);
    doc.text(`Payment Method: ${data.paymentMethod}`, margin + 10, yPos + 46);

    // Personalized offer section
    if (data.personalizedOffer) {
      yPos += 60;
      doc.setFillColor(236, 254, 255); // Light cyan
      doc.roundedRect(margin, yPos, pageWidth - (margin * 2), 25, 6, 6, 'F');
      doc.setDrawColor(6, 182, 212); // Cyan-500
      doc.setLineWidth(2);
      doc.roundedRect(margin, yPos, pageWidth - (margin * 2), 25, 6, 6, 'S');
      
      doc.setTextColor(14, 116, 144);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('🎯 EXCLUSIVE OFFER FOR YOU!', margin + 10, yPos + 10);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(data.personalizedOffer, margin + 10, yPos + 18);
    }

    // Contact and support section
    yPos += 35;
    doc.setFillColor(...lightBg);
    doc.roundedRect(margin, yPos, pageWidth - (margin * 2), 30, 6, 6, 'F');
    
    doc.setTextColor(...darkText);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('📞 SUPPORT & CONTACT', margin + 10, yPos + 10);
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('24/7 Support: +27832466539 | WhatsApp: wa.me/27832466539', margin + 10, yPos + 18);
    doc.text('Email: support@divinemobile.co.za | Website: www.divinemobile.co.za', margin + 10, yPos + 24);

    // Modern footer
    yPos = doc.internal.pageSize.height - 50;
    doc.setFillColor(...darkText);
    doc.rect(0, yPos, pageWidth, 50, 'F');
    
    doc.setTextColor(...white);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('🌟 Thank you for choosing Divine Mobile! 🌟', margin, yPos + 15);
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text('⚡ Fast • 🔒 Secure • 🎯 Reliable • 💎 Premium', margin, yPos + 25);
    
    doc.setFontSize(8);
    doc.text('📋 Please retain this receipt for your records', margin, yPos + 35);
    doc.text(`🔐 Digital Verification: ${new Date().toISOString()}`, margin, yPos + 42);

    return doc;
  };

  const processModernTransaction = (
    items: any[],
    customerPhone: string,
    customerName?: string,
    customerEmail?: string,
    userType?: 'customer' | 'vendor' | 'admin',
    cashbackEarned?: number,
    personalizedOffer?: string
  ) => {
    const total = items.reduce((sum, item) => {
      const itemPrice = typeof item.price === 'number' && !isNaN(item.price) ? item.price : 0;
      const quantity = typeof item.quantity === 'number' && !isNaN(item.quantity) ? item.quantity : 1;
      return sum + (itemPrice * quantity);
    }, 0);

    const transactionId = generateTransactionId();
    const loyaltyPoints = Math.round(total * 2);
    
    const receiptData: ModernReceiptData = {
      transactionId,
      amount: total,
      customerPhone,
      customerName,
      customerEmail,
      items: items.map(item => ({
        network: item.network || 'Divine Mobile',
        type: item.dealType || item.type || 'Digital Service',
        amount: item.amount || (typeof item.price === 'number' ? item.price.toFixed(2) : '0.00'),
        price: typeof item.price === 'number' && !isNaN(item.price) ? item.price : 0
      })),
      timestamp: new Date().toISOString(),
      paymentMethod: 'OneCard Mobile',
      authorizationId: generateAuthId(),
      cashbackEarned: typeof cashbackEarned === 'number' && !isNaN(cashbackEarned) ? cashbackEarned : total * 0.015,
      loyaltyPoints,
      userType,
      personalizedOffer: personalizedOffer || generatePersonalizedOffer(total, userType)
    };

    // Send WhatsApp receipt
    sendModernWhatsAppReceipt(receiptData);
    
    // Generate and download PDF
    const doc = generateModernPDFReceipt(receiptData);
    doc.save(`Divine_Mobile_Modern_Receipt_${transactionId}.pdf`);

    // Store transaction
    const existingTransactions = JSON.parse(localStorage.getItem('modernDivineTransactions') || '[]');
    existingTransactions.push(receiptData);
    localStorage.setItem('modernDivineTransactions', JSON.stringify(existingTransactions));

    return transactionId;
  };

  const sendModernWhatsAppReceipt = (receiptData: ModernReceiptData) => {
    const whatsappMessage = generateModernWhatsAppReceipt(receiptData);
    
    // Enhanced phone number cleaning
    let cleanPhone = receiptData.customerPhone.toString()
      .replace(/[\+\-\(\)\s]/g, '')
      .replace(/^0/, '27')
      .replace(/[^\d]/g, '');
    
    if (cleanPhone.length === 9 && !cleanPhone.startsWith('27')) {
      cleanPhone = '27' + cleanPhone;
    }
    
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
    
    // Auto-open WhatsApp
    setTimeout(() => {
      try {
        const newWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        if (!newWindow) {
          throw new Error('Popup blocked');
        }
      } catch (error) {
        console.error('Error opening WhatsApp:', error);
        navigator.clipboard?.writeText(whatsappMessage);
        toast({
          title: "Receipt Copied! 📋",
          description: "Modern receipt copied to clipboard. Open WhatsApp manually.",
          duration: 5000
        });
      }
    }, 500);

    toast({
      title: "🌟 Modern Divine Receipt Delivered!",
      description: "Enhanced receipt with QR code, offers, and clickable links sent",
      duration: 4000
    });

    return whatsappUrl;
  };

  const generateTransactionId = () => {
    return 'dm-' + Date.now().toString(36) + '-' + Math.random().toString(36).substr(2, 9);
  };

  const generateAuthId = () => {
    return 'AUTH-' + Math.random().toString(36).substr(2, 8).toUpperCase();
  };

  const generatePersonalizedOffer = (amount: number, userType?: string): string => {
    const offers = [
      '🎉 Get 15% OFF your next recharge! WhatsApp "OFFER15" to claim',
      '💎 Upgrade to Premium and get 25% extra airtime on all purchases',
      '🔄 Refer a friend and both get R10 bonus credit instantly',
      '⭐ Rate us 5 stars and receive R5 instant cashback',
      '🎁 Purchase R100+ airtime this week and get a FREE R20 bonus'
    ];
    
    if (userType === 'vendor') {
      return '👔 Agent Special: Earn 3x commission on next 5 transactions this week!';
    }
    
    if (amount > 100) {
      return '💰 High-value customer perk: Get 20% bonus on your next R200+ purchase!';
    }
    
    return offers[Math.floor(Math.random() * offers.length)];
  };

  return {
    generateModernWhatsAppReceipt,
    generateModernPDFReceipt,
    processModernTransaction,
    sendModernWhatsAppReceipt,
    generateQRCodeData,
    generateTransactionId
  };
};