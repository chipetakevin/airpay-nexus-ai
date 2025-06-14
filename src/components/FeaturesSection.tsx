
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
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
  LineChart
} from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "WhatsApp Shopping",
      description: "Shop directly through WhatsApp - no app needed!",
      graphic: "whatsapp",
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50",
      stats: "24/7 Available"
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: "OneCard Rewards",
      description: "Earn 2.5% cashback on every purchase with our exclusive OneCard system",
      graphic: "rewards",
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-50",
      stats: "2.5% Cashback"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Instant Delivery",
      description: "Airtime and data delivered within 30 seconds",
      graphic: "speed",
      color: "from-orange-500 to-red-600",
      bgColor: "bg-orange-50",
      stats: "< 30 Seconds"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Safe",
      description: "Bank-grade security for all transactions",
      graphic: "security",
      color: "from-purple-500 to-violet-600",
      bgColor: "bg-purple-50",
      stats: "Bank-Level Security"
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile Optimized",
      description: "Designed specifically for smartphone users",
      graphic: "mobile",
      color: "from-cyan-500 to-blue-600",
      bgColor: "bg-cyan-50",
      stats: "Mobile First"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Processing",
      description: "Lightning-fast airtime delivery with AI-powered processing",
      graphic: "processing",
      color: "from-yellow-500 to-orange-600",
      bgColor: "bg-yellow-50",
      stats: "AI Powered"
    }
  ];

  const renderGraphic = (type: string, color: string) => {
    switch (type) {
      case "whatsapp":
        return (
          <div className="relative">
            <div className="w-20 h-20 mx-auto mb-4 relative">
              <div className={`absolute inset-0 bg-gradient-to-br ${color} rounded-2xl rotate-3 opacity-20`}></div>
              <div className={`absolute inset-0 bg-gradient-to-br ${color} rounded-2xl -rotate-3 opacity-30`}></div>
              <div className={`relative w-full h-full bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center shadow-xl`}>
                <MessageCircle className="w-10 h-10 text-white" />
              </div>
            </div>
            <div className="flex justify-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-75"></div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-150"></div>
            </div>
          </div>
        );
      case "rewards":
        return (
          <div className="relative">
            <div className="w-20 h-20 mx-auto mb-4 relative">
              <div className={`w-full h-full bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center shadow-xl relative overflow-hidden`}>
                <CreditCard className="w-10 h-10 text-white z-10" />
                <div className="absolute top-2 right-2 w-3 h-3 bg-yellow-300 rounded-full animate-ping"></div>
                <div className="absolute bottom-2 left-2 w-2 h-2 bg-green-300 rounded-full animate-bounce"></div>
              </div>
            </div>
            <div className="flex justify-center items-center space-x-2">
              <PieChart className="w-4 h-4 text-blue-500" />
              <span className="text-xs font-semibold text-blue-600">2.5%</span>
            </div>
          </div>
        );
      case "speed":
        return (
          <div className="relative">
            <div className="w-20 h-20 mx-auto mb-4 relative">
              <div className={`w-full h-full bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center shadow-xl relative overflow-hidden`}>
                <Clock className="w-10 h-10 text-white animate-spin" style={{ animationDuration: '3s' }} />
                <div className="absolute inset-0 border-4 border-white/20 rounded-2xl animate-pulse"></div>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className={`w-1 h-4 bg-orange-400 rounded-full animate-bounce`} style={{ animationDelay: `${i * 0.1}s` }}></div>
                ))}
              </div>
            </div>
          </div>
        );
      case "security":
        return (
          <div className="relative">
            <div className="w-20 h-20 mx-auto mb-4 relative">
              <div className={`w-full h-full bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center shadow-xl relative`}>
                <Shield className="w-10 h-10 text-white" />
                <div className="absolute -inset-2 border-2 border-purple-300 rounded-3xl animate-ping"></div>
              </div>
            </div>
            <div className="flex justify-center space-x-2">
              <div className="w-6 h-1 bg-purple-400 rounded-full"></div>
              <div className="w-4 h-1 bg-purple-300 rounded-full"></div>
              <div className="w-2 h-1 bg-purple-200 rounded-full"></div>
            </div>
          </div>
        );
      case "mobile":
        return (
          <div className="relative">
            <div className="w-20 h-20 mx-auto mb-4 relative">
              <div className={`w-full h-full bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center shadow-xl relative overflow-hidden`}>
                <Smartphone className="w-10 h-10 text-white" />
                <div className="absolute top-1 left-1 w-16 h-2 bg-white/20 rounded-full"></div>
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-white/30 rounded-full"></div>
              </div>
            </div>
            <div className="flex justify-center">
              <BarChart3 className="w-6 h-4 text-cyan-500" />
            </div>
          </div>
        );
      case "processing":
        return (
          <div className="relative">
            <div className="w-20 h-20 mx-auto mb-4 relative">
              <div className={`w-full h-full bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center shadow-xl relative overflow-hidden`}>
                <Zap className="w-10 h-10 text-white animate-pulse" />
                <div className="absolute top-0 left-0 w-full h-1 bg-white/50"></div>
                <div className="absolute top-0 left-0 w-1/3 h-1 bg-white animate-pulse"></div>
              </div>
            </div>
            <div className="flex justify-center">
              <LineChart className="w-6 h-4 text-yellow-500" />
            </div>
          </div>
        );
      default:
        return null;
    }
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

        {/* Enhanced Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 bg-white overflow-hidden relative">
              {/* Background Pattern */}
              <div className={`absolute top-0 right-0 w-32 h-32 ${feature.bgColor} rounded-full opacity-10 transform translate-x-16 -translate-y-16`}></div>
              <div className={`absolute bottom-0 left-0 w-20 h-20 ${feature.bgColor} rounded-full opacity-20 transform -translate-x-10 translate-y-10`}></div>
              
              <CardContent className="p-8 text-center relative z-10">
                {/* Enhanced Graphic */}
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {renderGraphic(feature.graphic, feature.color)}
                </div>

                {/* Feature Title with Gradient */}
                <h3 className={`text-xl font-bold bg-gradient-to-r ${feature.color} bg-clip-text text-transparent mb-4 group-hover:scale-105 transition-transform`}>
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{feature.description}</p>

                {/* Stats Badge */}
                <div className={`inline-flex items-center px-3 py-1 bg-gradient-to-r ${feature.color} text-white text-xs font-semibold rounded-full shadow-lg`}>
                  {feature.stats}
                </div>

                {/* Hover Effect Element */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-lg`}></div>
              </CardContent>
            </Card>
          ))}
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
