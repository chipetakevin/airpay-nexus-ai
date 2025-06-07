
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScanToTextDashboard from '@/components/ai/ScanToTextDashboard';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';

const ScanToTextAI = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <ScanToTextDashboard />
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
};

export default ScanToTextAI;
