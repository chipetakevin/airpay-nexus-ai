
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAccessControl } from './useAccessControl';
import { useIntelligentReporting } from './useIntelligentReporting';

type UserType = 'customer' | 'vendor' | 'admin' | null;

export const usePortalState = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('deals');
  const [userType, setUserType] = useState<UserType>(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isUnifiedProfile, setIsUnifiedProfile] = useState(false);
  
  const { checkTabAccess, isAuthenticated } = useAccessControl();
  const { showErrorReport } = useIntelligentReporting();

  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuthenticated');
    const credentials = localStorage.getItem('userCredentials');
    
    if (adminAuth === 'true') {
      setIsAdminAuthenticated(true);
      setUserType('admin');
    }

    if (credentials) {
      try {
        const userCreds = JSON.parse(credentials);
        setIsUnifiedProfile(userCreds.isUnifiedProfile || false);
        setUserType(userCreds.userType);
      } catch (error) {
        console.error('Error parsing credentials:', error);
      }
    }

    const tabParam = searchParams.get('tab');
    if (tabParam) {
      // Check if user has access to this tab
      if (!checkTabAccess(tabParam)) {
        // Redirect to appropriate registration or show access denied
        if (!isAuthenticated) {
          setActiveTab('registration');
          showErrorReport(
            'Please complete registration to access this service.',
            '/portal?tab=registration',
            'Complete Registration'
          );
        } else {
          setActiveTab('deals'); // Default to deals for authenticated users
          showErrorReport(
            'Access denied. You do not have permission to access this section.',
            '/portal?tab=deals',
            'Go to Deals'
          );
        }
      } else {
        setActiveTab(tabParam);
      }
    } else {
      setActiveTab(isAuthenticated ? 'deals' : 'registration');
    }
  }, [searchParams, checkTabAccess, isAuthenticated, showErrorReport]);

  const handleTabChange = (value: string) => {
    // Check access before allowing tab change
    if (!checkTabAccess(value)) {
      if (!isAuthenticated) {
        showErrorReport(
          'Registration required to access this service.',
          '/portal?tab=registration',
          'Register Now'
        );
      } else {
        showErrorReport(
          'Access denied. You do not have permission to access this section.',
          undefined,
          'OK'
        );
      }
      return;
    }

    setActiveTab(value);
  };

  const resetUserType = () => {
    setUserType(null);
    setIsUnifiedProfile(false);
    setActiveTab('registration');
  };

  return {
    activeTab,
    userType,
    isAdminAuthenticated,
    isUnifiedProfile,
    showAdminTab: isAdminAuthenticated,
    isTabAllowed: checkTabAccess,
    handleTabChange,
    resetUserType,
    setIsAdminAuthenticated
  };
};
