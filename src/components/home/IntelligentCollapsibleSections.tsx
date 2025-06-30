
import React from 'react';
import { Star, Zap, Users, Shield } from 'lucide-react';
import IntelligentCollapsible from '@/components/ui/intelligent-collapsible';

const IntelligentCollapsibleSections = () => {
  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      <IntelligentCollapsible
        title="Unified Mobile Platform"
        icon={<Star className="w-6 h-6 text-orange-500" />}
        badge="Premium"
        badgeVariant="outline"
        defaultCollapsed={true}
        className="border-orange-200 bg-orange-50/30"
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            Experience our comprehensive mobile platform that brings together all your favorite services
            in one seamless interface. From airtime and data to financial services, everything you need
            is just a tap away.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-semibold text-orange-600 mb-2">Smart Features</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• AI-powered recommendations</li>
                <li>• Instant transactions</li>
                <li>• Multi-network support</li>
                <li>• Secure payments</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-semibold text-orange-600 mb-2">Network Coverage</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Vodacom</li>
                <li>• MTN</li>
                <li>• Cell C</li>
                <li>• Telkom</li>
              </ul>
            </div>
          </div>
        </div>
      </IntelligentCollapsible>

      <IntelligentCollapsible
        title="Quick Access Features"
        icon={<Zap className="w-6 h-6 text-blue-500" />}
        badge="Fast"
        badgeVariant="secondary"
        defaultCollapsed={true}
        className="border-blue-200 bg-blue-50/30"
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            Lightning-fast access to your most-used features. No more navigating through complex menus - 
            everything you need is right at your fingertips.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-white p-3 rounded-lg border text-center">
              <div className="text-2xl mb-1">📱</div>
              <div className="text-sm font-medium">Buy Airtime</div>
            </div>
            <div className="bg-white p-3 rounded-lg border text-center">
              <div className="text-2xl mb-1">📊</div>
              <div className="text-sm font-medium">Data Bundles</div>
            </div>
            <div className="bg-white p-3 rounded-lg border text-center">
              <div className="text-2xl mb-1">💳</div>
              <div className="text-sm font-medium">OneCard</div>
            </div>
            <div className="bg-white p-3 rounded-lg border text-center">
              <div className="text-2xl mb-1">🎯</div>
              <div className="text-sm font-medium">Deals</div>
            </div>
          </div>
        </div>
      </IntelligentCollapsible>

      <IntelligentCollapsible
        title="Join Our Thriving Community"
        icon={<Users className="w-6 h-6 text-purple-500" />}
        badge="50K+ Members"
        badgeVariant="outline"
        defaultCollapsed={true}
        className="border-purple-200 bg-purple-50/30"
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            Become part of a growing community of smart shoppers who save money on mobile services
            while earning rewards with every purchase.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">50K+</div>
              <div className="text-sm text-gray-600">Active Users</div>
            </div>
            <div className="bg-white p-4 rounded-lg border text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">R2.5M+</div>
              <div className="text-sm text-gray-600">Rewards Earned</div>
            </div>
            <div className="bg-white p-4 rounded-lg border text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-sm text-gray-600">Support</div>
            </div>
          </div>
        </div>
      </IntelligentCollapsible>

      <IntelligentCollapsible
        title="Why Choose Smart Deals Shopping?"
        icon={<Shield className="w-6 h-6 text-purple-500" />}
        badge="Trusted"
        badgeVariant="outline"
        defaultCollapsed={true}
        className="border-purple-200 bg-purple-50/30"
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            Discover why thousands of South Africans trust us with their mobile service needs.
            From competitive pricing to exceptional customer service, we're here to help you save.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-purple-600">Best Prices Guaranteed</h4>
                  <p className="text-sm text-gray-600">We constantly monitor market prices to ensure you get the best deals available.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-purple-600">Instant Delivery</h4>
                  <p className="text-sm text-gray-600">Airtime and data delivered to your phone within seconds of purchase.</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-purple-600">Secure Transactions</h4>
                  <p className="text-sm text-gray-600">Bank-level security protects your personal and financial information.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-purple-600">24/7 Support</h4>
                  <p className="text-sm text-gray-600">Our customer support team is always ready to help you with any questions.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </IntelligentCollapsible>
    </div>
  );
};

export default IntelligentCollapsibleSections;
