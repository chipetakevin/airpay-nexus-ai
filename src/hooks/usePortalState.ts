
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

type UserType = 'customer' | 'vendor' | 'admin' | null;

export const usePortalState = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('registration');
  const [userType, setUserType] = useState<UserType>(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuthenticated');
    if (adminAuth === 'true') {
      setIsAdminAuthenticated(true);
      setUserType('admin');
    }

    const tabParam = searchParams.get('tab');
    if (tabParam) {
      setActiveTab(tabParam);
      
      // Set user type based on tab
      if (tabParam === 'registration') {
        setUserType('customer');
      } else if (tabParam === 'vendor') {
        setUserType('vendor');
      } else if (tabParam === 'admin-reg' || tabParam === 'admin') {
        setUserType('admin');
      }
    }
  }, [searchParams]);

  const showAdminTab = isAdminAuthenticated || searchParams.get('tab') === 'admin';

  const isTabAllowed = (tabValue: string): boolean => {
    if (userType === 'admin') return true;
    
    if (userType === 'customer') {
      return ['registration', 'onecard'].includes(tabValue);
    }
    
    if (userType === 'vendor') {
      return tabValue === 'vendor';
    }
    
    return true; // No restriction if no user type selected yet
  };

  const handleTabChange = (value: string) => {
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
    setActiveTab('registration');
  };

  return {
    activeTab,
    userType,
    isAdminAuthenticated,
    showAdminTab,
    isTabAllowed,
    handleTabChange,
    resetUserType,
    setIsAdminAuthenticated
  };
};
