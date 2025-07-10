
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
  const { isRegistered, userProfile, isChecking } = useRegistrationGuard();
  const navigate = useNavigate();

  // Check if banking info is required but missing
  const needsBankingInfo = requireBankingInfo && (!userProfile?.bankName || !userProfile?.accountNumber);

  // Silent redirect without showing error messages
  React.useEffect(() => {
    if (!isChecking && (!isRegistered || needsBankingInfo)) {
      navigate('/registration');
    }
  }, [isChecking, isRegistered, needsBankingInfo, navigate]);

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

  // If not registered or missing banking info, don't render children (redirect is happening)
  if (!isRegistered || needsBankingInfo) {
    return null;
  }

  return <>{children}</>;
};

export default RegistrationGate;
