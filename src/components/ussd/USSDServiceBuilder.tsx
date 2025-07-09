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
  Code, 
  TreePine, 
  Settings, 
  TestTube, 
  Monitor, 
  Play, 
  Plus, 
  Trash2,
  Save,
  Upload,
  Download,
  Users,
  BarChart,
  Smartphone,
  Network,
  Zap
} from 'lucide-react';

interface USSDMenuNode {
  id: string;
  text: string;
  options: { key: string; label: string; action?: string; nextNode?: string }[];
  isTerminal: boolean;
  responseType: 'menu' | 'input' | 'confirmation' | 'end';
}

const USSDServiceBuilder = () => {
  const { ussdCodes, menuItems, createUSSDCode, createMenuItem, loading } = useUSSDData();
  const [activeTab, setActiveTab] = useState('codes');
  const [selectedCode, setSelectedCode] = useState<string>('');
  const [menuFlow, setMenuFlow] = useState<USSDMenuNode[]>([]);
  const [simulatorSession, setSimulatorSession] = useState<any>(null);

  // USSD Code Registration Form
  const [codeForm, setCodeForm] = useState<{
    code: string;
    description: string;
    status: 'active' | 'inactive';
  }>({
    code: '',
    description: '',
    status: 'active'
  });

  // Menu Builder State
  const [currentNode, setCurrentNode] = useState<USSDMenuNode>({
    id: 'root',
    text: 'Welcome to Divine Mobile\n1. Buy Airtime\n2. Check Balance\n3. Data Bundles\n4. Customer Support',
    options: [
      { key: '1', label: 'Buy Airtime', nextNode: 'airtime' },
      { key: '2', label: 'Check Balance', nextNode: 'balance' },
      { key: '3', label: 'Data Bundles', nextNode: 'data' },
      { key: '4', label: 'Customer Support', nextNode: 'support' }
    ],
    isTerminal: false,
    responseType: 'menu'
  });

  const handleCreateCode = async () => {
    try {
      const result = await createUSSDCode(codeForm);
      if (result) {
        toast.success('USSD Code registered successfully!');
        setCodeForm({
          code: '',
          description: '',
          status: 'active'
        });
      }
    } catch (error) {
      toast.error('Failed to register USSD code');
    }
  };

  const addMenuNode = () => {
    const newNode: USSDMenuNode = {
      id: `node_${Date.now()}`,
      text: 'Enter menu text here...',
      options: [],
      isTerminal: false,
      responseType: 'menu'
    };
    setMenuFlow([...menuFlow, newNode]);
  };

  const addOption = (nodeId: string) => {
    setMenuFlow(prev => prev.map(node => 
      node.id === nodeId 
        ? {
            ...node,
            options: [...node.options, { key: '', label: '', nextNode: '' }]
          }
        : node
    ));
  };

  const removeOption = (nodeId: string, optionIndex: number) => {
    setMenuFlow(prev => prev.map(node => 
      node.id === nodeId 
        ? {
            ...node,
            options: node.options.filter((_, index) => index !== optionIndex)
          }
        : node
    ));
  };

  const updateNodeText = (nodeId: string, text: string) => {
    setMenuFlow(prev => prev.map(node => 
      node.id === nodeId ? { ...node, text } : node
    ));
  };

  const updateOption = (nodeId: string, optionIndex: number, field: string, value: string) => {
    setMenuFlow(prev => prev.map(node => 
      node.id === nodeId 
        ? {
            ...node,
            options: node.options.map((option, index) => 
              index === optionIndex ? { ...option, [field]: value } : option
            )
          }
        : node
    ));
  };

  const exportMenuFlow = () => {
    const exportData = {
      ussdCode: selectedCode,
      menuFlow: menuFlow,
      exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ussd_flow_${selectedCode}_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const startSimulator = () => {
    setSimulatorSession({
      currentNode: 'root',
      sessionId: `sim_${Date.now()}`,
      userInputs: [],
      timestamp: new Date()
    });
    toast.success('USSD Simulator started');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Code className="w-6 h-6 mr-3 text-blue-500" />
            USSD Service Builder
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
              <TabsTrigger value="codes" className="flex items-center">
                <Smartphone className="w-4 h-4 mr-2" />
                Codes
              </TabsTrigger>
              <TabsTrigger value="builder" className="flex items-center">
                <TreePine className="w-4 h-4 mr-2" />
                Builder
              </TabsTrigger>
              <TabsTrigger value="simulator" className="flex items-center">
                <TestTube className="w-4 h-4 mr-2" />
                Simulator
              </TabsTrigger>
              <TabsTrigger value="deploy" className="flex items-center">
                <Upload className="w-4 h-4 mr-2" />
                Deploy
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center">
                <BarChart className="w-4 h-4 mr-2" />
                Analytics
              </TabsTrigger>
            </TabsList>

            {/* USSD Code Registration */}
            <TabsContent value="codes" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Register New USSD Code</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="code">USSD Code</Label>
                      <Input
                        id="code"
                        placeholder="*123# or *123*456#"
                        value={codeForm.code}
                        onChange={(e) => setCodeForm({...codeForm, code: e.target.value})}
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Input
                        id="description"
                        placeholder="Service description"
                        value={codeForm.description}
                        onChange={(e) => setCodeForm({...codeForm, description: e.target.value})}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="status"
                        checked={codeForm.status === 'active'}
                        onCheckedChange={(checked) => setCodeForm({...codeForm, status: checked ? 'active' : 'inactive'})}
                      />
                      <Label htmlFor="status">Active</Label>
                    </div>

                    <Button onClick={handleCreateCode} disabled={loading} className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Register USSD Code
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Registered USSD Codes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {ussdCodes.map((code) => (
                        <div key={code.id} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-mono text-lg font-semibold text-blue-600">
                                {code.code}
                              </div>
                              <div className="text-sm text-gray-600">{code.description}</div>
                              <div className="flex items-center space-x-2 mt-2">
                                <Badge variant={code.status === 'active' ? "default" : "secondary"}>
                                  {code.status === 'active' ? 'Active' : 'Inactive'}
                                </Badge>
                                <Badge variant="outline">USSD Code</Badge>
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedCode(code.code)}
                            >
                              <Settings className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Menu Flow Builder */}
            <TabsContent value="builder" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Menu Flow Designer</h3>
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={addMenuNode}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Node
                  </Button>
                  <Button variant="outline" onClick={exportMenuFlow}>
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Root Menu (Welcome Screen)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="root_text">Menu Text (max 182 characters)</Label>
                    <Textarea
                      id="root_text"
                      value={currentNode.text}
                      onChange={(e) => setCurrentNode({...currentNode, text: e.target.value})}
                      placeholder="Enter USSD menu text..."
                      className="min-h-[100px]"
                    />
                    <div className="text-sm text-gray-500 mt-1">
                      {currentNode.text.length}/182 characters
                    </div>
                  </div>

                  <div>
                    <Label>Menu Options</Label>
                    <div className="space-y-3 mt-2">
                      {currentNode.options.map((option, index) => (
                        <div key={index} className="flex space-x-2">
                          <Input
                            placeholder="Key (1-9)"
                            value={option.key}
                            onChange={(e) => updateOption('root', index, 'key', e.target.value)}
                            className="w-20"
                          />
                          <Input
                            placeholder="Option label"
                            value={option.label}
                            onChange={(e) => updateOption('root', index, 'label', e.target.value)}
                            className="flex-1"
                          />
                          <Input
                            placeholder="Next node ID"
                            value={option.nextNode || ''}
                            onChange={(e) => updateOption('root', index, 'nextNode', e.target.value)}
                            className="w-32"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeOption('root', index)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        onClick={() => addOption('root')}
                        className="w-full"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Option
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Menu Nodes */}
              {menuFlow.map((node) => (
                <Card key={node.id}>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>Menu Node: {node.id}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setMenuFlow(prev => prev.filter(n => n.id !== node.id))}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Menu Text</Label>
                      <Textarea
                        value={node.text}
                        onChange={(e) => updateNodeText(node.id, e.target.value)}
                        placeholder="Enter menu text..."
                        className="min-h-[80px]"
                      />
                    </div>

                    <div>
                      <Label>Response Type</Label>
                      <Select
                        value={node.responseType}
                        onValueChange={(value) => setMenuFlow(prev => prev.map(n => 
                          n.id === node.id ? {...n, responseType: value as any} : n
                        ))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="menu">Menu Options</SelectItem>
                          <SelectItem value="input">User Input Required</SelectItem>
                          <SelectItem value="confirmation">Confirmation</SelectItem>
                          <SelectItem value="end">End Session</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {node.responseType === 'menu' && (
                      <div>
                        <Label>Options</Label>
                        <div className="space-y-2 mt-2">
                          {node.options.map((option, index) => (
                            <div key={index} className="flex space-x-2">
                              <Input
                                placeholder="Key"
                                value={option.key}
                                onChange={(e) => updateOption(node.id, index, 'key', e.target.value)}
                                className="w-20"
                              />
                              <Input
                                placeholder="Label"
                                value={option.label}
                                onChange={(e) => updateOption(node.id, index, 'label', e.target.value)}
                                className="flex-1"
                              />
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => removeOption(node.id, index)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                          <Button
                            variant="outline"
                            onClick={() => addOption(node.id)}
                            className="w-full"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Option
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* USSD Simulator */}
            <TabsContent value="simulator" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>USSD Simulator</span>
                    <Button onClick={startSimulator} disabled={!selectedCode}>
                      <Play className="w-4 h-4 mr-2" />
                      Start Simulation
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <Label>Select USSD Code to Test</Label>
                      <Select value={selectedCode} onValueChange={setSelectedCode}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a USSD code" />
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

                    <div>
                      <Label>Phone Number (for testing)</Label>
                      <Input placeholder="+27123456789" />
                    </div>
                  </div>

                  {simulatorSession && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold mb-3">Simulation Session</h4>
                      <div className="bg-black text-green-400 p-4 rounded font-mono text-sm">
                        <div>Session ID: {simulatorSession.sessionId}</div>
                        <div>USSD Code: {selectedCode}</div>
                        <div className="mt-3 border-t border-gray-600 pt-3">
                          {currentNode.text}
                        </div>
                        <div className="mt-3">
                          <Input
                            placeholder="Enter your choice..."
                            className="bg-black border-gray-600 text-green-400"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Deployment */}
            <TabsContent value="deploy" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Deployment Configuration</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Environment</Label>
                      <Select defaultValue="staging">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="staging">Staging</SelectItem>
                          <SelectItem value="production">Production</SelectItem>
                          <SelectItem value="testing">Testing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Network Operators</Label>
                      <div className="space-y-2 mt-2">
                        {['Divine Mobile', 'MTN', 'Vodacom', 'Cell C', 'Telkom'].map((network) => (
                          <div key={network} className="flex items-center space-x-2">
                            <Switch id={network} />
                            <Label htmlFor={network}>{network}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label>Load Balancing</Label>
                      <Select defaultValue="round_robin">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="round_robin">Round Robin</SelectItem>
                          <SelectItem value="least_connections">Least Connections</SelectItem>
                          <SelectItem value="ip_hash">IP Hash</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button className="w-full">
                      <Upload className="w-4 h-4 mr-2" />
                      Deploy USSD Service
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Service Health</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Service Status</span>
                        <Badge className="bg-green-500">Running</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Active Sessions</span>
                        <span className="font-semibold">1,234</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Success Rate</span>
                        <span className="font-semibold text-green-600">99.8%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Average Response Time</span>
                        <span className="font-semibold">120ms</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Daily Requests</span>
                        <span className="font-semibold">45,678</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Analytics */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <Users className="h-8 w-8 text-blue-500" />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500">Total Users</p>
                        <p className="text-2xl font-bold">12,345</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <Network className="h-8 w-8 text-green-500" />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500">Sessions Today</p>
                        <p className="text-2xl font-bold">1,234</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <Zap className="h-8 w-8 text-yellow-500" />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500">Success Rate</p>
                        <p className="text-2xl font-bold">99.8%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <Monitor className="h-8 w-8 text-purple-500" />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500">Avg Response</p>
                        <p className="text-2xl font-bold">120ms</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Usage Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    Analytics charts would be displayed here
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default USSDServiceBuilder;