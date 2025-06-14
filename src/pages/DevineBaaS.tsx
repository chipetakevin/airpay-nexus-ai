
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';

const DivinelyBaaS = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Divinely Mobile BaaS
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your intelligent mobile services platform is now integrated into your shopping experience.
          </p>
          <p className="text-gray-500">
            Scroll down to explore our comprehensive mobile services in the footer section.
          </p>
        </div>
      </main>
      
      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
};

export default DivinelyBaaS;
