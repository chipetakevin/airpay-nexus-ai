
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { usePhoneValidation } from '@/hooks/usePhoneValidation';
import { usePermanentAuth } from './usePermanentAuth';
import { usePermanentFormStorage } from './usePermanentFormStorage';
import { validateSouthAfricanBankAccount } from '@/utils/bankingValidation';
import { VendorFormData, VendorFormErrors } from '@/types/vendorRegistration';
import { validateVendorForm, validateField } from '@/utils/vendorValidation';
import { handleVendorRegistrationSubmit } from '@/utils/vendorRegistrationSubmit';

export const useVendorRegistration = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { validateSouthAfricanMobile } = usePhoneValidation();
  const { createPermanentSession } = usePermanentAuth();
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

  const [errors, setErrors] = useState<VendorFormErrors>({});
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
    
    // Clear field-specific errors immediately
    setErrors(prev => {
      if (prev[field]) {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      }
      return prev;
    });

    // Debounced validation to prevent flickering
    const timeoutId = setTimeout(() => {
      // Real-time validation for phone number
      if (field === 'phoneNumber' && value) {
        const phoneValidation = validateSouthAfricanMobile(value);
        if (!phoneValidation.isValid && phoneValidation.error) {
          setErrors(prev => ({ ...prev, phoneNumber: phoneValidation.error }));
        }
      }

      // Real-time validation for banking
      if (field === 'accountNumber' && value) {
        const bankValidation = validateSouthAfricanBankAccount(value);
        if (!bankValidation.isValid && bankValidation.error) {
          setErrors(prev => ({ ...prev, accountNumber: bankValidation.error }));
        }
      }

      // Real-time validation for other fields
      const fieldError = validateField(field, value, formData);
      if (fieldError) {
        setErrors(prev => ({ ...prev, [field]: fieldError }));
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [formData, autoSave, validateSouthAfricanMobile]);

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

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Enhanced validation including phone number and banking
    const newErrors = validateVendorForm(formData);
    
    // Additional phone validation
    if (formData.phoneNumber) {
      const phoneValidation = validateSouthAfricanMobile(formData.phoneNumber);
      if (!phoneValidation.isValid) {
        newErrors.phoneNumber = phoneValidation.error || 'Invalid South African mobile number';
      }
    }

    // Additional banking validation
    if (formData.accountNumber) {
      const bankValidation = validateSouthAfricanBankAccount(formData.accountNumber);
      if (!bankValidation.isValid) {
        newErrors.accountNumber = bankValidation.error || 'Invalid South African bank account number';
      }
    }
    
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Normalize phone number for consistent storage
      const normalizedPhone = formData.phoneNumber.replace(/\D/g, '');
      let finalPhone = normalizedPhone;
      
      if (normalizedPhone.startsWith('27')) {
        finalPhone = normalizedPhone.substring(2);
      } else if (normalizedPhone.startsWith('0')) {
        finalPhone = normalizedPhone.substring(1);
      }

      // Update formData with normalized phone before submission
      const updatedFormData = {
        ...formData,
        phoneNumber: finalPhone
      };

      // Complete the registration process with consistent phone storage
      const { vendorId, successMessage } = handleVendorRegistrationSubmit(updatedFormData);
      
      // Create permanent session
      const userCredentials = {
        email: formData.email,
        password: formData.password,
        userType: 'vendor',
        phone: finalPhone
      };

      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        vendorId,
        companyName: formData.companyName,
        phone: finalPhone,
        registeredPhone: `+27${finalPhone}`,
        bankName: formData.bankName,
        accountNumber: formData.accountNumber,
        balance: 0,
        registrationDate: new Date().toISOString()
      };

      // Store registration completion flag
      localStorage.setItem('registrationCompleted', 'true');
      localStorage.setItem('userAuthenticated', 'true');
      
      // Create permanent session
      createPermanentSession(userCredentials, userData);
      
      // Save form data permanently
      await savePermanently(updatedFormData);
      
      console.log('✅ Vendor registration completed with permanent session');
      
      toast({
        title: "Vendor Registration Successful! 🎉",
        description: "You'll stay logged in permanently until manual logout.",
      });

      return Promise.resolve(true);
    } else {
      // Show validation errors
      const errorFields = Object.keys(newErrors);
      toast({
        title: "Please Complete Required Fields",
        description: `Missing or invalid: ${errorFields.join(', ')}`,
        variant: "destructive"
      });
      
      return Promise.reject(new Error('Validation failed'));
    }
  }, [formData, validateSouthAfricanMobile, createPermanentSession, savePermanently, toast]);

  return {
    formData,
    errors,
    showPassword,
    togglePasswordVisibility,
    handleInputChange,
    handleBankSelect,
    handleSubmit
  };
};
