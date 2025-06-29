
import { useToast } from '@/hooks/use-toast';
import { updateCashbackBalances, CashbackUpdate } from '@/services/cashbackService';

export const useCashbackAutomation = () => {
  const { toast } = useToast();

  const processAutomatedCashback = async (
    transactionData: any,
    profitSharing: any,
    currentUser: any,
    userType: 'customer' | 'vendor' | 'admin',
    purchaseMode: string,
    recipientData: any
  ) => {
    try {
      console.log('🔄 Starting automated cashback processing for all user types:', {
        transactionData,
        profitSharing,
        currentUser,
        userType,
        purchaseMode,
        recipientData
      });

      const userIdentifier = currentUser?.cardNumber || currentUser?.id || currentUser?.registeredPhone || currentUser?.email;
      
      const cashbackUpdate: CashbackUpdate = {
        customerCardNumber: userIdentifier,
        transactionId: transactionData.timestamp || Date.now().toString(),
        userType
      };

      // Universal cashback processing for all user types
      if (userType === 'vendor') {
        // Vendor purchase - vendor gets profit, customer gets cashback
        cashbackUpdate.vendorProfit = profitSharing.vendorProfit || 0;
        cashbackUpdate.customerCashback = profitSharing.customerCashback || 0;
        cashbackUpdate.vendorId = currentUser?.vendorId || currentUser?.id;
      } else if (userType === 'admin') {
        // Admin purchase - admin gets special rates
        cashbackUpdate.customerCashback = profitSharing.adminCashback || profitSharing.customerCashback || 0;
        cashbackUpdate.adminBonus = profitSharing.adminBonus || 0;
      } else {
        // Customer purchase logic
        if (purchaseMode === 'self') {
          cashbackUpdate.customerCashback = profitSharing.customerCashback || 0;
        } else {
          cashbackUpdate.customerCashback = profitSharing.registeredCustomerReward || 0;
          cashbackUpdate.recipientPhone = recipientData.phone;
          cashbackUpdate.recipientReward = profitSharing.unregisteredRecipientReward || 0;
        }
      }

      console.log('💰 Universal cashback update details:', cashbackUpdate);

      // Process the cashback updates for all user types
      const result = await updateCashbackBalances(cashbackUpdate);
      
      if (result.success) {
        // Show success notification with user-type specific details
        let message = 'Cashback rewards processed successfully!';
        
        if (userType === 'vendor') {
          message = `Vendor profit: R${cashbackUpdate.vendorProfit?.toFixed(2)} + Customer cashback: R${cashbackUpdate.customerCashback?.toFixed(2)}`;
        } else if (userType === 'admin') {
          message = `Admin cashback: R${cashbackUpdate.customerCashback?.toFixed(2)} + Admin bonus: R${(cashbackUpdate.adminBonus || 0).toFixed(2)}`;
        } else if (purchaseMode === 'self') {
          message = `Your cashback: R${cashbackUpdate.customerCashback?.toFixed(2)} added to OneCard balance`;
        } else {
          message = `Your reward: R${cashbackUpdate.customerCashback?.toFixed(2)} + Recipient reward: R${cashbackUpdate.recipientReward?.toFixed(2)} (pending)`;
        }

        toast({
          title: "💰 Cashback Processed",
          description: message,
        });

        console.log('✅ Universal cashback processing completed:', result);
        
        return result;
        
      } else {
        console.error('❌ Cashback processing failed:', result);
        toast({
          title: "Cashback Processing Warning",
          description: "Transaction successful but cashback update failed. Contact support if balance doesn't reflect.",
          variant: "destructive"
        });
        return result;
      }
      
    } catch (error) {
      console.error('❌ Error in automated cashback processing:', error);
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
