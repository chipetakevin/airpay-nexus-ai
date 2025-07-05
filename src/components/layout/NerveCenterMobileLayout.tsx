import React from 'react';
import { useMobileFirst } from './MobileFirstProvider';
import MobileAdminHeader from '@/components/admin/mobile/MobileAdminHeader';
import { useIsMobile } from '@/hooks/use-mobile';

interface NerveCenterMobileLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  showHeader?: boolean;
  showBottomNav?: boolean;
  headerActions?: React.ReactNode;
  className?: string;
}

export const NerveCenterMobileLayout: React.FC<NerveCenterMobileLayoutProps> = ({
  children,
  title = "Nerve Center",
  subtitle = "BaaS Dashboard",
  showHeader = true,
  showBottomNav = true,
  headerActions,
  className = ""
}) => {
  const { deviceType, orientation, screenSize } = useMobileFirst();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  // Enhanced Nerve Center BaaS mobile-first styling with accessibility
  const layoutClasses = `
    nerve-center-layout
    ${deviceType}
    ${orientation}
    ${isMobile ? 'mobile-optimized' : ''}
    min-h-screen
    bg-gradient-to-br from-background via-background to-muted/20
    ${className}
    gpu-accelerated
  `;

  const contentClasses = `
    nerve-center-content
    mobile-content-container
    mobile-safe-scroll
    ${showHeader ? (isMobile ? 'pt-16' : 'pt-18') : ''}
    ${showBottomNav ? (isMobile ? 'pb-24 safe-area-pb' : 'pb-20') : ''}
    ${isMobile ? 'px-4' : 'px-6'}
    ${isMobile ? 'py-4' : 'py-6'}
    min-h-screen
    overflow-x-hidden
    scroll-smooth
  `;

  return (
    <div className={layoutClasses}>
      {/* Enhanced Nerve Center Header - Mobile First with Accessibility */}
      {showHeader && (
        <header 
          className="nerve-center-header sticky top-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border/50 shadow-sm safe-area-pt"
          role="banner"
        >
          {isMobile ? (
            <MobileAdminHeader
              title={title}
              subtitle={subtitle}
              onMenuToggle={toggleMenu}
              showSearch={true}
              onSearchToggle={() => {}}
            />
          ) : (
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex flex-col">
                <h1 className="dashboard-title text-foreground">{title}</h1>
                {subtitle && (
                  <p className="dashboard-subtitle">{subtitle}</p>
                )}
              </div>
              {headerActions && (
                <div className="flex items-center gap-3">
                  {headerActions}
                </div>
              )}
            </div>
          )}
        </header>
      )}

      {/* Main Content Area with Enhanced Responsive Design */}
      <main 
        id="main-content"
        className={contentClasses}
        role="main"
        aria-label="Dashboard content"
      >
        <div className="nerve-center-container max-w-7xl mx-auto">
          <div className="responsive-content-wrapper">
            {children}
          </div>
        </div>
      </main>

      {/* Enhanced Mobile Navigation Menu Overlay */}
      {isMenuOpen && isMobile && (
        <>
          <div 
            className="fixed inset-0 bg-black/60 z-[998] backdrop-blur-sm"
            onClick={toggleMenu}
            role="button"
            tabIndex={0}
            aria-label="Close navigation menu"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                toggleMenu();
              }
            }}
          />
          <nav 
            className="fixed left-4 right-4 top-20 bg-background rounded-2xl shadow-2xl border border-border z-[999] max-h-[calc(100vh-6rem)] overflow-y-auto safe-area-pb"
            role="navigation"
            aria-label="Main navigation"
          >
            <div className="p-6 space-y-4">
              <h3 className="service-title mb-4">Navigation Menu</h3>
              <div className="space-y-3">
                <button className="service-card-mobile w-full flex items-center gap-3 text-left focus-visible">
                  <span className="text-xl" role="img" aria-label="Home">🏠</span>
                  <span className="service-title">Home Dashboard</span>
                </button>
                <button className="service-card-mobile w-full flex items-center gap-3 text-left focus-visible">
                  <span className="text-xl" role="img" aria-label="Analytics">📊</span>
                  <span className="service-title">Analytics & Reports</span>
                </button>
                <button className="service-card-mobile w-full flex items-center gap-3 text-left focus-visible">
                  <span className="text-xl" role="img" aria-label="Settings">⚙️</span>
                  <span className="service-title">System Settings</span>
                </button>
                <button className="service-card-mobile w-full flex items-center gap-3 text-left focus-visible">
                  <span className="text-xl" role="img" aria-label="Profile">👤</span>
                  <span className="service-title">User Profile</span>
                </button>
              </div>
            </div>
          </nav>
        </>
      )}

      {/* Enhanced Mobile Bottom Navigation with Accessibility */}
      {showBottomNav && isMobile && (
        <nav 
          className="mobile-navigation-enhanced"
          role="navigation"
          aria-label="Bottom navigation"
        >
          <div className="flex items-center justify-around py-2">
            <button className="mobile-nav-button focus-visible" aria-label="Home dashboard">
              <div className="w-6 h-6 bg-primary/20 rounded-lg flex items-center justify-center mb-1">
                <span className="text-sm" role="img" aria-hidden="true">🏠</span>
              </div>
              <span className="text-xs">Home</span>
            </button>
            <button className="mobile-nav-button focus-visible" aria-label="Analytics and reports">
              <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-1">
                <span className="text-sm" role="img" aria-hidden="true">📊</span>
              </div>
              <span className="text-xs">Analytics</span>
            </button>
            <button className="mobile-nav-button focus-visible" aria-label="System settings">
              <div className="w-6 h-6 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-1">
                <span className="text-sm" role="img" aria-hidden="true">⚙️</span>
              </div>
              <span className="text-xs">Settings</span>
            </button>
            <button className="mobile-nav-button focus-visible" aria-label="User profile">
              <div className="w-6 h-6 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mb-1">
                <span className="text-sm" role="img" aria-hidden="true">👤</span>
              </div>
              <span className="text-xs">Profile</span>
            </button>
          </div>
        </nav>
      )}
    </div>
  );
};

export default NerveCenterMobileLayout;