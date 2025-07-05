import React from 'react';
import { useMobileFirst } from './MobileFirstProvider';
import { cn } from '@/lib/utils';

interface MobileLayoutProps {
  children: React.ReactNode;
  className?: string;
  showHeader?: boolean;
  showNavigation?: boolean;
  headerContent?: React.ReactNode;
  navigationContent?: React.ReactNode;
}

export const MobileLayout: React.FC<MobileLayoutProps> = ({
  children,
  className,
  showHeader = true,
  showNavigation = false,
  headerContent,
  navigationContent
}) => {
  const { isMobile } = useMobileFirst();

  return (
    <div className={cn('mobile-container', className)}>
      {showHeader && (
        <header className="mobile-header safe-area-pt">
          {headerContent || (
            <>
              <h1 className="mobile-text-lg">Divine Mobile</h1>
              <div className="flex items-center space-x-2">
                {/* Header actions will go here */}
              </div>
            </>
          )}
        </header>
      )}
      
      {showNavigation && (
        <nav className="mobile-nav">
          {navigationContent || (
            <>
              <div className="mobile-nav-item active">Dashboard</div>
              <div className="mobile-nav-item">Services</div>
              <div className="mobile-nav-item">Profile</div>
              <div className="mobile-nav-item">Settings</div>
            </>
          )}
        </nav>
      )}
      
      <main className={cn(
        'flex-1',
        showHeader && 'pt-2',
        showNavigation && 'pt-2'
      )}>
        {children}
      </main>
    </div>
  );
};