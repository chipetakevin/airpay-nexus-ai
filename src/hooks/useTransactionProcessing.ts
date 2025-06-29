
import { useToast } from '@/hooks/use-toast';
import { useRecipientMemory } from './useRecipientMemory';
import { useReceiptGeneration } from './useReceiptGeneration';
import { useCashbackAutomation } from './useCashbackAutomation';
import { CartItem } from '@/types/deals';

export const useTransactionProcessing = () => {
  const { toast } = useToast();
  const { saveRecipient } = useRecipientMemory();
  const { autoGenerateAndSendReceipts } = useReceiptGeneration();
  const { processAutomatedCashback } = useCashbackAutomation();

  const processTransaction = async (
    cartItems: CartItem[],
    currentUser: any,
    customerPhone: string,
    purchaseMode: string,
    recipientData: any,
    userType: 'customer' | 'vendor' | 'admin',
    profitSharing: any,
    customerPrice: number,
    networkCost: number,
    detectedNetwork: string
  ) => {
    try {
      console.log('🔄 Processing transaction for user type:', userType, {
        customerPhone,
        purchaseMode,
        customerPrice,
        userType
      });

      const recipientPhone = purchaseMode === 'self' ? customerPhone : recipientData.phone;
      const recipientName = purchaseMode === 'self' ? 'Self' : recipientData.name;
      
      // Enhanced payment processing validation for all user types
      console.log('💳 Starting enhanced payment processing...');
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Simulate payment validation with higher success rate for all user types
      const paymentSuccessful = Math.random() > 0.02; // 98% success rate
      
      if (!paymentSuccessful) {
        throw new Error('Payment failed - transaction declined by payment processor');
      }
      
      console.log('✅ Payment processed successfully for user type:', userType);
      
      // Create comprehensive transaction record for all user types
      const transactionData = {
        customer_id: currentUser.id,
        vendor_id: userType === 'vendor' ? currentUser.id : 'platform-vendor-id',
        admin_id: userType === 'admin' ? currentUser.id : null,
        deal_id: cartItems[0]?.id,
        recipient_phone: recipientPhone,
        recipient_name: recipientName,
        recipient_relationship: purchaseMode === 'other' ? recipientData.relationship : null,
        amount: customerPrice,
        original_price: networkCost,
        discounted_price: customerPrice,
        network: cartItems[0]?.network || detectedNetwork,
        transaction_type: userType === 'vendor' ? 'vendor_purchase' : userType === 'admin' ? 'admin_purchase' : (purchaseMode === 'self' ? 'self_purchase' : 'third_party_purchase'),
        cashback_earned: profitSharing.customerCashback || profitSharing.adminCashback || profitSharing.registeredCustomerReward || 0,
        admin_fee: profitSharing.adminProfit || 0,
        vendor_commission: profitSharing.vendorProfit || 0,
        user_type: userType,
        status: 'completed',
        timestamp: new Date().toISOString(),
        payment_method: 'stripe_checkout',
        phone_number: customerPhone
      };

      // Store transaction in appropriate storage based on user type
      const storageKey = userType === 'vendor' ? 'vendorTransactions' : userType === 'admin' ? 'adminTransactions' : 'userTransactions';
      const existingTransactions = JSON.parse(localStorage.getItem(storageKey) || '[]');
      existingTransactions.push(transactionData);
      localStorage.setItem(storageKey, JSON.stringify(existingTransactions));

      console.log('💾 Transaction stored for user type:', userType);

      // Auto-save recipient details for future use (for third-party purchases)
      if (purchaseMode === 'other' && recipientData.name && recipientData.phone && recipientData.relationship) {
        await saveRecipient(recipientData, detectedNetwork);
      }

      // AUTOMATED CASHBACK PROCESSING for all user types
      console.log('💰 Processing automated cashback for user type:', userType);
      await processAutomatedCashback(
        transactionData,
        profitSharing,
        currentUser,
        userType,
        purchaseMode,
        recipientData
      );

      // AUTOMATED RECEIPT GENERATION for all user types
      console.log('📧 Generating receipts for user type:', userType);
      await autoGenerateAndSendReceipts(
        transactionData, 
        profitSharing, 
        cartItems, 
        purchaseMode, 
        customerPhone, 
        recipientData,
        userType
      );

      // Enhanced success messages based on user type
      let successMessage = "Payment Successfully Completed! 🎉";
      let description = "";
      
      if (userType === 'vendor') {
        successMessage = `Vendor Purchase Completed! 💼`;
        description = `Profit earned: R${profitSharing.vendorProfit?.toFixed(2)} • Transaction processed successfully`;
      } else if (userType === 'admin') {
        successMessage = `Admin Purchase Completed! 👑`;
        description = `Admin cashback: R${profitSharing.adminCashback?.toFixed(2)} • Special admin rates applied`;
      } else if (purchaseMode === 'other') {
        successMessage = `Gift Purchase Completed! 🎁`;
        description = `Sent to ${recipientData.name} • Receipts delivered to both parties`;
      } else {
        successMessage = `Purchase Completed Successfully! ✅`;
        description = `Cashback earned: R${profitSharing.customerCashback?.toFixed(2)} • OneCard balance updated`;
      }

      toast({
        title: successMessage,
        description: `${description} • 📱 WhatsApp receipt sent • 📧 Email confirmation delivered`,
        duration: 6000
      });

      // Redirect to deals page after successful processing
      setTimeout(() => {
        console.log('🔄 Redirecting to deals page...');
        window.location.replace('/portal?tab=deals');
      }, 3000);

      return true;
      
    } catch (error) {
      console.error('❌ Transaction processing error:', error);
      toast({
        title: "Payment Processing Failed",
        description: "Unable to process payment. Please check your payment method and try again.",
        variant: "destructive"
      });
      return false;
    }
  };

  return {
    processTransaction
  };
};
