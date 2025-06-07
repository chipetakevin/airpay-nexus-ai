
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Smartphone, 
  Menu, 
  X, 
  ChevronDown,
  MessageCircle,
  Zap,
  Users,
  CreditCard,
  ScanText,
  Building2,
  ArrowRight,
  Star
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPlatformDropdownOpen, setIsPlatformDropdownOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const platformServices = [
    {
      title: 'Enterprise Platform',
      description: 'Complete business solutions for enterprises',
      icon: <Building2 className="w-5 h-5 text-blue-600" />,
      href: '/platform',
      badge: 'Enterprise',
      stats: '500+ Companies',
      features: ['Multi-tenant', 'API Gateway', 'Analytics'],
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      title: 'BaaS Platform',
      description: 'Backend-as-a-Service infrastructure',
      icon: <Zap className="w-5 h-5 text-purple-600" />,
      href: '/platform/baas',
      badge: 'Developer',
      stats: '10K+ APIs',
      features: ['Real-time DB', 'Auth', 'Storage'],
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Scan-to-Text AI',
      description: 'Advanced document processing with AI',
      icon: <ScanText className="w-5 h-5 text-emerald-600" />,
      href: '/scan-to-text',
      badge: 'AI Powered',
      stats: '99.2% Accuracy',
      features: ['OCR', 'ML Processing', 'Enterprise'],
      gradient: 'from-emerald-500 to-emerald-600'
    },
    {
      title: 'WhatsApp Assistant',
      description: 'AI-powered customer communication',
      icon: <MessageCircle className="w-5 h-5 text-green-600" />,
      href: '/whatsapp-assistant',
      badge: 'Popular',
      stats: '24/7 Support',
      features: ['Auto Reply', 'AI Chat', 'Integration'],
      gradient: 'from-green-500 to-green-600'
    },
    {
      title: 'USSD System',
      description: 'Universal mobile access platform',
      icon: <Smartphone className="w-5 h-5 text-orange-600" />,
      href: '/ussd-system',
      badge: 'Universal',
      stats: '100% Coverage',
      features: ['USSD Codes', 'No Internet', 'Instant'],
      gradient: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Devine Mobile
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </Link>
            
            {/* Top Up Tab - Enhanced Design */}
            <Link 
              to="/portal?tab=onecard" 
              className="group relative flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <CreditCard className="w-4 h-4" />
              <span>Top Up</span>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
            
            {/* Enhanced Platform Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsPlatformDropdownOpen(true)}
              onMouseLeave={() => setIsPlatformDropdownOpen(false)}
            >
              <button className="flex items-center text-gray-700 hover:text-blue-600 transition-colors py-2">
                Platform
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              
              {isPlatformDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 py-4 z-50 transform opacity-100 scale-100 transition-all duration-200">
                  <div className="px-4 pb-3 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-900 text-sm">Platform Services</h3>
                    <p className="text-xs text-gray-500 mt-1">Choose the right solution for your needs</p>
                  </div>
                  
                  <div className="py-2 max-h-96 overflow-y-auto">
                    {platformServices.map((service, index) => (
                      <Link 
                        key={index}
                        to={service.href} 
                        className="group flex items-start px-4 py-3 hover:bg-gray-50 transition-colors"
                      >
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${service.gradient} bg-opacity-10 mr-3 group-hover:scale-110 transition-transform`}>
                          {service.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-sm text-gray-900 group-hover:text-blue-600 transition-colors">
                              {service.title}
                            </h4>
                            <span className={`text-xs px-2 py-0.5 rounded-full bg-gradient-to-r ${service.gradient} text-white`}>
                              {service.badge}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 mb-2 line-clamp-1">{service.description}</p>
                          <div className="flex items-center gap-3 mb-2">
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-yellow-500" />
                              <span className="text-xs font-medium text-gray-700">{service.stats}</span>
                            </div>
                            <ArrowRight className="w-3 h-3 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {service.features.map((feature, idx) => (
                              <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  
                  <div className="px-4 pt-3 border-t border-gray-100">
                    <Link 
                      to="/platform" 
                      className="flex items-center justify-center w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
                    >
                      View All Services
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link to="/spaza-ai" className="text-gray-700 hover:text-blue-600 transition-colors">
              Spaza AI
            </Link>
            <Link to="/portal" className="text-gray-700 hover:text-blue-600 transition-colors">
              Portal
            </Link>
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden lg:block">
            <Link to="/portal">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Enhanced Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t bg-white">
            <nav className="flex flex-col space-y-1">
              <Link 
                to="/" 
                className="px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors rounded-lg mx-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              
              {/* Mobile Top Up - Enhanced */}
              <Link 
                to="/portal?tab=onecard" 
                className="mx-2 my-2 flex items-center justify-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-3 rounded-lg font-medium shadow-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                <CreditCard className="w-5 h-5" />
                <span>Top Up Now</span>
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              </Link>

              {/* Mobile Platform Services */}
              <div className="px-2 py-2">
                <h3 className="px-2 py-1 text-sm font-semibold text-gray-500 uppercase tracking-wide">Platform Services</h3>
                <div className="space-y-1">
                  {platformServices.map((service, index) => (
                    <Link 
                      key={index}
                      to={service.href} 
                      className="flex items-center px-3 py-3 hover:bg-gray-50 rounded-lg transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${service.gradient} bg-opacity-10 mr-3`}>
                        {service.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-sm text-gray-900">{service.title}</h4>
                          <span className={`text-xs px-2 py-0.5 rounded-full bg-gradient-to-r ${service.gradient} text-white`}>
                            {service.badge}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600">{service.description}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-3 h-3 text-yellow-500" />
                          <span className="text-xs text-gray-700">{service.stats}</span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </Link>
                  ))}
                </div>
              </div>

              <Link 
                to="/spaza-ai" 
                className="px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors rounded-lg mx-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Spaza AI
              </Link>
              <Link 
                to="/portal" 
                className="px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors rounded-lg mx-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Portal
              </Link>
              
              <div className="px-2 pt-4">
                <Link to="/portal" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg">
                    Get Started
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
