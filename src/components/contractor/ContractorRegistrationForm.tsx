import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Building, 
  Award, 
  MapPin, 
  FileText, 
  Upload, 
  Shield, 
  CheckCircle,
  Camera,
  Smartphone,
  Brain
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ContractorFormData {
  // Personal Information
  fullName: string;
  dateOfBirth: string;
  idNumber: string;
  idType: string;
  contactNumber: string;
  email: string;
  physicalAddress: string;
  
  // Business Details
  companyName: string;
  registrationNumber: string;
  taxId: string;
  businessAddress: string;
  businessType: string;
  
  // Qualifications
  certifications: string[];
  yearsExperience: string;
  tradeSkills: string[];
  
  // Work Areas
  workRegions: string[];
  projectTypes: string[];
  availability: string;
  
  // Compliance
  insuranceDetails: string;
  safetyTraining: boolean;
  
  // Document uploads
  documents: Record<string, File | null>;
}

const initialFormData: ContractorFormData = {
  fullName: '',
  dateOfBirth: '',
  idNumber: '',
  idType: 'SA_ID',
  contactNumber: '',
  email: '',
  physicalAddress: '',
  companyName: '',
  registrationNumber: '',
  taxId: '',
  businessAddress: '',
  businessType: '',
  certifications: [],
  yearsExperience: '',
  tradeSkills: [],
  workRegions: [],
  projectTypes: [],
  availability: '',
  insuranceDetails: '',
  safetyTraining: false,
  documents: {
    idDocument: null,
    resume: null,
    certificates: null,
    insurance: null,
    bankDetails: null
  }
};

export const ContractorRegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<ContractorFormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(0);
  const [processingDocuments, setProcessingDocuments] = useState<string[]>([]);
  const [extractedData, setExtractedData] = useState<Record<string, any>>({});
  const { toast } = useToast();

  const steps = [
    { title: 'Personal Info', icon: User },
    { title: 'Business Details', icon: Building },
    { title: 'Qualifications', icon: Award },
    { title: 'Work Areas', icon: MapPin },
    { title: 'Documents', icon: Upload },
    { title: 'Review', icon: CheckCircle }
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleDocumentUpload = async (file: File, documentType: string) => {
    setProcessingDocuments(prev => [...prev, documentType]);
    
    try {
      // Simulate AI document processing
      setTimeout(() => {
        // Mock extracted data based on document type
        const mockExtraction = {
          idDocument: { name: 'John Doe', idNumber: '1234567890123' },
          resume: { experience: '5+ years', skills: ['Electrical', 'Plumbing'] },
          certificates: { certifications: ['Safety Training', 'Trade License'] }
        };

        if (mockExtraction[documentType as keyof typeof mockExtraction]) {
          setExtractedData(prev => ({
            ...prev,
            [documentType]: mockExtraction[documentType as keyof typeof mockExtraction]
          }));
          
          toast({
            title: "Document Processed",
            description: `AI extracted data from ${documentType}. Please review and confirm.`,
          });
        }

        setProcessingDocuments(prev => prev.filter(doc => doc !== documentType));
      }, 2000);

      setFormData(prev => ({
        ...prev,
        documents: { ...prev.documents, [documentType]: file }
      }));

    } catch (error) {
      toast({
        title: "Upload Error",
        description: "Failed to process document. Please try again.",
        variant: "destructive"
      });
      setProcessingDocuments(prev => prev.filter(doc => doc !== documentType));
    }
  };

  const renderPersonalInfo = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            value={formData.fullName}
            onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
            placeholder="Enter full name"
          />
        </div>
        <div>
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => setFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="idType">ID Type</Label>
          <Select value={formData.idType} onValueChange={(value) => setFormData(prev => ({ ...prev, idType: value }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SA_ID">South African ID</SelectItem>
              <SelectItem value="passport">Passport</SelectItem>
              <SelectItem value="drivers_license">Driver's License</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="idNumber">ID Number</Label>
          <Input
            id="idNumber"
            value={formData.idNumber}
            onChange={(e) => setFormData(prev => ({ ...prev, idNumber: e.target.value }))}
            placeholder="Enter ID number"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="contactNumber">Contact Number</Label>
          <Input
            id="contactNumber"
            value={formData.contactNumber}
            onChange={(e) => setFormData(prev => ({ ...prev, contactNumber: e.target.value }))}
            placeholder="+27 12 345 6789"
          />
        </div>
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            placeholder="john@example.com"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="physicalAddress">Physical Address</Label>
        <Textarea
          id="physicalAddress"
          value={formData.physicalAddress}
          onChange={(e) => setFormData(prev => ({ ...prev, physicalAddress: e.target.value }))}
          placeholder="Enter complete physical address"
        />
      </div>
    </div>
  );

  const renderBusinessDetails = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="companyName">Company Name</Label>
          <Input
            id="companyName"
            value={formData.companyName}
            onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
            placeholder="Enter company name"
          />
        </div>
        <div>
          <Label htmlFor="businessType">Business Type</Label>
          <Select value={formData.businessType} onValueChange={(value) => setFormData(prev => ({ ...prev, businessType: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select business type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sole_proprietor">Sole Proprietor</SelectItem>
              <SelectItem value="partnership">Partnership</SelectItem>
              <SelectItem value="pty_ltd">Pty Ltd</SelectItem>
              <SelectItem value="cc">Close Corporation</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="registrationNumber">Registration Number</Label>
          <Input
            id="registrationNumber"
            value={formData.registrationNumber}
            onChange={(e) => setFormData(prev => ({ ...prev, registrationNumber: e.target.value }))}
            placeholder="Enter registration number"
          />
        </div>
        <div>
          <Label htmlFor="taxId">Tax ID</Label>
          <Input
            id="taxId"
            value={formData.taxId}
            onChange={(e) => setFormData(prev => ({ ...prev, taxId: e.target.value }))}
            placeholder="Enter tax ID"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="businessAddress">Business Address</Label>
        <Textarea
          id="businessAddress"
          value={formData.businessAddress}
          onChange={(e) => setFormData(prev => ({ ...prev, businessAddress: e.target.value }))}
          placeholder="Enter business address"
        />
      </div>
    </div>
  );

  const renderDocumentUpload = () => (
    <div className="space-y-6">
      <div className="text-center p-6 border-2 border-dashed border-border rounded-lg bg-muted/50">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Brain className="h-6 w-6 text-primary" />
          <span className="text-lg font-semibold">AI-Enhanced Document Processing</span>
        </div>
        <p className="text-muted-foreground mb-4">
          Upload your documents and our AI will automatically extract and validate information
        </p>
        <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Camera className="h-4 w-4" />
            <span>Mobile Camera</span>
          </div>
          <div className="flex items-center space-x-1">
            <Smartphone className="h-4 w-4" />
            <span>Drag & Drop</span>
          </div>
          <div className="flex items-center space-x-1">
            <FileText className="h-4 w-4" />
            <span>PDF, DOCX, Images</span>
          </div>
        </div>
      </div>

      {Object.entries({
        idDocument: 'ID Document',
        resume: 'Resume/CV',
        certificates: 'Certificates',
        insurance: 'Insurance Proof',
        bankDetails: 'Bank Details'
      }).map(([key, label]) => (
        <div key={key} className="border rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <Label className="text-base font-medium">{label}</Label>
            {processingDocuments.includes(key) && (
              <Badge variant="secondary" className="animate-pulse">
                <Brain className="h-3 w-3 mr-1" />
                Processing...
              </Badge>
            )}
            {extractedData[key] && (
              <Badge variant="default">
                <CheckCircle className="h-3 w-3 mr-1" />
                Data Extracted
              </Badge>
            )}
          </div>
          
          <input
            type="file"
            id={key}
            className="hidden"
            accept=".pdf,.docx,.xlsx,.png,.jpg,.jpeg,.heic"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleDocumentUpload(file, key);
            }}
          />
          
          <label
            htmlFor={key}
            className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
          >
            <Upload className="h-8 w-8 text-muted-foreground mb-2" />
            <span className="text-sm text-muted-foreground">
              {formData.documents[key] ? formData.documents[key]!.name : `Upload ${label}`}
            </span>
          </label>

          {extractedData[key] && (
            <div className="mt-3 p-3 bg-muted rounded-lg">
              <p className="text-sm font-medium mb-2">Extracted Data:</p>
              <pre className="text-xs text-muted-foreground">
                {JSON.stringify(extractedData[key], null, 2)}
              </pre>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderReview = () => (
    <div className="space-y-6">
      <div className="text-center p-6 bg-muted/50 rounded-lg">
        <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Review Your Information</h3>
        <p className="text-muted-foreground">
          Please review all information before submitting your contractor registration
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Personal Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div><strong>Name:</strong> {formData.fullName}</div>
            <div><strong>Email:</strong> {formData.email}</div>
            <div><strong>Phone:</strong> {formData.contactNumber}</div>
            <div><strong>ID:</strong> {formData.idNumber}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building className="h-5 w-5" />
              <span>Business Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div><strong>Company:</strong> {formData.companyName}</div>
            <div><strong>Type:</strong> {formData.businessType}</div>
            <div><strong>Registration:</strong> {formData.registrationNumber}</div>
            <div><strong>Tax ID:</strong> {formData.taxId}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Documents Uploaded</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(formData.documents).map(([key, file]) => (
              <div key={key} className="flex items-center space-x-2 p-2 bg-muted rounded">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm">{file?.name || `No ${key} uploaded`}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0: return renderPersonalInfo();
      case 1: return renderBusinessDetails();
      case 2: return <div className="text-center p-8 text-muted-foreground">Qualifications section coming soon...</div>;
      case 3: return <div className="text-center p-8 text-muted-foreground">Work areas section coming soon...</div>;
      case 4: return renderDocumentUpload();
      case 5: return renderReview();
      default: return null;
    }
  };

  const handleSubmit = async () => {
    toast({
      title: "Registration Submitted",
      description: "Your contractor registration has been submitted for review. You'll receive an email confirmation shortly.",
    });
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Shield className="h-6 w-6 text-primary" />
          <CardTitle className="text-2xl">Field Contractor Registration</CardTitle>
        </div>
        <p className="text-muted-foreground">
          Complete your contractor onboarding with AI-enhanced document processing
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Step {currentStep + 1} of {steps.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Indicators */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            
            return (
              <div
                key={index}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm ${
                  isActive 
                    ? 'bg-primary text-primary-foreground' 
                    : isCompleted 
                    ? 'bg-muted text-foreground' 
                    : 'bg-muted/50 text-muted-foreground'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden md:inline">{step.title}</span>
              </div>
            );
          })}
        </div>

        {/* Form Content */}
        <div className="min-h-[400px]">
          {renderCurrentStep()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-6 border-t">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          
          {currentStep === steps.length - 1 ? (
            <Button onClick={handleSubmit} className="bg-gradient-to-r from-primary to-primary/80">
              Submit Registration
            </Button>
          ) : (
            <Button
              onClick={() => setCurrentStep(prev => Math.min(steps.length - 1, prev + 1))}
            >
              Next
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};