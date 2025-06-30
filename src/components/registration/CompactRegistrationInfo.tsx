
import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Info, Trophy, ShoppingCart, MapPin, Shield } from 'lucide-react';

interface CompactRegistrationInfoProps {
  marketingConsent?: boolean;
  location?: string;
}

const CompactRegistrationInfo: React.FC<CompactRegistrationInfoProps> = ({ 
  marketingConsent = false,
  location = 'Johannesburg, Gauteng, South Africa (+27)'
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);

  return (
    <div className="space-y-2">
      {/* Compact trigger button */}
      <Button
        onClick={toggleExpanded}
        variant="outline"
        className="w-full flex items-center justify-between p-3 h-auto border-blue-200 bg-blue-50/50 hover:bg-blue-50 text-sm"
      >
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-blue-600 flex-shrink-0" />
          <span className="font-medium text-blue-800">
            {isExpanded ? 'Hide Registration Benefits' : 'Show Registration Benefits'}
          </span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-blue-600 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-blue-600 flex-shrink-0" />
        )}
      </Button>

      {/* Compressed content */}
      {isExpanded && (
        <div className="space-y-2 animate-fade-in">
          {/* Smart Business Registration - Compressed */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="flex items-center gap-2 text-sm">
              <Trophy className="w-4 h-4 text-yellow-600 flex-shrink-0" />
              <div>
                <span className="font-semibold text-yellow-800">Smart Business Registration: </span>
                <span className="text-yellow-700">Auto-save enabled and credentials remembered for faster future access.</span>
              </div>
            </div>
          </div>

          {/* Instant Shopping Access - Compressed */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-center gap-2 text-sm">
              <ShoppingCart className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <div>
                <span className="font-semibold text-blue-800">Instant Shopping Access: </span>
                <span className="text-blue-700">After registration, you'll be immediately redirected to Smart Deals to start shopping!</span>
              </div>
            </div>
          </div>

          {/* VIP Location - Compressed */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-green-600 flex-shrink-0" />
              <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
              <div>
                <span className="font-semibold text-green-800">VIP Detected Location: </span>
                <span className="text-green-700">{location}</span>
              </div>
            </div>
          </div>

          {/* Enhanced Password Management - Ultra Compact */}
          <div className={`border rounded-lg p-3 transition-all duration-300 ${
            marketingConsent ? 'bg-green-50 border-green-200' : 'bg-purple-50 border-purple-200'
          }`}>
            <div className="flex items-center gap-2 text-sm">
              <Shield className="w-4 h-4 text-purple-600 flex-shrink-0" />
              <div className="w-4 h-4 bg-yellow-500 rounded-sm flex items-center justify-center flex-shrink-0">
                <span className="text-xs text-white font-bold">🔐</span>
              </div>
              <div>
                <span className="font-semibold text-purple-800">Enhanced Password Management</span>
                {marketingConsent && (
                  <span className="ml-2 text-green-600 font-bold">✓</span>
                )}
              </div>
            </div>
            <div className="mt-1 text-xs text-purple-600 ml-10">
              Auto-save, password reset via OTP, unified admin access
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompactRegistrationInfo;
