
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Store, ChevronDown } from 'lucide-react';
import { useVendorRegistrationContext } from './VendorRegistrationProvider';

const ExistingVendorSummary: React.FC = () => {
  const { existingRegistration, handleFormToggle, handleNewRegistration } = useVendorRegistrationContext();

  if (!existingRegistration) return null;

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2 text-blue-800">
              <CheckCircle className="w-5 h-5" />
              Vendor Registration Complete
            </CardTitle>
            <Badge className="bg-blue-100 text-blue-700">
              <Store className="w-3 h-3 mr-1" />
              Active
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs text-gray-600">Business Owner</label>
              <p className="font-semibold text-gray-900">
                {existingRegistration.firstName} {existingRegistration.lastName}
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-xs text-gray-600">Vendor ID</label>
              <p className="font-mono text-sm text-blue-600 font-semibold">
                {existingRegistration.vendorId}
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-xs text-gray-600">Company Name</label>
              <p className="text-sm text-gray-700">
                {existingRegistration.companyName}
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-xs text-gray-600">Registration Date</label>
              <p className="text-sm text-gray-700">
                {new Date(existingRegistration.registrationDate).toLocaleDateString()}
              </p>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <label className="text-xs text-gray-600">Email Address</label>
              <p className="text-sm text-gray-700">
                {existingRegistration.email}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t border-blue-200">
            <Button
              onClick={handleFormToggle}
              variant="outline"
              className="flex items-center gap-2 border-blue-300 text-blue-700 hover:bg-blue-100"
            >
              <ChevronDown className="w-4 h-4" />
              Edit Registration Details
            </Button>
            <Button
              onClick={handleNewRegistration}
              variant="outline"
              className="flex items-center gap-2 border-green-300 text-green-700 hover:bg-green-100"
            >
              <Store className="w-4 h-4" />
              Register New Vendor
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExistingVendorSummary;
