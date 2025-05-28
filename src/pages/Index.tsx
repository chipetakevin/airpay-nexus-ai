
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import StatsGrid from '../components/StatsGrid';
import NetworkStatus from '../components/NetworkStatus';
import TransactionPanel from '../components/TransactionPanel';
import AgentManagement from '../components/AgentManagement';
import QuickActions from '../components/QuickActions';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome to Air Pay Dashboard
              </h2>
              <p className="text-gray-600">
                Manage your airtime distribution network with AI-powered insights and real-time processing
              </p>
            </div>
            <Link to="/portal">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                🚀 Access Customer Portal
              </Button>
            </Link>
          </div>
        </div>

        <StatsGrid />
        <NetworkStatus />
        <AgentManagement />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <TransactionPanel />
          </div>
          <div className="lg:col-span-1">
            <QuickActions />
          </div>
        </div>
        
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div>
              <p>&copy; 2024 Air Pay. AI-Driven Airtime Management System.</p>
              <p>Powered by advanced analytics and real-time processing.</p>
            </div>
            <div className="flex items-center space-x-4">
              <span>Version 2.1.0</span>
              <span>•</span>
              <span>Last Updated: 2 mins ago</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
