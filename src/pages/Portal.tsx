
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import PortalHeader from '@/components/PortalHeader';
import PortalTabs from '@/components/PortalTabs';
import CustomerRegistration from '@/components/CustomerRegistration';
import VendorRegistration from '@/components/VendorRegistration';
import AdminRegistration from '@/components/AdminRegistration';
import OneCardDashboard from '@/components/OneCardDashboard';
import { useToast } from "@/components/ui/use-toast"
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';

const Portal = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'onecard');
  const [userType, setUserType] = useState<string | null>(null);
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

  const resetUserType = () => {
    setUserType(null);
    setActiveTab('registration');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'registration':
        return <CustomerRegistration />;
      case 'vendor':
        return <VendorRegistration />;
      case 'admin':
        return <AdminRegistration />;
      case 'onecard':
        return <OneCardDashboard />;
      default:
        return <OneCardDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PortalHeader userType={userType} resetUserType={resetUserType} />
      
      <main className="container mx-auto px-4 py-8">
        <PortalTabs 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          userType={userType}
        />
        
        <div className="mt-8">
          {renderTabContent()}
        </div>
      </main>
      
      <WhatsAppFloatingButton />
    </div>
  );
};

export default Portal;
