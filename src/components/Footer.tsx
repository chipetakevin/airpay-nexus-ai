import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, ExternalLink } from 'lucide-react';

const Footer = () => {
  // Enhanced Futuristic Devine Mobile Logo Component
  const DevineLogoIcon = () => (
    <div className="relative w-8 h-8 flex items-center justify-center">
      {/* Outer ring with enhanced gradient */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 p-0.5">
        <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
          {/* Inner design - Enhanced signal waves and core */}
          <div className="relative w-6 h-6">
            {/* Central core with pulsing effect */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-full animate-pulse"></div>
            
            {/* Enhanced signal waves */}
            <div className="absolute top-1/2 left-0.5 transform -translate-y-1/2 w-1.5 h-1.5 bg-gradient-to-r from-cyan-400 to-transparent rounded-full opacity-80"></div>
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-1 h-3 bg-gradient-to-r from-cyan-300 to-transparent rounded-full opacity-60"></div>
            
            <div className="absolute top-1/2 right-0.5 transform -translate-y-1/2 w-1.5 h-1.5 bg-gradient-to-l from-purple-500 to-transparent rounded-full opacity-80"></div>
            <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-1 h-3 bg-gradient-to-l from-purple-400 to-transparent rounded-full opacity-60"></div>
            
            {/* Network connection nodes */}
            <div className="absolute top-0.5 left-2 w-0.5 h-0.5 bg-blue-400 rounded-full animate-pulse"></div>
            <div className="absolute bottom-0.5 right-2 w-0.5 h-0.5 bg-blue-400 rounded-full animate-pulse"></div>
            <div className="absolute top-2 right-0.5 w-0.5 h-0.5 bg-purple-400 rounded-full animate-pulse"></div>
            <div className="absolute bottom-2 left-0.5 w-0.5 h-0.5 bg-cyan-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
      
      {/* Enhanced glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/30 via-blue-500/30 to-purple-600/30 blur-md scale-125"></div>
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
                <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent leading-tight font-montserrat">
                  Devine
                </span>
                <span className="text-xs font-light tracking-[0.25em] uppercase -mt-1 bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 bg-clip-text text-transparent font-roboto">
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
