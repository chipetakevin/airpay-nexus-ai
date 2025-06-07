
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Phone, Signal, Battery, Wifi, Clock,
  Shield, CheckCircle, AlertTriangle, Info
} from 'lucide-react';

interface USSDSession {
  currentMenu: string;
  menuHistory: string[];
  userInput: string;
  sessionId: string;
  startTime: Date;
  lastActivity: Date;
}

const USSDSimulator = () => {
  const [session, setSession] = useState<USSDSession | null>(null);
  const [currentScreen, setCurrentScreen] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState(180);

  // Session timeout countdown
  useEffect(() => {
    if (isConnected && sessionTimeout > 0) {
      const timer = setTimeout(() => {
        setSessionTimeout(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (sessionTimeout === 0) {
      handleSessionTimeout();
    }
  }, [isConnected, sessionTimeout]);

  const initializeSession = () => {
    const newSession: USSDSession = {
      currentMenu: 'main',
      menuHistory: [],
      userInput: '',
      sessionId: `USSD-${Date.now()}`,
      startTime: new Date(),
      lastActivity: new Date()
    };
    setSession(newSession);
    setIsConnected(true);
    setSessionTimeout(180);
    showMainMenu();
  };

  const handleSessionTimeout = () => {
    setCurrentScreen('Session expired due to inactivity.\n\nPlease dial *739# to start again.');
    setIsConnected(false);
    setSession(null);
  };

  const showMainMenu = () => {
    setCurrentScreen(`Welcome to Devine Mobile
1. Account & Balance
2. Buy Airtime
3. Buy Data
4. Pay Bills
5. Customer Support
6. Promotions
7. Settings
9. Emergency (No Balance)
0. Exit`);
  };

  const showAccountMenu = () => {
    setCurrentScreen(`Account Services
1. Check Balance
2. Transaction History
3. Account Details
4. Reward Points
5. Usage Summary
0. Back to Main Menu`);
  };

  const showAirtimeMenu = () => {
    setCurrentScreen(`Buy Airtime
1. For My Number
2. For Another Number
3. Bulk Purchase
4. Auto-Recharge Setup
5. Airtime Advance
0. Back to Main Menu`);
  };

  const showDataMenu = () => {
    setCurrentScreen(`Buy Data Bundles
1. Daily Bundles
2. Weekly Bundles
3. Monthly Bundles
4. Social Media Bundles
5. Night Owl Bundles
6. Data Sharing
0. Back to Main Menu`);
  };

  const showEmergencyMenu = () => {
    setCurrentScreen(`Emergency Services (No Balance)
1. Request Airtime Advance
2. Call Emergency Numbers
3. Send Emergency SMS
4. Find Nearest Store
5. Customer Care Callback
0. Back to Main Menu`);
  };

  const showLanguageMenu = () => {
    setCurrentScreen(`Language Selection
1. English
2. Afrikaans
3. isiZulu
4. isiXhosa
5. Sesotho
6. Setswana
7. Sepedi
8. Xitsonga
9. SiSwati
0. Back`);
  };

  const showBalanceCheck = () => {
    setCurrentScreen(`Account Balance
Main Balance: R 125.50
Data Balance: 2.5GB
SMS Balance: 150 SMS
Airtime Advance: R 0.00

Last Updated: ${new Date().toLocaleString()}

Reply:
1. Transaction History
2. Usage Details
0. Back to Main Menu`);
  };

  const showDataBundles = (type: string) => {
    const bundles = {
      daily: `Daily Data Bundles
1. 50MB - R5 (24 hours)
2. 100MB - R8 (24 hours)
3. 250MB - R15 (24 hours)
4. 500MB - R25 (24 hours)
0. Back`,
      weekly: `Weekly Data Bundles
1. 500MB - R35 (7 days)
2. 1GB - R55 (7 days)
3. 2GB - R85 (7 days)
4. 5GB - R150 (7 days)
0. Back`,
      monthly: `Monthly Data Bundles
1. 1GB - R149 (30 days)
2. 3GB - R199 (30 days)
3. 5GB - R299 (30 days)
4. 10GB - R399 (30 days)
5. 20GB - R599 (30 days)
0. Back`
    };
    setCurrentScreen(bundles[type as keyof typeof bundles] || 'Invalid selection');
  };

  const processInput = (input: string) => {
    if (!session) return;

    const newSession = {
      ...session,
      lastActivity: new Date(),
      userInput: input
    };
    setSession(newSession);
    setSessionTimeout(180); // Reset timeout

    // Handle navigation based on current menu and input
    if (session.currentMenu === 'main') {
      switch (input) {
        case '1':
          newSession.currentMenu = 'account';
          showAccountMenu();
          break;
        case '2':
          newSession.currentMenu = 'airtime';
          showAirtimeMenu();
          break;
        case '3':
          newSession.currentMenu = 'data';
          showDataMenu();
          break;
        case '4':
          setCurrentScreen('Bill Payments\nComing Soon...\n\n0. Back to Main Menu');
          break;
        case '5':
          setCurrentScreen('Customer Support\nCall 136 for assistance\nOr visit devine-mobile.com\n\n0. Back to Main Menu');
          break;
        case '6':
          setCurrentScreen('Current Promotions\n• Double Data Weekends\n• Free WhatsApp\n• Bonus Airtime\n\n0. Back to Main Menu');
          break;
        case '7':
          newSession.currentMenu = 'language';
          showLanguageMenu();
          break;
        case '9':
          newSession.currentMenu = 'emergency';
          showEmergencyMenu();
          break;
        case '0':
          handleExit();
          return;
        default:
          setCurrentScreen('Invalid option. Please try again.\n\n' + currentScreen);
      }
    } else if (session.currentMenu === 'account') {
      switch (input) {
        case '1':
          showBalanceCheck();
          break;
        case '2':
          setCurrentScreen('Transaction History\n\n14:32 - Airtime R20\n13:15 - Data 1GB\n12:00 - SMS Bundle\n\n0. Back');
          break;
        case '0':
          newSession.currentMenu = 'main';
          showMainMenu();
          break;
        default:
          setCurrentScreen('Invalid option. Please try again.');
      }
    } else if (session.currentMenu === 'data') {
      switch (input) {
        case '1':
          showDataBundles('daily');
          break;
        case '2':
          showDataBundles('weekly');
          break;
        case '3':
          showDataBundles('monthly');
          break;
        case '0':
          newSession.currentMenu = 'main';
          showMainMenu();
          break;
        default:
          setCurrentScreen('Invalid option. Please try again.');
      }
    }

    setSession(newSession);
  };

  const handleExit = () => {
    setCurrentScreen('Thank you for using Devine Mobile services.\n\nGoodbye!');
    setTimeout(() => {
      setIsConnected(false);
      setSession(null);
      setCurrentScreen('');
    }, 2000);
  };

  const handleKeypadPress = (key: string) => {
    if (key === 'send') {
      processInput(inputValue);
      setInputValue('');
    } else if (key === 'clear') {
      setInputValue('');
    } else if (key === 'back') {
      setInputValue(prev => prev.slice(0, -1));
    } else {
      setInputValue(prev => prev + key);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Devine Mobile USSD System
        </h1>
        <p className="text-gray-600">Simulate USSD interactions with *739# services</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Phone Simulator */}
        <Card className="w-full max-w-sm mx-auto">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Nokia 3310 Simulator</CardTitle>
              <div className="flex items-center gap-2">
                <Signal className="w-4 h-4" />
                <Badge variant="outline" className="text-xs">MTN</Badge>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <Battery className="w-3 h-3" />
                <span>85%</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{new Date().toLocaleTimeString().slice(0, 5)}</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Screen */}
            <div className="bg-green-900 text-green-100 p-4 rounded font-mono text-sm min-h-[200px] border-2 border-gray-400">
              {!isConnected ? (
                <div className="text-center">
                  <p>Nokia</p>
                  <p className="mt-8">Dial *739# to start</p>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between mb-2 text-xs">
                    <span>USSD</span>
                    <span>{Math.floor(sessionTimeout / 60)}:{(sessionTimeout % 60).toString().padStart(2, '0')}</span>
                  </div>
                  <pre className="whitespace-pre-wrap text-xs leading-relaxed">
                    {currentScreen}
                  </pre>
                </div>
              )}
            </div>

            {/* Input Display */}
            <div className="bg-gray-100 p-2 rounded text-center font-mono">
              {inputValue || (isConnected ? 'Enter option...' : '*739#')}
            </div>

            {/* Keypad */}
            <div className="grid grid-cols-3 gap-2">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((key) => (
                <Button
                  key={key}
                  variant="outline"
                  size="sm"
                  onClick={() => handleKeypadPress(key)}
                  className="aspect-square"
                >
                  {key}
                </Button>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleKeypadPress('clear')}
                className="flex-1"
              >
                Clear
              </Button>
              <Button
                size="sm"
                onClick={() => !isConnected ? (setInputValue('*739#'), initializeSession()) : handleKeypadPress('send')}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                {!isConnected ? 'Call' : 'Send'}
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={handleExit}
                className="flex-1"
              >
                End
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* System Information */}
        <div className="space-y-4">
          {/* Quick Access Codes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Quick Access Codes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Main Menu:</span>
                  <code className="bg-gray-100 px-2 py-1 rounded">*739#</code>
                </div>
                <div className="flex justify-between">
                  <span>Account & Balance:</span>
                  <code className="bg-gray-100 px-2 py-1 rounded">*739*1#</code>
                </div>
                <div className="flex justify-between">
                  <span>Buy Airtime:</span>
                  <code className="bg-gray-100 px-2 py-1 rounded">*739*2#</code>
                </div>
                <div className="flex justify-between">
                  <span>Buy Data:</span>
                  <code className="bg-gray-100 px-2 py-1 rounded">*739*3#</code>
                </div>
                <div className="flex justify-between">
                  <span>Emergency:</span>
                  <code className="bg-gray-100 px-2 py-1 rounded">*739*9#</code>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Session Status */}
          {session && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Session Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Session ID:</span>
                    <span className="font-mono">{session.sessionId.slice(-8)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Connected:</span>
                    <Badge variant="outline" className="text-green-600">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Active
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Timeout:</span>
                    <span className={sessionTimeout < 30 ? 'text-red-600' : 'text-green-600'}>
                      {Math.floor(sessionTimeout / 60)}:{(sessionTimeout % 60).toString().padStart(2, '0')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Current Menu:</span>
                    <span className="capitalize">{session.currentMenu}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* System Features */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="w-5 h-5" />
                System Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Works without internet</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Compatible with all phones</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Real-time balance updates</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Secure encryption</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Multi-language support</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Emergency services</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default USSDSimulator;
