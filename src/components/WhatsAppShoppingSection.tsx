
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, Smartphone, Star, Phone, Wifi, 
  ShoppingCart, CheckCircle, Gift, Zap, CreditCard,
  ArrowRight, Users, Clock, Shield
} from 'lucide-react';
import { Link } from 'react-router-dom';

const WhatsAppShoppingSection = () => {
  const quickActions = [
    {
      icon: <CreditCard className="w-5 h-5" />,
      title: "Buy Airtime",
      description: "Instant top-ups for all networks",
      number: "1"
    },
    {
      icon: <Wifi className="w-5 h-5" />,
      title: "Purchase Data Bundles", 
      description: "High-speed internet packages",
      number: "2"
    },
    {
      icon: <Phone className="w-5 h-5" />,
      title: "Check Balance",
      description: "View your current balance",
      number: "3"
    },
    {
      icon: <Gift className="w-5 h-5" />,
      title: "Gift Airtime/Data",
      description: "Send to friends & family",
      number: "4"
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Manage Bundles",
      description: "View and control your packages",
      number: "5"
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "International Airtime",
      description: "Global top-up services",
      number: "6"
    }
  ];

  const features = [
    {
      icon: <MessageCircle className="w-6 h-6 text-green-600" />,
      title: "WhatsApp Shopping",
      description: "Shop directly through WhatsApp - no app needed!"
    },
    {
      icon: <Clock className="w-6 h-6 text-blue-600" />,
      title: "Instant Delivery",
      description: "Airtime and data delivered within 30 seconds"
    },
    {
      icon: <Shield className="w-6 h-6 text-purple-600" />,
      title: "Secure & Safe",
      description: "Bank-grade security for all transactions"
    },
    {
      icon: <Smartphone className="w-6 h-6 text-orange-600" />,
      title: "Mobile Optimized",
      description: "Designed specifically for smartphone users"
    }
  ];

  const handleWhatsAppStart = () => {
    const message = encodeURIComponent(
      `👋 Hi Divinely Mobile!\n\n` +
      `I'm interested in your WhatsApp shopping services. Can you help me get started?\n\n` +
      `What services do you offer?`
    );
    window.open(`https://wa.me/27832466539?text=${message}`, '_blank');
  };

  return (
    <section className="py-16 bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Mobile WhatsApp Shopping Experience
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Purchase airtime and data directly from your smartphone through WhatsApp - optimized for mobile users with or without airtime
          </p>
        </div>

        {/* WhatsApp Assistant Interface */}
        <div className="max-w-md mx-auto mb-12">
          <Card className="bg-white shadow-2xl border-2 border-green-100 rounded-3xl overflow-hidden">
            {/* WhatsApp Header */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <MessageCircle className="w-7 h-7 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">Devine Mobile Assistant</h3>
                  <div className="flex items-center gap-2 text-sm opacity-90">
                    <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                    <span>Online • Always here to help</span>
                  </div>
                </div>
                <Badge className="bg-green-800 text-green-100 px-3 py-1">
                  AI Agent
                </Badge>
              </div>
            </div>

            {/* Quick Action Tabs */}
            <div className="bg-gray-50 p-2">
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center p-3 bg-white rounded-lg border shadow-sm">
                  <CreditCard className="w-6 h-6 mx-auto mb-1 text-blue-600" />
                  <span className="text-xs font-medium text-gray-700">Airtime</span>
                </div>
                <div className="text-center p-3 bg-white rounded-lg border shadow-sm">
                  <Wifi className="w-6 h-6 mx-auto mb-1 text-green-600" />
                  <span className="text-xs font-medium text-gray-700">Data</span>
                </div>
                <div className="text-center p-3 bg-white rounded-lg border shadow-sm">
                  <Phone className="w-6 h-6 mx-auto mb-1 text-purple-600" />
                  <span className="text-xs font-medium text-gray-700">Balance</span>
                </div>
              </div>
            </div>

            {/* Chat Interface */}
            <CardContent className="p-6 space-y-4">
              <div className="bg-gray-100 rounded-2xl p-4">
                <div className="flex items-start gap-2 mb-3">
                  <span className="text-2xl">👋</span>
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">Welcome to Devine Mobile!</p>
                    <p className="text-gray-700 text-sm">
                      Your one-stop shop for airtime & data right here in WhatsApp!
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">⭐</span>
                    <span className="font-semibold text-gray-900">What can I help you with today?</span>
                  </div>
                  
                  <div className="space-y-2">
                    {quickActions.map((action, index) => (
                      <div key={index} className="flex items-center gap-3 p-2 bg-white rounded-lg border hover:bg-blue-50 transition-colors cursor-pointer">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">
                          {action.number}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 text-sm">{action.title}</div>
                          <div className="text-xs text-gray-600">{action.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-gray-700">
                      Simply reply with a number or tell me what you need! 💬
                    </p>
                    <p className="text-xs text-gray-500 mt-1">10:35:12</p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Button 
                  onClick={handleWhatsAppStart}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 h-12 text-base font-semibold"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Start Shopping on WhatsApp
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mobile Shopping Interface Preview */}
        <div className="max-w-md mx-auto mb-12">
          <Card className="bg-white shadow-2xl border-2 border-blue-100 rounded-3xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 via-green-700 to-emerald-700 text-white p-4">
              <div className="flex items-center gap-3">
                <Link to="/" className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <Smartphone className="w-7 h-7 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">Divinely Mobile</h3>
                    <div className="flex items-center gap-1 text-sm opacity-90">
                      <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                      <span>Mobile Services • Always Available</span>
                    </div>
                  </div>
                </Link>
                <Badge className="bg-yellow-500 text-yellow-900 text-xs font-bold">
                  📱 Mobile Optimized
                </Badge>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
              <div className="flex">
                <div className="flex-1 p-4 text-center bg-white shadow-lg border-b-2 border-green-500">
                  <Star className="w-5 h-5 mx-auto mb-1 text-green-600" />
                  <span className="text-sm font-semibold text-green-600">Featured</span>
                </div>
                <div className="flex-1 p-4 text-center">
                  <Phone className="w-5 h-5 mx-auto mb-1 text-gray-400" />
                  <span className="text-sm text-gray-600">Airtime</span>
                </div>
                <div className="flex-1 p-4 text-center">
                  <Wifi className="w-5 h-5 mx-auto mb-1 text-gray-400" />
                  <span className="text-sm text-gray-600">Data</span>
                </div>
                <div className="flex-1 p-4 text-center">
                  <ShoppingCart className="w-5 h-5 mx-auto mb-1 text-gray-400" />
                  <span className="text-sm text-gray-600">Cart</span>
                </div>
              </div>
            </div>

            {/* Content Preview */}
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <div className="text-5xl mb-3">⭐</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Featured Deals</h3>
                <p className="text-gray-600 text-sm">Best value mobile services for you</p>
              </div>

              <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-yellow-300">🔥</span>
                  <Badge className="bg-yellow-500 text-yellow-900 text-xs font-bold">
                    Popular
                  </Badge>
                </div>
                <h4 className="font-bold text-lg mb-1">Special Combo Deal</h4>
                <p className="text-sm opacity-90">R50 Airtime + 1GB Data</p>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-2xl font-bold">R65</span>
                  <Button className="bg-white text-red-600 hover:bg-gray-100 font-semibold">
                    Add to Cart
                  </Button>
                </div>
              </div>

              <Link to="/whatsapp-assistant">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-12 text-base font-semibold">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Open Full Shopping Experience
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 border-2 hover:border-green-200">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="max-w-2xl mx-auto bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-8">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-2xl font-bold text-green-800 mb-3">Ready to Start Shopping?</h3>
            <p className="text-green-700 mb-6">
              Experience the future of mobile commerce with our WhatsApp shopping platform. 
              Fast, secure, and convenient - shop the way you want!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleWhatsAppStart}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 h-12 px-8"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Start on WhatsApp
              </Button>
              <Link to="/whatsapp-assistant">
                <Button 
                  variant="outline" 
                  className="h-12 px-8 border-2 border-green-600 text-green-600 hover:bg-green-50"
                >
                  <Smartphone className="w-5 h-5 mr-2" />
                  Full Platform
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsAppShoppingSection;
