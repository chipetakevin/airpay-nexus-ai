
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BaaSPlatformDashboard from '@/components/platform/baas/BaaSPlatformDashboard';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';
import MobileLayout from '@/components/navigation/MobileLayout';

const BaaSPlatform = () => {
  return (
    <MobileLayout showTopNav={false} showBottomNav={true}>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main>
          <BaaSPlatformDashboard />
        </main>
        <Footer />
        <WhatsAppFloatingButton />
      </div>
    </MobileLayout>
  );
};

export default BaaSPlatform;
