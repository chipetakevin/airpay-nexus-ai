
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { VendorFormData } from '@/types/vendorRegistration';

export const useVendorAutoSave = (formData: VendorFormData) => {
  const { toast } = useToast();

  // Load saved registration data
  const loadSavedData = (): Partial<VendorFormData> | null => {
    const savedData = localStorage.getItem('vendorRegistrationDraft');
    const userCredentials = localStorage.getItem('userCredentials');
    const vendorData = localStorage.getItem('onecardVendor');
    
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        toast({
          title: "Draft Restored 📝",
          description: "Your previous registration data has been restored.",
        });
        return {
          ...parsedData,
          countryCode: '+27', // Always ensure South Africa country code
          password: '', // Never auto-fill passwords for security
          confirmPassword: '',
          rememberPassword: true
        };
      } catch (error) {
        console.log('Failed to load saved registration data');
      }
    } else if (userCredentials && vendorData) {
      // Autofill from existing vendor profile if logged in
      try {
        const credentials = JSON.parse(userCredentials);
        const vendor = JSON.parse(vendorData);
        
        if (credentials.userType === 'vendor') {
          toast({
            title: "Profile Autofilled ✨",
            description: "Registration form filled with your saved profile data.",
          });
          return {
            firstName: vendor.firstName || '',
            lastName: vendor.lastName || '',
            email: vendor.email || credentials.email || '',
            phoneNumber: vendor.phone?.replace('+27', '') || '', // Remove country code for display
            countryCode: '+27', // Always South Africa
            companyName: vendor.businessName || '',
            rememberPassword: true
          };
        }
      } catch (error) {
        console.log('Failed to autofill from existing profile');
      }
    }
    
    return null;
  };

  // Enhanced auto-save with debouncing (excluding passwords)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // Only save if there's meaningful data
      const hasData = formData.firstName || formData.lastName || formData.email || formData.companyName;
      if (hasData) {
        // Exclude passwords from auto-save for security
        const dataToSave = { ...formData };
        delete dataToSave.password;
        delete dataToSave.confirmPassword;
        
        localStorage.setItem('vendorRegistrationDraft', JSON.stringify({
          ...dataToSave,
          countryCode: '+27', // Always save with South Africa code
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

  return { loadSavedData };
};
