import React from 'react';
import { cn } from '@/lib/utils';
import MobileBottomNavigation from './MobileBottomNavigation';

interface MobileLayoutProps {
  children: React.ReactNode;
  className?: string;
  showBottomNav?: boolean;
  bottomNavItems?: Array<{
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    href?: string;
    onClick?: () => void;
    badge?: number;
    disabled?: boolean;
  }>;
  activeNavItem?: string;
  onNavItemClick?: (id: string) => void;
  header?: React.ReactNode;
  safeArea?: boolean;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({
  children,
  className,
  showBottomNav = false,
  bottomNavItems,
  activeNavItem = 'home',
  onNavItemClick,
  header,
  safeArea = true
}) => {
  return (
    <div 
      className={cn(
        "min-h-screen bg-background flex flex-col",
        safeArea && "mobile-safe-area-left mobile-safe-area-right",
        className
      )}
    >
      {/* Header */}
      {header && (
        <header className={cn(
          "mobile-nav-container",
          safeArea && "mobile-safe-area-top"
        )}>
          {header}
        </header>
      )}

      {/* Main Content */}
      <main 
        className={cn(
          "flex-1 w-full",
          showBottomNav && "pb-20", // Space for bottom navigation
          safeArea && showBottomNav && "mobile-safe-area-bottom"
        )}
      >
        <div className="mobile-padding-md">
          {children}
        </div>
      </main>

      {/* Bottom Navigation */}
      {showBottomNav && bottomNavItems && onNavItemClick && (
        <MobileBottomNavigation
          items={bottomNavItems}
          activeItem={activeNavItem}
          onItemClick={onNavItemClick}
        />
      )}
    </div>
  );
};

export default MobileLayout;