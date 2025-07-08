
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, Users, Shield, Gift, 
  ArrowRight, Star, CheckCircle,
  DollarSign, Crown, Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';

const CommunityBenefitsSection = () => {
  const benefits = [
    {
      icon: <TrendingUp className="w-6 h-6 text-green-600" />,
      title: "Vendors have the highest direct profitability",
      description: "Earn 8%+ per transaction consistently",
      badge: "Most Profitable",
      color: "from-green-500 to-emerald-600",
      textColor: "text-green-800",
      bgColor: "bg-green-50"
    },
    {
      icon: <img src="/lovable-uploads/788fddcb-574c-4f1d-9c73-54cc003a95d1.png" alt="Divine Mobile" className="w-6 h-6" />,
      title: "Customer rewards scale with loyalty",
      description: "Premium/VIP members get significant bonuses (up to 2x rewards)",
      badge: "Loyalty Program",
      color: "from-purple-500 to-indigo-600",
      textColor: "text-purple-800",
      bgColor: "bg-purple-50"
    },
    {
      icon: <Shield className="w-6 h-6 text-blue-600" />,
      title: "Admin profits are strategically complex",
      description: "2% visible fee with strategic optimization",
      badge: "Strategic",
      color: "from-blue-500 to-cyan-600",
      textColor: "text-blue-800",
      bgColor: "bg-blue-50"
    },
    {
      icon: <Gift className="w-6 h-6 text-orange-600" />,
      title: "Third-party purchases generate additional rewards",
      description: "Recipients get rewards even before joining the platform",
      badge: "Network Effect",
      color: "from-orange-500 to-red-600",
      textColor: "text-orange-800",
      bgColor: "bg-orange-50"
    }
  ];

  const profitabilityData = [
    {
      userType: "Vendors",
      weeklyEarning: "R8.00 - R8.80",
      annualEarning: "R416 - R458",
      rate: "8% - 8.8%",
      tier: "Most Profitable",
      color: "text-green-600",
      bg: "bg-green-100"
    },
    {
      userType: "VIP Customers",
      weeklyEarning: "R5.00",
      annualEarning: "R260",
      rate: "5%",
      tier: "Premium Rewards",
      color: "text-purple-600",
      bg: "bg-purple-100"
    },
    {
      userType: "Premium Customers",
      weeklyEarning: "R3.75",
      annualEarning: "R195",
      rate: "3.75%",
      tier: "Enhanced",
      color: "text-blue-600",
      bg: "bg-blue-100"
    },
    {
      userType: "Base Customers",
      weeklyEarning: "R2.50",
      annualEarning: "R130",
      rate: "2.5%",
      tier: "Standard",
      color: "text-gray-600",
      bg: "bg-gray-100"
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 text-base font-semibold mb-6">
            <Users className="w-4 h-4 mr-2" />
            Join Our Thriving Community
          </Badge>
          
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent mb-6">
            Discover Your Earning Potential
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            See how profitable the Divine Mobile platform is for each user type when purchasing R100 weekly
          </p>
        </div>

        {/* Profitability Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {profitabilityData.map((data, index) => (
            <Card key={index} className="relative overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className={`absolute top-0 right-0 w-20 h-20 ${data.bg} opacity-20 rounded-full -mr-10 -mt-10`}></div>
              <CardContent className="p-6 relative">
                <div className="flex items-center justify-between mb-4">
                  <Badge className={`${data.bg} ${data.color} text-xs font-semibold`}>
                    {data.tier}
                  </Badge>
                  <DollarSign className={`w-5 h-5 ${data.color}`} />
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2">{data.userType}</h3>
                
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-gray-600">Weekly Earning</p>
                    <p className={`text-xl font-bold ${data.color}`}>{data.weeklyEarning}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-600">Annual Potential</p>
                    <p className="text-sm font-semibold text-gray-800">{data.annualEarning}</p>
                  </div>
                  
                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-xs text-gray-600">Rate</p>
                    <p className={`text-sm font-bold ${data.color}`}>{data.rate}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Key Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {benefits.map((benefit, index) => (
            <Card key={index} className={`${benefit.bgColor} border-2 hover:border-opacity-50 transition-all duration-300 hover:shadow-lg`}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${benefit.color} text-white shadow-lg`}>
                    {benefit.icon}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={`${benefit.bgColor} ${benefit.textColor} text-xs font-semibold border`}>
                        {benefit.badge}
                      </Badge>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Star className="w-6 h-6 text-yellow-300" />
                <h3 className="text-2xl font-bold">Ready to Start Earning?</h3>
                <Star className="w-6 h-6 text-yellow-300" />
              </div>
              
              <p className="text-blue-100 mb-6 text-lg">
                Join thousands of community members already earning with Divine Mobile
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <Link to="/portal?tab=registration" className="flex-1">
                  <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-xl shadow-lg">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Join as Customer
                  </Button>
                </Link>
                
                <Link to="/portal?tab=vendor" className="flex-1">
                  <Button className="w-full bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-6 rounded-xl shadow-lg">
                    <Zap className="w-4 h-4 mr-2" />
                    Become Vendor
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CommunityBenefitsSection;
