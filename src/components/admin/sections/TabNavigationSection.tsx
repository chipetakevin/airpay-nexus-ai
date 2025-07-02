import React from 'react';

interface Tab {
  id: string;
  label: string;
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
    <div className="w-full">
      <div className="inline-flex h-auto items-center justify-center rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 p-1.5 text-muted-foreground shadow-lg border border-gray-200/50 backdrop-blur-sm w-full overflow-x-auto">
        <div className="grid w-full grid-cols-3 gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                console.log('Main tab clicked:', tab.id);
                onTabChange(tab.id);
              }}
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-lg px-3 py-3 text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-[56px] flex-1 min-w-0 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-white text-foreground shadow-lg shadow-blue-100/50 border border-blue-200/30'
                  : 'hover:bg-white/70 hover:shadow-md'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TabNavigationSection;