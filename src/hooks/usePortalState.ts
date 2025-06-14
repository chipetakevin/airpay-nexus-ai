
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

type UserType = 'customer' | 'vendor' | 'admin' | null;

export const usePortalState = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('deals');
  const [userType, setUserType] = useState<UserType>(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isUnifiedProfile, setIsUnifiedProfile] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuthenticated');
    const credentials = localStorage.getItem('userCredentials');
    
    if (adminAuth === 'true') {
      setIsAdminAuthenticated(true);
      setUserType('admin');
    }

    // Check for unified profile access
    if (credentials) {
      try {
        const userCreds = JSON.parse(credentials);
        setIsUnifiedProfile(userCreds.isUnifiedProfile || false);
      } catch (error) {
        console.error('Error parsing credentials:', error);
      }
    }

    const tabParam = searchParams.get('tab');
    if (tabParam) {
      setActiveTab(tabParam);
      
      // Set user type based on tab for non-unified users
      if (!isUnifiedProfile) {
        if (tabParam === 'registration') {
          setUserType('customer');
        } else if (tabParam === 'vendor') {
          setUserType('vendor');
        } else if (tabParam === 'admin-reg' || tabParam === 'admin') {
          setUserType('admin');
        }
      }
    } else {
      // Default to deals tab for authenticated users
      const isAuthenticated = localStorage.getItem('userAuthenticated') === 'true';
      if (isAuthenticated) {
        setActiveTab('deals');
      }
    }
  }, [searchParams, isUnifiedProfile]);

  const showAdminTab = isAdminAuthenticated || searchParams.get('tab') === 'admin';

  const isTabAllowed = (tabValue: string): boolean => {
    // Unified profiles have access to all tabs
    if (isUnifiedProfile) {
      return true;
    }

    // Admin users have access to all tabs
    if (userType === 'admin') {
      return true;
    }
    
    if (userType === 'customer') {
      return ['registration', 'onecard', 'deals'].includes(tabValue);
    }
    
    if (userType === 'vendor') {
      return ['vendor', 'onecard', 'deals'].includes(tabValue);
    }
    
    return true; // No restriction if no user type selected yet
  };

  const handleTabChange = (value: string) => {
    // For unified profiles, allow all tabs without restriction
    if (isUnifiedProfile) {
      setActiveTab(value);
      return;
    }

    // If user type is not selected yet, set it based on tab selection
    if (!userType) {
      if (value === 'registration') {
        setUserType('customer');
      } else if (value === 'vendor') {
        setUserType('vendor');
      } else if (value === 'admin-reg') {
        setUserType('admin');
      }
    }

    // Check if user has access to the tab
    if (!isTabAllowed(value)) {
      toast({
        title: "Access Restricted",
        description: "You can only access tabs relevant to your registration type.",
        variant: "destructive"
      });
      return;
    }

    // Check admin portal access
    if (value === 'admin' && !isAdminAuthenticated) {
      toast({
        title: "Access Denied",
        description: "Please complete admin registration to access the admin portal.",
        variant: "destructive"
      });
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
    showAdminTab,
    isTabAllowed,
    handleTabChange,
    resetUserType,
    setIsAdminAuthenticated
  };
};
