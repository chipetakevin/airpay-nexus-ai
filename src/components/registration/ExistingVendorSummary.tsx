
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Store, User, Calendar, IdCard, Edit, Plus, ChevronDown, ChevronUp } from 'lucide-react';
import { useVendorRegistrationContext } from './VendorRegistrationProvider';

const ExistingVendorSummary: React.FC = () => {
  const { existingRegistration, handleFormToggle, handleNewRegistration } = useVendorRegistrationContext();
  const [isSummaryCollapsed, setIsSummaryCollapsed] = useState(false);

  if (!existingRegistration) return null;

  // Add scroll detection to collapse registration summary when scrolling down
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // If scrolling down and summary is not collapsed, collapse it
      if (currentScrollY > lastScrollY && currentScrollY > 50 && !isSummaryCollapsed) {
        setIsSummaryCollapsed(true);
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isSummaryCollapsed]);

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

      {/* Registration Summary - Full View */}
      {!isSummaryCollapsed && (
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
      )}

      {/* Registration Summary - Collapsed View */}
      {isSummaryCollapsed && (
        <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <IdCard className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-sm font-medium text-blue-800">
                    Vendor Registration Summary
                  </div>
                  <div className="text-xs text-blue-700 mt-0.5">
                    {existingRegistration.firstName} {existingRegistration.lastName} • {existingRegistration.companyName}
                  </div>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setIsSummaryCollapsed(false)}
                className="text-xs text-blue-700 hover:bg-blue-100 flex items-center gap-1"
              >
                <ChevronDown className="w-4 h-4" />
                Show Details
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

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
