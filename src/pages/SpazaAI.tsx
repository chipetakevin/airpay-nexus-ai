
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SpazaAIAssistant from '@/components/spaza/SpazaAIAssistant';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';
import MobileLayout from '@/components/navigation/MobileLayout';

const SpazaAI = () => {
  return (
    <MobileLayout showTopNav={false} showBottomNav={true}>
      <div className="min-h-screen bg-gray-50 pb-20">
        <Header />
        
        <main>
          <SpazaAIAssistant />
        </main>
        <Footer />
        <WhatsAppFloatingButton />
      </div>
    </MobileLayout>
  );
};

export default SpazaAI;
