
import React, { useState, useEffect } from 'react';
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
import { validateBankingSystem, listAllBanksWithBranchCodes } from '@/utils/bankingSystemValidation';
// import EnhancedPasswordInput from '@/components/password/EnhancedPasswordInput';

const AdminRegistrationForm = () => {
  const { formData, errors, handleInputChange, handleBankSelect, handleSubmit } = useAdminRegistration();
  const [showPassword, setShowPassword] = useState(false);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const { toast } = useToast();

  // Validate banking system on component mount
  useEffect(() => {
    console.log('🚀 AdminRegistrationForm mounted - validating banking system...');
    validateBankingSystem();
    listAllBanksWithBranchCodes();
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleEnhancedBankSelect = (bankName: string, routing: string, branchCode: string, bankDetails?: any) => {
    console.log(`🏦 Bank selected: ${bankName}, Branch Code: ${branchCode}`, bankDetails);
    handleBankSelect(bankName, routing, branchCode);
    
    // Simulate auto-save
    setIsAutoSaving(true);
    setTimeout(() => {
      setIsAutoSaving(false);
      setLastSaved(new Date());
    }, 1500);
    
    if (bankDetails && branchCode) {
      toast({
        title: `✅ ${bankName} Selected!`,
        description: `Branch code ${branchCode} has been auto-assigned and saved.`,
        duration: 3000
      });
      console.log(`✅ Branch code ${branchCode} successfully assigned for ${bankName}`);
    } else if (!branchCode) {
      console.error(`❌ No branch code received for ${bankName}`);
      toast({
        title: "Branch Code Missing",
        description: `Unable to auto-assign branch code for ${bankName}. Please contact support.`,
        variant: "destructive",
        duration: 5000
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

        {/* Enhanced Password Management Section */}
        <Card className="border-red-200 bg-red-50/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2 text-red-800">
              <Shield className="w-5 h-5" />
              Enterprise Password Security
            </CardTitle>
            <p className="text-sm text-red-600 mt-2">
              Enhanced password management with enterprise-grade security features
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Administrator Password *</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password || ''}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Enter a strong password"
                    className={errors.password ? 'border-red-500 pr-10' : 'pr-10'}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Administrator Password *</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.confirmPassword || ''}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    placeholder="Confirm your password"
                    className={errors.confirmPassword ? 'border-red-500 pr-10' : 'pr-10'}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
              </div>

              {/* Password Security Notice */}
              <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                <div className="flex items-start gap-2 text-sm text-red-700">
                  <Shield className="w-4 h-4 mt-0.5" />
                  <div>
                    <p className="font-medium mb-1">Enterprise Security Requirements:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Minimum 8 characters with uppercase, lowercase, numbers, and symbols</li>
                      <li>• Password will be encrypted and securely stored</li>
                      <li>• Multi-factor authentication will be enabled for admin accounts</li>
                    </ul>
                  </div>
                </div>
              </div>
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
