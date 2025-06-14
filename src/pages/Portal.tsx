
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import PortalHeader from '@/components/PortalHeader';
import PortalTabs from '@/components/PortalTabs';
import { useToast } from "@/hooks/use-toast"
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';

type UserType = 'customer' | 'vendor' | 'admin' | null;

const Portal = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('deals'); // Always default to deals
  const [userType, setUserType] = useState<UserType>(null);
  const [showAdminTab, setShowAdminTab] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast()

  useEffect(() => {
    const storedUserCredentials = localStorage.getItem('userCredentials');
    if (storedUserCredentials) {
      try {
        const userCredentials = JSON.parse(storedUserCredentials);
        setUserType(userCredentials.userType || null);
      } catch (error) {
        console.error("Error parsing user credentials from localStorage:", error);
        setUserType(null);
      }
    } else {
      setUserType(null);
    }
  }, []);

  useEffect(() => {
    // Always prioritize deals tab, but allow URL tab parameter to override if specified
    const tabParam = searchParams.get('tab');
    if (tabParam && tabParam !== 'deals') {
      setActiveTab(tabParam);
    } else {
      setActiveTab('deals'); // Force deals as default
    }
  }, [searchParams]);

  useEffect(() => {
    // Update the URL when the active tab changes
    navigate(`?tab=${activeTab}`, { replace: true });
  }, [activeTab, navigate]);

  useEffect(() => {
    // Show admin tab based on authentication and user type
    const isAuthenticated = localStorage.getItem('userAuthenticated') === 'true';
    const storedCredentials = localStorage.getItem('userCredentials');
    
    if (isAuthenticated && storedCredentials) {
      try {
        const credentials = JSON.parse(storedCredentials);
        if (credentials.userType === 'admin') {
          setShowAdminTab(true);
        }
      } catch (error) {
        console.error('Error parsing credentials:', error);
      }
    }
  }, [userType]);

  const resetUserType = () => {
    setUserType(null);
    setActiveTab('deals'); // Always return to deals when resetting
  };

  const isTabAllowed = (tabValue: string) => {
    // Always allow deals tab for everyone
    if (tabValue === 'deals') return true;
    
    const isAuthenticated = localStorage.getItem('userAuthenticated') === 'true';
    const storedCredentials = localStorage.getItem('userCredentials');
    
    if (!isAuthenticated) {
      return ['registration', 'vendor', 'admin-reg', 'deals'].includes(tabValue);
    }

    if (storedCredentials) {
      try {
        const credentials = JSON.parse(storedCredentials);
        const currentUserType = credentials.userType;

        switch (tabValue) {
          case 'registration':
            return currentUserType === 'customer';
          case 'vendor':
            return currentUserType === 'vendor';
          case 'onecard':
            return true; // Available to all authenticated users
          case 'deals':
            return true; // Always available
          case 'admin-reg':
            return currentUserType === 'admin';
          case 'admin':
            return currentUserType === 'admin' && isAdminAuthenticated;
          default:
            return false;
        }
      } catch (error) {
        console.error('Error parsing credentials:', error);
        return tabValue === 'deals'; // Fallback to deals only
      }
    }

    return tabValue === 'deals'; // Fallback to deals only
  };

  const handleTabChange = (value: string) => {
    if (isTabAllowed(value)) {
      setActiveTab(value);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2">
        <PortalHeader userType={userType} resetUserType={resetUserType} />
      </div>
      
      <main className="container mx-auto px-4 -mt-1">
        <PortalTabs 
          activeTab={activeTab}
          showAdminTab={showAdminTab}
          isTabAllowed={isTabAllowed}
          handleTabChange={handleTabChange}
          setIsAdminAuthenticated={setIsAdminAuthenticated}
        />
      </main>
      
      <WhatsAppFloatingButton />
    </div>
  );
};

export default Portal;
