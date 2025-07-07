
import { useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { usePermanentAuth } from './usePermanentAuth';
import { VendorFormData } from '@/types/vendorRegistration';
import { handleVendorRegistrationSubmit } from '@/utils/vendorRegistrationSubmit';

export const useVendorFormSubmission = () => {
  const { toast } = useToast();
  const { createPermanentSession } = usePermanentAuth();

  const processFormSubmission = useCallback(async (
    formData: VendorFormData,
    savePermanently: (data: VendorFormData) => Promise<boolean>
  ): Promise<void> => {
    try {
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
      
      // Create permanent session that NEVER expires
      const userCredentials = {
        email: formData.email,
        password: formData.password,
        userType: 'vendor',
        phone: finalPhone,
        permanentSession: true,
        // Metadata for role assignment in database trigger
        user_metadata: {
          userType: 'vendor',
          firstName: formData.firstName,
          lastName: formData.lastName,
          companyName: formData.companyName,
          phone: finalPhone
        }
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

      // Store permanent session flags
      localStorage.setItem('registrationCompleted', 'true');
      localStorage.setItem('userAuthenticated', 'true');
      localStorage.setItem('permanentSession', 'true');
      localStorage.setItem('sessionType', 'permanent');
      
      // Create permanent session that never expires
      createPermanentSession(userCredentials, userData);
      
      // Save form data permanently
      try {
        await savePermanently(updatedFormData);
      } catch (saveError) {
        console.warn('⚠️ Form data save failed, but continuing with registration:', saveError);
      }
      
      console.log('✅ Vendor registration completed with PERMANENT session - never expires');
      
      // Trigger automatic collapse by dispatching storage event
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'registrationCompleted',
        newValue: 'true'
      }));
      
      // Show success message
      toast({
        title: "Registration Successful! 🎉",
        description: "Your vendor account has been created successfully.",
        duration: 3000
      });
      
      console.log('📋 Registration form will automatically collapse to summary view');
    } catch (error) {
      console.error('❌ Registration submission error:', error);
      throw new Error('Registration failed. Please try again.');
    }
  }, [createPermanentSession, toast]);

  return {
    processFormSubmission
  };
};
