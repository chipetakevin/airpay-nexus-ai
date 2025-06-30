
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
    savePermanently: (data: VendorFormData) => Promise<void>
  ): Promise<void> => {
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
  }, [createPermanentSession, toast]);

  return {
    processFormSubmission
  };
};
