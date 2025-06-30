
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
      permanentSession: true // Flag for permanent session
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
    
    // Save form data permanently and handle the boolean return
    const saveSuccess = await savePermanently(updatedFormData);
    if (!saveSuccess) {
      console.warn('⚠️ Form data save returned false, but continuing with registration');
    }
    
    console.log('✅ Vendor registration completed with PERMANENT session - never expires');
    
    // Trigger automatic collapse by dispatching storage event
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'registrationCompleted',
      newValue: 'true'
    }));
    
    // Silent success - no toast, form will auto-collapse
    console.log('📋 Registration form will automatically collapse to summary view');
  }, [createPermanentSession, toast]);

  return {
    processFormSubmission
  };
};
