
import React, { useState } from 'react';
import Header from '../components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { 
  Smartphone, 
  CreditCard, 
  TrendingUp, 
  Shield, 
  Users, 
  Zap,
  Phone,
  Wifi,
  Star,
  ArrowRight
} from 'lucide-react';

const Index = () => {
  const [adminClickCount, setAdminClickCount] = useState(0);
  const [showAdminLink, setShowAdminLink] = useState(false);

  const handleLogoClick = () => {
    const newCount = adminClickCount + 1;
    setAdminClickCount(newCount);
    if (newCount === 5) {
      setShowAdminLink(true);
    } else if (newCount > 5) {
      setAdminClickCount(0);
      setShowAdminLink(false);
    }
  };

  const features = [
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "USSD & App Access",
      description: "Purchase airtime via USSD codes or our mobile app - available 24/7"
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: "OneCard Rewards",
      description: "Earn 2.5% cashback on every purchase with our exclusive OneCard system"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Real-Time Deals",
      description: "Access the best airtime deals from all major South African networks"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Payments",
      description: "Bank-level encryption and PCI DSS compliance for all transactions"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Multi-Network Support",
      description: "MTN, Vodacom, Cell C, Telkom, and Rain - all in one platform"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Processing",
      description: "Lightning-fast airtime delivery with AI-powered processing"
    }
  ];

  const benefits = [
    {
      title: "For Customers",
      stats: [
        { label: "Average Savings", value: "15%" },
        { label: "Cashback Rate", value: "2.5%" },
        { label: "Processing Time", value: "<30s" }
      ],
      description: "Save money on every airtime purchase while earning rewards"
    },
    {
      title: "For Vendors",
      stats: [
        { label: "Revenue Increase", value: "40%" },
        { label: "Customer Retention", value: "85%" },
        { label: "Setup Time", value: "24hrs" }
      ],
      description: "Expand your business with our comprehensive distribution network"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header onLogoClick={handleLogoClick} showAdminLink={showAdminLink} />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-teal-500 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                South Africa's
                <span className="block text-yellow-300">Smartest Airtime</span>
                <span className="block">Platform</span>
              </h1>
              <p className="text-lg sm:text-xl mb-8 opacity-90 max-w-2xl mx-auto lg:mx-0">
                Join thousands of South Africans saving money on airtime while earning cashback rewards. 
                Purchase from all major networks with unbeatable deals and instant delivery.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/portal">
                  <Button size="lg" className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 text-lg">
                    Start Earning Rewards
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/portal">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg"
                  >
                    Become a Vendor
                  </Button>
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-6 text-sm">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>USSD: *120*888#</span>
                </div>
                <div className="flex items-center">
                  <Wifi className="w-4 h-4 mr-2" />
                  <span>App Available</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-2 text-yellow-300" />
                  <span>4.8/5 Rating</span>
                </div>
              </div>
            </div>

            <div className="relative lg:block hidden">
              <div className="relative z-10 bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black p-6 rounded-xl mb-6">
                  <div className="text-lg font-bold mb-2">OneCard Gold</div>
                  <div className="text-2xl font-bold">R2,847.50</div>
                  <div className="text-sm opacity-80">Available Cashback</div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Total Earned:</span>
                    <span className="font-bold">R5,694.75</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Transactions:</span>
                    <span className="font-bold">1,247</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Savings Rate:</span>
                    <span className="font-bold text-green-300">15.2%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose AirPay?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the future of airtime purchasing with our AI-driven platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full mb-6 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {benefits.map((benefit, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
                  <h3 className="text-2xl font-bold mb-4">{benefit.title}</h3>
                  <p className="opacity-90 mb-6">{benefit.description}</p>
                  
                  <div className="grid grid-cols-3 gap-4">
                    {benefit.stats.map((stat, statIndex) => (
                      <div key={statIndex} className="text-center">
                        <div className="text-2xl font-bold text-yellow-300">{stat.value}</div>
                        <div className="text-sm opacity-80">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <CardContent className="p-8">
                  <Link to="/portal">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      {index === 0 ? 'Register as Customer' : 'Become a Vendor'}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-500 text-white">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Start Saving on Airtime?
          </h2>
          <p className="text-lg sm:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of satisfied customers earning cashback rewards on every purchase
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Link to="/portal" className="flex-1">
              <Button size="lg" className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold">
                Register Now
              </Button>
            </Link>
            <Link to="/portal" className="flex-1">
              <Button size="lg" variant="outline" className="w-full border-white text-white hover:bg-white hover:text-blue-600">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">AirPay</h3>
              <p className="text-gray-400 mb-4">
                South Africa's leading AI-driven airtime management platform.
              </p>
              <div className="flex space-x-4">
                <span className="text-sm text-gray-400">Follow us:</span>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Quick Access</h4>
              <div className="space-y-2">
                <Link to="/portal" className="block text-gray-400 hover:text-white transition-colors">
                  Customer Registration
                </Link>
                <Link to="/portal" className="block text-gray-400 hover:text-white transition-colors">
                  Vendor Portal
                </Link>
                <a href="tel:*120*888#" className="block text-gray-400 hover:text-white transition-colors">
                  USSD: *120*888#
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Networks</h4>
              <div className="space-y-2 text-gray-400">
                <div>MTN South Africa</div>
                <div>Vodacom</div>
                <div>Cell C</div>
                <div>Telkom Mobile</div>
                <div>Rain Mobile</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-400">
                <div>support@airpay.co.za</div>
                <div>+27 11 123 4567</div>
                <div>Johannesburg, South Africa</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AirPay. All rights reserved. AI-Driven Airtime Management System.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
