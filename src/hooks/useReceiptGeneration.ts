
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

  const isPhoneNumberSaved = (phoneNumber: string) => {
    // Check if the phone number is saved in contacts or user's device
    // For now, we'll assume numbers starting with specific patterns are saved
    // In real implementation, this would check against a contacts database or device contacts
    const savedNumbers = JSON.parse(localStorage.getItem('savedContacts') || '[]');
    return savedNumbers.includes(phoneNumber);
  };

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

  const autoGenerateAndSendReceipts = async (transactionData: any, profitSharing: any, cartItems: any[], purchaseMode: string, customerPhone: string, recipientData: any) => {
    try {
      // CRITICAL: Only generate receipts if transaction status is 'completed'
      if (transactionData.status !== 'completed') {
        console.log('⚠️ Receipt generation skipped - transaction not completed');
        return;
      }

      console.log('✅ Transaction completed - generating receipts...');
      
      const credentials = localStorage.getItem('userCredentials');
      let customerEmail = '';
      
      if (credentials) {
        const parsedCredentials = JSON.parse(credentials);
        customerEmail = parsedCredentials.email || '';
      }

      const customerName = getCustomerDisplayName();
      const adminEmail = 'admin@myonecard.co.za';

      // Enhanced receipt data - ONLY created after payment completion
      const baseReceiptData = {
        customerName: customerName,
        customerEmail: customerEmail,
        customerPhone: customerPhone,
        transactionId: generateTransactionId(transactionData.timestamp),
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
        const recipientPhoneNumber = recipientData.phone;
        const isRecipientPhoneSaved = isPhoneNumberSaved(recipientPhoneNumber);

        if (!isRecipientPhoneSaved) {
          // Recipient phone is unknown - send to admin and provide forwarding instructions
          console.log('📧 Unknown phone number detected - sending to admin and providing forwarding instructions');

          // Send receipt to admin
          const adminReceiptData = {
            ...baseReceiptData,
            customerEmail: adminEmail,
            recipientPhone: recipientPhoneNumber,
            recipientName: capitalizeWords(recipientData.name),
            cashbackEarned: profitSharing.registeredCustomerReward || 0,
            purchaseType: 'admin_notification' as const,
            isUnknownRecipient: true
          };

          await sendReceiptToCustomer(adminReceiptData, 'admin');

          // Generate WhatsApp receipt message for customer to forward
          const whatsappReceiptMessage = `🟢 *DIVINELY MOBILE RECEIPT* 📱

✅ *AIRTIME/DATA DELIVERED*

🎁 *Gift from:* ${customerName}
📱 *To:* ${recipientPhoneNumber}
💰 *Amount:* R${transactionData.amount}
🆔 *Transaction ID:* ${generateTransactionId(transactionData.timestamp)}
⏰ *Date:* ${new Date(transactionData.timestamp).toLocaleString()}

*Your airtime/data has been loaded successfully!*

🌐 https://myonecard.co.za
📞 Support: +27 100 2827

_Thank you for using OneCard!_`;

          // Send forwarding instructions to customer
          const forwardingInstructions = generateWhatsAppForwardingInstructions(whatsappReceiptMessage, recipientPhoneNumber);
          
          // Show instructions to customer
          toast({
            title: "📱 Unknown Recipient Number",
            description: `Receipt sent to admin. Please forward receipt to ${recipientPhoneNumber} via WhatsApp`,
            duration: 8000
          });

          // Auto-open WhatsApp with forwarding instructions
          const encodedInstructions = encodeURIComponent(forwardingInstructions);
          const whatsappUrl = `https://wa.me/?text=${encodedInstructions}`;
          
          setTimeout(() => {
            window.open(whatsappUrl, '_blank');
          }, 2000);

        } else {
          // Recipient phone is saved - send receipts normally
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

          // Send receipts to both parties ONLY after payment completion
          console.log('📧 Sending dual receipts after payment completion...');
          await Promise.all([
            sendReceiptToCustomer(senderReceiptData, 'sender'),
            sendReceiptToCustomer(recipientReceiptData, 'recipient')
          ]);

          toast({
            title: "📱 Dual Receipts Sent",
            description: `WhatsApp & Email receipts delivered to both you and ${recipientData.name}`,
          });
        }

      } else {
        // Self-purchase
        const receiptData = {
          ...baseReceiptData,
          recipientPhone: customerPhone,
          recipientName: 'Self',
          cashbackEarned: profitSharing.customerCashback || 0,
          purchaseType: 'self' as const
        };

        console.log('📧 Sending receipt after payment completion...');
        await sendReceiptToCustomer(receiptData, 'customer');

        toast({
          title: "📧 Receipts Delivered",
          description: customerEmail ? `WhatsApp & Email receipts sent to ${customerEmail}` : "WhatsApp receipt delivered successfully",
        });
      }

    } catch (error) {
      console.error('❌ Error in autoGenerateAndSendReceipts:', error);
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
        console.error(`❌ Error sending receipt to ${recipientType}:`, error);
        return;
      }

      console.log(`✅ Receipt sent successfully to ${recipientType}:`, data);

      // Auto-redirect to WhatsApp with receipt ONLY after successful payment and for customer
      if (data?.whatsappUrl && recipientType === 'customer') {
        setTimeout(() => {
          window.open(data.whatsappUrl, '_blank');
        }, 2000);
      }

    } catch (error) {
      console.error(`❌ Error sending receipt to ${recipientType}:`, error);
    }
  };

  return {
    autoGenerateAndSendReceipts,
    generateTransactionId,
    getCustomerDisplayName
  };
};
