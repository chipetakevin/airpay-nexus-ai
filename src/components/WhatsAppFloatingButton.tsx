
import React from 'react';
import { MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const WhatsAppFloatingButton = () => {
  return (
    <Link
      to="/whatsapp-assistant"
      className="fixed bottom-20 right-6 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-full p-4 shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 z-50 group"
      aria-label="Chat with Devine Mobile AI on WhatsApp"
    >
      <MessageSquare className="w-6 h-6" />
      
      {/* Pulsing indicator */}
      <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
        <div className="w-2 h-2 bg-white rounded-full"></div>
      </div>
      
      {/* Tooltip */}
      <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
        <div className="font-medium">Chat with Devine Mobile AI</div>
        <div className="text-xs opacity-75">Instant airtime & data deals</div>
        {/* Arrow pointing to button */}
        <div className="absolute top-1/2 left-full transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-900 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
      </div>
      
      {/* WhatsApp-style ripple effect */}
      <div className="absolute inset-0 rounded-full bg-green-400 opacity-75 animate-ping"></div>
    </Link>
  );
};

export default WhatsAppFloatingButton;
