import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Smartphone } from 'lucide-react';
import NetworkStatus from '@/components/ussd/NetworkStatus';
import USSDManagement from '@/components/ussd/USSDManagement';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';

const USSDSystem = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 rounded-2xl">
              <Smartphone className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            USSD System Management
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
  );
};

export default USSDSystem;
