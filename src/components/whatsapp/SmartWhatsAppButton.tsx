
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, Smartphone, Monitor, ArrowRight } from 'lucide-react';
import { useWhatsAppRedirect } from '@/hooks/useWhatsAppRedirect';

interface SmartWhatsAppButtonProps {
  variant?: 'default' | 'interface';
  className?: string;
  children?: React.ReactNode;
}

const SmartWhatsAppButton = ({ 
  variant = 'default', 
  className = '',
  children 
}: SmartWhatsAppButtonProps) => {
  const { 
    isMobile, 
    isAuthenticated, 
    currentUser, 
    redirectToWhatsApp, 
    redirectToInterface 
  } = useWhatsAppRedirect();

  const handleClick = () => {
    if (variant === 'interface') {
      redirectToInterface();
    } else {
      redirectToWhatsApp();
    }
  };

  const getButtonContent = () => {
    if (children) return children;
    
    if (variant === 'interface') {
      return (
        <>
          <Smartphone className="w-4 h-4 mr-2" />
          Open Shopping Interface
          <ArrowRight className="w-4 h-4 ml-2" />
        </>
      );
    }

    if (isMobile) {
      return (
        <>
          <MessageCircle className="w-4 h-4 mr-2" />
          Continue on WhatsApp
          <ArrowRight className="w-4 h-4 ml-2" />
        </>
      );
    }

    return (
      <>
        <Monitor className="w-4 h-4 mr-2" />
        Continue on WhatsApp Web
        <ArrowRight className="w-4 h-4 ml-2" />
      </>
    );
  };

  const getButtonStyle = () => {
    if (variant === 'interface') {
      return `bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 ${className}`;
    }
    return `bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 ${className}`;
  };

  return (
    <Button 
      onClick={handleClick}
      className={getButtonStyle()}
    >
      {getButtonContent()}
    </Button>
  );
};

export default SmartWhatsAppButton;
