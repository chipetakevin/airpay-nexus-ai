
export const useUserInfo = () => {
  const getCurrentUserInfo = () => {
    try {
      const credentials = localStorage.getItem('userCredentials');
      if (credentials) {
        const parsedCredentials = JSON.parse(credentials);
        let userData = null;
        let userId = '';
        
        if (parsedCredentials.userType === 'customer') {
          userData = localStorage.getItem('onecardUser');
          if (userData) {
            const parsedUserData = JSON.parse(userData);
            userId = parsedUserData.cardNumber || 'customer_' + Date.now();
          }
        } else if (parsedCredentials.userType === 'vendor') {
          userData = localStorage.getItem('onecardVendor');
          if (userData) {
            const parsedUserData = JSON.parse(userData);
            userId = parsedUserData.vendorId || 'vendor_' + Date.now();
          }
        } else if (parsedCredentials.userType === 'admin') {
          userData = localStorage.getItem('onecardAdmin');
          if (userData) {
            const parsedUserData = JSON.parse(userData);
            userId = parsedUserData.adminId || 'admin_' + Date.now();
          }
        }
        
        return {
          userType: parsedCredentials.userType,
          userId: userId,
          email: parsedCredentials.email
        };
      }
    } catch (error) {
      console.error('Error getting current user info:', error);
    }
    
    return {
      userType: 'customer',
      userId: 'anonymous_' + Date.now(),
      email: ''
    };
  };

  return {
    getCurrentUserInfo
  };
};
