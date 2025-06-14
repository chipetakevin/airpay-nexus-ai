import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, TrendingUp, Users, BarChart, PieChart } from 'lucide-react';

interface ReportsSectionProps {
  onGenerateMasterReport: () => void;
}

const ReportsSection = ({ onGenerateMasterReport }: ReportsSectionProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart className="w-6 h-6 text-purple-600" />
            Reports & Analytics
          </CardTitle>
          <p className="text-sm text-gray-600">Generate comprehensive platform reports with modern visualizations</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Enhanced Master Report - Featured */}
          <div className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Enhanced Master Report</h3>
                <p className="text-sm text-gray-600">Modern PDF with charts, visualizations, and detailed analytics</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <PieChart className="w-3 h-3" />
                    Network Charts
                  </span>
                  <span className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    Trend Analysis
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    Customer Insights
                  </span>
                </div>
              </div>
              <Button 
                onClick={onGenerateMasterReport} 
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                size="lg"
              >
                <Download className="w-5 h-5 mr-2" />
                Generate Report
              </Button>
            </div>
          </div>

          {/* Other Report Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button variant="outline" className="h-24 p-4" disabled>
              <div className="text-center space-y-2">
                <FileText className="w-6 h-6 mx-auto text-green-600" />
                <div className="text-sm font-medium">Financial Summary</div>
                <div className="text-xs text-gray-500">Revenue and cashback analysis</div>
              </div>
            </Button>
            
            <Button variant="outline" className="h-24 p-4" disabled>
              <div className="text-center space-y-2">
                <TrendingUp className="w-6 h-6 mx-auto text-blue-600" />
                <div className="text-sm font-medium">Growth Analytics</div>
                <div className="text-xs text-gray-500">Customer acquisition trends</div>
              </div>
            </Button>
            
            <Button variant="outline" className="h-24 p-4" disabled>
              <div className="text-center space-y-2">
                <Users className="w-6 h-6 mx-auto text-orange-600" />
                <div className="text-sm font-medium">Customer Insights</div>
                <div className="text-xs text-gray-500">Behavioral analysis report</div>
              </div>
            </Button>
          </div>

          {/* Report Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Report Features</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Interactive charts and visualizations
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Network distribution analytics
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Customer performance metrics
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  Transaction trend analysis
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Export Options</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  High-quality PDF format
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  Professional layouts
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  Branded templates
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  Ready for presentations
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsSection;
