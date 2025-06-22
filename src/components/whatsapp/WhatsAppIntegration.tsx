
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MessageCircle, Smartphone, Star, Phone, Wifi, 
  ShoppingCart, CheckCircle, Gift, Zap, CreditCard,
  ArrowRight, Users, Clock, Shield, BarChart3
} from 'lucide-react';
import { useMobileAuth } from '@/hooks/useMobileAuth';
import { Link } from 'react-router-dom';
import WhatsAppAssistant from './WhatsAppAssistant';
import MobileShoppingInterface from '../mobile/MobileShoppingInterface';

const WhatsAppIntegration = () => {
  const { currentUser, isAuthenticated } = useMobileAuth();
  const [activeTab, setActiveTab] = useState('assistant');

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

  const quickActions = [
    {
      icon: <CreditCard className="w-5 h-5" />,
      title: "Buy Airtime",
      description: "Instant top-ups for all networks",
      number: "1",
      action: () => setActiveTab('mobile')
    },
    {
      icon: <Wifi className="w-5 h-5" />,
      title: "Purchase Data Bundles", 
      description: "High-speed internet packages",
      number: "2",
      action: () => setActiveTab('mobile')
    },
    {
      icon: <Phone className="w-5 h-5" />,
      title: "Check Balance",
      description: "View your current balance",
      number: "3",
      action: () => setActiveTab('mobile')
    },
    {
      icon: <Gift className="w-5 h-5" />,
      title: "Gift Airtime/Data",
      description: "Send to friends & family",
      number: "4",
      action: () => setActiveTab('mobile')
    }
  ];

  const handleWhatsAppStart = () => {
    const phoneNumber = isAuthenticated && currentUser?.registeredPhone 
      ? currentUser.registeredPhone.replace('+', '')
      : '27832466539';
    
    const message = isAuthenticated ? encodeURIComponent(
      `🔥 Hi Divinely Mobile AI! I'm ${currentUser?.firstName} ${currentUser?.lastName}\n\n` +
      `🎯 OneCard: ${currentUser?.cardNumber}\n` +
      `📱 Account: ${currentUser?.registeredPhone}\n\n` +
      `I'd like exclusive access to:\n` +
      `• 💎 VIP Deals & Discounts\n` +
      `• ⚡ Instant Top-ups\n` +
      `• 📊 Premium Data Bundles\n` +
      `• 🎁 Loyalty Rewards\n\n` +
      `Ready to shop! 🛒`
    ) : encodeURIComponent(
      `Hi Divinely Mobile AI! 🤖\n\nI'd like to get instant airtime & data deals. Please assist me with:\n\n• Best available deals\n• Account management\n• Top-up services\n• Balance inquiries\n\nThank you!`
    );
    
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          WhatsApp Shopping Experience
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Experience seamless mobile commerce with our AI-powered WhatsApp assistant and mobile-optimized shopping platform
        </p>

        {/* User Status */}
        {isAuthenticated && currentUser && (
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-center gap-4">
                <Badge className="bg-green-600 text-white">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  VIP Customer
                </Badge>
                <span className="font-medium text-green-800">
                  Welcome back, {currentUser.firstName}!
                </span>
                <Badge className="bg-blue-600 text-white">
                  OneCard: ****{currentUser.cardNumber?.slice(-4)}
                </Badge>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Main Interface */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="assistant" className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            WhatsApp AI
          </TabsTrigger>
          <TabsTrigger value="mobile" className="flex items-center gap-2">
            <Smartphone className="w-4 h-4" />
            Mobile Shopping
          </TabsTrigger>
          <TabsTrigger value="features" className="flex items-center gap-2">
            <Star className="w-4 h-4" />
            Features
          </TabsTrigger>
        </TabsList>

        <TabsContent value="assistant" className="space-y-6">
          {/* Quick Actions Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-green-600" />
                Quick WhatsApp Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {quickActions.map((action, index) => (
                  <div 
                    key={index} 
                    onClick={action.action}
                    className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
                  >
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                      {action.number}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{action.title}</div>
                      <div className="text-sm text-gray-600">{action.description}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <Button 
                  onClick={handleWhatsAppStart}
                  className="flex-1 bg-green-600 hover:bg-green-700 h-12"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Start WhatsApp Chat
                </Button>
                <Button 
                  onClick={() => setActiveTab('mobile')}
                  variant="outline"
                  className="flex-1 h-12 border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  <Smartphone className="w-5 h-5 mr-2" />
                  Mobile Interface
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* WhatsApp Assistant Interface */}
          <Card className="max-w-md mx-auto">
            <CardContent className="p-0">
              <WhatsAppAssistant />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mobile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-blue-600" />
                Mobile Shopping Interface
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="max-w-md mx-auto">
                <MobileShoppingInterface />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="space-y-6">
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
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
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200">
            <CardContent className="p-8 text-center">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold text-green-800 mb-4">Ready to Start Shopping?</h3>
              <p className="text-green-700 mb-6">
                Experience the future of mobile commerce with our integrated WhatsApp and mobile shopping platforms.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={handleWhatsAppStart}
                  className="bg-green-600 hover:bg-green-700 h-12 px-8"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Start on WhatsApp
                </Button>
                <Link to="/portal?tab=deals">
                  <Button 
                    variant="outline" 
                    className="h-12 px-8 border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Visit Shop
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WhatsAppIntegration;
