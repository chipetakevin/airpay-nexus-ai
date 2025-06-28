
import jsPDF from 'jspdf';

interface ReceiptData {
  receiptNo: string;
  transactionId: string;
  dateTime: string;
  customer: {
    name: string;
    mobile: string;
    email?: string;
  };
  items: Array<{
    name: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
    network: string;
    type: string;
  }>;
  subtotal: number;
  discounts: number;
  tax: number;
  totalPaid: number;
  paymentMethod: string;
  cashbackEarned: number;
  deliveryPhone: string;
  vendor?: {
    name: string;
    id: string;
    commission: number;
  };
}

export const generateMobilePDFReceipt = (receiptData: ReceiptData): jsPDF => {
  const doc = new jsPDF({
    format: 'a4',
    unit: 'mm'
  });

  // Colors - Fixed tuple types
  const primaryColor: [number, number, number] = [79, 70, 229]; // Indigo
  const accentColor: [number, number, number] = [16, 185, 129]; // Green
  const darkGray: [number, number, number] = [31, 41, 55];
  const lightGray: [number, number, number] = [243, 244, 246];

  // Page settings
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;
  let yPos = 20;

  // Header Background
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, pageWidth, 50, 'F');

  // Company Logo Area
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(margin, 10, 50, 15, 3, 3, 'F');
  
  // Logo Text
  doc.setTextColor(...primaryColor);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('📱 DIVINELY', margin + 3, 20);
  doc.setTextColor(79, 130, 246);
  doc.text('MOBILE', margin + 3, 25);

  // Receipt Title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('Official Receipt', margin, 70);

  // Receipt Info Section
  yPos = 85;
  doc.setFillColor(...lightGray);
  doc.rect(margin, yPos, pageWidth - (margin * 2), 25, 'F');
  
  doc.setTextColor(...darkGray);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  
  doc.text(`Receipt No: ${receiptData.receiptNo}`, margin + 5, yPos + 8);
  doc.text(`Transaction ID: ${receiptData.transactionId}`, margin + 5, yPos + 15);
  doc.text(`Date: ${receiptData.dateTime}`, margin + 5, yPos + 22);

  // Customer Details
  yPos += 35;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Customer Details', margin, yPos);
  
  yPos += 8;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Name: ${receiptData.customer.name}`, margin, yPos);
  doc.text(`Mobile: ${receiptData.customer.mobile}`, margin, yPos + 7);
  if (receiptData.customer.email) {
    doc.text(`Email: ${receiptData.customer.email}`, margin, yPos + 14);
    yPos += 7;
  }

  // Items Section
  yPos += 20;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Purchase Details', margin, yPos);

  yPos += 10;
  // Table header
  doc.setFillColor(79, 70, 229);
  doc.rect(margin, yPos, pageWidth - (margin * 2), 8, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('Item', margin + 2, yPos + 5);
  doc.text('Qty', margin + 80, yPos + 5);
  doc.text('Price', margin + 100, yPos + 5);
  doc.text('Total', margin + 130, yPos + 5);

  yPos += 8;
  doc.setTextColor(...darkGray);
  doc.setFont('helvetica', 'normal');

  receiptData.items.forEach((item) => {
    doc.text(item.name, margin + 2, yPos + 5);
    doc.text(item.quantity.toString(), margin + 80, yPos + 5);
    doc.text(`R${item.unitPrice.toFixed(2)}`, margin + 100, yPos + 5);
    doc.text(`R${item.subtotal.toFixed(2)}`, margin + 130, yPos + 5);
    yPos += 8;
  });

  // Payment Summary
  yPos += 10;
  doc.setFillColor(...accentColor);
  doc.rect(margin, yPos, pageWidth - (margin * 2), 30, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  
  doc.text(`Subtotal: R${receiptData.subtotal.toFixed(2)}`, margin + 5, yPos + 8);
  if (receiptData.discounts > 0) {
    doc.text(`Discounts: -R${receiptData.discounts.toFixed(2)}`, margin + 5, yPos + 15);
  }
  doc.text(`TOTAL PAID: R${receiptData.totalPaid.toFixed(2)}`, margin + 5, yPos + 22);
  doc.text(`Payment: ${receiptData.paymentMethod}`, margin + 80, yPos + 8);
  doc.text(`Cashback: R${receiptData.cashbackEarned.toFixed(2)}`, margin + 80, yPos + 15);

  // Status
  yPos += 40;
  doc.setFillColor(16, 185, 129);
  doc.rect(margin, yPos, pageWidth - (margin * 2), 15, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(`✓ Payment Successful - Delivered to ${receiptData.deliveryPhone}`, margin + 5, yPos + 10);

  // Vendor Details (if applicable)
  if (receiptData.vendor) {
    yPos += 25;
    doc.setFillColor(147, 51, 234);
    doc.rect(margin, yPos, pageWidth - (margin * 2), 15, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.text(`Agent: ${receiptData.vendor.name} (${receiptData.vendor.id})`, margin + 5, yPos + 6);
    doc.text(`Commission: R${receiptData.vendor.commission.toFixed(2)}`, margin + 5, yPos + 12);
  }

  // Footer
  yPos = doc.internal.pageSize.height - 30;
  doc.setTextColor(107, 114, 128);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('Thank you for choosing Divinely Mobile!', margin, yPos);
  doc.text('Fast • Secure • Reliable', margin, yPos + 7);
  doc.text('Support: +27 100 2827 | myonecard.co.za', margin, yPos + 14);

  return doc;
};
