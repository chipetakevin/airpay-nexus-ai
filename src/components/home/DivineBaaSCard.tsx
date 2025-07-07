import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  X, ChevronDown, ChevronUp, Globe, Shield, Zap, 
  CheckCircle, Users, Clock, ArrowRight, Star
} from 'lucide-react';

const DivineBaaSCard = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAnimating(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsAnimating(false);
    }, 300);
  };

  const handleToggleExpand = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsExpanded(!isExpanded);
    setTimeout(() => setIsAnimating(false), 400);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggleExpand();
    }
  };

  const services = [
    {
      icon: <Zap className="w-5 h-5" />,
      title: "5-Min Porting & RICA",
      description: "Lightning-fast SIM porting with 99.7% success rate",
      badge: "Most Popular"
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Enterprise Banking",
      description: "Complete banking solutions for businesses",
      badge: "Secure"
    },
    {
      icon: <Globe className="w-5 h-5" />,
      title: "AI-Powered Platform",
      description: "Intelligent automation for all services",
      badge: "Advanced"
    }
  ];

  const stats = [
    { icon: <CheckCircle className="w-4 h-4" />, value: "99.7%", label: "Success Rate" },
    { icon: <Clock className="w-4 h-4" />, value: "5 Min", label: "Avg Processing" },
    { icon: <Users className="w-4 h-4" />, value: "50K+", label: "Active Users" }
  ];

  if (!isVisible) return null;

  return (
    <div 
      ref={cardRef}
      className={`relative bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl transition-all duration-300 ease-in-out ${
        isAnimating ? 'scale-[0.98] opacity-90' : 'scale-100 opacity-100'
      } hover:shadow-2xl hover:scale-[1.02] transform`}
      style={{
        willChange: 'transform, opacity'
      }}
    >
      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute top-3 right-3 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 backdrop-blur-sm border border-white/20"
        aria-label="Close Divine BaaS Platform card"
        tabIndex={0}
      >
        <X className="w-4 h-4 text-white" />
      </button>

      {/* Card Header */}
      <div 
        className="cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-inset rounded-lg p-1 -m-1"
        onClick={handleToggleExpand}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        aria-controls="divine-baas-content"
        aria-label={`${isExpanded ? 'Collapse' : 'Expand'} Divine BaaS Platform services`}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-lg font-bold">Divine BaaS Platform</div>
              <div className="text-xs text-purple-100 opacity-90">Click to {isExpanded ? 'collapse' : 'expand'} services</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-red-500 text-white hover:bg-red-600 transition-colors">
              <Star className="w-3 h-3 mr-1" />
              ENTERPRISE
            </Badge>
            <div className="p-1 hover:bg-white/10 rounded-full transition-colors">
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 text-white" />
              ) : (
                <ChevronDown className="w-4 h-4 text-white" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-4">
        <p className="text-purple-100 text-sm font-medium">
          Complete Mobile & Banking Solutions
        </p>

        {/* Expandable Services Section */}
        <div 
          id="divine-baas-content"
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isExpanded 
              ? 'max-h-[500px] opacity-100' 
              : 'max-h-0 opacity-0'
          }`}
          style={{
            transitionProperty: 'max-height, opacity, padding, margin',
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
            willChange: 'max-height, opacity'
          }}
        >
          <div className={`space-y-4 ${isExpanded ? 'animate-fade-in' : ''}`}>
            {/* Services Grid */}
            <div className="grid grid-cols-1 gap-3">
              {services.map((service, index) => (
                <div 
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-200"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      {service.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-white text-sm">{service.title}</h4>
                        <Badge className="bg-white/20 text-white text-xs border border-white/30">
                          {service.badge}
                        </Badge>
                      </div>
                      <p className="text-purple-100 text-xs opacity-90">{service.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                  <div className="flex justify-center mb-2 text-white">
                    {stat.icon}
                  </div>
                  <div className="text-sm font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-purple-100 opacity-90">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              <Button 
                className="bg-white text-purple-600 hover:bg-gray-100 font-semibold transition-all duration-200 hover:scale-105"
                onClick={() => window.location.href = '/devine-baas'}
              >
                <Globe className="w-4 h-4 mr-2" />
                Access Platform
              </Button>
              <Button 
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-200 hover:scale-105"
                onClick={() => window.location.href = '/baas-platform'}
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                Learn More
              </Button>
            </div>
          </div>
        </div>

        {/* Default Button (when collapsed) */}
        {!isExpanded && (
          <Button 
            className="w-full bg-white text-purple-600 hover:bg-gray-100 font-semibold transition-all duration-200 hover:scale-105"
            onClick={handleToggleExpand}
          >
            <Globe className="w-4 h-4 mr-2" />
            Click to expand services
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default DivineBaaSCard;