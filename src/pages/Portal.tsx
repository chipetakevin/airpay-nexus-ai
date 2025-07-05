import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import PortalHeader from '@/components/PortalHeader';
import PortalTabs from '@/components/PortalTabs';
import { useToast } from "@/hooks/use-toast"
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';
import FloatingPlatformSwitcher from '@/components/navigation/FloatingPlatformSwitcher';
import PermanentAuthStatus from '@/components/auth/PermanentAuthStatus';
import { useSessionManager } from '@/hooks/useSessionManager';
import { usePersistentAuth } from '@/components/auth/PersistentAuthProvider';
import { MobileNavigation } from '@/components/mobile/MobileNavigation';
import { MobileOnly, DesktopOnly } from '@/components/layout/ResponsiveRenderer';
import { useMobileDetection } from '@/hooks/useMobileDetection';

type UserType = 'customer' | 'vendor' | 'admin' | null;

const Portal = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('onecard');
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
        navigate('?tab=onecard', { replace: true });
        setActiveTab('onecard');
      } else if (tabParam === 'deals') {
        // Redirect deals tab to onecard since deals tab is removed
        navigate('?tab=onecard', { replace: true });
        setActiveTab('onecard');
      } else if (tabParam !== activeTab) {
        setActiveTab(tabParam);
      }
    } catch (error) {
      console.error("Error handling tab navigation:", error);
      setActiveTab('onecard');
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
    setActiveTab('onecard');
    navigate('?tab=onecard', { replace: true });
  };

  // Enhanced isTabAllowed function for seamless navigation
  const isTabAllowed = (tabValue: string) => {
    try {
      // Always allow registration, vendor, and contractor tabs for seamless navigation
      if (['registration', 'vendor', 'contractor'].includes(tabValue)) {
        console.log(`✅ Always allowed tab: ${tabValue}`);
        return true;
      }
      
      // Always allow admin registration tab
      if (tabValue === 'admin-reg') return true;
      
      const isAuthenticated = localStorage.getItem('userAuthenticated') === 'true';
      const storedCredentials = localStorage.getItem('userCredentials');
      
      if (!isAuthenticated) {
        return ['registration', 'vendor', 'admin-reg', 'onecard'].includes(tabValue);
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
            return true; // Always accessible for registration purposes
          case 'onecard':
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

      return tabValue === 'onecard';
    } catch (error) {
      console.error('Error checking tab permissions:', error);
      return ['onecard', 'registration', 'vendor', 'contractor'].includes(tabValue);
    }
  };

  // Enhanced handleTabChange for seamless navigation
  const handleTabChange = (value: string) => {
    try {
      console.log(`🔄 Attempting to change to tab: ${value}`);
      
      // Always allow seamless navigation between core tabs
      if (['registration', 'vendor', 'contractor'].includes(value)) {
        console.log(`✅ Core tab access granted: ${value}`);
        setActiveTab(value);
        navigate(`?tab=${value}`, { replace: true });
        return;
      }

      if (isTabAllowed(value)) {
        console.log(`✅ Tab access granted: ${value}`);
        setActiveTab(value);
        navigate(`?tab=${value}`, { replace: true });
      } else {
        console.log(`❌ Tab access denied: ${value}`);
        toast({
          title: "Tab Access",
          description: "Vendor registration is always accessible. Complete registration to unlock more features!",
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
    <div className="min-h-screen overflow-y-auto">
      {/* Desktop Header */}
      <DesktopOnly>
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
          <PortalHeader userType={userType} resetUserType={resetUserType} />
        </div>
      </DesktopOnly>
      
      {/* Mobile Header - Integrated with mobile layout */}
      <MobileOnly>
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2">
          <PortalHeader userType={userType} resetUserType={resetUserType} />
        </div>
      </MobileOnly>
      
      <main className="container mx-auto px-2 sm:px-4 -mt-1 pb-8 md:pb-8">
        {/* Add extra bottom padding on mobile to account for floating elements */}
        <div className="pb-20 md:pb-0">
          <PortalTabs 
            activeTab={activeTab}
            showAdminTab={showAdminTab}
            isTabAllowed={isTabAllowed}
            handleTabChange={handleTabChange}
            setIsAdminAuthenticated={setIsAdminAuthenticated}
            isUnifiedProfile={isUnifiedProfile}
            isAuthenticated={isAuthenticated}
          />
        </div>
      </main>
      
      {/* Device-Specific Navigation */}
      <MobileOnly>
        <MobileNavigation />
      </MobileOnly>
      
      {/* Desktop-Only Features */}
      <DesktopOnly>
        <WhatsAppFloatingButton />
        
        {/* Add Floating Platform Switcher */}
        {activeTab === 'onecard' && (
          <FloatingPlatformSwitcher currentPlatform="portal" />
        )}
      </DesktopOnly>

      {/* Mobile-Only Features */}
      <MobileOnly>
        {/* Mobile WhatsApp Button - positioned differently for mobile */}
        <div className="fixed bottom-20 right-4 z-40">
          <WhatsAppFloatingButton />
        </div>
      </MobileOnly>

      {/* Permanent Authentication Status */}
      <PermanentAuthStatus />
    </div>
  );
};

export default Portal;
