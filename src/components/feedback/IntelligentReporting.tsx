
import React from 'react';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface ReportData {
  type: 'success' | 'warning' | 'error';
  message: string;
  redirectPath?: string;
  actionLabel?: string;
}

interface IntelligentReportingProps {
  report: ReportData;
  onClose: () => void;
}

const IntelligentReporting: React.FC<IntelligentReportingProps> = ({ report, onClose }) => {
  const navigate = useNavigate();

  const handleAction = () => {
    if (report.redirectPath) {
      navigate(report.redirectPath);
    }
    onClose();
  };

  const getIcon = () => {
    switch (report.type) {
      case 'success':
        return <CheckCircle className="w-6 h-6 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="w-6 h-6 text-yellow-600" />;
      case 'error':
        return <XCircle className="w-6 h-6 text-red-600" />;
    }
  };

  const getCardStyle = () => {
    switch (report.type) {
      case 'success':
        return 'border-green-200 bg-green-50';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50';
      case 'error':
        return 'border-red-200 bg-red-50';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className={`max-w-md w-full ${getCardStyle()}`}>
        <CardContent className="p-6 text-center space-y-4">
          <div className="flex justify-center">
            {getIcon()}
          </div>
          
          <p className="text-sm text-gray-700">{report.message}</p>
          
          <div className="flex gap-2 justify-center">
            {report.redirectPath && (
              <Button
                onClick={handleAction}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {report.actionLabel || 'Fix Issue'}
              </Button>
            )}
            <Button
              onClick={onClose}
              variant="outline"
            >
              Close
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntelligentReporting;
