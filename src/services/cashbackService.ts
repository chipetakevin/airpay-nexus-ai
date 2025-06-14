
import { supabase } from '@/integrations/supabase/client';

export interface CashbackUpdate {
  customerCardNumber: string;
  customerCashback?: number;
  vendorId?: string;
  vendorProfit?: number;
  recipientPhone?: string;
  recipientReward?: number;
  transactionId: string;
}

export const updateCashbackBalances = async (update: CashbackUpdate) => {
  try {
    const updates = [];

    // Update customer OneCard balance if applicable
    if (update.customerCashback && update.customerCashback > 0) {
      const customerUpdate = await updateCustomerBalance(
        update.customerCardNumber, 
        update.customerCashback,
        update.transactionId
      );
      updates.push(customerUpdate);
    }

    // Update vendor balance if applicable
    if (update.vendorProfit && update.vendorProfit > 0 && update.vendorId) {
      const vendorUpdate = await updateVendorBalance(
        update.vendorId, 
        update.vendorProfit,
        update.transactionId
      );
      updates.push(vendorUpdate);
    }

    // Handle recipient reward for third-party purchases
    if (update.recipientReward && update.recipientReward > 0 && update.recipientPhone) {
      const recipientUpdate = await handleRecipientReward(
        update.recipientPhone,
        update.recipientReward,
        update.transactionId
      );
      updates.push(recipientUpdate);
    }

    return {
      success: true,
      updates,
      message: 'Cashback balances updated successfully'
    };

  } catch (error) {
    console.error('Error updating cashback balances:', error);
    return {
      success: false,
      error: error.message,
      message: 'Failed to update cashback balances'
    };
  }
};

const updateCustomerBalance = async (cardNumber: string, cashbackAmount: number, transactionId: string) => {
  // Try to find customer by card number (assuming it's stored in a customer field)
  const storedUser = localStorage.getItem('onecardUser');
  if (storedUser) {
    const userData = JSON.parse(storedUser);
    const newCashbackBalance = (userData.cashbackBalance || 0) + cashbackAmount;
    const newTotalEarned = (userData.totalEarned || 0) + cashbackAmount;
    
    userData.cashbackBalance = newCashbackBalance;
    userData.totalEarned = newTotalEarned;
    localStorage.setItem('onecardUser', JSON.stringify(userData));
    
    console.log(`Customer ${cardNumber} cashback updated: +R${cashbackAmount.toFixed(2)} (New balance: R${newCashbackBalance.toFixed(2)})`);
    
    return {
      type: 'customer',
      cardNumber,
      amount: cashbackAmount,
      newBalance: newCashbackBalance,
      transactionId
    };
  }
  
  return null;
};

const updateVendorBalance = async (vendorId: string, profitAmount: number, transactionId: string) => {
  const storedVendor = localStorage.getItem('onecardVendor');
  if (storedVendor) {
    const vendorData = JSON.parse(storedVendor);
    const newBalance = (vendorData.onecardBalance || 0) + profitAmount;
    const newTotalEarned = (vendorData.totalEarned || 0) + profitAmount;
    
    vendorData.onecardBalance = newBalance;
    vendorData.totalEarned = newTotalEarned;
    localStorage.setItem('onecardVendor', JSON.stringify(vendorData));
    
    console.log(`Vendor ${vendorId} profit updated: +R${profitAmount.toFixed(2)} (New balance: R${newBalance.toFixed(2)})`);
    
    return {
      type: 'vendor',
      vendorId,
      amount: profitAmount,
      newBalance,
      transactionId
    };
  }
  
  return null;
};

const handleRecipientReward = async (recipientPhone: string, rewardAmount: number, transactionId: string) => {
  // For unregistered recipients, we'll store their pending reward
  // In a real system, this would create a notification to encourage registration
  const pendingRewards = JSON.parse(localStorage.getItem('pendingRecipientRewards') || '{}');
  
  if (!pendingRewards[recipientPhone]) {
    pendingRewards[recipientPhone] = 0;
  }
  
  pendingRewards[recipientPhone] += rewardAmount;
  localStorage.setItem('pendingRecipientRewards', JSON.stringify(pendingRewards));
  
  console.log(`Recipient ${recipientPhone} reward pending: +R${rewardAmount.toFixed(2)} (Total pending: R${pendingRewards[recipientPhone].toFixed(2)})`);
  
  return {
    type: 'recipient',
    recipientPhone,
    amount: rewardAmount,
    pendingTotal: pendingRewards[recipientPhone],
    transactionId,
    status: 'pending_registration'
  };
};

export const getPendingRecipientRewards = (phone: string): number => {
  const pendingRewards = JSON.parse(localStorage.getItem('pendingRecipientRewards') || '{}');
  return pendingRewards[phone] || 0;
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
