
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, EyeOff, User, Building, Phone, Mail, MapPin, Shield } from 'lucide-react';
import VendorPhoneSection from '@/components/forms/VendorPhoneSection';
import UniversalCardDetailsForm from '@/components/banking/UniversalCardDetailsForm';
import UnifiedBankingSection from '@/components/forms/UnifiedBankingSection';
import OneCardDigitalWallet from '@/components/cards/OneCardDigitalWallet';
import InternationalPaymentCardForm from '@/components/cards/InternationalPaymentCardForm';
import { useOneCardSystem } from '@/hooks/useOneCardSystem';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

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
  const { oneCardAccount, initializeOneCardSystem, addPaymentCard } = useOneCardSystem();
  const [showCardSection, setShowCardSection] = useState(false);
  const [showOneCardWallet, setShowOneCardWallet] = useState(false);
  const [userId, setUserId] = useState<string>('');

  // Get current user ID and initialize OneCard
  React.useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        if (formData.firstName && formData.lastName) {
          await initializeOneCardSystem(user.id, 'vendor');
          setShowOneCardWallet(true);
        }
      }
    };
    getCurrentUser();
  }, [formData.firstName, formData.lastName, initializeOneCardSystem]);

  const handleEnhancedBankSelect = (bankName: string, routing: string, branchCode: string, bankDetails?: any) => {
    console.log('🏦 Vendor bank selected:', { bankName, routing, branchCode, bankDetails });
    handleBankSelect(bankName, routing, branchCode);
    handleInputChange('bankName', bankName);
    handleInputChange('branchCode', branchCode);
    handleInputChange('routingNumber', routing);
  };

  const handleCardAdded = async (cardData: any) => {
    if (oneCardAccount && userId) {
      try {
        await addPaymentCard({
          userId,
          oneCardAccountId: oneCardAccount.id,
          cardType: cardData.cardType,
          cardBrand: cardData.cardBrand,
          lastFourDigits: cardData.lastFourDigits,
          expiryMonth: cardData.expiryMonth,
          expiryYear: cardData.expiryYear,
          cardholderName: cardData.cardholderName,
          billingCountry: cardData.billingCountry,
          billingAddress: cardData.billingAddress,
          isPrimary: true
        });
      } catch (error) {
        console.error('Failed to add vendor payment card:', error);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* OneCard Digital Wallet Preview */}
      {showOneCardWallet && userId && (
        <Card className="border-gold-200 bg-gold-50/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2 text-gold-800">
              <Shield className="w-5 h-5" />
              Your OneCard Gold Wallet
            </CardTitle>
            <p className="text-sm text-gold-600">
              Vendor OneCard with business rewards and cashback benefits
            </p>
          </CardHeader>
          <CardContent>
            <OneCardDigitalWallet
              userId={userId}
              userType="vendor"
              showBalance={true}
            />
          </CardContent>
        </Card>
      )}
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
              <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                First Name *
              </Label>
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
              <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                Last Name *
              </Label>
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
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email Address *
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                value={formData.email || ''}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="your.email@example.com"
                className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
        </CardContent>
      </Card>

      {/* Phone Section */}
      <VendorPhoneSection
        formData={formData}
        errors={errors}
        onInputChange={handleInputChange}
      />

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
            <Label htmlFor="companyName" className="text-sm font-medium text-gray-700">
              Company/Business Name *
            </Label>
            <Input
              id="companyName"
              value={formData.companyName || ''}
              onChange={(e) => handleInputChange('companyName', e.target.value)}
              placeholder="Enter your business name"
              className={errors.companyName ? 'border-red-500' : ''}
            />
            {errors.companyName && <p className="text-red-500 text-sm">{errors.companyName}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="businessType" className="text-sm font-medium text-gray-700">
              Business Type
            </Label>
            <Select value={formData.businessType || ''} onValueChange={(value) => handleInputChange('businessType', value)}>
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
            <Label htmlFor="location" className="text-sm font-medium text-gray-700">
              Business Location
            </Label>
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
      <UnifiedBankingSection
        formData={{
          bankName: formData.bankName,
          accountNumber: formData.accountNumber,
          branchCode: formData.branchCode,
          routingNumber: formData.routingNumber
        }}
        errors={errors}
        onInputChange={handleInputChange}
        onBankSelect={handleEnhancedBankSelect}
        userType="vendor"
        required={false}
      />

      {/* International Payment Cards */}
      <Card className="border-blue-200 bg-blue-50/30">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2 text-blue-800">
              <Building className="w-5 h-5" />
              Business Payment Cards (Optional)
            </CardTitle>
            <Button
              type="button"
              variant="outline"
              size="sm" 
              onClick={() => setShowCardSection(!showCardSection)}
            >
              {showCardSection ? 'Hide' : 'Add'} Card
            </Button>
          </div>
          <p className="text-sm text-blue-600">
            Add international cards for business transactions and OneCard management
          </p>
        </CardHeader>
        {showCardSection && oneCardAccount && (
          <CardContent>
            <InternationalPaymentCardForm
              userId={userId}
              oneCardAccountId={oneCardAccount.id}
              onCardAdded={handleCardAdded}
            />
          </CardContent>
        )}
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
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password *
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password || ''}
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
            <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
              Confirm Password *
            </Label>
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
    </div>
  );
};

export default VendorRegistrationForm;
