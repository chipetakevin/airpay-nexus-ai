import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, ChevronDown } from 'lucide-react';

interface AdminData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  adminId: string;
  department: string;
  registrationDate: string;
}

interface AdminRegistrationStatusProps {
  existingRegistration: AdminData;
  onToggle: () => void;
}

const AdminRegistrationStatus: React.FC<AdminRegistrationStatusProps> = ({
  existingRegistration,
  onToggle
}) => {
  return (
    <Card className="border-red-200 bg-red-50/30">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-red-600" />
            <div>
              <h3 className="font-semibold text-red-800">Admin Registration Complete</h3>
              <p className="text-sm text-gray-600">
                {existingRegistration.firstName} {existingRegistration.lastName}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={onToggle}
              variant="outline"
              size="sm"
              className="border-red-300 text-red-700 hover:bg-red-100"
            >
              <ChevronDown className="w-4 h-4 mr-1" />
              Edit
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminRegistrationStatus;