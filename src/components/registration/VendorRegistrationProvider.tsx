
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

  // Check for existing vendor registration
  useEffect(() => {
    const checkExistingRegistration = () => {
      const credentials = localStorage.getItem('userCredentials');
      const vendorData = localStorage.getItem('onecardVendor');
      
      if (credentials && vendorData) {
        try {
          const parsedCredentials = JSON.parse(credentials);
          const parsedVendorData = JSON.parse(vendorData);
          
          if (parsedCredentials.userType === 'vendor' && parsedVendorData.firstName) {
            setExistingRegistration({
              firstName: parsedVendorData.firstName,
              lastName: parsedVendorData.lastName,
              email: parsedVendorData.email,
              companyName: parsedVendorData.companyName,
              vendorId: parsedVendorData.vendorId,
              registrationDate: parsedVendorData.registrationDate || new Date().toISOString()
            });
            setIsFormCollapsed(true);
          }
        } catch (error) {
          console.error('Error checking existing vendor registration:', error);
        }
      }
    };

    checkExistingRegistration();
  }, []);

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
    setIsFormCollapsed(false);
    setExistingRegistration(null);
    toast({
      title: "New Registration",
      description: "Starting fresh vendor registration process.",
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
    handleFormToggle
  };

  return (
    <VendorRegistrationContext.Provider value={contextValue}>
      {children}
    </VendorRegistrationContext.Provider>
  );
};
