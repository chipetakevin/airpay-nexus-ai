import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, ChevronRight } from 'lucide-react';

interface RICAPersonalInfoProps {
  formData: any;
  setFormData: (data: any) => void;
  onNext: () => void;
}

const RICAPersonalInfo: React.FC<RICAPersonalInfoProps> = ({ formData, setFormData, onNext }) => {
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const isStepValid = () => {
    return formData.fullName && 
           formData.dateOfBirth && 
           formData.gender && 
           formData.nationality && 
           formData.idNumber && 
           formData.idType;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5 text-blue-600" />
          Step 1: Personal Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name and Surname *</Label>
          <Input
            id="fullName"
            value={formData.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            placeholder="Enter your full name"
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Date of Birth *</Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label>Gender *</Label>
          <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Nationality *</Label>
          <Select value={formData.nationality} onValueChange={(value) => handleInputChange('nationality', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select nationality" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="South African">South African</SelectItem>
              <SelectItem value="Foreign National">Foreign National</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Type of ID Document *</Label>
          <Select value={formData.idType} onValueChange={(value) => handleInputChange('idType', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select ID type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SA ID">South African ID</SelectItem>
              <SelectItem value="Passport">Passport</SelectItem>
              <SelectItem value="Refugee">Refugee Document</SelectItem>
              <SelectItem value="Asylum">Asylum Document</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="idNumber">ID/Passport Number *</Label>
          <Input
            id="idNumber"
            value={formData.idNumber}
            onChange={(e) => handleInputChange('idNumber', e.target.value)}
            placeholder={formData.idType === 'SA ID' ? '13-digit ID number' : 'Passport number'}
            className="w-full"
          />
        </div>

        <Button 
          onClick={onNext} 
          disabled={!isStepValid()}
          className="w-full mt-6 h-12"
        >
          Next: Address Details
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default RICAPersonalInfo;