
import React from 'react';
import { 
  CreditCard, 
  Zap,
  Smartphone
} from 'lucide-react';

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
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
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
    <div className="group transform hover:scale-105 transition-all duration-500 animate-fade-in">
      {renderEnhancedGraphic(feature.graphic, feature.color, feature.mockupType)}
    </div>
  );
};

export default FeatureCard;
