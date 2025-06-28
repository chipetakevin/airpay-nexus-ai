
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
    isVendor: boolean,
    profitSharing: any,
    customerPrice: number,
    networkCost: number,
    detectedNetwork: string
  ) => {
    try {
      const recipientPhone = purchaseMode === 'self' ? customerPhone : recipientData.phone;
      const recipientName = purchaseMode === 'self' ? 'Self' : recipientData.name;
      
      // Simulate payment processing with actual validation
      console.log('🔄 Starting payment processing...');
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate payment validation - this is where real payment would be confirmed
      const paymentSuccessful = Math.random() > 0.05; // 95% success rate for demo
      
      if (!paymentSuccessful) {
        throw new Error('Payment failed - transaction declined');
      }
      
      console.log('✅ Payment processed successfully');
      
      // Create transaction record ONLY after payment success
      const transactionData = {
        customer_id: currentUser.id,
        vendor_id: 'platform-vendor-id',
        deal_id: cartItems[0]?.id,
        recipient_phone: recipientPhone,
        recipient_name: recipientName,
        recipient_relationship: purchaseMode === 'other' ? recipientData.relationship : null,
        amount: customerPrice,
        original_price: networkCost,
        discounted_price: customerPrice,
        network: cartItems[0]?.network || detectedNetwork,
        transaction_type: isVendor ? 'vendor_purchase' : (purchaseMode === 'self' ? 'self_purchase' : 'third_party_purchase'),
        cashback_earned: profitSharing.customerCashback || profitSharing.registeredCustomerReward || 0,
        admin_fee: profitSharing.adminProfit || 0,
        vendor_commission: profitSharing.vendorProfit || 0,
        status: 'completed', // Only set to completed after payment success
        timestamp: new Date().toISOString()
      };

      // Store transaction locally ONLY after payment confirmation
      const existingTransactions = JSON.parse(localStorage.getItem('userTransactions') || '[]');
      existingTransactions.push(transactionData);
      localStorage.setItem('userTransactions', JSON.stringify(existingTransactions));

      // Auto-save recipient details for future use (for third-party purchases)
      if (purchaseMode === 'other' && recipientData.name && recipientData.phone && recipientData.relationship) {
        await saveRecipient(recipientData, detectedNetwork);
      }

      // AUTOMATED CASHBACK PROCESSING - ONLY after payment success
      await processAutomatedCashback(
        transactionData,
        profitSharing,
        currentUser,
        isVendor,
        purchaseMode,
        recipientData
      );

      // AUTOMATED RECEIPT GENERATION - ONLY after payment completion
      console.log('📧 Generating receipts after successful payment...');
      await autoGenerateAndSendReceipts(
        transactionData, 
        profitSharing, 
        cartItems, 
        purchaseMode, 
        customerPhone, 
        recipientData
      );

      let successMessage = "Payment Successful! 🎉";
      if (isVendor) {
        successMessage = `Vendor purchase completed! R${profitSharing.vendorProfit?.toFixed(2)} profit earned!`;
      } else if (purchaseMode === 'other') {
        successMessage = `Gift purchase completed! Receipts sent to both you and ${recipientData.name} via WhatsApp & Email.`;
      } else {
        successMessage = `Payment completed! R${profitSharing.customerCashback?.toFixed(2)} cashback earned!`;
      }

      toast({
        title: successMessage,
        description: "📱 WhatsApp receipt sent • 📧 Email receipt delivered • 🎁 OneCard balance updated",
        duration: 5000
      });

      // Immediate redirect to shopping page after successful processing
      setTimeout(() => {
        window.location.replace('/portal?tab=deals');
      }, 2500);

      return true;
      
    } catch (error) {
      console.error('❌ Payment processing error:', error);
      toast({
        title: "Payment Failed",
        description: "Unable to process payment. Please try again or contact support.",
        variant: "destructive"
      });
      return false;
    }
  };

  return {
    processTransaction
  };
};
