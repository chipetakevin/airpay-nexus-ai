
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const ExitToHomeButton = () => {
  const location = useLocation();

  const handleExitToAIDeals = () => {
    // Always redirect to AI-Powered Deals page seamlessly using the correct design
    window.location.href = '/ai-powered-deals';
  };

  return (
    <Button
      onClick={handleExitToAIDeals}
      className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold text-lg rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105"
      title="Get Started"
    >
      Get Started
      <ArrowRight className="w-5 h-5 ml-3" />
    </Button>
  );
};

export default ExitToHomeButton;
