
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useVendorRegistration } from '@/hooks/useVendorRegistration';
import { useVendorRegistrationSubmit } from '@/hooks/useVendorRegistrationSubmit';
import { useToast } from '@/hooks/use-toast';

interface ExistingRegistration {
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  vendorId: string;
  registrationDate: string;
}

interface VendorRegistrationContextType {
  location: string;
  setLocation: (location: string) => void;
  isAlertsCollapsed: boolean;
  setIsAlertsCollapsed: (collapsed: boolean) => void;
  isFormCollapsed: boolean;
  setIsFormCollapsed: (collapsed: boolean) => void;
  existingRegistration: ExistingRegistration | null;
  setExistingRegistration: (registration: ExistingRegistration | null) => void;
  formData: any;
  errors: any;
  showPassword: boolean;
  togglePasswordVisibility: () => void;
  handleInputChange: (field: string, value: any) => void;
  handleBankSelect: (bankName: string, routing: string, branchCode: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isRegistering: boolean;
  handleFormSubmit: (e: React.FormEvent) => void;
  isFormValid: () => boolean;
  handleAlertsToggle: () => void;
  handleNewRegistration: () => void;
  handleFormToggle: () => void;
  updateFormData: (data: any) => void;
}

const VendorRegistrationContext = createContext<VendorRegistrationContextType | undefined>(undefined);

export const useVendorRegistrationContext = () => {
  const context = useContext(VendorRegistrationContext);
  if (!context) {
    throw new Error('useVendorRegistrationContext must be used within VendorRegistrationProvider');
  }
  return context;
};

export const VendorRegistrationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [location, setLocation] = useState('Detecting location...');
  const [isAlertsCollapsed, setIsAlertsCollapsed] = useState(true);
  const [isFormCollapsed, setIsFormCollapsed] = useState(false);
  const [existingRegistration, setExistingRegistration] = useState<ExistingRegistration | null>(null);
  const { toast } = useToast();
  
  const { 
    formData, 
    errors, 
    showPassword, 
    togglePasswordVisibility, 
    handleInputChange, 
    handleBankSelect, 
    handleSubmit 
  } = useVendorRegistration();

  const { isRegistering, handleFormSubmit } = useVendorRegistrationSubmit(handleSubmit);

  // Enhanced existing registration check with device recognition
  useEffect(() => {
    const checkExistingRegistration = () => {
      try {
        const credentials = localStorage.getItem('userCredentials');
        const vendorData = localStorage.getItem('onecardVendor');
        const isAuthenticated = localStorage.getItem('userAuthenticated') === 'true';
        const registrationCompleted = localStorage.getItem('registrationCompleted') === 'true';
        
        if (isAuthenticated && credentials && vendorData && registrationCompleted) {
          const parsedCredentials = JSON.parse(credentials);
          const parsedVendorData = JSON.parse(vendorData);
          
          // Check if this is a vendor registration
          if (parsedCredentials.userType === 'vendor' && parsedVendorData.firstName) {
            setExistingRegistration({
              firstName: parsedVendorData.firstName,
              lastName: parsedVendorData.lastName,
              email: parsedVendorData.email,
              companyName: parsedVendorData.companyName,
              vendorId: parsedVendorData.vendorId,
              registrationDate: parsedVendorData.registrationDate || new Date().toISOString()
            });
            
            // Automatically collapse the form for existing registrations
            setIsFormCollapsed(true);
            
            console.log('✅ Existing vendor registration detected - form automatically collapsed');
            
            // Show welcome back message
            toast({
              title: "Welcome Back! 👋",
              description: `${parsedVendorData.firstName}, your vendor registration is already complete.`,
              duration: 3000
            });
          }
        } else {
          // No existing registration - show the form
          setExistingRegistration(null);
          setIsFormCollapsed(false);
          console.log('📝 No existing vendor registration found - showing registration form');
        }
      } catch (error) {
        console.error('Error checking existing vendor registration:', error);
        // Reset states if there's an error parsing data
        setExistingRegistration(null);
        setIsFormCollapsed(false);
      }
    };

    checkExistingRegistration();
    
    // Listen for storage changes to update registration status
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'registrationCompleted' || e.key === 'userAuthenticated') {
        checkExistingRegistration();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [toast]);

  // Marketing consent effect
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (formData.marketingConsent && !isAlertsCollapsed) {
      timeoutId = setTimeout(() => {
        setIsAlertsCollapsed(true);
        toast({
          title: "Registration Info Collapsed 📋",
          description: "Collapsed for better navigation. Click to expand if needed.",
          duration: 2000
        });
      }, 300);
    } else if (!formData.marketingConsent && isAlertsCollapsed) {
      timeoutId = setTimeout(() => {
        setIsAlertsCollapsed(false);
        toast({
          title: "Registration Info Expanded 📋",
          description: "Expanded to show helpful registration information.",
          duration: 2000
        });
      }, 100);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [formData.marketingConsent, isAlertsCollapsed, toast]);

  const handleAlertsToggle = () => {
    setIsAlertsCollapsed(!isAlertsCollapsed);
  };

  const handleNewRegistration = () => {
    // Clear existing registration data
    localStorage.removeItem('userCredentials');
    localStorage.removeItem('onecardVendor');
    localStorage.removeItem('userAuthenticated');
    localStorage.removeItem('registrationCompleted');
    
    setIsFormCollapsed(false);
    setExistingRegistration(null);
    
    toast({
      title: "New Registration Started 🆕",
      description: "Previous registration cleared. Starting fresh vendor registration process.",
    });
  };

  const handleFormToggle = () => {
    setIsFormCollapsed(!isFormCollapsed);
  };

  const isFormValid = () => {
    const hasRequiredFields = formData.firstName && 
                             formData.lastName && 
                             formData.email && 
                             formData.phoneNumber && 
                             formData.companyName &&
                             formData.agreeTerms;
    
    const hasNoErrors = Object.keys(errors).length === 0;
    
    return hasRequiredFields && hasNoErrors;
  };

  const updateFormData = (data: any) => {
    // This function can be used to update form data from external components
    // Currently, form data is managed by the useVendorRegistration hook
    console.log('Form data update requested:', data);
  };

  const contextValue: VendorRegistrationContextType = {
    location,
    setLocation,
    isAlertsCollapsed,
    setIsAlertsCollapsed,
    isFormCollapsed,
    setIsFormCollapsed,
    existingRegistration,
    setExistingRegistration,
    formData,
    errors,
    showPassword,
    togglePasswordVisibility,
    handleInputChange,
    handleBankSelect,
    handleSubmit,
    isRegistering,
    handleFormSubmit,
    isFormValid,
    handleAlertsToggle,
    handleNewRegistration,
    handleFormToggle,
    updateFormData
  };

  return (
    <VendorRegistrationContext.Provider value={contextValue}>
      {children}
    </VendorRegistrationContext.Provider>
  );
};
