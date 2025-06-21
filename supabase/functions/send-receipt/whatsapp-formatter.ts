
import { ReceiptData } from './types.ts';

export const formatWhatsAppMessage = (data: ReceiptData): string => {
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

🌐 https://divinely-mobile.com
📞 Support: +27 100 2827

*Thank you for choosing Divinely Mobile!*
_Fast • Secure • Reliable_`;
};
