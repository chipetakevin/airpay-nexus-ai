
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface CategoryNavigationProps {
  isAdminAuthenticated: boolean;
}

const CategoryNavigation: React.FC<CategoryNavigationProps> = ({ isAdminAuthenticated }) => {
  const navigate = useNavigate();
  const { toast } = useToast();

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

  return (
    <div className="bg-white shadow-sm border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-center items-center py-3">
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
        </div>
      </div>
    </div>
  );
};

export default CategoryNavigation;
