
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const RegistrationAlerts: React.FC = () => {
  return (
    <>
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-4">
          <p className="text-sm text-green-800">
            🔒 <strong>Smart Registration:</strong> Your data is auto-saved and auto-login is enabled for faster future shopping experiences.
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

export default RegistrationAlerts;
