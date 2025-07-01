
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { VendorFormData } from '@/types/vendorRegistration';
import { usePermanentFormStorage } from './usePermanentFormStorage';

export const useVendorFormState = () => {
  const { toast } = useToast();
  const { savePermanently, loadPermanentData, autoSave } = usePermanentFormStorage('vendor');
  
  const [formData, setFormData] = useState<VendorFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    countryCode: '+27',
    password: '',
    confirmPassword: '',
    companyName: '',
    businessType: '',
    bankName: '',
    accountNumber: '',
    routingNumber: '',
    branchCode: '',
    promoCode: 'ONECARD2024',
    rememberPassword: true,
    agreeTerms: false,
    marketingConsent: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load saved data on component mount with stability
  useEffect(() => {
    if (!isInitialized) {
      const savedData = loadPermanentData();
      if (savedData) {
        setFormData(prev => ({ ...prev, ...savedData }));
        toast({
          title: "Vendor Form Auto-filled! ✨",
          description: "Your previously saved information has been restored.",
          duration: 2000
        });
      }
      setIsInitialized(true);
    }
  }, [isInitialized, loadPermanentData, toast]);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  const handleInputChange = useCallback((field: keyof VendorFormData, value: any) => {
    // Special handling for phone number to ensure proper formatting
    if (field === 'phoneNumber') {
      value = value.replace(/[^\d+\s]/g, '');
      
      // Clean to only digits for validation
      const digitsOnly = value.replace(/\D/g, '');
      
      // Intelligently prevent invalid patterns
      if (digitsOnly.length > 0) {
        // First digit cannot be 0
        if (digitsOnly[0] === '0') {
          return; // Silently ignore
        }
        
        // Second digit cannot be 0
        if (digitsOnly.length > 1 && digitsOnly[1] === '0') {
          return; // Silently ignore
        }
      }
    }
    
    setFormData(prev => {
      const updatedFormData = { 
        ...prev, 
        [field]: value,
        rememberPassword: true
      };
      
      // Auto-save with debouncing
      autoSave(updatedFormData, 2000);
      
      return updatedFormData;
    });
  }, [autoSave]);

  const handleBankSelect = useCallback((bankName: string, routing: string, branchCode: string) => {
    setFormData(prev => {
      const updatedFormData = { 
        ...prev, 
        bankName, 
        routingNumber: routing,
        branchCode 
      };
      
      // Immediately save bank selection
      savePermanently(updatedFormData);
      
      return updatedFormData;
    });
  }, [savePermanently]);

  return {
    formData,
    showPassword,
    togglePasswordVisibility,
    handleInputChange,
    handleBankSelect,
    savePermanently
  };
};
