
import { ReceiptData } from './types.ts';

const getInitials = (name: string): string => {
  return name.split(' ').map(word => word.charAt(0).toUpperCase()).join('');
};

export const formatWhatsAppMessage = (data: ReceiptData): string => {
  const itemsList = data.items.map(item => 
    `• Divinely Mobile ${item.type} R${item.amount} - R${item.price.toFixed(2)}`
  ).join('\n');

  // Format date as YYYY/MM/DD, HH:mm:ss
  const dateObj = new Date(data.timestamp);
  const formattedDate = `${dateObj.getFullYear()}/${String(dateObj.getMonth() + 1).padStart(2, '0')}/${String(dateObj.getDate()).padStart(2, '0')}, ${String(dateObj.getHours()).padStart(2, '0')}:${String(dateObj.getMinutes()).padStart(2, '0')}:${String(dateObj.getSeconds()).padStart(2, '0')}`;

  const senderInitials = getInitials(data.customerName);

  // Customize message based on purchase type
  let recipientInfo = '';
  let transactionMessage = '';
  
  if (data.purchaseType === 'sender') {
    recipientInfo = `• Recipient: ${data.recipientName} (${data.recipientPhone})`;
    transactionMessage = `Airtime sent to ${data.recipientName}`;
  } else if (data.purchaseType === 'recipient') {
    recipientInfo = `• Received from: ${senderInitials} (${data.customerPhone})`;
    transactionMessage = `Airtime received from ${senderInitials}`;
  } else {
    recipientInfo = `• Recipient: ${data.recipientName} (${data.recipientPhone})`;
    transactionMessage = data.purchaseType === 'self' ? 'Airtime loaded to your number' : `Airtime sent to ${data.recipientName}`;
  }

  return `🟢 *DIVINELY MOBILE* 📱

✅ *DIGITAL RECEIPT*

👤 *Sender:* ${senderInitials}
📞 *Account:* ${data.customerPhone}
🆔 *Transaction ID:* ${data.transactionId}
⏰ *Date:* ${formattedDate}

📋 *PURCHASE DETAILS:*
${itemsList}

💰 *PAYMENT SUMMARY:*
• Total Paid: R${data.total.toFixed(2)}
• Cashback Earned: R${data.cashbackEarned.toFixed(2)}
${recipientInfo}

✅ *Transaction Successful!*
${transactionMessage}

🌐 https://divinely-mobile.com
📞 +27 100 2827

*Thank you for choosing Divinely Mobile!* 
_Brought To You By OneCard Global Rewards Program_`;
};
