import React from 'react';

interface Tab {
  id: string;
  label: string;
  icon?: string;
  description?: string;
}

interface TabNavigationSectionProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const TabNavigationSection: React.FC<TabNavigationSectionProps> = ({
  tabs,
  activeTab,
  onTabChange
}) => {
  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Navigation</h2>
        <p className="text-muted-foreground text-sm">Select a section to manage your platform</p>
      </div>

      {/* Tab Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              console.log('Main tab clicked:', tab.id);
              onTabChange(tab.id);
            }}
            className={`group relative p-6 rounded-xl border transition-all duration-300 hover:shadow-lg hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-left ${
              activeTab === tab.id
                ? 'bg-primary/5 border-primary/30 shadow-md'
                : 'bg-card border-border hover:bg-accent/50'
            }`}
          >
            {/* Icon and Active Indicator */}
            <div className="flex items-start justify-between mb-3">
              {tab.icon && (
                <div className={`flex items-center justify-center w-10 h-10 rounded-lg transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'
                }`}>
                  <span className="text-lg">{tab.icon}</span>
                </div>
              )}
              {activeTab === tab.id && (
                <div className="w-3 h-3 rounded-full bg-primary animate-pulse"></div>
              )}
            </div>

            {/* Content */}
            <div className="space-y-2">
              <h3 className={`font-semibold text-lg transition-colors ${
                activeTab === tab.id 
                  ? 'text-primary' 
                  : 'text-foreground group-hover:text-primary'
              }`}>
                {tab.label}
              </h3>
              {tab.description && (
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {tab.description}
                </p>
              )}
            </div>

            {/* Hover Effect */}
            <div className={`absolute inset-0 rounded-xl border-2 border-transparent transition-all duration-300 ${
              activeTab === tab.id 
                ? 'border-primary/20' 
                : 'group-hover:border-primary/10'
            }`}></div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigationSection;