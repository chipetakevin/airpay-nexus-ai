
import React from 'react';
import { MessageSquare } from 'lucide-react';

interface SpazaFloatingButtonProps {
  onClick: () => void;
}

const SpazaFloatingButton: React.FC<SpazaFloatingButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 z-50 group"
      aria-label="Open Devine Mobile AI Assistant"
    >
      <MessageSquare className="w-6 h-6" />
      <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
        3
      </div>
      <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
        Devine Mobile AI
      </div>
    </button>
  );
};

export default SpazaFloatingButton;
