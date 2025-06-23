
import React from 'react';
import TopNavigation from './TopNavigation';
import BottomNavigation from './BottomNavigation';

interface MobileLayoutProps {
  children: React.ReactNode;
  showTopNav?: boolean;
  showBottomNav?: boolean;
}

const MobileLayout = ({ 
  children, 
  showTopNav = true, 
  showBottomNav = true 
}: MobileLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 relative overflow-hidden">
      {showTopNav && <TopNavigation />}
      
      {/* Brand Section */}
      <div className="pt-24 px-5 pb-8">
        <div className="flex items-start gap-6">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-500 rounded-3xl flex items-center justify-center">
            <span className="text-3xl">📱</span>
          </div>
          <div>
            <h1 className="text-white text-4xl font-extrabold mb-2">Divinely</h1>
            <h2 className="text-blue-200 text-2xl font-semibold">Mobile</h2>
          </div>
        </div>
      </div>
      
      <main className={`
        ${showTopNav ? 'pt-0' : 'pt-0'}
        ${showBottomNav ? 'pb-32' : 'pb-0'}
        min-h-screen
        px-5
      `}>
        {/* Hero Card */}
        <div className="bg-white bg-opacity-15 backdrop-filter backdrop-blur-3xl rounded-3xl p-10 text-center mb-8 border border-white border-opacity-20">
          <h3 className="text-white text-5xl font-bold mb-5 leading-tight">Airtime & Data</h3>
          <h4 className="text-yellow-300 text-4xl font-bold mb-8">AI-Powered Deals</h4>
          <p className="text-white text-opacity-90 text-lg leading-relaxed max-w-2xl mx-auto">
            Best airtime and data deals with our AI-driven platform. Earn OneCard rewards on every purchase and save more with
          </p>
        </div>
        
        {children}
      </main>
      
      {showBottomNav && <BottomNavigation />}
    </div>
  );
};

export default MobileLayout;
