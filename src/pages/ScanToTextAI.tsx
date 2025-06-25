
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScanToTextDashboard from '@/components/ai/ScanToTextDashboard';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';
import MobileLayout from '@/components/navigation/MobileLayout';

const ScanToTextAI = () => {
  return (
    <MobileLayout showTopNav={false} showBottomNav={true}>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main>
          <ScanToTextDashboard />
        </main>
        <Footer />
        <WhatsAppFloatingButton />
      </div>
    </MobileLayout>
  );
};

export default ScanToTextAI;
