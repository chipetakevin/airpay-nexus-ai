
export const useReceiptFormatter = () => {
  const generateTransactionId = (timestamp: string) => {
    return 'AP' + timestamp.replace(/[^0-9]/g, '').slice(-8);
  };

  const capitalizeWords = (str: string) => {
    return str.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
  };

  const getCustomerDisplayName = () => {
    const credentials = localStorage.getItem('userCredentials');
    const userData = localStorage.getItem('onecardUser');
    let displayName = 'Valued Customer';
    
    // First try to get name from user credentials (includes firstName and lastName from registration)
    if (credentials) {
      try {
        const parsedCredentials = JSON.parse(credentials);
        
        if (parsedCredentials.firstName && parsedCredentials.lastName) {
          displayName = `${capitalizeWords(parsedCredentials.firstName)} ${capitalizeWords(parsedCredentials.lastName)}`;
          return displayName;
        }
      } catch (error) {
        console.error('Error parsing credentials:', error);
      }
    }
    
    // Fallback to user data if credentials don't have name
    if (userData) {
      try {
        const parsedUserData = JSON.parse(userData);
        
        if (parsedUserData.firstName && parsedUserData.lastName) {
          displayName = `${capitalizeWords(parsedUserData.firstName)} ${capitalizeWords(parsedUserData.lastName)}`;
        } else if (parsedUserData.firstName) {
          displayName = capitalizeWords(parsedUserData.firstName);
        } else if (parsedUserData.email) {
          displayName = capitalizeWords(parsedUserData.email.split('@')[0]);
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
    
    return displayName;
  };

  return {
    generateTransactionId,
    capitalizeWords,
    getCustomerDisplayName
  };
};
