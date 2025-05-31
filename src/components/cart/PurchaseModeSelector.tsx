
import React from 'react';
import { Button } from '@/components/ui/button';
import { User, Gift } from 'lucide-react';

interface PurchaseModeSelectorProps {
  purchaseMode: 'self' | 'other';
  onModeChange: (mode: 'self' | 'other') => void;
}

const PurchaseModeSelector = ({ purchaseMode, onModeChange }: PurchaseModeSelectorProps) => {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-sm">Purchase For</h3>
      <div className="grid grid-cols-2 gap-2">
        <Button
          variant={purchaseMode === 'self' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onModeChange('self')}
          className="flex items-center gap-2"
        >
          <User className="w-4 h-4" />
          Myself
        </Button>
        <Button
          variant={purchaseMode === 'other' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onModeChange('other')}
          className="flex items-center gap-2"
        >
          <Gift className="w-4 h-4" />
          Someone Else
        </Button>
      </div>
    </div>
  );
};

export default PurchaseModeSelector;
