
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { validateEmail, validateAccountNumber } from '@/utils/formValidation';

interface VendorFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
  companyName: string;
  businessType: string;
  bankName: string;
  accountNumber: string;
  routingNumber: string;
  branchCode: string;
  promoCode: string;
  rememberPassword: boolean;
  agreeTerms: boolean;
  marketingConsent: boolean;
}

export const useVendorRegistration = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<VendorFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    countryCode: '+265',
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

  const [errors, setErrors] = useState<any>({});

  // Enhanced auto-save and autofill functionality
  useEffect(() => {
    // Load saved registration data
    const savedData = localStorage.getItem('vendorRegistrationDraft');
    const userCredentials = localStorage.getItem('userCredentials');
    const vendorData = localStorage.getItem('onecardVendor');
    
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(prev => ({
          ...prev,
          ...parsedData,
          rememberPassword: true
        }));
        
        toast({
          title: "Draft Restored 📝",
          description: "Your previous registration data has been restored.",
        });
      } catch (error) {
        console.log('Failed to load saved registration data');
      }
    } else if (userCredentials && vendorData) {
      // Autofill from existing vendor profile if logged in
      try {
        const credentials = JSON.parse(userCredentials);
        const vendor = JSON.parse(vendorData);
        
        if (credentials.userType === 'vendor') {
          setFormData(prev => ({
            ...prev,
            firstName: vendor.firstName || '',
            lastName: vendor.lastName || '',
            email: vendor.email || credentials.email || '',
            phoneNumber: vendor.phone?.replace(prev.countryCode, '') || '',
            companyName: vendor.businessName || '',
            rememberPassword: true
          }));
          
          toast({
            title: "Profile Autofilled ✨",
            description: "Registration form filled with your saved profile data.",
          });
        }
      } catch (error) {
        console.log('Failed to autofill from existing profile');
      }
    }
  }, []);

  // Enhanced auto-save with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // Only save if there's meaningful data
      const hasData = formData.firstName || formData.lastName || formData.email || formData.companyName;
      if (hasData) {
        localStorage.setItem('vendorRegistrationDraft', JSON.stringify({
          ...formData,
          rememberPassword: true
        }));
        
        // Show periodic save confirmation (every 10 seconds)
        const lastSaveTime = localStorage.getItem('lastVendorSaveTime');
        const now = Date.now();
        if (!lastSaveTime || now - parseInt(lastSaveTime) > 10000) {
          localStorage.setItem('lastVendorSaveTime', now.toString());
          console.log('✅ Registration data auto-saved');
        }
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [formData]);

  const handleInputChange = (field: keyof VendorFormData, value: any) => {
    setFormData(prev => ({ 
      ...prev, 
      [field]: value,
      rememberPassword: true // Always keep remember password enabled
    }));
    
    // Clear field-specific errors
    if (errors[field]) {
      setErrors((prev: any) => ({ ...prev, [field]: '' }));
    }

    // Real-time validation
    if (field === 'email' && value) {
      if (!validateEmail(value)) {
        setErrors((prev: any) => ({ ...prev, email: 'Please enter a valid email address' }));
      }
    }

    if (field === 'accountNumber' && value) {
      if (!validateAccountNumber(value)) {
        setErrors((prev: any) => ({ ...prev, accountNumber: 'Account number must be 8-12 digits' }));
      }
    }
  };

  const handleBankSelect = (bankName: string, routing: string, branchCode: string) => {
    setFormData(prev => ({ 
      ...prev, 
      bankName, 
      routingNumber: routing,
      branchCode 
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: any = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.companyName) newErrors.companyName = 'Company name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!validateEmail(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.bankName) newErrors.bankName = 'Bank selection is required';
    if (!formData.accountNumber) newErrors.accountNumber = 'Account number is required';
    if (!validateAccountNumber(formData.accountNumber)) newErrors.accountNumber = 'Invalid account number';
    if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to terms and conditions';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const vendorId = 'VND' + Math.random().toString(36).substr(2, 8).toUpperCase();
      
      const vendorData = {
        ...formData,
        vendorId,
        registeredPhone: `${formData.countryCode}${formData.phoneNumber}`,
        cardType: 'OneCard Gold',
        cashbackBalance: 0,
        totalEarned: 0,
        totalSpent: 0,
        commissionRate: 10.00,
        rememberPassword: true,
        autoSaveEnabled: true,
        registrationCompleted: true,
        lastLoginDate: new Date().toISOString()
      };

      // Store vendor data with enhanced persistence
      localStorage.setItem('onecardVendor', JSON.stringify(vendorData));
      
      // Enhanced credentials storage with remember password
      localStorage.setItem('userCredentials', JSON.stringify({
        email: formData.email,
        phone: `${formData.countryCode}${formData.phoneNumber}`,
        rememberPassword: true,
        userType: 'vendor',
        autoLogin: true,
        lastAccessDate: new Date().toISOString()
      }));

      localStorage.setItem('userAuthenticated', 'true');
      
      // Enhanced session data
      sessionStorage.setItem('userAuth', JSON.stringify({
        userId: vendorId,
        cardNumber: vendorId,
        userName: `${formData.firstName} ${formData.lastName}`,
        accountType: 'Vendor',
        companyName: formData.companyName,
        authVerified: true,
        autoSaveEnabled: true,
        timestamp: new Date().toISOString()
      }));
      
      // Clear draft after successful registration
      localStorage.removeItem('vendorRegistrationDraft');
      localStorage.removeItem('lastVendorSaveTime');
      
      toast({
        title: "Vendor Registration Successful! 🎉",
        description: `OneCard Gold created: ****${vendorId.slice(-4)}. Auto-save enabled for future sessions!`,
      });

      // Redirect to Smart Deals with enhanced session persistence
      window.location.replace('/portal?tab=onecard&verified=true&autosave=enabled');
    }
  };

  return {
    formData,
    errors,
    handleInputChange,
    handleBankSelect,
    handleSubmit
  };
};
