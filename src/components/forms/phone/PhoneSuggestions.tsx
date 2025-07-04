
import React from 'react';
import { Button } from '@/components/ui/button';
import { History, Phone, Clock } from 'lucide-react';

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

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const past = new Date(timestamp);
    const diffMs = now.getTime() - past.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffDays > 0) return `${diffDays}d ago`;
    if (diffHours > 0) return `${diffHours}h ago`;
    return 'Recent';
  };

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 animate-fade-in">
      <div className="flex items-center gap-2 mb-3">
        <History className="w-4 h-4 text-blue-600" />
        <span className="text-sm font-medium text-blue-800">Recent Numbers</span>
        <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
          Tap to fill
        </span>
      </div>
      
      <div className="space-y-2">
        {suggestions.slice(0, 3).map((phone, index) => {
          const displayNumber = phone.fullNumber || `+27${phone.phoneNumber || phone.number}`;
          const shortNumber = phone.phoneNumber || phone.number || '';
          
          return (
            <Button
              key={index}
              variant="outline"
              onClick={() => onSuggestionSelect(phone)}
              className="w-full h-auto p-3 border-blue-300 hover:bg-blue-100 hover:border-blue-400 transition-all duration-200 justify-start group"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <Phone className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-mono text-sm font-medium text-gray-900">
                      {displayNumber}
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {phone.timestamp ? formatTimeAgo(phone.timestamp) : 'Saved'}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-blue-600 opacity-75 group-hover:opacity-100">
                  Select →
                </div>
              </div>
            </Button>
          );
        })}
      </div>
      
      {suggestions.length > 3 && (
        <div className="mt-2 text-center">
          <span className="text-xs text-blue-600">
            +{suggestions.length - 3} more saved numbers
          </span>
        </div>
      )}
    </div>
  );
};

export default PhoneSuggestions;
