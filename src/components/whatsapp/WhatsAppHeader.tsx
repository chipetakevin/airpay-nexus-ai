
import React from 'react';

const WhatsAppHeader = () => {
  return (
    <div className="text-center space-y-6">
      <div className="flex items-center justify-center gap-4">
        <img 
          src="/lovable-uploads/5ef6be83-8590-459d-942d-7a0539064226.png" 
          alt="Divine Mobile Crown Logo"
          className="h-12 w-12 object-contain"
        />
        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Divine Mobile WhatsApp Business
        </h1>
      </div>
      <p className="text-gray-600 max-w-2xl mx-auto">
        AI-powered WhatsApp Business integration for seamless mobile services and customer engagement
      </p>
    </div>
  );
};

export default WhatsAppHeader;
