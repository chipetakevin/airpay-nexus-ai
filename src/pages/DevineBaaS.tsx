
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DivinelyBaaSPlatform from '@/components/platform/devine/DevineBaaSPlatform';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';

const DivinelyBaaS = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        <DivinelyBaaSPlatform />
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
};

export default DivinelyBaaS;
