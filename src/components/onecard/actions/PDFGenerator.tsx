
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { Transaction } from '../types/admin';
import { useToast } from '@/hooks/use-toast';
import jsPDF from 'jspdf';

interface PDFGeneratorProps {
  transaction?: Transaction;
}

export const PDFGenerator = ({ transaction }: PDFGeneratorProps) => {
  const { toast } = useToast();

  const generateModernTransactionPDF = (tx: Transaction) => {
    const doc = new jsPDF();
    
    // Page dimensions
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    
    // Modern color scheme
    const primaryBlue = '#4F46E5';
    const accentBlue = '#3B82F6';
    const darkGray = '#1F2937';
    const lightGray = '#F3F4F6';
    const successGreen = '#10B981';
    
    // Header background with gradient effect
    doc.setFillColor(79, 70, 229); // Primary blue
    doc.rect(0, 0, pageWidth, 70, 'F');
    
    // Divinely Mobile logo area (simplified representation)
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(margin, 15, 50, 40, 8, 8, 'F');
    
    // Logo icon representation (mobile phone icon)
    doc.setFillColor(79, 70, 229);
    doc.roundedRect(margin + 15, 22, 20, 26, 3, 3, 'F');
    doc.setFillColor(255, 255, 255);
    doc.circle(margin + 25, 30, 2, 'F');
    doc.rect(margin + 20, 35, 10, 15, 'F');
    
    // Company name
    doc.setTextColor(79, 70, 229);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Divinely', margin + 55, 30);
    doc.setTextColor(59, 130, 246);
    doc.text('Mobile', margin + 55, 45);
    
    // Receipt title
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('Transaction Receipt', margin, 90);
    
    // Transaction ID badge
    const transactionId = `AP${tx.timestamp?.replace(/[^0-9]/g, '').slice(-8) || 'N/A'}`;
    doc.setFillColor(16, 185, 129); // Success green
    doc.roundedRect(margin, 100, 60, 12, 3, 3, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(`ID: ${transactionId}`, margin + 5, 108);
    
    // Status badge
    doc.setFillColor(16, 185, 129);
    doc.roundedRect(pageWidth - margin - 45, 100, 45, 12, 3, 3, 'F');
    doc.setTextColor(255, 255, 255);
    doc.text('COMPLETED', pageWidth - margin - 40, 108);
    
    // Main content area
    let yPos = 130;
    
    // Transaction details card
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(margin, yPos, pageWidth - (margin * 2), 120, 5, 5, 'F');
    
    // Card border
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.5);
    doc.roundedRect(margin, yPos, pageWidth - (margin * 2), 120, 5, 5, 'S');
    
    // Transaction details
    doc.setTextColor(31, 41, 55);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    
    yPos += 15;
    doc.text('Transaction Details', margin + 10, yPos);
    
    yPos += 15;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    
    // Details in two columns
    const leftCol = margin + 10;
    const rightCol = margin + 100;
    
    // Left column
    doc.setFont('helvetica', 'bold');
    doc.text('Date:', leftCol, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text(tx.timestamp ? new Date(tx.timestamp).toLocaleDateString('en-ZA') : 'N/A', leftCol + 25, yPos);
    
    yPos += 12;
    doc.setFont('helvetica', 'bold');
    doc.text('Network:', leftCol, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text(tx.network || 'N/A', leftCol + 25, yPos);
    
    yPos += 12;
    doc.setFont('helvetica', 'bold');
    doc.text('Recipient:', leftCol, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text(tx.recipientName || tx.recipient_name || 'N/A', leftCol + 25, yPos);
    
    // Right column (reset yPos)
    yPos = 160;
    doc.setFont('helvetica', 'bold');
    doc.text('Amount:', rightCol, yPos);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(16, 185, 129);
    doc.text(`R${tx.amount?.toFixed(2) || '0.00'}`, rightCol + 25, yPos);
    
    yPos += 12;
    doc.setTextColor(31, 41, 55);
    doc.setFont('helvetica', 'bold');
    doc.text('Cashback:', rightCol, yPos);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(245, 158, 11);
    doc.text(`R${(tx.cashbackEarned || tx.cashback_earned || 0).toFixed(2)}`, rightCol + 25, yPos);
    
    // Summary section
    yPos = 270;
    doc.setFillColor(79, 70, 229);
    doc.rect(margin, yPos, pageWidth - (margin * 2), 25, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Transaction Summary', margin + 10, yPos + 16);
    
    yPos += 35;
    doc.setFillColor(248, 250, 252);
    doc.rect(margin, yPos, pageWidth - (margin * 2), 30, 'F');
    
    doc.setTextColor(31, 41, 55);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    
    const totalAmount = tx.amount?.toFixed(2) || '0.00';
    const cashback = (tx.cashbackEarned || tx.cashback_earned || 0).toFixed(2);
    
    doc.text(`Total Paid: R${totalAmount}`, margin + 10, yPos + 12);
    doc.text(`Cashback Earned: R${cashback}`, margin + 10, yPos + 22);
    doc.setTextColor(16, 185, 129);
    doc.setFont('helvetica', 'bold');
    doc.text('✓ Transaction Successful', pageWidth - margin - 60, yPos + 17);
    
    // Footer
    yPos = doc.internal.pageSize.height - 30;
    doc.setTextColor(107, 114, 128);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text('Thank you for choosing Divinely Mobile!', margin, yPos);
    doc.text(`Generated: ${new Date().toLocaleString('en-ZA')}`, margin, yPos + 10);
    doc.text('OneCard Platform - Powered by Divinely Mobile', pageWidth - margin - 70, yPos + 5);
    
    return doc;
  };

  const handlePDFDownload = () => {
    if (!transaction) {
      toast({
        title: "Error",
        description: "No transaction data available for PDF generation",
        variant: "destructive"
      });
      return;
    }

    try {
      const doc = generateModernTransactionPDF(transaction);
      const transactionId = `AP${transaction.timestamp?.replace(/[^0-9]/g, '').slice(-8) || 'N/A'}`;
      doc.save(`Divinely_Mobile_Receipt_${transactionId}.pdf`);
      
      toast({
        title: "📄 Modern Receipt Downloaded",
        description: `Professional receipt ${transactionId} has been downloaded`,
        duration: 3000,
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "PDF Generation Failed",
        description: "There was an error generating the PDF. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Button 
      size="sm" 
      variant="outline" 
      onClick={handlePDFDownload}
      className="flex-1 text-xs px-2 py-1 h-8 min-w-0"
    >
      <Download className="w-3 h-3 mr-1 flex-shrink-0" />
      <span className="truncate">PDF</span>
    </Button>
  );
};
