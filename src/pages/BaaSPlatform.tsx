
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BaaSPlatformDashboard from '@/components/platform/baas/BaaSPlatformDashboard';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';

const BaaSPlatform = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <BaaSPlatformDashboard />
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
};

export default BaaSPlatform;
