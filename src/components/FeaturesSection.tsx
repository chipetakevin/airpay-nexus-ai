import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { 
  Smartphone, 
  CreditCard, 
  TrendingUp, 
  Shield, 
  Users, 
  Zap,
  MessageCircle,
  Clock,
  BarChart3,
  PieChart,
  LineChart,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const FeaturesSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  console.log('FeaturesSection rendered, isOpen:', isOpen);

  const features = [
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: "OneCard Rewards",
      description: "Earn 2.5% cashback on every purchase with our exclusive OneCard system",
      graphic: "rewards",
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-50",
      stats: "2.5% Cashback",
      mockupType: "dashboard"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Processing",
      description: "Lightning-fast airtime delivery with AI-powered processing",
      graphic: "processing",
      color: "from-yellow-500 to-orange-600",
      bgColor: "bg-yellow-50",
      stats: "AI Powered",
      mockupType: "chart"
    }
  ];

  const renderEnhancedGraphic = (type: string, color: string, mockupType: string) => {
    const baseIconElement = (() => {
      switch (type) {
        case "rewards":
          return <CreditCard className="w-6 h-6 text-white" />;
        case "processing":
          return <Zap className="w-6 h-6 text-white" />;
        default:
          return <Smartphone className="w-6 h-6 text-white" />;
      }
    })();

    return (
      <div className="relative w-full max-w-sm mx-auto">
        {/* Modern Card Container */}
        <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-full h-full">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-gray-400 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`
                  }}
                />
              ))}
            </div>
          </div>

          {/* Main Icon with Glow */}
          <div className="relative z-10 mb-6">
            <div className="relative mx-auto w-20 h-20">
              <div className={`absolute inset-0 bg-gradient-to-br ${color} rounded-2xl blur-lg opacity-50 animate-pulse`}></div>
              <div className={`relative w-full h-full bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center shadow-xl`}>
                {baseIconElement}
              </div>
            </div>
          </div>

          {mockupType === "dashboard" && (
            <div className="relative z-10">
              {/* Dashboard Mockup */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {/* Mini Charts */}
                  <div className="bg-white rounded-lg p-2 shadow-sm">
                    <div className="flex items-end space-x-1 h-8">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`bg-gradient-to-t ${color} rounded-sm animate-pulse`}
                          style={{
                            width: '4px',
                            height: `${20 + Math.random() * 20}px`,
                            animationDelay: `${i * 0.1}s`
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-2 shadow-sm flex items-center justify-center">
                    <div className={`w-8 h-8 bg-gradient-to-br ${color} rounded-full relative overflow-hidden`}>
                      <div className="absolute inset-1 bg-white rounded-full"></div>
                      <div className={`absolute inset-2 bg-gradient-to-br ${color} rounded-full`}></div>
                    </div>
                  </div>
                </div>
                {/* Status Indicators */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-1 bg-green-400 rounded-full"></div>
                    <div className="text-xs font-bold text-green-600">99.7%</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="w-6 h-1 bg-blue-400 rounded-full"></div>
                    <div className="text-xs font-bold text-blue-600">Active</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {mockupType === "chart" && (
            <div className="relative z-10">
              {/* Advanced Chart Mockup */}
              <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
                <div className="space-y-3">
                  {/* Real-time Chart */}
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <div className="flex items-end justify-between h-12 space-x-1">
                      {[...Array(8)].map((_, i) => (
                        <div key={i} className="flex flex-col items-center space-y-1">
                          <div
                            className={`bg-gradient-to-t ${color} rounded-sm animate-pulse`}
                            style={{
                              width: '3px',
                              height: `${15 + Math.random() * 25}px`,
                              animationDelay: `${i * 0.2}s`
                            }}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>0s</span>
                      <span>30s</span>
                    </div>
                  </div>
                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white rounded p-2 text-center shadow-sm">
                      <div className="text-xs font-bold text-green-600">99.7%</div>
                      <div className="text-xs text-gray-500">Success</div>
                    </div>
                    <div className="bg-white rounded p-2 text-center shadow-sm">
                      <div className="text-xs font-bold text-blue-600">&lt; 30s</div>
                      <div className="text-xs text-gray-500">Speed</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Section with Enhanced Stats */}
          <div className="relative z-10 mt-6 text-center">
            <h3 className={`text-lg font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent mb-2`}>
              {type === "rewards" ? "OneCard Rewards" : "Instant Processing"}
            </h3>
            <p className="text-gray-600 text-sm mb-3">
              {type === "rewards" ? "Earn 2.5% cashback on every purchase" : "Lightning-fast airtime delivery with AI-powered processing"}
            </p>
            
            {/* Enhanced Stats Badge */}
            <div className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${color} text-white text-xs font-bold rounded-full shadow-lg animate-pulse`}>
              {type === "rewards" ? "2.5% Cashback" : "AI Powered"}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mb-6">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
            Why Choose Divinely Mobile?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience the future of airtime purchasing with our AI-driven platform
          </p>
          
          {/* Stats Bar */}
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm">
            <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-semibold text-gray-700">24/7 Available</span>
            </div>
            <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="font-semibold text-gray-700">6 Networks</span>
            </div>
            <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="font-semibold text-gray-700">AI Powered</span>
            </div>
          </div>
        </div>

        {/* Collapsible Features Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <Button 
              onClick={() => {
                console.log('Button clicked, current isOpen:', isOpen);
                setIsOpen(!isOpen);
              }}
              variant="outline" 
              className="bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white/90 hover:border-blue-300 transition-all duration-300 px-6 py-3 text-base font-semibold"
            >
              <span className="mr-2">
                {isOpen ? "Hide Features" : "View Features"}
              </span>
              {isOpen ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </Button>
          </div>

          {/* Feature Grid - Only show when isOpen is true */}
          {isOpen && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {features.map((feature, index) => (
                  <div key={index} className="group transform hover:scale-105 transition-all duration-500 animate-fade-in">
                    {renderEnhancedGraphic(feature.graphic, feature.color, feature.mockupType)}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Network Support Visualization */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Multi-Network Support</h3>
            
            {/* Mobile-First Grid Layout */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 mb-6">
              {[
                { name: 'MTN', color: 'from-yellow-500 to-orange-500' },
                { name: 'Vodacom', color: 'from-red-500 to-pink-500' },
                { name: 'Cell C', color: 'from-blue-500 to-indigo-500' },
                { name: 'Telkom', color: 'from-purple-500 to-violet-500' },
                { name: 'Divinely Mobile', color: 'from-green-500 to-emerald-500' },
                { name: 'Virgin Mobile', color: 'from-pink-500 to-rose-500' }
              ].map((network, index) => (
                <div key={network.name} className="flex flex-col items-center group">
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 lg:w-18 lg:h-18 bg-gradient-to-br ${network.color} rounded-2xl flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-lg transform hover:scale-110 transition-all duration-300 group-hover:shadow-2xl`} 
                       style={{ animationDelay: `${index * 0.1}s` }}>
                    <span className="text-center leading-tight px-1">
                      {network.name === 'Divinely Mobile' ? (
                        <span className="block">
                          <span className="block text-[10px] sm:text-xs">Divinely</span>
                          <span className="block text-[10px] sm:text-xs -mt-1">Mobile</span>
                        </span>
                      ) : network.name === 'Virgin Mobile' ? (
                        <span className="block">
                          <span className="block text-[10px] sm:text-xs">Virgin</span>
                          <span className="block text-[10px] sm:text-xs -mt-1">Mobile</span>
                        </span>
                      ) : network.name === 'Vodacom' ? (
                        <span className="block text-[11px] sm:text-sm font-bold">Vodacom</span>
                      ) : (
                        network.name
                      )}
                    </span>
                  </div>
                  <div className="w-1 h-6 sm:h-8 bg-gradient-to-b from-blue-500 to-transparent mt-2 group-hover:from-blue-600 transition-colors"></div>
                </div>
              ))}
            </div>
            
            <p className="text-gray-600 text-sm sm:text-base">All major South African networks - all in one platform</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
