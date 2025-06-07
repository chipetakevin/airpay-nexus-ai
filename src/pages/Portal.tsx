import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import PortalHeader from '@/components/PortalHeader';
import PortalTabs from '@/components/PortalTabs';
import RegistrationTab from '@/components/portal/RegistrationTab';
import VendorRegistrationTab from '@/components/portal/VendorRegistrationTab';
import OneCardTab from '@/components/portal/OneCardTab';
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

  const renderTabContent = () => {
    switch (activeTab) {
      case 'registration':
        return <RegistrationTab />;
      case 'vendor':
        return <VendorRegistrationTab />;
      case 'onecard':
        return <OneCardTab />;
      default:
        return <OneCardTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PortalHeader />
      
      <main className="container mx-auto px-4 py-8">
        <PortalTabs 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
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
