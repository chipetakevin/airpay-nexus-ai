
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import PortalHeader from '@/components/PortalHeader';
import PortalTabs from '@/components/PortalTabs';
import { useToast } from "@/hooks/use-toast"
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';
import { useSessionManager } from '@/hooks/useSessionManager';
import { usePersistentAuth } from '@/hooks/usePersistentAuth';

type UserType = 'customer' | 'vendor' | 'admin' | null;

const Portal = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('deals'); // Always default to deals
  const [userType, setUserType] = useState<UserType>(null);
  const [showAdminTab, setShowAdminTab] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isUnifiedProfile, setIsUnifiedProfile] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Initialize session managers
  useSessionManager();
  const { isSessionValid } = usePersistentAuth();

  useEffect(() => {
    const storedUserCredentials = localStorage.getItem('userCredentials');
    const authStatus = localStorage.getItem('userAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
    
    if (storedUserCredentials) {
      try {
        const userCredentials = JSON.parse(storedUserCredentials);
        setUserType(userCredentials.userType || null);
        setIsUnifiedProfile(userCredentials.password === 'Malawi@1976');
      } catch (error) {
        console.error("Error parsing user credentials from localStorage:", error);
        setUserType(null);
        setIsUnifiedProfile(false);
      }
    } else {
      setUserType(null);
      setIsUnifiedProfile(false);
    }
  }, []);

  useEffect(() => {
    // Always default to deals tab on initial load
    const tabParam = searchParams.get('tab');
    
    if (!tabParam) {
      // No tab specified, default to deals and update URL
      navigate('?tab=deals', { replace: true });
      setActiveTab('deals');
    } else if (tabParam !== activeTab) {
      // Tab specified in URL, use it
      setActiveTab(tabParam);
    }
  }, [searchParams, navigate]);

  useEffect(() => {
    // Show admin tab based on authentication and user type
    const isAuthenticated = localStorage.getItem('userAuthenticated') === 'true';
    const storedCredentials = localStorage.getItem('userCredentials');
    
    if (isAuthenticated && storedCredentials) {
      try {
        const credentials = JSON.parse(storedCredentials);
        if (credentials.userType === 'admin' || credentials.password === 'Malawi@1976') {
          setShowAdminTab(true);
          setIsAdminAuthenticated(true);
        }
      } catch (error) {
        console.error('Error parsing credentials:', error);
      }
    }
  }, [userType]);

  const resetUserType = () => {
    setUserType(null);
    setIsUnifiedProfile(false);
    setIsAuthenticated(false);
    setActiveTab('deals'); // Always return to deals when resetting
    navigate('?tab=deals', { replace: true });
  };

  const isTabAllowed = (tabValue: string) => {
    // Always allow deals tab for everyone - this is the default landing page
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
        const isUnified = credentials.password === 'Malawi@1976';

        // Unified profiles (admin password users) have access to all tabs
        if (isUnified) {
          return true;
        }

        // Enhanced vendor/customer cross-access
        switch (tabValue) {
          case 'registration':
            // Vendors can also be customers
            return ['customer', 'vendor', 'admin'].includes(currentUserType);
          case 'vendor':
            // Customers can also be vendors  
            return ['customer', 'vendor', 'admin'].includes(currentUserType);
          case 'onecard':
            return true; // Available to all authenticated users
          case 'unified-reports':
            return isUnified; // Only for unified profile users
          case 'deals':
            return true; // Always available - default landing page
          case 'admin-reg':
            return currentUserType === 'admin' || isUnified;
          case 'admin':
            return (currentUserType === 'admin' && isAdminAuthenticated) || isUnified;
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
      // Update URL when user explicitly changes tabs
      navigate(`?tab=${value}`, { replace: true });
    } else {
      toast({
        title: "Access Restricted",
        description: isUnifiedProfile 
          ? "This tab is temporarily unavailable" 
          : "Vendors can access Customer features and vice versa. Only admins have full access.",
        variant: "destructive"
      });
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
          isUnifiedProfile={isUnifiedProfile}
          isAuthenticated={isAuthenticated}
        />
      </main>
      
      <WhatsAppFloatingButton />
    </div>
  );
};

export default Portal;
