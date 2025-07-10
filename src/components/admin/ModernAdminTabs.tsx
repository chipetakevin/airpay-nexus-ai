import React from 'react';
import { cn } from '@/lib/utils';

interface Tab {
  id: string;
  label: string;
  count?: number;
}

interface ModernAdminTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  variant?: 'primary' | 'secondary';
  className?: string;
}

const ModernAdminTabs: React.FC<ModernAdminTabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  variant = 'primary',
  className
}) => {
  return (
    <div className={cn("w-full", className)}>
      {/* Mobile: Vertical stacked tabs */}
      <div className="block md:hidden space-y-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-200",
              "flex items-center justify-between",
              activeTab === tab.id
                ? variant === 'primary'
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-secondary text-secondary-foreground shadow-md"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )}
          >
            <span>{tab.label}</span>
            {tab.count && (
              <span className={cn(
                "px-2 py-1 rounded-full text-xs font-medium",
                activeTab === tab.id
                  ? "bg-primary-foreground/20 text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              )}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Desktop: Horizontal tabs */}
      <div className="hidden md:block">
        <div className={cn(
          "flex items-center justify-center rounded-lg p-1 shadow-md border backdrop-blur-sm",
          variant === 'primary'
            ? "bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20"
            : "bg-gradient-to-r from-muted/50 to-muted/70 border-border/50"
        )}>
          <div className="flex items-center gap-0.5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-md px-2 py-1.5 text-xs font-medium transition-all duration-200 cursor-pointer",
                  activeTab === tab.id
                    ? variant === 'primary'
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                      : "bg-background text-foreground shadow-md shadow-secondary/20"
                    : "hover:bg-background/50 text-muted-foreground hover:text-foreground"
                )}
              >
                <span className="text-xs">{tab.label}</span>
                {tab.count && (
                  <span className={cn(
                    "px-1 py-0.5 rounded text-xs font-medium min-w-4 text-center",
                    activeTab === tab.id
                      ? variant === 'primary'
                        ? "bg-primary-foreground/20 text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                      : "bg-muted/50 text-muted-foreground"
                  )}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernAdminTabs;