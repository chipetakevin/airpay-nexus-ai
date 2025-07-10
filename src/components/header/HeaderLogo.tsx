
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import phoneDevice from '@/assets/phone-device.png';

const HeaderLogo = () => {
  const location = useLocation();
  
  // Enhanced check for Agentic BaaS platform pages
  const isBaaSPage = [
    '/devine-baas', 
    '/baas-platform', 
    '/mvnx-baas', 
    '/master-dashboard', 
    '/platform-dashboard', 
    '/spaza-ai', 
    '/scan-to-text-ai'
  ].includes(location.pathname);
  
  return (
    <Link 
      to="/" 
      className="flex items-center space-x-3 group cursor-pointer"
      title={isBaaSPage ? "Return to Homepage" : "Divine Mobile"}
    >
      <div className="relative flex items-center space-x-2">
        {/* Seamlessly integrated Divine Mobile logo */}
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/788fddcb-574c-4f1d-9c73-54cc003a95d1.png" 
            alt="Divine Mobile Logo"
            className="h-12 w-12 object-contain group-hover:scale-105 transition-all duration-300 ease-out group-active:scale-95 filter drop-shadow-sm"
          />
        </div>
        
        {/* Phone device integration - perfectly sized and colored to match navigation */}
        <div className="relative hidden sm:block">
          <div className="absolute inset-0 bg-[#75B8FA] rounded-lg opacity-95 blur-sm -z-10"></div>
          <img 
            src={phoneDevice} 
            alt="Divine Mobile Device"
            className="relative h-12 w-auto object-contain group-hover:scale-105 transition-all duration-300 ease-out group-active:scale-95 filter drop-shadow-lg z-10"
            style={{
              background: 'linear-gradient(135deg, #75B8FA 0%, rgba(117, 184, 250, 0.8) 100%)',
              borderRadius: '8px',
              padding: '2px'
            }}
          />
        </div>
        
        {isBaaSPage && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse z-20" />
        )}
      </div>
      {isBaaSPage && (
        <div className="ml-2 text-xs text-white opacity-75 group-hover:opacity-100 transition-opacity duration-300 font-medium">
          Click to exit
        </div>
      )}
    </Link>
  );
};

export default HeaderLogo;
