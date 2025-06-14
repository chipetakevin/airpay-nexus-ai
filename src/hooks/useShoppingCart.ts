
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { CartItem } from '@/types/deals';
import { useMobileAuth } from './useMobileAuth';
import { useTransactionProcessing } from './useTransactionProcessing';
import { calculateCartTotals } from '@/utils/cartCalculations';

export const useShoppingCart = (initialDeal?: CartItem) => {
  const { toast } = useToast();
  const { currentUser, isAuthenticated, userType } = useMobileAuth();
  const { processTransaction } = useTransactionProcessing();
  
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
    return calculateCartTotals(cartItems, isVendor, purchaseMode);
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
      const { networkCost, customerPrice, profitSharing } = calculateTotals();
      
      const success = await processTransaction(
        cartItems,
        currentUser,
        customerPhone,
        purchaseMode,
        recipientData,
        isVendor,
        profitSharing,
        customerPrice,
        networkCost,
        detectedNetwork
      );

      if (success) {
        setCartItems([]);
      }

      return success;
      
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
