
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
    return 'DM' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substr(2, 5).toUpperCase();
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
      timeZone: 'Africa/Johannesburg'
    }) + ' SAST';
  };

  const generateComprehensiveWhatsAppReceipt = (data: EnhancedReceiptData): string => {
    const itemsSection = data.items.map(item => 
      `• **${item.name.replace('DIVINELY', 'DIVINE')}**
  📱 Network: ${item.network.toUpperCase().replace('DIVINELY', 'DIVINE')}
  💎 Service: ${item.type.toUpperCase()}
  💰 Amount: R${item.subtotal.toFixed(2)}`
    ).join('\n\n');

    const loyaltyPoints = Math.round(data.totalPaid * 2);

    return `🌟 **DIVINE MOBILE** 📱
✨ **Premium Digital Receipt** ✨

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 **TRANSACTION: CONFIRMED** ✅
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Receipt #**: ${data.receiptNo}
**Transaction ID**: ${data.transactionId}
**Date**: ${data.dateTime}

**Customer**: ${data.customer.name}
**Mobile**: ${data.customer.mobile}${data.customer.email ? `\n**Email**: ${data.customer.email}` : ''}

**Provider**: Divine Mobile
**Website**: myonecard.co.za
**Support**: +27 100 2827
**Platform**: OneCard Digital Services

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🛒 **PURCHASE SUMMARY**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${itemsSection}

**Subtotal**: R${data.subtotal.toFixed(2)}${data.discounts > 0 ? `\n**Discount**: -R${data.discounts.toFixed(2)}` : ''}
**Total Paid**: R${data.totalPaid.toFixed(2)}
**Payment**: ${data.paymentMethod}
**Status**: Payment Successful ✅

**Rewards**:
• Cashback: R${data.cashbackEarned.toFixed(2)}
• Loyalty: ${loyaltyPoints} pts
• VIP: Active

**Delivery**:
• To: ${data.deliveryPhone.replace('+27', '0')}
• Status: Instantly Delivered ⚡
• Confirmation: 100% Success

${data.vendor ? `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👔 **AGENT DETAILS**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Name: ${data.vendor.name}
• Agent ID: ${data.vendor.id}
• Commission: R${data.vendor.commission.toFixed(2)}` : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 **SUPPORT & POLICIES**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Keep this receipt for records
• 24/7 Support: +27 100 2827
• Help: myonecard.co.za/support
• Live Chat: On website
• Refunds: T&Cs apply

🌟 **Thank you for choosing Divine Mobile!** 🌟
⚡ Fast • 🔒 Secure • 🎯 Reliable

🔐 **Digital Verification**
• Verified: ${new Date().toISOString()}
• Platform: OneCard Secure
• Trusted by thousands daily`;
  };

  const generateProfessionalEmailReceipt = (data: EnhancedReceiptData): string => {
    const itemsRows = data.items.map(item => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${item.name.replace('DIVINELY', 'DIVINE')}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.quantity}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">R${item.unitPrice.toFixed(2)}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: bold;">R${item.subtotal.toFixed(2)}</td>
      </tr>
    `).join('');

    const loyaltyPoints = Math.round(data.totalPaid * 2);

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Divine Mobile Receipt</title>
      </head>
      <body style="font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background-color: #f8fafc;">
        <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #4F46E5, #7C3AED); color: white; padding: 40px 30px; text-align: center;">
            <div style="background: rgba(255,255,255,0.15); display: inline-flex; align-items: center; padding: 12px 20px; border-radius: 25px; margin-bottom: 20px;">
              <div style="width: 24px; height: 24px; background: white; border-radius: 6px; margin-right: 12px; display: flex; align-items: center; justify-content: center;">
                <span style="color: #4F46E5; font-size: 16px;">📱</span>
              </div>
              <span style="font-size: 18px; font-weight: bold;">DIVINE MOBILE</span>
            </div>
            <h1 style="margin: 0; font-size: 28px; font-weight: bold;">Premium Digital Receipt</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Transaction Confirmed</p>
          </div>

          <!-- Receipt Info -->
          <div style="padding: 30px; background: #f8fafc; border-bottom: 2px solid #e5e7eb;">
            <div style="display: flex; flex-wrap: wrap; gap: 20px;">
              <div style="flex: 1; min-width: 250px;">
                <h3 style="color: #4F46E5; margin: 0 0 15px 0; font-size: 16px;">Receipt Details</h3>
                <p style="margin: 5px 0; font-size: 14px;"><strong>Receipt #:</strong> ${data.receiptNo}</p>
                <p style="margin: 5px 0; font-size: 14px;"><strong>Transaction ID:</strong> ${data.transactionId}</p>
                <p style="margin: 5px 0; font-size: 14px;"><strong>Date:</strong> ${data.dateTime}</p>
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
              <span><strong>Provider:</strong> Divine Mobile</span>
              <span><strong>Website:</strong> myonecard.co.za</span>
              <span><strong>Support:</strong> +27 100 2827</span>
            </div>
          </div>

          <!-- Purchase Details -->
          <div style="padding: 30px;">
            <h3 style="color: #4F46E5; margin: 0 0 20px 0; font-size: 18px;">Purchase Summary</h3>
            <div style="overflow-x: auto;">
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <thead>
                  <tr style="background: #f1f5f9;">
                    <th style="padding: 15px 12px; text-align: left; font-weight: bold; color: #475569;">Service</th>
                    <th style="padding: 15px 12px; text-align: center; font-weight: bold; color: #475569;">Qty</th>
                    <th style="padding: 15px 12px; text-align: right; font-weight: bold; color: #475569;">Price</th>
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
                <span>Discount:</span>
                <span>-R${data.discounts.toFixed(2)}</span>
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
                <h4 style="margin: 0 0 8px 0; color: #166534; font-size: 14px;">✅ Instantly Delivered</h4>
                <p style="margin: 0; font-size: 12px; color: #166534;">Successfully delivered to ${data.deliveryPhone.replace('+27', '0')}</p>
              </div>
              <div style="flex: 1; min-width: 200px; background: #fef3c7; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b;">
                <h4 style="margin: 0 0 8px 0; color: #92400e; font-size: 14px;">🎁 Rewards Earned</h4>
                <p style="margin: 0; font-size: 16px; font-weight: bold; color: #92400e;">R${data.cashbackEarned.toFixed(2)} Cashback</p>
                <p style="margin: 5px 0 0 0; font-size: 12px; color: #92400e;">+${loyaltyPoints} Loyalty Points • VIP Active</p>
              </div>
            </div>

            ${data.vendor ? `
            <!-- Agent Details -->
            <div style="background: #ede9fe; padding: 20px; border-radius: 8px; margin-top: 20px; border-left: 4px solid #7c3aed;">
              <h4 style="margin: 0 0 10px 0; color: #6b21a8; font-size: 16px;">👔 Agent Details</h4>
              <p style="margin: 5px 0; font-size: 14px; color: #6b21a8;"><strong>Agent:</strong> ${data.vendor.name}</p>
              <p style="margin: 5px 0; font-size: 14px; color: #6b21a8;"><strong>ID:</strong> ${data.vendor.id}</p>
              <p style="margin: 5px 0; font-size: 14px; color: #6b21a8;"><strong>Commission:</strong> R${data.vendor.commission.toFixed(2)}</p>
            </div>` : ''}
          </div>

          <!-- Footer -->
          <div style="background: #1f2937; color: white; padding: 30px; text-align: center;">
            <h3 style="margin: 0 0 15px 0; color: white;">Thank you for choosing Divine Mobile!</h3>
            <p style="margin: 0 0 15px 0; opacity: 0.8; font-style: italic;">⚡ Fast • 🔒 Secure • 🎯 Reliable</p>
            
            <div style="border-top: 1px solid #374151; padding-top: 20px; margin-top: 20px;">
              <p style="margin: 5px 0; font-size: 14px; opacity: 0.7;">📋 Keep this receipt for your records</p>
              <p style="margin: 5px 0; font-size: 14px; opacity: 0.7;">📞 Support: +27 100 2827 | 🌐 myonecard.co.za</p>
              <p style="margin: 5px 0; font-size: 12px; opacity: 0.6;">Digital Verification: ${new Date().toISOString()}</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  };

  const processComprehensiveReceipt = async (receiptData: EnhancedReceiptData) => {
    try {
      // Generate modern WhatsApp receipt
      const whatsappMessage = generateComprehensiveWhatsAppReceipt(receiptData);
      const whatsappUrl = `https://wa.me/${receiptData.customer.mobile.replace('+', '')}?text=${encodeURIComponent(whatsappMessage)}`;
      
      // Generate email receipt
      const emailContent = generateProfessionalEmailReceipt(receiptData);
      
      // Auto-open WhatsApp with enhanced receipt
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
      }, 1000);

      // Show success notification
      toast({
        title: "🌟 Premium Receipt Generated!",
        description: "Modern, comprehensive receipt delivered via WhatsApp & Email",
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
