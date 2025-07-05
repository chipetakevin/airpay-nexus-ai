import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePermissions } from '@/hooks/usePermissions';
import { 
  BookOpen, 
  Bell, 
  Users, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Globe,
  Download,
  Play,
  FileText
} from 'lucide-react';
import { cn } from '@/lib/utils';

// South African languages supported
const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'zu', name: 'isiZulu', nativeName: 'isiZulu' },
  { code: 'xh', name: 'isiXhosa', nativeName: 'isiXhosa' },
  { code: 'af', name: 'Afrikaans', nativeName: 'Afrikaans' },
  { code: 'st', name: 'Sesotho', nativeName: 'Sesotho' },
  { code: 'tn', name: 'Setswana', nativeName: 'Setswana' },
  { code: 'nso', name: 'Sepedi', nativeName: 'Sepedi' },
  { code: 'ts', name: 'Xitsonga', nativeName: 'Xitsonga' },
  { code: 've', name: 'Tshivenda', nativeName: 'Tshivenda' },
  { code: 'ss', name: 'siSwati', nativeName: 'siSwati' },
  { code: 'nr', name: 'isiNdebele', nativeName: 'isiNdebele' }
];

const TRAINING_MODULES = [
  {
    id: 'intro-field-contractor',
    title: 'Introduction to Field Contractor Role',
    category: 'Core Training',
    description: 'Responsibilities, code of conduct, and compliance overview',
    duration: '45 min',
    type: 'video',
    priority: 'high',
    mandatory: true
  },
  {
    id: 'data-extraction-tool',
    title: 'Using the Data Extraction Tool',
    category: 'Core Training',
    description: 'Step-by-step guides, video tutorials, and troubleshooting',
    duration: '60 min',
    type: 'interactive',
    priority: 'high',
    mandatory: true
  },
  {
    id: 'ict-cybersecurity',
    title: 'ICT and Cybersecurity Policy',
    category: 'Compliance',
    description: 'Secure data handling, device security, and privacy best practices',
    duration: '30 min',
    type: 'document',
    priority: 'high',
    mandatory: true
  },
  {
    id: 'health-safety',
    title: 'Health & Safety in the Field',
    category: 'Safety',
    description: 'Personal safety, emergency procedures, and reporting incidents',
    duration: '40 min',
    type: 'video',
    priority: 'high',
    mandatory: true
  },
  {
    id: 'customer-interaction',
    title: 'Customer Interaction & Communication',
    category: 'Communication',
    description: 'Professional conduct, language etiquette, and conflict resolution',
    duration: '35 min',
    type: 'interactive',
    priority: 'medium',
    mandatory: false
  },
  {
    id: 'compliance-regulatory',
    title: 'Compliance and Regulatory Training',
    category: 'Compliance',
    description: 'POPIA, RICA, and other relevant South African regulations',
    duration: '50 min',
    type: 'document',
    priority: 'high',
    mandatory: true
  }
];

export const TrainingManagementSystem: React.FC = () => {
  const { hasRole, currentUser } = usePermissions();
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [activeTab, setActiveTab] = useState('modules');
  const [contractorProgress, setContractorProgress] = useState<any[]>([]);
  const [notificationsSent, setNotificationsSent] = useState(0);

  const isAdmin = hasRole(['admin', 'manager']);
  const isContractor = hasRole('contractor') || currentUser?.userType === 'vendor';

  useEffect(() => {
    // Load contractor progress data
    loadContractorProgress();
  }, []);

  const loadContractorProgress = async () => {
    // Mock progress data - in real implementation, fetch from API
    const mockProgress = TRAINING_MODULES.map(module => ({
      moduleId: module.id,
      userId: currentUser?.id,
      status: Math.random() > 0.5 ? 'completed' : Math.random() > 0.3 ? 'in_progress' : 'not_started',
      completedAt: Math.random() > 0.5 ? new Date().toISOString() : null,
      progress: Math.floor(Math.random() * 100)
    }));
    setContractorProgress(mockProgress);
  };

  const getModuleProgress = (moduleId: string) => {
    return contractorProgress.find(p => p.moduleId === moduleId) || { 
      status: 'not_started', 
      progress: 0 
    };
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-toggle-enabled" />;
      case 'in_progress':
        return <Clock className="h-4 w-4 text-feature-pending-text" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-toggle-disabled" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-feature-enabled-bg border-feature-enabled-border text-feature-enabled-text';
      case 'in_progress':
        return 'bg-feature-pending-bg border-feature-pending-border text-feature-pending-text';
      default:
        return 'bg-feature-disabled-bg border-feature-disabled-border text-feature-disabled-text';
    }
  };

  const sendTrainingNotification = async (moduleId?: string) => {
    // Mock notification sending
    console.log('Sending training notification:', moduleId || 'all modules');
    setNotificationsSent(prev => prev + 1);
    
    // In real implementation, would call API to send push notifications
    // await supabase.functions.invoke('send-training-notification', {
    //   body: { moduleId, recipients: 'all_contractors' }
    // });
  };

  const categories = [...new Set(TRAINING_MODULES.map(m => m.category))];

  if (!isAdmin && !isContractor) {
    return (
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Access denied. This section is for contractors and administrators only.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center space-x-2">
            <BookOpen className="h-6 w-6" />
            <span>Training Management</span>
          </h1>
          <p className="text-muted-foreground">
            {isAdmin ? 'Manage contractor training programs and notifications' : 'Access your training curriculum and track progress'}
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Language Selector */}
          <div className="flex items-center space-x-2">
            <Globe className="h-4 w-4" />
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SUPPORTED_LANGUAGES.map(lang => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.nativeName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {isAdmin && (
            <Button 
              onClick={() => sendTrainingNotification()}
              className="bg-primary hover:bg-primary/90"
            >
              <Bell className="h-4 w-4 mr-2" />
              Notify All Contractors
            </Button>
          )}
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="modules" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Training Modules</span>
          </TabsTrigger>
          <TabsTrigger value="progress" className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            <span className="hidden sm:inline">Progress</span>
          </TabsTrigger>
          {isAdmin && (
            <>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                <span className="hidden sm:inline">Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Analytics</span>
              </TabsTrigger>
            </>
          )}
        </TabsList>

        <TabsContent value="modules" className="mt-6">
          <div className="space-y-6">
            {categories.map(category => {
              const categoryModules = TRAINING_MODULES.filter(m => m.category === category);
              const completedModules = categoryModules.filter(m => {
                const progress = getModuleProgress(m.id);
                return progress.status === 'completed';
              });

              return (
                <Card key={category}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{category}</span>
                      <Badge variant="outline">
                        {completedModules.length}/{categoryModules.length} completed
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {categoryModules.map(module => {
                        const progress = getModuleProgress(module.id);
                        
                        return (
                          <Card key={module.id} className={cn("transition-all", getStatusColor(progress.status))}>
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center space-x-2">
                                  {getStatusIcon(progress.status)}
                                  <div>
                                    <h4 className="font-medium">{module.title}</h4>
                                    <p className="text-xs text-muted-foreground">{module.duration}</p>
                                  </div>
                                </div>
                                {module.mandatory && (
                                  <Badge variant="destructive" className="text-xs">
                                    Required
                                  </Badge>
                                )}
                              </div>
                              
                              <p className="text-sm mb-3">{module.description}</p>
                              
                              {progress.status === 'in_progress' && (
                                <div className="mb-3">
                                  <Progress value={progress.progress} className="h-2" />
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {progress.progress}% complete
                                  </p>
                                </div>
                              )}
                              
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  {module.type === 'video' && <Play className="h-3 w-3" />}
                                  {module.type === 'document' && <FileText className="h-3 w-3" />}
                                  {module.type === 'interactive' && <BookOpen className="h-3 w-3" />}
                                  <span className="text-xs capitalize">{module.type}</span>
                                </div>
                                
                                <div className="flex space-x-1">
                                  <Button size="sm" variant="outline" className="h-7 px-2 text-xs">
                                    <Download className="h-3 w-3 mr-1" />
                                    Download
                                  </Button>
                                  {isAdmin && (
                                    <Button 
                                      size="sm" 
                                      variant="outline" 
                                      className="h-7 px-2 text-xs"
                                      onClick={() => sendTrainingNotification(module.id)}
                                    >
                                      <Bell className="h-3 w-3" />
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="progress" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="bg-feature-enabled-bg border-feature-enabled-border">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-feature-enabled-text">
                  {contractorProgress.filter(p => p.status === 'completed').length}
                </div>
                <div className="text-sm text-feature-enabled-text">Completed</div>
              </CardContent>
            </Card>
            <Card className="bg-feature-pending-bg border-feature-pending-border">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-feature-pending-text">
                  {contractorProgress.filter(p => p.status === 'in_progress').length}
                </div>
                <div className="text-sm text-feature-pending-text">In Progress</div>
              </CardContent>
            </Card>
            <Card className="bg-feature-disabled-bg border-feature-disabled-border">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-feature-disabled-text">
                  {contractorProgress.filter(p => p.status === 'not_started').length}
                </div>
                <div className="text-sm text-feature-disabled-text">Not Started</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Training Progress Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {TRAINING_MODULES.map(module => {
                  const progress = getModuleProgress(module.id);
                  const completionRate = progress.status === 'completed' ? 100 : 
                                       progress.status === 'in_progress' ? progress.progress : 0;
                  
                  return (
                    <div key={module.id} className="flex items-center space-x-4">
                      {getStatusIcon(progress.status)}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium">{module.title}</span>
                          <span className="text-sm text-muted-foreground">{completionRate}%</span>
                        </div>
                        <Progress value={completionRate} className="h-2" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {isAdmin && (
          <>
            <TabsContent value="notifications" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Training Notifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Alert>
                      <Bell className="h-4 w-4" />
                      <AlertDescription>
                        {notificationsSent} notifications sent today. 
                        Notifications are delivered via push, email, and SMS.
                      </AlertDescription>
                    </Alert>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button 
                        className="h-20 flex-col"
                        onClick={() => sendTrainingNotification()}
                      >
                        <Bell className="h-6 w-6 mb-2" />
                        Notify All Contractors
                      </Button>
                      <Button 
                        variant="outline"
                        className="h-20 flex-col"
                        onClick={() => console.log('Send reminder notifications')}
                      >
                        <Clock className="h-6 w-6 mb-2" />
                        Send Reminders
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold">{TRAINING_MODULES.length}</div>
                    <div className="text-sm text-muted-foreground">Total Modules</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-toggle-enabled">85%</div>
                    <div className="text-sm text-muted-foreground">Completion Rate</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-feature-pending-text">12</div>
                    <div className="text-sm text-muted-foreground">Overdue Contractors</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold">{notificationsSent}</div>
                    <div className="text-sm text-muted-foreground">Notifications Sent</div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  );
};