
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Lock, ChevronDown, ChevronUp } from 'lucide-react';

interface VendorPasswordSectionProps {
  formData: any;
  errors: any;
  onInputChange: (field: string, value: any) => void;
  showPassword: boolean;
  togglePasswordVisibility: () => void;
}

const VendorPasswordSection: React.FC<VendorPasswordSectionProps> = ({
  formData,
  errors,
  onInputChange,
  showPassword,
  togglePasswordVisibility
}) => {
  const [showRequirements, setShowRequirements] = useState(false);

  const toggleRequirements = () => {
    setShowRequirements(!showRequirements);
  };

  return (
    <div className="space-y-4 border-t pt-4">
      <h4 className="text-md font-medium text-gray-700">Security & Password</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="password">Password *</Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              value={formData.password}
              onChange={(e) => onInputChange('password', e.target.value)}
              className={errors.password ? 'border-red-500' : ''}
              placeholder="Enter secure password"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password *</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={(e) => onInputChange('confirmPassword', e.target.value)}
              className={errors.confirmPassword ? 'border-red-500' : ''}
              placeholder="Confirm your password"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
        </div>
      </div>

      {/* Collapsible Password Requirements */}
      <div className="space-y-2">
        <Button
          type="button"
          onClick={toggleRequirements}
          variant="outline"
          className="w-full flex items-center justify-between p-3 h-auto border-blue-200 bg-blue-50/50 hover:bg-blue-50"
        >
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Password Requirements</span>
          </div>
          {showRequirements ? (
            <ChevronUp className="w-4 h-4 text-blue-600" />
          ) : (
            <ChevronDown className="w-4 h-4 text-blue-600" />
          )}
        </Button>

        {showRequirements && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 animate-in slide-in-from-top-2 duration-200">
            <div className="text-sm text-blue-700">
              <strong>🔐 Password Requirements:</strong>
              <ul className="mt-1 space-y-1 text-xs">
                <li>• Minimum 8 characters long</li>
                <li>• At least one uppercase letter</li>
                <li>• At least one lowercase letter</li>
                <li>• At least one number</li>
                <li>• Use unified password (Malawi@1976) for admin access</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorPasswordSection;
