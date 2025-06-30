
import React from 'react';
import { Button } from '@/components/ui/button';
import { History } from 'lucide-react';

interface SavedPhoneNumbersProps {
  savedPhoneNumbers: string[];
  showSavedNumbers: boolean;
  onToggleShow: () => void;
  onSelectNumber: (number: string) => void;
  formatPhoneForDisplay: (number: string) => string;
}

const SavedPhoneNumbers: React.FC<SavedPhoneNumbersProps> = ({
  savedPhoneNumbers,
  showSavedNumbers,
  onToggleShow,
  onSelectNumber,
  formatPhoneForDisplay
}) => {
  if (savedPhoneNumbers.length === 0) return null;

  return (
    <div className="relative">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={onToggleShow}
        className="mb-2 text-xs sm:text-sm w-full sm:w-auto"
      >
        <History className="w-3 h-3 mr-1" />
        Saved Numbers ({savedPhoneNumbers.length})
      </Button>
      
      {showSavedNumbers && (
        <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-32 overflow-y-auto">
          {savedPhoneNumbers.map((number, index) => (
            <button
              key={index}
              type="button"
              className="w-full text-left px-3 py-2 hover:bg-gray-100 text-sm border-b last:border-b-0 transition-colors"
              onClick={() => onSelectNumber(number)}
            >
              {formatPhoneForDisplay(number)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedPhoneNumbers;
