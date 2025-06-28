
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
  const { generateWhatsAppForwardingInstructions, autoRedirectToSmartDeals } = useWhatsAppForwarding();
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
        
        // FIXED: Always treat numbers as unknown to ensure proper receipt handling
        console.log('📧 Treating all recipient numbers as unknown - sending to admin and providing forwarding instructions');

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

        // SAVE RECEIPT TO USER PROFILE
        await saveReceipt(adminReceiptData, currentUserInfo.userType, currentUserInfo.userId);

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
          title: "📱 Receipt Ready to Forward",
          description: `WhatsApp will open with forwarding instructions for ${recipientPhoneNumber}`,
          duration: 6000
        });

        // Auto-open WhatsApp with forwarding instructions
        const encodedInstructions = encodeURIComponent(forwardingInstructions);
        const whatsappUrl = `https://wa.me/?text=${encodedInstructions}`;
        
        setTimeout(() => {
          window.open(whatsappUrl, '_blank');
        }, 2000);

        // Auto-redirect to smart deals after WhatsApp process
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

  return {
    autoGenerateAndSendReceipts,
    generateTransactionId,
    getCustomerDisplayName
  };
};
