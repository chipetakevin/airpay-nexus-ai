
import React, { useState } from 'react';
import { X, Send, Search, MessageSquare, Star, Clock, Zap, BarChart3, Users } from 'lucide-react';

interface SpazaAIChatProps {
  isOpen: boolean;
  onClose: () => void;
  platformData: {
    totalSales: string;
    activeAgents: number;
    lowStockItems: number;
    todayTransactions: number;
    networkStatus: string;
  };
}

const SpazaAIChat: React.FC<SpazaAIChatProps> = ({ isOpen, onClose, platformData }) => {
  const [currentQuery, setCurrentQuery] = useState('');
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');

  const suggestedPrompts = [
    {
      category: 'Sales Analytics',
      icon: <BarChart3 className="w-4 h-4" />,
      prompts: [
        'Show me top performing agents this month',
        'Analyze data bundle sales trends',
        'Generate commission report for last quarter',
        'Compare network performance across regions'
      ]
    },
    {
      category: 'Inventory Management', 
      icon: <Zap className="w-4 h-4" />,
      prompts: [
        'Alert me about low stock items',
        'Optimize inventory distribution',
        'Predict demand for weekend sales',
        'Check MTN data bundle availability'
      ]
    },
    {
      category: 'Agent Operations',
      icon: <Users className="w-4 h-4" />,
      prompts: [
        'Create new agent onboarding checklist',
        'Review agent performance metrics',
        'Set up commission structure for new region',
        'Generate agent settlement report'
      ]
    }
  ];

  const handleSendMessage = () => {
    if (!currentQuery.trim()) return;

    setIsLoading(true);
    const newMessage = {
      id: Date.now(),
      type: 'user',
      message: currentQuery,
      timestamp: new Date()
    };

    setChatHistory(prev => [...prev, newMessage]);

    // Simulate AI response
    setTimeout(() => {
      const response = {
        id: Date.now() + 1,
        type: 'assistant',
        message: generateContextualResponse(currentQuery),
        timestamp: new Date(),
        actions: generateQuickActions(currentQuery)
      };
      setChatHistory(prev => [...prev, response]);
      setIsLoading(false);
    }, 1500);

    setCurrentQuery('');
  };

  const generateContextualResponse = (query: string) => {
    const queryLower = query.toLowerCase();

    if (queryLower.includes('sales') || queryLower.includes('revenue')) {
      return `Based on your current platform data, total sales are at ${platformData.totalSales} with ${platformData.todayTransactions} transactions today. I can help you analyze specific trends, generate detailed reports, or set up automated alerts for sales milestones.`;
    }

    if (queryLower.includes('agent') || queryLower.includes('merchant')) {
      return `You currently have ${platformData.activeAgents} active agents on your platform. I can help you manage agent performance, set up new commission structures, or create automated agent onboarding workflows.`;
    }

    if (queryLower.includes('stock') || queryLower.includes('inventory')) {
      return `I've detected ${platformData.lowStockItems} items with low stock levels. I can help you set up automated reordering, optimize distribution across your network, or predict demand patterns.`;
    }

    return `I understand you're looking for assistance with your AirPay platform. I can help you with sales analytics, inventory management, agent operations, financial reporting, and system optimization. What specific area would you like to focus on?`;
  };

  const generateQuickActions = (query: string) => {
    const queryLower = query.toLowerCase();

    if (queryLower.includes('sales') || queryLower.includes('revenue')) {
      return [
        { label: 'Generate Sales Report', action: 'report' },
        { label: 'View Top Products', action: 'products' },
        { label: 'Set Sales Alert', action: 'alert' }
      ];
    }

    if (queryLower.includes('agent')) {
      return [
        { label: 'View Agent List', action: 'agents' },
        { label: 'Commission Settings', action: 'commission' },
        { label: 'Performance Dashboard', action: 'performance' }
      ];
    }

    return [
      { label: 'View Dashboard', action: 'dashboard' },
      { label: 'Check System Status', action: 'status' },
      { label: 'Recent Activity', action: 'activity' }
    ];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Devine Mobile AI</h2>
              <p className="text-sm text-gray-500">AI-powered platform management</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Platform Status Bar */}
        <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                {platformData.networkStatus}
              </span>
              <span className="text-gray-600">Sales: {platformData.totalSales}</span>
              <span className="text-gray-600">Agents: {platformData.activeAgents}</span>
            </div>
            <span className="text-orange-600 font-medium">
              {platformData.lowStockItems} items need attention
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 px-6">
          {[
            { id: 'chat', label: 'Chat', icon: <MessageSquare className="w-4 h-4" /> },
            { id: 'suggestions', label: 'Quick Actions', icon: <Star className="w-4 h-4" /> },
            { id: 'history', label: 'Recent', icon: <Clock className="w-4 h-4" /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden">
          {activeTab === 'chat' && (
            <div className="h-full flex flex-col">
              {/* Chat History */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {chatHistory.length === 0 ? (
                  <div className="text-center text-gray-500 mt-8">
                    <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium mb-2">Welcome to Devine Mobile AI</p>
                    <p>Ask me anything about your platform - sales, inventory, agents, or reports.</p>
                  </div>
                ) : (
                  chatHistory.map(msg => (
                    <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                        msg.type === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        <p className="text-sm">{msg.message}</p>
                        {msg.actions && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {msg.actions.map((action: any, idx: number) => (
                              <button
                                key={idx}
                                className="text-xs bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-1 rounded-full transition-colors"
                              >
                                {action.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-2xl px-4 py-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="p-6 border-t border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={currentQuery}
                      onChange={(e) => setCurrentQuery(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Ask about sales, inventory, agents, or anything else..."
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!currentQuery.trim() || isLoading}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white p-3 rounded-xl transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'suggestions' && (
            <div className="p-6 space-y-6">
              {suggestedPrompts.map((category, idx) => (
                <div key={idx} className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    {category.icon}
                    {category.category}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {category.prompts.map((prompt, promptIdx) => (
                      <button
                        key={promptIdx}
                        onClick={() => {
                          setCurrentQuery(prompt);
                          setActiveTab('chat');
                        }}
                        className="text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm transition-colors"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="p-6">
              <div className="space-y-3">
                {[
                  'Generate monthly sales report',
                  'Check MTN network status',
                  'Update agent commission rates',
                  'Analyze data bundle performance'
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrentQuery(item);
                      setActiveTab('chat');
                    }}
                    className="w-full text-left p-3 hover:bg-gray-50 rounded-lg flex items-center justify-between transition-colors"
                  >
                    <span className="text-sm">{item}</span>
                    <Clock className="w-4 h-4 text-gray-400" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpazaAIChat;
