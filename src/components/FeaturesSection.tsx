
import React, { useState } from 'react';
import { CreditCard, Zap } from 'lucide-react';
import FeatureHeader from './features/FeatureHeader';
import FeatureToggleButton from './features/FeatureToggleButton';
import FeatureCard from './features/FeatureCard';
import NetworkGrid from './features/NetworkGrid';

const FeaturesSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  console.log('FeaturesSection rendered, isOpen:', isOpen);

  const features = [
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: "OneCard Rewards",
      description: "Earn 2.5% cashback on every purchase with our exclusive OneCard system",
      graphic: "rewards",
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-50",
      stats: "2.5% Cashback",
      mockupType: "dashboard"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Processing",
      description: "Lightning-fast airtime delivery with AI-powered processing",
      graphic: "processing",
      color: "from-yellow-500 to-orange-600",
      bgColor: "bg-yellow-50",
      stats: "AI Powered",
      mockupType: "chart"
    }
  ];

  const handleToggle = () => {
    console.log('Button clicked, current isOpen:', isOpen);
    setIsOpen(!isOpen);
  };

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="container mx-auto px-4 sm:px-6">
        <FeatureHeader />

        {/* Collapsible Features Section */}
        <div className="max-w-4xl mx-auto">
          <FeatureToggleButton isOpen={isOpen} onToggle={handleToggle} />

          {/* Feature Grid - Only show when isOpen is true */}
          {isOpen && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {features.map((feature, index) => (
                  <FeatureCard key={index} feature={feature} />
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
