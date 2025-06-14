
import { useToast } from '@/hooks/use-toast';
import { updateCashbackBalances, CashbackUpdate } from '@/services/cashbackService';

export const useCashbackAutomation = () => {
  const { toast } = useToast();

  const processAutomatedCashback = async (
    transactionData: any,
    profitSharing: any,
    currentUser: any,
    isVendor: boolean,
    purchaseMode: string,
    recipientData: any
  ) => {
    try {
      const customerCardNumber = currentUser?.cardNumber || currentUser?.id;
      const vendorId = isVendor ? (currentUser?.vendorId || currentUser?.id) : null;
      
      const cashbackUpdate: CashbackUpdate = {
        customerCardNumber,
        transactionId: transactionData.timestamp || Date.now().toString()
      };

      // Determine cashback based on purchase type and user type
      if (isVendor) {
        // Vendor purchase - vendor gets profit, customer gets cashback
        cashbackUpdate.vendorProfit = profitSharing.vendorProfit || 0;
        cashbackUpdate.customerCashback = profitSharing.customerCashback || 0;
        cashbackUpdate.vendorId = vendorId;
      } else if (purchaseMode === 'self') {
        // Customer self-purchase - customer gets cashback
        cashbackUpdate.customerCashback = profitSharing.customerCashback || 0;
      } else {
        // Customer third-party purchase - both customer and recipient get rewards
        cashbackUpdate.customerCashback = profitSharing.registeredCustomerReward || 0;
        cashbackUpdate.recipientPhone = recipientData.phone;
        cashbackUpdate.recipientReward = profitSharing.unregisteredRecipientReward || 0;
      }

      // Process the cashback updates
      const result = await updateCashbackBalances(cashbackUpdate);
      
      if (result.success) {
        // Show success notification with details
        let message = 'Cashback rewards processed successfully!';
        
        if (isVendor) {
          message = `Vendor profit: R${cashbackUpdate.vendorProfit?.toFixed(2)} + Customer cashback: R${cashbackUpdate.customerCashback?.toFixed(2)}`;
        } else if (purchaseMode === 'self') {
          message = `Your cashback: R${cashbackUpdate.customerCashback?.toFixed(2)} added to OneCard balance`;
        } else {
          message = `Your reward: R${cashbackUpdate.customerCashback?.toFixed(2)} + Recipient reward: R${cashbackUpdate.recipientReward?.toFixed(2)} (pending)`;
        }

        toast({
          title: "💰 Cashback Processed",
          description: message,
        });

        console.log('Automated cashback processing completed:', result);
        return result;
        
      } else {
        console.error('Cashback processing failed:', result);
        toast({
          title: "Cashback Processing Warning",
          description: "Transaction successful but cashback update failed. Contact support if balance doesn't reflect.",
          variant: "destructive"
        });
        return result;
      }
      
    } catch (error) {
      console.error('Error in automated cashback processing:', error);
      toast({
        title: "Cashback Error",
        description: "Transaction successful but cashback automation failed.",
        variant: "destructive"
      });
      return { success: false, error: error.message };
    }
  };

  return {
    processAutomatedCashback
  };
};
