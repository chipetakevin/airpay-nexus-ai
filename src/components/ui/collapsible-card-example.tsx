import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Phone, User, CreditCard } from 'lucide-react';
import CollapsibleSection from './collapsible-section';
import { cn } from '@/lib/utils';

export const CollapsibleCardExample: React.FC = () => {
  return (
    <div className="space-y-6 p-6 max-w-md mx-auto">
      
      {/* Registered Phone Section - Collapsible */}
      <CollapsibleSection
        defaultVisible={true}
        showToggleButton={true}
        toggleButtonText={{ show: "Show Phone", hide: "Click to hide" }}
        className="animate-fade-in"
      >
        <Card className="bg-blue-50 border-blue-200 p-6 text-center">
          <div className="flex items-center justify-center mb-4">
            <Phone className="w-6 h-6 text-blue-600 mr-2" />
            <h3 className="text-lg font-medium text-blue-700">Registered Phone</h3>
          </div>
          <div className="text-2xl font-bold text-blue-800 mb-2">
            +27832455650
          </div>
          <div className="flex items-center justify-center">
            <span className="text-sm text-blue-600">📞</span>
          </div>
        </Card>
      </CollapsibleSection>

      {/* Account Status Section - Collapsible */}
      <CollapsibleSection
        defaultVisible={true}
        showToggleButton={true}
        showCloseButton={true}
        toggleButtonText={{ show: "Show Status", hide: "Hide Status" }}
        className="animate-fade-in"
      >
        <Card className="bg-green-50 border-green-200 p-6 text-center">
          <div className="flex items-center justify-center mb-4">
            <User className="w-6 h-6 text-green-600 mr-2" />
            <h3 className="text-lg font-medium text-green-700">Account Status</h3>
          </div>
          <div className="text-2xl font-bold text-green-800 mb-2">
            KEVIN CHIPETA
          </div>
          <Badge className="bg-green-100 text-green-700 border-green-300">
            Active Member Since 2025
          </Badge>
        </Card>
      </CollapsibleSection>

      {/* OneCard Section - Always Visible */}
      <Card className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black p-6 relative overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="bg-black text-yellow-400 rounded p-2 mr-3">
              <span className="font-bold text-lg">A</span>
            </div>
            <div>
              <h3 className="text-xl font-bold">AirPay</h3>
              <p className="text-sm opacity-80">Powered by OneCard</p>
            </div>
          </div>
          <div className="bg-black text-white rounded-full px-3 py-1 text-sm font-bold">
            1 CARD
          </div>
        </div>
        
        <div className="text-center mb-6">
          <div className="text-3xl font-bold tracking-wider">
            OCRA 50TG WG
          </div>
        </div>
        
        <div className="flex justify-between items-end">
          <div>
            <p className="text-sm opacity-80">CARD HOLDER</p>
            <p className="font-bold">KEVIN CHIPETA</p>
            <p className="text-sm opacity-80">Member Since 2025</p>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-80">VALID THRU</p>
            <p className="font-bold text-lg">06/28</p>
          </div>
        </div>
      </Card>

      {/* Demo Section with Custom Animation */}
      <CollapsibleSection
        defaultVisible={false}
        showToggleButton={true}
        toggleButtonText={{ show: "Show More Info", hide: "Hide Info" }}
        animationDuration={300}
        className="animate-scale-in"
      >
        <Card className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <div className="text-center">
            <CreditCard className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <h4 className="font-semibold text-purple-800">Additional Features</h4>
            <p className="text-sm text-purple-600 mt-2">
              Access premium features, transaction history, and cashback rewards.
            </p>
          </div>
        </Card>
      </CollapsibleSection>
    </div>
  );
};

export default CollapsibleCardExample;