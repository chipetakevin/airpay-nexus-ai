
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { calculateProfitSharing } from '@/services/dealsService';
import { CartItem } from '@/types/deals';

export const useShoppingCart = (initialDeal?: CartItem) => {
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<CartItem[]>(initialDeal ? [initialDeal] : []);
  const [purchaseMode, setPurchaseMode] = useState<'self' | 'other'>('self');
  const [recipientData, setRecipientData] = useState({
    name: '',
    phone: '',
    relationship: ''
  });
  const [customerPhone, setCustomerPhone] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isVendor, setIsVendor] = useState(false);

  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setCurrentUser(user);
        
        // Check if user is a vendor
        const { data: vendorData } = await supabase
          .from('vendors')
          .select('*')
          .eq('email', user.email)
          .single();
        
        if (vendorData) {
          setIsVendor(true);
        }
        
        // Try to load customer data from database
        const { data: customerData } = await supabase
          .from('customers')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (customerData) {
          setCustomerPhone(customerData.phone || '');
        }
      }
    };
    
    getCurrentUser();
  }, []);

  const calculateTotals = () => {
    const networkCost = cartItems.reduce((sum, item) => sum + (item.networkPrice || 0), 0);
    const totalMarkup = cartItems.reduce((sum, item) => sum + (item.markupAmount || 0), 0);
    const customerPrice = cartItems.reduce((sum, item) => sum + item.discountedPrice, 0);
    
    // Calculate profit sharing based on purchase type and user type
    let profitSharing;
    
    if (isVendor) {
      profitSharing = calculateProfitSharing(totalMarkup, 'vendor', true);
    } else if (purchaseMode === 'self') {
      profitSharing = calculateProfitSharing(totalMarkup, 'self', false);
    } else {
      profitSharing = calculateProfitSharing(totalMarkup, 'third_party', false);
    }
    
    return { 
      networkCost, 
      customerPrice, 
      totalMarkup, 
      profitSharing,
      total: customerPrice 
    };
  };

  const processPurchase = async (validationError: string, detectedNetwork: string) => {
    if (validationError) {
      toast({
        title: "Validation Error",
        description: validationError,
        variant: "destructive"
      });
      return;
    }

    if (!currentUser) {
      toast({
        title: "Authentication Required",
        description: "Please log in to complete your purchase.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      const { networkCost, customerPrice, totalMarkup, profitSharing } = calculateTotals();
      const recipientPhone = purchaseMode === 'self' ? customerPhone : recipientData.phone;
      const recipientName = purchaseMode === 'self' ? 'Self' : recipientData.name;
      
      // Create transaction with detailed profit allocation
      const { data: transactionData, error: transactionError } = await supabase
        .from('transactions')
        .insert({
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
          status: 'completed'
        })
        .select()
        .single();

      if (transactionError) {
        console.error('Transaction error:', transactionError);
        throw new Error('Failed to create transaction');
      }

      // Update user balances based on profit sharing
      if (isVendor && profitSharing.vendorProfit) {
        const { data: vendorData } = await supabase
          .from('vendors')
          .select('onecard_balance')
          .eq('email', currentUser.email)
          .single();

        if (vendorData) {
          await supabase
            .from('vendors')
            .update({ 
              onecard_balance: (vendorData.onecard_balance || 0) + profitSharing.vendorProfit
            })
            .eq('email', currentUser.email);
        }
      } else {
        // Update customer balances
        const { data: currentCustomer } = await supabase
          .from('customers')
          .select('onecard_balance, total_cashback')
          .eq('id', currentUser.id)
          .single();

        if (currentCustomer) {
          const cashbackEarned = profitSharing.customerCashback || profitSharing.registeredCustomerReward || 0;
          const newOnecardBalance = (currentCustomer.onecard_balance || 0) + cashbackEarned;
          const newTotalCashback = (currentCustomer.total_cashback || 0) + cashbackEarned;
          
          await supabase
            .from('customers')
            .update({ 
              onecard_balance: newOnecardBalance,
              total_cashback: newTotalCashback
            })
            .eq('id', currentUser.id);
        }
      }

      let successMessage = "Purchase Successful! 🎉";
      if (isVendor) {
        successMessage = `Vendor purchase completed! R${profitSharing.vendorProfit?.toFixed(2)} profit earned!`;
      } else if (purchaseMode === 'other') {
        successMessage = `Gift purchase completed! Both you and recipient earn R${profitSharing.registeredCustomerReward?.toFixed(2)} each!`;
      } else {
        successMessage = `Purchase completed! R${profitSharing.customerCashback?.toFixed(2)} cashback earned!`;
      }

      toast({
        title: successMessage,
        description: "Airtime loaded successfully."
      });

      setCartItems([]);
      return true;
      
    } catch (error) {
      console.error('Purchase error:', error);
      toast({
        title: "Purchase Failed",
        description: "Unable to process purchase. Please try again.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    cartItems,
    setCartItems,
    purchaseMode,
    setPurchaseMode,
    recipientData,
    setRecipientData,
    customerPhone,
    setCustomerPhone,
    isProcessing,
    currentUser,
    isVendor,
    calculateTotals,
    processPurchase
  };
};
