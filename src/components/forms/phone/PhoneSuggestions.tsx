
import React from 'react';
import { Button } from '@/components/ui/button';
import { History, Phone } from 'lucide-react';

interface PhoneSuggestionsProps {
  suggestions: any[];
  showSuggestions: boolean;
  onSuggestionSelect: (phone: any) => void;
}

const PhoneSuggestions = ({
  suggestions,
  showSuggestions,
  onSuggestionSelect
}: PhoneSuggestionsProps) => {
  if (!showSuggestions || suggestions.length === 0) return null;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
      <div className="flex items-center gap-2 mb-2">
        <History className="w-4 h-4 text-blue-600" />
        <span className="text-sm font-medium text-blue-800">Recent Numbers</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((phone, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => onSuggestionSelect(phone)}
            className="h-auto p-2 border-blue-300 hover:bg-blue-100"
          >
            <div className="flex items-center gap-2">
              <Phone className="w-3 h-3" />
              <span className="text-xs font-mono">{phone.fullNumber}</span>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default PhoneSuggestions;
