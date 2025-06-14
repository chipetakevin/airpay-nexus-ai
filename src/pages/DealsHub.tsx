
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileDealsInterface from '@/components/deals/MobileDealsInterface';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';

const DealsHub = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <MobileDealsInterface />
      </main>
      
      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
};

export default DealsHub;
