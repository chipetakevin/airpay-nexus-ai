
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Smartphone } from 'lucide-react';

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
      className="flex items-center space-x-2 group cursor-pointer"
      title={isBaaSPage ? "Return to Homepage" : "Divinely Mobile"}
    >
      <div className="relative">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-all duration-300 ease-out group-active:scale-95">
          <Smartphone className="h-5 w-5 text-white" />
        </div>
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition-all duration-300"></div>
        {isBaaSPage && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
        )}
      </div>
      <div className="flex flex-col group-hover:scale-105 transition-all duration-300 ease-out group-active:scale-95">
        <span className="font-bold text-xl text-gray-900 group-hover:text-blue-600 transition-colors duration-300">Divinely</span>
        <span className="font-montserrat font-bold text-lg text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text -mt-1 group-hover:from-blue-700 group-hover:to-purple-700 transition-all duration-300">
          Mobile
        </span>
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
