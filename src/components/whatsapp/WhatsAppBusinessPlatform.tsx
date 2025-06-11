
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MessageCircle, Phone, Video, Shield, Users, 
  Zap, Gift, CreditCard, Bot, Globe, Megaphone,
  Lock, CheckCircle, Star, Smartphone, Volume2,
  Image, Camera, FileText, DollarSign
} from 'lucide-react';
import { useMobileAuth } from '@/hooks/useMobileAuth';

const WhatsAppBusinessPlatform = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { currentUser, isAuthenticated } = useMobileAuth();

  const coreFeatures = [
    {
      title: 'Voice & Video Calls',
      description: 'Crystal-clear group and individual calls that make you feel like you\'re in the same room',
      icon: <Video className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600',
      benefits: ['HD Quality Calls', 'Group Video Chats', 'Voice Messages', 'Screen Sharing']
    },
    {
      title: 'End-to-End Encryption',
      description: 'Your messages are secured with military-grade encryption. Only you and your recipients can read them',
      icon: <Shield className="w-6 h-6" />,
      color: 'from-green-500 to-green-600',
      benefits: ['256-bit Encryption', 'Private Conversations', 'Secure File Sharing', 'Protected Payments']
    },
    {
      title: 'Group Conversations',
      description: 'Stay connected with family, friends, and business teams through easy group management',
      icon: <Users className="w-6 h-6" />,
      color: 'from-purple-500 to-purple-600',
      benefits: ['Up to 1000 Members', 'Admin Controls', 'Group Descriptions', 'Broadcast Lists']
    },
    {
      title: 'Expression Tools',
      description: 'Rich communication with stickers, GIFs, status updates, and voice messages',
      icon: <Image className="w-6 h-6" />,
      color: 'from-pink-500 to-pink-600',
      benefits: ['Custom Stickers', 'Animated GIFs', 'Status Stories', 'Voice Notes']
    }
  ];

  const businessFeatures = [
    {
      title: 'WhatsApp Business Profile',
      description: 'Professional business presence with catalog, contact info, and business hours',
      icon: <Megaphone className="w-5 h-5" />,
      features: ['Business Catalog', 'Contact Information', 'Business Hours', 'Location Details']
    },
    {
      title: 'AI Business Assistant',
      description: 'Automated customer service with Divinely Mobile AI integration',
      icon: <Bot className="w-5 h-5" />,
      features: ['24/7 Customer Support', 'Order Processing', 'FAQ Automation', 'Product Recommendations']
    },
    {
      title: 'Payment Processing',
      description: 'Secure payments directly through WhatsApp for Divinely Mobile services',
      icon: <CreditCard className="w-5 h-5" />,
      features: ['Instant Payments', 'Airtime Top-ups', 'Data Bundles', 'Bill Payments']
    },
    {
      title: 'Global Reach',
      description: 'Connect with customers worldwide and showcase your products/services',
      icon: <Globe className="w-5 h-5" />,
      features: ['International Messaging', 'Multi-language Support', 'Global Payments', 'Market Expansion']
    }
  ];

  const paymentOptions = [
    {
      service: 'Airtime Top-up',
      price: 'From R5',
      description: 'Instant airtime for all networks',
      icon: <Smartphone className="w-4 h-4" />
    },
    {
      service: 'Data Bundles',
      price: 'From R9',
      description: 'High-speed data packages',
      icon: <Zap className="w-4 h-4" />
    },
    {
      service: 'International Airtime',
      price: 'From $1',
      description: 'Top-up for global networks',
      icon: <Globe className="w-4 h-4" />
    },
    {
      service: 'Bill Payments',
      price: 'No fees',
      description: 'Pay utilities and services',
      icon: <DollarSign className="w-4 h-4" />
    }
  ];

  const handleStartWhatsAppBusiness = () => {
    const phoneNumber = '27832466539'; // Business number
    const message = isAuthenticated ? encodeURIComponent(
      `🏢 Hi Divinely Mobile Business Team!\n\n` +
      `I'm ${currentUser?.firstName} ${currentUser?.lastName}\n` +
      `OneCard: ${currentUser?.cardNumber}\n\n` +
      `I'd like to set up WhatsApp Business with:\n` +
      `• AI Business Assistant\n` +
      `• Payment Processing\n` +
      `• Customer Management\n` +
      `• Business Catalog\n\n` +
      `Please help me get started! 🚀`
    ) : encodeURIComponent(
      `🏢 Hi Divinely Mobile Business Team!\n\n` +
      `I'm interested in WhatsApp Business solutions:\n\n` +
      `• AI Business Assistant\n` +
      `• Payment Processing\n` +
      `• Customer Management\n` +
      `• Business Profile Setup\n\n` +
      `Please provide more information! 📞`
    );
    
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const handleQuickPayment = (service: string) => {
    const phoneNumber = '27832466539';
    const message = encodeURIComponent(
      `💳 Quick ${service} Request\n\n` +
      `Service: ${service}\n` +
      `Account: ${isAuthenticated ? currentUser?.registeredPhone : 'New Customer'}\n\n` +
      `Please process this payment through WhatsApp! 💨`
    );
    
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
            <MessageCircle className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            WhatsApp Business Platform
          </h1>
        </div>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg">
          Connect, communicate, and conduct business with the world's most trusted messaging platform. 
          Enhanced with Divinely Mobile AI for seamless mobile services.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Badge className="bg-green-100 text-green-800">2+ Billion Users</Badge>
          <Badge className="bg-blue-100 text-blue-800">End-to-End Encrypted</Badge>
          <Badge className="bg-purple-100 text-purple-800">AI-Powered</Badge>
          <Badge className="bg-orange-100 text-orange-800">Payment Ready</Badge>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-center mb-6">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="overview">Core Features</TabsTrigger>
            <TabsTrigger value="business">Business Tools</TabsTrigger>
            <TabsTrigger value="payments">Quick Payments</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="space-y-6">
          {/* Core Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coreFeatures.map((feature, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center text-white mb-4`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <div className="space-y-2">
                    {feature.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Getting Started */}
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardContent className="p-8 text-center">
              <MessageCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Ready to Get Started?</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Join millions of businesses worldwide using WhatsApp to connect with customers, 
                showcase products, and grow their business with Divinely Mobile's AI-powered platform.
              </p>
              <Button 
                onClick={handleStartWhatsAppBusiness}
                size="lg" 
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Start WhatsApp Business
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="business" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {businessFeatures.map((feature, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                      {feature.icon}
                    </div>
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <div className="space-y-2">
                    {feature.features.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Seamless WhatsApp Payments</h2>
            <p className="text-gray-600">Process payments directly through WhatsApp for all Divinely Mobile services</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {paymentOptions.map((option, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white mx-auto mb-4">
                    {option.icon}
                  </div>
                  <h3 className="font-bold mb-1">{option.service}</h3>
                  <p className="text-2xl font-bold text-green-600 mb-2">{option.price}</p>
                  <p className="text-sm text-gray-600 mb-4">{option.description}</p>
                  <Button 
                    onClick={() => handleQuickPayment(option.service)}
                    size="sm" 
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    Pay Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Lock className="w-8 h-8 text-purple-600" />
                <div>
                  <h3 className="text-xl font-bold">Secure Payment Processing</h3>
                  <p className="text-gray-600">All payments are processed with bank-grade security and encryption</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <Shield className="w-6 h-6 text-green-600 mx-auto mb-1" />
                  <span className="text-sm font-medium">SSL Encrypted</span>
                </div>
                <div>
                  <CheckCircle className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                  <span className="text-sm font-medium">PCI Compliant</span>
                </div>
                <div>
                  <Lock className="w-6 h-6 text-purple-600 mx-auto mb-1" />
                  <span className="text-sm font-medium">Fraud Protection</span>
                </div>
                <div>
                  <Zap className="w-6 h-6 text-yellow-600 mx-auto mb-1" />
                  <span className="text-sm font-medium">Instant Processing</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <div className="text-center mb-8">
            <Shield className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Your Security is Our Priority</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              WhatsApp uses end-to-end encryption to ensure your messages, calls, and payments are private and secure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Lock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-bold mb-2">End-to-End Encryption</h3>
                <p className="text-sm text-gray-600">
                  Your messages are encrypted before they leave your device and can only be read by you and the recipient.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Shield className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-bold mb-2">Privacy Protection</h3>
                <p className="text-sm text-gray-600">
                  WhatsApp cannot read your messages or listen to your calls, ensuring complete privacy.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <CheckCircle className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-bold mb-2">Verified Security</h3>
                <p className="text-sm text-gray-600">
                  Security codes verify that your conversations are encrypted and authentic.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">How End-to-End Encryption Works</h3>
                  <p className="text-gray-600 mb-4">
                    When you send a message, it's encrypted on your device before it's sent over the internet. 
                    The message can only be decrypted on the recipient's device, ensuring that no one else 
                    (including WhatsApp and Divinely Mobile) can read your conversations.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Messages</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Voice & Video Calls</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>File Sharing</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WhatsAppBusinessPlatform;
