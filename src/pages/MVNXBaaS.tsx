
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MVNXBaaSDashboard from '@/components/platform/mvnx/MVNXBaaSDashboard';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';
import MobileLayout from '@/components/navigation/MobileLayout';

const MVNXBaaS = () => {
  return (
    <MobileLayout showTopNav={false} showBottomNav={true}>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main>
          <MVNXBaaSDashboard />
        </main>
        <Footer />
        <WhatsAppFloatingButton />
      </div>
    </MobileLayout>
  );
};

export default MVNXBaaS;
