
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
      title={isBaaSPage ? "Return to Homepage" : "Divinely"}
    >
      <div className="relative">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-600 to-blue-700 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-all duration-300 ease-out group-active:scale-95 shadow-lg">
          <Crown className="h-5 w-5 text-white" />
        </div>
        <div className="absolute -inset-1 bg-gradient-to-br from-blue-500 via-purple-600 to-blue-700 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-all duration-300"></div>
        {isBaaSPage && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
        )}
      </div>
      <div className="flex flex-col group-hover:scale-105 transition-all duration-300 ease-out group-active:scale-95">
        <span className="font-bold text-2xl text-gray-900 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
          Divinely
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
