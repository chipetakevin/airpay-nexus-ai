
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Eye, EyeOff } from 'lucide-react';

interface VendorPersonalInfoProps {
  formData: any;
  errors: any;
  onInputChange: (field: string, value: any) => void;
  showPassword: boolean;
  togglePasswordVisibility: () => void;
}

const VendorPersonalInfoSection: React.FC<VendorPersonalInfoProps> = ({
  formData,
  errors,
  onInputChange,
  showPassword,
  togglePasswordVisibility
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Personal Information</h3>
        <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-300">
          Auto-Save Active
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            name="firstName"
            autoComplete="given-name"
            value={formData.firstName}
            onChange={(e) => onInputChange('firstName', e.target.value)}
            className={errors.firstName ? 'border-red-500' : ''}
            placeholder="Auto-filled from profile"
          />
          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            name="lastName"
            autoComplete="family-name"
            value={formData.lastName}
            onChange={(e) => onInputChange('lastName', e.target.value)}
            className={errors.lastName ? 'border-red-500' : ''}
            placeholder="Auto-filled from profile"
          />
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address *</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={formData.email}
          onChange={(e) => onInputChange('email', e.target.value)}
          className={errors.email ? 'border-red-500' : ''}
          placeholder="Auto-filled from saved credentials"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        <p className="text-xs text-gray-600">📧 Used for password reset via OTP</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phoneNumber">Phone Number *</Label>
        <div className="flex space-x-2">
          <Input
            value={formData.countryCode}
            className="w-20"
            readOnly
          />
          <Input
            id="phoneNumber"
            name="phoneNumber"
            autoComplete="tel"
            value={formData.phoneNumber}
            onChange={(e) => onInputChange('phoneNumber', e.target.value)}
            placeholder="Auto-filled from profile"
            className={`flex-1 ${errors.phoneNumber ? 'border-red-500' : ''}`}
          />
        </div>
        {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
      </div>

      {/* Password Section */}
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

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
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
      </div>
    </div>
  );
};

export default VendorPersonalInfoSection;
