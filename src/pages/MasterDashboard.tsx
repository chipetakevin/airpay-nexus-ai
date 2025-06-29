
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AirPayMasterDashboard from '@/components/AirPayMasterDashboard';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';
import MobileLayout from '@/components/navigation/MobileLayout';

const MasterDashboard = () => {
  return (
    <MobileLayout showTopNav={false} showBottomNav={true}>
      <div className="min-h-screen bg-gray-50 pb-20">
        <Header />
        
        <main>
          <AirPayMasterDashboard />
        </main>
        <Footer />
        <WhatsAppFloatingButton />
      </div>
    </MobileLayout>
  );
};

export default MasterDashboard;
