
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Smartphone, Shield, Zap, Globe, CheckCircle, 
  ArrowRight, Star, Users, Clock, BarChart3,
  MessageCircle, CreditCard, Wifi, Phone
} from 'lucide-react';

const DivinelyBaaSPlatform = () => {
  const features = [
    {
      icon: <Zap className="w-8 h-8 text-blue-600" />,
      title: "#1 Fastest Porting",
      description: "Complete SIM porting and RICA registration in 5 minutes",
      badge: "Most Popular"
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: "ICASA Compliant",
      description: "99.7% accuracy with full regulatory compliance",
      badge: "Verified"
    },
    {
      icon: <Globe className="w-8 h-8 text-purple-600" />,
      title: "AI-Powered Processing",
      description: "Autonomous SIM porting and RICA platform",
      badge: "Advanced"
    }
  ];

  const stats = [
    { label: "Success Rate", value: "99.7%", icon: <CheckCircle className="w-4 h-4" /> },
    { label: "Avg Processing", value: "5 Min", icon: <Clock className="w-4 h-4" /> },
    { label: "Active Users", value: "50K+", icon: <Users className="w-4 h-4" /> },
    { label: "Monthly Growth", value: "45%", icon: <BarChart3 className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Compact Header */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-gray-200/50 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Title - Compact */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Devine Mobile BaaS</h1>
                <p className="text-sm text-gray-600">Intelligent Porting & RICA Platform</p>
              </div>
            </div>

            {/* Compact Badges */}
            <div className="flex items-center gap-2">
              <Badge className="bg-green-100 text-green-800 font-semibold text-xs">
                <CheckCircle className="w-3 h-3 mr-1" />
                ICASA Compliant
              </Badge>
              <Badge className="bg-blue-100 text-blue-800 text-xs">English</Badge>
            </div>
          </div>

          {/* Compact Stats Row */}
          <div className="grid grid-cols-4 gap-3 mt-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-1 text-blue-600">
                  {stat.icon}
                </div>
                <div className="text-lg font-bold text-gray-900">{stat.value}</div>
                <div className="text-xs text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area - Maximized */}
      <div className="container mx-auto px-4 py-8">
        {/* Main Headline - More Compact */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-4">
            Port Your Number in 5 Minutes
          </h2>
          
          <p className="text-base text-gray-600 max-w-3xl mx-auto mb-6">
            Experience South Africa's most advanced autonomous SIM porting and RICA registration platform. 
            AI-powered processing with 99.7% accuracy and full ICASA compliance.
          </p>

          {/* Feature Badges - Inline */}
          <div className="flex justify-center gap-3 mb-6">
            <Badge className="bg-green-600 text-white px-3 py-1">
              <Star className="w-3 h-3 mr-1" />
              #1 Fastest Porting
            </Badge>
            <Badge className="bg-blue-600 text-white px-3 py-1">
              <Zap className="w-3 h-3 mr-1" />
              AI-Powered
            </Badge>
          </div>
        </div>

        {/* Main Feature Card - Streamlined */}
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 shadow-xl mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <div>
                  <Badge className="bg-yellow-500 text-yellow-900 font-bold mb-2">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    Port & RICA in 5 Minutes
                  </h3>
                  <p className="text-gray-700 text-sm">
                    Complete SIM porting and RICA registration instantly
                  </p>
                </div>
              </div>
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                Start Process
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Features Grid - More Compact */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-200">
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
                  {feature.icon}
                </div>
                <Badge className="mb-2 bg-blue-100 text-blue-800 text-xs">{feature.badge}</Badge>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center pt-0">
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Services - More Compact */}
        <Card className="bg-white shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-center text-xl">Quick Mobile Services</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button variant="outline" className="h-16 flex flex-col items-center justify-center">
                <CreditCard className="w-5 h-5 mb-1 text-blue-600" />
                <span className="text-xs">Airtime</span>
              </Button>
              <Button variant="outline" className="h-16 flex flex-col items-center justify-center">
                <Wifi className="w-5 h-5 mb-1 text-green-600" />
                <span className="text-xs">Data</span>
              </Button>
              <Button variant="outline" className="h-16 flex flex-col items-center justify-center">
                <Phone className="w-5 h-5 mb-1 text-purple-600" />
                <span className="text-xs">Porting</span>
              </Button>
              <Button variant="outline" className="h-16 flex flex-col items-center justify-center">
                <MessageCircle className="w-5 h-5 mb-1 text-orange-600" />
                <span className="text-xs">Support</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* WhatsApp Integration */}
        <div className="fixed bottom-6 right-6">
          <div className="relative">
            <Button 
              className="w-14 h-14 rounded-full bg-green-600 hover:bg-green-700 shadow-lg"
              onClick={() => window.open('https://wa.me/27832466539', '_blank')}
            >
              <MessageCircle className="w-6 h-6 text-white" />
            </Button>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DivinelyBaaSPlatform;
