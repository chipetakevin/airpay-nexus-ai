import jsPDF from 'jspdf';

interface ReceiptPDFData {
  transactionId: string;
  customerName: string;
  customerPhone: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    network?: string;
  }>;
  total: number;
  timestamp: string;
  status: string;
}

export const generateReceiptPDF = async (receiptData: ReceiptPDFData): Promise<Blob> => {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  
  // Set up colors and styling
  const primaryColor = '#16a34a'; // Green
  const textColor = '#1f2937'; // Dark gray
  const lightGray = '#f3f4f6';
  
  // Header with logo/brand
  pdf.setFillColor(22, 163, 74); // Green background
  pdf.rect(0, 0, pageWidth, 40, 'F');
  
  // Brand name
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  pdf.text('DIVINE MOBILE', pageWidth / 2, 25, { align: 'center' });
  
  // Subtitle
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Digital Receipt', pageWidth / 2, 32, { align: 'center' });
  
  // Success checkmark
  pdf.setTextColor(22, 163, 74);
  pdf.setFontSize(20);
  pdf.text('✓', pageWidth - 30, 25);
  
  let yPosition = 60;
  
  // Transaction status banner
  pdf.setFillColor(240, 253, 244); // Light green background
  pdf.rect(20, yPosition - 5, pageWidth - 40, 20, 'F');
  pdf.setTextColor(22, 163, 74);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('SECURE TRANSACTION COMPLETED', pageWidth / 2, yPosition + 8, { align: 'center' });
  
  yPosition += 35;
  
  // Transaction details section
  pdf.setTextColor(31, 41, 55);
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Transaction Details', 20, yPosition);
  
  yPosition += 15;
  
  // Details grid
  const details = [
    ['Transaction ID:', receiptData.transactionId],
    ['Customer:', receiptData.customerName],
    ['Phone:', receiptData.customerPhone],
    ['Date:', new Date(receiptData.timestamp).toLocaleString('en-ZA', { 
      timeZone: 'Africa/Johannesburg',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }) + ' SAST'],
    ['Status:', receiptData.status]
  ];
  
  pdf.setFontSize(10);
  details.forEach(([label, value]) => {
    pdf.setFont('helvetica', 'bold');
    pdf.text(label, 20, yPosition);
    pdf.setFont('helvetica', 'normal');
    pdf.text(value, 80, yPosition);
    yPosition += 12;
  });
  
  yPosition += 15;
  
  // Items section
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Items Purchased', 20, yPosition);
  
  yPosition += 15;
  
  // Table header
  pdf.setFillColor(243, 244, 246); // Light gray
  pdf.rect(20, yPosition - 5, pageWidth - 40, 15, 'F');
  
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Item', 25, yPosition + 5);
  pdf.text('Network', 90, yPosition + 5);
  pdf.text('Qty', 130, yPosition + 5);
  pdf.text('Price', 150, yPosition + 5);
  pdf.text('Total', 170, yPosition + 5);
  
  yPosition += 20;
  
  // Items list
  pdf.setFont('helvetica', 'normal');
  receiptData.items.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    
    pdf.text(item.name.substring(0, 25), 25, yPosition);
    pdf.text(item.network || 'Divine Mobile', 90, yPosition);
    pdf.text(item.quantity.toString(), 130, yPosition);
    pdf.text(`R${item.price.toFixed(2)}`, 150, yPosition);
    pdf.text(`R${itemTotal.toFixed(2)}`, 170, yPosition);
    
    yPosition += 12;
  });
  
  // Line separator
  pdf.setDrawColor(229, 231, 235);
  pdf.line(20, yPosition + 5, pageWidth - 20, yPosition + 5);
  
  yPosition += 20;
  
  // Total section
  pdf.setFillColor(240, 253, 244); // Light green
  pdf.rect(20, yPosition - 5, pageWidth - 40, 20, 'F');
  
  pdf.setTextColor(22, 163, 74);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('TOTAL PAID:', 25, yPosition + 8);
  pdf.text(`R${receiptData.total.toFixed(2)}`, pageWidth - 25, yPosition + 8, { align: 'right' });
  
  yPosition += 40;
  
  // Security features
  pdf.setTextColor(31, 41, 55);
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Security Features', 20, yPosition);
  
  yPosition += 15;
  
  const securityFeatures = [
    '✓ End-to-End Encryption',
    '✓ 2-Factor Authentication', 
    '✓ Secure Data Storage',
    '✓ Fraud Protection'
  ];
  
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'normal');
  securityFeatures.forEach((feature, index) => {
    const x = 25 + (index % 2) * 90;
    const y = yPosition + Math.floor(index / 2) * 12;
    pdf.setTextColor(22, 163, 74);
    pdf.text('✓', x, y);
    pdf.setTextColor(31, 41, 55);
    pdf.text(feature.substring(2), x + 8, y);
  });
  
  yPosition += 40;
  
  // Footer
  pdf.setFillColor(22, 163, 74);
  pdf.rect(0, pageHeight - 40, pageWidth, 40, 'F');
  
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Thank you for choosing Divine Mobile!', pageWidth / 2, pageHeight - 25, { align: 'center' });
  pdf.text('⚡ Fast • 🔒 Secure • 🎯 Reliable', pageWidth / 2, pageHeight - 15, { align: 'center' });
  pdf.text('Support: +27 100 2827 | www.divinemobile.co.za', pageWidth / 2, pageHeight - 5, { align: 'center' });
  
  return pdf.output('blob');
};

export const downloadReceiptPDF = async (receiptData: ReceiptPDFData): Promise<string> => {
  try {
    const pdfBlob = await generateReceiptPDF(receiptData);
    const url = URL.createObjectURL(pdfBlob);
    
    // Create download link
    const link = document.createElement('a');
    link.href = url;
    link.download = `Receipt_${receiptData.transactionId}.pdf`;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up URL
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);
    
    return url;
  } catch (error) {
    console.error('PDF generation failed:', error);
    throw error;
  }
};

export const openReceiptPDFInNewTab = async (receiptData: ReceiptPDFData): Promise<string> => {
  try {
    const pdfBlob = await generateReceiptPDF(receiptData);
    const url = URL.createObjectURL(pdfBlob);
    
    // Open PDF in new tab
    const newWindow = window.open(url, '_blank');
    
    if (!newWindow) {
      // Fallback to download if popup blocked
      return downloadReceiptPDF(receiptData);
    }
    
    // Clean up URL after some time
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 30000); // 30 seconds should be enough for the PDF to load
    
    return url;
  } catch (error) {
    console.error('PDF generation failed:', error);
    throw error;
  }
};