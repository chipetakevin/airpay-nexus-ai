import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import IntelligentSidebar from './IntelligentSidebar';
import { useMobileFirst } from '@/components/layout/MobileFirstProvider';

interface TabConfig {
  id: string;
  label: string;
  icon: string;
  description: string;
  tooltip: string;
  count?: number;
  disabled?: boolean;
  priority: 'high' | 'medium' | 'low';
  category: 'primary' | 'registration' | 'reports' | 'admin';
  status?: 'new' | 'updated' | 'alert' | 'coming-soon';
}

interface EnhancedPortalNavigationProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  isTabAllowed: (tabId: string) => boolean;
  showAdminTab?: boolean;
  className?: string;
}

export const EnhancedPortalNavigation: React.FC<EnhancedPortalNavigationProps> = ({
  activeTab,
  onTabChange,
  isTabAllowed,
  showAdminTab = false,
  className = ""
}) => {
  const { isMobile } = useMobileFirst();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Enhanced tab configuration with intelligent categorization
  const tabs: TabConfig[] = [
    // Primary Services (High Priority) - Smart Deals collapsed by default
    {
      id: 'deals',
      label: 'Smart Deals',
      icon: 'flame',
      description: 'Shop Now',
      tooltip: 'Browse and purchase the latest airtime and data deals with smart discounts',
      priority: 'low',
      category: 'primary',
      status: 'coming-soon',
      disabled: true // Collapsed and disabled
    },
    {
      id: 'onecard',
      label: 'OneCard',
      icon: 'credit-card',
      description: 'Dashboard',
      tooltip: 'Access your OneCard wallet, view balance, transaction history, and manage cashback',
      priority: 'high',
      category: 'primary',
      disabled: !isTabAllowed('onecard')
    },

    // Registration Services
    {
      id: 'registration',
      label: 'Customer',
      icon: 'user',
      description: 'Register',
      tooltip: 'Register as a customer to access deals, OneCard benefits, and exclusive offers',
      priority: 'medium',
      category: 'registration',
      disabled: !isTabAllowed('registration')
    },
    {
      id: 'vendor',
      label: 'Vendor',
      icon: 'store',
      description: 'Register',
      tooltip: 'Register as a vendor to sell airtime and data, earn commissions, and access vendor tools',
      priority: 'medium',
      category: 'registration',
      disabled: !isTabAllowed('vendor')
    },

    // Reports & Analytics
    {
      id: 'unified-reports',
      label: 'Unified Reports',
      icon: 'award',
      description: 'Gold Card',
      tooltip: 'Access premium reporting features, analytics, and business insights',
      priority: 'low',
      category: 'reports',
      status: 'coming-soon',
      disabled: !isTabAllowed('unified-reports')
    },

    // Administration
    {
      id: 'admin-reg',
      label: 'Admin',
      icon: 'lock',
      description: 'Access',
      tooltip: 'Administrative registration and access management for system administrators',
      priority: 'low',
      category: 'admin',
      disabled: !isTabAllowed('admin-reg')
    }
  ];

  // Add admin portal tab if authorized
  if (showAdminTab) {
    tabs.push({
      id: 'admin',
      label: 'Portal',
      icon: 'bell',
      description: 'Control',
      tooltip: 'Administrative portal with system controls, user management, and monitoring tools',
      priority: 'high',
      category: 'admin',
      count: 1,
      status: 'alert',
      disabled: !isTabAllowed('admin')
    });
  }

  const handleTabChange = (tabId: string) => {
    console.log(`🚀 Enhanced navigation: changing to ${tabId}`);
    onTabChange(tabId);
  };

  const handleToggleCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  if (isMobile) {
    return (
      <div className={cn("w-full", className)}>
        <div className="w-full overflow-x-auto scrollbar-hide enhanced-tab-container">
          <div className="flex gap-3 pb-2 px-1 min-w-max">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => !tab.disabled && handleTabChange(tab.id)}
                disabled={tab.disabled}
                className={cn(
                  "mobile-tab-enhanced flex items-center gap-3 px-5 py-4 rounded-2xl font-medium transition-all duration-300 border flex-shrink-0 min-w-fit shadow-sm",
                  activeTab === tab.id
                    ? "active bg-gradient-to-r from-primary via-primary/95 to-primary text-primary-foreground border-primary/20 shadow-lg ring-2 ring-primary/20"
                    : "bg-gradient-to-r from-background/90 via-background to-background/90 text-foreground border-border/60 hover:border-primary/40 hover:shadow-md hover:bg-gradient-to-r hover:from-muted/40 hover:via-muted/60 hover:to-muted/40",
                  tab.disabled && "opacity-50 cursor-not-allowed"
                )}
              >
                {/* Icon with better spacing */}
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/10 flex-shrink-0">
                  <span className="text-xl">{tab.icon}</span>
                </div>
                
                {/* Text content with improved typography */}
                <div className="flex flex-col items-start text-left min-w-0">
                  <span className="font-bold text-base whitespace-nowrap leading-tight tracking-wide">
                    {tab.label}
                  </span>
                  <span className="text-xs opacity-85 whitespace-nowrap leading-tight font-medium">
                    {tab.description}
                  </span>
                </div>
                
                {/* Status indicators */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {tab.count && (
                    <span className="text-xs bg-white/20 text-current px-2.5 py-1 rounded-full font-bold min-w-6 text-center">
                      {tab.count}
                    </span>
                  )}
                  {tab.status && (
                    <div className="flex-shrink-0">
                      {tab.status === 'new' && (
                        <span className="bg-green-500 text-white text-xs animate-pulse px-2.5 py-1 rounded-full font-bold shadow-sm">
                          New
                        </span>
                      )}
                      {tab.status === 'alert' && (
                        <span className="bg-red-500 text-white text-xs animate-bounce px-2.5 py-1 rounded-full font-bold shadow-sm">
                          !
                        </span>
                      )}
                      {tab.status === 'coming-soon' && (
                        <span className="text-xs border-2 border-yellow-500 text-yellow-600 px-2.5 py-1 rounded-full font-bold bg-yellow-50 dark:bg-yellow-900/20">
                          Soon
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex h-full", className)}>
      <IntelligentSidebar
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        collapsed={sidebarCollapsed}
        onToggleCollapse={handleToggleCollapse}
        theme="auto"
        className="flex-shrink-0"
      />
    </div>
  );
};

export default EnhancedPortalNavigation;