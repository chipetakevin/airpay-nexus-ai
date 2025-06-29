
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AirPayMasterDashboard from '@/components/AirPayMasterDashboard';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';

const MasterDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        <AirPayMasterDashboard />
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
};

export default MasterDashboard;
