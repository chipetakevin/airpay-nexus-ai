
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  ChevronDown, 
  Crown, 
  Zap, 
  Brain, 
  MessageCircle, 
  Scan, 
  FileCheck, 
  Flame,
  Settings
} from 'lucide-react';

interface AdminNavigationDropdownProps {
  isAdminAuthenticated: boolean;
}

const AdminNavigationDropdown: React.FC<AdminNavigationDropdownProps> = ({ 
  isAdminAuthenticated 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!isAdminAuthenticated) return null;

  const navigationCategories = [
    {
      title: 'BaaS Platform',
      color: 'text-blue-600',
      items: [
        { 
          name: 'Divinely BaaS Platform', 
          path: '/devine-baas', 
          icon: <Crown className="w-4 h-4" />
        },
        { 
          name: 'Mobile Porting & RICA', 
          path: '/devine-baas', 
          icon: <FileCheck className="w-4 h-4" />
        },
        { 
          name: 'Mobile BaaS Portal', 
          path: '/baas-platform', 
          icon: <Brain className="w-4 h-4" />
        }
      ]
    },
    {
      title: 'Smart Deals',
      color: 'text-orange-600',
      items: [
        { 
          name: 'Airtime & Data', 
          path: '/portal?tab=deals', 
          icon: <Flame className="w-4 h-4" />
        },
        { 
          name: 'Deals Hub', 
          path: '/deals', 
          icon: <Zap className="w-4 h-4" />
        },
        { 
          name: 'WhatsApp Business', 
          path: '/whatsapp-assistant', 
          icon: <MessageCircle className="w-4 h-4" />
        }
      ]
    },
    {
      title: 'AI & Admin',
      color: 'text-purple-600',
      items: [
        { 
          name: 'AI Document Scanner', 
          path: '/scan-to-text-ai', 
          icon: <Scan className="w-4 h-4" />
        },
        { 
          name: 'Master Dashboard', 
          path: '/master-dashboard', 
          icon: <Settings className="w-4 h-4" />
        },
        { 
          name: 'Admin Portal', 
          path: '/portal?tab=admin', 
          icon: <Settings className="w-4 h-4" />
        }
      ]
    }
  ];

  return (
    <div className="relative">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        className="flex items-center gap-2 bg-gradient-to-r from-red-50 to-orange-50 border-red-200 text-red-700 hover:bg-red-100 px-3 py-2 h-9"
      >
        <Settings className="w-4 h-4" />
        <span className="font-medium hidden sm:inline">Main Navigation</span>
        <span className="font-medium sm:hidden">Nav</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-72 sm:w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
          <div className="p-3">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100">
              <Crown className="w-4 h-4 text-yellow-600" />
              <h3 className="text-sm font-semibold text-gray-800">Admin Navigation</h3>
            </div>
            
            {navigationCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-3 last:mb-0">
                <h4 className={`text-xs font-semibold ${category.color} mb-2 px-1`}>
                  {category.title}
                </h4>
                <div className="space-y-1">
                  {category.items.map((item, itemIndex) => (
                    <Link
                      key={itemIndex}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-50 transition-colors group text-sm"
                    >
                      <div className="text-gray-500 group-hover:text-blue-600 flex-shrink-0">
                        {item.icon}
                      </div>
                      <span className="text-gray-800 group-hover:text-blue-600 font-medium truncate">
                        {item.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Overlay to close dropdown when clicking outside */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminNavigationDropdown;
