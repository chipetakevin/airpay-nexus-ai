import { supabase } from '@/integrations/supabase/client';

export interface CashbackUpdate {
  customerCardNumber: string;
  customerCashback?: number;
  vendorId?: string;
  vendorProfit?: number;
  recipientPhone?: string;
  recipientReward?: number;
  transactionId: string;
  userType?: 'customer' | 'vendor' | 'admin';
  adminBonus?: number;
}

export const updateCashbackBalances = async (update: CashbackUpdate) => {
  try {
    console.log('🔄 Processing universal cashback allocation for all user types:', update);
    const updates = [];

    // Universal balance updates based on user type
    if (update.userType === 'customer') {
      if (update.customerCashback && update.customerCashback > 0) {
        const customerUpdate = await updateCustomerBalance(
          update.customerCardNumber, 
          update.customerCashback,
          update.transactionId
        );
        updates.push(customerUpdate);
      }
    } else if (update.userType === 'vendor') {
      if (update.vendorProfit && update.vendorProfit > 0) {
        const vendorUpdate = await updateVendorBalance(
          update.vendorId || update.customerCardNumber, 
          update.vendorProfit,
          update.transactionId
        );
        updates.push(vendorUpdate);
      }
      
      // Vendor purchases also give customer cashback
      if (update.customerCashback && update.customerCashback > 0) {
        const customerUpdate = await updateCustomerBalance(
          update.customerCardNumber, 
          update.customerCashback,
          update.transactionId
        );
        updates.push(customerUpdate);
      }
    } else if (update.userType === 'admin') {
      if (update.customerCashback && update.customerCashback > 0) {
        const adminUpdate = await updateAdminBalance(
          update.customerCardNumber, 
          update.customerCashback,
          update.adminBonus || 0,
          update.transactionId
        );
        updates.push(adminUpdate);
      }
    }

    // Handle recipient reward for third-party purchases (all user types)
    if (update.recipientReward && update.recipientReward > 0 && update.recipientPhone) {
      const recipientUpdate = await handleRecipientReward(
        update.recipientPhone,
        update.recipientReward,
        update.transactionId
      );
      updates.push(recipientUpdate);
    }

    console.log('✅ Universal cashback allocation completed for all user types:', updates);

    return {
      success: true,
      updates,
      message: 'Universal cashback balances updated successfully for all user types'
    };

  } catch (error) {
    console.error('❌ Error in universal cashback allocation:', error);
    return {
      success: false,
      error: error.message,
      message: 'Failed to update universal cashback balances'
    };
  }
};

const updateCustomerBalance = async (cardNumber: string, cashbackAmount: number, transactionId: string) => {
  console.log('💰 Updating customer balance:', { cardNumber, cashbackAmount, transactionId });
  
  // Update both possible localStorage keys to ensure consistency
  const storedUser = localStorage.getItem('onecardUser');
  const storedCredentials = localStorage.getItem('userCredentials');
  
  if (storedUser) {
    const userData = JSON.parse(storedUser);
    
    // Enhanced allocation based on user privileges
    const userPrivileges = userData.privileges || [];
    let bonusMultiplier = 1;
    
    if (userPrivileges.includes('premium')) {
      bonusMultiplier = 1.5;
    } else if (userPrivileges.includes('vip')) {
      bonusMultiplier = 2;
    }
    
    const enhancedCashback = cashbackAmount * bonusMultiplier;
    const newCashbackBalance = (userData.cashbackBalance || 0) + enhancedCashback;
    const newTotalEarned = (userData.totalEarned || 0) + enhancedCashback;
    
    userData.cashbackBalance = newCashbackBalance;
    userData.totalEarned = newTotalEarned;
    userData.lastCashbackDate = new Date().toISOString();
    
    localStorage.setItem('onecardUser', JSON.stringify(userData));
    
    console.log(`✅ Customer ${cardNumber} enhanced cashback: +R${enhancedCashback.toFixed(2)} (Multiplier: ${bonusMultiplier}x, New balance: R${newCashbackBalance.toFixed(2)})`);
    
    return {
      type: 'customer',
      cardNumber,
      amount: enhancedCashback,
      newBalance: newCashbackBalance,
      bonusMultiplier,
      transactionId
    };
  }
  
  // Also update userCredentials if it exists
  if (storedCredentials) {
    const credentials = JSON.parse(storedCredentials);
    const enhancedCashback = cashbackAmount;
    const newCashbackBalance = (credentials.cashbackBalance || 0) + enhancedCashback;
    const newTotalEarned = (credentials.totalEarned || 0) + enhancedCashback;
    
    credentials.cashbackBalance = newCashbackBalance;
    credentials.totalEarned = newTotalEarned;
    credentials.lastCashbackDate = new Date().toISOString();
    
    localStorage.setItem('userCredentials', JSON.stringify(credentials));
    
    console.log(`✅ Customer credentials updated: +R${enhancedCashback.toFixed(2)}, New balance: R${newCashbackBalance.toFixed(2)}`);
    
    return {
      type: 'customer',
      cardNumber,
      amount: enhancedCashback,
      newBalance: newCashbackBalance,
      bonusMultiplier: 1,
      transactionId
    };
  }
  
  console.log('⚠️ No user data found in localStorage for cashback update');
  return null;
};

const updateVendorBalance = async (vendorId: string, profitAmount: number, transactionId: string) => {
  const storedVendor = localStorage.getItem('onecardVendor');
  if (storedVendor) {
    const vendorData = JSON.parse(storedVendor);
    
    // Enhanced vendor profit allocation
    const vendorTier = vendorData.tier || 'bronze';
    let commissionBonus = 0;
    
    switch (vendorTier) {
      case 'gold':
        commissionBonus = profitAmount * 0.1; // 10% bonus
        break;
      case 'silver':
        commissionBonus = profitAmount * 0.05; // 5% bonus
        break;
      default:
        commissionBonus = 0;
    }
    
    const totalProfit = profitAmount + commissionBonus;
    const newBalance = (vendorData.onecardBalance || 0) + totalProfit;
    const newTotalEarned = (vendorData.totalEarned || 0) + totalProfit;
    
    vendorData.onecardBalance = newBalance;
    vendorData.totalEarned = newTotalEarned;
    vendorData.lastCommissionDate = new Date().toISOString();
    localStorage.setItem('onecardVendor', JSON.stringify(vendorData));
    
    console.log(`✅ Vendor ${vendorId} enhanced profit: +R${totalProfit.toFixed(2)} (Tier: ${vendorTier}, Bonus: R${commissionBonus.toFixed(2)}, New balance: R${newBalance.toFixed(2)})`);
    
    return {
      type: 'vendor',
      vendorId,
      amount: totalProfit,
      newBalance,
      tier: vendorTier,
      bonus: commissionBonus,
      transactionId
    };
  }
  
  return null;
};

const handleRecipientReward = async (recipientPhone: string, rewardAmount: number, transactionId: string) => {
  // Enhanced recipient reward system
  const pendingRewards = JSON.parse(localStorage.getItem('pendingRecipientRewards') || '{}');
  
  if (!pendingRewards[recipientPhone]) {
    pendingRewards[recipientPhone] = {
      amount: 0,
      transactions: [],
      firstRewardDate: new Date().toISOString()
    };
  }
  
  pendingRewards[recipientPhone].amount += rewardAmount;
  pendingRewards[recipientPhone].transactions.push({
    transactionId,
    amount: rewardAmount,
    date: new Date().toISOString()
  });
  
  localStorage.setItem('pendingRecipientRewards', JSON.stringify(pendingRewards));
  
  console.log(`✅ Recipient ${recipientPhone} enhanced reward: +R${rewardAmount.toFixed(2)} (Total pending: R${pendingRewards[recipientPhone].amount.toFixed(2)})`);
  
  return {
    type: 'recipient',
    recipientPhone,
    amount: rewardAmount,
    pendingTotal: pendingRewards[recipientPhone].amount,
    transactionId,
    status: 'pending_registration'
  };
};

export const getPendingRecipientRewards = (phone: string): number => {
  const pendingRewards = JSON.parse(localStorage.getItem('pendingRecipientRewards') || '{}');
  return pendingRewards[phone]?.amount || 0;
};

export const claimRecipientRewards = async (phone: string, customerCardNumber: string) => {
  const pendingAmount = getPendingRecipientRewards(phone);
  if (pendingAmount > 0) {
    // Transfer pending rewards to new customer account
    await updateCustomerBalance(customerCardNumber, pendingAmount, `CLAIM_${Date.now()}`);
    
    // Clear pending rewards
    const pendingRewards = JSON.parse(localStorage.getItem('pendingRecipientRewards') || '{}');
    delete pendingRewards[phone];
    localStorage.setItem('pendingRecipientRewards', JSON.stringify(pendingRewards));
    
    return {
      success: true,
      claimedAmount: pendingAmount,
      message: `Claimed R${pendingAmount.toFixed(2)} in pending rewards`
    };
  }
  
  return {
    success: false,
    message: 'No pending rewards to claim'
  };
};

const updateAdminBalance = async (adminId: string, cashbackAmount: number, bonusAmount: number, transactionId: string) => {
  console.log('👑 Updating admin balance:', { adminId, cashbackAmount, bonusAmount, transactionId });
  
  const storedAdmin = localStorage.getItem('onecardAdmin');
  if (storedAdmin) {
    const adminData = JSON.parse(storedAdmin);
    
    // Admin gets enhanced cashback rates
    const adminMultiplier = 2.5; // 2.5x cashback for admins
    const enhancedCashback = cashbackAmount * adminMultiplier;
    const totalReward = enhancedCashback + bonusAmount;
    
    const newCashbackBalance = (adminData.cashbackBalance || 0) + totalReward;
    const newTotalEarned = (adminData.totalEarned || 0) + totalReward;
    
    adminData.cashbackBalance = newCashbackBalance;
    adminData.totalEarned = newTotalEarned;
    adminData.lastCashbackDate = new Date().toISOString();
    
    localStorage.setItem('onecardAdmin', JSON.stringify(adminData));
    
    console.log(`✅ Admin ${adminId} enhanced cashback: +R${totalReward.toFixed(2)} (Multiplier: ${adminMultiplier}x, New balance: R${newCashbackBalance.toFixed(2)})`);
    
    return {
      type: 'admin',
      adminId,
      amount: totalReward,
      newBalance: newCashbackBalance,
      multiplier: adminMultiplier,
      bonus: bonusAmount,
      transactionId
    };
  }
  
  // Also update userCredentials if it exists
  const storedCredentials = localStorage.getItem('userCredentials');
  if (storedCredentials) {
    const credentials = JSON.parse(storedCredentials);
    const totalReward = cashbackAmount + bonusAmount;
    const newCashbackBalance = (credentials.cashbackBalance || 0) + totalReward;
    const newTotalEarned = (credentials.totalEarned || 0) + totalReward;
    
    credentials.cashbackBalance = newCashbackBalance;
    credentials.totalEarned = newTotalEarned;
    credentials.lastCashbackDate = new Date().toISOString();
    
    localStorage.setItem('userCredentials', JSON.stringify(credentials));
    
    console.log(`✅ Admin credentials updated: +R${totalReward.toFixed(2)}, New balance: R${newCashbackBalance.toFixed(2)}`);
    
    return {
      type: 'admin',
      adminId,
      amount: totalReward,
      newBalance: newCashbackBalance,
      bonus: bonusAmount,
      transactionId
    };
  }
  
  return null;
};
