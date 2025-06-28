
import { useToast } from '@/hooks/use-toast';

export const useWhatsAppForwarding = () => {
  const { toast } = useToast();

  const generateWhatsAppForwardingInstructions = (receiptMessage: string, recipientPhone: string) => {
    return `📱 *RECEIPT FORWARDING INSTRUCTIONS*

🎯 *FOR:* ${recipientPhone}

Since this number may not be in your contacts or on WhatsApp, please follow these steps:

1️⃣ *COPY* the receipt message below
2️⃣ *OPEN* WhatsApp 
3️⃣ *SEARCH* for ${recipientPhone} or *ADD* as new contact
4️⃣ *SEND* the receipt message:

━━━━━━━━━━━━━━━━━━━━━━━━━

${receiptMessage}

━━━━━━━━━━━━━━━━━━━━━━━━━

✅ *If number is not on WhatsApp:*
- Use SMS/Email to share the receipt
- Keep this receipt for your records

*Thank you for helping us deliver receipts!*

🌐 https://myonecard.co.za
📞 Support: +27 100 2827`;
  };

  const handleIntelligentWhatsAppRedirect = (receiptMessage: string, recipientPhone: string, senderPhone: string) => {
    console.log('🎯 Intelligent WhatsApp redirect - recipient not on WhatsApp, redirecting to sender');
    
    // First show notification about redirection
    toast({
      title: "📱 Smart Redirect Active",
      description: `Recipient ${recipientPhone} not on WhatsApp. Redirecting to your number for manual forwarding.`,
      duration: 4000
    });

    // Generate the forwarding message with clear instructions
    const forwardingMessage = `🚨 *RECEIPT DELIVERY ASSISTANCE NEEDED*

The recipient ${recipientPhone} is not available on WhatsApp.

📋 *RECEIPT TO FORWARD:*
━━━━━━━━━━━━━━━━━━━━━━━━━

${receiptMessage}

━━━━━━━━━━━━━━━━━━━━━━━━━

📞 *DELIVERY OPTIONS:*
1️⃣ *SMS:* Copy and send via SMS to ${recipientPhone}
2️⃣ *Call:* Phone ${recipientPhone} and read details
3️⃣ *Email:* Forward if you have their email
4️⃣ *In Person:* Share receipt when you meet

✅ *Your transaction was successful!*
💰 Keep this receipt for your records

🌐 https://myonecard.co.za
📞 Support: +27 100 2827`;

    // Redirect to sender's WhatsApp with forwarding instructions
    const encodedMessage = encodeURIComponent(forwardingMessage);
    const senderWhatsAppUrl = `https://wa.me/${senderPhone.replace('+', '')}?text=${encodedMessage}`;
    
    setTimeout(() => {
      window.open(senderWhatsAppUrl, '_blank');
      
      toast({
        title: "📱 WhatsApp Opened",
        description: "Instructions sent to your WhatsApp for manual forwarding to recipient.",
        duration: 5000
      });
    }, 2000);
  };

  const autoRedirectToSmartDeals = () => {
    console.log('🚀 Auto-redirecting to Smart Deals...');
    
    // Show redirect notification
    toast({
      title: "✅ Receipt Process Complete",
      description: "Redirecting to Smart Deals for your next purchase...",
      duration: 3000
    });

    // Redirect to smart deals after a short delay
    setTimeout(() => {
      window.location.href = '/portal?tab=deals';
    }, 3000);
  };

  return {
    generateWhatsAppForwardingInstructions,
    handleIntelligentWhatsAppRedirect,
    autoRedirectToSmartDeals
  };
};
