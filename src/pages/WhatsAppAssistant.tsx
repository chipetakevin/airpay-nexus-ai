
import React from 'react';
import MobileLayout from '@/components/navigation/MobileLayout';
import WhatsAppIntegration from '@/components/whatsapp/WhatsAppIntegration';

const WhatsAppAssistant = () => {
  return (
    <MobileLayout showBottomNav={false}>
      <div className="bg-white bg-opacity-95 backdrop-filter backdrop-blur-3xl rounded-3xl mx-2 mb-8 border border-white border-opacity-20 shadow-2xl overflow-hidden">
        <main className="p-6">
          <WhatsAppIntegration />
        </main>
      </div>
    </MobileLayout>
  );
};

export default WhatsAppAssistant;
