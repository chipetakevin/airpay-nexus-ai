
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useMobileAuth } from '@/hooks/useMobileAuth';

interface CategoryNavigationProps {
  isAdminAuthenticated: boolean;
}

const CategoryNavigation: React.FC<CategoryNavigationProps> = ({ isAdminAuthenticated }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated, currentUser } = useMobileAuth();
  const [showUserInfo, setShowUserInfo] = useState(false);

  const categories = [
    { name: 'Customer', value: 'registration', color: 'text-gray-700' },
    { name: 'Vendor', value: 'vendor', color: 'text-yellow-600' },
    { name: 'OneCard', value: 'onecard', color: 'text-blue-600' },
    { name: 'Admin Reg', value: 'admin-reg', color: 'text-red-600' }
  ];

  const handleCategoryClick = (category: any) => {
    if (isAdminAuthenticated) {
      // Admin has full access - navigate to portal with the specific tab
      navigate(`/portal?tab=${category.value}`);
    } else {
      // Non-admin users are redirected to registration forms
      toast({
        title: "Registration Required",
        description: `Please complete ${category.name} registration to access this section.`,
      });
      navigate(`/portal?tab=${category.value}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userAuthenticated');
    localStorage.removeItem('onecardUser');
    localStorage.removeItem('onecardVendor');
    localStorage.removeItem('onecardAdmin');
    localStorage.removeItem('userCredentials');
    sessionStorage.clear();
    
    toast({
      title: "Logged Out Successfully",
      description: "You have been securely logged out from all accounts.",
    });
    
    // Redirect to home page
    window.location.href = '/';
  };

  return (
    <div className="bg-white shadow-sm border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-3">
          <div className="flex space-x-1 sm:space-x-4 overflow-x-auto">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant="ghost"
                onClick={() => handleCategoryClick(category)}
                className={`px-3 sm:px-6 py-2 text-sm sm:text-base font-medium ${category.color} hover:bg-gray-100 whitespace-nowrap`}
              >
                {category.name}
              </Button>
            ))}
            {isAdminAuthenticated && (
              <Button
                variant="ghost"
                onClick={() => navigate('/portal?tab=admin')}
                className="px-3 sm:px-6 py-2 text-sm sm:text-base font-bold text-red-600 hover:bg-red-50 whitespace-nowrap border-l border-gray-200 ml-2 sm:ml-4"
              >
                Admin Portal
              </Button>
            )}
          </div>

          {/* User Info and Logout */}
          {isAuthenticated && currentUser && (
            <div className="flex items-center gap-2 ml-4">
              <div 
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors"
                onClick={() => setShowUserInfo(!showUserInfo)}
              >
                <User className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-700 hidden sm:inline">
                  {currentUser.firstName || 'User'}
                </span>
              </div>
              
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="border-red-300 text-red-600 hover:bg-red-50 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          )}
        </div>

        {/* User Info Dropdown */}
        {showUserInfo && isAuthenticated && currentUser && (
          <div className="absolute right-4 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50 min-w-64">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium text-gray-600">Name:</span>
                <span className="text-gray-800">{currentUser.firstName} {currentUser.lastName}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium text-gray-600">Email:</span>
                <span className="text-gray-800">{currentUser.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium text-gray-600">Type:</span>
                <span className="text-blue-600 capitalize">{currentUser.userType}</span>
              </div>
              {currentUser.cardNumber && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium text-gray-600">Card:</span>
                  <span className="text-green-600">****{currentUser.cardNumber.slice(-4)}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryNavigation;
