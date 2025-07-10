
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Home } from 'lucide-react';
import SessionIndicator from '../auth/SessionIndicator';

interface PortalLogoProps {
  isUnifiedProfile: boolean;
}

const PortalLogo = ({ isUnifiedProfile }: PortalLogoProps) => {
  return (
    <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 min-w-0">
      <div className="flex items-center gap-2 sm:gap-3">
        <img 
          src="/lovable-uploads/788fddcb-574c-4f1d-9c73-54cc003a95d1.png" 
          alt="Divine Mobile Logo"
          className="h-10 sm:h-12 w-10 sm:w-12 object-contain flex-shrink-0"
        />
        <div className="flex flex-col min-w-0">
          {isUnifiedProfile && (
            <Badge className="bg-white text-[#75B8FA] text-xs px-2 py-1 rounded-full flex items-center justify-center mb-1 whitespace-nowrap">
              <span className="mr-1">🌟</span>
              <span className="font-medium">Unified</span>
            </Badge>
          )}
          <div className="hidden sm:block">
            <SessionIndicator />
          </div>
        </div>
      </div>

      {/* Enhanced Home Button */}
      <Link to="/">
        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group">
          <img 
            src="/lovable-uploads/788fddcb-574c-4f1d-9c73-54cc003a95d1.png" 
            alt="Divine Mobile Home"
            className="w-7 h-7 sm:w-8 sm:h-8 object-contain group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      </Link>
    </div>
  );
};

export default PortalLogo;
