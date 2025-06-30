
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { ChevronDown, ChevronUp, Star, Bolt, Users } from 'lucide-react';

interface CollapsibleSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  backgroundColor: string;
  borderColor: string;
  content: React.ReactNode;
  defaultCollapsed?: boolean;
}

const IntelligentCollapsibleSections = () => {
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({
    platform: true,
    features: true,
    community: true,
    smartDeals: true
  });

  const toggleSection = (sectionId: string) => {
    setCollapsedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const sections: CollapsibleSection[] = [
    {
      id: 'platform',
      title: 'Unified Mobile Platform',
      icon: <Star className="w-5 h-5 text-orange-600" />,
      backgroundColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      content: (
        <div className="p-4 space-y-3">
          <p className="text-gray-700">Access all your mobile services in one unified platform. From airtime purchases to data deals, everything you need is here.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-white p-3 rounded-lg border border-orange-100">
              <h4 className="font-semibold text-orange-800">OneCard Integration</h4>
              <p className="text-sm text-gray-600">Seamless payment processing</p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-orange-100">
              <h4 className="font-semibold text-orange-800">Multi-Network Support</h4>
              <p className="text-sm text-gray-600">All SA networks supported</p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-orange-100">
              <h4 className="font-semibold text-orange-800">Real-time Processing</h4>
              <p className="text-sm text-gray-600">Instant transactions</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'features',
      title: 'Quick Access Features',
      icon: <Bolt className="w-5 h-5 text-blue-600" />,
      backgroundColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      content: (
        <div className="p-4 space-y-3">
          <p className="text-gray-700">Get instant access to the most popular mobile services with our quick action features.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-white p-3 rounded-lg border border-blue-100">
              <h4 className="font-semibold text-blue-800">Instant Airtime</h4>
              <p className="text-sm text-gray-600">Purchase airtime in seconds</p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-blue-100">
              <h4 className="font-semibold text-blue-800">Data Bundles</h4>
              <p className="text-sm text-gray-600">Best data deals available</p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-blue-100">
              <h4 className="font-semibold text-blue-800">WhatsApp Shopping</h4>
              <p className="text-sm text-gray-600">Shop via WhatsApp assistant</p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-blue-100">
              <h4 className="font-semibold text-blue-800">Smart Recommendations</h4>
              <p className="text-sm text-gray-600">AI-powered deal suggestions</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'community',
      title: 'Join Our Thriving Community',
      icon: <Users className="w-5 h-5 text-purple-600" />,
      backgroundColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      content: (
        <div className="p-4 space-y-3">
          <p className="text-gray-700">Be part of South Africa's fastest-growing mobile community with exclusive benefits and rewards.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-white p-3 rounded-lg border border-purple-100">
              <h4 className="font-semibold text-purple-800">Community Rewards</h4>
              <p className="text-sm text-gray-600">Earn points with every purchase</p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-purple-100">
              <h4 className="font-semibold text-purple-800">Exclusive Deals</h4>
              <p className="text-sm text-gray-600">Members-only discounts</p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-purple-100">
              <h4 className="font-semibold text-purple-800">Priority Support</h4>
              <p className="text-sm text-gray-600">24/7 dedicated assistance</p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-purple-100">
              <h4 className="font-semibold text-purple-800">Social Benefits</h4>
              <p className="text-sm text-gray-600">Connect with other users</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'smartDeals',
      title: 'Why Choose Smart Deals Shopping?',
      icon: <Star className="w-5 h-5 text-purple-600" />,
      backgroundColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      content: (
        <div className="p-4 space-y-3">
          <p className="text-gray-700">Experience the smartest way to shop for mobile services with AI-powered recommendations and unbeatable prices.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-white p-3 rounded-lg border border-purple-100">
              <h4 className="font-semibold text-purple-800">AI-Powered Deals</h4>
              <p className="text-sm text-gray-600">Smart algorithms find best prices</p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-purple-100">
              <h4 className="font-semibold text-purple-800">Price Comparison</h4>
              <p className="text-sm text-gray-600">Always get the best value</p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-purple-100">
              <h4 className="font-semibold text-purple-800">Instant Processing</h4>
              <p className="text-sm text-gray-600">No waiting, immediate delivery</p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-purple-100">
              <h4 className="font-semibold text-purple-800">Secure Payments</h4>
              <p className="text-sm text-gray-600">Bank-level security guaranteed</p>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4 p-4">
      {sections.map((section) => (
        <Card
          key={section.id}
          className={`${section.backgroundColor} ${section.borderColor} border-2 transition-all duration-300 hover:shadow-md`}
        >
          <div
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/30 transition-colors rounded-lg"
            onClick={() => toggleSection(section.id)}
          >
            <div className="flex items-center gap-3">
              {section.icon}
              <h3 className="text-lg font-semibold text-gray-800">{section.title}</h3>
            </div>
            {collapsedSections[section.id] ? (
              <ChevronDown className="w-5 h-5 text-gray-600 transition-transform" />
            ) : (
              <ChevronUp className="w-5 h-5 text-gray-600 transition-transform" />
            )}
          </div>
          
          {!collapsedSections[section.id] && (
            <div className="border-t border-current/20">
              {section.content}
            </div>
          )}
        </Card>
      ))}
    </div>
  );
};

export default IntelligentCollapsibleSections;
