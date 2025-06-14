
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { calculateProfitSharing } from '@/services/dealsService';
import { CartItem } from '@/types/deals';
import { useMobileAuth } from './useMobileAuth';

export const useShoppingCart = (initialDeal?: CartItem) => {
  const { toast } = useToast();
  const { currentUser, isAuthenticated, userType } = useMobileAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>(initialDeal ? [initialDeal] : []);
  const [purchaseMode, setPurchaseMode] = useState<'self' | 'other'>('self');
  const [recipientData, setRecipientData] = useState({
    name: '',
    phone: '',
    relationship: ''
  });
  const [customerPhone, setCustomerPhone] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isVendor, setIsVendor] = useState(false);

  useEffect(() => {
    // Set vendor status based on user type
    setIsVendor(userType === 'vendor');
    
    // Set customer phone from stored credentials (the actual registered phone number)
    const credentials = localStorage.getItem('userCredentials');
    if (credentials) {
      try {
        const parsedCredentials = JSON.parse(credentials);
        if (parsedCredentials.phone) {
          setCustomerPhone(parsedCredentials.phone); // Use the registered phone number
        }
      } catch (error) {
        console.error('Error parsing credentials:', error);
      }
    }
  }, [currentUser, userType]);

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

  const sendComprehensiveReceipt = async (transactionData: any, profitSharing: any) => {
    try {
      const credentials = localStorage.getItem('userCredentials');
      let customerEmail = '';
      let customerName = '';
      
      if (credentials) {
        const parsedCredentials = JSON.parse(credentials);
        customerEmail = parsedCredentials.email || '';
        customerName = `${parsedCredentials.firstName || ''} ${parsedCredentials.lastName || ''}`.trim();
      }

      const receiptData = {
        customerName: customerName || 'Valued Customer',
        customerEmail: customerEmail,
        customerPhone: customerPhone,
        recipientPhone: purchaseMode === 'self' ? customerPhone : recipientData.phone,
        recipientName: purchaseMode === 'self' ? 'Self' : recipientData.name,
        transactionId: transactionData.timestamp.replace(/[^0-9]/g, '').slice(-10),
        items: cartItems.map(item => ({
          network: item.network,
          amount: item.amount,
          price: item.discountedPrice,
          type: item.dealType || 'airtime'
        })),
        total: transactionData.amount,
        cashbackEarned: profitSharing.customerCashback || profitSharing.registeredCustomerReward || 0,
        timestamp: transactionData.timestamp,
        purchaseType: purchaseMode
      };

      // Send receipt via edge function
      const { data, error } = await supabase.functions.invoke('send-receipt', {
        body: receiptData
      });

      if (error) {
        console.error('Error sending receipt:', error);
      } else {
        console.log('Receipt sent successfully:', data);
        
        // Open WhatsApp with receipt if URL provided
        if (data?.whatsappUrl) {
          setTimeout(() => {
            window.open(data.whatsappUrl, '_blank');
          }, 2000);
        }
      }
    } catch (error) {
      console.error('Error in sendComprehensiveReceipt:', error);
    }
  };

  const processPurchase = async (validationError: string, detectedNetwork: string) => {
    if (validationError) {
      toast({
        title: "Validation Error",
        description: validationError,
        variant: "destructive"
      });
      return false;
    }

    // Skip authentication check since user is already authenticated after registration
    if (!isAuthenticated || !currentUser) {
      toast({
        title: "Session Expired",
        description: "Please refresh the page to continue shopping.",
        variant: "destructive"
      });
      return false;
    }

    setIsProcessing(true);
    
    try {
      const { networkCost, customerPrice, totalMarkup, profitSharing } = calculateTotals();
      const recipientPhone = purchaseMode === 'self' ? customerPhone : recipientData.phone;
      const recipientName = purchaseMode === 'self' ? 'Self' : recipientData.name;
      
      // Simulate transaction processing (replace with actual API call)
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

      // Store transaction locally for demo purposes
      const existingTransactions = JSON.parse(localStorage.getItem('userTransactions') || '[]');
      existingTransactions.push(transactionData);
      localStorage.setItem('userTransactions', JSON.stringify(existingTransactions));

      // Send comprehensive receipt
      await sendComprehensiveReceipt(transactionData, profitSharing);

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
        description: "Receipt sent to WhatsApp & Email. Redirecting to shop..."
      });

      setCartItems([]);

      // Redirect to main deals page after 3 seconds
      setTimeout(() => {
        window.location.href = '/';
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
    isAuthenticated,
    calculateTotals,
    processPurchase
  };
};
