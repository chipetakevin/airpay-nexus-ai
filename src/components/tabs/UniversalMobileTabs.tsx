import React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { useMobileFirst } from '@/components/layout/MobileFirstProvider';

interface TabConfig {
  id: string;
  label: string;
  icon?: string;
  count?: number;
  color?: string;
  description?: string;
  disabled?: boolean;
}

interface UniversalMobileTabsProps {
  tabs: TabConfig[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
  variant?: 'default' | 'nerve-center' | 'compact';
}

export const UniversalMobileTabs: React.FC<UniversalMobileTabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  className = "",
  variant = 'default'
}) => {
  const { isMobile, deviceType } = useMobileFirst();

  const getVariantStyles = () => {
    switch (variant) {
      case 'nerve-center':
        return {
          container: 'bg-gradient-to-r from-slate-100 to-slate-200 border-slate-300',
          tab: 'data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg',
          inactive: 'text-slate-600 hover:text-slate-900 hover:bg-white/70'
        };
      case 'compact':
        return {
          container: 'bg-white border-gray-200 shadow-sm',
          tab: 'data-[state=active]:bg-blue-500 data-[state=active]:text-white',
          inactive: 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
        };
      default:
        return {
          container: 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200',
          tab: 'data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-lg',
          inactive: 'text-muted-foreground hover:text-foreground hover:bg-white/70'
        };
    }
  };

  const styles = getVariantStyles();

  if (isMobile) {
    // Mobile: Horizontal scrollable tabs
    return (
      <div className={cn("w-full", className)}>
        <div className="mobile-tab-container nav-pills-container">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => !tab.disabled && onTabChange(tab.id)}
              disabled={tab.disabled}
              className={cn(
                "mobile-tab-item nav-pill flex items-center gap-2 px-4 py-3 rounded-full font-medium transition-all duration-200 border",
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground shadow-md border-primary"
                  : "bg-background text-muted-foreground hover:text-foreground hover:bg-muted/50 border-border",
                tab.disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              {tab.icon && (
                <span className="text-base flex-shrink-0">{tab.icon}</span>
              )}
              <div className="flex flex-col items-start">
                <div className="font-medium text-sm">{tab.label}</div>
                {tab.description && (
                  <div className="text-xs opacity-70 whitespace-nowrap">{tab.description}</div>
                )}
              </div>
              {tab.count && (
                <Badge variant="outline" className="text-xs ml-2 flex-shrink-0">
                  {tab.count}
                </Badge>
              )}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Desktop/Tablet: Horizontal tabs
  return (
    <div className={cn(
      "inline-flex h-auto items-center justify-center rounded-xl p-1.5 shadow-lg border backdrop-blur-sm w-full overflow-x-auto scrollbar-hide",
      styles.container,
      className
    )}>
      <div className="flex gap-1 min-w-max">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => !tab.disabled && onTabChange(tab.id)}
            disabled={tab.disabled}
            className={cn(
              "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg px-4 py-3 text-sm font-medium transition-all duration-300 cursor-pointer relative overflow-hidden",
              activeTab === tab.id
                ? styles.tab
                : styles.inactive,
              tab.disabled && "opacity-50 cursor-not-allowed",
              "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-100%] before:transition-transform before:duration-700 hover:before:translate-x-[100%]"
            )}
          >
            {tab.icon && (
              <span className="text-base">{tab.icon}</span>
            )}
            <span>{tab.label}</span>
            {tab.count && (
              <Badge 
                variant="outline" 
                className={cn(
                  "text-xs",
                  activeTab === tab.id
                    ? "bg-white/20 text-current border-white/30"
                    : "bg-muted/50 text-muted-foreground"
                )}
              >
                {tab.count}
              </Badge>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UniversalMobileTabs;