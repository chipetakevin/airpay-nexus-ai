
import React from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const ExitToHomeButton = () => {
  const location = useLocation();

  const handleExitToDeals = () => {
    // Intelligent exit to AI-Powered Deals page
    window.location.href = '/ai-powered-deals';
  };

  return (
    <Button
      onClick={handleExitToDeals}
      variant="outline"
      size="sm"
      className="fixed top-4 right-4 z-50 w-10 h-10 p-0 rounded-full bg-white/90 backdrop-blur-sm border-gray-300 shadow-lg hover:bg-gray-50 hover:shadow-xl transition-all duration-200 md:w-12 md:h-12"
      title="Exit to AI Deals"
    >
      <X className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
    </Button>
  );
};

export default ExitToHomeButton;
