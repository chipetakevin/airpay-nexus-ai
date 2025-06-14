
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, Shield, Globe, Star, CheckCircle, ArrowRight, Clock, 
  Sparkles, TrendingUp, Users, Phone
} from 'lucide-react';

const RicaServicesSection = () => {
  const ricaServices = [
    {
      icon: <Zap className="w-10 h-10 text-white" />,
      title: "5-Minute Porting",
      description: "Lightning-fast SIM porting & RICA",
      badge: "🔥 HOT",
      badgeColor: "bg-gradient-to-r from-red-500 to-orange-500 text-white animate-pulse",
      gradient: "from-blue-500 via-purple-500 to-indigo-600",
      borderColor: "border-blue-400",
      glow: "shadow-[0_0_30px_rgba(59,130,246,0.5)]",
      popular: true,
      action: () => window.location.href = '/devine-baas'
    },
    {
      icon: <Shield className="w-10 h-10 text-white" />,
      title: "ICASA Compliant",
      description: "99.7% regulatory compliance",
      badge: "✅ Verified",
      badgeColor: "bg-gradient-to-r from-green-500 to-emerald-600 text-white",
      gradient: "from-green-500 via-emerald-500 to-teal-600",
      borderColor: "border-green-400",
      glow: "shadow-[0_0_30px_rgba(34,197,94,0.5)]",
      action: () => window.location.href = '/devine-baas'
    },
    {
      icon: <Globe className="w-10 h-10 text-white" />,
      title: "AI Platform",
      description: "Autonomous processing",
      badge: "🚀 Advanced",
      badgeColor: "bg-gradient-to-r from-purple-500 to-pink-600 text-white",
      gradient: "from-purple-500 via-violet-500 to-purple-600",
      borderColor: "border-purple-400",
      glow: "shadow-[0_0_30px_rgba(168,85,247,0.5)]",
      action: () => window.location.href = '/devine-baas'
    }
  ];

  const handleStartRICA = () => {
    window.location.href = '/devine-baas';
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Animated Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
        <div className="absolute top-40 right-10 w-32 h-32 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-1/2 w-32 h-32 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center items-center gap-3 mb-6">
            <Badge className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white px-6 py-3 text-lg font-bold animate-pulse shadow-lg">
              <Star className="w-5 h-5 mr-2" />
              #1 Mobile Platform in South Africa
            </Badge>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent animate-pulse">
              Lightning-Fast
            </span>
            <br />
            <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 bg-clip-text text-transparent">
              RICA & Porting
            </span>
          </h2>
          
          <p className="text-xl text-gray-700 max-w-4xl mx-auto mb-8 font-medium">
            🚀 Experience the{' '}
            <span className="font-black text-blue-600 bg-blue-100 px-2 py-1 rounded">FUTURE</span>{' '}
            of mobile services with our{' '}
            <span className="font-black text-purple-600 bg-purple-100 px-2 py-1 rounded">AI-powered platform</span>. 
            Port your number, complete RICA, and get connected in just{' '}
            <span className="font-black text-red-600 bg-red-100 px-2 py-1 rounded animate-pulse">5 MINUTES</span>!
          </p>

          {/* Main Flash CTA */}
          <div className="mb-12">
            <Button 
              onClick={handleStartRICA}
              className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 hover:from-red-600 hover:via-orange-600 hover:to-yellow-600 text-white px-12 py-8 text-2xl font-black rounded-2xl shadow-2xl transform hover:scale-110 transition-all duration-300 animate-pulse border-4 border-white"
              style={{
                boxShadow: '0 0 50px rgba(239, 68, 68, 0.8), 0 0 100px rgba(251, 146, 60, 0.6)',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
              }}
            >
              <Phone className="w-8 h-8 mr-4 animate-bounce" />
              START 5-MIN RICA NOW!
              <Sparkles className="w-8 h-8 ml-4 animate-spin" />
            </Button>
            <p className="text-sm text-gray-600 mt-4 font-bold">
              ⚡ Instant approval • 🔒 100% secure • 📱 Any network
            </p>
          </div>
        </div>

        {/* Enhanced RICA Services Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {ricaServices.map((service, index) => (
            <Card 
              key={index} 
              onClick={service.action}
              className={`hover:shadow-2xl transition-all duration-500 transform hover:scale-110 cursor-pointer bg-gradient-to-br ${service.gradient} border-4 ${service.borderColor} relative overflow-hidden group ${service.glow} hover:rotate-1`}
              style={{
                background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                animation: 'float 6s ease-in-out infinite',
                animationDelay: `${index * 2}s`
              }}
            >
              {/* Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>
              
              <CardContent className="p-8 text-center relative z-10">
                {/* Enhanced Badge */}
                <div className="absolute -top-2 -right-2 z-20">
                  <Badge className={`${service.badgeColor} text-sm font-black px-4 py-2 rotate-12 shadow-lg`}>
                    {service.badge}
                  </Badge>
                </div>
                
                {/* Glowing Icon */}
                <div className="w-20 h-20 mx-auto mb-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl group-hover:scale-125 transition-transform duration-300">
                  <div className="p-3 rounded-full bg-white/30 backdrop-blur-sm">
                    {service.icon}
                  </div>
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-black text-white mb-3 drop-shadow-lg">{service.title}</h3>
                <p className="text-white/90 text-lg mb-6 font-semibold drop-shadow">{service.description}</p>
                
                {/* Enhanced CTA */}
                <div className="flex items-center justify-center text-white font-black text-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="drop-shadow-lg">CLICK TO START!</span>
                  <ArrowRight className="w-6 h-6 ml-2 animate-bounce" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced Quick Stats with Pulsing Effects */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-12 border-4 border-blue-200" style={{boxShadow: '0 0 50px rgba(59, 130, 246, 0.3)'}}>
          <h3 className="text-3xl font-black text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            🔥 LIVE PERFORMANCE STATS 🔥
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="group hover:scale-110 transition-transform duration-300">
              <div className="flex justify-center mb-3">
                <CheckCircle className="w-8 h-8 text-green-600 animate-pulse" />
              </div>
              <div className="text-4xl font-black text-gray-900 mb-2 animate-bounce">99.7%</div>
              <div className="text-sm text-gray-600 font-bold">Success Rate</div>
            </div>
            <div className="group hover:scale-110 transition-transform duration-300">
              <div className="flex justify-center mb-3">
                <Clock className="w-8 h-8 text-blue-600 animate-spin" />
              </div>
              <div className="text-4xl font-black text-gray-900 mb-2 animate-pulse">5 Min</div>
              <div className="text-sm text-gray-600 font-bold">Avg Processing</div>
            </div>
            <div className="group hover:scale-110 transition-transform duration-300">
              <div className="flex justify-center mb-3">
                <Users className="w-8 h-8 text-yellow-600 animate-bounce" />
              </div>
              <div className="text-4xl font-black text-gray-900 mb-2 animate-pulse">50K+</div>
              <div className="text-sm text-gray-600 font-bold">Happy Customers</div>
            </div>
            <div className="group hover:scale-110 transition-transform duration-300">
              <div className="flex justify-center mb-3">
                <TrendingUp className="w-8 h-8 text-purple-600 animate-pulse" />
              </div>
              <div className="text-4xl font-black text-gray-900 mb-2 animate-bounce">45%</div>
              <div className="text-sm text-gray-600 font-bold">Monthly Growth</div>
            </div>
          </div>
        </div>

        {/* Final Flash CTA Section */}
        <div className="text-center bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 rounded-3xl p-12 text-white relative overflow-hidden" style={{boxShadow: '0 0 100px rgba(239, 68, 68, 0.8)'}}>
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <h3 className="text-4xl md:text-6xl font-black mb-6 animate-pulse drop-shadow-2xl">
              ⚡ READY TO GET CONNECTED? ⚡
            </h3>
            <p className="text-xl mb-8 font-bold drop-shadow-lg">
              Join 50,000+ satisfied customers who switched in under 5 minutes!
            </p>
            <Button 
              onClick={handleStartRICA}
              className="bg-white text-red-600 hover:bg-gray-100 px-16 py-8 text-3xl font-black rounded-2xl shadow-2xl transform hover:scale-110 transition-all duration-300 border-4 border-red-600"
              style={{
                boxShadow: '0 0 30px rgba(255, 255, 255, 0.8)',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
              }}
            >
              <Zap className="w-10 h-10 mr-4 animate-bounce" />
              START MY 5-MIN RICA NOW!
              <Star className="w-10 h-10 ml-4 animate-spin" />
            </Button>
            <div className="flex justify-center items-center gap-4 mt-6 text-lg font-bold">
              <span>🔒 Bank-grade security</span>
              <span>•</span>
              <span>📱 All networks supported</span>
              <span>•</span>
              <span>⚡ Instant activation</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RicaServicesSection;
