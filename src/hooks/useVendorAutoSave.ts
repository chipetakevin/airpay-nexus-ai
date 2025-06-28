
import { useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { VendorFormData } from '@/types/vendorRegistration';

export const useVendorAutoSave = (formData: VendorFormData) => {
  const { toast } = useToast();
  const saveTimeoutRef = useRef<NodeJS.Timeout>();
  const lastSaveTimeRef = useRef<number>(0);
  const isInitializedRef = useRef(false);

  // Load saved registration data
  const loadSavedData = (): Partial<VendorFormData> | null => {
    if (isInitializedRef.current) return null;
    
    const savedData = localStorage.getItem('vendorRegistrationDraft');
    const userCredentials = localStorage.getItem('userCredentials');
    const vendorData = localStorage.getItem('onecardVendor');
    
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        toast({
          title: "Draft Restored 📝",
          description: "Your previous registration data has been restored.",
          duration: 2000
        });
        
        isInitializedRef.current = true;
        return {
          ...parsedData,
          countryCode: '+27',
          password: '', // Never auto-fill passwords
          confirmPassword: '',
          rememberPassword: true
        };
      } catch (error) {
        console.log('Failed to load saved registration data');
      }
    } else if (userCredentials && vendorData) {
      try {
        const credentials = JSON.parse(userCredentials);
        const vendor = JSON.parse(vendorData);
        
        if (credentials.userType === 'vendor') {
          toast({
            title: "Profile Autofilled ✨",
            description: "Registration form filled with your saved profile data.",
            duration: 2000
          });
          
          isInitializedRef.current = true;
          return {
            firstName: vendor.firstName || '',
            lastName: vendor.lastName || '',
            email: vendor.email || credentials.email || '',
            phoneNumber: vendor.phone?.replace('+27', '') || '',
            countryCode: '+27',
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

  // Enhanced auto-save with better debouncing and race condition prevention
  useEffect(() => {
    // Only save if there's meaningful data and enough time has passed
    const hasData = formData.firstName || formData.lastName || formData.email || formData.companyName;
    const now = Date.now();
    
    if (!hasData || (now - lastSaveTimeRef.current) < 1000) {
      return;
    }

    // Clear existing timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Set new timeout for debounced save
    saveTimeoutRef.current = setTimeout(() => {
      try {
        // Exclude passwords from auto-save for security
        const dataToSave = { ...formData };
        delete dataToSave.password;
        delete dataToSave.confirmPassword;
        
        localStorage.setItem('vendorRegistrationDraft', JSON.stringify({
          ...dataToSave,
          countryCode: '+27',
          rememberPassword: true
        }));
        
        lastSaveTimeRef.current = now;
        console.log('✅ Registration data auto-saved');
        
        // Only show toast occasionally to avoid spam
        if (now - lastSaveTimeRef.current > 10000) {
          localStorage.setItem('lastVendorSaveTime', now.toString());
        }
      } catch (error) {
        console.error('Auto-save failed:', error);
      }
    }, 2000); // Increased debounce time

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [formData]); // Simple dependency

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  return { loadSavedData };
};
