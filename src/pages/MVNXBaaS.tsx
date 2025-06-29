
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MVNXBaaSDashboard from '@/components/platform/mvnx/MVNXBaaSDashboard';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';

const MVNXBaaS = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        <MVNXBaaSDashboard />
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
};

export default MVNXBaaS;
