
import { ReceiptData } from './types.ts';

export const formatWhatsAppMessage = (data: ReceiptData): string => {
  const loyaltyPoints = Math.round(data.total * 2);

  // Handle admin notifications for unknown recipients
  if (data.purchaseType === 'admin_notification' && data.isUnknownRecipient) {
    return `🚨 **ADMIN NOTIFICATION** - Unknown Recipient

🌟 **DIVINE MOBILE TRANSACTION**

⚠️ **UNKNOWN RECIPIENT**: ${data.recipientPhone}
👤 **Purchaser**: ${data.customerName || data.customerPhone}
📧 **Email**: ${data.customerEmail}
🆔 **Transaction ID**: ${data.transactionId}
⏰ **Date**: ${new Date(data.timestamp).toLocaleString()}

📋 **PURCHASE DETAILS**:
${data.items.map(item => 
  `• ${item.network.toUpperCase().replace('DIVINELY', 'DIVINE')} ${item.type.toUpperCase()} R${item.amount} - R${item.price}`
).join('\n')}

**Total**: R${data.total}
**Cashback**: R${data.cashbackEarned || 0}

📱 **ACTION REQUIRED**:
Customer instructed to forward receipt to ${data.recipientPhone}

🌐 www.divinemobile.co.za | 📞 +27 100 2827

*Admin notification for unknown recipient*`;
  }

  // Handle sender confirmation receipts
  if (data.purchaseType === 'sender_confirmation') {
    return `🌟 **DIVINE MOBILE** - Purchase Confirmation

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 **TRANSACTION: CONFIRMED** ✅
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 **Purchased for**: ${data.recipientPhone}
🆔 **Transaction ID**: ${data.transactionId}
⏰ **Date**: ${new Date(data.timestamp).toLocaleString()} SAST

📋 **PURCHASE SUMMARY**:
${data.items.map(item => 
  `• ${item.network.toUpperCase().replace('DIVINELY', 'DIVINE')} ${item.type.toUpperCase()} R${item.amount} - R${item.price}`
).join('\n')}

**Total Paid**: R${data.total}
**Your Cashback**: R${data.cashbackEarned || 0}
**Loyalty**: +${loyaltyPoints} pts

✅ **Services delivered to ${data.recipientPhone}**
📱 **Recipient receives separate receipt**

🌟 **Thank you for choosing Divine Mobile!**
⚡ Fast • 🔒 Secure • 🎯 Reliable

🌐 www.divinemobile.co.za | 📞 +27 100 2827`;
  }

  // Regular recipient receipt formatting
  return `🌟 **DIVINE MOBILE** 📱
✨ **Premium Digital Receipt** ✨

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 **TRANSACTION: CONFIRMED** ✅
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📱 **Recipient**: ${data.recipientPhone}
🆔 **Transaction ID**: ${data.transactionId}
⏰ **Date**: ${new Date(data.timestamp).toLocaleString()} SAST

🛒 **SERVICES RECEIVED**:
${data.items.map(item => 
  `• ${item.network.toUpperCase().replace('DIVINELY', 'DIVINE')} ${item.type.toUpperCase()} R${item.amount}`
).join('\n')}

**Total Value**: R${data.total}

✅ **All services delivered instantly!**

${data.customerPhone !== data.recipientPhone ? 
  `🎁 **Gift from**: ${data.customerPhone}` : 
  `🎁 **Cashback Earned**: R${data.cashbackEarned || 0}\n🏆 **Loyalty**: +${loyaltyPoints} pts`
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 **SUPPORT & POLICIES**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Keep this receipt for records
• 24/7 Support: +27 100 2827
• Help: www.divinemobile.co.za/support
• Refunds: T&Cs apply

🌟 **Thank you for using Divine Mobile!** 🌟
⚡ Fast • 🔒 Secure • 🎯 Reliable

🔐 **Digital Verification**
• Platform: Addex-Hub Secure
• Trusted by thousands daily`;
};
