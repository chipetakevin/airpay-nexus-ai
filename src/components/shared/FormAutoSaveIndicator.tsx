import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Save, Clock, AlertCircle } from 'lucide-react';

interface FormAutoSaveIndicatorProps {
  isAutoSaving: boolean;
  lastSaved: Date | null;
  formType: string;
  className?: string;
}

const FormAutoSaveIndicator: React.FC<FormAutoSaveIndicatorProps> = ({
  isAutoSaving,
  lastSaved,
  formType,
  className = ""
}) => {
  const [timeAgo, setTimeAgo] = useState<string>('');

  useEffect(() => {
    if (!lastSaved) return;

    const updateTimeAgo = () => {
      const now = new Date();
      const diffInMinutes = Math.floor((now.getTime() - lastSaved.getTime()) / 60000);
      
      if (diffInMinutes < 1) {
        setTimeAgo('just now');
      } else if (diffInMinutes < 60) {
        setTimeAgo(`${diffInMinutes}m ago`);
      } else {
        const diffInHours = Math.floor(diffInMinutes / 60);
        setTimeAgo(`${diffInHours}h ago`);
      }
    };

    updateTimeAgo();
    const interval = setInterval(updateTimeAgo, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [lastSaved]);

  if (isAutoSaving) {
    return (
      <Badge variant="outline" className={`bg-blue-50 text-blue-700 border-blue-300 animate-pulse ${className}`}>
        <Save className="w-3 h-3 mr-1 animate-spin" />
        Auto-saving {formType}...
      </Badge>
    );
  }

  if (lastSaved) {
    return (
      <Badge variant="outline" className={`bg-green-50 text-green-700 border-green-300 ${className}`}>
        <CheckCircle className="w-3 h-3 mr-1" />
        Saved {timeAgo}
      </Badge>
    );
  }

  return (
    <Badge variant="outline" className={`bg-gray-50 text-gray-600 border-gray-300 ${className}`}>
      <Clock className="w-3 h-3 mr-1" />
      Start typing to auto-save
    </Badge>
  );
};

export default FormAutoSaveIndicator;