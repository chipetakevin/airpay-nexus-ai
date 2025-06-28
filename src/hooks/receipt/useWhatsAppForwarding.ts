
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
    autoRedirectToSmartDeals
  };
};
