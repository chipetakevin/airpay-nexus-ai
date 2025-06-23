
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  CreditCard, 
  ArrowUpRight, 
  MessageCircle, 
  Search,
  Crown,
  FileText,
  Users,
  BookOpen,
  Compass
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
      path: '/portal',
    },
    {
      id: 'transact',
      label: 'Transact',
      icon: ArrowUpRight,
      path: '/deals',
      badge: 'New'
    },
    {
      id: 'messages',
      label: 'Messages',
      icon: MessageCircle,
      path: '/whatsapp-assistant',
      badge: 'New'
    },
    {
      id: 'explore',
      label: 'Explore',
      icon: Search,
      path: '/platform-dashboard',
      badge: 'New'
    }
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 safe-area-pb">
      <div className="flex items-center justify-around px-2 py-2 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className={`
                flex flex-col items-center justify-center px-3 py-2 min-w-[60px] relative
                transition-all duration-200 ease-in-out active:scale-95
                ${active ? 'transform scale-105' : 'hover:scale-105'}
              `}
            >
              <div className="relative">
                <Icon 
                  className={`
                    w-6 h-6 transition-colors duration-200
                    ${active 
                      ? 'text-blue-600 fill-current' 
                      : 'text-gray-500'
                    }
                  `}
                  strokeWidth={active ? 2.5 : 2}
                />
                
                {item.badge && (
                  <Badge 
                    className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1.5 py-0.5 min-w-[20px] h-5 flex items-center justify-center animate-pulse"
                  >
                    {item.badge}
                  </Badge>
                )}
              </div>
              
              <span 
                className={`
                  text-xs mt-1 transition-colors duration-200 font-medium
                  ${active 
                    ? 'text-blue-600 font-semibold' 
                    : 'text-gray-500'
                  }
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
