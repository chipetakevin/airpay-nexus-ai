
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SpazaAIAssistant from '@/components/spaza/SpazaAIAssistant';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';

const SpazaAI = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        <SpazaAIAssistant />
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
};

export default SpazaAI;
