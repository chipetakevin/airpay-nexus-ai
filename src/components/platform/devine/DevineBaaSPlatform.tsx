
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
    { label: "Success Rate", value: "99.7%", icon: <CheckCircle className="w-5 h-5" /> },
    { label: "Avg Processing", value: "5 Min", icon: <Clock className="w-5 h-5" /> },
    { label: "Active Users", value: "50K+", icon: <Users className="w-5 h-5" /> },
    { label: "Monthly Growth", value: "45%", icon: <BarChart3 className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        {/* Header with Logo */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Smartphone className="w-10 h-10 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-3xl font-bold text-gray-900">
                Devine Mobile BaaS
              </h1>
              <p className="text-gray-600">Intelligent Porting & RICA Platform</p>
            </div>
            <div className="flex gap-2">
              <Badge className="bg-green-100 text-green-800 font-semibold">
                <CheckCircle className="w-3 h-3 mr-1" />
                ICASA Compliant
              </Badge>
              <Badge className="bg-blue-100 text-blue-800">English</Badge>
            </div>
          </div>

          {/* Feature Badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge className="bg-green-600 text-white px-4 py-2 text-sm">
              <Star className="w-4 h-4 mr-2" />
              #1 Fastest Porting
            </Badge>
            <Badge className="bg-blue-600 text-white px-4 py-2 text-sm">
              <Zap className="w-4 h-4 mr-2" />
              AI-Powered
            </Badge>
          </div>

          {/* Main Headline */}
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-6">
            Port Your Number in 5 Minutes
          </h2>
          
          <p className="text-lg text-gray-600 max-w-4xl mx-auto mb-8">
            Experience South Africa's most advanced autonomous SIM porting and RICA registration platform. 
            AI-powered processing with 99.7% accuracy and full ICASA compliance.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center border-2 hover:border-blue-200 transition-all">
              <CardContent className="p-6">
                <div className="flex justify-center mb-2 text-blue-600">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Feature Card */}
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 shadow-xl mb-12">
          <CardContent className="p-8">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-yellow-500 text-yellow-900 font-bold">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Port & RICA in 5 Minutes
                </h3>
                <p className="text-gray-700 mb-4">
                  Complete SIM porting and RICA registration instantly
                </p>
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  Start Process
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-200">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  {feature.icon}
                </div>
                <Badge className="mb-2 bg-blue-100 text-blue-800">{feature.badge}</Badge>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Services */}
        <Card className="bg-white shadow-xl">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Quick Mobile Services</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <CreditCard className="w-6 h-6 mb-2 text-blue-600" />
                <span className="text-sm">Airtime</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Wifi className="w-6 h-6 mb-2 text-green-600" />
                <span className="text-sm">Data</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Phone className="w-6 h-6 mb-2 text-purple-600" />
                <span className="text-sm">Porting</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <MessageCircle className="w-6 h-6 mb-2 text-orange-600" />
                <span className="text-sm">Support</span>
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
