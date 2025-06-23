
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
    <div className="min-h-screen bg-gray-50">
      {showTopNav && <TopNavigation />}
      
      <main className={`
        ${showTopNav ? 'pt-20' : 'pt-0'}
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
