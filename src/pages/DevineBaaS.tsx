
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DevineBaaSPlatform from '@/components/platform/devine/DevineBaaSPlatform';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';

const DevineBaaS = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        <DevineBaaSPlatform />
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
};

export default DevineBaaS;
