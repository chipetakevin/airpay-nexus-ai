
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScanToTextDashboard from '@/components/ai/ScanToTextDashboard';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';

const ScanToTextAI = () => {
  return (
    <div className="min-h-screen bg-gray-50">
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
      
      <main>
        <ScanToTextDashboard />
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
};

export default ScanToTextAI;
