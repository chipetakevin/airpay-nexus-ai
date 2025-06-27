
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileDealsInterface from '@/components/deals/MobileDealsInterface';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';
import MobileLayout from '@/components/navigation/MobileLayout';

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
    <MobileLayout showTopNav={false} showBottomNav={true}>
      <div className="min-h-screen bg-gray-50 pb-20">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <MobileDealsInterface />
        </main>
        
        <Footer />
        <WhatsAppFloatingButton />
      </div>
    </MobileLayout>
  );
};

export default DealsHub;
