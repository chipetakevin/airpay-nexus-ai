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
    // Primary Services (High Priority)
    {
      id: 'deals',
      label: 'Smart Deals',
      icon: 'flame',
      description: 'Shop Now',
      tooltip: 'Browse and purchase the latest airtime and data deals with smart discounts',
      priority: 'high',
      category: 'primary',
      disabled: !isTabAllowed('deals')
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
        <div className="mobile-tab-container nav-pills-container">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => !tab.disabled && handleTabChange(tab.id)}
              disabled={tab.disabled}
              className={cn(
                "mobile-tab-item nav-pill flex items-center gap-2 px-4 py-3 rounded-full font-medium transition-all duration-300 border min-w-max",
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground shadow-lg border-primary scale-105"
                  : "bg-background/90 text-muted-foreground hover:text-foreground hover:bg-muted/70 border-border hover:scale-102",
                tab.disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              <span className="text-base flex-shrink-0">{tab.icon}</span>
              <div className="flex flex-col items-start">
                <span className="font-medium text-sm whitespace-nowrap">{tab.label}</span>
                <span className="text-xs opacity-70 whitespace-nowrap">{tab.description}</span>
              </div>
              {tab.count && (
                <span className="text-xs ml-2 flex-shrink-0 bg-primary/10 text-primary px-2 py-1 rounded-full">
                  {tab.count}
                </span>
              )}
              {tab.status && (
                <div className="flex-shrink-0 ml-1">
                  {tab.status === 'new' && <span className="bg-green-500 text-white text-xs animate-pulse px-2 py-1 rounded-full">New</span>}
                  {tab.status === 'alert' && <span className="bg-red-500 text-white text-xs animate-bounce px-2 py-1 rounded-full">!</span>}
                  {tab.status === 'coming-soon' && <span className="text-xs border border-yellow-500 text-yellow-600 px-2 py-1 rounded-full">Soon</span>}
                </div>
              )}
            </button>
          ))}
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