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
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="px-4 py-4 sm:px-6 sm:py-6">
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
          <CreditCard className="w-5 h-5 text-blue-600 flex-shrink-0" />
          <span className="truncate">Step 4: SIM Card Details</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6 space-y-4 sm:space-y-6">
        {/* SIM Serial Number */}
        <div className="space-y-3">
          <Label htmlFor="simSerialNumber" className="text-sm font-medium">
            SIM Serial Number (ICCID) *
          </Label>
          <div className="relative">
            <Input
              id="simSerialNumber"
              value={formData.simSerialNumber}
              onChange={(e) => handleInputChange('simSerialNumber', e.target.value)}
              placeholder="Enter 18-22 digit ICCID"
              className="w-full h-12 text-base pr-12 font-mono"
              maxLength={22}
            />
            <QrCode className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
          <div className="bg-gray-50 rounded-lg p-2">
            <p className="text-xs text-gray-600">
              💡 Found on your SIM card or packaging
            </p>
          </div>
          {formData.simSerialNumber && formData.simSerialNumber.length < 18 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-2">
              <p className="text-sm text-red-700">
                ⚠️ ICCID must be at least 18 digits long
              </p>
            </div>
          )}
        </div>

        {/* ICCID Help Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <QrCode className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <h4 className="font-medium text-blue-900 mb-2">Where to find your ICCID:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• On the SIM card itself (tiny numbers)</li>
                <li>• On the SIM card packaging</li>
                <li>• In your phone settings under "About"</li>
                <li>• Dial *#06# on some devices</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Selfie Upload */}
        <div className="space-y-3">
          <Label htmlFor="selfieWithId" className="text-sm font-medium">
            Selfie with ID/Passport *
          </Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center bg-gray-50">
            <Camera className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 mx-auto mb-2" />
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
              className="w-full h-12 text-base file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
          {formData.selfieWithId && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-sm text-green-700 flex items-center gap-2">
                <span className="text-green-600">✓</span>
                Photo uploaded: {formData.selfieWithId.name}
              </p>
            </div>
          )}
        </div>

        {/* Photo Requirements */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Camera className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <h4 className="font-medium text-amber-900 mb-2">Photo Requirements:</h4>
              <ul className="text-sm text-amber-800 space-y-1">
                <li>• Hold your ID document next to your face</li>
                <li>• Ensure good lighting and clear visibility</li>
                <li>• Both your face and ID details must be readable</li>
                <li>• No sunglasses or head coverings (unless religious)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-4 border-t">
          <Button 
            variant="outline" 
            onClick={onPrevious} 
            className="w-full sm:flex-1 h-12 text-base order-2 sm:order-1"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          <Button 
            onClick={onNext} 
            disabled={!isStepValid()}
            className="w-full sm:flex-1 h-12 text-base sm:h-14 sm:text-lg order-1 sm:order-2"
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