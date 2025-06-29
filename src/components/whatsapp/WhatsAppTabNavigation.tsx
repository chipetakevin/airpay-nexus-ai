
import React from 'react';

interface WhatsAppTabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const WhatsAppTabNavigation: React.FC<WhatsAppTabNavigationProps> = ({ 
  activeTab, 
  onTabChange 
}) => {
  const tabs = [
    { id: 'shop', label: 'Shop' },
    { id: 'chat', label: 'Chat' },
    { id: 'cart', label: 'Cart' }
  ];

  return (
    <div className="flex bg-gray-100 border-b">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-all ${
            activeTab === tab.id
              ? 'bg-black text-white rounded-lg mx-1 my-1'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default WhatsAppTabNavigation;
