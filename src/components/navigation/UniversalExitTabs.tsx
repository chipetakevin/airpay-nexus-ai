import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Home, MessageCircle, CreditCard, Phone, Settings } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface ExitTabsProps {
  currentService: 'rica' | 'port' | 'deals' | 'registration' | 'admin';
  variant?: 'bottom' | 'top' | 'floating';
  showServiceSwitcher?: boolean;
}

const UniversalExitTabs: React.FC<ExitTabsProps> = ({ 
  currentService, 
  variant = 'bottom',
  showServiceSwitcher = true 
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const serviceActions = {
    rica: [
      {
        id: 'whatsapp',
        label: 'Continue to WhatsApp Shopping',
        icon: MessageCircle,
        action: () => navigate('/portal?tab=deals'),
        className: 'bg-green-600 hover:bg-green-700 text-white',
        primary: true
      },
      {
        id: 'deals',
        label: 'Browse Deals',
        icon: CreditCard,
        action: () => navigate('/portal?tab=deals'),
        className: 'bg-blue-600 hover:bg-blue-700 text-white',
        primary: false
      }
    ],
    port: [
      {
        id: 'rica',
        label: 'Complete RICA First',
        icon: Phone,
        action: () => navigate('/rica-registration'),
        className: 'bg-orange-600 hover:bg-orange-700 text-white',
        primary: true
      },
      {
        id: 'deals',
        label: 'Browse Deals',
        icon: CreditCard,
        action: () => navigate('/portal?tab=deals'),
        className: 'bg-blue-600 hover:bg-blue-700 text-white',
        primary: false
      }
    ],
    deals: [
      {
        id: 'rica',
        label: 'RICA Registration',
        icon: Phone,
        action: () => navigate('/rica-registration'),
        className: 'bg-orange-600 hover:bg-orange-700 text-white',
        primary: false
      },
      {
        id: 'port',
        label: 'Port Number',
        icon: Settings,
        action: () => navigate('/porting-system'),
        className: 'bg-purple-600 hover:bg-purple-700 text-white',
        primary: false
      }
    ],
    registration: [
      {
        id: 'services',
        label: 'Explore Services',
        icon: CreditCard,
        action: () => navigate('/ai-powered-deals'),
        className: 'bg-blue-600 hover:bg-blue-700 text-white',
        primary: true
      }
    ],
    admin: [
      {
        id: 'portal',
        label: 'Main Portal',
        icon: Settings,
        action: () => navigate('/portal'),
        className: 'bg-blue-600 hover:bg-blue-700 text-white',
        primary: true
      },
      {
        id: 'deals',
        label: 'Deals Hub',
        icon: CreditCard,
        action: () => navigate('/ai-powered-deals'),
        className: 'bg-green-600 hover:bg-green-700 text-white',
        primary: false
      }
    ]
  };

  const commonActions = [
    {
      id: 'portal',
      label: 'Dashboard',
      icon: Settings,
      action: () => navigate('/portal'),
      className: 'bg-gray-600 hover:bg-gray-700 text-white',
      primary: false
    },
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      action: () => navigate('/'),
      className: 'bg-gray-500 hover:bg-gray-600 text-white',
      primary: false
    }
  ];

  const allActions = [...serviceActions[currentService], ...commonActions];
  const primaryAction = allActions.find(action => action.primary);
  const secondaryActions = allActions.filter(action => !action.primary);

  const getWrapperClasses = () => {
    switch (variant) {
      case 'floating':
        return 'fixed bottom-4 left-4 right-4 z-50 max-w-md mx-auto';
      case 'top':
        return 'sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b p-4';
      default:
        return 'fixed bottom-0 left-0 right-0 z-50 bg-white border-t p-4';
    }
  };

  if (variant === 'floating') {
    return (
      <div className={getWrapperClasses()}>
        <Card className="shadow-lg">
          <CardContent className="p-4 space-y-3">
            {primaryAction && (
              <Button
                onClick={primaryAction.action}
                className={`w-full h-12 rounded-xl transition-all duration-200 ${primaryAction.className}`}
              >
                <primaryAction.icon className="w-4 h-4 mr-2" />
                {primaryAction.label}
              </Button>
            )}
            
            <div className="grid grid-cols-2 gap-2">
              {secondaryActions.slice(0, 4).map((action) => {
                const Icon = action.icon;
                return (
                  <Button
                    key={action.id}
                    onClick={action.action}
                    variant="outline"
                    className="h-10 text-xs"
                  >
                    <Icon className="w-3 h-3 mr-1" />
                    {action.label}
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={getWrapperClasses()}>
      <div className="max-w-md mx-auto space-y-2">
        {primaryAction && (
          <Button
            onClick={primaryAction.action}
            className={`w-full h-12 rounded-xl transition-all duration-200 ${primaryAction.className}`}
          >
            <primaryAction.icon className="w-4 h-4 mr-2" />
            {primaryAction.label}
          </Button>
        )}
        
        <div className="grid grid-cols-3 gap-2">
          {secondaryActions.slice(0, 3).map((action) => {
            const Icon = action.icon;
            return (
              <Button
                key={action.id}
                onClick={action.action}
                variant="outline"
                className="h-10 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs"
              >
                <Icon className="w-3 h-3 mr-1" />
                {action.label}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UniversalExitTabs;