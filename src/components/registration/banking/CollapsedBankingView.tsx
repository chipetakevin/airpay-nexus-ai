
import React from 'react';
import { CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Eye } from 'lucide-react';

interface CollapsedBankingViewProps {
  formData: any;
  onToggle: () => void;
}

const CollapsedBankingView: React.FC<CollapsedBankingViewProps> = ({
  formData,
  onToggle
}) => {
  const accountDisplay = formData.accountNumber ? 
    `****${formData.accountNumber.slice(-3)}` : 
    '****';

  return (
    <CardContent className="pt-0 pb-4">
      <div className="bg-green-50 p-3 rounded-lg border border-green-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
              <Check className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-sm font-medium text-green-800">
                Banking Complete
              </span>
              <p className="text-xs text-green-700 mt-0.5">
                {formData.bankName} • {accountDisplay} • Branch: {formData.branchCode}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="text-green-700 hover:text-green-800 p-1 h-auto"
          >
            <Eye className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </CardContent>
  );
};

export default CollapsedBankingView;
