
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, TrendingUp, Users, BarChart3, PieChart, Activity } from 'lucide-react';

interface ReportsSectionProps {
  onGenerateMasterReport: () => void;
}

const ReportsSection = ({ onGenerateMasterReport }: ReportsSectionProps) => {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="text-center space-y-2 mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <BarChart3 className="w-6 h-6 text-purple-600" />
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        </div>
        <p className="text-gray-600 text-sm max-w-md mx-auto">
          Generate comprehensive platform reports with modern visualizations
        </p>
      </div>

      {/* Enhanced Master Report - Main Feature */}
      <Card className="border border-purple-200 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-white" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-gray-900">Enhanced Master Report</h2>
              <p className="text-gray-600 text-sm max-w-sm mx-auto">
                Modern PDF with charts, visualizations, and detailed analytics
              </p>
            </div>

            {/* Feature Icons */}
            <div className="flex items-center justify-center gap-6 py-4">
              <div className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <PieChart className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-xs text-gray-600">Charts</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-xs text-gray-600">Trends</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-orange-600" />
                </div>
                <span className="text-xs text-gray-600">Insights</span>
              </div>
            </div>

            {/* Download Button */}
            <Button 
              onClick={onGenerateMasterReport} 
              className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              size="lg"
            >
              <Download className="w-5 h-5 mr-2" />
              Generate Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Additional Report Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Financial Summary */}
        <Card className="border border-green-200 bg-green-50/50 hover:bg-green-50 transition-colors cursor-pointer opacity-60">
          <CardContent className="p-6 text-center space-y-3">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Financial Summary</h3>
              <p className="text-xs text-gray-600">Revenue and cashback analysis</p>
            </div>
            <div className="text-xs text-gray-500 bg-white/60 px-2 py-1 rounded-md">
              Coming Soon
            </div>
          </CardContent>
        </Card>

        {/* Growth Analytics */}
        <Card className="border border-blue-200 bg-blue-50/50 hover:bg-blue-50 transition-colors cursor-pointer opacity-60">
          <CardContent className="p-6 text-center space-y-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Growth Analytics</h3>
              <p className="text-xs text-gray-600">Customer acquisition trends</p>
            </div>
            <div className="text-xs text-gray-500 bg-white/60 px-2 py-1 rounded-md">
              Coming Soon
            </div>
          </CardContent>
        </Card>

        {/* Customer Insights */}
        <Card className="border border-orange-200 bg-orange-50/50 hover:bg-orange-50 transition-colors cursor-pointer opacity-60 sm:col-span-2 lg:col-span-1">
          <CardContent className="p-6 text-center space-y-3">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Customer Insights</h3>
              <p className="text-xs text-gray-600">Behavioral analysis report</p>
            </div>
            <div className="text-xs text-gray-500 bg-white/60 px-2 py-1 rounded-md">
              Coming Soon
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Report Features Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Activity className="w-5 h-5 text-purple-600" />
            Platform Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Report Features */}
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Report Features</h4>
              <div className="space-y-2">
                {[
                  { text: "Interactive charts and visualizations", color: "bg-green-500" },
                  { text: "Network distribution analytics", color: "bg-blue-500" },
                  { text: "Customer performance metrics", color: "bg-purple-500" },
                  { text: "Transaction trend analysis", color: "bg-orange-500" }
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`w-2 h-2 ${feature.color} rounded-full`}></div>
                    <span className="text-sm text-gray-600">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Export Options */}
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Export Options</h4>
              <div className="space-y-2">
                {[
                  { text: "High-quality PDF format", color: "bg-red-500" },
                  { text: "Professional layouts", color: "bg-yellow-500" },
                  { text: "Branded templates", color: "bg-indigo-500" },
                  { text: "Ready for presentations", color: "bg-pink-500" }
                ].map((option, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`w-2 h-2 ${option.color} rounded-full`}></div>
                    <span className="text-sm text-gray-600">{option.text}</span>
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
