
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
    console.log('🎯 Intelligent WhatsApp redirect - handling receipt delivery');
    
    // First try to send to recipient directly
    const recipientWhatsAppUrl = `https://wa.me/${recipientPhone.replace('+', '')}?text=${encodeURIComponent(receiptMessage)}`;
    
    // Always try to open recipient WhatsApp first
    window.open(recipientWhatsAppUrl, '_blank');
    
    toast({
      title: "📱 Receipt Sent",
      description: `Receipt opened in WhatsApp for ${recipientPhone}`,
      duration: 3000
    });

    // If there are issues, prepare fallback to sender
    setTimeout(() => {
      const fallbackMessage = `🚨 *BACKUP RECEIPT DELIVERY*

If ${recipientPhone} didn't receive the receipt, please forward this:

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

      const senderWhatsAppUrl = `https://wa.me/${senderPhone.replace('+', '')}?text=${encodeURIComponent(fallbackMessage)}`;
      
      // Show option to get backup receipt
      toast({
        title: "📋 Backup Available",
        description: "Click here if recipient didn't receive the receipt",
        duration: 10000,
        action: {
          label: "Get Backup",
          onClick: () => {
            window.open(senderWhatsAppUrl, '_blank');
            toast({
              title: "📱 Backup Receipt Sent",
              description: "Forwarding instructions sent to your WhatsApp",
              duration: 3000
            });
          }
        }
      });
    }, 5000);
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

  const handleDirectWhatsAppSend = (receiptMessage: string, recipientPhone: string) => {
    console.log('📱 Sending direct WhatsApp receipt to:', recipientPhone);
    
    const whatsappUrl = `https://wa.me/${recipientPhone.replace('+', '')}?text=${encodeURIComponent(receiptMessage)}`;
    
    // Always attempt to open WhatsApp regardless of "availability" status
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "📱 WhatsApp Opened",
      description: `Receipt ready to send to ${recipientPhone}`,
      duration: 3000
    });
    
    return whatsappUrl;
  };

  return {
    generateWhatsAppForwardingInstructions,
    handleIntelligentWhatsAppRedirect,
    autoRedirectToSmartDeals,
    handleDirectWhatsAppSend
  };
};
