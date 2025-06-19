
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
  HardDrive,
  Shield,
  Smartphone,
  CreditCard,
  Network,
  Database,
  Cloud,
  Lock,
  TrendingUp,
  BarChart3,
  Users,
  Globe,
  Headphones,
  ShoppingCart,
  Package,
  FileText,
  Activity,
  AlertTriangle,
  Wifi,
  Radio,
  Layers,
  Eye,
  Target,
  Gauge
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
          name: 'DM BaaS Platform', 
          path: '/devine-baas', 
          icon: <Crown className="w-3 h-3" />,
          description: 'AI-Driven MVNX'
        },
        { 
          name: 'Cellular Services', 
          path: '/devine-baas?tab=cellular', 
          icon: <Radio className="w-3 h-3" />,
          description: 'GSM Core & Bulk'
        },
        { 
          name: 'BSS/OSS Suite', 
          path: '/devine-baas?tab=bss', 
          icon: <Database className="w-3 h-3" />,
          description: 'CRM & Billing'
        },
        { 
          name: 'API Gateway', 
          path: '/devine-baas?tab=api', 
          icon: <Globe className="w-3 h-3" />,
          description: 'Integration Hub'
        },
        { 
          name: 'RICA Compliance', 
          path: '/devine-baas?tab=compliance', 
          icon: <FileCheck className="w-3 h-3" />,
          description: 'Regulatory'
        },
        { 
          name: 'White-Label Portal', 
          path: '/devine-baas?tab=portal', 
          icon: <Layers className="w-3 h-3" />,
          description: 'Custom Branding'
        }
      ]
    },
    {
      title: 'MVNO Services',
      color: 'text-green-600',
      items: [
        { 
          name: 'SIM Management', 
          path: '/devine-baas?tab=sim', 
          icon: <Smartphone className="w-3 h-3" />,
          description: 'Physical/eSIM'
        },
        { 
          name: 'Device Catalog', 
          path: '/devine-baas?tab=devices', 
          icon: <Package className="w-3 h-3" />,
          description: 'Handsets & IoT'
        },
        { 
          name: 'Service Packages', 
          path: '/devine-baas?tab=packages', 
          icon: <ShoppingCart className="w-3 h-3" />,
          description: 'Plans & Bundles'
        },
        { 
          name: 'Network Interface', 
          path: '/devine-baas?tab=network', 
          icon: <Network className="w-3 h-3" />,
          description: 'Multi-MNO'
        }
      ]
    },
    {
      title: 'AI & Analytics',
      color: 'text-purple-600',
      items: [
        { 
          name: 'Predictive Analytics', 
          path: '/devine-baas?tab=analytics', 
          icon: <TrendingUp className="w-3 h-3" />,
          description: 'ML Insights'
        },
        { 
          name: 'Customer Intelligence', 
          path: '/devine-baas?tab=intelligence', 
          icon: <Brain className="w-3 h-3" />,
          description: 'Behavioral AI'
        },
        { 
          name: 'Performance Monitor', 
          path: '/devine-baas?tab=monitoring', 
          icon: <Gauge className="w-3 h-3" />,
          description: 'Real-time KPIs'
        },
        { 
          name: 'Business Intelligence', 
          path: '/devine-baas?tab=bi', 
          icon: <BarChart3className="w-3 h-3" />,
          description: 'Executive Dashboards'
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
          icon: <Server className="w-3 h-3" />,
          description: 'GPU Clusters'
        },
        { 
          name: 'Agentic Workflows', 
          path: '/dgx-station?tab=workflows', 
          icon: <Cpu className="w-3 h-3" />,
          description: 'AI Automation'
        },
        { 
          name: 'Resource Management', 
          path: '/dgx-station?tab=resources', 
          icon: <HardDrive className="w-3 h-3" />,
          description: 'Compute Allocation'
        }
      ]
    },
    {
      title: 'Security & Compliance',
      color: 'text-red-600',
      items: [
        { 
          name: 'Security Framework', 
          path: '/devine-baas?tab=security', 
          icon: <Shield className="w-3 h-3" />,
          description: 'E2E Encryption'
        },
        { 
          name: 'POPIA Protection', 
          path: '/devine-baas?tab=privacy', 
          icon: <Lock className="w-3 h-3" />,
          description: 'Data Privacy'
        },
        { 
          name: 'Threat Detection', 
          path: '/devine-baas?tab=threats', 
          icon: <AlertTriangle className="w-3 h-3" />,
          description: 'AI Security'
        },
        { 
          name: 'Audit & Compliance', 
          path: '/devine-baas?tab=audit', 
          icon: <FileText className="w-3 h-3" />,
          description: 'Regulatory Reports'
        }
      ]
    },
    {
      title: 'Operations',
      color: 'text-orange-600',
      items: [
        { 
          name: 'Service Quality', 
          path: '/devine-baas?tab=quality', 
          icon: <Target className="w-3 h-3" />,
          description: 'SLA Management'
        },
        { 
          name: 'Incident Management', 
          path: '/devine-baas?tab=incidents', 
          icon: <Activity className="w-3 h-3" />,
          description: 'Auto Resolution'
        },
        { 
          name: 'Change Management', 
          path: '/devine-baas?tab=changes', 
          icon: <Settings className="w-3 h-3" />,
          description: 'Version Control'
        },
        { 
          name: 'Exit Management', 
          path: '/devine-baas?tab=migration', 
          icon: <Eye className="w-3 h-3" />,
          description: 'Data Portability'
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
          icon: <Flame className="w-3 h-3" />,
          description: 'Live Deals'
        },
        { 
          name: 'Deals Hub', 
          path: '/deals', 
          icon: <Zap className="w-3 h-3" />,
          description: 'Marketplace'
        },
        { 
          name: 'WhatsApp Business', 
          path: '/whatsapp-assistant', 
          icon: <MessageCircle className="w-3 h-3" />,
          description: 'Chat Commerce'
        }
      ]
    },
    {
      title: 'Support Systems',
      color: 'text-indigo-600',
      items: [
        { 
          name: 'DM Payroll System', 
          path: '/dm-payroll', 
          icon: <Calculator className="w-3 h-3" />,
          description: 'HR Management'
        },
        { 
          name: 'AI Document Scanner', 
          path: '/scan-to-text-ai', 
          icon: <Scan className="w-3 h-3" />,
          description: 'OCR Intelligence'
        },
        { 
          name: 'Master Dashboard', 
          path: '/master-dashboard', 
          icon: <Settings className="w-3 h-3" />,
          description: 'System Overview'
        },
        { 
          name: 'Admin Portal', 
          path: '/portal?tab=admin', 
          icon: <Users className="w-3 h-3" />,
          description: 'User Management'
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
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 w-80 sm:w-96 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
          <div className="p-2 sm:p-3">
            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-100">
              <Crown className="w-3 h-3 text-yellow-600 flex-shrink-0" />
              <h3 className="text-xs font-semibold text-gray-800">Divinely Mobile BaaS - AI-Driven MVNX Platform</h3>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              {navigationCategories.map((category, categoryIndex) => (
                <div key={categoryIndex} className="space-y-1">
                  <h4 className={`text-xs font-semibold ${category.color} px-1 flex items-center gap-1`}>
                    {category.title}
                    <span className="text-xs text-gray-400 font-normal">({category.items.length})</span>
                  </h4>
                  <div className="grid grid-cols-1 gap-0.5">
                    {category.items.map((item, itemIndex) => (
                      <Link
                        key={itemIndex}
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-2 p-1.5 rounded-md hover:bg-gray-50 transition-colors group text-xs border border-transparent hover:border-gray-200"
                      >
                        <div className="text-gray-500 group-hover:text-blue-600 flex-shrink-0">
                          {item.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-gray-800 group-hover:text-blue-600 font-medium truncate block text-xs">
                            {item.name}
                          </span>
                          {item.description && (
                            <span className="text-gray-500 text-xs truncate block opacity-75">
                              {item.description}
                            </span>
                          )}
                        </div>
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
