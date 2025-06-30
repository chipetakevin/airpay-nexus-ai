
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap } from 'lucide-react';
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
      className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold text-lg rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105"
      title="Instant Rewards"
    >
      <Zap className="w-6 h-6 mr-3" />
      Instant Rewards
      <ArrowRight className="w-5 h-5 ml-3" />
    </Button>
  );
};

export default ExitToHomeButton;
