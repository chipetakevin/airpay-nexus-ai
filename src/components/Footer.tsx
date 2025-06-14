
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, ExternalLink, Smartphone, Shield, Zap, Globe, CheckCircle, ArrowRight, Star, Users, Clock, BarChart3, MessageCircle, CreditCard, Wifi, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Footer = () => {
  // Enhanced Futuristic Divinely Mobile Logo Component
  const DivinelyLogoIcon = () => (
    <div className="relative w-10 h-10 flex items-center justify-center">
      {/* Outer ring with enhanced gradient */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 p-0.5">
        <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
          {/* Inner design - Enhanced signal waves and core */}
          <div className="relative w-7 h-7">
            {/* Central core with pulsing effect */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-full animate-pulse"></div>
            
            {/* Enhanced signal waves */}
            <div className="absolute top-1/2 left-0.5 transform -translate-y-1/2 w-2 h-2 bg-gradient-to-r from-cyan-400 to-transparent rounded-full opacity-80"></div>
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-1.5 h-4 bg-gradient-to-r from-cyan-300 to-transparent rounded-full opacity-60"></div>
            
            <div className="absolute top-1/2 right-0.5 transform -translate-y-1/2 w-2 h-2 bg-gradient-to-l from-purple-500 to-transparent rounded-full opacity-80"></div>
            <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-1.5 h-4 bg-gradient-to-l from-purple-400 to-transparent rounded-full opacity-60"></div>
            
            {/* Network connection nodes */}
            <div className="absolute top-1 left-2.5 w-0.5 h-0.5 bg-blue-400 rounded-full animate-pulse"></div>
            <div className="absolute bottom-1 right-2.5 w-0.5 h-0.5 bg-blue-400 rounded-full animate-pulse"></div>
            <div className="absolute top-2.5 right-1 w-0.5 h-0.5 bg-purple-400 rounded-full animate-pulse"></div>
            <div className="absolute bottom-2.5 left-1 w-0.5 h-0.5 bg-cyan-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
      
      {/* Enhanced glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/20 via-blue-500/20 to-purple-600/20 blur-lg scale-150"></div>
    </div>
  );

  const stats = [
    { label: "Success Rate", value: "99.7%", icon: <CheckCircle className="w-4 h-4" /> },
    { label: "Processing", value: "5 Min", icon: <Clock className="w-4 h-4" /> },
    { label: "Users", value: "50K+", icon: <Users className="w-4 h-4" /> },
    { label: "Growth", value: "45%", icon: <BarChart3 className="w-4 h-4" /> }
  ];

  const features = [
    {
      icon: <Zap className="w-6 h-6 text-blue-600" />,
      title: "#1 Fastest Porting",
      description: "Complete SIM porting in 5 minutes",
      badge: "Popular"
    },
    {
      icon: <Shield className="w-6 h-6 text-green-600" />,
      title: "ICASA Compliant",
      description: "99.7% regulatory compliance",
      badge: "Verified"
    },
    {
      icon: <Globe className="w-6 h-6 text-purple-600" />,
      title: "AI-Powered",
      description: "Autonomous processing platform",
      badge: "Advanced"
    }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Compact Divinely Mobile BaaS Section */}
      <div className="py-6 lg:py-8">
        <div className="container mx-auto px-4 lg:px-6">
          {/* Compact Header */}
          <div className="bg-white/80 backdrop-blur-lg border border-gray-200/50 shadow-lg rounded-2xl mb-6 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-cyan-600/5 p-4 lg:p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Logo and Title - Compact */}
                <div className="flex items-center gap-3">
                  <DivinelyLogoIcon />
                  <div>
                    <h2 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                      Divinely Mobile
                    </h2>
                    <p className="text-xs lg:text-sm text-gray-600 font-medium">
                      Intelligent Porting & RICA Platform
                    </p>
                  </div>
                </div>

                {/* Compact Badges */}
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs px-3 py-1">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    ICASA Compliant
                  </Badge>
                  <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs px-3 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    #1 Platform
                  </Badge>
                </div>
              </div>

              {/* Compact Stats Row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50 hover:shadow-md transition-all duration-300">
                    <div className="flex justify-center mb-2 text-blue-600">
                      {stat.icon}
                    </div>
                    <div className="text-lg lg:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-600 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Compact Main Feature Card */}
          <Card className="bg-gradient-to-r from-green-50 via-emerald-50 to-blue-50 border border-green-200/50 shadow-lg mb-6 overflow-hidden">
            <CardContent className="p-4 lg:p-6">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
                    <Zap className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
                  </div>
                  <div>
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-yellow-900 font-bold mb-2 px-2 py-1 text-xs">
                      <Star className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                    <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-1">
                      Port & RICA in 5 Minutes
                    </h3>
                    <p className="text-gray-700 text-sm">
                      Complete SIM porting and RICA registration with AI-powered processing
                    </p>
                  </div>
                </div>
                <Button className="bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  Start Process
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Compact Features Grid */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 border hover:border-blue-200/50 group">
                <CardHeader className="text-center pb-3">
                  <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <Badge className="mb-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-xs">{feature.badge}</Badge>
                  <CardTitle className="text-base lg:text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center pt-0">
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Compact Quick Services */}
          <Card className="bg-white/90 backdrop-blur-lg shadow-lg border border-gray-200/50">
            <CardHeader className="pb-4">
              <CardTitle className="text-center text-lg lg:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Quick Mobile Services
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <Button variant="outline" className="h-16 lg:h-18 flex flex-col items-center justify-center border hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 group">
                  <CreditCard className="w-5 h-5 lg:w-6 lg:h-6 mb-1 text-blue-600 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-semibold">Airtime</span>
                </Button>
                <Button variant="outline" className="h-16 lg:h-18 flex flex-col items-center justify-center border hover:border-green-300 hover:bg-green-50 transition-all duration-300 group">
                  <Wifi className="w-5 h-5 lg:w-6 lg:h-6 mb-1 text-green-600 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-semibold">Data</span>
                </Button>
                <Button variant="outline" className="h-16 lg:h-18 flex flex-col items-center justify-center border hover:border-purple-300 hover:bg-purple-50 transition-all duration-300 group">
                  <Phone className="w-5 h-5 lg:w-6 lg:h-6 mb-1 text-purple-600 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-semibold">Porting</span>
                </Button>
                <Button variant="outline" className="h-16 lg:h-18 flex flex-col items-center justify-center border hover:border-orange-300 hover:bg-orange-50 transition-all duration-300 group">
                  <MessageCircle className="w-5 h-5 lg:w-6 lg:h-6 mb-1 text-orange-600 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-semibold">Support</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Compact Original Footer Content */}
      <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-blue-900 text-white">
        <div className="container mx-auto px-4 lg:px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Logo and Description */}
            <div className="space-y-4 lg:col-span-1">
              <div className="flex items-center space-x-3">
                <DivinelyLogoIcon />
                <div className="flex flex-col">
                  <span className="text-lg lg:text-xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent leading-tight font-montserrat">
                    Divinely
                  </span>
                  <span className="text-xs font-light tracking-[0.25em] uppercase -mt-1 bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400 bg-clip-text text-transparent font-roboto">
                    Mobile
                  </span>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Empowering South Africa with innovative mobile solutions.
              </p>
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-gray-400">Powered by</span>
                <a 
                  href="https://kukayalabs.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1 transition-colors duration-300"
                >
                  Kukaya Labs
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-3">
              <h3 className="text-base lg:text-lg font-semibold text-white">Quick Links</h3>
              <div className="space-y-2">
                <Link to="/" className="block text-gray-300 hover:text-cyan-400 transition-colors duration-300 text-sm">
                  Home
                </Link>
                <Link to="/portal" className="block text-gray-300 hover:text-cyan-400 transition-colors duration-300 text-sm">
                  Portal
                </Link>
                <Link to="/spaza-ai" className="block text-gray-300 hover:text-cyan-400 transition-colors duration-300 text-sm">
                  Spaza AI
                </Link>
                <Link to="/platform" className="block text-gray-300 hover:text-cyan-400 transition-colors duration-300 text-sm">
                  Enterprise Platform
                </Link>
              </div>
            </div>

            {/* Services */}
            <div className="space-y-3">
              <h3 className="text-base lg:text-lg font-semibold text-white">Services</h3>
              <div className="space-y-2">
                <Link to="/whatsapp-assistant" className="block text-gray-300 hover:text-purple-400 transition-colors duration-300 text-sm">
                  WhatsApp Assistant
                </Link>
                <Link to="/ussd-system" className="block text-gray-300 hover:text-purple-400 transition-colors duration-300 text-sm">
                  USSD System
                </Link>
                <Link to="/platform/baas" className="block text-gray-300 hover:text-purple-400 transition-colors duration-300 text-sm">
                  BaaS Platform
                </Link>
                <a href="#" className="block text-gray-300 hover:text-purple-400 transition-colors duration-300 text-sm">
                  Mobile Banking
                </a>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <h3 className="text-base lg:text-lg font-semibold text-white">Contact</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-3 text-gray-300">
                  <div className="w-7 h-7 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm">OneCard@myonecard.ai</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-6 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 Divinely Mobile. All rights reserved. | Powered by Kukaya Labs
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
