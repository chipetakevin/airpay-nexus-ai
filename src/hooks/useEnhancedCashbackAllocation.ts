
import { useToast } from '@/hooks/use-toast';

interface CashbackAllocation {
  customerReward: number;
  vendorProfit: number;
  adminFee: number;
  totalAmount: number;
}

interface UserProfile {
  userType: 'customer' | 'vendor' | 'admin';
  cardNumber?: string;
  vendorId?: string;
  isRegistered: boolean;
  privileges: string[];
}

export const useEnhancedCashbackAllocation = () => {
  const { toast } = useToast();

  const calculateCashbackAllocation = (
    purchaseAmount: number,
    userProfile: UserProfile,
    purchaseMode: 'self' | 'other',
    isRecipientRegistered: boolean = false
  ): CashbackAllocation => {
    
    let customerReward = 0;
    let vendorProfit = 0;
    let adminFee = 0;

    // Base cashback rates
    const CUSTOMER_CASHBACK_RATE = 0.025; // 2.5%
    const VENDOR_PROFIT_RATE = 0.08; // 8%
    const ADMIN_FEE_RATE = 0.02; // 2%
    const UNREGISTERED_REWARD_RATE = 0.015; // 1.5%

    // Calculate based on user type and purchase mode
    if (userProfile.userType === 'vendor') {
      // Vendor making purchase
      vendorProfit = purchaseAmount * VENDOR_PROFIT_RATE;
      customerReward = purchaseAmount * CUSTOMER_CASHBACK_RATE;
      adminFee = purchaseAmount * ADMIN_FEE_RATE;
    } else if (userProfile.userType === 'customer') {
      if (purchaseMode === 'self') {
        // Customer buying for themselves
        customerReward = purchaseAmount * CUSTOMER_CASHBACK_RATE;
        adminFee = purchaseAmount * ADMIN_FEE_RATE;
      } else {
        // Customer buying for others
        customerReward = purchaseAmount * CUSTOMER_CASHBACK_RATE;
        adminFee = purchaseAmount * ADMIN_FEE_RATE;
        
        // Additional reward for recipient if they're registered
        if (isRecipientRegistered) {
          customerReward += purchaseAmount * UNREGISTERED_REWARD_RATE;
        }
      }
    } else if (userProfile.userType === 'admin') {
      // Admin purchases get full rewards
      customerReward = purchaseAmount * CUSTOMER_CASHBACK_RATE * 1.5; // 3.75%
      adminFee = 0; // No admin fee for admin purchases
    }

    return {
      customerReward: Math.round(customerReward * 100) / 100,
      vendorProfit: Math.round(vendorProfit * 100) / 100,
      adminFee: Math.round(adminFee * 100) / 100,
      totalAmount: purchaseAmount
    };
  };

  const allocateCashbackBalances = async (
    allocation: CashbackAllocation,
    userProfile: UserProfile,
    transactionId: string
  ) => {
    try {
      // Update customer balance
      if (allocation.customerReward > 0 && userProfile.cardNumber) {
        const storedUser = localStorage.getItem('onecardUser');
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          userData.cashbackBalance = (userData.cashbackBalance || 0) + allocation.customerReward;
          userData.totalEarned = (userData.totalEarned || 0) + allocation.customerReward;
          localStorage.setItem('onecardUser', JSON.stringify(userData));
        }
      }

      // Update vendor balance
      if (allocation.vendorProfit > 0 && userProfile.vendorId) {
        const storedVendor = localStorage.getItem('onecardVendor');
        if (storedVendor) {
          const vendorData = JSON.parse(storedVendor);
          vendorData.onecardBalance = (vendorData.onecardBalance || 0) + allocation.vendorProfit;
          vendorData.totalEarned = (vendorData.totalEarned || 0) + allocation.vendorProfit;
          localStorage.setItem('onecardVendor', JSON.stringify(vendorData));
        }
      }

      // Log admin fee
      if (allocation.adminFee > 0) {
        const adminFees = JSON.parse(localStorage.getItem('adminFees') || '[]');
        adminFees.push({
          transactionId,
          amount: allocation.adminFee,
          timestamp: new Date().toISOString()
        });
        localStorage.setItem('adminFees', JSON.stringify(adminFees));
      }

      toast({
        title: "💰 Cashback Allocated Successfully",
        description: `Customer: R${allocation.customerReward.toFixed(2)} | Vendor: R${allocation.vendorProfit.toFixed(2)}`,
        duration: 3000
      });

      return { success: true, allocation };
    } catch (error) {
      console.error('Error allocating cashback:', error);
      toast({
        title: "Cashback Allocation Error",
        description: "Failed to allocate cashback rewards",
        variant: "destructive"
      });
      return { success: false, error };
    }
  };

  return {
    calculateCashbackAllocation,
    allocateCashbackBalances
  };
};
