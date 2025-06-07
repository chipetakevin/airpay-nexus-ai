
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EnterpriseDashboard from '@/components/platform/EnterpriseDashboard';

const PlatformDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <EnterpriseDashboard />
      <Footer />
    </div>
  );
};

export default PlatformDashboard;
