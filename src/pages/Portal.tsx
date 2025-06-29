import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import PortalHeader from '@/components/PortalHeader';
import PortalTabs from '@/components/PortalTabs';
import { useToast } from "@/hooks/use-toast"
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';
import FloatingPlatformSwitcher from '@/components/navigation/FloatingPlatformSwitcher';
import { useSessionManager } from '@/hooks/useSessionManager';
import { usePersistentAuth } from '@/components/auth/PersistentAuthProvider';

type UserType = 'customer' | 'vendor' | 'admin' | null;

const Portal = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('deals');
  const [userType, setUserType] = useState<UserType>(null);
  const [showAdminTab, setShowAdminTab] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isUnifiedProfile, setIsUnifiedProfile] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Initialize session managers
  useSessionManager();
  const { isAuthenticated, currentUser } = usePersistentAuth();

  useEffect(() => {
    // Update document title
    document.title = 'Divine Mobile Portal - Smart Mobile Services';
  }, []);

  useEffect(() => {
    if (currentUser) {
      setUserType(currentUser.userType);
      setIsUnifiedProfile(currentUser.isUnifiedProfile);
    } else {
      // Fallback to legacy auth check
      try {
        const storedUserCredentials = localStorage.getItem('userCredentials');
        
        if (storedUserCredentials) {
          const userCredentials = JSON.parse(storedUserCredentials);
          setUserType(userCredentials.userType || null);
          setIsUnifiedProfile(userCredentials.password === 'Malawi@1976');
        } else {
          setUserType(null);
          setIsUnifiedProfile(false);
        }
      } catch (error) {
        console.error("Error parsing user credentials:", error);
        setUserType(null);
        setIsUnifiedProfile(false);
      }
    }
  }, [currentUser, isAuthenticated]);

  useEffect(() => {
    try {
      const tabParam = searchParams.get('tab');
      
      if (!tabParam) {
        navigate('?tab=deals', { replace: true });
        setActiveTab('deals');
      } else if (tabParam !== activeTab) {
        setActiveTab(tabParam);
      }
    } catch (error) {
      console.error("Error handling tab navigation:", error);
      setActiveTab('deals');
    }
  }, [searchParams, navigate, activeTab]);

  useEffect(() => {
    try {
      const isAuthenticated = localStorage.getItem('userAuthenticated') === 'true';
      const storedCredentials = localStorage.getItem('userCredentials');
      
      if (isAuthenticated && storedCredentials) {
        const credentials = JSON.parse(storedCredentials);
        if (credentials.userType === 'admin' || credentials.password === 'Malawi@1976') {
          setShowAdminTab(true);
          setIsAdminAuthenticated(true);
        }
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
    }
  }, [userType]);

  const resetUserType = () => {
    setUserType(null);
    setIsUnifiedProfile(false);
    setActiveTab('deals');
    navigate('?tab=deals', { replace: true });
  };

  // Enhanced isTabAllowed function for seamless navigation
  const isTabAllowed = (tabValue: string) => {
    try {
      // Always allow deals and registration tabs for seamless navigation
      if (['deals', 'registration'].includes(tabValue)) return true;
      
      // Always allow registration tabs for all users
      if (['vendor', 'admin-reg'].includes(tabValue)) return true;
      
      const isAuthenticated = localStorage.getItem('userAuthenticated') === 'true';
      const storedCredentials = localStorage.getItem('userCredentials');
      
      if (!isAuthenticated) {
        return ['registration', 'vendor', 'admin-reg', 'deals'].includes(tabValue);
      }

      if (storedCredentials) {
        const credentials = JSON.parse(storedCredentials);
        const currentUserType = credentials.userType;
        const isUnified = credentials.password === 'Malawi@1976';

        // Unified profiles have access to all tabs
        if (isUnified) return true;

        // Enhanced cross-access for all user types
        switch (tabValue) {
          case 'registration':
          case 'vendor':
            return ['customer', 'vendor', 'admin'].includes(currentUserType);
          case 'onecard':
          case 'deals':
            return true; // Available to all authenticated users
          case 'unified-reports':
            return isUnified;
          case 'admin-reg':
            return currentUserType === 'admin' || isUnified;
          case 'admin':
            return (currentUserType === 'admin' && isAdminAuthenticated) || isUnified;
          default:
            return false;
        }
      }

      return tabValue === 'deals';
    } catch (error) {
      console.error('Error checking tab permissions:', error);
      return ['deals', 'registration'].includes(tabValue);
    }
  };

  // Enhanced handleTabChange for seamless navigation
  const handleTabChange = (value: string) => {
    try {
      // Always allow seamless navigation between deals and registration
      if (['deals', 'registration'].includes(value)) {
        setActiveTab(value);
        navigate(`?tab=${value}`, { replace: true });
        return;
      }

      if (isTabAllowed(value)) {
        setActiveTab(value);
        navigate(`?tab=${value}`, { replace: true });
      } else {
        toast({
          title: "Access Available",
          description: "All registration tabs are accessible to everyone. Complete registration to unlock more features!",
          variant: "default"
        });
      }
    } catch (error) {
      console.error('Error changing tabs:', error);
      toast({
        title: "Navigation Error",
        description: "There was an issue changing tabs. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2">
        <PortalHeader userType={userType} resetUserType={resetUserType} />
      </div>
      
      <main className="container mx-auto px-2 sm:px-4 -mt-1">
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
      
      {/* Add Floating Platform Switcher */}
      {activeTab === 'deals' && (
        <FloatingPlatformSwitcher currentPlatform="portal" />
      )}
    </div>
  );
};

export default Portal;
