
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
        {/* Enhanced Animated Card Container */}
        <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 overflow-hidden group hover:shadow-3xl transition-all duration-700 hover:scale-105 animate-fade-in">
          
          {/* Enhanced Animated Background Gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-5 group-hover:opacity-15 transition-all duration-700 animate-pulse-glow`}></div>
          
          {/* Enhanced Floating Particles Animation */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-2 h-2 bg-gradient-to-br ${color} rounded-full opacity-20 animate-float`}
                style={{
                  left: `${10 + (i * 6)}%`,
                  top: `${10 + (i * 5)}%`,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: `${3 + (i % 4)}s`
                }}
              />
            ))}
          </div>

          {/* Shimmer Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform -skew-x-12 group-hover:animate-shimmer"></div>

          {/* Main Icon with Multi-layered Animation */}
          <div className="relative z-10 mb-8">
            <div className="relative mx-auto w-24 h-24">
              {/* Outer pulsing ring */}
              <div className={`absolute inset-0 bg-gradient-to-br ${color} rounded-full blur-xl opacity-20 animate-pulse group-hover:opacity-40 transition-all duration-700 group-hover:scale-110`}></div>
              {/* Middle rotating ring */}
              <div className={`absolute inset-1 bg-gradient-to-br ${color} rounded-full blur-lg opacity-30 group-hover:animate-spin group-hover:opacity-50 transition-all duration-1000`} style={{ animationDuration: '8s' }}></div>
              {/* Inner glow ring */}
              <div className={`absolute inset-3 bg-gradient-to-br ${color} rounded-full blur-md opacity-40 animate-pulse`} style={{ animationDelay: '0.5s' }}></div>
              {/* Icon container with enhanced animations */}
              <div className={`relative w-full h-full bg-gradient-to-br ${color} rounded-full flex items-center justify-center shadow-2xl group-hover:rotate-12 group-hover:scale-110 transition-all duration-700 animate-float`}>
                <div className="transform group-hover:scale-125 transition-transform duration-500">
                  {baseIconElement}
                </div>
              </div>
              
              {/* Additional floating elements around icon */}
              <div className={`absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br ${color} rounded-full opacity-60 animate-bounce`} style={{ animationDelay: '1s' }}></div>
              <div className={`absolute -bottom-1 -left-1 w-3 h-3 bg-gradient-to-br ${color} rounded-full opacity-40 animate-pulse`} style={{ animationDelay: '1.5s' }}></div>
            </div>
          </div>

          {/* Enhanced Dynamic Content Based on Type */}
          <div className="relative z-10">
            {mockupType === "security" && (
              <div className="mb-6 transform group-hover:scale-105 transition-transform duration-500">
                {/* Enhanced Security Mockup */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4 border border-gray-200 shadow-inner">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
                      <span className="text-xs font-semibold text-green-600 animate-fade-in">Secured</span>
                    </div>
                    <div className="text-xs text-gray-500 font-mono">256-bit SSL</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                        <div className={`bg-gradient-to-r ${color} h-1.5 rounded-full animate-pulse shadow-lg`} style={{ width: '92%', animationDuration: '2s' }}></div>
                      </div>
                      <span className="text-xs text-gray-600 font-bold">92%</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                        <div className={`bg-gradient-to-r ${color} h-1.5 rounded-full animate-pulse shadow-lg`} style={{ width: '97%', animationDelay: '0.5s', animationDuration: '2.5s' }}></div>
                      </div>
                      <span className="text-xs text-gray-600 font-bold">97%</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {mockupType === "mobile" && (
              <div className="mb-6 transform group-hover:scale-105 transition-transform duration-500">
                {/* Enhanced Mobile Phone Mockup */}
                <div className="mx-auto w-20 h-32 bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl p-1 shadow-2xl group-hover:shadow-3xl transition-shadow duration-500">
                  <div className="w-full h-full bg-gradient-to-b from-white to-gray-50 rounded-xl relative overflow-hidden">
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gray-300 rounded-full"></div>
                    <div className="mt-4 space-y-1 px-2">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className={`h-1 bg-gradient-to-r ${color} rounded animate-pulse shadow-sm`} style={{ width: `${50 + i * 12}%`, animationDelay: `${i * 0.2}s` }}></div>
                      ))}
                    </div>
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full border-2 border-gray-300 group-hover:scale-110 transition-transform duration-300"></div>
                    
                    {/* Screen glow effect */}
                    <div className="absolute inset-1 bg-gradient-to-b from-blue-400/10 to-purple-400/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>
              </div>
            )}

            {mockupType === "whatsapp" && (
              <div className="mb-6 transform group-hover:scale-105 transition-transform duration-500">
                {/* Enhanced WhatsApp Chat Mockup */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-200 shadow-inner">
                  <div className="space-y-2">
                    <div className="flex justify-end animate-fade-in">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs p-2 rounded-lg max-w-xs shadow-lg transform hover:scale-105 transition-transform duration-300">
                        Buy R50 airtime ⚡
                      </div>
                    </div>
                    <div className="flex justify-start animate-fade-in" style={{ animationDelay: '0.5s' }}>
                      <div className="bg-white text-gray-800 text-xs p-2 rounded-lg max-w-xs shadow-lg border animate-pulse">
                        ✅ Processing...
                      </div>
                    </div>
                    <div className="flex justify-start animate-fade-in" style={{ animationDelay: '1s' }}>
                      <div className="bg-white text-gray-800 text-xs p-2 rounded-lg max-w-xs shadow-lg border">
                        ✅ Delivered! Thank you! 🎉
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating message indicator */}
                  <div className="flex justify-center mt-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce mx-1" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}

            {mockupType === "delivery" && (
              <div className="mb-6 transform group-hover:scale-105 transition-transform duration-500">
                {/* Enhanced Delivery Timer Mockup */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 border border-blue-200 shadow-inner">
                  <div className="text-center">
                    <div className={`text-3xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent animate-pulse mb-1`}>
                      00:15
                    </div>
                    <div className="text-xs text-gray-600 mb-3 font-medium">Average delivery time</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div className={`bg-gradient-to-r ${color} h-2 rounded-full animate-pulse shadow-lg`} style={{ width: '75%' }}></div>
                    </div>
                    
                    {/* Pulsing delivery indicator */}
                    <div className="flex justify-center mt-3">
                      <div className="relative">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <div className="absolute inset-0 w-3 h-3 bg-blue-500 rounded-full animate-ping"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Content Section with Staggered Animations */}
          <div className="relative z-10 text-center">
            <h3 className={`text-xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent mb-3 group-hover:scale-105 transition-all duration-500 animate-fade-in`}>
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {feature.description}
            </p>
            
            {/* Enhanced Stats Badge with Glow Effect */}
            <div className={`inline-flex items-center px-6 py-3 bg-gradient-to-r ${color} text-white text-sm font-bold rounded-full shadow-lg transform group-hover:scale-110 group-hover:shadow-2xl transition-all duration-500 animate-fade-in relative overflow-hidden`} style={{ animationDelay: '0.4s' }}>
              <span className="relative z-10 animate-pulse">{feature.stats}</span>
              {/* Shimmer effect on badge */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 group-hover:animate-shimmer"></div>
            </div>
          </div>

          {/* Enhanced Corner Decorative Elements */}
          <div className={`absolute top-4 right-4 w-16 h-16 bg-gradient-to-br ${color} rounded-full opacity-10 group-hover:opacity-25 transition-all duration-700 animate-pulse`}></div>
          <div className={`absolute bottom-4 left-4 w-8 h-8 bg-gradient-to-br ${color} rounded-full opacity-5 group-hover:opacity-15 transition-all duration-700 animate-bounce`} style={{ animationDelay: '1s' }}></div>
          
          {/* Border glow effect */}
          <div className={`absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r ${color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} style={{ background: `linear-gradient(white, white) padding-box, linear-gradient(45deg, transparent, ${color.includes('purple') ? '#8b5cf6' : color.includes('blue') ? '#3b82f6' : color.includes('green') ? '#10b981' : '#f59e0b'}, transparent) border-box` }}></div>
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
