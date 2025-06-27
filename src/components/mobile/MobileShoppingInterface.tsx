import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, 
  Wifi, 
  Phone, 
  MessageCircle, 
  Star, 
  Zap, 
  Shield,
  Crown,
  Timer,
  Network,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MobileShoppingInterface = () => {
  const [activeService, setActiveService] = useState('airtime');
  const navigate = useNavigate();

  const serviceCategories = [
    {
      id: 'airtime',
      title: 'Airtime',
      icon: <CreditCard className="w-4 h-4" />,
      color: 'bg-blue-500',
      description: 'Top up airtime instantly'
    },
    {
      id: 'data',
      title: 'Data',
      icon: <Wifi className="w-4 h-4" />,
      color: 'bg-green-500',
      description: 'High-speed data bundles'
    },
    {
      id: 'porting',
      title: 'Porting',
      icon: <Phone className="w-4 h-4" />,
      color: 'bg-purple-500',
      description: 'AI-powered SIM porting'
    },
    {
      id: 'support',
      title: 'Support',
      icon: <MessageCircle className="w-4 h-4" />,
      color: 'bg-orange-500',
      description: '24/7 customer support'
    }
  ];

  const featuredServices = [
    {
      title: '5 Min Porting',
      subtitle: 'AI-powered SIM porting & RICA',
      icon: <Zap className="w-8 h-8 text-white" />,
      badge: 'Popular',
      badgeColor: 'bg-orange-500',
      bgColor: 'bg-gradient-to-br from-green-400 to-green-600',
      description: 'Fast and secure number porting with AI assistance'
    },
    {
      title: 'ICASA Compliant',
      subtitle: '99.7% regulatory compliance',
      icon: <Shield className="w-8 h-8 text-white" />,
      badge: 'Verified',
      badgeColor: 'bg-green-500',
      bgColor: 'bg-gradient-to-br from-blue-400 to-blue-600',
      description: 'Fully compliant with South African regulations'
    },
    {
      title: 'AI Platform',
      subtitle: 'Autonomous processing',
      icon: <Crown className="w-8 h-8 text-white" />,
      badge: 'Advanced',
      badgeColor: 'bg-purple-500',
      bgColor: 'bg-gradient-to-br from-purple-400 to-purple-600',
      description: 'Smart automation for seamless experiences'
    }
  ];

  const handleStartWhatsAppShopping = () => {
    navigate('/whatsapp-assistant?start-shopping=true');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-3 sm:p-4">
      <div className="max-w-6xl mx-auto space-y-4">
        {/* Header Section - More Compact */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Smart Deals Hub</h1>
          </div>
          <p className="text-sm text-gray-600 max-w-lg mx-auto">
            Experience lightning-fast mobile services with AI-powered solutions
          </p>
        </div>

        {/* Service Categories - Horizontal Compact Layout */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {serviceCategories.map((service) => (
            <Card 
              key={service.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg border-2 ${
                activeService === service.id 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-300'
              }`}
              onClick={() => setActiveService(service.id)}
            >
              <CardContent className="p-3 text-center">
                <div className={`w-8 h-8 ${service.color} rounded-lg flex items-center justify-center mx-auto mb-2 shadow-md`}>
                  {service.icon}
                </div>
                <h3 className="font-semibold text-xs sm:text-sm text-gray-900 mb-1">{service.title}</h3>
                <p className="text-xs text-gray-600 hidden sm:block">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Services - Vertical Compact Layout */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            Featured Services
          </h2>
          
          <div className="space-y-3">
            {featuredServices.map((service, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-200 border border-gray-200">
                <CardContent className="p-0">
                  <div className="flex items-center">
                    {/* Icon Section - Compact */}
                    <div className={`${service.bgColor} p-4 flex items-center justify-center flex-shrink-0`}>
                      {service.icon}
                    </div>
                    
                    {/* Content Section */}
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-gray-900 text-sm sm:text-base truncate">
                              {service.title}
                            </h3>
                            <Badge className={`${service.badgeColor} text-white text-xs px-2 py-0.5 whitespace-nowrap`}>
                              {service.badge}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-700 font-medium mb-1">{service.subtitle}</p>
                          <p className="text-xs text-gray-600 hidden sm:block">{service.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* WhatsApp Shopping CTA */}
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200">
          <CardContent className="p-4">
            <div className="text-center">
              <h3 className="font-bold text-green-800 mb-2 flex items-center justify-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Instant WhatsApp Shopping
              </h3>
              <p className="text-sm text-green-700 mb-4">
                Skip the forms - shop directly through WhatsApp with our AI assistant
              </p>
              <Button 
                onClick={handleStartWhatsAppShopping}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Start Shopping on WhatsApp
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats - Horizontal Compact */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="p-4">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Timer className="w-4 h-4" />
                  <span className="text-xs font-medium">Speed</span>
                </div>
                <p className="text-lg font-bold">5 Min</p>
                <p className="text-xs opacity-90">Avg. Processing</p>
              </div>
              <div>
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Shield className="w-4 h-4" />
                  <span className="text-xs font-medium">Security</span>
                </div>
                <p className="text-lg font-bold">99.7%</p>
                <p className="text-xs opacity-90">Compliance</p>
              </div>
              <div>
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Network className="w-4 h-4" />
                  <span className="text-xs font-medium">Networks</span>
                </div>
                <p className="text-lg font-bold">All</p>
                <p className="text-xs opacity-90">Supported</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MobileShoppingInterface;
