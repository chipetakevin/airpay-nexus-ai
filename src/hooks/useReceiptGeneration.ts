import { useToast } from '@/hooks/use-toast';
import { useReceiptStorage } from './useReceiptStorage';
import { useReceiptFormatter } from './receipt/useReceiptFormatter';
import { useUserInfo } from './receipt/useUserInfo';
import { useWhatsAppForwarding } from './receipt/useWhatsAppForwarding';
import { useReceiptSender } from './receipt/useReceiptSender';

export const useReceiptGeneration = () => {
  const { toast } = useToast();
  const { saveReceipt } = useReceiptStorage();
  const { generateTransactionId, capitalizeWords, getCustomerDisplayName } = useReceiptFormatter();
  const { getCurrentUserInfo } = useUserInfo();
  const { generateWhatsAppForwardingInstructions, handleIntelligentWhatsAppRedirect, autoRedirectToSmartDeals } = useWhatsAppForwarding();
  const { sendReceiptToCustomer } = useReceiptSender();

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
      const currentUserInfo = getCurrentUserInfo();
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
        
        // ENHANCED: Check if number is in user's contacts before treating as unknown
        const isKnownNumber = await checkIfNumberInContacts(recipientPhoneNumber);
        
        if (isKnownNumber) {
          console.log('📱 Number found in contacts - sending direct receipt');
          
          // Send receipt directly to known recipient
          const recipientReceiptData = {
            ...baseReceiptData,
            customerEmail: '', // No email for recipient
            recipientPhone: recipientPhoneNumber,
            recipientName: capitalizeWords(recipientData.name),
            cashbackEarned: 0,
            purchaseType: 'recipient' as const
          };

          await sendReceiptToCustomer(recipientReceiptData, 'recipient');
          
          // Also send confirmation to sender
          const senderReceiptData = {
            ...baseReceiptData,
            recipientPhone: recipientPhoneNumber,
            recipientName: capitalizeWords(recipientData.name),
            cashbackEarned: profitSharing.registeredCustomerReward || 0,
            purchaseType: 'sender' as const
          };

          await sendReceiptToCustomer(senderReceiptData, 'customer');
          
          toast({
            title: "📧 Receipts Delivered",
            description: `Receipt sent to ${recipientPhoneNumber} and confirmation sent to you`,
            duration: 4000
          });
          
        } else {
          console.log('📧 Unknown number - using intelligent WhatsApp redirect');

          // Send receipt to admin for record keeping
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

          // Generate WhatsApp receipt message for forwarding
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

          // INTELLIGENT WHATSAPP REDIRECT - Redirect to sender's number for manual forwarding
          handleIntelligentWhatsAppRedirect(whatsappReceiptMessage, recipientPhoneNumber, customerPhone);
        }

        // SAVE RECEIPT TO USER PROFILE
        await saveReceipt(baseReceiptData, currentUserInfo.userType, currentUserInfo.userId);

        // Auto-redirect to smart deals after process
        setTimeout(() => {
          autoRedirectToSmartDeals();
        }, 8000);

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

        // SAVE RECEIPT TO USER PROFILE
        await saveReceipt(receiptData, currentUserInfo.userType, currentUserInfo.userId);

        toast({
          title: "📧 Receipts Delivered",
          description: customerEmail ? `WhatsApp & Email receipts sent to ${customerEmail}` : "WhatsApp receipt delivered successfully",
        });

        // Auto-redirect to smart deals after self-purchase
        setTimeout(() => {
          autoRedirectToSmartDeals();
        }, 4000);
      }

    } catch (error) {
      console.error('❌ Error in autoGenerateAndSendReceipts:', error);
      toast({
        title: "Receipt Error",
        description: "Payment successful but receipt generation failed. Check transaction history.",
        variant: "destructive"
      });

      // Still redirect to smart deals even if receipt fails
      setTimeout(() => {
        autoRedirectToSmartDeals();
      }, 3000);
    }
  };

  // Helper function to check if number is in user's contacts
  const checkIfNumberInContacts = async (phoneNumber: string): Promise<boolean> => {
    try {
      // Check if browser supports contacts API
      if ('contacts' in navigator && 'ContactsManager' in window) {
        // This is a future enhancement - for now, we'll use a simpler approach
        // In a real implementation, this would check the user's contacts
      }
      
      // For now, we'll check if the number is saved in our recipient memory
      const savedRecipients = JSON.parse(localStorage.getItem('recipientMemory') || '[]');
      return savedRecipients.some((recipient: any) => recipient.phone === phoneNumber);
    } catch (error) {
      console.error('Error checking contacts:', error);
      return false;
    }
  };

  return {
    autoGenerateAndSendReceipts,
    generateTransactionId,
    getCustomerDisplayName
  };
};
