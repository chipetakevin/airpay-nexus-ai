import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AdminNavDropdownProps {
  onShowAdminBanner: (show: boolean) => void;
  showAdminBanner: boolean;
  isAdminAuthenticated: boolean;
}

const AdminNavDropdown: React.FC<AdminNavDropdownProps> = ({
  onShowAdminBanner,
  showAdminBanner,
  isAdminAuthenticated
}) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!isAdminAuthenticated) return null;

  return (
    <div className="relative">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="relative bg-red-100/80 hover:bg-red-100 border-red-200 text-red-700 rounded-full px-4 py-2 transition-all duration-200 hover:scale-105"
          >
            <Settings className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Nav</span>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent 
          align="end" 
          className="w-56 bg-white border border-gray-200 shadow-lg rounded-lg p-1"
          sideOffset={8}
        >
          <DropdownMenuItem
            onClick={() => onShowAdminBanner(!showAdminBanner)}
            className="flex items-center px-3 py-2 text-sm hover:bg-gray-50 rounded-md cursor-pointer"
          >
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
            {showAdminBanner ? 'Hide Admin Info' : 'Show Admin Info'}
          </DropdownMenuItem>
          
          <DropdownMenuItem className="flex items-center px-3 py-2 text-sm hover:bg-gray-50 rounded-md cursor-pointer">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
            Admin Settings
          </DropdownMenuItem>
          
          <DropdownMenuItem className="flex items-center px-3 py-2 text-sm hover:bg-gray-50 rounded-md cursor-pointer">
            <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
            System Status
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AdminNavDropdown;