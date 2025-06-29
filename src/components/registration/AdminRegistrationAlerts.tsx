
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const AdminRegistrationAlerts: React.FC = () => {
  return (
    <>
      <Card className="bg-red-50 border-red-200">
        <CardContent className="p-4">
          <p className="text-sm text-red-800">
            🔐 <strong>Secure Admin Registration:</strong> Auto-save enabled and credentials remembered for seamless admin access.
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

export default AdminRegistrationAlerts;
