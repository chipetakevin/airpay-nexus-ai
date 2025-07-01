
import jsPDF from 'jspdf';

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

export const generateDivineMobilePDFReceipt = (receiptData: DivineMobileReceiptData): jsPDF => {
  const doc = new jsPDF({
    format: 'a4',
    unit: 'mm'
  });

  // Colors - Divine Mobile branding
  const primaryPurple: [number, number, number] = [79, 70, 229]; // Divine purple
  const accentBlue: [number, number, number] = [59, 130, 246]; // Blue accent
  const darkGray: [number, number, number] = [31, 41, 55];
  const lightGray: [number, number, number] = [243, 244, 246];

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;
  let yPos = 20;

  // Header with Divine Mobile branding
  doc.setFillColor(...primaryPurple);
  doc.rect(0, 0, pageWidth, 60, 'F');

  // Divine Mobile Logo Area
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(margin, 15, 60, 25, 3, 3, 'F');
  
  // Logo representation (C and F for Divine Mobile)
  doc.setFillColor(...primaryPurple);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Divine', margin + 5, 28);
  doc.setTextColor(...accentBlue);
  doc.text('Mobile', margin + 5, 35);

  // Receipt title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('Digital Transaction Receipt', margin, 80);

  // Business details
  yPos = 90;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Divine Mobile Promotions', margin, yPos);
  doc.text('22 9th Avenue', margin, yPos + 5);
  doc.text('Tel: +27832466539', margin, yPos + 10);

  // Transaction details section
  yPos = 115;
  doc.setFillColor(...lightGray);
  doc.rect(margin, yPos, pageWidth - (margin * 2), 45, 'F');
  
  doc.setTextColor(...darkGray);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  
  const date = new Date(receiptData.timestamp);
  const formattedDate = date.toLocaleDateString('en-ZA').replace(/\//g, '-');
  const formattedTime = date.toLocaleTimeString('en-ZA', { hour12: false });

  doc.text('Entry: Contactless EMV', margin + 5, yPos + 8);
  doc.text(`PAN: **** **** **** ${receiptData.customerPhone.slice(-4)}`, margin + 5, yPos + 15);
  doc.text(`Transaction ID: ${receiptData.transactionId}`, margin + 5, yPos + 22);
  doc.text(`Authorization: ${receiptData.authorizationId || 'AUTO-APPROVED'}`, margin + 5, yPos + 29);
  doc.text('Transaction Type: DIGITAL SERVICES', margin + 5, yPos + 36);

  // Approval status
  yPos += 55;
  doc.setFillColor(16, 185, 129);
  doc.rect(margin, yPos, pageWidth - (margin * 2), 15, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('✓ APPROVED - TRANSACTION SUCCESSFUL', margin + 5, yPos + 10);

  // Services purchased
  yPos += 25;
  doc.setTextColor(...darkGray);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('SERVICES PURCHASED:', margin, yPos);

  yPos += 10;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  receiptData.items.forEach((item) => {
    doc.text(`${item.network.toUpperCase()} ${item.type.toUpperCase()} R${item.amount}`, margin + 5, yPos);
    yPos += 7;
  });

  // Payment summary
  yPos += 10;
  doc.setFillColor(...accentBlue);
  doc.rect(margin, yPos, pageWidth - (margin * 2), 35, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  
  if (receiptData.cashbackEarned) {
    doc.text(`CASHBACK EARNED: R${receiptData.cashbackEarned.toFixed(2)}`, margin + 5, yPos + 8);
  }
  doc.text(`AMOUNT: R${receiptData.amount.toFixed(2)}`, margin + 5, yPos + 15);
  doc.text('TIPS: R0.00', margin + 5, yPos + 22);
  doc.text(`TOTAL: R${receiptData.amount.toFixed(2)}`, margin + 5, yPos + 29);

  // Date and time
  yPos += 45;
  doc.setTextColor(...darkGray);
  doc.setFontSize(10);
  doc.text(`DATE: ${formattedDate}`, margin, yPos);
  doc.text(`TIME: ${formattedTime}`, margin, yPos + 7);

  // Customer details
  yPos += 20;
  doc.setFont('helvetica', 'bold');
  doc.text('CUSTOMER DETAILS:', margin, yPos);
  doc.setFont('helvetica', 'normal');
  doc.text(`Customer: ${receiptData.customerName || 'Valued Customer'}`, margin, yPos + 10);
  doc.text(`Mobile: ${receiptData.customerPhone}`, margin, yPos + 17);
  if (receiptData.userType) {
    doc.text(`Type: ${receiptData.userType.toUpperCase()}`, margin, yPos + 24);
  }

  // Footer message
  yPos += 40;
  doc.setFillColor(...primaryPurple);
  doc.rect(margin, yPos, pageWidth - (margin * 2), 20, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('PLEASE RETAIN FOR YOUR RECORDS', margin + 5, yPos + 8);
  doc.text('ORIGINAL', margin + 5, yPos + 15);

  // Thank you message
  yPos = doc.internal.pageSize.height - 30;
  doc.setTextColor(107, 114, 128);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('🌟 Thank you for choosing Divine Mobile! 🌟', margin, yPos);
  doc.text('⚡ Fast • 🔒 Secure • 🎯 Reliable', margin, yPos + 7);
  doc.text('Support: +27832466539 | www.divinemobile.co.za', margin, yPos + 14);

  return doc;
};
