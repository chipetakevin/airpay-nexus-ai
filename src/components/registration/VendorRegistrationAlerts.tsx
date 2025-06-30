
import React, { useState, useCallback, useEffect } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Trophy, ShoppingCart, MapPin, Shield, ChevronDown, ChevronUp, Info } from 'lucide-react';

interface VendorRegistrationAlertsProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
  marketingConsent?: boolean;
}

const VendorRegistrationAlerts: React.FC<VendorRegistrationAlertsProps> = ({ 
  isCollapsed = true, // Keep collapsed by default for better mobile UX
  onToggle,
  marketingConsent = false
}) => {
  const [isPasswordExpanded, setIsPasswordExpanded] = useState(false);

  // Intelligent collapse based on consent
  useEffect(() => {
    if (marketingConsent) {
      setIsPasswordExpanded(false);
    }
  }, [marketingConsent]);

  // Stable toggle function
  const togglePasswordExpanded = useCallback(() => {
    setIsPasswordExpanded(prev => !prev);
  }, []);

  const handleMainToggle = useCallback(() => {
    if (onToggle) {
      onToggle();
    }
  }, [onToggle]);

  return (
    <div className="space-y-3">
      {/* Enhanced collapsible trigger button - matches the image design */}
      <Button
        onClick={handleMainToggle}
        variant="outline"
        className="collapsible-trigger w-full flex items-center justify-between border-blue-200 bg-blue-50/50 hover:bg-blue-50 p-4"
      >
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
          <span className="font-medium text-blue-800 text-left text-sm">
            {isCollapsed ? 'Hide Registration Info & Benefits' : 'Show Registration Info & Benefits'}
          </span>
        </div>
        {isCollapsed ? (
          <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
        )}
      </Button>

      {/* Collapsible content - hidden by default to match image */}
      {!isCollapsed && (
        <div className="collapsible-content space-y-3">
          {/* Smart Business Registration Alert */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Trophy className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Trophy className="w-4 h-4 text-yellow-600" />
                  <span className="font-semibold text-yellow-800">Smart Business Registration:</span>
                </div>
                <span className="text-yellow-800 text-sm">Auto-save enabled and credentials remembered for faster future access.</span>
              </div>
            </div>
          </div>

          {/* Instant Shopping Access */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <ShoppingCart className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <ShoppingCart className="w-4 h-4 text-blue-600" />
                  <span className="font-semibold text-blue-800">Instant Shopping Access:</span>
                </div>
                <span className="text-blue-800 text-sm">After registration, you'll be immediately redirected to Smart Deals to start shopping!</span>
              </div>
            </div>
          </div>

          {/* Location Detection */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="font-semibold text-green-800">VIP Detected Location:</span>
                </div>
                <span className="text-green-800 text-sm">Johannesburg, Gauteng, South Africa (+27)</span>
              </div>
            </div>
          </div>

          {/* Enhanced Password Management - Collapsible */}
          <div className="space-y-2">
            <Button
              onClick={togglePasswordExpanded}
              variant="outline"
              className={`w-full flex items-center justify-between p-3 h-auto border-purple-200 transition-all duration-300 ${
                marketingConsent ? 'bg-green-50/50 border-green-200' : 'bg-purple-50/50 hover:bg-purple-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-purple-600 flex-shrink-0" />
                <div className="w-4 h-4 bg-yellow-500 rounded-sm flex items-center justify-center">
                  <span className="text-xs text-white font-bold">🔐</span>
                </div>
                <span className="text-sm font-medium text-purple-800">
                  Enhanced Password Management
                  {marketingConsent && (
                    <span className="ml-2 text-green-600 font-bold">✓</span>
                  )}
                </span>
              </div>
              {isPasswordExpanded ? (
                <ChevronUp className="w-4 h-4 text-purple-600 flex-shrink-0" />
              ) : (
                <ChevronDown className="w-4 h-4 text-purple-600 flex-shrink-0" />
              )}
            </Button>

            {isPasswordExpanded && (
              <div className={`border rounded-lg p-3 collapsible-content transition-all duration-300 ${
                marketingConsent ? 'bg-green-50 border-green-200' : 'bg-purple-50 border-purple-200'
              }`}>
                <div className="text-xs sm:text-sm text-purple-700">
                  <ul className="space-y-1 text-xs">
                    <li>• Auto-save keeps your registration safe</li>
                    <li>• Password reset available via email OTP</li>
                    <li>• Use unified password (Malawi@1976) for admin access</li>
                    <li>• Credentials remembered for faster future logins</li>
                  </ul>
                  {marketingConsent && (
                    <div className="mt-2 p-2 bg-green-100 rounded text-green-700 font-medium text-xs">
                      ✅ Password management secured and configured!
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorRegistrationAlerts;
