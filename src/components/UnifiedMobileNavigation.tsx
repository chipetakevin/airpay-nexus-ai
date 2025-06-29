
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Smartphone, Globe, Shield, Zap, Phone, 
  ArrowRight, Star, Sparkles, ChevronDown, ChevronUp
} from 'lucide-react';

const UnifiedMobileNavigation = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const handleStartRICA = () => {
    window.location.href = '/portal?tab=onecard&network=divinely%20mobile&dealType=airtime&action=rica';
  };

  const handleStartPorting = () => {
    window.location.href = '/portal?tab=onecard&network=divinely%20mobile&dealType=porting&action=port';
  };

  const handleBaaSPortal = () => {
    window.location.href = '/baas-platform';
  };

  const handlePlatformDashboard = () => {
    window.location.href = '/platform-dashboard';
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const mainCategories = [
    {
      id: 'divinely-baas',
      title: "Divinely BaaS Platform",
      description: "Complete Mobile & Banking Solutions",
      icon: <Globe className="w-8 h-8 text-white" />,
      gradient: "from-purple-500 via-violet-500 to-purple-600",
      borderColor: "border-purple-400",
      glow: "shadow-[0_0_30px_rgba(168,85,247,0.5)]",
      badge: "🚀 ENTERPRISE",
      badgeColor: "bg-gradient-to-r from-purple-500 to-pink-600 text-white",
      subServices: [
        {
          title: "Mobile Porting & RICA",
          description: "5-Min RICA & Number Porting",
          icon: <Phone className="w-6 h-6 text-white" />,
          gradient: "from-orange-500 via-red-500 to-pink-600",
          badge: "🔥 5-MIN RICA",
          badgeColor: "bg-gradient-to-r from-red-500 to-orange-500 text-white animate-pulse",
          actions: [
            {
              label: "Start RICA Now",
              action: handleStartRICA,
              primary: true
            },
            {
              label: "Port Number",
              action: handleStartPorting,
              primary: false
            }
          ]
        },
        {
          title: "Mobile Divinely BaaS Portal",
          description: "Banking & Mobile Platform Access",
          icon: <Sparkles className="w-6 h-6 text-white" />,
          gradient: "from-blue-500 via-cyan-500 to-teal-600",
          badge: "💎 PREMIUM",
          badgeColor: "bg-gradient-to-r from-blue-500 to-cyan-600 text-white",
          actions: [
            {
              label: "Access Portal",
              action: handleBaaSPortal,
              primary: true
            },
            {
              label: "Dashboard",
              action: handlePlatformDashboard,
              primary: false
            }
          ]
        }
      ]
    }
  ];

  return (
    <section className="py-8 px-4 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <div className="container mx-auto max-w-4xl">
        {/* Enhanced Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Badge className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white px-4 py-2 text-sm font-bold animate-pulse shadow-lg">
              <Star className="w-4 h-4 mr-2" />
              Unified Mobile Platform
            </Badge>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-black mb-4 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
              All-in-One
            </span>
            <br />
            <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 bg-clip-text text-transparent">
              Mobile Solutions
            </span>
          </h2>
          
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-6 font-medium">
            Complete mobile services ecosystem - from RICA to enterprise banking solutions
          </p>
        </div>

        {/* Main Category Cards */}
        <div className="space-y-6 mb-8">
          {mainCategories.map((category, index) => (
            <div key={category.id}>
              {/* Main Category Card */}
              <Card 
                className={`hover:shadow-2xl transition-all duration-500 transform hover:scale-105 bg-gradient-to-br ${category.gradient} border-4 ${category.borderColor} relative overflow-hidden group ${category.glow} cursor-pointer`}
                onClick={() => toggleCategory(category.id)}
                style={{
                  animation: 'float 6s ease-in-out infinite',
                  animationDelay: `${index * 2}s`
                }}
              >
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>
                
                <CardContent className="p-6 text-center relative z-10">
                  {/* Enhanced Badge */}
                  <div className="absolute -top-2 -right-2 z-20">
                    <Badge className={`${category.badgeColor} text-xs font-black px-3 py-1 rotate-12 shadow-lg`}>
                      {category.badge}
                    </Badge>
                  </div>
                  
                  {/* Icon and Expand Indicator */}
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                      <div className="p-2 rounded-full bg-white/30 backdrop-blur-sm">
                        {category.icon}
                      </div>
                    </div>
                    <div className="text-white">
                      {expandedCategory === category.id ? (
                        <ChevronUp className="w-6 h-6" />
                      ) : (
                        <ChevronDown className="w-6 h-6" />
                      )}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-black text-white mb-2 drop-shadow-lg">{category.title}</h3>
                  <p className="text-white/90 text-sm mb-4 font-semibold drop-shadow">{category.description}</p>
                  
                  <div className="text-white/80 text-xs font-medium">
                    Click to {expandedCategory === category.id ? 'collapse' : 'expand'} services
                  </div>
                </CardContent>
              </Card>

              {/* Sub-Services (Expandable) */}
              {expandedCategory === category.id && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 animate-in slide-in-from-top-4 duration-300">
                  {category.subServices.map((service, serviceIndex) => (
                    <Card 
                      key={serviceIndex}
                      className={`hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-br ${service.gradient} border-2 border-white/20 relative overflow-hidden group`}
                    >
                      <CardContent className="p-4 text-center relative z-10">
                        {/* Service Badge */}
                        <div className="absolute -top-1 -right-1 z-20">
                          <Badge className={`${service.badgeColor} text-xs font-bold px-2 py-1 text-xs shadow-md`}>
                            {service.badge}
                          </Badge>
                        </div>
                        
                        {/* Service Icon */}
                        <div className="w-12 h-12 mx-auto mb-3 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                          {service.icon}
                        </div>
                        
                        {/* Service Content */}
                        <h4 className="text-lg font-bold text-white mb-2 drop-shadow">{service.title}</h4>
                        <p className="text-white/90 text-xs mb-3 font-medium drop-shadow">{service.description}</p>
                        
                        {/* Service Actions */}
                        <div className="space-y-2">
                          {service.actions.map((action, actionIndex) => (
                            <Button
                              key={actionIndex}
                              onClick={(e) => {
                                e.stopPropagation();
                                action.action();
                              }}
                              className={`w-full transition-all duration-300 font-bold text-xs ${
                                action.primary 
                                  ? 'bg-white text-gray-800 hover:bg-gray-100 shadow-md hover:scale-105' 
                                  : 'bg-white/20 text-white border border-white/30 hover:bg-white/30 backdrop-blur-sm'
                              }`}
                              size="sm"
                            >
                              {action.label}
                              <ArrowRight className="w-3 h-3 ml-1" />
                            </Button>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick Access Features */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-blue-200">
          <h3 className="text-2xl font-black text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ⚡ Quick Access Features
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="group hover:scale-110 transition-transform duration-300 cursor-pointer p-3 rounded-lg hover:bg-blue-50" onClick={handleStartRICA}>
              <div className="flex justify-center mb-2">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-sm font-bold text-gray-900">99.7% Success</div>
              <div className="text-xs text-gray-600">RICA Rate</div>
            </div>
            <div className="group hover:scale-110 transition-transform duration-300 cursor-pointer p-3 rounded-lg hover:bg-purple-50" onClick={handleStartPorting}>
              <div className="flex justify-center mb-2">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-sm font-bold text-gray-900">5 Minutes</div>
              <div className="text-xs text-gray-600">Avg Porting</div>
            </div>
            <div className="group hover:scale-110 transition-transform duration-300 cursor-pointer p-3 rounded-lg hover:bg-green-50" onClick={handleBaaSPortal}>
              <div className="flex justify-center mb-2">
                <Globe className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-sm font-bold text-gray-900">Enterprise</div>
              <div className="text-xs text-gray-600">BaaS Ready</div>
            </div>
            <div className="group hover:scale-110 transition-transform duration-300 cursor-pointer p-3 rounded-lg hover:bg-yellow-50" onClick={handlePlatformDashboard}>
              <div className="flex justify-center mb-2">
                <Sparkles className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="text-sm font-bold text-gray-900">AI Powered</div>
              <div className="text-xs text-gray-600">Platform</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UnifiedMobileNavigation;
