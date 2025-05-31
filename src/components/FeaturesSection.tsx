
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Smartphone, 
  CreditCard, 
  TrendingUp, 
  Shield, 
  Users, 
  Zap
} from 'lucide-react';

const FeaturesSection = () => {
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

  return (
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
  );
};

export default FeaturesSection;
