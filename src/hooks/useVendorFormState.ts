
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { VendorFormData } from '@/types/vendorRegistration';
import { usePermanentFormStorage } from './usePermanentFormStorage';

export const useVendorFormState = () => {
  const { toast } = useToast();
  const { savePermanently, loadPermanentData, autoSave, autoFillForm } = usePermanentFormStorage('vendor');
  
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

  // Enhanced initialization with auto-fill
  useEffect(() => {
    if (!isInitialized) {
      const savedData = loadPermanentData();
      if (savedData && Object.keys(savedData).length > 0) {
        console.log('🔄 Auto-filling vendor form with saved data...', savedData);
        
        setFormData(prev => ({ ...prev, ...savedData }));
        
        toast({
          title: "📝 Vendor Form Auto-Filled!",
          description: "Your previously saved vendor information has been restored.",
          duration: 3000
        });
      } else {
        console.log('ℹ️ No saved vendor data found - starting with clean form');
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
      
      // Enhanced auto-save with optimized debouncing
      autoSave(updatedFormData, 800);
      
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
