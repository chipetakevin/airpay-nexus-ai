
import React from 'react';
import { Card } from '@/components/ui/card';
import { usePortalState } from '../hooks/usePortalState';
import PortalHeader from '../components/PortalHeader';
import PortalTabs from '../components/PortalTabs';

const Portal = () => {
  const {
    activeTab,
    userType,
    isAdminAuthenticated,
    showAdminTab,
    isTabAllowed,
    handleTabChange,
    resetUserType,
    setIsAdminAuthenticated
  } = usePortalState();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-teal-500">
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <PortalHeader userType={userType} resetUserType={resetUserType} />

        <Card className="max-w-6xl mx-auto bg-white/95 backdrop-blur-sm shadow-2xl">
          <PortalTabs
            activeTab={activeTab}
            showAdminTab={showAdminTab}
            isTabAllowed={isTabAllowed}
            handleTabChange={handleTabChange}
            setIsAdminAuthenticated={setIsAdminAuthenticated}
          />
        </Card>
      </div>
    </div>
  );
};

export default Portal;
