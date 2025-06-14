
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Trophy, ShoppingCart, MapPin, Shield } from 'lucide-react';

const VendorRegistrationAlerts = () => {
  return (
    <div className="space-y-3">
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
  );
};

export default VendorRegistrationAlerts;
