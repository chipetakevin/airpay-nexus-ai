
import { ReceiptData } from './types.ts';

export const formatWhatsAppMessage = (data: ReceiptData): string => {
  // Handle admin notifications for unknown recipients
  if (data.purchaseType === 'admin_notification' && data.isUnknownRecipient) {
    return `🚨 *ADMIN NOTIFICATION* - Unknown Recipient

🟢 *DIVINE MOBILE TRANSACTION*

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

  // Handle sender confirmation receipts
  if (data.purchaseType === 'sender_confirmation') {
    return `✅ *DIVINE MOBILE* - Purchase Confirmation

🟢 *TRANSACTION COMPLETED*

👤 *You purchased for:* ${data.recipientPhone}
🆔 *Transaction ID:* ${data.transactionId}
⏰ *Date:* ${new Date(data.timestamp).toLocaleString()}

📋 *PURCHASE DETAILS:*
${data.items.map(item => 
  `• ${item.network.toUpperCase()} ${item.type.toUpperCase()} R${item.amount} - R${item.price}`
).join('\n')}

💰 *TOTAL PAID:* R${data.total}
🎁 *Your Cashback:* R${data.cashbackEarned || 0}

✅ *Services delivered to ${data.recipientPhone}*
📱 *Recipient should receive their own receipt*

🌐 https://myonecard.co.za
📞 Support: +27 100 2827

*Thank you for choosing Divine Mobile!*
_Fast • Secure • Reliable_`;
  }

  // Regular recipient receipt formatting
  return `🟢 *DIVINE MOBILE* 📱

✅ *SERVICES DELIVERED*

📱 *Recipient:* ${data.recipientPhone}
🆔 *Transaction ID:* ${data.transactionId}
⏰ *Date:* ${new Date(data.timestamp).toLocaleString()}

📋 *SERVICES RECEIVED:*
${data.items.map(item => 
  `• ${item.network.toUpperCase()} ${item.type.toUpperCase()} R${item.amount}`
).join('\n')}

💰 *Total Value:* R${data.total}

✅ *All services have been delivered to your number!*

${data.customerPhone !== data.recipientPhone ? 
  `🎁 *Gift from:* ${data.customerPhone}` : 
  `🎁 *Cashback Earned:* R${data.cashbackEarned || 0}`
}

🌐 https://myonecard.co.za
📞 Support: +27 100 2827

*Thank you for using Divine Mobile!*
_Fast • Secure • Reliable_`;
};
