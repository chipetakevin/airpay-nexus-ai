
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

  // Enhanced phone number retrieval for all user types
  const getRegisteredPhoneNumber = () => {
    // Try multiple sources for phone number based on user type
    const credentials = localStorage.getItem('userCredentials');
    const onecardUser = localStorage.getItem('onecardUser');
    const onecardVendor = localStorage.getItem('onecardVendor');
    const onecardAdmin = localStorage.getItem('onecardAdmin');
    
    let phoneNumber = '';
    
    try {
      // Check userCredentials first (primary source)
      if (credentials) {
        const parsedCredentials = JSON.parse(credentials);
        phoneNumber = parsedCredentials.phone || parsedCredentials.registeredPhone || parsedCredentials.phoneNumber;
      }
      
      // Check user-type specific storage
      if (!phoneNumber && userType === 'customer' && onecardUser) {
        const userData = JSON.parse(onecardUser);
        phoneNumber = userData.registeredPhone || userData.phone || userData.phoneNumber;
      } else if (!phoneNumber && userType === 'vendor' && onecardVendor) {
        const vendorData = JSON.parse(onecardVendor);
        phoneNumber = vendorData.registeredPhone || vendorData.phone || vendorData.phoneNumber;
      } else if (!phoneNumber && userType === 'admin' && onecardAdmin) {
        const adminData = JSON.parse(onecardAdmin);
        phoneNumber = adminData.registeredPhone || adminData.phone || adminData.phoneNumber;
      }
      
      // Normalize phone number format (remove country code/leading zero)
      if (phoneNumber) {
        const cleanPhone = phoneNumber.replace(/\D/g, '');
        if (cleanPhone.startsWith('27')) {
          phoneNumber = cleanPhone.substring(2);
        } else if (cleanPhone.startsWith('0')) {
          phoneNumber = cleanPhone.substring(1);
        } else {
          phoneNumber = cleanPhone;
        }
        
        // Ensure it's exactly 9 digits for SA mobile numbers
        if (phoneNumber.length === 9) {
          return phoneNumber;
        }
      }
    } catch (error) {
      console.error('Error retrieving registered phone number:', error);
    }
    
    return '';
  };

  useEffect(() => {
    // Set vendor status based on user type
    setIsVendor(userType === 'vendor');
    
    // Auto-fill customer phone from registration data
    const registeredPhone = getRegisteredPhoneNumber();
    if (registeredPhone && !customerPhone) {
      setCustomerPhone(registeredPhone);
      console.log('✅ Phone number auto-filled from registration:', registeredPhone);
    }
  }, [currentUser, userType, customerPhone]);

  const calculateTotals = () => {
    return calculateCartTotals(cartItems, isVendor, purchaseMode);
  };

  const processPurchase = async (validationError: string, detectedNetwork: string) => {
    // Ensure phone number is set before validation
    const phoneToUse = customerPhone || getRegisteredPhoneNumber();
    
    if (!phoneToUse) {
      toast({
        title: "Phone Number Required",
        description: "Please ensure your phone number is properly saved in your profile.",
        variant: "destructive"
      });
      return false;
    }

    // Update customerPhone if it was empty
    if (!customerPhone && phoneToUse) {
      setCustomerPhone(phoneToUse);
    }

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
        phoneToUse, // Use the guaranteed phone number
        purchaseMode,
        recipientData,
        userType,
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
