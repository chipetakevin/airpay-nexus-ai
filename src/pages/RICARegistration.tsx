import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
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
import { useRICAAutoSave } from '@/hooks/useRICAAutoSave';
import RICAHistoryTab from '@/components/rica/RICAHistoryTab';
import RICADocumentValidator from '@/components/rica/RICADocumentValidator';
import UniversalExitTabs from '@/components/navigation/UniversalExitTabs';
import RICAPersonalInfo from '@/components/rica/RICAPersonalInfo';
import RICAAddressDetails from '@/components/rica/RICAAddressDetails';
import RICABankingDetails from '@/components/rica/RICABankingDetails';
import RICASIMDetails from '@/components/rica/RICASIMDetails';
import RICADeclaration from '@/components/rica/RICADeclaration';
import RICAConfirmation from '@/components/rica/RICAConfirmation';
import CustomerRegistration from '@/components/registration/CustomerRegistration';
import VendorRegistration from '@/components/VendorRegistration';
import AdminRegistration from '@/components/AdminRegistration';
import FieldWorkerRegistration from '@/components/fieldworker/FieldWorkerRegistration';
import { CollapsibleOneCardAccount } from '@/components/onecard/CollapsibleOneCardAccount';

type RegistrationStep = 'personal' | 'address' | 'banking' | 'sim' | 'declaration' | 'confirmation';

const RICARegistration = () => {
  const { toast } = useToast();
  const { currentUser, isAuthenticated } = useMobileAuth();
  const { userProfile } = useRegistrationGuard();
  const { loadExistingData, autoSaveDraft, submitRegistration, existingRegistration } = useRICAAutoSave();
  const [localExistingRegistration, setLocalExistingRegistration] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState<RegistrationStep>('personal');
  const [activeTab, setActiveTab] = useState('register');
  
  // Check URL parameters for initial tab
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');
    if (tabParam === 'history') {
      setActiveTab('history');
    }
  }, []);
  const [isRegistered, setIsRegistered] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState<'customer' | 'vendor' | 'admin' | 'fieldworker'>('customer');
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
    
    // Banking Information
    bankName: '',
    accountNumber: '',
    branchCode: '',
    
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
    { id: 'banking', title: 'Banking', icon: CreditCard, completed: false },
    { id: 'sim', title: 'SIM Details', icon: Phone, completed: false },
    { id: 'declaration', title: 'Declaration', icon: Shield, completed: false }
  ];

  const calculateProgress = () => {
    const stepIndex = steps.findIndex(step => step.id === currentStep);
    return ((stepIndex + 1) / steps.length) * 100;
  };

  const handleNext = () => {
    const stepOrder: RegistrationStep[] = ['personal', 'address', 'banking', 'sim', 'declaration', 'confirmation'];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1]);
    }
  };

  const handlePrevious = () => {
    const stepOrder: RegistrationStep[] = ['personal', 'address', 'banking', 'sim', 'declaration', 'confirmation'];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1]);
    }
  };

  const handleSubmit = async () => {
    console.log('Submit button clicked');
    console.log('Current user:', currentUser);
    console.log('Is authenticated:', isAuthenticated);
    console.log('Form data:', formData);
    
    if (!isAuthenticated || !currentUser) {
      // Auto-redirect to registration form
      setShowRegistrationForm(true);
      return;
    }
    
    const result = await submitRegistration(formData);
    console.log('Registration result:', result);
    
    if (result.success) {
      setCurrentStep('confirmation');
      setIsRegistered(true);
    }
  };

  const handleRegistrationComplete = () => {
    setShowRegistrationForm(false);
    // Refresh authentication state and stay on RICA tab
    toast({
      title: "Registration Complete!",
      description: "You can now proceed with your RICA registration.",
    });
  };

  // Auto-trigger registration modal when authentication is required for RICA
  useEffect(() => {
    // Only trigger if user is not authenticated AND no existing registration
    // This matches the "Authentication Required" state shown in the image
    const hasExistingReg = existingRegistration || localExistingRegistration;
    if (!isAuthenticated && !hasExistingReg && activeTab === 'register') {
      // Small delay to ensure UI is rendered before showing modal
      const timer = setTimeout(() => {
        setShowRegistrationForm(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, existingRegistration, localExistingRegistration, activeTab]);

  // Auto-save on form data changes
  useEffect(() => {
    if (isAuthenticated && Object.keys(formData).some(key => formData[key as keyof typeof formData])) {
      const timeoutId = setTimeout(() => {
        autoSaveDraft(formData);
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [formData, isAuthenticated, autoSaveDraft]);

  // Load existing data on component mount
  useEffect(() => {
    const loadData = async () => {
      const existingData = await loadExistingData();
      if (existingData && typeof existingData === 'object') {
        setFormData(prev => ({ ...prev, ...existingData }));
      }
      
      // Check for existing registration in localStorage
      if (isAuthenticated && currentUser) {
        const registrationKey = `rica_registration_${currentUser.id}_${currentUser.userType}`;
        const registrationData = localStorage.getItem(registrationKey);
        if (registrationData) {
          setLocalExistingRegistration(JSON.parse(registrationData));
        }
      }
    };
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated, loadExistingData, currentUser]);

  if (currentStep === 'confirmation') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 pb-32">
        <RICAConfirmation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pb-32">
      {/* Mobile-First Header */}
      <div className="bg-white shadow-sm border-b px-4 py-4 sm:py-6">
        <div className="max-w-md mx-auto">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            SIM Card Registration (RICA)
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Comply with South African law by registering your SIM card
          </p>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-4 sm:space-y-6">
        {/* Collapsible OneCard Account */}
        {isAuthenticated && currentUser && (
          <CollapsibleOneCardAccount 
            userData={currentUser}
            defaultCollapsed={true}
            className="mb-4"
          />
        )}

        {/* Mobile-Optimized User Greeting */}
        {isAuthenticated && currentUser && (
          <Card className="border-blue-200 bg-blue-50/30 animate-fade-in">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                    👋 Welcome, {currentUser.firstName || 'User'}!
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 truncate">
                    📱 {currentUser.registeredPhone || 'Phone not provided'}
                  </p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-blue-700">
                Ready to help you with SIM registration and compliance.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Mobile-First Tab Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-12 sm:h-auto">
            <TabsTrigger value="register" className="text-sm sm:text-base">
              Register SIM
            </TabsTrigger>
            <TabsTrigger value="history" className="text-sm sm:text-base">
              History & Status
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="register" className="space-y-4 sm:space-y-6 mt-4 sm:mt-6">
            {/* Mobile-Optimized Registration Status */}
            {!(existingRegistration || localExistingRegistration) && (
              <Card className="border-red-200 bg-red-50 animate-fade-in">
                <CardContent className="p-4 sm:p-6 text-center space-y-3 sm:space-y-4">
                  <div className="flex justify-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center">
                      <AlertCircle className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-base sm:text-lg font-semibold text-red-800">
                      ⚠️ Registration Required for WhatsApp Shopping
                    </h3>
                    <p className="text-sm text-red-600">
                      Complete RICA registration to comply with South African law
                    </p>
                    <div className="bg-red-100 rounded-lg p-3">
                      <p className="text-xs text-red-700 flex items-center justify-center gap-1">
                        <FileText className="w-3 h-3 flex-shrink-0" />
                        <span className="text-center">Your profile information is permanently saved for convenience</span>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {(existingRegistration || localExistingRegistration) && (
              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-green-800 mb-2">
                      ✅ RICA Registration Status: {(existingRegistration || localExistingRegistration)?.registration_status}
                    </h3>
                    <p className="text-sm text-green-600 mb-2">
                      Reference: {(existingRegistration || localExistingRegistration)?.reference_number}
                    </p>
                    <p className="text-sm text-green-600">
                      Your registration is being processed. Check the History tab for updates.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Mobile-First Progress Section - Only show if not registered */}
            {!(existingRegistration || localExistingRegistration) && (
              <Card className="border-blue-200 bg-blue-50/30 animate-fade-in">
                <CardHeader className="px-4 py-3 sm:px-6 sm:py-4">
                  <CardTitle className="text-base sm:text-lg text-blue-800">Registration Progress</CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6">
                  <div className="mb-4">
                    <div className="flex justify-between text-xs sm:text-sm text-blue-700 mb-2">
                      <span>Complete your RICA registration</span>
                      <span className="font-medium">{Math.round(calculateProgress())}%</span>
                    </div>
                    <Progress value={calculateProgress()} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {steps.map((step, index) => {
                      const isActive = step.id === currentStep;
                      const isCompleted = steps.findIndex(s => s.id === currentStep) > index;
                      
                      return (
                        <div key={step.id} className="flex items-center gap-2 p-2 rounded-lg transition-colors hover:bg-white/50">
                          {isCompleted ? (
                            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                          ) : isActive ? (
                            <step.icon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
                          ) : (
                            <step.icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                          )}
                          <span className={`text-xs sm:text-sm truncate ${
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
            )}

            {/* Modern RICA Document Validation */}
            {!(existingRegistration || localExistingRegistration) && (
              <div className="space-y-4">
                {/* AI-Powered Document Validation */}
                <RICADocumentValidator 
                  onValidationComplete={(results) => {
                    console.log('Document validation results:', results);
                    // Update form with extracted data
                     const validResults = results.filter(r => r.isValid);
                     if (validResults.length > 0) {
                       // Extract data from validated documents
                       validResults.forEach(result => {
                         const data = result.extractedData as any;
                         if (data && typeof data === 'object') {
                           if (data.idNumber) {
                             setFormData(prev => ({ ...prev, idNumber: data.idNumber }));
                           }
                           if (data.fullName) {
                             setFormData(prev => ({ ...prev, fullName: data.fullName }));
                           }
                           if (data.address) {
                             setFormData(prev => ({ ...prev, physicalAddress: data.address }));
                           }
                         }
                       });
                     }
                  }}
                />

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
                
                {currentStep === 'banking' && (
                  <RICABankingDetails 
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
            )}
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <RICAHistoryTab />
          </TabsContent>
        </Tabs>
      </div>

      {/* Registration Form Modal/Overlay */}
      {showRegistrationForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Divine Mobile Unified Form</h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowRegistrationForm(false)}
                >
                  ✕
                </Button>
              </div>
            </div>
            
            <div className="p-4">
              <div className="space-y-4 mb-6">
                <div className="text-center">
                  <AlertCircle className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Registration Required
                  </h3>
                  <p className="text-sm text-gray-600">
                    Please register first to access RICA services
                  </p>
                </div>
                
                <div className="grid gap-3">
                  <Button
                    onClick={() => setSelectedUserType('customer')}
                    variant={selectedUserType === 'customer' ? 'default' : 'outline'}
                    className="justify-start p-4 h-auto"
                  >
                    <div className="text-left">
                      <div className="font-medium">Customer</div>
                      <div className="text-xs opacity-75">Personal account for mobile services</div>
                    </div>
                  </Button>
                  
                  <Button
                    onClick={() => setSelectedUserType('vendor')}
                    variant={selectedUserType === 'vendor' ? 'default' : 'outline'}
                    className="justify-start p-4 h-auto"
                  >
                    <div className="text-left">
                      <div className="font-medium">Vendor</div>
                      <div className="text-xs opacity-75">Business account for selling services</div>
                    </div>
                  </Button>
                  
                  <Button
                    onClick={() => setSelectedUserType('admin')}
                    variant={selectedUserType === 'admin' ? 'default' : 'outline'}
                    className="justify-start p-4 h-auto"
                  >
                    <div className="text-left">
                      <div className="font-medium">Admin</div>
                      <div className="text-xs opacity-75">Administrative access and management</div>
                    </div>
                  </Button>
                  
                  <Button
                    onClick={() => setSelectedUserType('fieldworker')}
                    variant={selectedUserType === 'fieldworker' ? 'default' : 'outline'}
                    className="justify-start p-4 h-auto"
                  >
                    <div className="text-left">
                      <div className="font-medium">Field Workers</div>
                      <div className="text-xs opacity-75">Regional operations and customer registration</div>
                    </div>
                  </Button>
                </div>
              </div>
              
              {/* Selected Registration Form */}
              <div className="border-t pt-4">
                {selectedUserType === 'customer' && (
                  <CustomerRegistration />
                )}
                {selectedUserType === 'vendor' && (
                  <VendorRegistration />
                )}
                {selectedUserType === 'admin' && (
                  <AdminRegistration />
                )}
                {selectedUserType === 'fieldworker' && (
                  <FieldWorkerRegistration />
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Universal Exit Navigation */}
      <UniversalExitTabs 
        currentService="rica"
        variant="bottom"
        showServiceSwitcher={true}
      />
    </div>
  );
};

export default RICARegistration;