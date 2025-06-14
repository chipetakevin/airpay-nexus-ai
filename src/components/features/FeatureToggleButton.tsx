
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FeatureToggleButtonProps {
  isOpen: boolean;
  onToggle: () => void;
}

const FeatureToggleButton: React.FC<FeatureToggleButtonProps> = ({ isOpen, onToggle }) => {
  return (
    <div className="text-center mb-8">
      <Button 
        onClick={onToggle}
        variant="outline" 
        className="bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white/90 hover:border-blue-300 transition-all duration-300 px-6 py-3 text-base font-semibold"
      >
        <span className="mr-2">
          {isOpen ? "Hide Features" : "View Features"}
        </span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5" />
        ) : (
          <ChevronDown className="w-5 h-5" />
        )}
      </Button>
    </div>
  );
};

export default FeatureToggleButton;
