
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Eye, EyeOff, User, Building, Phone, Mail, MapPin, Shield } from 'lucide-react';
import VendorBankingSection from './VendorBankingSection';
import EnhancedSouthAfricanBankAutocomplete from '@/components/banking/EnhancedSouthAfricanBankAutocomplete';
import UniversalCardDetailsForm from '@/components/banking/UniversalCardDetailsForm';
import { useToast } from '@/hooks/use-toast';

interface VendorRegistrationFormProps {
  formData: any;
  errors: any;
  showPassword: boolean;
  togglePasswordVisibility: () => void;
  handleInputChange: (field: string, value: any) => void;
  handleBankSelect: (bankName: string, routing: string, branchCode: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  location: string;
  setLocation: (location: string) => void;
}

const VendorRegistrationForm: React.FC<VendorRegistrationFormProps> = ({
  formData,
  errors,
  showPassword,
  togglePasswordVisibility,
  handleInputChange,
  handleBankSelect,
  onSubmit,
  location,
  setLocation
}) => {
  const { toast } = useToast();
  const [showCardSection, setShowCardSection] = useState(false);

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

  const handleEnhancedBankSelect = (bankName: string, routing: string, branchCode: string, bankDetails?: any) => {
    handleBankSelect(bankName, routing, branchCode);
    
    if (bankDetails) {
      toast({
        title: "Bank Selected! 🏦",
        description: `${bankName} with branch code ${branchCode} has been selected and will be auto-saved.`,
        duration: 3000
      });
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Personal Information */}
      <Card className="border-purple-200 bg-purple-50/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-purple-800">
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
                placeholder="your.email@example.com"
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

      {/* Business Information */}
      <Card className="border-orange-200 bg-orange-50/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-orange-800">
            <Building className="w-5 h-5" />
            Business Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="companyName">Company/Business Name *</Label>
            <Input
              id="companyName"
              value={formData.companyName}
              onChange={(e) => handleInputChange('companyName', e.target.value)}
              placeholder="Enter your business name"
              className={errors.companyName ? 'border-red-500' : ''}
            />
            {errors.companyName && <p className="text-red-500 text-sm">{errors.companyName}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="businessType">Business Type</Label>
            <Select value={formData.businessType} onValueChange={(value) => handleInputChange('businessType', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select business type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="retail">Retail Store</SelectItem>
                <SelectItem value="mobile">Mobile Shop</SelectItem>
                <SelectItem value="service">Service Provider</SelectItem>
                <SelectItem value="restaurant">Restaurant/Food</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Business Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, Province, South Africa"
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Banking Information */}
      <Card className="border-green-200 bg-green-50/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center justify-between gap-2 text-green-800">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Business Banking Information
            </div>
            <Badge className="bg-green-100 text-green-700">Auto-Saved</Badge>
          </CardTitle>
          <p className="text-sm text-green-600">
            Add your business banking details for commission payments and transactions
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <EnhancedSouthAfricanBankAutocomplete
            onBankSelect={handleEnhancedBankSelect}
            error={errors.bankName}
            defaultValue={formData.bankName}
            showBranchDetails={true}
          />

          <div className="space-y-2">
            <Label htmlFor="accountNumber">Business Account Number *</Label>
            <Input
              id="accountNumber"
              value={formData.accountNumber}
              onChange={(e) => handleInputChange('accountNumber', e.target.value)}
              placeholder="Enter business account number"
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
            <p className="text-xs text-green-600">
              ℹ️ Branch code automatically detected from your bank selection
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Payment Card Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Business Payment Card (Optional)</h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowCardSection(!showCardSection)}
          >
            {showCardSection ? 'Hide' : 'Add'} Card Details
          </Button>
        </div>
        
        {showCardSection && (
          <UniversalCardDetailsForm
            userType="vendor"
            onCardSaved={(card) => {
              toast({
                title: "Business Card Added! 💳",
                description: `Your ${card.cardType.toUpperCase()} ending in ${card.lastFourDigits} has been saved securely for business transactions.`,
              });
            }}
          />
        )}
      </div>

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
            <Label htmlFor="password">Password *</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="Create a strong password"
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

      {/* Terms and Marketing */}
      <Card className="border-gray-200">
        <CardContent className="p-4 space-y-4">
          <div className="flex items-start space-x-2">
            <Checkbox
              id="agreeTerms"
              checked={formData.agreeTerms}
              onCheckedChange={(checked) => handleInputChange('agreeTerms', checked)}
              className="mt-1"
            />
            <div className="space-y-1">
              <Label htmlFor="agreeTerms" className="text-sm cursor-pointer">
                I agree to the Vendor Terms of Service and Privacy Policy *
              </Label>
              <p className="text-xs text-gray-600">
                By checking this box, you agree to our vendor terms and allow us to securely store your business information.
              </p>
            </div>
          </div>
          {errors.agreeTerms && <p className="text-red-500 text-sm">{errors.agreeTerms}</p>}

          <div className="flex items-start space-x-2">
            <Checkbox
              id="marketingConsent"
              checked={formData.marketingConsent}
              onCheckedChange={(checked) => handleInputChange('marketingConsent', checked)}
              className="mt-1"
            />
            <Label htmlFor="marketingConsent" className="text-sm cursor-pointer">
              I would like to receive business updates and commission reports
            </Label>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default VendorRegistrationForm;
