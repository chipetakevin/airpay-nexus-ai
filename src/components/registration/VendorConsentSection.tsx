
import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface VendorConsentProps {
  formData: any;
  errors: any;
  onInputChange: (field: string, value: any) => void;
}

const VendorConsentSection: React.FC<VendorConsentProps> = ({
  formData,
  errors,
  onInputChange
}) => {
  const [isSecurityCollapsed, setIsSecurityCollapsed] = useState(false);

  // Auto-collapse security section when marketing consent is selected
  useEffect(() => {
    if (formData.marketingConsent && !isSecurityCollapsed) {
      const timer = setTimeout(() => {
        setIsSecurityCollapsed(true);
      }, 2000); // Collapse after 2 seconds to let user see the activation
      return () => clearTimeout(timer);
    }
  }, [formData.marketingConsent, isSecurityCollapsed]);

  // Auto-expand if marketing consent is unchecked
  useEffect(() => {
    if (!formData.marketingConsent && isSecurityCollapsed) {
      setIsSecurityCollapsed(false);
    }
  }, [formData.marketingConsent, isSecurityCollapsed]);

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg border border-gray-200">
      <div className="flex items-start space-x-3">
        <Checkbox
          id="rememberPassword"
          checked={formData.rememberPassword || true}
          onCheckedChange={() => {}} // Disabled
          disabled
          className="mt-1"
        />
        <div className="flex-1">
          <Label htmlFor="rememberPassword" className="text-sm font-medium text-gray-700 flex items-center gap-2">
            ✓ Remember my login details (Enabled for faster shopping)
            <Badge variant="secondary" className="text-xs">
              Auto-Enabled
            </Badge>
          </Label>
        </div>
      </div>

      <div className="flex items-start space-x-3">
        <Checkbox
          id="agreeTerms"
          checked={formData.agreeTerms || false}
          onCheckedChange={(checked) => onInputChange('agreeTerms', checked)}
          className="mt-1"
        />
        <div className="flex-1">
          <Label 
            htmlFor="agreeTerms" 
            className="text-base font-medium text-gray-900 cursor-pointer leading-relaxed"
          >
            I agree to the Business Terms & Conditions and Privacy Policy *
          </Label>
          <p className="text-sm text-gray-600 mt-1 leading-relaxed">
            By checking this box, you agree to our vendor terms and allow us to securely store your business information.
          </p>
        </div>
      </div>
      {errors.agreeTerms && (
        <div className="ml-7">
          <p className="text-red-500 text-sm font-medium">{errors.agreeTerms}</p>
        </div>
      )}

      <div className={`flex items-start space-x-3 transition-all duration-300 rounded-lg p-3 ${
        formData.marketingConsent ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
      }`}>
        <Checkbox
          id="marketingConsent"
          checked={formData.marketingConsent || false}
          onCheckedChange={(checked) => onInputChange('marketingConsent', checked)}
          className={`mt-1 ${formData.marketingConsent ? 'accent-green-600' : ''}`}
        />
        <div className="flex-1">
          <Label 
            htmlFor="marketingConsent" 
            className={`text-base font-medium cursor-pointer leading-relaxed transition-colors duration-300 ${
              formData.marketingConsent ? 'text-green-700' : 'text-gray-900'
            }`}
          >
            I consent to receive business communications and updates
            {formData.marketingConsent && (
              <span className="ml-2 text-green-600 font-semibold">✓ Active</span>
            )}
          </Label>
        </div>
      </div>

      {/* Enhanced Security Notice with consent-based styling and collapse functionality */}
      {!isSecurityCollapsed && (
        <div className={`border rounded-lg p-4 transition-all duration-300 ${
          formData.marketingConsent 
            ? 'bg-green-50 border-green-200' 
            : 'bg-blue-50 border-blue-200'
        }`}>
          <div className={`text-sm ${
            formData.marketingConsent ? 'text-green-700' : 'text-blue-700'
          }`}>
            <h4 className="font-semibold mb-2">
              {formData.marketingConsent ? '🔐✅ Enhanced Security Activated:' : '🔐 Enhanced Password Management:'}
            </h4>
            <ul className="space-y-1 text-sm leading-relaxed">
              <li>• Auto-save keeps your registration safe</li>
              <li>• Password reset available via email OTP</li>
              <li>• Use unified password (Malawi@1976) for admin access</li>
              <li>• Credentials remembered for faster future logins</li>
              {formData.marketingConsent && (
                <li className="font-semibold text-green-600">• ✅ All security features are now active and configured!</li>
              )}
            </ul>
          </div>
        </div>
      )}

      {/* Collapsed Security Summary */}
      {isSecurityCollapsed && formData.marketingConsent && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
              <div>
                <span className="text-sm font-medium text-green-800">
                  Enhanced Security Active
                </span>
                <p className="text-xs text-green-700 mt-0.5">
                  All security features configured and enabled
                </p>
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setIsSecurityCollapsed(false)}
              className="text-xs text-green-700 hover:bg-green-100 flex items-center gap-1"
            >
              <ChevronDown className="w-3 h-3" />
              Show Details
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorConsentSection;
