
import React from 'react';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, ChevronDown, ChevronUp } from 'lucide-react';
import BankingStatusIndicator from './BankingStatusIndicator';

interface BankingCardHeaderProps {
  isAutoSaving: boolean;
  isBankingComplete: boolean;
  lastSaved: Date | null;
  isCollapsed: boolean;
  onManualToggle: () => void;
}

const BankingCardHeader: React.FC<BankingCardHeaderProps> = ({
  isAutoSaving,
  isBankingComplete,
  lastSaved,
  isCollapsed,
  onManualToggle
}) => {
  return (
    <CardHeader className="pb-3">
      <CardTitle className="text-base sm:text-lg flex items-center justify-between gap-2 text-yellow-800">
        <div className="flex items-center gap-2">
          <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
          Business Banking Information (Auto-Saved)
        </div>
        <div className="flex items-center gap-2">
          <BankingStatusIndicator
            isAutoSaving={isAutoSaving}
            isBankingComplete={isBankingComplete}
            lastSaved={lastSaved}
          />
          
          {isBankingComplete && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onManualToggle}
              className="p-1 h-auto text-yellow-700 hover:text-yellow-800"
            >
              {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </Button>
          )}
        </div>
      </CardTitle>
    </CardHeader>
  );
};

export default BankingCardHeader;
