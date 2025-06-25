
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Crown } from 'lucide-react';

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
        {/* New elegant script-style logo */}
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/e9a58c2c-0e41-4b09-8580-1f46b9a977d2.png" 
            alt="Divine Mobile Logo"
            className="h-12 w-auto object-contain group-hover:scale-105 transition-all duration-300 ease-out group-active:scale-95"
          />
        </div>
        <div className="absolute -inset-1 bg-gradient-to-br from-blue-500 via-purple-600 to-blue-700 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-all duration-300"></div>
        {isBaaSPage && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
        )}
      </div>
      {isBaaSPage && (
        <div className="ml-2 text-xs text-gray-500 opacity-75 group-hover:opacity-100 transition-opacity duration-300">
          Click to exit
        </div>
      )}
    </Link>
  );
};

export default HeaderLogo;
