
import { ReceiptData } from './types.ts';

export const formatWhatsAppMessage = (data: ReceiptData): string => {
  const itemsList = data.items.map(item => 
    `• Divinely Mobile ${item.type} R${item.amount} - R${item.price.toFixed(2)}`
  ).join('\n');

  // Format date as YYYY/MM/DD, HH:mm:ss
  const dateObj = new Date(data.timestamp);
  const formattedDate = `${dateObj.getFullYear()}/${String(dateObj.getMonth() + 1).padStart(2, '0')}/${String(dateObj.getDate()).padStart(2, '0')}, ${String(dateObj.getHours()).padStart(2, '0')}:${String(dateObj.getMinutes()).padStart(2, '0')}:${String(dateObj.getSeconds()).padStart(2, '0')}`;

  // Capitalize first letter of each word in customer name (first name and surname)
  const capitalizedCustomerName = data.customerName
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  return `🟢 *DIVINELY MOBILE* 📱

✅ *DIGITAL RECEIPT*

👤 *Customer:* ${capitalizedCustomerName}
📞 *Account:* ${data.customerPhone}
🆔 *Transaction ID:* ${data.transactionId}
⏰ *Date:* ${formattedDate}

📋 *PURCHASE DETAILS:*
${itemsList}

💰 *PAYMENT SUMMARY:*
• Total Paid: R${data.total.toFixed(2)}
• Cashback Earned: R${data.cashbackEarned.toFixed(2)}
• Recipient: ${data.recipientName} (${data.recipientPhone})

✅ *Transaction Successful!*
${data.purchaseType === 'self' ? 'Airtime loaded to your number' : `Airtime sent to ${data.recipientName}`}

🌐 https://divinely-mobile.com
💬 +27 100 2827

*Thank you for choosing Divinely Mobile!*`;
};
