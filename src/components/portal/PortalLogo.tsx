
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
          src="/lovable-uploads/5ef6be83-8590-459d-942d-7a0539064226.png" 
          alt="Divine Mobile Crown Logo"
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
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 h-8 sm:h-9 border-white bg-white text-[#75B8FA] hover:bg-white/90 transition-all duration-200 font-medium"
        >
          <Home className="w-4 h-4" />
          <span className="hidden sm:inline font-medium">Home</span>
        </Button>
      </Link>
    </div>
  );
};

export default PortalLogo;
