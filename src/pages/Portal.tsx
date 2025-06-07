
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { X } from 'lucide-react';
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
    <div className="min-h-screen bg-gray-50">
      {/* Exit to Homepage Button */}
      <div className="fixed top-20 right-4 z-50">
        <Link 
          to="/" 
          className="bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-800 p-2 rounded-full shadow-lg border border-gray-200 transition-all duration-200 hover:scale-110"
          title="Return to Homepage"
        >
          <X className="w-5 h-5" />
        </Link>
      </div>
      
      <PortalHeader userType={userType} resetUserType={resetUserType} />
      
      <main className="container mx-auto px-4 py-8">
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
