import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, ChevronRight, ChevronLeft, Upload } from 'lucide-react';

interface RICAAddressDetailsProps {
  formData: any;
  setFormData: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const RICAAddressDetails: React.FC<RICAAddressDetailsProps> = ({ 
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
    return formData.mobileNumber && 
           formData.physicalAddress && 
           formData.province && 
           formData.proofOfResidence;
  };

  const provinces = [
    'Eastern Cape',
    'Free State',
    'Gauteng',
    'KwaZulu-Natal',
    'Limpopo',
    'Mpumalanga',
    'Northern Cape',
    'North West',
    'Western Cape'
  ];

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="px-4 py-4 sm:px-6 sm:py-6">
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
          <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0" />
          <span className="truncate">Step 2: Contact & Address Details</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6 space-y-4 sm:space-y-6">
        {/* Contact Details Grid */}
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label htmlFor="mobileNumber" className="text-sm font-medium">
              Mobile Number *
            </Label>
            <Input
              id="mobileNumber"
              type="tel"
              value={formData.mobileNumber}
              onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
              placeholder="+27 XX XXX XXXX"
              className="w-full h-12 text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email Address (Optional)
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="example@divinemobile.co.za"
              className="w-full h-12 text-base"
            />
          </div>
        </div>

        {/* Physical Address */}
        <div className="space-y-2">
          <Label htmlFor="physicalAddress" className="text-sm font-medium">
            Physical Address *
          </Label>
          <Textarea
            id="physicalAddress"
            value={formData.physicalAddress}
            onChange={(e) => handleInputChange('physicalAddress', e.target.value)}
            placeholder="Enter your complete physical address including street number, suburb, and postal code"
            className="w-full min-h-[100px] text-base resize-none"
          />
          <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
            💡 Must match your proof of residence document exactly
          </p>
        </div>

        {/* Province */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Province *</Label>
          <Select value={formData.province} onValueChange={(value) => handleInputChange('province', value)}>
            <SelectTrigger className="h-12 text-base">
              <SelectValue placeholder="Select your province" />
            </SelectTrigger>
            <SelectContent>
              {provinces.map((province) => (
                <SelectItem key={province} value={province}>
                  {province}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Proof of Residence Upload */}
        <div className="space-y-3">
          <Label htmlFor="proofOfResidence" className="text-sm font-medium">
            Proof of Residence *
          </Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center bg-gray-50">
            <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-2">
              Upload utility bill, bank statement, or lease agreement
            </p>
            <p className="text-xs text-gray-500 mb-4">
              PDF/JPG/PNG • Max 5MB • Not older than 3 months
            </p>
            <Input
              id="proofOfResidence"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => handleFileChange('proofOfResidence', e.target.files?.[0] || null)}
              className="w-full h-12 text-base file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
          {formData.proofOfResidence && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-sm text-green-700 flex items-center gap-2">
                <span className="text-green-600">✓</span>
                File uploaded: {formData.proofOfResidence.name}
              </p>
            </div>
          )}
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
            Next: Banking Details
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RICAAddressDetails;