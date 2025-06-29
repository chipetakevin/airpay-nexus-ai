
import React from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const ExitToHomeButton = () => {
  const location = useLocation();

  const handleExitToHome = () => {
    // Seamless navigation to landing homepage
    if (location.pathname === '/') {
      // Already on home page, scroll to top smoothly
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Navigate to homepage
      window.location.href = '/';
    }
  };

  return (
    <Button
      onClick={handleExitToHome}
      variant="outline"
      size="sm"
      className="fixed top-4 right-4 z-50 w-10 h-10 p-0 rounded-full bg-white/90 backdrop-blur-sm border-gray-300 shadow-lg hover:bg-gray-50 hover:shadow-xl transition-all duration-200 md:w-12 md:h-12"
      title="Exit to Home"
    >
      <X className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
    </Button>
  );
};

export default ExitToHomeButton;
