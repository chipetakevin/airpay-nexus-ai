
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import NetworkStatus from '@/components/ussd/NetworkStatus';
import USSDManagement from '@/components/ussd/USSDManagement';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';
import MobileLayout from '@/components/navigation/MobileLayout';

const USSDSystem = () => {
  return (
    <MobileLayout showTopNav={false} showBottomNav={true}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 pb-20">
        <Header />
        
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section - Redesigned without logo */}
          <div className="text-center mb-12">
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              Universal access to mobile services through USSD codes across all networks
            </p>
          </div>

          {/* Network Status */}
          <NetworkStatus />

          {/* USSD Management Interface */}
          <USSDManagement />
        </div>

        <Footer />
        <WhatsAppFloatingButton />
      </div>
    </MobileLayout>
  );
};

export default USSDSystem;
