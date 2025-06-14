
import React, { useState } from 'react';
import { Shield, Smartphone, MessageSquare, Clock } from 'lucide-react';
import FeatureHeader from './features/FeatureHeader';
import FeatureToggleButton from './features/FeatureToggleButton';
import FeatureCard from './features/FeatureCard';
import NetworkGrid from './features/NetworkGrid';

const FeaturesSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Safe",
      description: "Bank-grade security for all transactions",
      graphic: "security",
      color: "from-purple-500 to-indigo-600",
      bgColor: "bg-purple-50",
      stats: "Bank-grade Security",
      mockupType: "security"
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile Optimized",
      description: "Designed specifically for smartphone users",
      graphic: "mobile",
      color: "from-orange-500 to-red-600",
      bgColor: "bg-orange-50",
      stats: "Mobile First",
      mockupType: "mobile"
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "WhatsApp Shopping",
      description: "Shop directly through WhatsApp - no app needed!",
      graphic: "whatsapp",
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50",
      stats: "No App Needed",
      mockupType: "whatsapp"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Instant Delivery",
      description: "Airtime and data delivered within 30 seconds",
      graphic: "delivery",
      color: "from-blue-500 to-cyan-600",
      bgColor: "bg-blue-50",
      stats: "< 30 Seconds",
      mockupType: "delivery"
    }
  ];

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="container mx-auto px-4 sm:px-6">
        <FeatureHeader />

        {/* Collapsible Features Section */}
        <div className="max-w-6xl mx-auto">
          <FeatureToggleButton isOpen={isOpen} onToggle={handleToggle} />

          {/* Feature Grid - Only show when isOpen is true */}
          {isOpen && (
            <div className="space-y-8 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {features.map((feature, index) => (
                  <FeatureCard key={index} feature={feature} index={index} />
                ))}
              </div>
            </div>
          )}
        </div>

        <NetworkGrid />
      </div>
    </section>
  );
};

export default FeaturesSection;
