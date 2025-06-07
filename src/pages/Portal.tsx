import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import PortalHeader from '@/components/PortalHeader';
import PortalTabs from '@/components/PortalTabs';
import { useToast } from "@/hooks/use-toast"
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';

type UserType = 'customer' | 'vendor' | 'admin' | null;

const Portal = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'onecard');
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
    setActiveTab('registration');
  };

  const isTabAllowed = (tabValue: string) => {
    const isAuthenticated = localStorage.getItem('userAuthenticated') === 'true';
    const storedCredentials = localStorage.getItem('userCredentials');
    
    if (!isAuthenticated) {
      return ['registration', 'vendor', 'admin-reg'].includes(tabValue);
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
          case 'admin-reg':
            return currentUserType === 'admin';
          case 'admin':
            return currentUserType === 'admin' && isAdminAuthenticated;
          default:
            return false;
        }
      } catch (error) {
        console.error('Error parsing credentials:', error);
        return false;
      }
    }

    return false;
  };

  const handleTabChange = (value: string) => {
    if (isTabAllowed(value)) {
      setActiveTab(value);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-0">
      <div className="pt-2">
        <PortalHeader userType={userType} resetUserType={resetUserType} />
      </div>
      
      <main className="container mx-auto px-4 pt-2">
        <PortalTabs 
          activeTab={activeTab}
          showAdminTab={showAdminTab}
          isTabAllowed={isTabAllowed}
          handleTabChange={handleTabChange}
          setIsAdminAuthenticated={setIsAdminAuthenticated}
        />
      </main>
      
      {/* Appealing Exit Tab at Bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 border-t border-gray-600 shadow-2xl">
          <div className="container mx-auto px-4">
            <Link 
              to="/" 
              className="group flex items-center justify-center space-x-3 py-4 text-white hover:text-blue-300 transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 group-hover:bg-white/20 transition-all duration-300 shadow-lg">
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                <span className="font-medium text-lg">Return to Homepage</span>
                <Home className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </Link>
          </div>
        </div>
      </div>
      
      <WhatsAppFloatingButton />
    </div>
  );
};

export default Portal;
