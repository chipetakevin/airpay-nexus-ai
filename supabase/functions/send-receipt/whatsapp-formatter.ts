
import { ReceiptData } from './types.ts';

export const formatWhatsAppMessage = (data: ReceiptData): string => {
  // Handle admin notifications for unknown recipients
  if (data.purchaseType === 'admin_notification' && data.isUnknownRecipient) {
    return `🚨 *ADMIN NOTIFICATION* - Unknown Recipient

🟢 *DIVINELY MOBILE TRANSACTION*

⚠️ *UNKNOWN RECIPIENT PHONE:* ${data.recipientPhone}
👤 *Purchaser:* ${data.customerName || data.customerPhone}
📧 *Purchaser Email:* ${data.customerEmail}
🆔 *Transaction ID:* ${data.transactionId}
⏰ *Date:* ${new Date(data.timestamp).toLocaleString()}

📋 *PURCHASE DETAILS:*
${data.items.map(item => 
  `• ${item.network.toUpperCase()} ${item.type.toUpperCase()} R${item.amount} - R${item.price}`
).join('\n')}

💰 *TOTAL PAID:* R${data.total}
🎁 *Cashback Earned:* R${data.cashbackEarned || 0}

📱 *ACTION REQUIRED:*
Customer has been instructed to forward receipt to ${data.recipientPhone} via WhatsApp.

🌐 https://myonecard.co.za
📞 Support: +27 100 2827

*Admin notification for unknown recipient number*`;
  }

  // Regular receipt formatting
  return `🟢 *DIVINELY MOBILE* 📱

✅ *PAYMENT SUCCESSFUL*

👤 *Customer:* ${data.customerName || data.customerPhone}
🆔 *Transaction ID:* ${data.transactionId}
⏰ *Date:* ${new Date(data.timestamp).toLocaleString()}

📋 *PURCHASE DETAILS:*
${data.items.map(item => 
  `• ${item.network.toUpperCase()} ${item.type.toUpperCase()} R${item.amount} - R${item.price}`
).join('\n')}

💰 *TOTAL PAID:* R${data.total}
🎁 *Cashback Earned:* R${data.cashbackEarned || 0}

✅ *Delivered instantly to ${data.recipientPhone}!*

🌐 https://myonecard.co.za
📞 Support: +27 100 2827

*Thank you for choosing Divinely Mobile!*
_Fast • Secure • Reliable_`;
};
