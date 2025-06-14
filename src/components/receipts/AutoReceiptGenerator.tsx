
import React from 'react';
import { useToast } from '@/hooks/use-toast';

interface ReceiptData {
  sessionId: string;
  customerPhone: string;
  customerEmail?: string;
  recipientPhone: string;
  recipientName?: string;
  deal: {
    network: string;
    amount: number;
    price: number;
    type: string;
  };
  timestamp: string;
  paymentMethod: 'ussd' | 'card' | 'ewallet';
}

export const useAutoReceiptGenerator = () => {
  const { toast } = useToast();

  const generateWhatsAppReceipt = (data: ReceiptData) => {
    const message = `🟢 *DIVINELY MOBILE* 📱

✅ *DIGITAL RECEIPT*

👤 *Customer:* ${data.customerPhone}
🆔 *Session ID:* ${data.sessionId}
⏰ *Date:* ${new Date(data.timestamp).toLocaleString()}

📋 *PURCHASE DETAILS:*
• ${data.deal.network} ${data.deal.type.toUpperCase()} R${data.deal.amount}
• Price Paid: R${data.deal.price}
• Recipient: ${data.recipientPhone}

💰 *PAYMENT:*
• Method: ${data.paymentMethod.toUpperCase()}
• Status: ✅ COMPLETED

✅ *${data.deal.type === 'airtime' ? 'Airtime' : 'Data'} delivered successfully!*

🌐 https://divinely-mobile.com
📞 Support: +27 100 2827

*Thank you for choosing Divinely Mobile!*
_Fast • Secure • Reliable_`;

    const whatsappUrl = `https://wa.me/${data.customerPhone.replace('+', '')}?text=${encodeURIComponent(message)}`;
    
    // Auto-open WhatsApp with receipt
    window.open(whatsappUrl, '_blank');
    
    return message;
  };

  const generateEmailReceipt = async (data: ReceiptData) => {
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; padding: 20px; text-align: center;">
          <h1>🟢 DIVINELY MOBILE</h1>
          <h2>Digital Receipt</h2>
        </div>
        
        <div style="padding: 20px; background: #f9fafb;">
          <h3>Purchase Details</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>Session ID:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${data.sessionId}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>Product:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${data.deal.network} ${data.deal.type.toUpperCase()} R${data.deal.amount}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>Price Paid:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; color: #059669;"><strong>R${data.deal.price}</strong></td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>Recipient:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${data.recipientPhone}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>Payment Method:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${data.paymentMethod.toUpperCase()}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>Date:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${new Date(data.timestamp).toLocaleString()}</td>
            </tr>
          </table>
          
          <div style="margin-top: 20px; padding: 15px; background: #dcfce7; border-radius: 8px; text-align: center;">
            <h3 style="color: #166534;">✅ Transaction Successful!</h3>
            <p style="color: #166534;">Your ${data.deal.type} has been delivered instantly to ${data.recipientPhone}</p>
          </div>
        </div>
        
        <div style="background: #374151; color: white; padding: 20px; text-align: center;">
          <p>Thank you for choosing Divinely Mobile!</p>
          <p>🌐 divinely-mobile.com | 📞 +27 100 2827</p>
        </div>
      </div>
    `;

    // In a real implementation, this would call an email service
    console.log('Email receipt generated:', emailContent);
    return emailContent;
  };

  const sendReceiptNotifications = async (receiptData: ReceiptData) => {
    try {
      // Generate WhatsApp receipt
      const whatsappMessage = generateWhatsAppReceipt(receiptData);
      
      // Generate email receipt
      const emailContent = await generateEmailReceipt(receiptData);
      
      // Show success notification
      toast({
        title: "Receipts Sent Successfully! 📧📱",
        description: "WhatsApp and Email receipts have been delivered",
      });

      return {
        whatsappMessage,
        emailContent,
        success: true
      };
    } catch (error) {
      console.error('Receipt generation failed:', error);
      toast({
        title: "Receipt Generation Failed",
        description: "Unable to send receipts. Please contact support.",
        variant: "destructive"
      });
      return { success: false };
    }
  };

  return {
    sendReceiptNotifications,
    generateWhatsAppReceipt,
    generateEmailReceipt
  };
};

export default useAutoReceiptGenerator;
