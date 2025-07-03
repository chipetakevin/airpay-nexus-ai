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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-600" />
          Step 2: Contact & Address Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="mobileNumber">Mobile Number *</Label>
          <Input
            id="mobileNumber"
            type="tel"
            value={formData.mobileNumber}
            onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
            placeholder="+27 XX XXX XXXX"
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address (Optional)</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="your.email@example.com"
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="physicalAddress">Physical Address *</Label>
          <Textarea
            id="physicalAddress"
            value={formData.physicalAddress}
            onChange={(e) => handleInputChange('physicalAddress', e.target.value)}
            placeholder="Enter your complete physical address"
            className="w-full min-h-[100px]"
          />
          <p className="text-xs text-gray-600">
            Must match your proof of residence document
          </p>
        </div>

        <div className="space-y-2">
          <Label>Province *</Label>
          <Select value={formData.province} onValueChange={(value) => handleInputChange('province', value)}>
            <SelectTrigger>
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

        <div className="space-y-2">
          <Label htmlFor="proofOfResidence">Proof of Residence *</Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
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
              className="w-full"
            />
          </div>
          {formData.proofOfResidence && (
            <p className="text-sm text-green-600">
              ✓ File uploaded: {formData.proofOfResidence.name}
            </p>
          )}
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
            Next: SIM Details
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RICAAddressDetails;