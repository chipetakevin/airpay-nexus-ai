
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  CreditCard, 
  ArrowUpRight, 
  MessageCircle, 
  Search
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  path: string;
}

const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems: NavItem[] = [
    {
      id: 'sanctuary',
      label: 'Port',
      icon: Home,
      path: '/porting-system',
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
      path: '/ai-powered-deals'
    },
    {
      id: 'messages',
      label: 'RICA',
      icon: MessageCircle,
      path: '/rica-registration'
    },
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      path: '/'
    }
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleNavigation = (path: string) => {
    // Seamless navigation using the correct design
    if (path === '/' && location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
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
