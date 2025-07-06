
import jsPDF from 'jspdf';
import { Transaction } from '../types/admin';

// Divine Mobile logo for PDF reports
const DIVINE_MOBILE_LOGO_BASE64 = "/lovable-uploads/788fddcb-574c-4f1d-9c73-54cc003a95d1.png";

export const generateCleanPremiumReport = async (transactions: Transaction[], toast: any) => {
  try {
    console.log('Starting Premium Report generation...');
    const doc = new jsPDF();
    
    // Add Divine Mobile logo at the top center
    const pageWidth = doc.internal.pageSize.getWidth();
    const logoWidth = 20;
    const logoHeight = 16;
    const logoX = (pageWidth - logoWidth) / 2;
    
    try {
      // Add Divine Mobile logo - using PNG format for better compatibility
      doc.addImage(DIVINE_MOBILE_LOGO_BASE64, 'PNG', logoX, 20, logoWidth, logoHeight);
    } catch (logoError) {
      console.warn('Logo failed to load, continuing without it:', logoError);
    }
    
    // Start content below the logo
    let yPosition = 50;
    
    // Transaction Statistics
    doc.setFontSize(16);
    doc.setFont(undefined, 'bold');
    doc.text('Transaction Overview', 20, yPosition);
    
    yPosition += 15;
    
    const totalTransactions = transactions.length;
    const totalRevenue = transactions.reduce((sum, t) => sum + t.amount, 0);
    const totalCashback = transactions.reduce((sum, t) => sum + t.cashbackEarned, 0);
    
    doc.setFontSize(11);
    doc.setFont(undefined, 'normal');
    
    doc.text(`Total Transactions: ${totalTransactions}`, 20, yPosition);
    yPosition += 8;
    doc.text(`Total Revenue: R${totalRevenue.toFixed(2)}`, 20, yPosition);
    yPosition += 8;
    doc.text(`Total Cashback Distributed: R${totalCashback.toFixed(2)}`, 20, yPosition);
    yPosition += 8;
    doc.text(`Average Transaction Value: R${(totalRevenue / totalTransactions || 0).toFixed(2)}`, 20, yPosition);
    
    yPosition += 20;
    
    // Network Analysis
    doc.setFontSize(16);
    doc.setFont(undefined, 'bold');
    doc.text('Network Performance', 20, yPosition);
    
    yPosition += 15;
    
    const networkStats = transactions.reduce((acc, t) => {
      acc[t.network] = (acc[t.network] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);
    
    doc.setFontSize(11);
    doc.setFont(undefined, 'normal');
    
    Object.entries(networkStats).forEach(([network, revenue]) => {
      doc.text(`${network}: R${revenue.toFixed(2)}`, 20, yPosition);
      yPosition += 8;
    });
    
    yPosition += 15;
    
    // Top Customers
    doc.setFontSize(16);
    doc.setFont(undefined, 'bold');
    doc.text('Top Performing Customers', 20, yPosition);
    
    yPosition += 15;
    
    const customerStats = transactions.reduce((acc, t) => {
      const key = t.customerName;
      if (!acc[key]) {
        acc[key] = { total: 0, transactions: 0 };
      }
      acc[key].total += t.amount;
      acc[key].transactions += 1;
      return acc;
    }, {} as Record<string, { total: number; transactions: number }>);
    
    const topCustomers = Object.entries(customerStats)
      .sort((a, b) => b[1].total - a[1].total)
      .slice(0, 5);
    
    doc.setFontSize(11);
    doc.setFont(undefined, 'normal');
    
    topCustomers.forEach(([customer, stats]) => {
      doc.text(`${customer}: R${stats.total.toFixed(2)} (${stats.transactions} transactions)`, 20, yPosition);
      yPosition += 8;
    });
    
    // Footer
    yPosition = doc.internal.pageSize.getHeight() - 30;
    doc.setFontSize(10);
    doc.setFont(undefined, 'italic');
    doc.text(`Report Date: ${new Date().toLocaleDateString()}`, pageWidth / 2, yPosition, { align: 'center' });
    
    // Save the PDF
    doc.save('Premium_Master_Report.pdf');
    
    toast({
      title: "Premium Report Generated",
      description: "Your comprehensive premium report has been downloaded successfully.",
    });
    
    console.log('Premium Report generated successfully');
    
  } catch (error) {
    console.error('Error generating Premium Report:', error);
    throw error;
  }
};

export const generateCleanCustomerReport = async (transactions: Transaction[], toast: any) => {
  try {
    console.log('Starting Customer Report generation...');
    const doc = new jsPDF();
    
    // Add Divine Mobile logo at the top center
    const pageWidth = doc.internal.pageSize.getWidth();
    const logoWidth = 20;
    const logoHeight = 16;
    const logoX = (pageWidth - logoWidth) / 2;
    
    try {
      // Add Divine Mobile logo - using PNG format for better compatibility
      doc.addImage(DIVINE_MOBILE_LOGO_BASE64, 'PNG', logoX, 20, logoWidth, logoHeight);
    } catch (logoError) {
      console.warn('Logo failed to load, continuing without it:', logoError);
    }
    
    // Start content below the logo
    let yPosition = 50;
    
    // Customer Demographics
    doc.setFontSize(16);
    doc.setFont(undefined, 'bold');
    doc.text('Customer Demographics', 20, yPosition);
    
    yPosition += 15;
    
    const uniqueCustomers = new Set(transactions.map(t => t.customerName)).size;
    const activeCustomers = transactions.filter(t => t.status === 'completed').length;
    const customerRetentionRate = ((activeCustomers / uniqueCustomers) * 100).toFixed(1);
    
    doc.setFontSize(11);
    doc.setFont(undefined, 'normal');
    
    doc.text(`Total Unique Customers: ${uniqueCustomers}`, 20, yPosition);
    yPosition += 8;
    doc.text(`Active Customers: ${activeCustomers}`, 20, yPosition);
    yPosition += 8;
    doc.text(`Customer Retention Rate: ${customerRetentionRate}%`, 20, yPosition);
    
    yPosition += 20;
    
    // Transaction Patterns
    doc.setFontSize(16);
    doc.setFont(undefined, 'bold');
    doc.text('Transaction Patterns', 20, yPosition);
    
    yPosition += 15;
    
    const transactionTypes = transactions.reduce((acc, t) => {
      const type = t.transactionType || 'unknown';
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    doc.setFontSize(11);
    doc.setFont(undefined, 'normal');
    
    Object.entries(transactionTypes).forEach(([type, count]) => {
      const percentage = ((count / transactions.length) * 100).toFixed(1);
      doc.text(`${type.replace('_', ' ')}: ${count} transactions (${percentage}%)`, 20, yPosition);
      yPosition += 8;
    });
    
    yPosition += 15;
    
    // Customer Behavior Analysis
    doc.setFontSize(16);
    doc.setFont(undefined, 'bold');
    doc.text('Customer Behavior Analysis', 20, yPosition);
    
    yPosition += 15;
    
    const avgTransactionValue = transactions.reduce((sum, t) => sum + t.amount, 0) / transactions.length;
    const avgCashbackPerTransaction = transactions.reduce((sum, t) => sum + t.cashbackEarned, 0) / transactions.length;
    
    doc.setFontSize(11);
    doc.setFont(undefined, 'normal');
    
    doc.text(`Average Transaction Value: R${avgTransactionValue.toFixed(2)}`, 20, yPosition);
    yPosition += 8;
    doc.text(`Average Cashback per Transaction: R${avgCashbackPerTransaction.toFixed(2)}`, 20, yPosition);
    yPosition += 8;
    
    // Most Popular Networks
    const networkPopularity = transactions.reduce((acc, t) => {
      acc[t.network] = (acc[t.network] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const topNetwork = Object.entries(networkPopularity).sort((a, b) => b[1] - a[1])[0];
    if (topNetwork) {
      doc.text(`Most Popular Network: ${topNetwork[0]} (${topNetwork[1]} transactions)`, 20, yPosition);
    }
    
    // Footer
    yPosition = doc.internal.pageSize.getHeight() - 30;
    doc.setFontSize(10);
    doc.setFont(undefined, 'italic');
    doc.text(`Report Date: ${new Date().toLocaleDateString()}`, pageWidth / 2, yPosition, { align: 'center' });
    
    // Save the PDF
    doc.save('Customer_Analytics_Report.pdf');
    
    toast({
      title: "Customer Report Generated",
      description: "Your comprehensive customer analytics report has been downloaded successfully.",
    });
    
    console.log('Customer Report generated successfully');
    
  } catch (error) {
    console.error('Error generating Customer Report:', error);
    throw error;
  }
};
