
import React, { useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Trophy, ShoppingCart, MapPin, Shield, ChevronDown, ChevronUp, Info } from 'lucide-react';

const VendorRegistrationAlerts = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
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

          {/* Password Management */}
          <Alert className="border-purple-200 bg-purple-50">
            <Shield className="w-5 h-5 text-purple-600" />
            <AlertDescription className="text-purple-800">
              <strong>🔐 Enhanced Security:</strong> Password reset via email OTP available. Use special password (Malawi@1976) for unified admin access.
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
};

export default VendorRegistrationAlerts;
