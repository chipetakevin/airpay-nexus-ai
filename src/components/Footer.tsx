
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, ExternalLink, Smartphone, Shield, Zap, Globe, CheckCircle, ArrowRight, Star, Users, Clock, BarChart3, MessageCircle, CreditCard, Wifi, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Footer = () => {
  // Enhanced Futuristic Divinely Mobile Logo Component
  const DivinelyLogoIcon = () => (
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

  const stats = [
    { label: "Success Rate", value: "99.7%", icon: <CheckCircle className="w-4 h-4" /> },
    { label: "Avg Processing", value: "5 Min", icon: <Clock className="w-4 h-4" /> },
    { label: "Active Users", value: "50K+", icon: <Users className="w-4 h-4" /> },
    { label: "Monthly Growth", value: "45%", icon: <BarChart3 className="w-4 h-4" /> }
  ];

  const features = [
    {
      icon: <Zap className="w-6 h-6 text-blue-600" />,
      title: "#1 Fastest Porting",
      description: "Complete SIM porting and RICA registration in 5 minutes",
      badge: "Most Popular"
    },
    {
      icon: <Shield className="w-6 h-6 text-green-600" />,
      title: "ICASA Compliant",
      description: "99.7% accuracy with full regulatory compliance",
      badge: "Verified"
    },
    {
      icon: <Globe className="w-6 h-6 text-purple-600" />,
      title: "AI-Powered Processing",
      description: "Autonomous SIM porting and RICA platform",
      badge: "Advanced"
    }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Divinely Mobile BaaS Section */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-900 py-8">
        <div className="container mx-auto px-4">
          {/* Compact Header */}
          <div className="bg-white/95 backdrop-blur-sm border border-gray-200/50 shadow-sm rounded-2xl mb-6">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                {/* Logo and Title - Compact */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                    <Smartphone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">Divinely Mobile BaaS</h2>
                    <p className="text-xs text-gray-600">Intelligent Porting & RICA Platform</p>
                  </div>
                </div>

                {/* Compact Badges */}
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-100 text-green-800 font-semibold text-xs">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    ICASA Compliant
                  </Badge>
                </div>
              </div>

              {/* Compact Stats Row */}
              <div className="grid grid-cols-4 gap-2">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-1 text-blue-600">
                      {stat.icon}
                    </div>
                    <div className="text-sm font-bold text-gray-900">{stat.value}</div>
                    <div className="text-xs text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Feature Card - Streamlined */}
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 shadow-lg mb-6">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <Badge className="bg-yellow-500 text-yellow-900 font-bold mb-1 text-xs">
                      <Star className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      Port & RICA in 5 Minutes
                    </h3>
                    <p className="text-gray-700 text-xs">
                      Complete SIM porting and RICA registration instantly
                    </p>
                  </div>
                </div>
                <Button className="bg-green-600 hover:bg-green-700 text-white text-sm">
                  Start Process
                  <ArrowRight className="w-3 h-3 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Features Grid - More Compact */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-200">
                <CardHeader className="text-center pb-2">
                  <div className="w-10 h-10 mx-auto mb-2 bg-gray-100 rounded-full flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <Badge className="mb-2 bg-blue-100 text-blue-800 text-xs">{feature.badge}</Badge>
                  <CardTitle className="text-sm">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center pt-0">
                  <p className="text-gray-600 text-xs">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Services - More Compact */}
          <Card className="bg-white shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-center text-sm">Quick Mobile Services</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <Button variant="outline" className="h-12 flex flex-col items-center justify-center">
                  <CreditCard className="w-4 h-4 mb-1 text-blue-600" />
                  <span className="text-xs">Airtime</span>
                </Button>
                <Button variant="outline" className="h-12 flex flex-col items-center justify-center">
                  <Wifi className="w-4 h-4 mb-1 text-green-600" />
                  <span className="text-xs">Data</span>
                </Button>
                <Button variant="outline" className="h-12 flex flex-col items-center justify-center">
                  <Phone className="w-4 h-4 mb-1 text-purple-600" />
                  <span className="text-xs">Porting</span>
                </Button>
                <Button variant="outline" className="h-12 flex flex-col items-center justify-center">
                  <MessageCircle className="w-4 h-4 mb-1 text-orange-600" />
                  <span className="text-xs">Support</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Original Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <DivinelyLogoIcon />
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent leading-tight font-montserrat">
                  Divinely
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
            © 2024 Divinely Mobile. All rights reserved. | Powered by Kukaya Labs
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
