import React, { useState, useEffect } from 'react';
import OneCardTabsLayout from './onecard/OneCardTabsLayout';
import AdminOneCardDashboard from './onecard/AdminOneCardDashboard';
import UnifiedProfileSwitcher from './profile/UnifiedProfileSwitcher';

const OneCardDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const [showCardNumber, setShowCardNumber] = useState(false);
  const [isAdminView, setIsAdminView] = useState(false);

  useEffect(() => {
    // Check authentication first
    const isAuthenticated = localStorage.getItem('userAuthenticated') === 'true';
    const credentials = localStorage.getItem('userCredentials');
    
    if (isAuthenticated && credentials) {
      try {
        const parsedCredentials = JSON.parse(credentials);
        
        // Create default userData if authenticated
        const defaultUserData = {
          cardNumber: 'OC' + Math.random().toString().substr(2, 8),
          name: parsedCredentials.name || 'OneCard User',
          userType: parsedCredentials.userType,
          cashbackBalance: 0,
          totalEarned: 0
        };
        
        // Check for stored OneCard user data, otherwise use default
        const storedUser = localStorage.getItem('onecardUser');
        if (storedUser) {
          setUserData(JSON.parse(storedUser));
        } else {
          setUserData(defaultUserData);
          localStorage.setItem('onecardUser', JSON.stringify(defaultUserData));
        }
        
        if (parsedCredentials.userType === 'admin') {
          setIsAdminView(true);
        }
      } catch (error) {
        console.error('Error parsing credentials:', error);
      }
    }
  }, []);

  // If admin is logged in, show admin dashboard
  if (isAdminView) {
    return <AdminOneCardDashboard />;
  }

  // Regular customer view
  if (!userData) {
    return (
      <div className="text-center py-8 sm:py-12">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">OneCard Rewards Dashboard</h2>
        <p className="text-gray-600 mb-6 text-sm sm:text-base px-4">
          Please register first to access your OneCard rewards and smart deals
        </p>
      </div>
    );
  }

  const handleAccessRewards = () => {
    // Navigate to deals tab with proper URL
    window.location.href = '/portal?tab=deals&network=addex-hub%20mobile&dealType=airtime';
  };

  const togglePhoneVisibility = () => {
    setShowPhoneNumber(!showPhoneNumber);
  };

  const toggleCardVisibility = () => {
    setShowCardNumber(!showCardNumber);
  };

  return (
    <div className="space-y-6">
      {/* Profile Switcher for Unified Users */}
      <UnifiedProfileSwitcher />
      
      <OneCardTabsLayout
        userData={userData}
        showPhoneNumber={showPhoneNumber}
        showCardNumber={showCardNumber}
        onTogglePhoneVisibility={togglePhoneVisibility}
        onToggleCardVisibility={toggleCardVisibility}
        onAccessRewards={handleAccessRewards}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  );
};

export default OneCardDashboard;
