
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, UserPlus, AlertTriangle } from 'lucide-react';
import { useRegistrationGuard } from '@/hooks/useRegistrationGuard';
import { useNavigate } from 'react-router-dom';

interface RegistrationGateProps {
  children: React.ReactNode;
  allowedPaths?: string[];
  requireBankingInfo?: boolean;
  serviceName?: string;
}

const RegistrationGate = ({ 
  children, 
  allowedPaths = [], 
  requireBankingInfo = false,
  serviceName = "this service"
}: RegistrationGateProps) => {
  const { isRegistered, userProfile, isChecking, requireRegistration } = useRegistrationGuard();
  const navigate = useNavigate();

  if (isChecking) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-600">Verifying registration status...</span>
        </div>
      </div>
    );
  }

  // Check if banking info is required but missing
  const needsBankingInfo = requireBankingInfo && (!userProfile?.bankName || !userProfile?.accountNumber);

  if (!isRegistered || needsBankingInfo) {
    return (
      <Card className="mx-auto max-w-md border-red-200 bg-red-50">
        <CardContent className="p-6 text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-red-600" />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-red-800 mb-2">
              Registration Required
            </h3>
            <p className="text-red-700 text-sm">
              {!isRegistered ? (
                <>You must complete your registration to access {serviceName}. Your profile will be permanently saved for future use.</>
              ) : (
                <>Complete banking information is required to access {serviceName}.</>
              )}
            </p>
          </div>

          {userProfile && (
            <div className="bg-white p-3 rounded-lg border border-red-200">
              <div className="text-xs text-gray-600 space-y-1">
                <div className="flex justify-between">
                  <span>Name:</span>
                  <span className={userProfile.firstName ? 'text-green-600' : 'text-red-600'}>
                    {userProfile.firstName ? '✓ Complete' : '✗ Missing'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Email:</span>
                  <span className={userProfile.email ? 'text-green-600' : 'text-red-600'}>
                    {userProfile.email ? '✓ Complete' : '✗ Missing'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Phone:</span>
                  <span className={userProfile.phoneNumber ? 'text-green-600' : 'text-red-600'}>
                    {userProfile.phoneNumber ? '✓ Complete' : '✗ Missing'}
                  </span>
                </div>
                {requireBankingInfo && (
                  <div className="flex justify-between">
                    <span>Banking:</span>
                    <span className={userProfile.bankName && userProfile.accountNumber ? 'text-green-600' : 'text-red-600'}>
                      {userProfile.bankName && userProfile.accountNumber ? '✓ Complete' : '✗ Missing'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Button
              onClick={() => navigate('/portal?tab=registration')}
              className="w-full bg-red-600 hover:bg-red-700"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Complete Registration
            </Button>
            
            <p className="text-xs text-red-600 flex items-center justify-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              Profile information is permanently saved for your convenience
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return <>{children}</>;
};

export default RegistrationGate;
