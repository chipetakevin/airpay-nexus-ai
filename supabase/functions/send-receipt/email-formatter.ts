
import { ReceiptData } from './types.ts';

export const formatEmailReceipt = (data: ReceiptData): string => {
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
        <p style="margin: 0;">🌐 divinely-mobile.com | 📞 +27 100 2827</p>
      </div>
    </div>
  `;
};
