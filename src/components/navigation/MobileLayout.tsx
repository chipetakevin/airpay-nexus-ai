
import React from 'react';
import BottomNavigation from './BottomNavigation';

interface MobileLayoutProps {
  children: React.ReactNode;
  showTopNav?: boolean;
  showBottomNav?: boolean;
}

const MobileLayout = ({ 
  children, 
  showTopNav = false, // Changed default to false since we're removing top nav
  showBottomNav = true 
}: MobileLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* TopNavigation completely removed - no conditional rendering */}
      
      <main className={`
        ${showBottomNav ? 'pb-20' : 'pb-0'}
        min-h-screen
      `}>
        {children}
      </main>
      
      {showBottomNav && <BottomNavigation />}
    </div>
  );
};

export default MobileLayout;
