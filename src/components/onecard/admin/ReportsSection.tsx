import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Crown, FileText, TrendingUp, Users, BarChart3, PieChart, Activity } from 'lucide-react';

interface ReportsSectionProps {
  customers: any[];
  transactions: any[];
}

const ReportsSection = ({ customers, transactions }: ReportsSectionProps) => {
  const handleGenerateMasterReport = () => {
    console.log('Generating master report with data:', { customers, transactions });
  };

  return (
    <div className="space-y-4 sm:space-y-6 p-2 sm:p-4">
      {/* Mobile-Optimized Header */}
      <div className="text-center space-y-3 mb-4 sm:mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Crown className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        </div>
        <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
          Generate comprehensive platform reports with modern visualizations and king crown branding
        </p>
      </div>

      {/* Enhanced Master Report - Mobile-First Design */}
      <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 shadow-lg">
        <CardContent className="p-4 sm:p-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl">
              <Crown className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Premium Master Report</h2>
              <p className="text-gray-600 text-sm sm:text-base max-w-sm mx-auto leading-relaxed">
                Professional PDF with charts, Divine Mobile logo, and comprehensive analytics
              </p>
            </div>

            {/* Mobile-Optimized Feature Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 py-4">
              <div className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <PieChart className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                </div>
                <span className="text-xs sm:text-sm text-gray-600 font-medium">Charts</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                </div>
                <span className="text-xs sm:text-sm text-gray-600 font-medium">Trends</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                </div>
                <span className="text-xs sm:text-sm text-gray-600 font-medium">Insights</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                </div>
                <span className="text-xs sm:text-sm text-gray-600 font-medium">Premium</span>
              </div>
            </div>

            {/* One-Click Download Button - Mobile Optimized */}
            <Button 
              onClick={handleGenerateMasterReport} 
              className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base"
              size="lg"
            >
              <Crown className="w-5 h-5 mr-2" />
              Generate Premium Report
            </Button>
            
            <div className="text-xs sm:text-sm text-gray-500 mt-2">
              ✨ One-click download • 👑 Divine Mobile logo included • 📊 Modern design
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mobile-Friendly Additional Report Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {/* Financial Summary */}
        <Card className="border border-green-200 bg-green-50/50 hover:bg-green-50 transition-colors cursor-pointer opacity-60">
          <CardContent className="p-4 sm:p-6 text-center space-y-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto">
              <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Financial Summary</h3>
              <p className="text-xs sm:text-sm text-gray-600">Revenue and cashback analysis</p>
            </div>
            <div className="text-xs text-gray-500 bg-white/60 px-2 py-1 rounded-md">
              Coming Soon
            </div>
          </CardContent>
        </Card>

        {/* Growth Analytics */}
        <Card className="border border-blue-200 bg-blue-50/50 hover:bg-blue-50 transition-colors cursor-pointer opacity-60">
          <CardContent className="p-4 sm:p-6 text-center space-y-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Growth Analytics</h3>
              <p className="text-xs sm:text-sm text-gray-600">Customer acquisition trends</p>
            </div>
            <div className="text-xs text-gray-500 bg-white/60 px-2 py-1 rounded-md">
              Coming Soon
            </div>
          </CardContent>
        </Card>

        {/* Customer Insights */}
        <Card className="border border-orange-200 bg-orange-50/50 hover:bg-orange-50 transition-colors cursor-pointer opacity-60 sm:col-span-2 lg:col-span-1">
          <CardContent className="p-4 sm:p-6 text-center space-y-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Customer Insights</h3>
              <p className="text-xs sm:text-sm text-gray-600">Behavioral analysis report</p>
            </div>
            <div className="text-xs text-gray-500 bg-white/60 px-2 py-1 rounded-md">
              Coming Soon
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mobile-Optimized Platform Features Section */}
      <Card>
        <CardHeader className="pb-3 sm:pb-4">
          <CardTitle className="text-base sm:text-lg flex items-center gap-2">
            <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
            Premium Report Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Report Features */}
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Modern Design</h4>
              <div className="space-y-2">
                {[
                  { text: "Divine Mobile logo branding", color: "bg-purple-500" },
                  { text: "Interactive charts & graphs", color: "bg-blue-500" },
                  { text: "Customer performance metrics", color: "bg-green-500" },
                  { text: "Network distribution analytics", color: "bg-orange-500" }
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`w-2 h-2 ${feature.color} rounded-full flex-shrink-0`}></div>
                    <span className="text-xs sm:text-sm text-gray-600">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Export Options */}
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Professional Quality</h4>
              <div className="space-y-2">
                {[
                  { text: "High-quality PDF format", color: "bg-red-500" },
                  { text: "One-click generation", color: "bg-yellow-500" },
                  { text: "Mobile-responsive design", color: "bg-indigo-500" },
                  { text: "Executive presentation ready", color: "bg-pink-500" }
                ].map((option, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`w-2 h-2 ${option.color} rounded-full flex-shrink-0`}></div>
                    <span className="text-xs sm:text-sm text-gray-600">{option.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsSection;
