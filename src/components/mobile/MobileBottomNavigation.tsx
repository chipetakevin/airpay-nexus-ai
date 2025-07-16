import React from 'react';
import { Home, ShoppingBag, User, Settings, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  onClick?: () => void;
  badge?: number;
  disabled?: boolean;
}

interface MobileBottomNavigationProps {
  items: NavigationItem[];
  activeItem: string;
  onItemClick: (id: string) => void;
  className?: string;
}

const defaultItems: NavigationItem[] = [
  {
    id: 'home',
    label: 'Home',
    icon: Home,
  },
  {
    id: 'shop',
    label: 'Shop',
    icon: ShoppingBag,
  },
  {
    id: 'add',
    label: 'Add',
    icon: Plus,
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: User,
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
  }
];

const MobileBottomNavigation: React.FC<MobileBottomNavigationProps> = ({
  items = defaultItems,
  activeItem,
  onItemClick,
  className
}) => {
  return (
    <nav className={cn("mobile-bottom-nav", className)} role="navigation" aria-label="Main navigation">
      <div className="mobile-bottom-nav-container">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          const isDisabled = item.disabled;
          
          return (
            <button
              key={item.id}
              onClick={() => !isDisabled && onItemClick(item.id)}
              disabled={isDisabled}
              className={cn(
                "mobile-bottom-nav-item",
                isActive && "active",
                isDisabled && "opacity-50 cursor-not-allowed"
              )}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <div className="relative">
                <Icon className="mobile-bottom-nav-icon" />
                {item.badge && item.badge > 0 && (
                  <span
                    className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full min-w-[16px] h-4 flex items-center justify-center px-1"
                    aria-label={`${item.badge} notifications`}
                  >
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
              </div>
              <span className="mobile-bottom-nav-label">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNavigation;