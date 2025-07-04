import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Users, CreditCard, Headphones, BarChart3, Settings, Package, Database } from 'lucide-react';

interface MobileAdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  activeProfileTab?: string;
  onProfileTabChange?: (tab: string) => void;
}

const MobileAdminSidebar: React.FC<MobileAdminSidebarProps> = ({
  isOpen,
  onClose,
  activeTab,
  onTabChange,
  activeProfileTab,
  onProfileTabChange
}) => {
  const adminTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'database-baas', label: 'Database (BaaS)', icon: Database, special: true },
    { id: 'balances', label: 'Balances', icon: CreditCard },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'revenue', label: 'Revenue', icon: BarChart3 },
    { id: 'networks', label: 'Networks', icon: Settings },
    { id: 'versions', label: 'Versions', icon: Settings }
  ];

  const profileTabs = [
    { id: 'customer-profiles', label: 'Customer Management', icon: Users, count: 2847 },
    { id: 'vendor-profiles', label: 'Vendor Management', icon: Package },
    { id: 'admin-profile', label: 'Admin Settings', icon: Settings }
  ];

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed top-0 left-0 z-50 h-full w-80 bg-background border-r border-border transform transition-transform duration-300 ease-in-out overflow-y-auto",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div>
            <h2 className="font-semibold text-foreground">Admin Control</h2>
            <p className="text-sm text-muted-foreground">MVNE Dashboard</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="p-2">
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Navigation */}
        <div className="p-4 space-y-6">
          {/* Main Sections */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3 px-2">Main Sections</h3>
            <div className="space-y-1">
              {adminTabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      onTabChange(tab.id);
                      onClose();
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200",
                      // Special styling for Database (BaaS) tab
                      tab.special
                        ? activeTab === tab.id
                          ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg border-2 border-purple-400"
                          : "bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 border-2 border-purple-300 hover:from-purple-200 hover:to-indigo-200 shadow-md"
                        : activeTab === tab.id
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    <Icon className={cn(
                      "w-5 h-5 flex-shrink-0",
                      tab.special && activeTab !== tab.id && "text-purple-600"
                    )} />
                    <span className={cn(
                      "font-medium",
                      tab.special && "font-semibold"
                    )}>
                      {tab.label}
                    </span>
                    {tab.special && (
                      <div className={cn(
                        "ml-auto w-2 h-2 rounded-full",
                        activeTab === tab.id ? "bg-white/80" : "bg-purple-500 animate-pulse"
                      )} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Profile Management - Only show when Dashboard is active */}
          {activeTab === 'dashboard' && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3 px-2">Management</h3>
              <div className="space-y-1">
                {profileTabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        onProfileTabChange?.(tab.id);
                        onClose();
                      }}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors",
                        activeProfileTab === tab.id
                          ? "bg-secondary text-secondary-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      )}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span className="font-medium flex-1">{tab.label}</span>
                      {tab.count && (
                        <Badge variant="outline" className="ml-auto text-xs">
                          {tab.count}
                        </Badge>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quick Stats - Customer Management specific */}
          {activeTab === 'dashboard' && activeProfileTab === 'customer-profiles' && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3 px-2">Quick Stats</h3>
              <div className="space-y-2">
                <div className="p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Active Customers</span>
                    <span className="font-semibold text-green-600">2,847</span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Open Tickets</span>
                    <span className="font-semibold text-orange-600">23</span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Revenue Today</span>
                    <span className="font-semibold text-blue-600">R12,450</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MobileAdminSidebar;