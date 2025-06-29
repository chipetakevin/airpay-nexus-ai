
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const NavigationMenu = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleDropdownToggle = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleMouseEnter = (dropdown) => {
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <nav className="hidden md:flex items-center space-x-8">
      <Link 
        to="/" 
        className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
      >
        Home
      </Link>

      {/* Devine BaaS Dropdown */}
      <div 
        className="relative"
        onMouseEnter={() => handleMouseEnter('devine-baas')}
        onMouseLeave={handleMouseLeave}
      >
        <button 
          className="flex items-center text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
          onClick={() => handleDropdownToggle('devine-baas')}
        >
          Devine BaaS
          <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${
            activeDropdown === 'devine-baas' ? 'rotate-180' : ''
          }`} />
        </button>
        
        {activeDropdown === 'devine-baas' && (
          <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
            <Link 
              to="/devine-baas" 
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200"
            >
              Devine BaaS Platform
            </Link>
            <Link 
              to="/baas-platform" 
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200"
            >
              BaaS Core Services
            </Link>
            <Link 
              to="/mvnx-baas" 
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200"
            >
              MVN-X BaaS Dashboard
            </Link>
          </div>
        )}
      </div>

      {/* Platform Dropdown */}
      <div 
        className="relative"
        onMouseEnter={() => handleMouseEnter('platform')}
        onMouseLeave={handleMouseLeave}
      >
        <button 
          className="flex items-center text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
          onClick={() => handleDropdownToggle('platform')}
        >
          Platform
          <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${
            activeDropdown === 'platform' ? 'rotate-180' : ''
          }`} />
        </button>
        
        {activeDropdown === 'platform' && (
          <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
            <Link 
              to="/platform-dashboard" 
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200"
            >
              Enterprise Dashboard
            </Link>
            <Link 
              to="/master-dashboard" 
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200"
            >
              AirPay Nexus AI
            </Link>
          </div>
        )}
      </div>

      {/* AI Solutions Dropdown */}
      <div 
        className="relative"
        onMouseEnter={() => handleMouseEnter('ai-solutions')}
        onMouseLeave={handleMouseLeave}
      >
        <button 
          className="flex items-center text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
          onClick={() => handleDropdownToggle('ai-solutions')}
        >
          AI Solutions
          <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${
            activeDropdown === 'ai-solutions' ? 'rotate-180' : ''
          }`} />
        </button>
        
        {activeDropdown === 'ai-solutions' && (
          <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
            <Link 
              to="/whatsapp-assistant" 
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200"
            >
              WhatsApp Assistant
            </Link>
            <Link 
              to="/spaza-ai" 
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200"
            >
              Spaza AI
            </Link>
            <Link 
              to="/scan-to-text" 
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200"
            >
              Scan to Text AI
            </Link>
          </div>
        )}
      </div>

      <Link 
        to="/ussd-system" 
        className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
      >
        USSD System
      </Link>

      <Link 
        to="/portal" 
        className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
      >
        Portal
      </Link>
    </nav>
  );
};

export default NavigationMenu;
