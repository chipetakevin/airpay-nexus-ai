import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, ChevronRight, ChevronLeft, Upload, Camera, QrCode } from 'lucide-react';

interface RICASIMDetailsProps {
  formData: any;
  setFormData: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const RICASIMDetails: React.FC<RICASIMDetailsProps> = ({ 
  formData, 
  setFormData, 
  onNext, 
  onPrevious 
}) => {
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (field: string, file: File | null) => {
    setFormData((prev: any) => ({ ...prev, [field]: file }));
  };

  const isStepValid = () => {
    return formData.simSerialNumber && 
           formData.selfieWithId &&
           formData.simSerialNumber.length >= 18;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-blue-600" />
          Step 3: SIM Card Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="simSerialNumber">SIM Serial Number (ICCID) *</Label>
          <div className="relative">
            <Input
              id="simSerialNumber"
              value={formData.simSerialNumber}
              onChange={(e) => handleInputChange('simSerialNumber', e.target.value)}
              placeholder="Enter 18-22 digit ICCID"
              className="w-full pr-10"
              maxLength={22}
            />
            <QrCode className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <p>Found on your SIM card or packaging</p>
          </div>
          {formData.simSerialNumber && formData.simSerialNumber.length < 18 && (
            <p className="text-xs text-red-600">
              ICCID must be at least 18 digits long
            </p>
          )}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <QrCode className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900 mb-1">Where to find your ICCID:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• On the SIM card itself (tiny numbers)</li>
                <li>• On the SIM card packaging</li>
                <li>• In your phone settings under "About"</li>
                <li>• Dial *#06# on some devices</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="selfieWithId">Selfie with ID/Passport *</Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-2">
              Take a clear selfie holding your ID document
            </p>
            <p className="text-xs text-gray-500 mb-4">
              JPG/PNG • Max 5MB • Face and ID clearly visible
            </p>
            <Input
              id="selfieWithId"
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={(e) => handleFileChange('selfieWithId', e.target.files?.[0] || null)}
              className="w-full"
            />
          </div>
          {formData.selfieWithId && (
            <p className="text-sm text-green-600">
              ✓ Photo uploaded: {formData.selfieWithId.name}
            </p>
          )}
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Camera className="w-5 h-5 text-amber-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-amber-900 mb-1">Photo Requirements:</h4>
              <ul className="text-sm text-amber-800 space-y-1">
                <li>• Hold your ID document next to your face</li>
                <li>• Ensure good lighting and clear visibility</li>
                <li>• Both your face and ID details must be readable</li>
                <li>• No sunglasses or head coverings (unless religious)</li>
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
            onClick={onNext} 
            disabled={!isStepValid()}
            className="flex-1 h-12"
          >
            Next: Declaration
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RICASIMDetails;