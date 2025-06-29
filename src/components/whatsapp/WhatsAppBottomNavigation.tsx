
import React from 'react';
import { Home, CreditCard, ShoppingCart, MessageSquare, MessageCircle } from 'lucide-react';

const WhatsAppBottomNavigation: React.FC = () => {
  const bottomNavItems = [
    { id: 'sanctuary', label: 'Sanctuary', icon: <Home className="w-5 h-5" />, hasNotification: false },
    { id: 'cards', label: 'Cards', icon: <CreditCard className="w-5 h-5" />, hasNotification: false },
    { id: 'transact', label: 'Transact', icon: <ShoppingCart className="w-5 h-5" />, hasNotification: true },
    { id: 'messages', label: 'Messages', icon: <MessageSquare className="w-5 h-5" />, hasNotification: true, active: true },
    { id: 'explore', label: 'Explore', icon: <MessageCircle className="w-5 h-5" />, hasNotification: true }
  ];

  return (
    <div className="bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-between items-center">
        {bottomNavItems.map((item) => (
          <button
            key={item.id}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all relative ${
              item.active 
                ? 'text-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {item.hasNotification && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">New</span>
              </div>
            )}
            {item.icon}
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default WhatsAppBottomNavigation;
