
import React, { useState, useCallback } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Trophy, ShoppingCart, MapPin, Shield, ChevronDown, ChevronUp, Info } from 'lucide-react';

interface VendorRegistrationAlertsProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
}

const VendorRegistrationAlerts: React.FC<VendorRegistrationAlertsProps> = ({ 
  isCollapsed = true, // Default to collapsed for better mobile UX
  onToggle 
}) => {
  const [isPasswordExpanded, setIsPasswordExpanded] = useState(false);

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
      {/* Enhanced collapsible trigger button */}
      <Button
        onClick={handleMainToggle}
        variant="outline"
        className="collapsible-trigger w-full flex items-center justify-between border-blue-200 bg-blue-50/50 hover:bg-blue-50"
      >
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
          <span className="font-medium text-blue-800 text-left text-xs sm:text-sm">
            {isCollapsed ? 'Show Registration Info & Benefits' : 'Hide Registration Info & Benefits'}
          </span>
        </div>
        {isCollapsed ? (
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
        ) : (
          <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
        )}
      </Button>

      {/* Collapsible content with better animation */}
      {!isCollapsed && (
        <div className="collapsible-content space-y-3">
          {/* Smart Business Registration Alert */}
          <Alert className="border-yellow-200 bg-yellow-50">
            <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
            <AlertDescription className="text-yellow-800 text-xs sm:text-sm">
              <strong>🏆 Smart Business Registration:</strong> Auto-save enabled and credentials remembered for faster future access.
            </AlertDescription>
          </Alert>

          {/* Instant Shopping Access */}
          <Alert className="border-blue-200 bg-blue-50">
            <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
            <AlertDescription className="text-blue-800 text-xs sm:text-sm">
              <strong>🛒 Instant Shopping Access:</strong> After registration, you'll be immediately redirected to Smart Deals to start shopping!
            </AlertDescription>
          </Alert>

          {/* Location Detection */}
          <Alert className="border-green-200 bg-green-50">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
            <AlertDescription className="text-green-800 text-xs sm:text-sm">
              <strong>📍 VIP Detected Location:</strong> Johannesburg, Gauteng, South Africa (+27)
            </AlertDescription>
          </Alert>

          {/* Enhanced Password Management - Stable collapsible toggle */}
          <div className="space-y-2">
            <Button
              onClick={togglePasswordExpanded}
              variant="outline"
              className="w-full flex items-center justify-between p-2 sm:p-3 h-auto border-purple-200 bg-purple-50/50 hover:bg-purple-50"
            >
              <div className="flex items-center gap-2">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-purple-800">🔐 Enhanced Password Management</span>
              </div>
              {isPasswordExpanded ? (
                <ChevronUp className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600 flex-shrink-0" />
              ) : (
                <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600 flex-shrink-0" />
              )}
            </Button>

            {isPasswordExpanded && (
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-2 sm:p-3 collapsible-content">
                <div className="text-xs sm:text-sm text-purple-700">
                  <ul className="space-y-1 text-xs">
                    <li>• Auto-save keeps your registration safe</li>
                    <li>• Password reset available via email OTP</li>
                    <li>• Use unified password (Malawi@1976) for admin access</li>
                  </ul>
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
