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
  
  // Nerve Center BaaS mobile-first styling
  const layoutClasses = `
    nerve-center-layout
    ${deviceType}
    ${orientation}
    ${isMobile ? 'mobile-optimized' : ''}
    min-h-screen
    bg-gradient-to-br from-slate-50 to-slate-100
    ${className}
  `;

  const contentClasses = `
    nerve-center-content
    ${showHeader ? (isMobile ? 'pt-14' : 'pt-16') : ''}
    ${showBottomNav ? (isMobile ? 'pb-20' : 'pb-16') : ''}
    ${isMobile ? 'px-4' : 'px-6'}
    ${isMobile ? 'py-4' : 'py-6'}
    min-h-screen
    overflow-x-hidden
  `;

  return (
    <div className={layoutClasses}>
      {/* Nerve Center Header - Mobile First */}
      {showHeader && (
        <div className="nerve-center-header sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/50 shadow-sm">
          {isMobile ? (
            <MobileAdminHeader
              title={title}
              subtitle={subtitle}
              onMenuToggle={() => {}}
              showSearch={true}
              onSearchToggle={() => {}}
            />
          ) : (
            <div className="flex items-center justify-between px-6 py-4">
              <div>
                <h1 className="text-xl font-bold text-slate-900">{title}</h1>
                {subtitle && (
                  <p className="text-sm text-slate-600">{subtitle}</p>
                )}
              </div>
              {headerActions && (
                <div className="flex items-center gap-2">
                  {headerActions}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Main Content Area */}
      <main className={contentClasses}>
        <div className="nerve-center-container max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      {showBottomNav && isMobile && (
        <div className="nerve-center-bottom-nav fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/50">
          <div className="flex items-center justify-around py-2">
            <button className="flex flex-col items-center gap-1 px-3 py-2 text-slate-600 hover:text-blue-600">
              <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-sm">🏠</span>
              </div>
              <span className="text-xs">Home</span>
            </button>
            <button className="flex flex-col items-center gap-1 px-3 py-2 text-slate-600 hover:text-blue-600">
              <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-sm">📊</span>
              </div>
              <span className="text-xs">Analytics</span>
            </button>
            <button className="flex flex-col items-center gap-1 px-3 py-2 text-slate-600 hover:text-blue-600">
              <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-sm">⚙️</span>
              </div>
              <span className="text-xs">Settings</span>
            </button>
            <button className="flex flex-col items-center gap-1 px-3 py-2 text-slate-600 hover:text-blue-600">
              <div className="w-6 h-6 bg-orange-100 rounded-lg flex items-center justify-center">
                <span className="text-sm">👤</span>
              </div>
              <span className="text-xs">Profile</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NerveCenterMobileLayout;