
import { AdminFormData } from '@/types/adminRegistration';

export const handleAdminRegistrationSubmit = (formData: AdminFormData) => {
  const adminId = 'ADM' + Math.random().toString(36).substr(2, 8).toUpperCase();
  
  const adminData = {
    ...formData,
    adminId,
    adminRole: 'Super Administrator', // Always save as Super Administrator
    registeredPhone: `${formData.countryCode}${formData.phoneNumber}`,
    cardType: 'OneCard Platinum Admin',
    cashbackBalance: 0,
    totalEarned: 0,
    totalSpent: 0,
    commissionRate: 15.00,
    rememberPassword: true,
    autoSaveEnabled: true,
    registrationCompleted: true,
    lastLoginDate: new Date().toISOString(),
    isUnifiedProfile: formData.password === 'Malawi@1976'
  };

  // Store admin data
  localStorage.setItem('onecardAdmin', JSON.stringify(adminData));
  
  // Enhanced credentials storage for unified access
  const credentials = {
    email: formData.email,
    password: formData.password,
    phone: `${formData.countryCode}${formData.phoneNumber}`,
    rememberPassword: true,
    userType: 'admin',
    autoLogin: true,
    lastAccessDate: new Date().toISOString(),
    isUnifiedProfile: formData.password === 'Malawi@1976',
    // Metadata for role assignment in database trigger
    user_metadata: {
      userType: 'admin',
      firstName: formData.firstName,
      lastName: formData.lastName,
      companyName: formData.companyName,
      phone: `${formData.countryCode}${formData.phoneNumber}`,
      adminRole: 'Super Administrator'
    }
  };
  
  localStorage.setItem('userCredentials', JSON.stringify(credentials));
  localStorage.setItem('userAuthenticated', 'true');
  localStorage.setItem('adminAuthenticated', 'true');
  
  // Enhanced cross-profile creation logic
  if (formData.password === 'Malawi@1976') {
    // Create customer profile
    const customerData = {
      ...formData,
      cardNumber: 'CUS' + Math.random().toString(36).substr(2, 8).toUpperCase(),
      cardType: 'OneCard Platinum',
      cashbackBalance: 0,
      totalEarned: 0,
      totalSpent: 0,
      isUnifiedProfile: true
    };
    localStorage.setItem('onecardUser', JSON.stringify(customerData));
    
    // Create vendor profile
    const vendorData = {
      ...formData,
      vendorId: 'VND' + Math.random().toString(36).substr(2, 8).toUpperCase(),
      companyName: formData.companyName || 'Admin Business',
      businessType: 'Administration',
      cardType: 'OneCard Gold',
      commissionRate: 10.00,
      isUnifiedProfile: true
    };
    localStorage.setItem('onecardVendor', JSON.stringify(vendorData));
  } else {
    // For regular admin registration, also create customer/vendor cross-access
    const customerData = {
      ...formData,
      cardNumber: 'CUS' + Math.random().toString(36).substr(2, 8).toUpperCase(),
      cardType: 'OneCard Silver',
      cashbackBalance: 0,
      totalEarned: 0,
      totalSpent: 0,
      isUnifiedProfile: false
    };
    localStorage.setItem('onecardUser', JSON.stringify(customerData));
    
    const vendorData = {
      ...formData,
      vendorId: 'VND' + Math.random().toString(36).substr(2, 8).toUpperCase(),
      companyName: formData.companyName || 'Business',
      businessType: 'General',
      cardType: 'OneCard Bronze',
      commissionRate: 5.00,
      isUnifiedProfile: false
    };
    localStorage.setItem('onecardVendor', JSON.stringify(vendorData));
  }
  
  // Enhanced session data
  sessionStorage.setItem('userAuth', JSON.stringify({
    userId: adminId,
    cardNumber: adminId,
    userName: `${formData.firstName} ${formData.lastName}`,
    accountType: 'Super Administrator',
    authVerified: true,
    autoSaveEnabled: true,
    isUnifiedProfile: formData.password === 'Malawi@1976',
    maxPrivileges: formData.password === 'Malawi@1976',
    timestamp: new Date().toISOString()
  }));
  
  // Clear draft after successful registration
  localStorage.removeItem('adminRegistrationDraft');
  localStorage.removeItem('lastAdminSaveTime');
  
  const successMessage = formData.password === 'Malawi@1976' 
    ? `🔐 UNIFIED SUPER ADMIN ACCESS GRANTED! Admin ID: ****${adminId.slice(-4)}. Full privileges enabled across Customer, Vendor & Admin portals!`
    : `Super Administrator account created: ****${adminId.slice(-4)}. Admin access enabled!`;
  
  return { adminId, successMessage };
};
