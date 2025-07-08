
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useCustomerEligibility = () => {
  const [isEligible, setIsEligible] = useState(false);
  const [customerAirtimeBalance, setCustomerAirtimeBalance] = useState(0);
  const [customerDataBalance, setCustomerDataBalance] = useState(0);
  const [eligibilityReason, setEligibilityReason] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    checkCustomerEligibility();
  }, []);

  const checkCustomerEligibility = () => {
    // Simulate checking customer's current airtime and data balance
    const userData = localStorage.getItem('onecardUser');
    
    if (userData) {
      const user = JSON.parse(userData);
      const airtimeBalance = user.airtimeBalance || 0;
      const dataBalance = user.dataBalance || 0;
      
      setCustomerAirtimeBalance(airtimeBalance);
      setCustomerDataBalance(dataBalance);
      
      // Customer is eligible if they have less than R5 airtime AND less than 100MB data
      const hasLowAirtime = airtimeBalance < 5;
      const hasLowData = dataBalance < 100; // 100MB threshold
      
      const eligible = hasLowAirtime && hasLowData;
      setIsEligible(eligible);
      
      if (eligible) {
        setEligibilityReason('Low airtime and data detected - eligible for data pool allocation');
      } else if (!hasLowAirtime) {
        setEligibilityReason(`Sufficient airtime (R${airtimeBalance}) - not eligible for free allocation`);
      } else if (!hasLowData) {
        setEligibilityReason(`Sufficient data (${dataBalance}MB) - not eligible for free allocation`);
      }
    }
  };

  const simulateDataPurchaseSuccess = (amount: number) => {
    // Simulate successful data purchase - customer now has data
    const userData = localStorage.getItem('onecardUser');
    if (userData) {
      const user = JSON.parse(userData);
      user.dataBalance = (user.dataBalance || 0) + (amount * 100); // Convert R to MB (rough conversion)
      user.airtimeBalance = (user.airtimeBalance || 0) + amount;
      localStorage.setItem('onecardUser', JSON.stringify(user));
      
      // Re-check eligibility after purchase
      checkCustomerEligibility();
      
      toast({
        title: "📱 Data Purchase Successful",
        description: `${amount * 100}MB data activated. You can now access Divine Mobile deals!`,
      });
    }
  };

  const automaticCutoff = () => {
    // Automatic system cutoff when customer has sufficient resources
    if (!isEligible) {
      toast({
        title: "🚫 Access Restricted",
        description: "Data pool allocation unavailable - sufficient balance detected.",
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  return {
    isEligible,
    customerAirtimeBalance,
    customerDataBalance,
    eligibilityReason,
    checkCustomerEligibility,
    simulateDataPurchaseSuccess,
    automaticCutoff
  };
};
