
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

interface VendorPersonalInfoProps {
  formData: any;
  errors: any;
  onInputChange: (field: string, value: any) => void;
}

const VendorPersonalInfoSection: React.FC<VendorPersonalInfoProps> = ({
  formData,
  errors,
  onInputChange
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
    </div>
  );
};

export default VendorPersonalInfoSection;
