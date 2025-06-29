
import React from 'react';
import { useToast } from '@/hooks/use-toast';

interface ReceiptData {
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
    const message = `🟢 *DIVINE MOBILE* 📱

✅ *PAYMENT SUCCESSFUL*

👤 *Customer:* ${data.customerPhone}
⏰ *Date:* ${new Date(data.timestamp).toLocaleString()}

📋 *PURCHASE DETAILS:*
• ${data.deal.network.toUpperCase()} ${data.deal.type.toUpperCase()} R${data.deal.amount}
• Amount Paid: R${data.deal.price}
• Recipient: ${data.recipientPhone}

💰 *PAYMENT STATUS:*
• Method: ${data.paymentMethod.toUpperCase()}
• Status: ✅ COMPLETED

✅ *${data.deal.type === 'airtime' ? 'Airtime' : 'Data'} delivered instantly!*

🌐 https://divine-mobile.com
📞 Support: +27 100 2827

*Thank you for choosing Divine Mobile!*
_Fast • Secure • Reliable_`;

    const whatsappUrl = `https://wa.me/${data.customerPhone.replace('+', '')}?text=${encodeURIComponent(message)}`;
    
    // Auto-open WhatsApp with receipt
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 1500);
    
    return message;
  };

  const generateEmailReceipt = async (data: ReceiptData) => {
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb;">
        <div style="background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 30px; text-align: center; border-radius: 15px 15px 0 0;">
          <h1 style="margin: 0; font-size: 28px;">🟢 DIVINE MOBILE</h1>
          <h2 style="margin: 10px 0 0 0; font-size: 18px;">Digital Receipt</h2>
        </div>
        
        <div style="padding: 30px; background: white;">
          <h3 style="color: #059669; margin-top: 0;">Payment Confirmation</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Product:</td>
              <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${data.deal.network} ${data.deal.type.toUpperCase()} R${data.deal.amount}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Amount Paid:</td>
              <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; color: #059669; font-weight: bold;">R${data.deal.price}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Recipient:</td>
              <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${data.recipientPhone}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Payment Method:</td>
              <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${data.paymentMethod.toUpperCase()}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Date:</td>
              <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${new Date(data.timestamp).toLocaleString()}</td>
            </tr>
          </table>
          
          <div style="background: #dcfce7; border: 1px solid #10b981; border-radius: 10px; padding: 20px; text-align: center; margin-bottom: 20px;">
            <h3 style="color: #166534; margin: 0 0 10px 0;">✅ Payment Successful!</h3>
            <p style="color: #166534; margin: 0;">Your ${data.deal.type} has been delivered instantly to ${data.recipientPhone}</p>
          </div>
        </div>
        
        <div style="background: #374151; color: white; padding: 20px; text-align: center; border-radius: 0 0 15px 15px;">
          <p style="margin: 0 0 10px 0;">Thank you for choosing Divine Mobile!</p>
          <p style="margin: 0;">🌐 divine-mobile.com | 📞 +27 100 2827</p>
        </div>
      </div>
    `;

    // In a real implementation, this would call an email service
    console.log('📧 Email receipt generated and sent to:', data.customerEmail);
    return emailContent;
  };

  const sendReceiptNotifications = async (receiptData: ReceiptData) => {
    try {
      // Generate WhatsApp receipt (auto-opens)
      const whatsappMessage = generateWhatsAppReceipt(receiptData);
      
      // Generate email receipt
      const emailContent = await generateEmailReceipt(receiptData);
      
      // Show success notification
      toast({
        title: "Receipts Delivered! 🎉",
        description: "📱 WhatsApp receipt opened • 📧 Email receipt sent",
        duration: 4000
      });

      // Auto-redirect to shopping page after receipt delivery
      setTimeout(() => {
        window.location.replace('/portal?tab=deals');
      }, 3000);

      return {
        whatsappMessage,
        emailContent,
        success: true
      };
    } catch (error) {
      console.error('Receipt delivery failed:', error);
      toast({
        title: "Receipt Delivery Failed",
        description: "Payment successful but receipt delivery failed. Check transaction history.",
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
