
import React, { useState } from 'react';
import WhatsAppShoppingInterface from './WhatsAppShoppingInterface';
import { useMobileAuth } from '@/hooks/useMobileAuth';

const WhatsAppAssistant = () => {
  const { currentUser, isAuthenticated } = useMobileAuth();

  return (
    <div className="flex flex-col h-full max-w-md mx-auto bg-white relative">
      <WhatsAppShoppingInterface />
    </div>
  );
};

export default WhatsAppAssistant;
