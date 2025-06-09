
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, ExternalLink } from 'lucide-react';

const Footer = () => {
  // Futuristic Devine Mobile Logo Component
  const DevineLogoIcon = () => (
    <div className="relative w-8 h-8 flex items-center justify-center">
      {/* Outer ring with gradient */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-600 via-purple-600 to-teal-500 p-0.5">
        <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
          {/* Inner design - Signal waves and diamond */}
          <div className="relative w-6 h-6">
            {/* Central diamond */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gradient-to-br from-blue-400 to-purple-400 rotate-45 rounded-sm"></div>
            
            {/* Signal waves */}
            <div className="absolute top-1/2 left-1 transform -translate-y-1/2 w-1 h-1 bg-gradient-to-r from-blue-400 to-transparent rounded-full opacity-70"></div>
            <div className="absolute top-1/2 left-0.5 transform -translate-y-1/2 w-0.5 h-2 bg-gradient-to-r from-blue-300 to-transparent rounded-full opacity-50"></div>
            
            <div className="absolute top-1/2 right-1 transform -translate-y-1/2 w-1 h-1 bg-gradient-to-l from-purple-400 to-transparent rounded-full opacity-70"></div>
            <div className="absolute top-1/2 right-0.5 transform -translate-y-1/2 w-0.5 h-2 bg-gradient-to-l from-purple-300 to-transparent rounded-full opacity-50"></div>
            
            {/* Network nodes */}
            <div className="absolute top-1 left-2 w-0.5 h-0.5 bg-teal-400 rounded-full"></div>
            <div className="absolute bottom-1 right-2 w-0.5 h-0.5 bg-teal-400 rounded-full"></div>
          </div>
        </div>
      </div>
      
      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-teal-500/20 blur-sm scale-110"></div>
    </div>
  );

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <DevineLogoIcon />
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 bg-clip-text text-transparent leading-tight">
                  Devine
                </span>
                <span className="text-xs text-gray-400 font-medium tracking-wider uppercase -mt-1">
                  Mobile
                </span>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Empowering South Africa with innovative mobile solutions, from airtime deals to enterprise platforms.
            </p>
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-gray-400">Powered by</span>
              <a 
                href="https://kukayalabs.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1"
              >
                Kukaya Labs
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-gray-400 hover:text-white transition-colors">
                Home
              </Link>
              <Link to="/portal" className="block text-gray-400 hover:text-white transition-colors">
                Portal
              </Link>
              <Link to="/spaza-ai" className="block text-gray-400 hover:text-white transition-colors">
                Spaza AI
              </Link>
              <Link to="/platform" className="block text-gray-400 hover:text-white transition-colors">
                Enterprise Platform
              </Link>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Services</h3>
            <div className="space-y-2">
              <Link to="/whatsapp-assistant" className="block text-gray-400 hover:text-white transition-colors">
                WhatsApp Assistant
              </Link>
              <Link to="/ussd-system" className="block text-gray-400 hover:text-white transition-colors">
                USSD System
              </Link>
              <Link to="/platform/baas" className="block text-gray-400 hover:text-white transition-colors">
                BaaS Platform
              </Link>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                Mobile Banking
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-400">
                <Mail className="w-4 h-4" />
                <span className="text-sm">OneCard@myonecard.ai</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Devine Mobile. All rights reserved. | Powered by Kukaya Labs
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
