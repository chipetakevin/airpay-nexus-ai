import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, User, Shield, CreditCard, Wallet } from 'lucide-react';
import UnifiedBankingSection from '@/components/forms/UnifiedBankingSection';
import InternationalPaymentCardForm from '@/components/cards/InternationalPaymentCardForm';
import OneCardDigitalWallet from '@/components/cards/OneCardDigitalWallet';
import { useOneCardSystem } from '@/hooks/useOneCardSystem';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface AdminFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
  department: string;
  role: string;
  accessLevel: string;
  bankName: string;
  accountNumber: string;
  branchCode: string;
  routingNumber: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
  securityClearance: boolean;
}

interface AdminRegistrationFormProps {
  formData: AdminFormData;
  errors: Record<string, string>;
  showPassword: boolean;
  togglePasswordVisibility: () => void;
  handleInputChange: (field: string, value: any) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const AdminRegistrationForm: React.FC<AdminRegistrationFormProps> = ({
  formData,
  errors,
  showPassword,
  togglePasswordVisibility,
  handleInputChange,
  handleSubmit
}) => {
  const { toast } = useToast();
  const { oneCardAccount, initializeOneCardSystem, addPaymentCard } = useOneCardSystem();
  const [showCardSection, setShowCardSection] = useState(false);
  const [showOneCardWallet, setShowOneCardWallet] = useState(false);
  const [userId, setUserId] = useState<string>('');

  // Get current user ID
  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      }
    };
    getCurrentUser();
  }, []);

  // Initialize OneCard system when user ID is available
  useEffect(() => {
    if (userId && formData.firstName && formData.lastName) {
      initializeOneCardSystem(userId, 'admin');
      setShowOneCardWallet(true);
    }
  }, [userId, formData.firstName, formData.lastName, initializeOneCardSystem]);

  const handleBankSelect = (bankName: string, routing: string, branchCode: string, bankDetails?: any) => {
    console.log('🏦 Admin bank selected:', { bankName, routing, branchCode, bankDetails });
    handleInputChange('bankName', bankName);
    handleInputChange('branchCode', branchCode);
    handleInputChange('routingNumber', routing);

    toast({
      title: "Banking Information Updated! 🏦",
      description: `${bankName} with branch code ${branchCode} has been saved.`,
      duration: 3000
    });
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

        toast({
          title: "Admin Payment Card Added! 💳",
          description: `Your ${cardData.cardBrand} ending in ${cardData.lastFourDigits} has been added to your OneCard wallet.`,
          duration: 3000
        });
      } catch (error) {
        console.error('Failed to add admin payment card:', error);
        toast({
          title: "Card Addition Failed",
          description: "Unable to add payment card. Please try again.",
          variant: "destructive"
        });
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
              <Wallet className="w-5 h-5" />
              Your OneCard Platinum Wallet
            </CardTitle>
            <p className="text-sm text-gold-600">
              Admin-level OneCard with premium benefits and cashback rewards
            </p>
          </CardHeader>
          <CardContent>
            <OneCardDigitalWallet
              userId={userId}
              userType="admin"
              showBalance={true}
            />
          </CardContent>
        </Card>
      )}

      {/* Personal Information */}
      <Card className="border-red-200 bg-red-50/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-red-800">
            <User className="w-5 h-5" />
            Admin Information
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
            <Input
              id="email"
              type="email"
              value={formData.email || ''}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="admin.email@company.com"
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="department" className="text-sm font-medium text-gray-700">
                Department *
              </Label>
              <Select value={formData.department || ''} onValueChange={(value) => handleInputChange('department', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="operations">Operations</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="customer_service">Customer Service</SelectItem>
                  <SelectItem value="compliance">Compliance</SelectItem>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="executive">Executive</SelectItem>
                </SelectContent>
              </Select>
              {errors.department && <p className="text-red-500 text-sm">{errors.department}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="accessLevel" className="text-sm font-medium text-gray-700">
                Access Level *
              </Label>
              <Select value={formData.accessLevel || ''} onValueChange={(value) => handleInputChange('accessLevel', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select access level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="super_admin">Super Admin</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="supervisor">Supervisor</SelectItem>
                </SelectContent>
              </Select>
              {errors.accessLevel && <p className="text-red-500 text-sm">{errors.accessLevel}</p>}
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
        onBankSelect={handleBankSelect}
        userType="admin"
        required={true}
      />

      {/* International Payment Cards */}
      <Card className="border-blue-200 bg-blue-50/30">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2 text-blue-800">
              <CreditCard className="w-5 h-5" />
              International Payment Cards
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
            Add international cards for global transactions and OneCard top-ups
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

      {/* Security & Password */}
      <Card className="border-gray-700 bg-gray-50/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
            <Shield className="w-5 h-5" />
            Security & Access
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">
              Admin Password *
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password || ''}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="Create a strong admin password"
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
              placeholder="Confirm your admin password"
              className={errors.confirmPassword ? 'border-red-500' : ''}
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
          </div>

          <div className="space-y-4 pt-4 border-t border-gray-200">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="agreeTerms"
                checked={formData.agreeTerms}
                onCheckedChange={(checked) => handleInputChange('agreeTerms', checked)}
                className="mt-1"
              />
              <div className="space-y-1">
                <Label htmlFor="agreeTerms" className="text-sm cursor-pointer">
                  I agree to the Admin Terms of Service and Privacy Policy *
                </Label>
                <p className="text-xs text-gray-600">
                  By checking this box, you accept the responsibilities and obligations of administrative access.
                </p>
              </div>
            </div>
            {errors.agreeTerms && <p className="text-red-500 text-sm">{errors.agreeTerms}</p>}

            <div className="flex items-start space-x-2">
              <Checkbox
                id="securityClearance"
                checked={formData.securityClearance}
                onCheckedChange={(checked) => handleInputChange('securityClearance', checked)}
                className="mt-1"
              />
              <div className="space-y-1">
                <Label htmlFor="securityClearance" className="text-sm cursor-pointer">
                  I acknowledge security clearance requirements *
                </Label>
                <p className="text-xs text-gray-600">
                  I understand and accept all security protocols and compliance requirements for admin access.
                </p>
              </div>
            </div>
            {errors.securityClearance && <p className="text-red-500 text-sm">{errors.securityClearance}</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminRegistrationForm;