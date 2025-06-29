import jsPDF from 'jspdf';
import { Customer, Transaction } from '../types/admin';
import { formatCurrency } from './adminUtils';

// Enhanced PDF Generator with modern design and consistent crown logo branding
export class EnhancedPDFGenerator {
  private doc: jsPDF;
  private pageWidth: number;
  private pageHeight: number;
  private margin: number = 20;
  private primaryColor: string = '#4F46E5';
  private secondaryColor: string = '#10B981';
  private accentColor: string = '#F59E0B';
  private textColor: string = '#1F2937';

  constructor() {
    this.doc = new jsPDF();
    this.pageWidth = this.doc.internal.pageSize.getWidth();
    this.pageHeight = this.doc.internal.pageSize.getHeight();
  }

  // Add consistent Divine Mobile crown logo across all reports
  private addDivineMobileLogo(x: number = 20, y: number = 15, width: number = 50, height: number = 16) {
    // Create the Divine Mobile logo background with crown
    this.doc.setFillColor(79, 70, 229); // Purple gradient
    this.doc.roundedRect(x, y, width, height, 4, 4, 'F');
    
    // Add crown icon representation
    this.doc.setFillColor(255, 255, 255);
    // Crown base
    this.doc.rect(x + 4, y + 10, 12, 4, 'F');
    // Crown points
    this.doc.triangle(x + 6, y + 6, x + 8, y + 10, x + 10, y + 6, 'F');
    this.doc.triangle(x + 8, y + 4, x + 10, y + 8, x + 12, y + 4, 'F');
    this.doc.triangle(x + 10, y + 6, x + 12, y + 10, x + 14, y + 6, 'F');
    // Crown jewels
    this.doc.setFillColor(255, 215, 0); // Gold
    this.doc.circle(x + 9, y + 8, 0.5, 'F');
    this.doc.circle(x + 11, y + 6, 0.5, 'F');
    this.doc.circle(x + 13, y + 8, 0.5, 'F');
    
    // Add "Divine Mobile" text
    this.doc.setTextColor(255, 255, 255);
    this.doc.setFontSize(10);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('Divine', x + 18, y + 8);
    this.doc.setTextColor(147, 197, 253); // Light blue for "Mobile"
    this.doc.text('Mobile', x + 18, y + 13);
    
    // Reset colors
    this.doc.setTextColor(31, 41, 55);
  }

  // Add crown watermark
  private addCrownWatermark() {
    this.doc.saveGraphicsState();
    this.doc.setGState(this.doc.GState({ opacity: 0.1 }));
    this.doc.setFillColor(79, 70, 229);
    
    // Large crown in center
    const centerX = this.pageWidth / 2;
    const centerY = this.pageHeight / 2;
    
    // Crown base
    this.doc.rect(centerX - 20, centerY + 10, 40, 10, 'F');
    // Crown points
    this.doc.triangle(centerX - 15, centerY - 10, centerX - 5, centerY + 10, centerX + 5, centerY - 10, 'F');
    this.doc.triangle(centerX - 5, centerY - 15, centerX + 5, centerY + 5, centerX + 15, centerY - 15, 'F');
    this.doc.triangle(centerX + 5, centerY - 10, centerX + 15, centerY + 10, centerX + 25, centerY - 10, 'F');
    
    this.doc.restoreGraphicsState();
  }

  // Add gradient background with crown watermark
  private addGradientBackground() {
    // Create a gradient effect using rectangles with crown branding
    this.doc.setFillColor(79, 70, 229); // Primary purple
    this.doc.rect(0, 0, this.pageWidth, 60, 'F');
    
    this.doc.setFillColor(99, 102, 241); // Lighter purple shade
    this.doc.rect(0, 40, this.pageWidth, 20, 'F');
    
    // Add subtle crown watermark
    this.addCrownWatermark();
  }

  // Add header with crown logo and title
  private addHeader(title: string, subtitle?: string) {
    this.addGradientBackground();
    
    // Add Divine Mobile crown logo to header
    this.addDivineMobileLogo(this.margin, 15, 60, 20);
    
    // Title with crown emoji
    this.doc.setTextColor(255, 255, 255);
    this.doc.setFontSize(28);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text(`👑 ${title}`, this.margin + 70, 35);
    
    if (subtitle) {
      this.doc.setFontSize(14);
      this.doc.setFont('helvetica', 'normal');
      this.doc.text(subtitle, this.margin + 70, 50);
    }
    
    // Reset text color
    this.doc.setTextColor(31, 41, 55);
  }

  // Add a stats card
  private addStatsCard(x: number, y: number, width: number, height: number, title: string, value: string, color: string) {
    // Card background
    this.doc.setFillColor(248, 250, 252);
    this.doc.roundedRect(x, y, width, height, 5, 5, 'F');
    
    // Card border
    this.doc.setDrawColor(226, 232, 240);
    this.doc.setLineWidth(0.5);
    this.doc.roundedRect(x, y, width, height, 5, 5, 'S');
    
    // Color accent bar with crown
    const [r, g, b] = this.hexToRgb(color);
    this.doc.setFillColor(r, g, b);
    this.doc.rect(x, y, width, 4, 'F');
    
    // Small crown icon
    this.doc.setFillColor(255, 215, 0);
    this.doc.circle(x + 8, y + 12, 1, 'F');
    
    // Title
    this.doc.setTextColor(107, 114, 128);
    this.doc.setFontSize(10);
    this.doc.setFont('helvetica', 'normal');
    this.doc.text(title, x + 12, y + 18);
    
    // Value
    this.doc.setTextColor(31, 41, 55);
    this.doc.setFontSize(18);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text(value, x + 12, y + 32);
  }

  // Add section header
  private addSectionHeader(title: string, y: number): number {
    this.doc.setFillColor(79, 70, 229);
    this.doc.rect(this.margin, y, this.pageWidth - (this.margin * 2), 25, 'F');
    
    this.doc.setTextColor(255, 255, 255);
    this.doc.setFontSize(16);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text(`👑 ${title}`, this.margin + 8, y + 17);
    
    this.doc.setTextColor(31, 41, 55);
    return y + 35;
  }

  // Simple bar chart
  private addBarChart(x: number, y: number, width: number, height: number, data: {label: string, value: number, color: string}[]) {
    const maxValue = Math.max(...data.map(d => d.value));
    const barWidth = (width - 40) / data.length;
    const chartAreaHeight = height - 40;
    
    // Chart background
    this.doc.setFillColor(248, 250, 252);
    this.doc.rect(x, y, width, height, 'F');
    this.doc.setDrawColor(226, 232, 240);
    this.doc.rect(x, y, width, height, 'S');
    
    // Draw bars with crown tops
    data.forEach((item, index) => {
      const barHeight = (item.value / maxValue) * chartAreaHeight;
      const barX = x + 20 + (index * barWidth);
      const barY = y + height - 20 - barHeight;
      
      const [r, g, b] = this.hexToRgb(item.color);
      this.doc.setFillColor(r, g, b);
      this.doc.rect(barX, barY, barWidth - 5, barHeight, 'F');
      
      // Crown on top of bar
      this.doc.setFillColor(255, 215, 0);
      this.doc.circle(barX + (barWidth - 5) / 2, barY - 2, 1, 'F');
      
      // Label
      this.doc.setTextColor(107, 114, 128);
      this.doc.setFontSize(8);
      this.doc.text(item.label, barX, y + height - 5);
      
      // Value
      this.doc.setFontSize(9);
      this.doc.text(item.value.toString(), barX, barY - 6);
    });
  }

  // Helper function to convert hex to RGB
  private hexToRgb(hex: string): [number, number, number] {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16)
    ] : [0, 0, 0];
  }

  // Generate enhanced master report with consistent crown branding
  generateMasterReport(customers: Customer[], transactions: Transaction[]): jsPDF {
    // Page 1: Overview with crown branding
    this.addHeader('OneCard Master Report', `Generated on: ${new Date().toLocaleDateString()}`);
    
    let yPos = 80;
    
    // Key metrics cards with crown icons
    const totalBalance = customers.reduce((sum, customer) => sum + (Number(customer.onecardBalance) || 0), 0);
    const totalCashback = customers.reduce((sum, customer) => sum + (Number(customer.totalCashback) || 0), 0);
    const totalRevenue = transactions.reduce((sum, tx) => sum + (Number(tx.amount) || 0), 0);
    
    const cardWidth = (this.pageWidth - (this.margin * 2) - 15) / 3;
    
    this.addStatsCard(this.margin, yPos, cardWidth, 40, 'Total Customers', customers.length.toString(), this.primaryColor);
    this.addStatsCard(this.margin + cardWidth + 5, yPos, cardWidth, 40, 'Platform Balance', formatCurrency(totalBalance), this.secondaryColor);
    this.addStatsCard(this.margin + (cardWidth * 2) + 10, yPos, cardWidth, 40, 'Total Revenue', formatCurrency(totalRevenue), this.accentColor);
    
    yPos += 60;
    
    this.addStatsCard(this.margin, yPos, cardWidth, 40, 'Total Transactions', transactions.length.toString(), '#8B5CF6');
    this.addStatsCard(this.margin + cardWidth + 5, yPos, cardWidth, 40, 'Cashback Distributed', formatCurrency(totalCashback), '#EF4444');
    this.addStatsCard(this.margin + (cardWidth * 2) + 10, yPos, cardWidth, 40, 'Active Cards', customers.length.toString(), '#06B6D4');
    
    yPos += 70;
    
    // Network Distribution Chart
    yPos = this.addSectionHeader('Network Distribution', yPos);
    
    const networkStats = customers.reduce((stats, customer) => {
      const network = customer.networkProvider || 'Unknown';
      stats[network] = (stats[network] || 0) + 1;
      return stats;
    }, {} as Record<string, number>);
    
    const chartData = Object.entries(networkStats).map(([network, count], index) => ({
      label: network,
      value: count,
      color: ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'][index % 5]
    }));
    
    this.addBarChart(this.margin, yPos, this.pageWidth - (this.margin * 2), 80, chartData);
    
    // New page for detailed analytics
    this.doc.addPage();
    this.addHeader('Platform Analytics', 'Detailed Performance Metrics');
    
    yPos = 80;
    
    // Transaction trends section
    yPos = this.addSectionHeader('Transaction Performance', yPos);
    
    // Monthly transaction data (simplified)
    const monthlyData = [
      { label: 'Jan', value: Math.floor(transactions.length * 0.15), color: this.primaryColor },
      { label: 'Feb', value: Math.floor(transactions.length * 0.18), color: this.secondaryColor },
      { label: 'Mar', value: Math.floor(transactions.length * 0.22), color: this.accentColor },
      { label: 'Apr', value: Math.floor(transactions.length * 0.25), color: '#8B5CF6' },
      { label: 'May', value: Math.floor(transactions.length * 0.20), color: '#EF4444' }
    ];
    
    this.addBarChart(this.margin, yPos, this.pageWidth - (this.margin * 2), 80, monthlyData);
    
    yPos += 100;
    
    // Customer insights
    yPos = this.addSectionHeader('Customer Insights', yPos);
    
    // Top customers table
    const topCustomers = customers
      .sort((a, b) => (Number(b.onecardBalance) || 0) - (Number(a.onecardBalance) || 0))
      .slice(0, 5);
    
    // Table header
    this.doc.setFillColor(248, 250, 252);
    this.doc.rect(this.margin, yPos, this.pageWidth - (this.margin * 2), 15, 'F');
    this.doc.setDrawColor(226, 232, 240);
    this.doc.rect(this.margin, yPos, this.pageWidth - (this.margin * 2), 15, 'S');
    
    this.doc.setTextColor(31, 41, 55);
    this.doc.setFontSize(10);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('👑 Customer Name', this.margin + 5, yPos + 10);
    this.doc.text('Balance', this.margin + 80, yPos + 10);
    this.doc.text('Network', this.margin + 130, yPos + 10);
    
    yPos += 15;
    
    // Table rows
    topCustomers.forEach((customer, index) => {
      if (index % 2 === 0) {
        this.doc.setFillColor(248, 250, 252);
        this.doc.rect(this.margin, yPos, this.pageWidth - (this.margin * 2), 12, 'F');
      }
      
      this.doc.setDrawColor(226, 232, 240);
      this.doc.rect(this.margin, yPos, this.pageWidth - (this.margin * 2), 12, 'S');
      
      this.doc.setTextColor(31, 41, 55);
      this.doc.setFontSize(9);
      this.doc.setFont('helvetica', 'normal');
      this.doc.text(`${customer.firstName} ${customer.lastName}`, this.margin + 5, yPos + 8);
      this.doc.text(formatCurrency(customer.onecardBalance), this.margin + 80, yPos + 8);
      this.doc.text(customer.networkProvider || 'Unknown', this.margin + 130, yPos + 8);
      
      yPos += 12;
    });
    
    // Footer with crown branding
    this.doc.setFontSize(8);
    this.doc.setTextColor(107, 114, 128);
    this.doc.text('👑 Generated by Divine Mobile OneCard Premium Analytics Platform', this.margin, this.pageHeight - 15);
    this.doc.text(`Page ${this.doc.getCurrentPageInfo().pageNumber} of ${this.doc.getNumberOfPages()}`, this.pageWidth - 50, this.pageHeight - 15);
    this.doc.text('Powered by Divine Mobile 👑', this.pageWidth - 80, this.pageHeight - 5);
    
    return this.doc;
  }
}

export const generateEnhancedMasterReport = (customers: Customer[], transactions: Transaction[], toast: any) => {
  const generator = new EnhancedPDFGenerator();
  const doc = generator.generateMasterReport(customers, transactions);
  
  doc.save(`Divine_Mobile_Crown_Master_Report_${new Date().toISOString().split('T')[0]}.pdf`);
  
  toast({
    title: "👑 Premium Report Generated",
    description: "Modern master report with crown logo branding has been downloaded.",
    duration: 3000,
  });
};
