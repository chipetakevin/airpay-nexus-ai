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
      <div className={cn("w-full px-4", className)}>
        {/* Modern Card-Based Navigation Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {tabs.filter(tab => !tab.disabled).map((tab) => (
            <div
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={cn(
                "modern-nav-card group relative overflow-hidden rounded-3xl p-6 cursor-pointer transition-all duration-500 transform hover:scale-[1.02] active:scale-[0.98]",
                activeTab === tab.id
                  ? "bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground shadow-2xl shadow-primary/25 border-2 border-primary/30"
                  : "bg-gradient-to-br from-card via-card/95 to-muted/20 text-card-foreground hover:shadow-xl border-2 border-border/40 hover:border-primary/20"
              )}
            >
              {/* Animated Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Content Container */}
              <div className="relative z-10 flex flex-col items-center text-center space-y-3">
                {/* Icon with Enhanced Styling */}
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold transition-all duration-300 group-hover:scale-110",
                  activeTab === tab.id
                    ? "bg-white/20 backdrop-blur-sm border border-white/20"
                    : "bg-primary/10 border border-primary/20 group-hover:bg-primary/20"
                )}>
                  <span>{tab.icon}</span>
                </div>
                
                {/* Text Content with Modern Typography */}
                <div className="space-y-1">
                  <h3 className="font-bold text-lg leading-tight tracking-tight">
                    {tab.label}
                  </h3>
                  <p className={cn(
                    "text-sm font-medium leading-tight",
                    activeTab === tab.id ? "opacity-90" : "opacity-70"
                  )}>
                    {tab.description}
                  </p>
                </div>
                
                {/* Status Indicators */}
                {(tab.count || tab.status) && (
                  <div className="flex items-center justify-center gap-2">
                    {tab.count && (
                      <div className="bg-destructive text-destructive-foreground text-xs font-bold px-3 py-1.5 rounded-full animate-pulse">
                        {tab.count}
                      </div>
                    )}
                    {tab.status && (
                      <div className="flex-shrink-0">
                        {tab.status === 'new' && (
                          <div className="bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full animate-bounce">
                            New
                          </div>
                        )}
                        {tab.status === 'alert' && (
                          <div className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full animate-pulse">
                            Alert
                          </div>
                        )}
                        {tab.status === 'coming-soon' && (
                          <div className="border-2 border-yellow-500 text-yellow-600 text-xs font-bold px-3 py-1.5 rounded-full bg-yellow-50 dark:bg-yellow-900/20">
                            Soon
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {/* Active State Glow Effect */}
              {activeTab === tab.id && (
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-primary/20 animate-pulse"></div>
              )}
            </div>
          ))}
        </div>
        
        {/* Quick Actions Card */}
        <div className="bg-gradient-to-r from-emerald-50 via-green-50 to-teal-50 dark:from-emerald-900/20 dark:via-green-900/20 dark:to-teal-900/20 rounded-3xl p-6 border-2 border-emerald-200/40 dark:border-emerald-700/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center text-white text-xl">
                💬
              </div>
              <div>
                <h4 className="font-bold text-lg text-green-800 dark:text-green-200">
                  Quick Shopping?
                </h4>
                <p className="text-sm text-green-600 dark:text-green-300">
                  Start a conversation
                </p>
              </div>
            </div>
            <div className="bg-green-500 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-green-600 transition-colors cursor-pointer flex items-center space-x-2">
              <span>📱</span>
              <span>WhatsApp Chat</span>
              <span>→</span>
            </div>
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