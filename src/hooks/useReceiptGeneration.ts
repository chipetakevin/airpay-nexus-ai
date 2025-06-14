
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export const useReceiptGeneration = () => {
  const { toast } = useToast();

  const generateTransactionId = (timestamp: string) => {
    return 'AP' + timestamp.replace(/[^0-9]/g, '').slice(-8);
  };

  const capitalizeWords = (str: string) => {
    return str.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
  };

  const getCustomerDisplayName = () => {
    const credentials = localStorage.getItem('userCredentials');
    let displayName = 'Valued Customer';
    
    if (credentials) {
      const parsedCredentials = JSON.parse(credentials);
      
      // Priority: nickname > full name > first name > email prefix
      if (parsedCredentials.nickname) {
        displayName = capitalizeWords(parsedCredentials.nickname);
      } else if (parsedCredentials.firstName && parsedCredentials.lastName) {
        displayName = `${capitalizeWords(parsedCredentials.firstName)} ${capitalizeWords(parsedCredentials.lastName)}`;
      } else if (parsedCredentials.firstName) {
        displayName = capitalizeWords(parsedCredentials.firstName);
      } else if (parsedCredentials.email) {
        // Use email prefix as last resort and capitalize it
        displayName = capitalizeWords(parsedCredentials.email.split('@')[0]);
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

      // For third-party purchases, send receipt to BOTH sender and recipient
      if (purchaseMode === 'other') {
        // Send receipt to SENDER (customer who made the purchase)
        const senderReceiptData = {
          customerName: customerName,
          customerEmail: customerEmail,
          customerPhone: customerPhone,
          recipientPhone: recipientData.phone,
          recipientName: capitalizeWords(recipientData.name),
          transactionId: generateTransactionId(transactionData.timestamp),
          items: cartItems.map(item => ({
            network: item.network,
            amount: item.amount,
            price: item.discountedPrice,
            type: item.dealType || 'airtime'
          })),
          total: transactionData.amount,
          cashbackEarned: profitSharing.registeredCustomerReward || 0,
          timestamp: transactionData.timestamp,
          purchaseType: 'sender' // Special type for sender's receipt
        };

        // Send receipt to RECIPIENT
        const recipientReceiptData = {
          customerName: capitalizeWords(recipientData.name),
          customerEmail: '', // Recipient email not available
          customerPhone: recipientData.phone,
          recipientPhone: recipientData.phone,
          recipientName: capitalizeWords(recipientData.name),
          transactionId: generateTransactionId(transactionData.timestamp),
          items: cartItems.map(item => ({
            network: item.network,
            amount: item.amount,
            price: item.discountedPrice,
            type: item.dealType || 'airtime'
          })),
          total: transactionData.amount,
          cashbackEarned: profitSharing.unregisteredRecipientReward || 0,
          timestamp: transactionData.timestamp,
          purchaseType: 'recipient' // Special type for recipient's receipt
        };

        // Send both receipts
        await Promise.all([
          sendReceiptToCustomer(senderReceiptData, 'sender'),
          sendReceiptToCustomer(recipientReceiptData, 'recipient')
        ]);

        toast({
          title: "📱 Receipts Sent",
          description: `Receipts sent to both you and ${recipientData.name}`,
        });

      } else {
        // Self-purchase - send receipt to customer only
        const receiptData = {
          customerName: customerName,
          customerEmail: customerEmail,
          customerPhone: customerPhone,
          recipientPhone: customerPhone,
          recipientName: 'Self',
          transactionId: generateTransactionId(transactionData.timestamp),
          items: cartItems.map(item => ({
            network: item.network,
            amount: item.amount,
            price: item.discountedPrice,
            type: item.dealType || 'airtime'
          })),
          total: transactionData.amount,
          cashbackEarned: profitSharing.customerCashback || 0,
          timestamp: transactionData.timestamp,
          purchaseType: 'self'
        };

        await sendReceiptToCustomer(receiptData, 'customer');

        // Auto-redirect to WhatsApp for self-purchases
        toast({
          title: "📧 Email Receipt Sent",
          description: customerEmail ? `Receipt sent to ${customerEmail}` : "Receipt generated successfully",
        });
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

  const sendReceiptToCustomer = async (receiptData: any, recipientType: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('send-receipt', {
        body: receiptData
      });

      if (error) {
        console.error(`Error sending receipt to ${recipientType}:`, error);
        return;
      }

      console.log(`Receipt sent successfully to ${recipientType}:`, data);

      // Auto-redirect to WhatsApp with receipt if URL provided
      if (data?.whatsappUrl && recipientType === 'customer') {
        setTimeout(() => {
          window.open(data.whatsappUrl, '_blank');
        }, 1500);
      }

    } catch (error) {
      console.error(`Error sending receipt to ${recipientType}:`, error);
    }
  };

  return {
    autoGenerateAndSendReceipts,
    generateTransactionId,
    getCustomerDisplayName
  };
};
