
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Store, User, Calendar, IdCard, Edit, Plus } from 'lucide-react';
import { useVendorRegistrationContext } from './VendorRegistrationProvider';

const ExistingVendorSummary: React.FC = () => {
  const { existingRegistration, handleFormToggle, handleNewRegistration } = useVendorRegistrationContext();

  if (!existingRegistration) return null;

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-ZA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'Recently';
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Welcome Back Header */}
      <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Store className="w-6 h-6 text-green-600" />
            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
              Vendor Active
            </Badge>
          </div>
          <CardTitle className="text-2xl text-green-800">
            Welcome Back, {existingRegistration.firstName}! 👋
          </CardTitle>
          <p className="text-green-700">
            Your vendor registration is complete and active
          </p>
        </CardHeader>
      </Card>

      {/* Registration Summary */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2 text-blue-800">
            <IdCard className="w-5 h-5" />
            Vendor Registration Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Full Name</span>
              </div>
              <p className="text-gray-900 font-medium">
                {existingRegistration.firstName} {existingRegistration.lastName}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Store className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Company</span>
              </div>
              <p className="text-gray-900 font-medium">
                {existingRegistration.companyName}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <IdCard className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Vendor ID</span>
              </div>
              <p className="text-gray-900 font-medium font-mono">
                {existingRegistration.vendorId}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Registered</span>
              </div>
              <p className="text-gray-900 font-medium">
                {formatDate(existingRegistration.registrationDate)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={handleFormToggle}
          variant="outline"
          className="flex-1 flex items-center gap-2 border-blue-300 text-blue-700 hover:bg-blue-50"
        >
          <Edit className="w-4 h-4" />
          View Registration Details
        </Button>

        <Button
          onClick={handleNewRegistration}
          variant="outline"
          className="flex-1 flex items-center gap-2 border-purple-300 text-purple-700 hover:bg-purple-50"
        >
          <Plus className="w-4 h-4" />
          New Registration
        </Button>
      </div>

      {/* Quick Navigation */}
      <Card className="border-orange-200 bg-orange-50/50">
        <CardContent className="p-4">
          <div className="text-center space-y-2">
            <p className="text-sm text-orange-700">
              Ready to start earning? Access your vendor dashboard now!
            </p>
            <Button
              onClick={() => window.location.href = '/portal?tab=onecard'}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              Go to Vendor Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExistingVendorSummary;
