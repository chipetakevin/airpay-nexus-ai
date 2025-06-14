
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Smartphone, Zap, Shield, Star, ArrowRight, 
  CheckCircle, Clock, Wifi, Phone, MessageCircle 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const DivinelyBaaS = () => {
  const features = [
    {
      icon: <Zap className="w-6 h-6 text-blue-600" />,
      title: "5-Minute Porting",
      description: "Lightning-fast SIM porting & RICA"
    },
    {
      icon: <Shield className="w-6 h-6 text-green-600" />,
      title: "99.7% Success Rate",
      description: "ICASA compliant & secure"
    },
    {
      icon: <Wifi className="w-6 h-6 text-purple-600" />,
      title: "AI-Powered",
      description: "Smart automation technology"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 lg:py-16">
        {/* Hero Section */}
        <div className="relative text-center mb-16">
          {/* Floating Elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400/20 rounded-full animate-bounce hidden lg:block"></div>
          <div className="absolute top-20 right-16 w-16 h-16 bg-purple-400/30 rounded-full animate-pulse hidden lg:block"></div>
          <div className="absolute bottom-10 left-20 w-12 h-12 bg-green-400/25 rounded-full animate-pulse delay-500 hidden lg:block"></div>
          
          {/* Main Content */}
          <div className="relative z-10 max-w-4xl mx-auto">
            {/* Badge */}
            <div className="flex justify-center mb-6">
              <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 text-base font-semibold shadow-lg">
                <Star className="w-4 h-4 mr-2" />
                #1 Mobile Platform in South Africa
              </Badge>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
                Smart Mobile Services
              </span>
              <br />
              <span className="text-gray-900">
                Made Simple
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl lg:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Experience the future of mobile commerce with our{' '}
              <span className="font-semibold text-blue-600">AI-powered platform</span>.
              Port your number, buy airtime & data, and manage everything seamlessly—all in{' '}
              <span className="font-semibold text-purple-600">under 5 minutes</span>.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              {features.map((feature, index) => (
                <div key={index} className="group bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl px-6 py-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-50 transition-colors">
                      {feature.icon}
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-gray-900 text-sm">{feature.title}</div>
                      <div className="text-xs text-gray-600">{feature.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link to="/portal?tab=onecard">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto">
                  <Smartphone className="w-5 h-5 mr-2" />
                  Start Shopping Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              
              <Button 
                variant="outline" 
                className="border-2 border-gray-300 hover:border-blue-500 px-8 py-4 text-lg font-semibold rounded-xl hover:bg-blue-50 transition-all duration-300 w-full sm:w-auto"
                onClick={() => window.open('https://wa.me/27832466539', '_blank')}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Chat with AI Assistant
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-lg">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div className="text-3xl font-bold text-green-600">99.7%</div>
                </div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
              
              <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-lg">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <div className="text-3xl font-bold text-blue-600">5</div>
                </div>
                <div className="text-sm text-gray-600">Minutes Average</div>
              </div>
              
              <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-lg">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Phone className="w-5 h-5 text-purple-600" />
                  <div className="text-3xl font-bold text-purple-600">50K+</div>
                </div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Content */}
        <div className="text-center bg-white/80 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-200">
          <div className="max-w-3xl mx-auto">
            <div className="text-5xl mb-6">📱</div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Complete Mobile Solution
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              From SIM porting to airtime purchases, data bundles to balance checks—everything you need 
              for your mobile life is right here. Our platform integrates seamlessly into your daily 
              smartphone experience.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/whatsapp-assistant">
                <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold w-full sm:w-auto">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp Shopping
                </Button>
              </Link>
              
              <Link to="/portal">
                <Button variant="outline" className="border-2 border-gray-300 hover:border-green-500 px-6 py-3 rounded-xl font-semibold hover:bg-green-50 w-full sm:w-auto">
                  Explore All Services
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
};

export default DivinelyBaaS;
