import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useMobileFirst } from '@/components/layout/MobileFirstProvider';
import { Flame, User, Lock, Store, Award, Bell, CreditCard } from 'lucide-react';

interface TabConfig {
  id: string;
  label: string;
  icon: any;
  description: string;
  tooltip: string;
  count?: number;
  disabled?: boolean;
  priority: 'high' | 'medium' | 'low';
  category: 'primary' | 'registration' | 'reports' | 'admin';
  status?: 'new' | 'updated' | 'alert' | 'coming-soon';
}

interface IntelligentSidebarProps {
  tabs: TabConfig[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  theme?: 'light' | 'dark' | 'auto';
}

export const IntelligentSidebar: React.FC<IntelligentSidebarProps> = ({
  tabs,
  activeTab,
  onTabChange,
  className = "",
  collapsed = false,
  onToggleCollapse,
  theme = 'auto'
}) => {
  const { isMobile, deviceType } = useMobileFirst();
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light');

  // Detect system theme
  useEffect(() => {
    if (theme === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setSystemTheme(mediaQuery.matches ? 'dark' : 'light');
      
      const handleChange = (e: MediaQueryListEvent) => {
        setSystemTheme(e.matches ? 'dark' : 'light');
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  const currentTheme = theme === 'auto' ? systemTheme : theme;

  // Group tabs by category and priority
  const groupedTabs = {
    primary: tabs.filter(tab => tab.category === 'primary').sort((a, b) => 
      a.priority === 'high' ? -1 : b.priority === 'high' ? 1 : 0
    ),
    registration: tabs.filter(tab => tab.category === 'registration'),
    reports: tabs.filter(tab => tab.category === 'reports'),
    admin: tabs.filter(tab => tab.category === 'admin')
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'new':
        return <Badge className="bg-green-500 text-white text-xs animate-pulse">New</Badge>;
      case 'updated':
        return <Badge className="bg-blue-500 text-white text-xs">Updated</Badge>;
      case 'alert':
        return <Badge className="bg-red-500 text-white text-xs animate-bounce">Alert</Badge>;
      case 'coming-soon':
        return <Badge variant="outline" className="text-xs border-yellow-500 text-yellow-600">Soon</Badge>;
      default:
        return null;
    }
  };

  const getTabIcon = (iconName: string) => {
    const iconMap = {
      flame: Flame,
      user: User,
      lock: Lock,
      store: Store,
      award: Award,
      bell: Bell,
      'credit-card': CreditCard
    };
    
    const IconComponent = iconMap[iconName as keyof typeof iconMap] || User;
    return <IconComponent className="w-5 h-5" />;
  };

  const renderTabButton = (tab: TabConfig) => {
    const isActive = activeTab === tab.id;
    
    return (
      <TooltipProvider key={tab.id}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              onClick={() => !tab.disabled && onTabChange(tab.id)}
              disabled={tab.disabled}
              className={cn(
                "w-full justify-start h-auto p-4 text-left transition-all duration-300 ease-out group",
                "relative overflow-hidden",
                "hover:scale-105 hover:shadow-lg",
                isActive && [
                  "bg-gradient-to-r from-primary to-primary/80",
                  "text-primary-foreground font-semibold",
                  "shadow-lg border-l-4 border-primary-foreground",
                  "before:absolute before:inset-0 before:bg-white/10 before:rounded-lg"
                ],
                !isActive && [
                  "text-muted-foreground hover:text-foreground",
                  "hover:bg-muted/50 active:bg-muted/70"
                ],
                tab.disabled && "opacity-50 cursor-not-allowed hover:scale-100",
                collapsed && "px-3",
                currentTheme === 'dark' && [
                  isActive ? "bg-gradient-to-r from-blue-500 to-blue-600" : "hover:bg-slate-800/50"
                ]
              )}
              aria-label={tab.tooltip}
              aria-current={isActive ? 'page' : undefined}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "flex items-center justify-center transition-transform duration-200",
                    isActive && "scale-110",
                    "group-hover:scale-110"
                  )}>
                    {getTabIcon(tab.icon)}
                  </div>
                  
                  {!collapsed && (
                    <div className="flex flex-col">
                      <span className={cn(
                        "font-medium transition-all duration-200",
                        isActive && "text-primary-foreground"
                      )}>
                        {tab.label}
                      </span>
                      <span className={cn(
                        "text-xs opacity-70 transition-all duration-200",
                        isActive && "text-primary-foreground/80"
                      )}>
                        {tab.description}
                      </span>
                    </div>
                  )}
                </div>
                
                {!collapsed && (
                  <div className="flex items-center gap-2">
                    {tab.count && (
                      <Badge variant={isActive ? "secondary" : "outline"} className="text-xs">
                        {tab.count}
                      </Badge>
                    )}
                    {getStatusBadge(tab.status)}
                  </div>
                )}
              </div>
              
              {/* Active indicator line */}
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-foreground rounded-r-full animate-fade-in" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" className="z-50">
            <div className="max-w-xs">
              <p className="font-medium">{tab.label}</p>
              <p className="text-sm text-muted-foreground">{tab.tooltip}</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  const renderTabSection = (title: string, tabList: TabConfig[], showSeparator = true) => {
    if (tabList.length === 0) return null;
    
    return (
      <div className="space-y-2">
        {!collapsed && (
          <div className="px-4 py-2">
            <h3 className={cn(
              "text-xs font-semibold uppercase tracking-wider",
              currentTheme === 'dark' ? "text-slate-400" : "text-muted-foreground"
            )}>
              {title}
            </h3>
          </div>
        )}
        <div className="space-y-1">
          {tabList.map(renderTabButton)}
        </div>
        {showSeparator && !collapsed && (
          <div className="px-4">
            <Separator className="my-4" />
          </div>
        )}
      </div>
    );
  };

  if (isMobile) {
    return (
      <div className={cn(
        "fixed bottom-0 left-0 right-0 z-50",
        "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        "border-t border-border/40",
        "safe-area-pb",
        className
      )}>
        <div className="flex items-center justify-around px-2 py-2">
          {tabs.slice(0, 5).map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <Button
                key={tab.id}
                variant="ghost"
                size="sm"
                onClick={() => !tab.disabled && onTabChange(tab.id)}
                disabled={tab.disabled}
                className={cn(
                  "flex flex-col items-center gap-1 h-auto py-2 px-3 min-w-0 flex-1",
                  isActive && "text-primary bg-primary/10",
                  tab.disabled && "opacity-50"
                )}
              >
                <div className="relative">
                  {getTabIcon(tab.icon)}
                  {tab.count && (
                    <Badge className="absolute -top-2 -right-2 h-4 w-4 p-0 text-xs">
                      {tab.count}
                    </Badge>
                  )}
                </div>
                <span className="text-xs font-medium truncate max-w-full">
                  {tab.label}
                </span>
              </Button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "h-full bg-gradient-to-b from-background to-muted/20",
      "border-r border-border/40 transition-all duration-300 ease-in-out",
      collapsed ? "w-16" : "w-80",
      currentTheme === 'dark' && "from-slate-900 to-slate-800/50",
      className
    )}>
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border/40 p-4">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div>
              <h2 className="text-lg font-semibold">Nerve Center BaaS</h2>
              <p className="text-sm text-muted-foreground">Mobile-First Dashboard</p>
            </div>
          )}
          {onToggleCollapse && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleCollapse}
              className="ml-auto"
            >
              <div className={cn(
                "transition-transform duration-200",
                collapsed ? "rotate-180" : "rotate-0"
              )}>
                →
              </div>
            </Button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-2 space-y-4">
        {renderTabSection("Core Services", groupedTabs.primary)}
        {renderTabSection("Registration", groupedTabs.registration)}
        {renderTabSection("Reports & Analytics", groupedTabs.reports)}
        {renderTabSection("Administration", groupedTabs.admin, false)}
      </div>

      {/* Theme Toggle Footer */}
      {!collapsed && (
        <div className="sticky bottom-0 bg-background/95 backdrop-blur border-t border-border/40 p-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Theme: {currentTheme}</span>
            <Badge variant="outline" className="text-xs">
              {deviceType}
            </Badge>
          </div>
        </div>
      )}
    </div>
  );
};

export default IntelligentSidebar;