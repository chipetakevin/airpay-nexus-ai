
import React from 'react';
import Header from '../components/Header';
import StatsGrid from '../components/StatsGrid';
import NetworkStatus from '../components/NetworkStatus';
import TransactionPanel from '../components/TransactionPanel';
import AgentManagement from '../components/AgentManagement';
import QuickActions from '../components/QuickActions';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <div className="text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Welcome to Air Pay Dashboard
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Manage your airtime distribution network with AI-powered insights and real-time processing
            </p>
          </div>
        </div>

        <div className="space-y-6 sm:space-y-8">
          <StatsGrid />
          <NetworkStatus />
          <AgentManagement />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="lg:col-span-2">
              <TransactionPanel />
            </div>
            <div className="lg:col-span-1">
              <QuickActions />
            </div>
          </div>
        </div>
        
        <footer className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500 space-y-2 sm:space-y-0">
            <div className="text-center sm:text-left">
              <p>&copy; 2024 Air Pay. AI-Driven Airtime Management System.</p>
              <p>Powered by advanced analytics and real-time processing.</p>
            </div>
            <div className="flex items-center space-x-4 text-xs sm:text-sm">
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
