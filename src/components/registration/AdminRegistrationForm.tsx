
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Eye, EyeOff, User, Building, Phone, Mail, MapPin, Shield } from 'lucide-react';
import { useAdminRegistration } from '@/hooks/useAdminRegistration';
import EnhancedSouthAfricanBankAutocomplete from '@/components/banking/EnhancedSouthAfricanBankAutocomplete';

const AdminRegistrationForm = () => {
  const { formData, errors, handleInputChange, handleBankSelect, handleSubmit } = useAdminRegistration();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePhoneChange = (value: string) => {
    let cleanValue = value.replace(/\D/g, '');
    
    if (cleanValue.startsWith('0')) {
      cleanValue = cleanValue.substring(1);
    }
    
    if (cleanValue.length > 9) {
      cleanValue = cleanValue.substring(0, 9);
    }
    
    handleInputChange('phoneNumber', cleanValue);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 p-4">
      <Card className="border-purple-200 bg-purple-50/30">
        <CardHeader className="text-center pb-3">
          <CardTitle className="text-2xl flex items-center justify-center gap-2 text-purple-800">
            <Shield className="w-6 h-6" />
            Administrator Registration
          </CardTitle>
          <p className="text-purple-600">
            Secure admin access for system management
          </p>
        </CardHeader>
      </Card>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <Card className="border-gray-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="w-5 h-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  placeholder="Enter your first name"
                  className={errors.firstName ? 'border-red-500' : ''}
                />
                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  placeholder="Enter your last name"
                  className={errors.lastName ? 'border-red-500' : ''}
                />
                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="admin@example.com"
                  className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Mobile Number *</Label>
              <div className="flex gap-2">
                <Select value={formData.countryCode} onValueChange={(value) => handleInputChange('countryCode', value)}>
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="+27">🇿🇦 +27</SelectItem>
                  </SelectContent>
                </Select>
                <div className="relative flex-1">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    placeholder="812345678"
                    className={`pl-10 ${errors.phoneNumber ? 'border-red-500' : ''}`}
                    maxLength={9}
                  />
                </div>
              </div>
              {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
            </div>
          </CardContent>
        </Card>

        {/* Banking Information */}
        <Card className="border-green-200 bg-green-50/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center justify-between gap-2 text-green-800">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Banking Information
              </div>
              <Badge className="bg-green-100 text-green-700">Auto-Saved</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <EnhancedSouthAfricanBankAutocomplete
              onBankSelect={handleBankSelect}
              error={errors.bankName}
              defaultValue={formData.bankName}
            />

            <div className="space-y-2">
              <Label htmlFor="accountNumber">Account Number</Label>
              <Input
                id="accountNumber"
                value={formData.accountNumber}
                onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                placeholder="Enter account number"
                className={errors.accountNumber ? 'border-red-500' : ''}
              />
              {errors.accountNumber && <p className="text-red-500 text-sm">{errors.accountNumber}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="branchCode">Branch Code</Label>
              <Input
                id="branchCode"
                value={formData.branchCode}
                placeholder="Auto-filled from bank selection"
                readOnly
                className="bg-gray-50"
              />
            </div>
          </CardContent>
        </Card>

        {/* Password Section */}
        <Card className="border-red-200 bg-red-50/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2 text-red-800">
              <Shield className="w-5 h-5" />
              Account Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Admin Password *</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Enter admin password"
                  className={errors.password ? 'border-red-500' : ''}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={togglePasswordVisibility}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password *</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                placeholder="Confirm your password"
                className={errors.confirmPassword ? 'border-red-500' : ''}
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
            </div>
          </CardContent>
        </Card>

        {/* Terms */}
        <Card className="border-gray-200">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="agreeTerms"
                checked={formData.agreeTerms}
                onCheckedChange={(checked) => handleInputChange('agreeTerms', checked)}
                className="mt-1"
              />
              <Label htmlFor="agreeTerms" className="text-sm cursor-pointer">
                I agree to the Administrator Terms and conditions *
              </Label>
            </div>
            {errors.agreeTerms && <p className="text-red-500 text-sm">{errors.agreeTerms}</p>}
          </CardContent>
        </Card>

        {/* Submit Button */}
        <Card className="border-purple-200 bg-purple-50/30">
          <CardContent className="p-4">
            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3"
            >
              <Shield className="w-4 h-4 mr-2" />
              Create Administrator Account
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default AdminRegistrationForm;
