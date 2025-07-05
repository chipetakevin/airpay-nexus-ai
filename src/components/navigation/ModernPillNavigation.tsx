import React from 'react';
import { cn } from '@/lib/utils';
import { Zap, Shield, Star, ArrowRight } from 'lucide-react';

interface ModernPillNavigationProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

export const ModernPillNavigation: React.FC<ModernPillNavigationProps> = ({
  activeTab,
  onTabChange,
  className = ""
}) => {
  const tabs = [
    {
      id: 'deals',
      label: 'Instant Rewards',
      icon: Zap,
      className: 'nav-pill-instant-rewards'
    },
    {
      id: 'onecard',
      label: 'Secure Transactions',
      icon: Shield,
      className: 'nav-pill-secure-transactions'
    },
    {
      id: 'registration',
      label: 'Best Deals',
      icon: Star,
      className: 'nav-pill-best-deals'
    }
  ];

  return (
    <div className={cn("gradient-nav-container", className)}>
      {/* Navigation Pills */}
      <div className="space-y-4 mb-8">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "nav-pill w-full",
                tab.className,
                isActive && "active"
              )}
              aria-pressed={isActive}
              aria-label={`Navigate to ${tab.label}`}
            >
              <Icon className="nav-pill-icon" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Call-to-Action Buttons */}
      <div className="space-y-4 mb-8">
        <button 
          className="nav-cta-primary w-full"
          onClick={() => onTabChange('deals')}
        >
          <span>Start Earning Rewards</span>
          <ArrowRight className="w-5 h-5" />
        </button>
        
        <button 
          className="nav-cta-secondary w-full"
          onClick={() => onTabChange('deals')}
        >
          Check Out Our Smart Deals
        </button>
      </div>

      {/* Stats Card */}
      <div className="stats-card text-center">
        <div className="stats-number">50K+</div>
        <div className="text-white/80 font-medium">Happy Customers</div>
      </div>
    </div>
  );
};

export default ModernPillNavigation;