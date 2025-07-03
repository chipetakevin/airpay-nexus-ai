import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, AlertCircle, XCircle } from 'lucide-react';
import { useRICAAutoSave } from '@/hooks/useRICAAutoSave';

interface RICAStatusCheckerProps {
  showInline?: boolean;
  className?: string;
}

const RICAStatusChecker: React.FC<RICAStatusCheckerProps> = ({ 
  showInline = false, 
  className = '' 
}) => {
  const { existingRegistration } = useRICAAutoSave();

  if (!existingRegistration) {
    return showInline ? (
      <Badge variant="destructive" className={`${className} text-xs`}>
        <AlertCircle className="w-3 h-3 mr-1" />
        RICA Required
      </Badge>
    ) : null;
  }

  const getStatusDisplay = () => {
    switch (existingRegistration.registration_status) {
      case 'approved':
        return {
          icon: <CheckCircle className="w-3 h-3" />,
          label: 'RICA Verified',
          variant: 'default' as const,
          className: 'bg-green-100 text-green-800 border-green-200'
        };
      case 'processing':
        return {
          icon: <Clock className="w-3 h-3" />,
          label: 'RICA Processing',
          variant: 'secondary' as const,
          className: 'bg-blue-100 text-blue-800 border-blue-200'
        };
      case 'pending':
        return {
          icon: <AlertCircle className="w-3 h-3" />,
          label: 'RICA Submitted',
          variant: 'outline' as const,
          className: 'bg-amber-100 text-amber-800 border-amber-200'
        };
      case 'rejected':
        return {
          icon: <XCircle className="w-3 h-3" />,
          label: 'RICA Rejected',
          variant: 'destructive' as const,
          className: 'bg-red-100 text-red-800 border-red-200'
        };
      default:
        return {
          icon: <AlertCircle className="w-3 h-3" />,
          label: 'RICA Status Unknown',
          variant: 'outline' as const,
          className: 'bg-gray-100 text-gray-800 border-gray-200'
        };
    }
  };

  const status = getStatusDisplay();

  return (
    <Badge 
      variant={status.variant} 
      className={`${className} ${status.className} text-xs flex items-center gap-1`}
    >
      {status.icon}
      {status.label}
    </Badge>
  );
};

export default RICAStatusChecker;