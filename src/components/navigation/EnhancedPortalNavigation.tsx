import React, { useState } from 'react';
import { cn } from '@/lib/utils';
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
      <IntelligentSidebar
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        className={className}
        theme="auto"
      />
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