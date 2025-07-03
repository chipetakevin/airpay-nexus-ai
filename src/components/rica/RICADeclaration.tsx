import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Shield, ChevronLeft, CheckCircle } from 'lucide-react';

interface RICADeclarationProps {
  formData: any;
  setFormData: (data: any) => void;
  onSubmit: () => void;
  onPrevious: () => void;
}

const RICADeclaration: React.FC<RICADeclarationProps> = ({ 
  formData, 
  setFormData, 
  onSubmit, 
  onPrevious 
}) => {
  const handleCheckboxChange = (field: string, checked: boolean) => {
    setFormData((prev: any) => ({ ...prev, [field]: checked }));
  };

  const isStepValid = () => {
    return formData.confirmInformation && formData.consentProcessing;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-600" />
          Step 4: Declaration & Consent
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-3">Review Your Information</h4>
          <div className="space-y-2 text-sm text-blue-800">
            <p><strong>Name:</strong> {formData.fullName}</p>
            <p><strong>ID Number:</strong> {formData.idNumber}</p>
            <p><strong>Mobile:</strong> {formData.mobileNumber}</p>
            <p><strong>Address:</strong> {formData.physicalAddress?.substring(0, 50)}...</p>
            <p><strong>SIM ICCID:</strong> {formData.simSerialNumber}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="confirmInformation"
              checked={formData.confirmInformation}
              onCheckedChange={(checked) => handleCheckboxChange('confirmInformation', checked as boolean)}
            />
            <label htmlFor="confirmInformation" className="text-sm text-gray-700 leading-5">
              I confirm that all information provided is true, correct, and complete. I understand that providing false information is an offense under the RICA Act.
            </label>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="consentProcessing"
              checked={formData.consentProcessing}
              onCheckedChange={(checked) => handleCheckboxChange('consentProcessing', checked as boolean)}
            />
            <label htmlFor="consentProcessing" className="text-sm text-gray-700 leading-5">
              I consent to Divine Mobile processing my personal information for RICA compliance, network services, and customer support in accordance with POPIA (Protection of Personal Information Act).
            </label>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-green-900 mb-1">Your Data is Protected</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• All uploads are encrypted and securely stored</li>
                <li>• Data used only for RICA compliance and network services</li>
                <li>• You can request access, correction, or deletion anytime</li>
                <li>• Compliant with RICA and POPIA regulations</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-amber-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-amber-900 mb-1">What Happens Next?</h4>
              <ul className="text-sm text-amber-800 space-y-1">
                <li>• Your registration will be processed within 24 hours</li>
                <li>• You'll receive SMS confirmation when complete</li>
                <li>• Your SIM will be activated automatically</li>
                <li>• You can track status in your account</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Button variant="outline" onClick={onPrevious} className="flex-1 h-12">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          <Button 
            onClick={onSubmit} 
            disabled={!isStepValid()}
            className="flex-1 h-12 bg-green-600 hover:bg-green-700"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Register SIM Card
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RICADeclaration;