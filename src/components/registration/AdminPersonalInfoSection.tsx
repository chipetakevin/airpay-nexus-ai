
import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertTriangle, Check } from 'lucide-react';
import { usePhoneValidation } from '@/hooks/usePhoneValidation';
import { useBranchCodeAutoAssign } from '@/hooks/useBranchCodeAutoAssign';
import { useToast } from '@/hooks/use-toast';

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
  const [isValidPhone, setIsValidPhone] = useState(false);
  const { validateSouthAfricanMobile } = usePhoneValidation();
  const { loadSavedBankingInfo } = useBranchCodeAutoAssign();
  const { toast } = useToast();

  // Auto-restore saved info on mount
  useEffect(() => {
    const savedInfo = loadSavedBankingInfo();
    if (savedInfo && savedInfo.bankName && !formData.bankName) {
      onInputChange('bankName', savedInfo.bankName);
      onInputChange('branchCode', savedInfo.branchCode);
      
      toast({
        title: "Admin Banking Auto-Restored! 🏦",
        description: "Your saved banking information has been restored.",
      });
    }
  }, [loadSavedBankingInfo, onInputChange, formData.bankName, toast]);

  // Validate phone number with South African standards
  useEffect(() => {
    if (formData.phoneNumber) {
      const validation = validateSouthAfricanMobile(formData.phoneNumber);
      setIsValidPhone(validation.isValid);
    } else {
      setIsValidPhone(false);
    }
  }, [formData.phoneNumber, validateSouthAfricanMobile]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    
    // Allow only digits, plus, and spaces for better UX
    value = value.replace(/[^\d+\s]/g, '');
    
    // Clean to only digits for validation
    const digitsOnly = value.replace(/\D/g, '');
    
    // Intelligently prevent invalid patterns
    if (digitsOnly.length > 0) {
      // First digit cannot be 0
      if (digitsOnly[0] === '0') {
        return; // Silently ignore
      }
      
      // Second digit cannot be 0
      if (digitsOnly.length > 1 && digitsOnly[1] === '0') {
        return; // Silently ignore
      }
    }
    
    onInputChange('phoneNumber', value);
  };

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
        <Label htmlFor="phoneNumber">South African Mobile Number *</Label>
        <div className="flex space-x-2">
          <Input
            value={formData.countryCode}
            className="w-20"
            readOnly
          />
          <div className="relative flex-1">
            <Input
              id="phoneNumber"
              name="phoneNumber"
              autoComplete="tel"
              value={formData.phoneNumber}
              onChange={handlePhoneChange}
              placeholder="832466539 (9 digits)"
              className={`${errors.phoneNumber ? 'border-red-500' : isValidPhone ? 'border-green-500' : ''} pr-10`}
              maxLength={15}
            />
            {isValidPhone && (
              <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
            )}
            {errors.phoneNumber && (
              <AlertTriangle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-red-500" />
            )}
          </div>
        </div>
        {errors.phoneNumber && (
          <p className="text-red-500 text-sm flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" />
            {errors.phoneNumber}
          </p>
        )}
        <div className="bg-blue-50 p-2 rounded border border-blue-200">
          <p className="text-xs text-blue-600">
            <strong>📱 Valid formats:</strong> 832466539, 0832466539, or +27832466539
          </p>
        </div>
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
