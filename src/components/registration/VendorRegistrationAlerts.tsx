
import React, { useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Trophy, ShoppingCart, MapPin, Shield, ChevronDown, ChevronUp, Info } from 'lucide-react';

const VendorRegistrationAlerts = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPasswordExpanded, setIsPasswordExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const togglePasswordExpanded = () => {
    setIsPasswordExpanded(!isPasswordExpanded);
  };

  return (
    <div className="space-y-3">
      {/* Collapsible trigger button */}
      <Button
        onClick={toggleExpanded}
        variant="outline"
        className="w-full flex items-center justify-between p-4 h-auto border-blue-200 bg-blue-50/50 hover:bg-blue-50"
      >
        <div className="flex items-center gap-2">
          <Info className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-blue-800">Registration Information & Benefits</span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-blue-600" />
        ) : (
          <ChevronDown className="w-5 h-5 text-blue-600" />
        )}
      </Button>

      {/* Collapsible content */}
      {isExpanded && (
        <div className="space-y-3 animate-in slide-in-from-top-2 duration-200">
          {/* Smart Business Registration Alert */}
          <Alert className="border-yellow-200 bg-yellow-50">
            <Trophy className="w-5 h-5 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              <strong>🏆 Smart Business Registration:</strong> Auto-save enabled and credentials remembered for faster future access.
            </AlertDescription>
          </Alert>

          {/* Instant Shopping Access */}
          <Alert className="border-blue-200 bg-blue-50">
            <ShoppingCart className="w-5 h-5 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <strong>🛒 Instant Shopping Access:</strong> After registration, you'll be immediately redirected to Smart Deals to start shopping!
            </AlertDescription>
          </Alert>

          {/* Location Detection */}
          <Alert className="border-green-200 bg-green-50">
            <MapPin className="w-5 h-5 text-green-600" />
            <AlertDescription className="text-green-800">
              <strong>📍 VIP Detected Location:</strong> Johannesburg, Gauteng, South Africa (+27)
            </AlertDescription>
          </Alert>

          {/* Enhanced Password Management - Collapsible Toggle */}
          <div className="space-y-2">
            <Button
              onClick={togglePasswordExpanded}
              variant="outline"
              className="w-full flex items-center justify-between p-3 h-auto border-purple-200 bg-purple-50/50 hover:bg-purple-50"
            >
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-800">🔐 Enhanced Password Management</span>
              </div>
              {isPasswordExpanded ? (
                <ChevronUp className="w-4 h-4 text-purple-600" />
              ) : (
                <ChevronDown className="w-4 h-4 text-purple-600" />
              )}
            </Button>

            {isPasswordExpanded && (
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 animate-in slide-in-from-top-2 duration-200">
                <div className="text-sm text-purple-700">
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
