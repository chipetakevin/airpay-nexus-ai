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

type UserType = 'customer' | 'vendor' | 'admin' | null;

const Portal = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('deals');
  const [userType, setUserType] = useState<UserType>(null);
  const [showAdminTab, setShowAdminTab] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isUnifiedProfile, setIsUnifiedProfile] = useState(false);
  const [showAdminBanner, setShowAdminBanner] = useState(false);
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

  // Enhanced isTabAllowed function for seamless navigation with admin controls
  const isTabAllowed = (tabValue: string) => {
    try {
      // Always allow deals, registration, and vendor tabs for seamless navigation
      if (['deals', 'registration', 'vendor'].includes(tabValue)) {
        console.log(`✅ Always allowed tab: ${tabValue}`);
        return true;
      }
      
      const isAuthenticated = localStorage.getItem('userAuthenticated') === 'true';
      const storedCredentials = localStorage.getItem('userCredentials');
      const adminData = localStorage.getItem('onecardAdmin');
      
      // Check if user is registered admin
      const isRegisteredAdmin = storedCredentials && adminData ? 
        (() => {
          try {
            const credentials = JSON.parse(storedCredentials);
            return credentials.userType === 'admin' && credentials.password === 'Malawi@1976';
          } catch {
            return false;
          }
        })() : false;

          // Admin-only tabs (Reports, Docs, Versions, and Addex Pay) require registered admin status
          if (['unified-reports', 'documentation', 'version-manager', 'addex-pay'].includes(tabValue)) {
            console.log(`🔐 Admin-only tab ${tabValue}: ${isRegisteredAdmin ? 'ALLOWED' : 'DENIED'}`);
            return isRegisteredAdmin;
          }
      
      // Admin registration tab - only show to non-admins
      if (tabValue === 'admin-reg') {
        return !isRegisteredAdmin;
      }
      
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
            return true; // Always accessible for registration purposes
          case 'onecard':
          case 'deals':
            return true; // Available to all authenticated users
          case 'unified-reports':
          case 'documentation':
            return isRegisteredAdmin; // Only for registered admins
          case 'admin-reg':
            return !isRegisteredAdmin; // Only for non-admins
          case 'admin':
            return (currentUserType === 'admin' && isAdminAuthenticated) || isUnified;
          default:
            return false;
        }
      }

      return tabValue === 'deals';
    } catch (error) {
      console.error('Error checking tab permissions:', error);
      return ['deals', 'registration', 'vendor'].includes(tabValue);
    }
  };

  // Enhanced handleTabChange for seamless navigation with admin feedback
  const handleTabChange = (value: string) => {
    try {
      console.log(`🔄 Attempting to change to tab: ${value}`);
      
      // Always allow seamless navigation between core tabs
      if (['deals', 'registration', 'vendor'].includes(value)) {
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
        
        // Provide specific feedback for admin-only tabs
        if (['unified-reports', 'documentation', 'version-manager', 'addex-pay'].includes(value)) {
          toast({
            title: "Admin Access Required",
            description: "Complete admin registration to access Reports, Documentation, Versions, and Payroll features.",
            variant: "default"
          });
        } else {
          toast({
            title: "Tab Access",
            description: "Registration required to unlock more features!",
            variant: "default"
          });
        }
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
    <div className="min-h-screen bg-gray-50 overflow-y-auto">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2">
        <PortalHeader 
          userType={userType} 
          resetUserType={resetUserType}
          onShowAdminBanner={setShowAdminBanner}
          showAdminBanner={showAdminBanner}
          isAdminAuthenticated={isAdminAuthenticated}
        />
        
        {/* Remove the separate AdminNavDropdown since it's now integrated into header */}
      </div>
      
      {/* Admin Banner positioned under navigation */}
      {showAdminBanner && isAdminAuthenticated && (
        <div className="relative">
          <div className="absolute top-2 right-4 z-50 transition-all duration-500 ease-in-out animate-fade-in">
            {(() => {
              const adminData = JSON.parse(localStorage.getItem('adminProfile') || '{}');
              return (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg shadow-lg p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-green-800 flex items-center gap-2">
                        🔑 Admin Authenticated
                      </p>
                      <p className="text-xs text-green-600">
                        {adminData.firstName} • {adminData.cardType}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        className="px-3 py-1 text-xs bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-all duration-200 hover:scale-105"
                        onClick={() => setShowAdminBanner(false)}
                      >
                        Minimize
                      </button>
                      <button 
                        className="px-3 py-1 text-xs bg-white border border-red-200 text-red-600 rounded-md hover:bg-red-50 transition-all duration-200 hover:scale-105"
                        onClick={() => {
                          setShowAdminBanner(false);
                          setIsAdminAuthenticated(false);
                          localStorage.removeItem('adminAuthenticated');
                          localStorage.removeItem('adminAuthCode');
                          localStorage.removeItem('adminProfile');
                        }}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
      
      <main className="container mx-auto px-2 sm:px-4 -mt-1 pb-20">
        <PortalTabs 
          activeTab={activeTab}
          showAdminTab={showAdminTab}
          isTabAllowed={isTabAllowed}
          handleTabChange={handleTabChange}
          setIsAdminAuthenticated={setIsAdminAuthenticated}
          isUnifiedProfile={isUnifiedProfile}
          isAuthenticated={isAuthenticated}
          showAdminBanner={showAdminBanner}
        />
      </main>
      
      <WhatsAppFloatingButton />
      
      {/* Add Floating Platform Switcher */}
      {activeTab === 'deals' && (
        <FloatingPlatformSwitcher currentPlatform="portal" />
      )}

      {/* Permanent Authentication Status */}
      <PermanentAuthStatus />
    </div>
  );
};

export default Portal;
