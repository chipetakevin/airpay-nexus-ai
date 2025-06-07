
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EnhancedEnterpriseDashboard from '@/components/platform/EnhancedEnterpriseDashboard';

const PlatformDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <EnhancedEnterpriseDashboard />
      <Footer />
    </div>
  );
};

export default PlatformDashboard;
