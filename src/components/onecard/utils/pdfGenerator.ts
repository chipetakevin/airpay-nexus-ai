
import jsPDF from 'jspdf';
import { Customer, Transaction } from '../types/admin';
import { formatCurrency } from './adminUtils';

export const generateCustomerReport = (customer: Customer, customerTransactions: Transaction[], toast: any) => {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(20);
  doc.text('OneCard Customer Report', 20, 20);
  doc.setFontSize(12);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30);
  
  // Customer Info
  doc.setFontSize(16);
  doc.text('Customer Information', 20, 50);
  doc.setFontSize(11);
  doc.text(`Name: ${customer.firstName} ${customer.lastName}`, 20, 65);
  doc.text(`Email: ${customer.email}`, 20, 75);
  doc.text(`Phone: ${customer.phone}`, 20, 85);
  doc.text(`Card Number: ${customer.cardNumber}`, 20, 95);
  doc.text(`Registration Date: ${new Date(customer.registrationDate).toLocaleDateString()}`, 20, 105);
  doc.text(`Network Provider: ${customer.networkProvider}`, 20, 115);
  doc.text(`RICA Verified: ${customer.ricaVerified ? 'Yes' : 'No'}`, 20, 125);
  
  // Financial Summary
  doc.setFontSize(16);
  doc.text('Financial Summary', 20, 145);
  doc.setFontSize(11);
  doc.text(`OneCard Balance: ${formatCurrency(customer.onecardBalance)}`, 20, 160);
  doc.text(`Total Cashback Earned: ${formatCurrency(customer.totalCashback)}`, 20, 170);
  doc.text(`Total Transactions: ${customerTransactions.length}`, 20, 180);
  
  const totalSpent = customerTransactions.reduce((sum, tx) => sum + (Number(tx.amount) || 0), 0);
  doc.text(`Total Amount Spent: ${formatCurrency(totalSpent)}`, 20, 190);
  
  // Recent Transactions
  if (customerTransactions.length > 0) {
    doc.setFontSize(16);
    doc.text('Recent Transactions', 20, 210);
    doc.setFontSize(9);
    
    let yPos = 225;
    customerTransactions.slice(0, 10).forEach((tx, index) => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      doc.text(`${new Date(tx.timestamp).toLocaleDateString()} - ${tx.network} - ${formatCurrency(tx.amount)} - ${tx.status}`, 20, yPos);
      yPos += 10;
    });
  }
  
  doc.save(`OneCard_Report_${customer.firstName}_${customer.lastName}_${new Date().toISOString().split('T')[0]}.pdf`);
  
  toast({
    title: "Report Generated",
    description: `Customer report for ${customer.firstName} ${customer.lastName} has been downloaded.`,
    duration: 3000,
  });
};

export const generateMasterReport = (customers: Customer[], transactions: Transaction[], toast: any) => {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(20);
  doc.text('OneCard Master Report', 20, 20);
  doc.setFontSize(12);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30);
  
  // Summary Statistics
  doc.setFontSize(16);
  doc.text('Platform Overview', 20, 50);
  doc.setFontSize(11);
  doc.text(`Total Customers: ${customers.length}`, 20, 65);
  doc.text(`Total Active Cards: ${customers.length}`, 20, 75);
  
  const totalBalance = customers.reduce((sum, customer) => sum + (Number(customer.onecardBalance) || 0), 0);
  const totalCashback = customers.reduce((sum, customer) => sum + (Number(customer.totalCashback) || 0), 0);
  const totalTransactions = transactions.length;
  const totalRevenue = transactions.reduce((sum, tx) => sum + (Number(tx.amount) || 0), 0);
  
  doc.text(`Total Platform Balance: ${formatCurrency(totalBalance)}`, 20, 85);
  doc.text(`Total Cashback Distributed: ${formatCurrency(totalCashback)}`, 20, 95);
  doc.text(`Total Transactions: ${totalTransactions}`, 20, 105);
  doc.text(`Total Revenue: ${formatCurrency(totalRevenue)}`, 20, 115);
  
  // Network Breakdown
  const networkStats = customers.reduce((stats, customer) => {
    const network = customer.networkProvider || 'Unknown';
    stats[network] = (stats[network] || 0) + 1;
    return stats;
  }, {} as Record<string, number>);
  
  doc.setFontSize(16);
  doc.text('Network Distribution', 20, 135);
  doc.setFontSize(11);
  let yPos = 150;
  Object.entries(networkStats).forEach(([network, count]) => {
    doc.text(`${network}: ${count} customers`, 20, yPos);
    yPos += 10;
  });
  
  // Customer List
  doc.addPage();
  doc.setFontSize(16);
  doc.text('Customer Directory', 20, 20);
  doc.setFontSize(9);
  
  yPos = 35;
  customers.forEach((customer, index) => {
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }
    doc.text(`${customer.cardNumber} - ${customer.firstName} ${customer.lastName} - ${formatCurrency(customer.onecardBalance)}`, 20, yPos);
    yPos += 8;
  });
  
  doc.save(`OneCard_Master_Report_${new Date().toISOString().split('T')[0]}.pdf`);
  
  toast({
    title: "Master Report Generated",
    description: "Complete platform report has been downloaded.",
    duration: 3000,
  });
};
