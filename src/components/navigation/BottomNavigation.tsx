
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  CreditCard, 
  Users, 
  Store, 
  Settings
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  path: string;
  badge?: 'New' | number;
}

const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems: NavItem[] = [
    {
      id: 'sanctuary',
      label: 'Sanctuary',
      icon: Home,
      path: '/',
    },
    {
      id: 'cards',
      label: 'Cards',
      icon: CreditCard,
      path: '/portal?tab=onecard',
    },
    {
      id: 'customer',
      label: 'Customer',
      icon: Users,
      path: '/portal?tab=registration',
      badge: 'New'
    },
    {
      id: 'vendor',
      label: 'Vendor',
      icon: Store,
      path: '/portal?tab=vendor',
      badge: 'New'
    },
    {
      id: 'admin',
      label: 'Admin',
      icon: Settings,
      path: '/portal?tab=admin-reg',
      badge: 'New'
    }
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.includes('portal')) {
      const urlParams = new URLSearchParams(location.search);
      const tab = urlParams.get('tab');
      return path.includes(tab || '');
    }
    return false;
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white bg-opacity-95 backdrop-filter backdrop-blur-3xl border-t border-white border-opacity-20 safe-area-pb rounded-t-3xl shadow-2xl">
      <div className="flex items-center justify-around px-5 py-5 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className={`
                flex flex-col items-center justify-center px-3 py-2 min-w-[60px] relative
                transition-all duration-300 ease-in-out active:scale-95 rounded-2xl
                ${active ? 'transform -translate-y-1' : 'hover:-translate-y-0.5'}
              `}
            >
              <div className="relative">
                <div className={`
                  w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300
                  ${active 
                    ? 'bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg' 
                    : 'bg-gray-100'
                  }
                `}>
                  <Icon 
                    className={`
                      w-6 h-6 transition-colors duration-300
                      ${active ? 'text-white' : 'text-gray-600'}
                    `}
                    strokeWidth={active ? 2.5 : 2}
                  />
                </div>
                
                {item.badge && (
                  <Badge 
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 py-0.5 min-w-[24px] h-5 flex items-center justify-center animate-pulse rounded-xl border-2 border-white"
                  >
                    {item.badge}
                  </Badge>
                )}
              </div>
              
              <span 
                className={`
                  text-sm mt-2 transition-colors duration-300 font-medium
                  ${active ? 'text-blue-600 font-semibold' : 'text-gray-600'}
                `}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
