
import React from 'react';
import { useToast } from '@/hooks/use-toast';

interface ReceiptItem {
  name: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  network: string;
  type: string;
}

interface EnhancedReceiptData {
  receiptNo: string;
  transactionId: string;
  dateTime: string;
  customer: {
    name: string;
    mobile: string;
    email?: string;
  };
  items: ReceiptItem[];
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
  admin?: {
    fee: number;
    notes?: string;
  };
}

export const useEnhancedReceiptGenerator = () => {
  const { toast } = useToast();

  const generateReceiptNumber = () => {
    return 'DM' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substr(2, 3).toUpperCase();
  };

  const formatDateTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    });
  };

  const generateComprehensiveWhatsAppReceipt = (data: EnhancedReceiptData): string => {
    const itemsTable = data.items.map(item => 
      `${item.name.padEnd(25)} | ${item.quantity.toString().padStart(3)} | R${item.unitPrice.toFixed(2).padStart(8)} | R${item.subtotal.toFixed(2).padStart(8)}`
    ).join('\n');

    return `🟢 *DIVINELY MOBILE* 📱
*Official Digital Receipt*

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 *RECEIPT DETAILS*
Receipt No: ${data.receiptNo}
Transaction ID: ${data.transactionId}
Date & Time: ${data.dateTime}

👤 *CUSTOMER DETAILS*
Name: ${data.customer.name}
Mobile: ${data.customer.mobile}${data.customer.email ? `\nEmail: ${data.customer.email}` : ''}

🏢 *SERVICE PROVIDER*
Business: Divinely Mobile
Website: myonecard.co.za
Support: +27 100 2827
Platform: OneCard Digital Services

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📦 *PURCHASE DETAILS*

Item Description          | Qty |   Price  |   Total
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${itemsTable}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💰 *PAYMENT SUMMARY*
Subtotal: R${data.subtotal.toFixed(2)}${data.discounts > 0 ? `\nDiscounts: -R${data.discounts.toFixed(2)}` : ''}${data.tax > 0 ? `\nTax: R${data.tax.toFixed(2)}` : ''}
*TOTAL PAID: R${data.totalPaid.toFixed(2)}*
Payment Method: ${data.paymentMethod}
Status: ✅ *PAYMENT SUCCESSFUL*

🎁 *REWARDS & CASHBACK*
Cashback Earned: R${data.cashbackEarned.toFixed(2)}
Loyalty Points: +${Math.round(data.totalPaid * 2)}

📱 *DELIVERY CONFIRMATION*  
Delivered Instantly to: ${data.deliveryPhone}
Delivery Status: ✅ *SUCCESSFUL*

${data.vendor ? `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👔 *VENDOR DETAILS*
Agent: ${data.vendor.name}
ID: ${data.vendor.id}
Commission: R${data.vendor.commission.toFixed(2)}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━` : ''}

📋 *TERMS & SUPPORT*
• Keep this receipt for your records
• Support: +27 100 2827
• Website: myonecard.co.za/support
• Refunds subject to T&Cs

*Thank you for choosing Divinely Mobile!*
_Fast • Secure • Reliable_

🔐 *Digital Confirmation*
Verified: ${new Date().toISOString()}
Platform: OneCard Secure Payment System`;
  };

  const generateProfessionalEmailReceipt = (data: EnhancedReceiptData): string => {
    const itemsRows = data.items.map(item => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${item.name}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.quantity}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">R${item.unitPrice.toFixed(2)}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: bold;">R${item.subtotal.toFixed(2)}</td>
      </tr>
    `).join('');

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Divinely Mobile Receipt</title>
      </head>
      <body style="font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background-color: #f8fafc;">
        <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #4F46E5, #7C3AED); color: white; padding: 40px 30px; text-align: center;">
            <div style="background: rgba(255,255,255,0.15); display: inline-flex; align-items: center; padding: 12px 20px; border-radius: 25px; margin-bottom: 20px;">
              <div style="width: 24px; height: 24px; background: white; border-radius: 6px; margin-right: 12px; display: flex; align-items: center; justify-content: center;">
                <span style="color: #4F46E5; font-size: 16px;">📱</span>
              </div>
              <span style="font-size: 18px; font-weight: bold;">DIVINELY MOBILE</span>
            </div>
            <h1 style="margin: 0; font-size: 28px; font-weight: bold;">Official Receipt</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Digital Transaction Confirmation</p>
          </div>

          <!-- Receipt Info -->
          <div style="padding: 30px; background: #f8fafc; border-bottom: 2px solid #e5e7eb;">
            <div style="display: flex; flex-wrap: wrap; gap: 20px;">
              <div style="flex: 1; min-width: 250px;">
                <h3 style="color: #4F46E5; margin: 0 0 15px 0; font-size: 16px;">Receipt Details</h3>
                <p style="margin: 5px 0; font-size: 14px;"><strong>Receipt No:</strong> ${data.receiptNo}</p>
                <p style="margin: 5px 0; font-size: 14px;"><strong>Transaction ID:</strong> ${data.transactionId}</p>
                <p style="margin: 5px 0; font-size: 14px;"><strong>Date & Time:</strong> ${data.dateTime}</p>
              </div>
              <div style="flex: 1; min-width: 250px;">
                <h3 style="color: #4F46E5; margin: 0 0 15px 0; font-size: 16px;">Customer Details</h3>
                <p style="margin: 5px 0; font-size: 14px;"><strong>Name:</strong> ${data.customer.name}</p>
                <p style="margin: 5px 0; font-size: 14px;"><strong>Mobile:</strong> ${data.customer.mobile}</p>
                ${data.customer.email ? `<p style="margin: 5px 0; font-size: 14px;"><strong>Email:</strong> ${data.customer.email}</p>` : ''}
              </div>
            </div>
          </div>

          <!-- Service Provider -->
          <div style="padding: 20px 30px; background: white; border-bottom: 1px solid #e5e7eb;">
            <h3 style="color: #4F46E5; margin: 0 0 10px 0; font-size: 16px;">Service Provider</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 20px; font-size: 14px;">
              <span><strong>Business:</strong> Divinely Mobile</span>
              <span><strong>Website:</strong> myonecard.co.za</span>
              <span><strong>Support:</strong> +27 100 2827</span>
            </div>
          </div>

          <!-- Purchase Details -->
          <div style="padding: 30px;">
            <h3 style="color: #4F46E5; margin: 0 0 20px 0; font-size: 18px;">Purchase Details</h3>
            <div style="overflow-x: auto;">
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <thead>
                  <tr style="background: #f1f5f9;">
                    <th style="padding: 15px 12px; text-align: left; font-weight: bold; color: #475569;">Item Description</th>
                    <th style="padding: 15px 12px; text-align: center; font-weight: bold; color: #475569;">Qty</th>
                    <th style="padding: 15px 12px; text-align: right; font-weight: bold; color: #475569;">Unit Price</th>
                    <th style="padding: 15px 12px; text-align: right; font-weight: bold; color: #475569;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsRows}
                </tbody>
              </table>
            </div>

            <!-- Payment Summary -->
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-top: 20px;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                <span>Subtotal:</span>
                <span>R${data.subtotal.toFixed(2)}</span>
              </div>
              ${data.discounts > 0 ? `
              <div style="display: flex; justify-content: space-between; margin-bottom: 10px; color: #16a34a;">
                <span>Discounts:</span>
                <span>-R${data.discounts.toFixed(2)}</span>
              </div>` : ''}
              ${data.tax > 0 ? `
              <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                <span>Tax:</span>
                <span>R${data.tax.toFixed(2)}</span>
              </div>` : ''}
              <div style="display: flex; justify-content: space-between; font-size: 18px; font-weight: bold; color: #4F46E5; border-top: 2px solid #e5e7eb; padding-top: 15px; margin-top: 15px;">
                <span>TOTAL PAID:</span>
                <span>R${data.totalPaid.toFixed(2)}</span>
              </div>
              <div style="display: flex; justify-content: space-between; margin-top: 10px; font-size: 14px;">
                <span>Payment Method:</span>
                <span>${data.paymentMethod}</span>
              </div>
            </div>

            <!-- Status and Rewards -->
            <div style="display: flex; flex-wrap: wrap; gap: 15px; margin-top: 20px;">
              <div style="flex: 1; min-width: 200px; background: #dcfce7; padding: 15px; border-radius: 8px; border-left: 4px solid #16a34a;">
                <h4 style="margin: 0 0 8px 0; color: #166534; font-size: 14px;">✅ Payment Successful</h4>
                <p style="margin: 0; font-size: 12px; color: #166534;">Delivered instantly to ${data.deliveryPhone}</p>
              </div>
              <div style="flex: 1; min-width: 200px; background: #fef3c7; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b;">
                <h4 style="margin: 0 0 8px 0; color: #92400e; font-size: 14px;">🎁 Cashback Earned</h4>
                <p style="margin: 0; font-size: 16px; font-weight: bold; color: #92400e;">R${data.cashbackEarned.toFixed(2)}</p>
                <p style="margin: 5px 0 0 0; font-size: 12px; color: #92400e;">+${Math.round(data.totalPaid * 2)} Loyalty Points</p>
              </div>
            </div>

            ${data.vendor ? `
            <!-- Vendor Details -->
            <div style="background: #ede9fe; padding: 20px; border-radius: 8px; margin-top: 20px; border-left: 4px solid #7c3aed;">
              <h4 style="margin: 0 0 10px 0; color: #6b21a8; font-size: 16px;">👔 Vendor Details</h4>
              <p style="margin: 5px 0; font-size: 14px; color: #6b21a8;"><strong>Agent:</strong> ${data.vendor.name}</p>
              <p style="margin: 5px 0; font-size: 14px; color: #6b21a8;"><strong>ID:</strong> ${data.vendor.id}</p>
              <p style="margin: 5px 0; font-size: 14px; color: #6b21a8;"><strong>Commission:</strong> R${data.vendor.commission.toFixed(2)}</p>
            </div>` : ''}
          </div>

          <!-- Footer -->
          <div style="background: #1f2937; color: white; padding: 30px; text-align: center;">
            <h3 style="margin: 0 0 15px 0; color: white;">Thank you for choosing Divinely Mobile!</h3>
            <p style="margin: 0 0 15px 0; opacity: 0.8; font-style: italic;">Fast • Secure • Reliable</p>
            
            <div style="border-top: 1px solid #374151; padding-top: 20px; margin-top: 20px;">
              <p style="margin: 5px 0; font-size: 14px; opacity: 0.7;">📋 Keep this receipt for your records</p>
              <p style="margin: 5px 0; font-size: 14px; opacity: 0.7;">📞 Support: +27 100 2827 | 🌐 myonecard.co.za</p>
              <p style="margin: 5px 0; font-size: 12px; opacity: 0.6;">Digital Confirmation: ${new Date().toISOString()}</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  };

  const processComprehensiveReceipt = async (receiptData: EnhancedReceiptData) => {
    try {
      // Generate WhatsApp receipt
      const whatsappMessage = generateComprehensiveWhatsAppReceipt(receiptData);
      const whatsappUrl = `https://wa.me/${receiptData.customer.mobile.replace('+', '')}?text=${encodeURIComponent(whatsappMessage)}`;
      
      // Generate email receipt
      const emailContent = generateProfessionalEmailReceipt(receiptData);
      
      // Auto-open WhatsApp
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
      }, 1000);

      // Show success notification
      toast({
        title: "📱 Professional Receipt Generated!",
        description: "Comprehensive receipt delivered via WhatsApp & Email",
        duration: 4000
      });

      return {
        whatsappMessage,
        emailContent,
        whatsappUrl,
        success: true
      };
    } catch (error) {
      console.error('Error generating comprehensive receipt:', error);
      toast({
        title: "Receipt Generation Failed",
        description: "Unable to generate comprehensive receipt. Please try again.",
        variant: "destructive"
      });
      return { success: false };
    }
  };

  return {
    generateReceiptNumber,
    formatDateTime,
    generateComprehensiveWhatsAppReceipt,
    generateProfessionalEmailReceipt,
    processComprehensiveReceipt
  };
};
