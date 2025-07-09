import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useUSSDData } from '@/hooks/useUSSDData';
import { toast } from 'sonner';
import { 
  TestTube, 
  Play, 
  Pause, 
  RotateCcw, 
  Save, 
  Download, 
  Upload,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  Smartphone,
  MessageSquare,
  Settings,
  BarChart3,
  Activity,
  Zap
} from 'lucide-react';

interface TestCase {
  id: string;
  name: string;
  description: string;
  ussdCode: string;
  scenario: TestStep[];
  expectedOutcome: string;
  status: 'pending' | 'running' | 'passed' | 'failed';
  lastRun?: string;
  duration?: number;
}

interface TestStep {
  id: string;
  action: 'dial' | 'input' | 'wait' | 'assert';
  value: string;
  expectedResponse?: string;
  timeout?: number;
}

interface TestExecution {
  testCaseId: string;
  startTime: string;
  endTime?: string;
  status: 'running' | 'passed' | 'failed';
  steps: TestStepResult[];
  errorMessage?: string;
}

interface TestStepResult {
  stepId: string;
  status: 'pending' | 'running' | 'passed' | 'failed';
  actualResponse?: string;
  expectedResponse?: string;
  timestamp: string;
  error?: string;
}

const USSDTestingSuite = () => {
  const { ussdCodes } = useUSSDData();
  const [activeTab, setActiveTab] = useState('cases');
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [currentExecution, setCurrentExecution] = useState<TestExecution | null>(null);
  const [simulatorPhone, setSimulatorPhone] = useState('+27123456789');
  const [simulatorResponse, setSimulatorResponse] = useState('');
  const [simulatorLog, setSimulatorLog] = useState<string[]>([]);

  // Mock test cases
  useEffect(() => {
    const mockTestCases: TestCase[] = [
      {
        id: 'test_1',
        name: 'Balance Inquiry Flow',
        description: 'Test complete balance inquiry process',
        ussdCode: '*101#',
        scenario: [
          { id: 's1', action: 'dial', value: '*101#' },
          { id: 's2', action: 'assert', value: 'Welcome to Divine Mobile', expectedResponse: 'Welcome to Divine Mobile' },
          { id: 's3', action: 'input', value: '1', expectedResponse: 'Enter PIN:' },
          { id: 's4', action: 'input', value: '1234', expectedResponse: 'Your balance is R' }
        ],
        expectedOutcome: 'Should display current balance',
        status: 'pending'
      },
      {
        id: 'test_2',
        name: 'Airtime Purchase',
        description: 'Test R50 airtime purchase flow',
        ussdCode: '*102#',
        scenario: [
          { id: 's1', action: 'dial', value: '*102#' },
          { id: 's2', action: 'input', value: '1', expectedResponse: 'Select amount:' },
          { id: 's3', action: 'input', value: '3', expectedResponse: 'R50 selected' },
          { id: 's4', action: 'input', value: '1', expectedResponse: 'Purchase successful' }
        ],
        expectedOutcome: 'Should complete airtime purchase',
        status: 'pending'
      }
    ];
    setTestCases(mockTestCases);
  }, []);

  const [newTestCase, setNewTestCase] = useState<Partial<TestCase>>({
    name: '',
    description: '',
    ussdCode: '',
    scenario: [],
    expectedOutcome: ''
  });

  const addTestStep = () => {
    const newStep: TestStep = {
      id: `step_${Date.now()}`,
      action: 'dial',
      value: '',
      expectedResponse: '',
      timeout: 30
    };
    setNewTestCase(prev => ({
      ...prev,
      scenario: [...(prev.scenario || []), newStep]
    }));
  };

  const updateTestStep = (stepId: string, field: keyof TestStep, value: any) => {
    setNewTestCase(prev => ({
      ...prev,
      scenario: prev.scenario?.map(step => 
        step.id === stepId ? { ...step, [field]: value } : step
      ) || []
    }));
  };

  const removeTestStep = (stepId: string) => {
    setNewTestCase(prev => ({
      ...prev,
      scenario: prev.scenario?.filter(step => step.id !== stepId) || []
    }));
  };

  const saveTestCase = () => {
    if (!newTestCase.name || !newTestCase.ussdCode) {
      toast.error('Please fill in required fields');
      return;
    }

    const testCase: TestCase = {
      id: `test_${Date.now()}`,
      name: newTestCase.name!,
      description: newTestCase.description!,
      ussdCode: newTestCase.ussdCode!,
      scenario: newTestCase.scenario!,
      expectedOutcome: newTestCase.expectedOutcome!,
      status: 'pending'
    };

    setTestCases(prev => [...prev, testCase]);
    setNewTestCase({
      name: '',
      description: '',
      ussdCode: '',
      scenario: [],
      expectedOutcome: ''
    });
    toast.success('Test case saved successfully');
  };

  const runTestCase = async (testCase: TestCase) => {
    const execution: TestExecution = {
      testCaseId: testCase.id,
      startTime: new Date().toISOString(),
      status: 'running',
      steps: testCase.scenario.map(step => ({
        stepId: step.id,
        status: 'pending',
        timestamp: new Date().toISOString()
      }))
    };

    setCurrentExecution(execution);
    setTestCases(prev => prev.map(tc => 
      tc.id === testCase.id ? { ...tc, status: 'running' } : tc
    ));

    // Simulate test execution
    for (let i = 0; i < testCase.scenario.length; i++) {
      const step = testCase.scenario[i];
      
      // Update step status to running
      setCurrentExecution(prev => prev ? {
        ...prev,
        steps: prev.steps.map(s => 
          s.stepId === step.id ? { ...s, status: 'running' } : s
        )
      } : null);

      // Simulate step execution
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock response based on step
      const mockResponse = getMockResponse(step);
      const passed = step.expectedResponse ? mockResponse.includes(step.expectedResponse) : true;

      // Update step result
      setCurrentExecution(prev => prev ? {
        ...prev,
        steps: prev.steps.map(s => 
          s.stepId === step.id ? {
            ...s,
            status: passed ? 'passed' : 'failed',
            actualResponse: mockResponse,
            expectedResponse: step.expectedResponse
          } : s
        )
      } : null);

      if (!passed) {
        // Test failed
        setCurrentExecution(prev => prev ? {
          ...prev,
          status: 'failed',
          endTime: new Date().toISOString(),
          errorMessage: `Step "${step.value}" failed`
        } : null);
        setTestCases(prev => prev.map(tc => 
          tc.id === testCase.id ? { 
            ...tc, 
            status: 'failed', 
            lastRun: new Date().toISOString(),
            duration: Date.now() - new Date(execution.startTime).getTime()
          } : tc
        ));
        toast.error(`Test case "${testCase.name}" failed`);
        return;
      }
    }

    // All steps passed
    setCurrentExecution(prev => prev ? {
      ...prev,
      status: 'passed',
      endTime: new Date().toISOString()
    } : null);
    setTestCases(prev => prev.map(tc => 
      tc.id === testCase.id ? { 
        ...tc, 
        status: 'passed', 
        lastRun: new Date().toISOString(),
        duration: Date.now() - new Date(execution.startTime).getTime()
      } : tc
    ));
    toast.success(`Test case "${testCase.name}" passed`);
  };

  const getMockResponse = (step: TestStep): string => {
    // Mock responses based on step actions
    switch (step.action) {
      case 'dial':
        return 'Welcome to Divine Mobile\n1. Buy Airtime\n2. Check Balance\n3. Data Bundles';
      case 'input':
        if (step.value === '1') return 'Enter PIN:';
        if (step.value === '2') return 'Your balance is R125.50';
        if (step.value === '1234') return 'Your balance is R125.50';
        return 'Option selected';
      default:
        return 'Response received';
    }
  };

  const runAllTests = async () => {
    for (const testCase of testCases) {
      await runTestCase(testCase);
      await new Promise(resolve => setTimeout(resolve, 500)); // Brief pause between tests
    }
  };

  const exportTestResults = () => {
    const results = {
      timestamp: new Date().toISOString(),
      testCases: testCases.map(tc => ({
        name: tc.name,
        status: tc.status,
        lastRun: tc.lastRun,
        duration: tc.duration
      })),
      execution: currentExecution
    };

    const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ussd_test_results_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'running':
        return <Activity className="w-4 h-4 text-blue-500 animate-spin" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed':
        return 'bg-green-500';
      case 'failed':
        return 'bg-red-500';
      case 'running':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <TestTube className="w-6 h-6 mr-3 text-purple-500" />
              USSD Testing Suite
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={runAllTests}>
                <Play className="w-4 h-4 mr-2" />
                Run All Tests
              </Button>
              <Button variant="outline" onClick={exportTestResults}>
                <Download className="w-4 h-4 mr-2" />
                Export Results
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="cases">Test Cases</TabsTrigger>
              <TabsTrigger value="create">Create Test</TabsTrigger>
              <TabsTrigger value="simulator">Simulator</TabsTrigger>
              <TabsTrigger value="results">Results</TabsTrigger>
            </TabsList>

            {/* Test Cases Tab */}
            <TabsContent value="cases" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center">
                      <TestTube className="h-8 w-8 text-purple-500" />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-500">Total Tests</p>
                        <p className="text-2xl font-bold">{testCases.length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center">
                      <CheckCircle className="h-8 w-8 text-green-500" />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-500">Passed</p>
                        <p className="text-2xl font-bold">
                          {testCases.filter(tc => tc.status === 'passed').length}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center">
                      <XCircle className="h-8 w-8 text-red-500" />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-500">Failed</p>
                        <p className="text-2xl font-bold">
                          {testCases.filter(tc => tc.status === 'failed').length}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-3">
                {testCases.map((testCase) => (
                  <Card key={testCase.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          {getStatusIcon(testCase.status)}
                          <div>
                            <div className="font-semibold">{testCase.name}</div>
                            <div className="text-sm text-gray-500">
                              {testCase.ussdCode} • {testCase.scenario.length} steps
                            </div>
                            <div className="text-sm text-gray-600">{testCase.description}</div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          <div className="text-right text-sm">
                            <div className="text-gray-500">
                              {testCase.lastRun ? 'Last Run' : 'Never Run'}
                            </div>
                            {testCase.lastRun && (
                              <div className="font-semibold">
                                {new Date(testCase.lastRun).toLocaleDateString()}
                              </div>
                            )}
                            {testCase.duration && (
                              <div className="text-xs text-gray-500">
                                {testCase.duration}ms
                              </div>
                            )}
                          </div>

                          <Badge className={getStatusColor(testCase.status)}>
                            {testCase.status.toUpperCase()}
                          </Badge>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => runTestCase(testCase)}
                            disabled={testCase.status === 'running'}
                          >
                            <Play className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Create Test Tab */}
            <TabsContent value="create" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Create New Test Case</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="test_name">Test Name</Label>
                      <Input
                        id="test_name"
                        value={newTestCase.name || ''}
                        onChange={(e) => setNewTestCase({...newTestCase, name: e.target.value})}
                        placeholder="e.g., Balance Inquiry Test"
                      />
                    </div>

                    <div>
                      <Label htmlFor="ussd_code">USSD Code</Label>
                      <Select value={newTestCase.ussdCode || ''} onValueChange={(value) => setNewTestCase({...newTestCase, ussdCode: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select USSD code" />
                        </SelectTrigger>
                        <SelectContent>
                          {ussdCodes.map((code) => (
                            <SelectItem key={code.id} value={code.code}>
                              {code.code} - {code.description}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newTestCase.description || ''}
                      onChange={(e) => setNewTestCase({...newTestCase, description: e.target.value})}
                      placeholder="Describe what this test case validates..."
                    />
                  </div>

                  <div>
                    <Label htmlFor="expected_outcome">Expected Outcome</Label>
                    <Input
                      id="expected_outcome"
                      value={newTestCase.expectedOutcome || ''}
                      onChange={(e) => setNewTestCase({...newTestCase, expectedOutcome: e.target.value})}
                      placeholder="Describe the expected result..."
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <Label>Test Steps</Label>
                      <Button variant="outline" onClick={addTestStep}>
                        Add Step
                      </Button>
                    </div>

                    <div className="space-y-3">
                      {(newTestCase.scenario || []).map((step, index) => (
                        <Card key={step.id}>
                          <CardContent className="p-4">
                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
                              <div>
                                <Label>Action</Label>
                                <Select value={step.action} onValueChange={(value) => updateTestStep(step.id, 'action', value)}>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="dial">Dial</SelectItem>
                                    <SelectItem value="input">Input</SelectItem>
                                    <SelectItem value="wait">Wait</SelectItem>
                                    <SelectItem value="assert">Assert</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              <div>
                                <Label>Value</Label>
                                <Input
                                  value={step.value}
                                  onChange={(e) => updateTestStep(step.id, 'value', e.target.value)}
                                  placeholder="Enter value..."
                                />
                              </div>

                              <div>
                                <Label>Expected Response</Label>
                                <Input
                                  value={step.expectedResponse || ''}
                                  onChange={(e) => updateTestStep(step.id, 'expectedResponse', e.target.value)}
                                  placeholder="Expected response..."
                                />
                              </div>

                              <div className="flex items-end">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => removeTestStep(step.id)}
                                  className="w-full"
                                >
                                  Remove
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <Button onClick={saveTestCase} className="w-full">
                    <Save className="w-4 h-4 mr-2" />
                    Save Test Case
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Simulator Tab */}
            <TabsContent value="simulator" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>USSD Simulator</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Phone Number</Label>
                      <Input
                        value={simulatorPhone}
                        onChange={(e) => setSimulatorPhone(e.target.value)}
                        placeholder="+27123456789"
                      />
                    </div>

                    <div>
                      <Label>USSD Code</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select USSD code to test" />
                        </SelectTrigger>
                        <SelectContent>
                          {ussdCodes.map((code) => (
                            <SelectItem key={code.id} value={code.code}>
                              {code.code} - {code.description}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <Button className="w-full">
                      <Smartphone className="w-4 h-4 mr-2" />
                      Start USSD Session
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Session Log</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-black text-green-400 p-4 rounded font-mono text-sm min-h-[300px]">
                      <div>USSD Simulator - Divine Mobile</div>
                      <div>Phone: {simulatorPhone}</div>
                      <div className="border-t border-gray-600 mt-2 pt-2">
                        {simulatorLog.length === 0 ? (
                          <div className="text-gray-500">No session active</div>
                        ) : (
                          simulatorLog.map((log, index) => (
                            <div key={index}>{log}</div>
                          ))
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Results Tab */}
            <TabsContent value="results" className="space-y-6">
              {currentExecution ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Current Test Execution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Test Case ID:</span>
                        <span className="font-mono">{currentExecution.testCaseId}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Status:</span>
                        <Badge className={getStatusColor(currentExecution.status)}>
                          {currentExecution.status.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Start Time:</span>
                        <span>{new Date(currentExecution.startTime).toLocaleString()}</span>
                      </div>
                      {currentExecution.endTime && (
                        <div className="flex justify-between items-center">
                          <span>End Time:</span>
                          <span>{new Date(currentExecution.endTime).toLocaleString()}</span>
                        </div>
                      )}

                      <div>
                        <Label>Step Results</Label>
                        <div className="space-y-2 mt-2">
                          {currentExecution.steps.map((stepResult, index) => (
                            <Card key={stepResult.stepId}>
                              <CardContent className="p-3">
                                <div className="flex justify-between items-center">
                                  <span>Step {index + 1}</span>
                                  {getStatusIcon(stepResult.status)}
                                </div>
                                {stepResult.actualResponse && (
                                  <div className="text-sm text-gray-600 mt-1">
                                    Response: {stepResult.actualResponse}
                                  </div>
                                )}
                                {stepResult.error && (
                                  <div className="text-sm text-red-600 mt-1">
                                    Error: {stepResult.error}
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center text-gray-500">
                    No test execution in progress
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default USSDTestingSuite;