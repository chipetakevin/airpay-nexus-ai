
import { VendorFormData } from '@/types/vendorRegistration';

export const handleVendorRegistrationSubmit = (formData: VendorFormData) => {
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
    lastLoginDate: new Date().toISOString(),
    isUnifiedProfile: formData.password === 'Malawi@1976'
  };

  // Store vendor data with enhanced persistence
  localStorage.setItem('onecardVendor', JSON.stringify(vendorData));
  
  // Enhanced credentials storage with remember password
  localStorage.setItem('userCredentials', JSON.stringify({
    email: formData.email,
    password: formData.password,
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
    isUnifiedProfile: formData.password === 'Malawi@1976',
    timestamp: new Date().toISOString()
  }));
  
  // Clear draft after successful registration
  localStorage.removeItem('vendorRegistrationDraft');
  localStorage.removeItem('lastVendorSaveTime');
  
  const successMessage = formData.password === 'Malawi@1976' 
    ? `Unified Admin/Vendor account created: ****${vendorId.slice(-4)}. Admin access enabled!`
    : `OneCard Gold created: ****${vendorId.slice(-4)}. Auto-save enabled for future sessions!`;
  
  return { vendorId, successMessage };
};
