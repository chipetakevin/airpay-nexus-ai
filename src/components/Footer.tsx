
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ExternalLink, Smartphone, Shield, Zap, Globe, Star, CreditCard, Wifi, Phone, MessageCircle, ChevronUp, ChevronDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Footer = () => {
  const [isFooterExpanded, setIsFooterExpanded] = useState(false);

  // Enhanced Futuristic Divinely Mobile Logo Component
  const DivinelyLogoIcon = () => (
    <div className="relative w-6 h-6 flex items-center justify-center">
      {/* Outer ring with enhanced gradient */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 p-0.5">
        <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
          {/* Inner design - Enhanced signal waves and core */}
          <div className="relative w-3 h-3">
            {/* Central core with pulsing effect */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-full animate-pulse"></div>
            
            {/* Enhanced signal waves */}
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-0.5 h-1 bg-gradient-to-r from-cyan-400 to-transparent rounded-full opacity-80"></div>
            <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-0.5 h-1 bg-gradient-to-l from-purple-500 to-transparent rounded-full opacity-80"></div>
          </div>
        </div>
      </div>
      
      {/* Enhanced glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/20 via-blue-500/20 to-purple-600/20 blur-sm scale-150"></div>
    </div>
  );

  return (
    <footer className="relative">
      {/* Appealing Footer Tab */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-50">
        <Button
          onClick={() => setIsFooterExpanded(!isFooterExpanded)}
          className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-700 hover:via-purple-700 hover:to-cyan-700 text-white px-6 py-3 rounded-t-2xl shadow-2xl border-0 transition-all duration-300 hover:scale-105 animate-pulse-glow"
        >
          <div className="flex items-center gap-2">
            <DivinelyLogoIcon />
            <span className="font-bold text-sm">Divinely Mobile</span>
            {isFooterExpanded ? (
              <ChevronDown className="w-4 h-4 transition-transform duration-300" />
            ) : (
              <ChevronUp className="w-4 h-4 transition-transform duration-300" />
            )}
          </div>
        </Button>
      </div>

      {/* Collapsible Footer Content */}
      <div className={`transition-all duration-500 ease-in-out ${
        isFooterExpanded 
          ? 'translate-y-0 opacity-100 visible' 
          : 'translate-y-full opacity-0 invisible'
      } fixed bottom-0 left-0 right-0 z-40`}>
        <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50">
          {/* Compact Quick Services Section */}
          <div className="py-4">
            <div className="container mx-auto px-4">
              <Card className="bg-white/90 backdrop-blur-lg shadow-md border border-gray-200/50">
                <CardContent className="p-4">
                  <div className="text-center mb-3">
                    <h3 className="text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Quick Mobile Services
                    </h3>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <Button variant="outline" className="h-12 flex flex-col items-center justify-center text-xs border hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 group p-1">
                      <CreditCard className="w-4 h-4 mb-1 text-blue-600 group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-semibold">Airtime</span>
                    </Button>
                    <Button variant="outline" className="h-12 flex flex-col items-center justify-center text-xs border hover:border-green-300 hover:bg-green-50 transition-all duration-300 group p-1">
                      <Wifi className="w-4 h-4 mb-1 text-green-600 group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-semibold">Data</span>
                    </Button>
                    <Button variant="outline" className="h-12 flex flex-col items-center justify-center text-xs border hover:border-purple-300 hover:bg-purple-50 transition-all duration-300 group p-1">
                      <Phone className="w-4 h-4 mb-1 text-purple-600 group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-semibold">Porting</span>
                    </Button>
                    <Button variant="outline" className="h-12 flex flex-col items-center justify-center text-xs border hover:border-orange-300 hover:bg-orange-50 transition-all duration-300 group p-1">
                      <MessageCircle className="w-4 h-4 mb-1 text-orange-600 group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-semibold">Support</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Compact Platform Highlights */}
          <div className="pb-4">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/50 hover:shadow-md transition-all duration-300">
                  <CardContent className="p-3 text-center">
                    <div className="w-8 h-8 mx-auto mb-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-yellow-900 font-bold mb-1 text-xs">
                      <Star className="w-2 h-2 mr-1" />
                      Popular
                    </Badge>
                    <h3 className="text-xs font-bold text-gray-900 mb-1">5 Min Porting</h3>
                    <p className="text-xs text-gray-700">AI-powered SIM porting & RICA</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 hover:shadow-md transition-all duration-300">
                  <CardContent className="p-3 text-center">
                    <div className="w-8 h-8 mx-auto mb-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <Shield className="w-4 h-4 text-white" />
                    </div>
                    <Badge className="bg-gradient-to-r from-green-100 to-blue-100 text-green-800 text-xs mb-1">
                      Verified
                    </Badge>
                    <h3 className="text-xs font-bold text-gray-900 mb-1">ICASA Compliant</h3>
                    <p className="text-xs text-gray-700">99.7% regulatory compliance</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200/50 hover:shadow-md transition-all duration-300">
                  <CardContent className="p-3 text-center">
                    <div className="w-8 h-8 mx-auto mb-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                      <Globe className="w-4 h-4 text-white" />
                    </div>
                    <Badge className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 text-xs mb-1">
                      Advanced
                    </Badge>
                    <h3 className="text-xs font-bold text-gray-900 mb-1">AI Platform</h3>
                    <p className="text-xs text-gray-700">Autonomous processing</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Compact Main Footer */}
          <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-blue-900 text-white">
            <div className="container mx-auto px-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Logo and Description */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <DivinelyLogoIcon />
                    <div className="flex flex-col">
                      <span className="text-sm font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent leading-tight">
                        Divinely
                      </span>
                      <span className="text-xs font-light tracking-wider uppercase -mt-1 bg-gradient-to-r from-gray-400 to-gray-300 bg-clip-text text-transparent">
                        Mobile
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-300 text-xs leading-relaxed">
                    Empowering South Africa with innovative mobile solutions.
                  </p>
                  <div className="flex items-center space-x-2 text-xs">
                    <span className="text-gray-400">Powered by</span>
                    <a 
                      href="https://kukayalabs.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1 transition-colors duration-300"
                    >
                      Kukaya Labs
                      <ExternalLink className="w-2 h-2" />
                    </a>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-white">Quick Links</h3>
                  <div className="space-y-1">
                    <Link to="/" className="block text-gray-300 hover:text-cyan-400 transition-colors duration-300 text-xs">
                      Home
                    </Link>
                    <Link to="/portal" className="block text-gray-300 hover:text-cyan-400 transition-colors duration-300 text-xs">
                      Portal
                    </Link>
                    <Link to="/spaza-ai" className="block text-gray-300 hover:text-cyan-400 transition-colors duration-300 text-xs">
                      Spaza AI
                    </Link>
                    <Link to="/platform" className="block text-gray-300 hover:text-cyan-400 transition-colors duration-300 text-xs">
                      Enterprise
                    </Link>
                  </div>
                </div>

                {/* Services */}
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-white">Services</h3>
                  <div className="space-y-1">
                    <Link to="/whatsapp-assistant" className="block text-gray-300 hover:text-purple-400 transition-colors duration-300 text-xs">
                      WhatsApp Assistant
                    </Link>
                    <Link to="/ussd-system" className="block text-gray-300 hover:text-purple-400 transition-colors duration-300 text-xs">
                      USSD System
                    </Link>
                    <Link to="/platform/baas" className="block text-gray-300 hover:text-purple-400 transition-colors duration-300 text-xs">
                      BaaS Platform
                    </Link>
                    <a href="#" className="block text-gray-300 hover:text-purple-400 transition-colors duration-300 text-xs">
                      Mobile Banking
                    </a>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-white">Contact</h3>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-2 h-2 text-white" />
                    </div>
                    <span className="text-xs break-all">OneCard@myonecard.ai</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-700 mt-3 pt-3 text-center">
                <p className="text-gray-400 text-xs">
                  © 2024 Divinely Mobile. All rights reserved. | Powered by Kukaya Labs
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop for when footer is expanded */}
      {isFooterExpanded && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 transition-opacity duration-300"
          onClick={() => setIsFooterExpanded(false)}
        />
      )}
    </footer>
  );
};

export default Footer;
