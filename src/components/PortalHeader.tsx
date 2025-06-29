
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

type UserType = 'customer' | 'vendor' | 'admin' | null;

interface PortalHeaderProps {
  userType: UserType;
  resetUserType: () => void;
}

const PortalHeader = ({ userType, resetUserType }: PortalHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <Link to="/">
        <Button variant="ghost" className="text-white hover:bg-white/20 p-1 text-xs">
          <ArrowLeft className="w-4 h-4 mr-1" />
          <span className="hidden sm:inline text-xs">Back</span>
        </Button>
      </Link>
      
      <div className="text-center text-white">
        <h1 className="text-lg sm:text-2xl font-bold text-shadow">Divinely Mobile Portal</h1>
        <p className="text-xs sm:text-sm opacity-90 hidden sm:block">OneCard Rewards Platform</p>
        {userType && userType !== 'admin' && (
          <Button 
            onClick={resetUserType}
            variant="ghost" 
            className="mt-1 text-white hover:bg-white/20 text-xs p-1"
          >
            Change Type
          </Button>
        )}
      </div>
      
      <div className="w-16"></div>
    </div>
  );
};

export default PortalHeader;
