
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const VendorRegistrationAlerts: React.FC = () => {
  return (
    <>
      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="p-4">
          <p className="text-sm text-yellow-800">
            🏆 <strong>Smart Business Registration:</strong> Auto-save enabled and credentials remembered for faster future access.
          </p>
        </CardContent>
      </Card>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <p className="text-sm text-blue-800">
            🛒 <strong>Instant Shopping Access:</strong> After registration, you'll be immediately redirected to Smart Deals to start shopping!
          </p>
        </CardContent>
      </Card>
    </>
  );
};

export default VendorRegistrationAlerts;
