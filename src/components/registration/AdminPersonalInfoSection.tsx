
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AdminPersonalInfoProps {
  formData: any;
  errors: any;
  onInputChange: (field: string, value: any) => void;
}

const AdminPersonalInfoSection: React.FC<AdminPersonalInfoProps> = ({
  formData,
  errors,
  onInputChange
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Administrator Information</h3>
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
          />
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Authorized Admin Email *</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={formData.email}
          onChange={(e) => onInputChange('email', e.target.value)}
          className={`font-mono ${errors.email ? 'border-red-500' : 'bg-gray-50'}`}
          placeholder="chipetakevin@gmail.com or admin@myonecard.ai"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        <p className="text-xs text-gray-600">Only pre-approved administrator emails are accepted</p>
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
            placeholder="Auto-filled"
            className={`flex-1 ${errors.phoneNumber ? 'border-red-500' : ''}`}
          />
        </div>
        {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Admin Access Password *</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          value={formData.password}
          onChange={(e) => onInputChange('password', e.target.value)}
          className={`font-mono ${errors.password ? 'border-red-500' : ''}`}
          placeholder="Enter authorized admin password"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        <p className="text-xs text-gray-600">🔐 Required for full admin privileges and system access</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Admin Password *</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          value={formData.confirmPassword}
          onChange={(e) => onInputChange('confirmPassword', e.target.value)}
          className={`font-mono ${errors.confirmPassword ? 'border-red-500' : ''}`}
          placeholder="Confirm admin password"
        />
        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="adminRole">Administrator Role</Label>
        <Input
          id="adminRole"
          value="Super Administrator"
          readOnly
          className="bg-gray-50 font-semibold"
        />
      </div>
    </div>
  );
};

export default AdminPersonalInfoSection;
