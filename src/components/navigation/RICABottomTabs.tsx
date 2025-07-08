import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, Phone, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface RICABottomTabsProps {
  currentPath?: string;
}

const RICABottomTabs: React.FC<RICABottomTabsProps> = ({ currentPath = '/rica-registration' }) => {
  const navigate = useNavigate();

  const tabs = [
    {
      id: 'whatsapp',
      label: 'Continue to WhatsApp Shopping',
      icon: MessageCircle,
      action: () => navigate('/portal?tab=deals'),
      className: 'bg-green-600 hover:bg-green-700 text-white'
    },
    {
      id: 'status',
      label: 'Check Registration Status',
      icon: Phone,
      action: () => navigate('/rica-registration?tab=history'),
      className: 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
    },
    {
      id: 'home',
      label: 'Return to Home',
      icon: Home,
      action: () => navigate('/'),
      className: 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 space-y-2 z-50">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <Button
            key={tab.id}
            onClick={tab.action}
            className={`w-full h-12 rounded-xl transition-all duration-200 ${tab.className}`}
          >
            <Icon className="w-4 h-4 mr-2" />
            {tab.label}
          </Button>
        );
      })}
    </div>
  );
};

export default RICABottomTabs;