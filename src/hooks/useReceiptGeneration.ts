
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export const useReceiptGeneration = () => {
  const { toast } = useToast();

  const generateTransactionId = (timestamp: string) => {
    return 'AP' + timestamp.replace(/[^0-9]/g, '').slice(-8);
  };

  const generateSessionId = () => {
    // Generate exactly 7-character unique session ID with letters and numbers
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 7; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const capitalizeWords = (str: string) => {
    return str.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
  };

  const getCustomerDisplayName = () => {
    const credentials = localStorage.getItem('userCredentials');
    const userData = localStorage.getItem('onecardUser');
    let displayName = 'Valued Customer';
    
    // First try to get name from user credentials (includes firstName and lastName from registration)
    if (credentials) {
      try {
        const parsedCredentials = JSON.parse(credentials);
        
        if (parsedCredentials.firstName && parsedCredentials.lastName) {
          displayName = `${capitalizeWords(parsedCredentials.firstName)} ${capitalizeWords(parsedCredentials.lastName)}`;
          return displayName;
        }
      } catch (error) {
        console.error('Error parsing credentials:', error);
      }
    }
    
    // Fallback to user data if credentials don't have name
    if (userData) {
      try {
        const parsedUserData = JSON.parse(userData);
        
        if (parsedUserData.firstName && parsedUserData.lastName) {
          displayName = `${capitalizeWords(parsedUserData.firstName)} ${capitalizeWords(parsedUserData.lastName)}`;
        } else if (parsedUserData.firstName) {
          displayName = capitalizeWords(parsedUserData.firstName);
        } else if (parsedUserData.email) {
          displayName = capitalizeWords(parsedUserData.email.split('@')[0]);
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
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
      const sessionId = generateSessionId(); // This now generates exactly 7 characters

      console.log(`Generated 7-character session ID: ${sessionId} (length: ${sessionId.length})`);

      // Enhanced receipt data for both WhatsApp and Email
      const baseReceiptData = {
        customerName: customerName,
        customerEmail: customerEmail,
        customerPhone: customerPhone,
        transactionId: generateTransactionId(transactionData.timestamp),
        sessionId: sessionId,
        items: cartItems.map(item => ({
          network: item.network,
          amount: item.amount,
          price: item.discountedPrice,
          type: item.dealType || 'airtime'
        })),
        total: transactionData.amount,
        timestamp: transactionData.timestamp
      };

      if (purchaseMode === 'other') {
        // Send receipt to SENDER
        const senderReceiptData = {
          ...baseReceiptData,
          recipientPhone: recipientData.phone,
          recipientName: capitalizeWords(recipientData.name),
          cashbackEarned: profitSharing.registeredCustomerReward || 0,
          purchaseType: 'sender' as const
        };

        // Send receipt to RECIPIENT
        const recipientReceiptData = {
          ...baseReceiptData,
          customerName: capitalizeWords(recipientData.name),
          customerPhone: recipientData.phone,
          recipientPhone: recipientData.phone,
          recipientName: capitalizeWords(recipientData.name),
          cashbackEarned: profitSharing.unregisteredRecipientReward || 0,
          purchaseType: 'recipient' as const
        };

        // Send receipts to both parties
        await Promise.all([
          sendReceiptToCustomer(senderReceiptData, 'sender'),
          sendReceiptToCustomer(recipientReceiptData, 'recipient')
        ]);

        toast({
          title: "📱 Dual Receipts Sent",
          description: `WhatsApp & Email receipts delivered to both you and ${recipientData.name}`,
        });

      } else {
        // Self-purchase
        const receiptData = {
          ...baseReceiptData,
          recipientPhone: customerPhone,
          recipientName: 'Self',
          cashbackEarned: profitSharing.customerCashback || 0,
          purchaseType: 'self' as const
        };

        await sendReceiptToCustomer(receiptData, 'customer');

        toast({
          title: "📧 Receipts Delivered",
          description: customerEmail ? `WhatsApp & Email receipts sent to ${customerEmail}` : "WhatsApp receipt delivered successfully",
        });
      }

    } catch (error) {
      console.error('Error in autoGenerateAndSendReceipts:', error);
      toast({
        title: "Receipt Error",
        description: "Payment successful but receipt generation failed. Check transaction history.",
        variant: "destructive"
      });
    }
  };

  const sendReceiptToCustomer = async (receiptData: any, recipientType: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('send-receipt', {
        body: receiptData
      });

      if (error) {
        console.error(`Error sending receipt to ${recipientType}:`, error);
        return;
      }

      console.log(`✅ Receipt sent successfully to ${recipientType}:`, data);

      // Auto-redirect to WhatsApp with receipt
      if (data?.whatsappUrl && recipientType === 'customer') {
        setTimeout(() => {
          window.open(data.whatsappUrl, '_blank');
        }, 2000);
      }

    } catch (error) {
      console.error(`Error sending receipt to ${recipientType}:`, error);
    }
  };

  return {
    autoGenerateAndSendReceipts,
    generateTransactionId,
    generateSessionId,
    getCustomerDisplayName
  };
};
