
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const ExitToHomeButton = () => {
  const location = useLocation();

  const handleTransact = () => {
    // Redirect to portal deals page
    window.location.href = '/portal?tab=deals';
  };

  return (
    <Button
      onClick={handleTransact}
      className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold text-lg rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105"
      title="Transact"
    >
      Transact
      <ArrowRight className="w-5 h-5 ml-3" />
    </Button>
  );
};

export default ExitToHomeButton;
