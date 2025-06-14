
import { useToast } from '@/hooks/use-toast';
import { useRecipientMemory } from './useRecipientMemory';
import { useReceiptGeneration } from './useReceiptGeneration';
import { CartItem } from '@/types/deals';

export const useTransactionProcessing = () => {
  const { toast } = useToast();
  const { saveRecipient } = useRecipientMemory();
  const { autoGenerateAndSendReceipts } = useReceiptGeneration();

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
      
      // Simulate transaction processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create transaction record
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
        status: 'completed',
        timestamp: new Date().toISOString()
      };

      // Store transaction locally
      const existingTransactions = JSON.parse(localStorage.getItem('userTransactions') || '[]');
      existingTransactions.push(transactionData);
      localStorage.setItem('userTransactions', JSON.stringify(existingTransactions));

      // Auto-save recipient details for future use
      if (purchaseMode === 'other' && recipientData.name && recipientData.phone && recipientData.relationship) {
        await saveRecipient(recipientData, detectedNetwork);
      }

      // Auto-generate and send receipts to WhatsApp and email
      await autoGenerateAndSendReceipts(transactionData, profitSharing, cartItems, purchaseMode, customerPhone, recipientData);

      let successMessage = "Purchase Successful! 🎉";
      if (isVendor) {
        successMessage = `Vendor purchase completed! R${profitSharing.vendorProfit?.toFixed(2)} profit earned!`;
      } else if (purchaseMode === 'other') {
        successMessage = `Gift purchase completed! Recipient details saved for future payments.`;
      } else {
        successMessage = `Purchase completed! R${profitSharing.customerCashback?.toFixed(2)} cashback earned!`;
      }

      toast({
        title: successMessage,
        description: "Receipts auto-sent to WhatsApp & Email. Redirecting to Smart Deals..."
      });

      // Redirect to portal with onecard tab and deals subtab after 3 seconds
      setTimeout(() => {
        window.location.href = '/portal?tab=onecard#deals';
      }, 3000);

      return true;
      
    } catch (error) {
      console.error('Purchase error:', error);
      toast({
        title: "Purchase Failed",
        description: "Unable to process purchase. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  };

  return {
    processTransaction
  };
};
