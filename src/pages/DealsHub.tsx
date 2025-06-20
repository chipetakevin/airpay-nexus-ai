
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileDealsInterface from '@/components/deals/MobileDealsInterface';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';

const DealsHub = () => {
  // Completely disable any session management on this page
  React.useEffect(() => {
    // Clear any session-related localStorage that might trigger errors
    const currentPath = window.location.pathname + window.location.search;
    if (currentPath.includes('deals')) {
      // Temporarily disable session checks
      sessionStorage.setItem('dealsPageActive', 'true');
    }
    
    return () => {
      sessionStorage.removeItem('dealsPageActive');
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <MobileDealsInterface />
      </main>
      
      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
};

export default DealsHub;
