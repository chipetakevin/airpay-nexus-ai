
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle, Smartphone } from 'lucide-react';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const WhatsAppFeatures = () => {
  const features: Feature[] = [
    {
      icon: <MessageCircle className="w-6 h-6 text-green-600" />,
      title: "WhatsApp Shopping",
      description: "Shop directly through WhatsApp - no app needed!"
    },
    {
      icon: <Smartphone className="w-6 h-6 text-orange-600" />,
      title: "Mobile Optimized",
      description: "Designed specifically for smartphone users"
    }
  ];

  return (
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
  );
};

export default WhatsAppFeatures;
