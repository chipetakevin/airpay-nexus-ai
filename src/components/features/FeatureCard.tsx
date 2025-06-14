
import React from 'react';
import { Shield, Smartphone, MessageSquare, Clock } from 'lucide-react';

interface FeatureCardProps {
  feature: {
    icon: React.ReactNode;
    title: string;
    description: string;
    graphic: string;
    color: string;
    bgColor: string;
    stats: string;
    mockupType: string;
  };
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, index }) => {
  const renderModernGraphic = (type: string, color: string, mockupType: string) => {
    const baseIconElement = (() => {
      switch (type) {
        case "security":
          return <Shield className="w-8 h-8 text-white" />;
        case "mobile":
          return <Smartphone className="w-8 h-8 text-white" />;
        case "whatsapp":
          return <MessageSquare className="w-8 h-8 text-white" />;
        case "delivery":
          return <Clock className="w-8 h-8 text-white" />;
        default:
          return <Shield className="w-8 h-8 text-white" />;
      }
    })();

    return (
      <div className="relative w-full max-w-md mx-auto">
        {/* Animated Card Container */}
        <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 overflow-hidden group hover:shadow-3xl transition-all duration-700 hover:scale-105">
          
          {/* Animated Background Gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-5 group-hover:opacity-10 transition-opacity duration-700`}></div>
          
          {/* Floating Particles Animation */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-2 h-2 bg-gradient-to-br ${color} rounded-full opacity-20 animate-pulse`}
                style={{
                  left: `${10 + (i * 8)}%`,
                  top: `${10 + (i * 6)}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${2 + (i % 3)}s`
                }}
              />
            ))}
          </div>

          {/* Main Icon with Enhanced Animation */}
          <div className="relative z-10 mb-8">
            <div className="relative mx-auto w-24 h-24">
              {/* Outer glow ring */}
              <div className={`absolute inset-0 bg-gradient-to-br ${color} rounded-full blur-xl opacity-30 animate-pulse group-hover:opacity-50 transition-opacity duration-700`}></div>
              {/* Middle ring */}
              <div className={`absolute inset-2 bg-gradient-to-br ${color} rounded-full blur-lg opacity-40 animate-pulse`} style={{ animationDelay: '0.5s' }}></div>
              {/* Icon container */}
              <div className={`relative w-full h-full bg-gradient-to-br ${color} rounded-full flex items-center justify-center shadow-2xl group-hover:rotate-12 transition-transform duration-700`}>
                {baseIconElement}
              </div>
            </div>
          </div>

          {/* Dynamic Content Based on Type */}
          <div className="relative z-10">
            {mockupType === "security" && (
              <div className="mb-6">
                {/* Security Mockup */}
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-semibold text-green-600">Secured</span>
                    </div>
                    <div className="text-xs text-gray-500">256-bit SSL</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-full bg-gray-200 rounded-full h-1">
                        <div className={`bg-gradient-to-r ${color} h-1 rounded-full animate-pulse`} style={{ width: '85%' }}></div>
                      </div>
                      <span className="text-xs text-gray-600">85%</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-full bg-gray-200 rounded-full h-1">
                        <div className={`bg-gradient-to-r ${color} h-1 rounded-full animate-pulse`} style={{ width: '92%', animationDelay: '0.5s' }}></div>
                      </div>
                      <span className="text-xs text-gray-600">92%</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {mockupType === "mobile" && (
              <div className="mb-6">
                {/* Mobile Phone Mockup */}
                <div className="mx-auto w-20 h-32 bg-gray-900 rounded-2xl p-1 shadow-xl">
                  <div className="w-full h-full bg-white rounded-xl relative overflow-hidden">
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gray-300 rounded-full"></div>
                    <div className="mt-4 space-y-1 px-2">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className={`h-1 bg-gradient-to-r ${color} rounded animate-pulse`} style={{ width: `${60 + i * 10}%`, animationDelay: `${i * 0.2}s` }}></div>
                      ))}
                    </div>
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gray-100 rounded-full"></div>
                  </div>
                </div>
              </div>
            )}

            {mockupType === "whatsapp" && (
              <div className="mb-6">
                {/* WhatsApp Chat Mockup */}
                <div className="bg-green-50 rounded-2xl p-4 border border-green-200">
                  <div className="space-y-2">
                    <div className="flex justify-end">
                      <div className="bg-green-500 text-white text-xs p-2 rounded-lg max-w-xs animate-fade-in">
                        Buy R50 airtime
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-white text-gray-800 text-xs p-2 rounded-lg max-w-xs shadow-sm animate-fade-in" style={{ animationDelay: '0.5s' }}>
                        ✅ Processing...
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-white text-gray-800 text-xs p-2 rounded-lg max-w-xs shadow-sm animate-fade-in" style={{ animationDelay: '1s' }}>
                        ✅ Delivered! Thank you!
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {mockupType === "delivery" && (
              <div className="mb-6">
                {/* Delivery Timer Mockup */}
                <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200">
                  <div className="text-center">
                    <div className={`text-2xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent animate-pulse`}>
                      00:15
                    </div>
                    <div className="text-xs text-gray-600 mb-2">Average delivery time</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={`bg-gradient-to-r ${color} h-2 rounded-full animate-pulse`} style={{ width: '50%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Content Section */}
          <div className="relative z-10 text-center">
            <h3 className={`text-xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent mb-3 group-hover:scale-105 transition-transform duration-500`}>
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              {feature.description}
            </p>
            
            {/* Enhanced Stats Badge */}
            <div className={`inline-flex items-center px-6 py-3 bg-gradient-to-r ${color} text-white text-sm font-bold rounded-full shadow-lg transform group-hover:scale-110 transition-all duration-500`}>
              <span className="animate-pulse">{feature.stats}</span>
            </div>
          </div>

          {/* Corner Decorative Element */}
          <div className={`absolute top-4 right-4 w-16 h-16 bg-gradient-to-br ${color} rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-700`}></div>
        </div>
      </div>
    );
  };

  return (
    <div 
      className="group transform transition-all duration-700 animate-fade-in hover:scale-105" 
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      {renderModernGraphic(feature.graphic, feature.color, feature.mockupType)}
    </div>
  );
};

export default FeatureCard;
