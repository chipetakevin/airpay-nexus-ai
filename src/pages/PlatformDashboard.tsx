
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EnhancedEnterpriseDashboard from '@/components/platform/EnhancedEnterpriseDashboard';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';

const PlatformDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <EnhancedEnterpriseDashboard />
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
};

export default PlatformDashboard;
