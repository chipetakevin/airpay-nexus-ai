
import { useToast } from '@/hooks/use-toast';

export const useWhatsAppForwarding = () => {
  const { toast } = useToast();

  const generateWhatsAppForwardingInstructions = (receiptMessage: string, recipientPhone: string) => {
    return `📱 *FORWARDING INSTRUCTIONS*

Since ${recipientPhone} is not in your contacts, please:

1️⃣ Copy the receipt message below
2️⃣ Open WhatsApp 
3️⃣ Send to ${recipientPhone}
4️⃣ Forward this receipt:

${receiptMessage}

*Thank you for helping us deliver receipts!*`;
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
