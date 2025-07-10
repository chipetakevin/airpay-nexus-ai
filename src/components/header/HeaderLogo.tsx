
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
      className="flex items-center space-x-4 group cursor-pointer"
      title={isBaaSPage ? "Return to Homepage" : "Divine Mobile"}
    >
      <div className="relative flex items-center space-x-3">
        {/* Seamlessly integrated Divine Mobile logo */}
        <div className="flex items-center relative">
          <img 
            src="/lovable-uploads/788fddcb-574c-4f1d-9c73-54cc003a95d1.png" 
            alt="Divine Mobile Logo"
            className="h-12 w-12 object-contain group-hover:scale-105 transition-all duration-300 ease-out group-active:scale-95 filter drop-shadow-sm relative z-10"
          />
        </div>
        
        {/* Phone device integration - perfectly centered and color-matched */}
        <div className="relative flex items-center justify-center">
          {/* Background blend layer */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#75B8FA] via-[#85C8FF] to-[#75B8FA] rounded-xl opacity-90 blur-lg scale-110"></div>
          
          {/* Phone image with perfect navigation bar integration */}
          <div className="relative bg-[#75B8FA] rounded-lg p-1 shadow-lg">
            <img 
              src={phoneDevice} 
              alt="Divine Mobile Device"
              className="h-14 w-auto object-contain group-hover:scale-110 transition-all duration-500 ease-out group-active:scale-95 filter brightness-110 contrast-105 drop-shadow-xl relative z-20"
              style={{
                filter: 'hue-rotate(10deg) saturate(1.1) brightness(1.05)',
                mixBlendMode: 'normal'
              }}
            />
          </div>
          
          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/30 to-white/20 rounded-xl animate-pulse opacity-50"></div>
        </div>
        
        {isBaaSPage && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse z-30" />
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
