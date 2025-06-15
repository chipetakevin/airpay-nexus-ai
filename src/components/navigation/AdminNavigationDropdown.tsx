
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
      items: [
        { 
          name: 'Divinely BaaS Platform', 
          path: '/devine-baas', 
          icon: <Crown className="w-4 h-4" />,
          description: 'Main platform dashboard'
        },
        { 
          name: 'Mobile Porting & RICA', 
          path: '/devine-baas', 
          icon: <FileCheck className="w-4 h-4" />,
          description: 'Mobile services'
        },
        { 
          name: 'Mobile Divinely BaaS Portal', 
          path: '/baas-platform', 
          icon: <Brain className="w-4 h-4" />,
          description: 'Mobile portal access'
        }
      ]
    },
    {
      title: 'Smart Deals & Services',
      items: [
        { 
          name: 'Smart Deals - Airtime and Data', 
          path: '/portal?tab=deals', 
          icon: <Flame className="w-4 h-4" />,
          description: 'Airtime and data deals'
        },
        { 
          name: 'Smart Deals Hub', 
          path: '/deals', 
          icon: <Zap className="w-4 h-4" />,
          description: 'All deals and offers'
        },
        { 
          name: 'WhatsApp Business', 
          path: '/whatsapp-assistant', 
          icon: <MessageCircle className="w-4 h-4" />,
          description: 'Business messaging'
        }
      ]
    },
    {
      title: 'AI Tools',
      items: [
        { 
          name: 'AI Document Scanner', 
          path: '/scan-to-text-ai', 
          icon: <Scan className="w-4 h-4" />,
          description: 'Document processing'
        }
      ]
    },
    {
      title: 'Admin Controls',
      items: [
        { 
          name: 'Master Dashboard', 
          path: '/master-dashboard', 
          icon: <Settings className="w-4 h-4" />,
          description: 'System administration'
        },
        { 
          name: 'Admin Portal', 
          path: '/portal?tab=admin', 
          icon: <Settings className="w-4 h-4" />,
          description: 'Portal management'
        }
      ]
    }
  ];

  return (
    <div className="relative">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        className="flex items-center gap-2 bg-gradient-to-r from-red-50 to-orange-50 border-red-200 text-red-700 hover:bg-red-100"
      >
        <Settings className="w-4 h-4" />
        <span className="font-medium">Main Navigation</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Crown className="w-5 h-5 text-yellow-600" />
              Admin Navigation Categories
            </h3>
            
            {navigationCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-4">
                <h4 className="text-sm font-semibold text-gray-600 mb-2 px-2">
                  {category.title}
                </h4>
                <div className="space-y-1">
                  {category.items.map((item, itemIndex) => (
                    <Link
                      key={itemIndex}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 transition-colors group"
                    >
                      <div className="text-gray-500 group-hover:text-blue-600">
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-800 group-hover:text-blue-600">
                          {item.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {item.description}
                        </div>
                      </div>
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
