
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
  Settings,
  Calculator,
  Server,
  Cpu,
  HardDrive
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
          icon: <Crown className="w-3 h-3" />
        },
        { 
          name: 'Mobile Porting & RICA', 
          path: '/devine-baas', 
          icon: <FileCheck className="w-3 h-3" />
        },
        { 
          name: 'Mobile BaaS Portal', 
          path: '/baas-platform', 
          icon: <Brain className="w-3 h-3" />
        }
      ]
    },
    {
      title: 'DGX Station',
      color: 'text-purple-600',
      items: [
        { 
          name: 'DGX Control Center', 
          path: '/dgx-station', 
          icon: <Server className="w-3 h-3" />
        },
        { 
          name: 'Agentic Workflows', 
          path: '/dgx-station?tab=workflows', 
          icon: <Cpu className="w-3 h-3" />
        },
        { 
          name: 'Resource Management', 
          path: '/dgx-station?tab=resources', 
          icon: <HardDrive className="w-3 h-3" />
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
          icon: <Flame className="w-3 h-3" />
        },
        { 
          name: 'Deals Hub', 
          path: '/deals', 
          icon: <Zap className="w-3 h-3" />
        },
        { 
          name: 'WhatsApp Business', 
          path: '/whatsapp-assistant', 
          icon: <MessageCircle className="w-3 h-3" />
        }
      ]
    },
    {
      title: 'Payroll & HR',
      color: 'text-green-600',
      items: [
        { 
          name: 'DM Payroll System', 
          path: '/dm-payroll', 
          icon: <Calculator className="w-3 h-3" />
        }
      ]
    },
    {
      title: 'AI & Admin',
      color: 'text-indigo-600',
      items: [
        { 
          name: 'AI Document Scanner', 
          path: '/scan-to-text-ai', 
          icon: <Scan className="w-3 h-3" />
        },
        { 
          name: 'Master Dashboard', 
          path: '/master-dashboard', 
          icon: <Settings className="w-3 h-3" />
        },
        { 
          name: 'Admin Portal', 
          path: '/portal?tab=admin', 
          icon: <Settings className="w-3 h-3" />
        }
      ]
    }
  ];

  return (
    <div className="relative w-full">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        size="sm"
        className="flex items-center justify-center gap-1 bg-gradient-to-r from-red-50 to-orange-50 border-red-200 text-red-700 hover:bg-red-100 px-1.5 sm:px-2 py-1 h-6 sm:h-7 text-xs w-full"
      >
        <Settings className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" />
        <span className="font-medium truncate text-xs">
          <span className="hidden sm:inline">Navigation</span>
          <span className="sm:hidden">Nav</span>
        </span>
        <ChevronDown className={`w-2.5 h-2.5 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {isOpen && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 w-72 sm:w-80 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto">
          <div className="p-2 sm:p-3">
            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-100">
              <Crown className="w-3 h-3 text-yellow-600 flex-shrink-0" />
              <h3 className="text-xs font-semibold text-gray-800">Admin Navigation</h3>
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              {navigationCategories.map((category, categoryIndex) => (
                <div key={categoryIndex} className="space-y-1">
                  <h4 className={`text-xs font-semibold ${category.color} px-1`}>
                    {category.title}
                  </h4>
                  <div className="space-y-0.5">
                    {category.items.map((item, itemIndex) => (
                      <Link
                        key={itemIndex}
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-2 p-1.5 rounded-md hover:bg-gray-50 transition-colors group text-xs"
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
