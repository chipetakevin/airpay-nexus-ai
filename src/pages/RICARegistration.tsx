import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  MapPin, 
  CreditCard, 
  Shield, 
  CheckCircle,
  AlertCircle,
  FileText,
  Phone,
  Camera
} from 'lucide-react';
import { useMobileAuth } from '@/hooks/useMobileAuth';
import { useRegistrationGuard } from '@/hooks/useRegistrationGuard';
import BottomNavigation from '@/components/navigation/BottomNavigation';
import RICAPersonalInfo from '@/components/rica/RICAPersonalInfo';
import RICAAddressDetails from '@/components/rica/RICAAddressDetails';
import RICASIMDetails from '@/components/rica/RICASIMDetails';
import RICADeclaration from '@/components/rica/RICADeclaration';
import RICAConfirmation from '@/components/rica/RICAConfirmation';

type RegistrationStep = 'personal' | 'address' | 'sim' | 'declaration' | 'confirmation';

const RICARegistration = () => {
  const { currentUser, isAuthenticated } = useMobileAuth();
  const { userProfile } = useRegistrationGuard();
  const [currentStep, setCurrentStep] = useState<RegistrationStep>('personal');
  const [isRegistered, setIsRegistered] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: userProfile?.firstName ? `${userProfile.firstName} ${userProfile.lastName}` : '',
    dateOfBirth: '',
    gender: '',
    nationality: 'South African',
    idNumber: '',
    idType: 'SA ID',
    
    // Contact & Address
    mobileNumber: userProfile?.phoneNumber || '',
    email: userProfile?.email || '',
    physicalAddress: '',
    province: '',
    proofOfResidence: null as File | null,
    
    // SIM Details
    simSerialNumber: '',
    selfieWithId: null as File | null,
    
    // Declaration
    confirmInformation: false,
    consentProcessing: false
  });

  const steps = [
    { id: 'personal', title: 'Personal Info', icon: User, completed: false },
    { id: 'address', title: 'Address', icon: MapPin, completed: false },
    { id: 'sim', title: 'SIM Details', icon: CreditCard, completed: false },
    { id: 'declaration', title: 'Declaration', icon: Shield, completed: false }
  ];

  const calculateProgress = () => {
    const stepIndex = steps.findIndex(step => step.id === currentStep);
    return ((stepIndex + 1) / steps.length) * 100;
  };

  const handleNext = () => {
    const stepOrder: RegistrationStep[] = ['personal', 'address', 'sim', 'declaration', 'confirmation'];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1]);
    }
  };

  const handlePrevious = () => {
    const stepOrder: RegistrationStep[] = ['personal', 'address', 'sim', 'declaration', 'confirmation'];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1]);
    }
  };

  const handleSubmit = () => {
    setCurrentStep('confirmation');
    setIsRegistered(true);
  };

  if (currentStep === 'confirmation') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 pb-24">
        <RICAConfirmation />
        <BottomNavigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pb-24">
      {/* Header */}
      <div className="bg-white shadow-sm border-b px-4 py-6">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">SIM Card Registration (RICA)</h1>
          <p className="text-gray-600">Comply with South African law by registering your SIM card</p>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* User Greeting */}
        {isAuthenticated && currentUser && (
          <Card className="border-blue-200 bg-blue-50/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    👋 Welcome, {currentUser.firstName || 'User'}!
                  </h3>
                  <p className="text-sm text-gray-600">
                    📱 Phone: {currentUser.registeredPhone || 'Not provided'}
                  </p>
                </div>
              </div>
              <p className="text-sm text-blue-700">
                Ready to help you with SIM registration and compliance.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Registration Status */}
        {!isRegistered && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-6 text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-red-800 mb-2">
                  ⚠️ Registration Required for WhatsApp Shopping
                </h3>
                <p className="text-sm text-red-600 mb-4">
                  Complete RICA registration to comply with South African law
                </p>
                <div className="bg-red-100 rounded-lg p-3">
                  <p className="text-xs text-red-700 flex items-center justify-center gap-1">
                    <FileText className="w-3 h-3" />
                    Your profile information is permanently saved for convenience
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Progress Section */}
        <Card className="border-blue-200 bg-blue-50/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-blue-800">Registration Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="flex justify-between text-sm text-blue-700 mb-2">
                <span>Complete your RICA registration</span>
                <span>{Math.round(calculateProgress())}%</span>
              </div>
              <Progress value={calculateProgress()} className="h-2" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {steps.map((step, index) => {
                const isActive = step.id === currentStep;
                const isCompleted = steps.findIndex(s => s.id === currentStep) > index;
                
                return (
                  <div key={step.id} className="flex items-center gap-2">
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : isActive ? (
                      <step.icon className="w-5 h-5 text-blue-600" />
                    ) : (
                      <step.icon className="w-5 h-5 text-gray-400" />
                    )}
                    <span className={`text-sm ${
                      isCompleted ? 'text-green-700 font-medium' : 
                      isActive ? 'text-blue-700 font-medium' : 
                      'text-gray-600'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Step Content */}
        <div className="space-y-4">
          {currentStep === 'personal' && (
            <RICAPersonalInfo 
              formData={formData}
              setFormData={setFormData}
              onNext={handleNext}
            />
          )}
          
          {currentStep === 'address' && (
            <RICAAddressDetails 
              formData={formData}
              setFormData={setFormData}
              onNext={handleNext}
              onPrevious={handlePrevious}
            />
          )}
          
          {currentStep === 'sim' && (
            <RICASIMDetails 
              formData={formData}
              setFormData={setFormData}
              onNext={handleNext}
              onPrevious={handlePrevious}
            />
          )}
          
          {currentStep === 'declaration' && (
            <RICADeclaration 
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              onPrevious={handlePrevious}
            />
          )}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default RICARegistration;