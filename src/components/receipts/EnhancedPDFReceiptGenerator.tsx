import jsPDF from 'jspdf';
import { useToast } from '@/hooks/use-toast';

interface EnhancedPDFReceiptData {
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
  totalPaid: number;
  paymentMethod: string;
  cashbackEarned: number;
  deliveryPhone: string;
  vendor?: {
    name: string;
    id: string;
    commission: number;
  };
  admin?: {
    fee: number;
    notes?: string;
  };
}

export const useEnhancedPDFReceiptGenerator = () => {
  const { toast } = useToast();

  const generateEnhancedPDFReceipt = (receiptData: EnhancedPDFReceiptData): jsPDF => {
    const doc = new jsPDF({
      format: 'a4',
      unit: 'mm'
    });

    // Enhanced color scheme
    const primaryBlue: [number, number, number] = [117, 184, 250]; // #75B8FA
    const accentGreen: [number, number, number] = [34, 197, 94]; // Green-500
    const darkText: [number, number, number] = [31, 41, 55]; // Gray-800
    const lightBg: [number, number, number] = [248, 250, 252]; // Gray-50
    const white: [number, number, number] = [255, 255, 255];

    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    let yPos = 25;

    // Enhanced Header with gradient effect simulation
    doc.setFillColor(...primaryBlue);
    doc.rect(0, 0, pageWidth, 70, 'F');
    
    // Secondary gradient layer
    doc.setFillColor(91, 146, 212); // Slightly darker blue
    doc.rect(0, 40, pageWidth, 30, 'F');

    // Logo placeholder area (enhanced)
    doc.setFillColor(...white);
    doc.roundedRect(margin, 15, 70, 35, 5, 5, 'F');
    
    // Logo representation - Crown symbol for Addex-Hub
    doc.setFillColor(...primaryBlue);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('👑', margin + 8, 32);
    doc.setFontSize(14);
    doc.text('ADDEX-HUB', margin + 18, 28);
    doc.setFontSize(12);
    doc.setTextColor(91, 146, 212);
    doc.text('MOBILE', margin + 18, 36);
    doc.setFontSize(10);
    doc.text('Premium Service', margin + 18, 42);

    // Enhanced receipt title
    doc.setTextColor(...white);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('PREMIUM DIGITAL RECEIPT', pageWidth - margin, 30, { align: 'right' });
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('Comprehensive Transaction Record', pageWidth - margin, 40, { align: 'right' });

    // Transaction status badge
    yPos = 85;
    doc.setFillColor(...accentGreen);
    doc.roundedRect(margin, yPos, 60, 12, 3, 3, 'F');
    doc.setTextColor(...white);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('✓ TRANSACTION SUCCESSFUL', margin + 30, yPos + 8, { align: 'center' });

    // Receipt information section with enhanced layout
    yPos = 110;
    doc.setFillColor(...lightBg);
    doc.roundedRect(margin, yPos, pageWidth - (margin * 2), 35, 5, 5, 'F');
    
    doc.setTextColor(...darkText);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('TRANSACTION DETAILS', margin + 5, yPos + 10);
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(`Receipt No: ${receiptData.receiptNo}`, margin + 5, yPos + 18);
    doc.text(`Transaction ID: ${receiptData.transactionId}`, margin + 5, yPos + 25);
    doc.text(`Date & Time: ${receiptData.dateTime}`, margin + 5, yPos + 32);

    // Customer details section
    yPos += 45;
    doc.setFillColor(...white);
    doc.roundedRect(margin, yPos, (pageWidth - (margin * 3)) / 2, 30, 5, 5, 'F');
    doc.setDrawColor(234, 234, 234);
    doc.roundedRect(margin, yPos, (pageWidth - (margin * 3)) / 2, 30, 5, 5, 'S');
    
    doc.setTextColor(...darkText);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('CUSTOMER INFORMATION', margin + 5, yPos + 8);
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(`Name: ${receiptData.customer.name}`, margin + 5, yPos + 16);
    doc.text(`Mobile: ${receiptData.customer.mobile}`, margin + 5, yPos + 22);
    if (receiptData.customer.email) {
      doc.text(`Email: ${receiptData.customer.email}`, margin + 5, yPos + 28);
    }

    // Service provider section
    const providerX = margin + (pageWidth - (margin * 3)) / 2 + 10;
    doc.setFillColor(...white);
    doc.roundedRect(providerX, yPos, (pageWidth - (margin * 3)) / 2, 30, 5, 5, 'F');
    doc.setDrawColor(234, 234, 234);
    doc.roundedRect(providerX, yPos, (pageWidth - (margin * 3)) / 2, 30, 5, 5, 'S');
    
    doc.setTextColor(...darkText);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('SERVICE PROVIDER', providerX + 5, yPos + 8);
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('Provider: Addex-Hub Mobile', providerX + 5, yPos + 16);
    doc.text('Website: www.addex-hub.co.za', providerX + 5, yPos + 22);
    doc.text('Support: +27 100 2827', providerX + 5, yPos + 28);

    // Enhanced items table
    yPos += 45;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...darkText);
    doc.text('PURCHASE DETAILS', margin, yPos);

    yPos += 8;
    // Table header with enhanced styling
    doc.setFillColor(...primaryBlue);
    doc.roundedRect(margin, yPos, pageWidth - (margin * 2), 10, 3, 3, 'F');
    doc.setTextColor(...white);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('Service Description', margin + 3, yPos + 6);
    doc.text('Qty', margin + 100, yPos + 6);
    doc.text('Unit Price', margin + 120, yPos + 6);
    doc.text('Total', margin + 150, yPos + 6);

    yPos += 10;
    doc.setTextColor(...darkText);
    doc.setFont('helvetica', 'normal');

    receiptData.items.forEach((item, index) => {
      const bgColor = index % 2 === 0 ? [249, 250, 251] : [255, 255, 255];
      doc.setFillColor(...bgColor as [number, number, number]);
      doc.rect(margin, yPos, pageWidth - (margin * 2), 8, 'F');
      
      const itemName = item.name.replace('DIVINE', 'ADDEX-HUB');
      doc.text(itemName, margin + 3, yPos + 5);
      doc.text(item.quantity.toString(), margin + 100, yPos + 5);
      doc.text(`R${item.unitPrice.toFixed(2)}`, margin + 120, yPos + 5);
      doc.text(`R${item.subtotal.toFixed(2)}`, margin + 150, yPos + 5);
      yPos += 8;
    });

    // Enhanced payment summary
    yPos += 10;
    doc.setFillColor(...accentGreen);
    doc.roundedRect(margin, yPos, pageWidth - (margin * 2), 45, 5, 5, 'F');
    
    doc.setTextColor(...white);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('PAYMENT SUMMARY', margin + 5, yPos + 10);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Subtotal: R${receiptData.subtotal.toFixed(2)}`, margin + 5, yPos + 18);
    if (receiptData.discounts > 0) {
      doc.text(`Discounts: -R${receiptData.discounts.toFixed(2)}`, margin + 5, yPos + 25);
    }
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text(`TOTAL PAID: R${receiptData.totalPaid.toFixed(2)}`, margin + 5, yPos + 35);
    
    // Payment method and rewards
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Payment Method: ${receiptData.paymentMethod}`, margin + 100, yPos + 18);
    doc.text(`Cashback Earned: R${receiptData.cashbackEarned.toFixed(2)}`, margin + 100, yPos + 25);
    doc.text(`Loyalty Points: +${Math.round(receiptData.totalPaid * 2)} pts`, margin + 100, yPos + 32);

    // Delivery confirmation
    yPos += 55;
    doc.setFillColor(236, 253, 245); // Light green background
    doc.roundedRect(margin, yPos, pageWidth - (margin * 2), 15, 3, 3, 'F');
    doc.setDrawColor(...accentGreen);
    doc.roundedRect(margin, yPos, pageWidth - (margin * 2), 15, 3, 3, 'S');
    doc.setTextColor(...accentGreen);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(`✓ Services Successfully Delivered to ${receiptData.deliveryPhone}`, margin + 5, yPos + 10);

    // Vendor details (if applicable)
    if (receiptData.vendor) {
      yPos += 25;
      doc.setFillColor(147, 51, 234, 20); // Light purple
      doc.roundedRect(margin, yPos, pageWidth - (margin * 2), 20, 3, 3, 'F');
      doc.setTextColor(147, 51, 234);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text('AGENT INFORMATION', margin + 5, yPos + 8);
      doc.setFont('helvetica', 'normal');
      doc.text(`Agent: ${receiptData.vendor.name} (ID: ${receiptData.vendor.id})`, margin + 5, yPos + 14);
      doc.text(`Commission: R${receiptData.vendor.commission.toFixed(2)}`, margin + 5, yPos + 20);
    }

    // Enhanced footer
    yPos = doc.internal.pageSize.height - 40;
    doc.setFillColor(...darkText);
    doc.rect(0, yPos, pageWidth, 40, 'F');
    doc.setTextColor(...white);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Thank you for choosing Addex-Hub Mobile!', margin, yPos + 10);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('⚡ Fast • 🔒 Secure • 🎯 Reliable', margin, yPos + 18);
    doc.text('24/7 Support: +27 100 2827 | www.addex-hub.co.za', margin, yPos + 26);
    doc.text(`Generated: ${new Date().toISOString()} | Platform: Addex-Hub Secure`, margin, yPos + 34);

    return doc;
  };

  const downloadEnhancedPDFReceipt = (receiptData: EnhancedPDFReceiptData) => {
    try {
      const doc = generateEnhancedPDFReceipt(receiptData);
      doc.save(`Addex_Hub_Receipt_${receiptData.receiptNo}.pdf`);
      
      toast({
        title: "📄 Enhanced PDF Receipt Downloaded",
        description: "Professional receipt with improved layout saved to your device",
        duration: 3000
      });
    } catch (error) {
      console.error('Error generating enhanced PDF:', error);
      toast({
        title: "PDF Generation Failed",
        description: "Unable to generate enhanced PDF receipt",
        variant: "destructive"
      });
    }
  };

  return {
    generateEnhancedPDFReceipt,
    downloadEnhancedPDFReceipt
  };
};