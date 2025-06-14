
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export const useReceiptGeneration = () => {
  const { toast } = useToast();

  const generateTransactionId = (timestamp: string) => {
    return 'AP' + timestamp.replace(/[^0-9]/g, '').slice(-8);
  };

  const getCustomerDisplayName = () => {
    const credentials = localStorage.getItem('userCredentials');
    let displayName = 'Valued Customer';
    
    if (credentials) {
      const parsedCredentials = JSON.parse(credentials);
      
      // Priority: nickname > full name > first name > email prefix
      if (parsedCredentials.nickname) {
        displayName = parsedCredentials.nickname;
      } else if (parsedCredentials.firstName && parsedCredentials.lastName) {
        displayName = `${parsedCredentials.firstName} ${parsedCredentials.lastName}`;
      } else if (parsedCredentials.firstName) {
        displayName = parsedCredentials.firstName;
      } else if (parsedCredentials.email) {
        // Use email prefix as last resort
        displayName = parsedCredentials.email.split('@')[0];
      }
    }
    
    return displayName;
  };

  const autoGenerateAndSendReceipts = async (transactionData: any, profitSharing: any, cartItems: any[], purchaseMode: string, customerPhone: string, recipientData: any) => {
    try {
      const credentials = localStorage.getItem('userCredentials');
      let customerEmail = '';
      
      if (credentials) {
        const parsedCredentials = JSON.parse(credentials);
        customerEmail = parsedCredentials.email || '';
      }

      const customerName = getCustomerDisplayName();

      const receiptData = {
        customerName: customerName,
        customerEmail: customerEmail,
        customerPhone: customerPhone,
        recipientPhone: purchaseMode === 'self' ? customerPhone : recipientData.phone,
        recipientName: purchaseMode === 'self' ? 'Self' : recipientData.name,
        transactionId: generateTransactionId(transactionData.timestamp),
        items: cartItems.map(item => ({
          network: item.network,
          amount: item.amount,
          price: item.discountedPrice,
          type: item.dealType || 'airtime'
        })),
        total: transactionData.amount,
        cashbackEarned: profitSharing.customerCashback || profitSharing.registeredCustomerReward || 0,
        timestamp: transactionData.timestamp,
        purchaseType: purchaseMode
      };

      // Send receipt via edge function (handles both email and WhatsApp)
      const { data, error } = await supabase.functions.invoke('send-receipt', {
        body: receiptData
      });

      if (error) {
        console.error('Error sending receipt:', error);
        toast({
          title: "Receipt Warning",
          description: "Purchase successful but receipt delivery failed. Check transaction history for manual resend options.",
          variant: "destructive"
        });
      } else {
        console.log('Receipt sent successfully:', data);
        
        // Auto-redirect to WhatsApp with receipt if URL provided
        if (data?.whatsappUrl) {
          toast({
            title: "📱 Opening WhatsApp",
            description: "Receipt sent! Redirecting to WhatsApp for instant access...",
          });
          
          setTimeout(() => {
            window.open(data.whatsappUrl, '_blank');
          }, 1500);
        }

        // Show email confirmation
        if (customerEmail) {
          toast({
            title: "📧 Email Receipt Sent",
            description: `Receipt sent to ${customerEmail}`,
          });
        }
      }
    } catch (error) {
      console.error('Error in autoGenerateAndSendReceipts:', error);
      toast({
        title: "Receipt Error",
        description: "Purchase successful but receipt generation failed. Check transaction history.",
        variant: "destructive"
      });
    }
  };

  return {
    autoGenerateAndSendReceipts,
    generateTransactionId,
    getCustomerDisplayName
  };
};
