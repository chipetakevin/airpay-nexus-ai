
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BaaSPlatformDashboard from '@/components/platform/baas/BaaSPlatformDashboard';

const BaaSPlatform = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <BaaSPlatformDashboard />
      <Footer />
    </div>
  );
};

export default BaaSPlatform;
