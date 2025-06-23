
import React from 'react';
import { TrendingUp } from 'lucide-react';

const FeatureHeader = () => {
  return (
    <div className="text-center mb-16">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mb-6">
        <TrendingUp className="w-8 h-8 text-white" />
      </div>
      <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
        Why Choose Divinely?
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Experience the future of airtime purchasing with our AI-driven platform
      </p>
      
      {/* Stats Bar */}
      <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm">
        <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="font-semibold text-gray-700">24/7 Available</span>
        </div>
        <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="font-semibold text-gray-700">6 Networks</span>
        </div>
        <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md">
          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
          <span className="font-semibold text-gray-700">AI Powered</span>
        </div>
      </div>
    </div>
  );
};

export default FeatureHeader;
