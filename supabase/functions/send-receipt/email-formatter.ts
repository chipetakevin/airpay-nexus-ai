
import { ReceiptData } from './types.ts';

export const formatEmailReceipt = (data: ReceiptData): string => {
  // Handle admin notifications for unknown recipients
  if (data.purchaseType === 'admin_notification' && data.isUnknownRecipient) {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb;">
        <div style="background: linear-gradient(135deg, #dc2626, #b91c1c); color: white; padding: 30px; text-align: center; border-radius: 15px 15px 0 0;">
          <h1 style="margin: 0; font-size: 28px;">🚨 ADMIN NOTIFICATION</h1>
          <h2 style="margin: 10px 0 0 0; font-size: 18px;">Unknown Recipient Alert</h2>
        </div>
        
        <div style="padding: 30px; background: white;">
          <div style="background: #fef2f2; border: 1px solid #f87171; border-radius: 10px; padding: 20px; margin-bottom: 20px;">
            <h3 style="color: #dc2626; margin: 0 0 10px 0;">⚠️ Unknown Recipient Phone Number</h3>
            <p style="color: #dc2626; margin: 0; font-weight: bold; font-size: 18px;">${data.recipientPhone}</p>
          </div>
          
          <h3 style="color: #059669; margin-top: 0;">Transaction Details</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Transaction ID:</td>
              <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${data.transactionId}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Purchaser:</td>
              <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${data.customerName || data.customerPhone}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Purchaser Email:</td>
              <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${data.customerEmail}</td>
            </tr>
            ${data.items.map(item => `
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Product:</td>
              <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${item.network} ${item.type.toUpperCase()} R${item.amount}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Amount:</td>
              <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; color: #059669; font-weight: bold;">R${item.price}</td>
            </tr>
            `).join('')}
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Total Paid:</td>
              <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; color: #059669; font-weight: bold; font-size: 18px;">R${data.total}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Date:</td>
              <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${new Date(data.timestamp).toLocaleString()}</td>
            </tr>
          </table>
          
          <div style="background: #fff3cd; border: 1px solid #ffc107; border-radius: 10px; padding: 20px; text-align: center; margin-bottom: 20px;">
            <h3 style="color: #856404; margin: 0 0 10px 0;">📱 Action Required</h3>
            <p style="color: #856404; margin: 0;">Customer has been instructed to forward the receipt to <strong>${data.recipientPhone}</strong> via WhatsApp.</p>
          </div>
        </div>
        
        <div style="background: #374151; color: white; padding: 20px; text-align: center; border-radius: 0 0 15px 15px;">
          <p style="margin: 0 0 10px 0;">OneCard Admin Notification System</p>
          <p style="margin: 0;">🌐 myonecard.co.za | 📞 +27 100 2827</p>
        </div>
      </div>
    `;
  }

  // Regular email receipt formatting
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb;">
      <div style="background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 30px; text-align: center; border-radius: 15px 15px 0 0;">
        <h1 style="margin: 0; font-size: 28px;">🟢 DIVINELY MOBILE</h1>
        <h2 style="margin: 10px 0 0 0; font-size: 18px;">Digital Receipt</h2>
      </div>
      
      <div style="padding: 30px; background: white;">
        <h3 style="color: #059669; margin-top: 0;">Payment Confirmation</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Transaction ID:</td>
            <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${data.transactionId}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Customer:</td>
            <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${data.customerName || data.customerPhone}</td>
          </tr>
          ${data.items.map(item => `
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Product:</td>
            <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${item.network} ${item.type.toUpperCase()} R${item.amount}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Amount:</td>
            <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; color: #059669; font-weight: bold;">R${item.price}</td>
          </tr>
          `).join('')}
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Total Paid:</td>
            <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; color: #059669; font-weight: bold; font-size: 18px;">R${data.total}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Cashback Earned:</td>
            <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; color: #10b981; font-weight: bold;">R${data.cashbackEarned || 0}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Recipient:</td>
            <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${data.recipientPhone}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Date:</td>
            <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${new Date(data.timestamp).toLocaleString()}</td>
          </tr>
        </table>
        
        <div style="background: #dcfce7; border: 1px solid #10b981; border-radius: 10px; padding: 20px; text-align: center; margin-bottom: 20px;">
          <h3 style="color: #166534; margin: 0 0 10px 0;">✅ Payment Successful!</h3>
          <p style="color: #166534; margin: 0;">Your purchase has been delivered instantly to ${data.recipientPhone}</p>
        </div>
      </div>
      
      <div style="background: #374151; color: white; padding: 20px; text-align: center; border-radius: 0 0 15px 15px;">
        <p style="margin: 0 0 10px 0;">Thank you for choosing Divinely Mobile!</p>
        <p style="margin: 0;">🌐 myonecard.co.za | 📞 +27 100 2827</p>
      </div>
    </div>
  `;
};
