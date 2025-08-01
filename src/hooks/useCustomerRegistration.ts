
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { usePermanentAuth } from './usePermanentAuth';
import { usePhoneValidation } from '@/hooks/usePhoneValidation';
import { usePermanentFormStorage } from './usePermanentFormStorage';
import { usePhoneStorage } from './usePhoneStorage';
import { validateSouthAfricanBankAccount } from '@/utils/bankingValidation';
import { FormData as CustomerFormData } from '@/types/customerRegistration';

export const useCustomerRegistration = () => {
  const [formData, setFormData] = useState<CustomerFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    countryCode: '+27',
    bankName: '',
    branchCode: '',
    accountNumber: '',
    routingNumber: '',
    rememberPassword: true,
    agreeTerms: false,
    marketingConsent: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CustomerFormData, string>>>({});
  const { toast } = useToast();
  const { createPermanentSession } = usePermanentAuth();
  const { validateSouthAfricanMobile } = usePhoneValidation();
  const { savePermanently, loadPermanentData, autoSave } = usePermanentFormStorage('customer');
  const { savePhoneNumber, autoFillPhone } = usePhoneStorage();

  // Enhanced initialization with auto-fill
  useEffect(() => {
    const initializeForm = () => {
      try {
        const savedData = loadPermanentData();
        if (savedData && Object.keys(savedData).length > 0) {
          console.log('🔄 Auto-filling customer form with saved data...', savedData);
          
          // Merge saved data with default form data
          const mergedData = {
            ...formData,
            ...savedData
          };
          
          setFormData(mergedData);
          
          toast({
            title: "📝 Form Auto-Filled!",
            description: "Your previously saved customer information has been restored.",
            duration: 3000
          });
        } else {
          // Try to auto-fill phone if no complete saved data
          const autoFilled = autoFillPhone('customer');
          if (autoFilled) {
            setFormData(prev => ({
              ...prev,
              phoneNumber: autoFilled.phoneNumber,
              countryCode: autoFilled.countryCode
            }));
            
            console.log('📱 Auto-filled phone number for customer:', autoFilled.phoneNumber);
          }
        }
      } catch (error) {
        console.error('Error initializing customer form:', error);
      }
    };

    initializeForm();
  }, []); // Only run once on mount

  const handleInputChange = (field: keyof CustomerFormData, value: any) => {
    // Special handling for phone numbers to ensure 9-digit preservation
    if (field === 'phoneNumber') {
      const cleanValue = value.replace(/\D/g, '');
      
      // Normalize different input formats
      let normalizedPhone = cleanValue;
      if (cleanValue.startsWith('27') && cleanValue.length === 11) {
        normalizedPhone = cleanValue.substring(2);
      } else if (cleanValue.startsWith('0') && cleanValue.length === 10) {
        normalizedPhone = cleanValue.substring(1);
      }
      
      // Intelligently prevent invalid patterns
      if (normalizedPhone.length > 0) {
        // First digit cannot be 0
        if (normalizedPhone[0] === '0') {
          return; // Silently ignore
        }
        
        // Second digit cannot be 0
        if (normalizedPhone.length > 1 && normalizedPhone[1] === '0') {
          return; // Silently ignore
        }
      }
      
      // Only update if we have 9 or fewer digits
      if (normalizedPhone.length <= 9) {
        value = normalizedPhone;
      } else {
        return; // Don't update if more than 9 digits
      }
    }
    
    const updatedFormData = {
      ...formData,
      [field]: value
    };
    
    setFormData(updatedFormData);
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }

    // Save phone number when it's updated and is exactly 9 digits
    if (field === 'phoneNumber' && value && value.length === 9) {
      savePhoneNumber(value, formData.countryCode, 'customer');
    }

    // Enhanced auto-save with optimized debouncing (faster response)
    autoSave(updatedFormData, 800); // Reduced from 1500ms to 800ms for better responsiveness
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CustomerFormData, string>> = {};

    // Only validate truly required fields
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    
    // Enhanced phone validation with exact 9-digit requirement
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (formData.phoneNumber.length !== 9) {
      newErrors.phoneNumber = 'Phone number must be exactly 9 digits';
    } else {
      const phoneValidation = validateSouthAfricanMobile(formData.phoneNumber);
      if (!phoneValidation.isValid) {
        newErrors.phoneNumber = phoneValidation.error || 'Invalid South African mobile number';
      }
    }

    // Banking validation is optional - only validate if user provided banking info
    if (formData.accountNumber && formData.accountNumber.trim()) {
      const bankValidation = validateSouthAfricanBankAccount(formData.accountNumber);
      if (!bankValidation.isValid) {
        newErrors.accountNumber = bankValidation.error || 'Invalid South African bank account number';
      }
    }
    
    // Terms agreement is required
    if (!formData.agreeTerms) newErrors.agreeTerms = 'Terms acceptance is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Please fix the errors",
        description: "Check the form for any missing or incorrect information.",
        variant: "destructive"
      });
      return;
    }

    try {
      // Generate card number
      const cardNumber = `OC${Math.random().toString().substr(2, 8)}`;
      
      // Ensure phone number is exactly 9 digits and properly formatted
      const phoneNumber = formData.phoneNumber.replace(/\D/g, '');
      if (phoneNumber.length !== 9) {
        throw new Error('Invalid phone number format');
      }
      
      // Create user credentials with permanent session flag
      const userCredentials = {
        email: formData.email,
        password: 'auto-generated-password',
        userType: 'customer',
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: phoneNumber,
        registeredPhone: `+27${phoneNumber}`,
        phoneNumber: phoneNumber,
        permanentSession: true // Flag for permanent session
      };

      // Create user data with consistent phone storage
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        cardNumber,
        phone: phoneNumber,
        registeredPhone: `+27${phoneNumber}`,
        phoneNumber: phoneNumber,
        bankName: formData.bankName,
        branchCode: formData.branchCode,
        accountNumber: formData.accountNumber,
        balance: 0,
        cashbackBalance: 0,
        totalEarned: 0,
        registrationDate: new Date().toISOString()
      };

      // Store permanent session flags
      localStorage.setItem('userCredentials', JSON.stringify(userCredentials));
      localStorage.setItem('onecardUser', JSON.stringify(userData));
      localStorage.setItem('userAuthenticated', 'true');
      localStorage.setItem('registrationCompleted', 'true');
      localStorage.setItem('permanentSession', 'true');
      localStorage.setItem('sessionType', 'permanent');

      // Create permanent session that NEVER expires
      createPermanentSession(userCredentials, userData);

      // Save form data permanently
      await savePermanently(formData);

      console.log('✅ Customer registration completed with PERMANENT session - never expires');
      console.log('✅ Phone number saved:', phoneNumber, '(9 digits preserved)');

      // Trigger automatic collapse by dispatching storage event
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'registrationCompleted',
        newValue: 'true'
      }));

      console.log('📋 Registration form will automatically collapse to summary view');

      // Silent success - no toast, form will auto-collapse and redirect
      setTimeout(() => {
        window.location.href = '/portal?tab=onecard';
      }, 1500);

    } catch (error) {
      console.error('Registration error:', error);
      // Only show error toasts, not success
      toast({
        title: "Registration Failed",
        description: "An error occurred during registration. Please try again.",
        variant: "destructive"
      });
    }
  };

  return {
    formData,
    errors,
    handleInputChange,
    handleSubmit
  };
};
