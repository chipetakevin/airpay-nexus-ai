
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Smartphone, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import NetworkStatus from '@/components/ussd/NetworkStatus';
import USSDManagement from '@/components/ussd/USSDManagement';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';

const USSDSystem = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <Header />
      
      {/* Exit to Homepage Button */}
      <div className="fixed top-20 right-4 z-50">
        <Link 
          to="/" 
          className="bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-800 p-2 rounded-full shadow-lg border border-gray-200 transition-all duration-200 hover:scale-110"
          title="Return to Homepage"
        >
          <X className="w-5 h-5" />
        </Link>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section - Redesigned */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-2xl shadow-lg">
              <Smartphone className="w-12 h-12 text-white" />
            </div>
          </div>
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
  );
};

export default USSDSystem;
