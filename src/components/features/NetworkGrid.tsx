
import React from 'react';

const NetworkGrid = () => {
  const networks = [
    { name: 'MTN', color: 'from-yellow-500 to-orange-500' },
    { name: 'Vodacom', color: 'from-red-500 to-pink-500' },
    { name: 'Cell C', color: 'from-blue-500 to-indigo-500' },
    { name: 'Telkom', color: 'from-purple-500 to-violet-500' },
    { name: 'Divinely Mobile', color: 'from-green-500 to-emerald-500' },
    { name: 'Virgin Mobile', color: 'from-pink-500 to-rose-500' }
  ];

  return (
    <div className="mt-16 text-center">
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Multi-Network Support</h3>
        
        {/* Mobile-First Grid Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 mb-6">
          {networks.map((network, index) => (
            <div key={network.name} className="flex flex-col items-center group">
              <div className={`w-14 h-14 sm:w-16 sm:h-16 lg:w-18 lg:h-18 bg-gradient-to-br ${network.color} rounded-2xl flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-lg transform hover:scale-110 transition-all duration-300 group-hover:shadow-2xl`} 
                   style={{ animationDelay: `${index * 0.1}s` }}>
                <span className="text-center leading-tight px-1">
                  {network.name === 'Divinely Mobile' ? (
                    <span className="block">
                      <span className="block text-[10px] sm:text-xs">Divinely</span>
                      <span className="block text-[10px] sm:text-xs -mt-1">Mobile</span>
                    </span>
                  ) : network.name === 'Virgin Mobile' ? (
                    <span className="block">
                      <span className="block text-[10px] sm:text-xs">Virgin</span>
                      <span className="block text-[10px] sm:text-xs -mt-1">Mobile</span>
                    </span>
                  ) : network.name === 'Vodacom' ? (
                    <span className="block text-[11px] sm:text-sm font-bold">Vodacom</span>
                  ) : (
                    network.name
                  )}
                </span>
              </div>
              <div className="w-1 h-6 sm:h-8 bg-gradient-to-b from-blue-500 to-transparent mt-2 group-hover:from-blue-600 transition-colors"></div>
            </div>
          ))}
        </div>
        
        <p className="text-gray-600 text-sm sm:text-base">All major South African networks - all in one platform</p>
      </div>
    </div>
  );
};

export default NetworkGrid;
