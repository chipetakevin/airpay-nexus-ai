
import React from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Devine Mobile</span>
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
                <span className="text-sm">support@devine-mobile.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+27 11 123 4567</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Johannesburg, South Africa</span>
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
