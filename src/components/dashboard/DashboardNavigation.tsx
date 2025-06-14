
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ShoppingBag, Activity, Bell, MessageSquare, Settings2 } from 'lucide-react';

interface NavigationTab {
  id: string;
  label: string;
  emoji: string;
  description: string;
  gradient: string;
  bgGradient: string;
  icon: React.ReactNode;
}

interface DashboardNavigationProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const DashboardNavigation = ({ activeTab, onTabChange }: DashboardNavigationProps) => {
  const navigationTabs: NavigationTab[] = [
    {
      id: 'deals',
      label: 'Smart Deals',
      emoji: '🔥',
      description: 'AI-Powered Offers',
      gradient: 'from-blue-500 to-purple-600',
      bgGradient: 'from-blue-50 to-purple-50',
      icon: <ShoppingBag className="w-4 h-4" />
    },
    {
      id: 'billing',
      label: 'Billing',
      emoji: '💳',
      description: 'Secure Payments',
      gradient: 'from-green-500 to-emerald-600',
      bgGradient: 'from-green-50 to-emerald-50',
      icon: <Activity className="w-4 h-4" />
    },
    {
      id: 'spaza',
      label: 'Spaza Market',
      emoji: '🏪',
      description: '24/7 Shopping',
      gradient: 'from-orange-500 to-red-600',
      bgGradient: 'from-orange-50 to-red-50',
      icon: <ShoppingBag className="w-4 h-4" />
    },
    {
      id: 'alerts',
      label: 'Deal Alerts',
      emoji: '🔔',
      description: 'Real-time Notifications',
      gradient: 'from-yellow-500 to-orange-600',
      bgGradient: 'from-yellow-50 to-orange-50',
      icon: <Bell className="w-4 h-4" />
    },
    {
      id: 'notifications',
      label: 'Communications',
      emoji: '💬',
      description: 'Message Center',
      gradient: 'from-cyan-500 to-blue-600',
      bgGradient: 'from-cyan-50 to-blue-50',
      icon: <MessageSquare className="w-4 h-4" />
    },
    {
      id: 'admin',
      label: 'Admin Portal',
      emoji: '⚙️',
      description: 'System Control',
      gradient: 'from-gray-500 to-slate-600',
      bgGradient: 'from-gray-50 to-slate-50',
      icon: <Settings2 className="w-4 h-4" />
    }
  ];

  return (
    <div className="mb-6">
      <div className="w-full overflow-hidden">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex justify-start lg:justify-center pb-2">
            <div className="flex space-x-2 p-2 bg-white/90 backdrop-blur-md rounded-xl md:rounded-2xl shadow-lg border border-gray-100 w-max">
              {navigationTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`
                    flex-shrink-0 p-2 md:p-3 rounded-lg md:rounded-xl transition-all duration-300 w-[90px] md:w-[110px] relative
                    ${activeTab === tab.id 
                      ? `bg-gradient-to-br ${tab.gradient} text-white shadow-lg scale-105` 
                      : `bg-gradient-to-br ${tab.bgGradient} hover:bg-white text-gray-700 hover:shadow-md hover:scale-102`
                    }
                  `}
                >
                  <div className="flex flex-col items-center gap-1">
                    <div className={`text-lg md:text-xl ${activeTab === tab.id ? 'animate-bounce' : 'group-hover:animate-pulse'}`}>
                      {tab.emoji}
                    </div>
                    <div className="text-center">
                      <div className="text-xs md:text-sm font-bold leading-tight">
                        {tab.label}
                      </div>
                      <div className={`text-xs mt-0.5 hidden md:block ${activeTab === tab.id ? 'text-white/80' : 'text-gray-500'}`}>
                        {tab.description}
                      </div>
                    </div>
                    {activeTab === tab.id && (
                      <div className="flex items-center gap-1">
                        {tab.icon}
                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                      </div>
                    )}
                  </div>
                  
                  {/* Active indicator */}
                  {activeTab === tab.id && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-white rounded-full shadow-lg"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default DashboardNavigation;
