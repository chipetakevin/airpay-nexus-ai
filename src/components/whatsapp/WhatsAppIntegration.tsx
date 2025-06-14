
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, Smartphone, Star, Zap, 
  ArrowRight, CheckCircle, Gift, CreditCard
} from 'lucide-react';
import { Link } from 'react-router-dom';
import MobileOptimizedShoppingInterface from './MobileOptimizedShoppingInterface';

const WhatsAppIntegration = () => {
  const features = [
    {
      icon: <MessageCircle className="w-6 h-6 text-green-600" />,
      title: "WhatsApp Shopping",
      description: "Shop directly through WhatsApp with our AI assistant",
      badge: "Popular"
    },
    {
      icon: <Zap className="w-6 h-6 text-yellow-600" />,
      title: "USSD Payments",
      description: "Quick dial-code payments for instant transactions",
      badge: "New"
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-blue-600" />,
      title: "Auto Receipts",
      description: "Instant WhatsApp & Email receipts for all purchases",
      badge: "Featured"
    },
    {
      icon: <Gift className="w-6 h-6 text-purple-600" />,
      title: "Mobile First",
      description: "Optimized experience for smartphone users",
      badge: "Essential"
    }
  ];

  const handleWhatsAppStart = () => {
    const message = encodeURIComponent(
      `🛍️ Hi Divinely Mobile AI!\n\n` +
      `I'm interested in your mobile shopping services:\n\n` +
      `• 📞 Airtime top-ups\n` +
      `• 📊 Data bundles\n` +
      `• 💳 USSD payments\n` +
      `• 📧 Auto receipts\n\n` +
      `Please help me get started with the best deals!`
    );
    window.open(`https://wa.me/27832466539?text=${message}`, '_blank');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
          WhatsApp Shopping Experience
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Revolutionary mobile commerce powered by AI, USSD payments, and instant receipt delivery
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {features.map((feature, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-300 border-2 hover:border-green-200">
            <CardContent className="p-6 text-center">
              <div className="relative mb-4">
                <div className="w-12 h-12 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                  {feature.icon}
                </div>
                <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-blue-500 text-white text-xs">
                  {feature.badge}
                </Badge>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Mobile Shopping Interface */}
        <div className="space-y-6">
          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Mobile Shopping Interface
            </h2>
            <p className="text-gray-600">
              Experience our mobile-optimized shopping platform with USSD payment integration
            </p>
          </div>
          <MobileOptimizedShoppingInterface />
        </div>

        {/* WhatsApp Integration Info */}
        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <MessageCircle className="w-6 h-6" />
                WhatsApp AI Assistant
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-white p-4 rounded-lg border border-green-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-green-800">Divinely Mobile AI</div>
                    <div className="text-sm text-green-600">Always online • Instant responses</div>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Instant airtime & data purchases</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>USSD payment guidance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Automatic receipt delivery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>24/7 customer support</span>
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleWhatsAppStart}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 h-12 text-base font-semibold"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Start WhatsApp Shopping
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* USSD Payment Info */}
          <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <CreditCard className="w-6 h-6" />
                USSD Payment System
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-blue-700 text-sm">
                Make secure payments using your mobile network's USSD codes. No internet required!
              </p>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-3 rounded border border-blue-200 text-center">
                  <div className="font-bold text-blue-800">MTN</div>
                  <div className="text-sm text-blue-600">*141#</div>
                </div>
                <div className="bg-white p-3 rounded border border-blue-200 text-center">
                  <div className="font-bold text-blue-800">Vodacom</div>
                  <div className="text-sm text-blue-600">*136#</div>
                </div>
                <div className="bg-white p-3 rounded border border-blue-200 text-center">
                  <div className="font-bold text-blue-800">Divinely</div>
                  <div className="text-sm text-blue-600">*180*2827#</div>
                </div>
                <div className="bg-white p-3 rounded border border-blue-200 text-center">
                  <div className="font-bold text-blue-800">Telkom</div>
                  <div className="text-sm text-blue-600">*180#</div>
                </div>
              </div>

              <Link to="/deals">
                <Button 
                  variant="outline" 
                  className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  <Smartphone className="w-4 h-4 mr-2" />
                  Browse All Deals
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 text-white">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-2">Ready to Start Shopping?</h3>
          <p className="text-blue-100 mb-6">
            Experience the future of mobile commerce with instant payments and automated receipts
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleWhatsAppStart}
              className="bg-white text-green-600 hover:bg-gray-100"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Start on WhatsApp
            </Button>
            <Link to="/deals">
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                <Star className="w-5 h-5 mr-2" />
                Browse Deals
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WhatsAppIntegration;
