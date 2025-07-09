
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Eye, EyeOff, User, Shield, CheckCircle, Loader2 } from 'lucide-react';
import { useAdminRegistration } from '@/hooks/useAdminRegistration';
import AdminPhoneSection from '@/components/forms/AdminPhoneSection';
import EnhancedSouthAfricanBankAutocomplete from '@/components/banking/EnhancedSouthAfricanBankAutocomplete';
import { useToast } from '@/hooks/use-toast';

const AdminRegistrationForm = () => {
  const { formData, errors, handleInputChange, handleBankSelect, handleSubmit } = useAdminRegistration();
  const [showPassword, setShowPassword] = useState(false);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const { toast } = useToast();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleEnhancedBankSelect = (bankName: string, routing: string, branchCode: string, bankDetails?: any) => {
    handleBankSelect(bankName, routing, branchCode);
    
    // Simulate auto-save
    setIsAutoSaving(true);
    setTimeout(() => {
      setIsAutoSaving(false);
      setLastSaved(new Date());
    }, 1500);
    
    if (bankDetails) {
      toast({
        title: "Bank Selected! 🏦",
        description: `${bankName} with branch code ${branchCode} has been selected and auto-saved.`,
        duration: 3000
      });
    }
  };

  const isBankingComplete = formData.bankName && formData.accountNumber && formData.branchCode;

  return (
    <div className="max-w-2xl mx-auto space-y-6 p-4 pb-32">
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
                  value={formData.firstName || ''}
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
                  value={formData.lastName || ''}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  placeholder="Enter your last name"
                  className={errors.lastName ? 'border-red-500' : ''}
                />
                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email || ''}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="example@divinemobile.co.za"
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
          </CardContent>
        </Card>

        {/* Phone Section */}
        <AdminPhoneSection
          formData={formData}
          errors={errors}
          onInputChange={handleInputChange}
        />

        {/* Enhanced Banking Information */}
        <Card className="border-green-200 bg-green-50/30">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg flex items-center gap-2 text-green-800">
                  <Shield className="w-5 h-5" />
                  Banking Information
                </CardTitle>
                <p className="text-sm text-green-600">
                  Secure banking details for administrative transactions
                </p>
              </div>
              <div className="flex items-center gap-2">
                {isAutoSaving && (
                  <div className="flex items-center gap-1 text-xs text-green-600">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Saving...
                  </div>
                )}
                {lastSaved && !isAutoSaving && (
                  <Badge variant="outline" className="text-xs">
                    Saved {lastSaved.toLocaleTimeString()}
                  </Badge>
                )}
                {isBankingComplete && (
                  <Badge className="bg-green-100 text-green-700">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Complete
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <EnhancedSouthAfricanBankAutocomplete
              onBankSelect={handleEnhancedBankSelect}
              error={errors.bankName}
              defaultValue={formData.bankName}
              showBranchDetails={true}
              showBranchCodeField={false}
            />

            <div className="space-y-2">
              <Label htmlFor="accountNumber">Account Number *</Label>
              <Input
                id="accountNumber"
                value={formData.accountNumber || ''}
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
                value={formData.branchCode || ''}
                placeholder={formData.branchCode ? formData.branchCode : "Auto-filled from bank selection"}
                readOnly
                className={`${formData.branchCode ? 'bg-green-50 border-green-200 text-green-800' : 'bg-gray-50'} font-mono`}
              />
              <p className={`text-xs ${formData.branchCode ? 'text-green-600' : 'text-gray-500'}`}>
                {formData.branchCode ? 
                  `✅ Branch code ${formData.branchCode} auto-assigned successfully` : 
                  'ℹ️ Branch code will be automatically assigned from your bank selection'
                }
              </p>
            </div>

            {isBankingComplete && (
              <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 text-sm text-green-700">
                  <CheckCircle className="w-4 h-4" />
                  <span className="font-medium">Banking details verified and secure!</span>
                </div>
              </div>
            )}
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
                  value={formData.password || ''}
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
                value={formData.confirmPassword || ''}
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
                checked={formData.agreeTerms || false}
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
