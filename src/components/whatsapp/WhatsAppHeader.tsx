
import React from 'react';

const WhatsAppHeader = () => {
  return (
    <div className="text-center space-y-6">
      {/* Hero Image Integration */}
      <div className="flex justify-center mb-6">
        <img 
          src="/lovable-uploads/0ae51cbb-b399-43e0-82bf-1da78327fabc.png" 
          alt="Divinely Mobile BaaS Platform" 
          className="max-w-full h-auto rounded-lg shadow-lg"
        />
      </div>
      
      <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
        Divinely Mobile WhatsApp Business
      </h1>
      <p className="text-gray-600 max-w-2xl mx-auto">
        AI-powered WhatsApp Business integration for seamless mobile services and customer engagement
      </p>
    </div>
  );
};

export default WhatsAppHeader;
