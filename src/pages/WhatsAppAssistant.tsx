
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppIntegration from '@/components/whatsapp/WhatsAppIntegration';

const WhatsAppAssistant = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <WhatsAppIntegration />
      </main>
      <Footer />
    </div>
  );
};

export default WhatsAppAssistant;
