
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

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
      <div className="relative">
        {/* Clean logo without any background, border, or glow effects */}
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/9ca7fcec-0caf-4b50-9334-e7172bc98733.png" 
            alt="Divine Mobile Logo"
            className="h-14 w-auto object-contain group-hover:scale-105 transition-all duration-300 ease-out group-active:scale-95 filter brightness-110 contrast-110 saturate-110"
          />
        </div>
        {isBaaSPage && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
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
