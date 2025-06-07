
import React, { useState } from 'react';
import { Smartphone, Send, History, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const USSDManagement = () => {
  const [ussdCode, setUssdCode] = useState('');
  const [selectedNetwork, setSelectedNetwork] = useState('devine-mobile');

  const networks = [
    { id: 'devine-mobile', name: 'Devine Mobile', color: 'border-green-500' },
    { id: 'mtn', name: 'MTN', color: 'border-yellow-500' },
    { id: 'vodacom', name: 'Vodacom', color: 'border-red-500' },
    { id: 'telkom', name: 'Telkom', color: 'border-blue-500' }
  ];

  const commonCodes = [
    { code: '*101#', description: 'Check Balance', network: 'devine-mobile' },
    { code: '*102#', description: 'Buy Airtime', network: 'devine-mobile' },
    { code: '*103#', description: 'Buy Data', network: 'devine-mobile' },
    { code: '*136#', description: 'Check Balance', network: 'vodacom' },
    { code: '*141#', description: 'Please Call Me', network: 'mtn' }
  ];

  const handleSendUSSD = () => {
    if (ussdCode.trim()) {
      console.log(`Sending USSD code: ${ussdCode} to ${selectedNetwork}`);
      // Here you would implement actual USSD sending logic
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Smartphone className="w-6 h-6 mr-3 text-orange-500" />
            USSD Code Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="send" className="w-full">
            <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 mb-6">
              <TabsTrigger value="send" className="flex items-center">
                <Send className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Send Code</span>
                <span className="sm:hidden">Send</span>
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center">
                <History className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">History</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center">
                <Settings className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Settings</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="send" className="space-y-6">
              {/* Network Selection */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Select Network</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {networks.map((network) => (
                    <button
                      key={network.id}
                      onClick={() => setSelectedNetwork(network.id)}
                      className={`p-4 border-2 rounded-lg transition-all ${
                        selectedNetwork === network.id
                          ? `${network.color} bg-gray-50`
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-semibold text-center">{network.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* USSD Input */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Enter USSD Code</h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input
                    placeholder="e.g., *101#"
                    value={ussdCode}
                    onChange={(e) => setUssdCode(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleSendUSSD} className="w-full sm:w-auto">
                    Send USSD
                  </Button>
                </div>
              </div>

              {/* Common Codes */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Common USSD Codes</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {commonCodes.map((code, index) => (
                    <div
                      key={index}
                      className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => setUssdCode(code.code)}
                    >
                      <div className="font-mono text-lg font-semibold text-blue-600">
                        {code.code}
                      </div>
                      <div className="text-sm text-gray-600">{code.description}</div>
                      <div className="text-xs text-gray-500 capitalize">
                        {code.network.replace('-', ' ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              <h3 className="text-lg font-semibold">Recent USSD Transactions</h3>
              <div className="space-y-2">
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-mono">*101#</span>
                    <span className="text-sm text-gray-500">2 minutes ago</span>
                  </div>
                  <div className="text-sm text-gray-600">Balance inquiry - Devine Mobile</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-mono">*102*50#</span>
                    <span className="text-sm text-gray-500">1 hour ago</span>
                  </div>
                  <div className="text-sm text-gray-600">R50 Airtime purchase - Devine Mobile</div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <h3 className="text-lg font-semibold">USSD Settings</h3>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Default Network</h4>
                  <p className="text-sm text-gray-600 mb-3">Set your preferred network for USSD codes</p>
                  <select className="w-full p-2 border rounded">
                    <option value="devine-mobile">Devine Mobile</option>
                    <option value="mtn">MTN</option>
                    <option value="vodacom">Vodacom</option>
                    <option value="telkom">Telkom</option>
                  </select>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default USSDManagement;
