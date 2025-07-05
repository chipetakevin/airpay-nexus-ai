import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Home, 
  CreditCard, 
  Users, 
  Settings,
  Activity,
  BarChart3,
  Smartphone
} from 'lucide-react';

const navigationItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/mobile-dashboard', icon: Smartphone, label: 'Mobile' },
  { path: '/portal', icon: CreditCard, label: 'Portal' },
  { path: '/deals-hub', icon: Activity, label: 'Deals' },
  { path: '/system-management', icon: BarChart3, label: 'System' }
];

export const MobileNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="mobile-sticky-footer">
      <div className="flex items-center justify-around">
        {navigationItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={cn(
                'flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors',
                'min-w-16 touch-manipulation',
                isActive 
                  ? 'text-primary bg-primary/10' 
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};