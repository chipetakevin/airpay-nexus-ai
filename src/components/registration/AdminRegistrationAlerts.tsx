
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const AdminRegistrationAlerts: React.FC = () => {
  return (
    <>
      <Card className="bg-red-50 border-red-200">
        <CardContent className="p-3">
          <p className="text-sm text-red-800">
            🔐 <strong>Secure Admin Access:</strong> Auto-save & credentials remembered
          </p>
        </CardContent>
      </Card>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-3">
          <p className="text-sm text-blue-800">
            🛒 <strong>Instant Access:</strong> Redirected to Smart Deals after registration
          </p>
        </CardContent>
      </Card>
    </>
  );
};

export default AdminRegistrationAlerts;
