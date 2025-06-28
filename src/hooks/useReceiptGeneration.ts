import { useToast } from '@/hooks/use-toast';
import { useReceiptStorage } from './useReceiptStorage';
import { useReceiptFormatter } from './receipt/useReceiptFormatter';
import { useUserInfo } from './receipt/useUserInfo';
import { useWhatsAppForwarding } from './receipt/useWhatsAppForwarding';
import { useReceiptSender } from './receipt/useReceiptSender';
import { useComprehensiveReceipts } from './useComprehensiveReceipts';

export const useReceiptGeneration = () => {
  const { toast } = useToast();
  const { saveReceipt } = useReceiptStorage();
  const { generateTransactionId, capitalizeWords, getCustomerDisplayName } = useReceiptFormatter();
  const { getCurrentUserInfo } = useUserInfo();
  const { generateWhatsAppForwardingInstructions, handleIntelligentWhatsAppRedirect, autoRedirectToSmartDeals } = useWhatsAppForwarding();
  const { sendReceiptToCustomer, sendReceiptWithFallback } = useReceiptSender();
  const { createComprehensiveReceipt, getCustomerInfo } = useComprehensiveReceipts();

  const autoGenerateAndSendReceipts = async (transactionData: any, profitSharing: any, cartItems: any[], purchaseMode: string, customerPhone: string, recipientData: any) => {
    try {
      // CRITICAL: Only generate receipts if transaction status is 'completed'
      if (transactionData.status !== 'completed') {
        console.log('⚠️ Receipt generation skipped - transaction not completed');
        return;
      }

      console.log('✅ Transaction completed - generating comprehensive receipts...');
      
      const customerInfo = getCustomerInfo();
      const currentUserInfo = getCurrentUserInfo();
      
      // Get vendor info if applicable
      let vendorInfo = null;
      if (currentUserInfo.userType === 'vendor') {
        const vendorData = localStorage.getItem('onecardVendor');
        if (vendorData) {
          vendorInfo = JSON.parse(vendorData);
        }
      }

      // Create comprehensive receipt with enhanced data
      const enhancedTransactionData = {
        ...transactionData,
        transactionId: generateTransactionId(transactionData.timestamp),
        customer_phone: customerPhone
      };

      console.log('📧 Generating comprehensive receipt...');
      const receiptResult = await createComprehensiveReceipt(
        enhancedTransactionData,
        customerInfo,
        cartItems,
        profitSharing,
        'OneCard Mobile Payment',
        vendorInfo
      );

      if (receiptResult?.success) {
        // Save receipt to user profile
        const baseReceiptData = {
          customerName: customerInfo.name,
          customerEmail: customerInfo.email,
          customerPhone: customerPhone,
          transactionId: enhancedTransactionData.transactionId,
          items: cartItems.map(item => ({
            network: item.network,
            amount: item.amount,
            price: item.discountedPrice,
            type: item.dealType || 'airtime'
          })),
          total: transactionData.amount,
          timestamp: transactionData.timestamp,
          recipientPhone: purchaseMode === 'self' ? customerPhone : recipientData.phone,
          recipientName: purchaseMode === 'self' ? 'Self' : capitalizeWords(recipientData.name),
          cashbackEarned: profitSharing.registeredCustomerReward || profitSharing.customerCashback || 0,
          purchaseType: purchaseMode === 'self' ? 'self' : 'sender'
        };

        await saveReceipt(baseReceiptData, currentUserInfo.userType, currentUserInfo.userId);

        toast({
          title: "📱 Professional Receipt Delivered!",
          description: "Comprehensive receipt sent via WhatsApp with smart delivery system",
          duration: 5000
        });

        // Auto-redirect to smart deals after successful receipt delivery
        setTimeout(() => {
          autoRedirectToSmartDeals();
        }, 6000);
      } else {
        // Fallback to enhanced receipt system
        console.log('⚠️ Comprehensive receipt failed, using enhanced fallback system...');
        await enhancedFallbackReceipt(transactionData, profitSharing, cartItems, purchaseMode, customerPhone, recipientData);
      }

    } catch (error) {
      console.error('❌ Error in autoGenerateAndSendReceipts:', error);
      
      // Fallback to enhanced receipt system
      console.log('⚠️ Using enhanced fallback receipt system due to error...');
      await enhancedFallbackReceipt(transactionData, profitSharing, cartItems, purchaseMode, customerPhone, recipientData);
    }
  };

  const enhancedFallbackReceipt = async (transactionData: any, profitSharing: any, cartItems: any[], purchaseMode: string, customerPhone: string, recipientData: any) => {
    try {
      const customerName = getCustomerDisplayName();
      const currentUserInfo = getCurrentUserInfo();
      
      const baseReceiptData = {
        customerName: customerName,
        customerEmail: getCustomerInfo().email,
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
        
        // Use enhanced sending with fallback
        await sendReceiptWithFallback(
          {
            ...baseReceiptData,
            recipientPhone: recipientPhoneNumber,
            recipientName: capitalizeWords(recipientData.name),
            cashbackEarned: 0,
            purchaseType: 'recipient'
          },
          recipientPhoneNumber,
          customerPhone
        );
        
        toast({
          title: "📧 Smart Receipt Delivery",
          description: `Receipt sent to ${recipientPhoneNumber} with backup to you`,
          duration: 4000
        });
        
      } else {
        // Self-purchase enhanced receipt
        const receiptData = {
          ...baseReceiptData,
          recipientPhone: customerPhone,
          recipientName: 'Self',
          cashbackEarned: profitSharing.customerCashback || 0,
          purchaseType: 'self' as const
        };

        await sendReceiptToCustomer(receiptData, 'customer');
        
        toast({
          title: "📧 Receipt Delivered",
          description: "WhatsApp receipt sent with smart delivery",
        });
      }

      // Save receipt to user profile
      await saveReceipt(baseReceiptData, currentUserInfo.userType, currentUserInfo.userId);

      // Auto-redirect to smart deals
      setTimeout(() => {
        autoRedirectToSmartDeals();
      }, 4000);

    } catch (error) {
      console.error('❌ Enhanced fallback receipt system failed:', error);
      toast({
        title: "Receipt System Error",
        description: "Payment successful but receipt delivery failed. Check transaction history.",
        variant: "destructive"
      });

      // Still redirect even if receipt fails
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
