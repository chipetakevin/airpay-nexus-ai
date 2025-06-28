
import React from 'react';
import { Check, Save } from 'lucide-react';

interface BankingStatusIndicatorProps {
  isAutoSaving: boolean;
  isBankingComplete: boolean;
  lastSaved: Date | null;
}

const BankingStatusIndicator: React.FC<BankingStatusIndicatorProps> = ({
  isAutoSaving,
  isBankingComplete,
  lastSaved
}) => {
  if (isAutoSaving) {
    return (
      <div className="flex items-center gap-1 text-xs text-blue-600">
        <div className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        Saving...
      </div>
    );
  }

  if (isBankingComplete) {
    return (
      <div className="flex items-center gap-1 text-xs text-green-600">
        <Check className="w-3 h-3" />
        Complete
      </div>
    );
  }

  if (lastSaved) {
    return (
      <div className="flex items-center gap-1 text-xs text-orange-600">
        <Save className="w-3 h-3" />
        Saved
      </div>
    );
  }

  return null;
};

export default BankingStatusIndicator;
