
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, Shield, Globe, Star, CheckCircle, ArrowRight, Clock 
} from 'lucide-react';

const RicaServicesSection = () => {
  const ricaServices = [
    {
      icon: <Zap className="w-8 h-8 text-green-600" />,
      title: "5 Min Porting",
      description: "AI-powered SIM porting & RICA",
      badge: "Popular",
      badgeColor: "bg-yellow-500 text-yellow-900",
      gradient: "from-green-50 to-emerald-50",
      borderColor: "border-green-200"
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "ICASA Compliant",
      description: "99.7% regulatory compliance",
      badge: "Verified",
      badgeColor: "bg-green-500 text-white",
      gradient: "from-blue-50 to-indigo-50",
      borderColor: "border-blue-200"
    },
    {
      icon: <Globe className="w-8 h-8 text-purple-600" />,
      title: "AI Platform",
      description: "Autonomous processing",
      badge: "Advanced",
      badgeColor: "bg-purple-500 text-white",
      gradient: "from-purple-50 to-violet-50",
      borderColor: "border-purple-200"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Badge className="bg-blue-600 text-white px-4 py-2">
              <Star className="w-4 h-4 mr-1" />
              #1 Mobile Platform in South Africa
            </Badge>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
              Smart Mobile Services
            </span>
            <br />
            <span className="text-gray-900">Made Simple</span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-2">
            Experience the future of mobile commerce with our{' '}
            <span className="font-semibold text-blue-600">AI-powered platform</span>. 
            Port your number, buy airtime & data, and manage everything seamlessly—all in{' '}
            <span className="font-bold text-purple-600">under 5 minutes</span>.
          </p>
        </div>

        {/* RICA Services Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {ricaServices.map((service, index) => (
            <Card 
              key={index} 
              className={`hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer bg-gradient-to-br ${service.gradient} border-2 ${service.borderColor} relative overflow-hidden`}
            >
              <CardContent className="p-6 text-center">
                {/* Badge */}
                <div className="absolute top-4 right-4">
                  <Badge className={`${service.badgeColor} text-xs font-bold`}>
                    {service.badge}
                  </Badge>
                </div>
                
                {/* Icon */}
                <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-lg">
                  {service.icon}
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                
                {/* CTA */}
                <div className="flex items-center justify-center text-blue-600 font-medium text-sm">
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="flex justify-center mb-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">99.7%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
            <div>
              <div className="flex justify-center mb-2">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">5 Min</div>
              <div className="text-sm text-gray-600">Avg Processing</div>
            </div>
            <div>
              <div className="flex justify-center mb-2">
                <Star className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">50K+</div>
              <div className="text-sm text-gray-600">Active Users</div>
            </div>
            <div>
              <div className="flex justify-center mb-2">
                <Zap className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">45%</div>
              <div className="text-sm text-gray-600">Monthly Growth</div>
            </div>
          </div>
        </div>

        {/* Main CTA */}
        <div className="text-center">
          <Button 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
            onClick={() => window.location.href = '/devine-baas'}
          >
            <Zap className="w-5 h-5 mr-2" />
            Start Your 5-Minute RICA Process
          </Button>
          <p className="text-sm text-gray-500 mt-3">
            Lightning-fast SIM porting & RICA registration
          </p>
        </div>
      </div>
    </section>
  );
};

export default RicaServicesSection;
