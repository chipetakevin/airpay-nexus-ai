
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
    <div className="flex items-center justify-between mb-2 sm:mb-4">
      <Link to="/">
        <Button variant="ghost" className="text-white hover:bg-white/20 p-2">
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span className="hidden sm:inline">Back to Dashboard</span>
          <span className="sm:hidden">Back</span>
        </Button>
      </Link>
      
      <div className="text-center text-white">
        <h1 className="text-2xl sm:text-4xl font-bold mb-2 text-shadow">AirPay Portal</h1>
        <p className="text-sm sm:text-xl opacity-90 hidden sm:block">Digital Airtime & Data Platform with OneCard Rewards</p>
        {userType && userType !== 'admin' && (
          <Button 
            onClick={resetUserType}
            variant="ghost" 
            className="mt-2 text-white hover:bg-white/20 text-xs"
          >
            Change Registration Type
          </Button>
        )}
      </div>
      
      <div className="w-20"></div>
    </div>
  );
};

export default PortalHeader;
