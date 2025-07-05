import React from 'react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { MobileCard, MobileCardHeader, MobileCardContent } from '@/components/ui/mobile-card';
import { MobileButton } from '@/components/ui/mobile-button';
import { useMobileFirst } from '@/components/layout/MobileFirstProvider';
import { 
  Activity, 
  CreditCard, 
  Users, 
  TrendingUp,
  Bell,
  Settings,
  Menu
} from 'lucide-react';

export const MobileDashboard: React.FC = () => {
  const { isMobile } = useMobileFirst();

  const stats = [
    { label: 'Active Users', value: '2,847', icon: Users, change: '+12%' },
    { label: 'Revenue', value: 'R 45,320', icon: CreditCard, change: '+8%' },
    { label: 'Transactions', value: '1,205', icon: Activity, change: '+15%' },
    { label: 'Growth', value: '23.5%', icon: TrendingUp, change: '+3%' }
  ];

  const quickActions = [
    { label: 'Send Money', icon: CreditCard, color: 'bg-blue-500' },
    { label: 'Buy Airtime', icon: Activity, color: 'bg-green-500' },
    { label: 'Pay Bills', icon: Users, color: 'bg-purple-500' },
    { label: 'View Reports', icon: TrendingUp, color: 'bg-orange-500' }
  ];

  return (
    <MobileLayout
      showHeader
      headerContent={
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-3">
            <Menu className="h-6 w-6" />
            <div>
              <h1 className="mobile-text-lg">Divine Mobile</h1>
              <p className="text-xs text-muted-foreground">Welcome back!</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <Settings className="h-5 w-5 text-muted-foreground" />
          </div>
        </div>
      }
    >
      {/* Quick Balance Card */}
      <MobileCard className="mb-6 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground border-0">
        <MobileCardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-primary-foreground/80 text-sm">Total Balance</p>
              <h2 className="text-2xl font-bold">R 12,450.80</h2>
            </div>
            <CreditCard className="h-8 w-8 text-primary-foreground/80" />
          </div>
          <div className="mt-4 flex space-x-2">
            <MobileButton 
              variant="secondary" 
              size="sm" 
              className="flex-1 bg-white/20 text-white border-0 hover:bg-white/30"
            >
              Top Up
            </MobileButton>
            <MobileButton 
              variant="secondary" 
              size="sm" 
              className="flex-1 bg-white/20 text-white border-0 hover:bg-white/30"
            >
              Transfer
            </MobileButton>
          </div>
        </MobileCardContent>
      </MobileCard>

      {/* Quick Actions */}
      <div className="mobile-section">
        <h3 className="mobile-section-title">Quick Actions</h3>
        <div className="mobile-grid-2">
          {quickActions.map((action, index) => (
            <MobileCard key={index} interactive>
              <MobileCardContent className="text-center py-6">
                <div className={`w-12 h-12 rounded-full ${action.color} flex items-center justify-center mx-auto mb-3`}>
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <p className="mobile-text-sm font-medium">{action.label}</p>
              </MobileCardContent>
            </MobileCard>
          ))}
        </div>
      </div>

      {/* Statistics */}
      <div className="mobile-section">
        <h3 className="mobile-section-title">Overview</h3>
        <div className="mobile-grid-2">
          {stats.map((stat, index) => (
            <MobileCard key={index}>
              <MobileCardContent>
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className="h-5 w-5 text-muted-foreground" />
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    stat.change.startsWith('+') 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <p className="mobile-text-sm text-muted-foreground">{stat.label}</p>
                <p className="mobile-text-lg font-semibold">{stat.value}</p>
              </MobileCardContent>
            </MobileCard>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mobile-section">
        <h3 className="mobile-section-title">Recent Activity</h3>
        <MobileCard>
          <div className="mobile-list">
            {[
              { type: 'Transfer', amount: '-R 150.00', time: '2 hours ago', status: 'completed' },
              { type: 'Airtime', amount: '-R 50.00', time: '1 day ago', status: 'completed' },
              { type: 'Deposit', amount: '+R 500.00', time: '2 days ago', status: 'completed' }
            ].map((transaction, index) => (
              <div key={index} className="mobile-list-item">
                <div className="flex items-center space-x-3">
                  <div className="mobile-avatar">
                    <Activity className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="mobile-text-sm font-medium">{transaction.type}</p>
                    <p className="text-xs text-muted-foreground">{transaction.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`mobile-text-sm font-medium ${
                    transaction.amount.startsWith('+') 
                      ? 'text-green-600' 
                      : 'text-red-600'
                  }`}>
                    {transaction.amount}
                  </p>
                  <div className="mobile-badge bg-green-100 text-green-800">
                    {transaction.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </MobileCard>
      </div>

      {/* Bottom spacing for mobile */}
      <div className="h-20" />
    </MobileLayout>
  );
};