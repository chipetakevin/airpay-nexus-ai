
import React from 'react';
import { Link } from 'react-router-dom';
import { Smartphone } from 'lucide-react';

const HeaderLogo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2 group cursor-pointer">
      <div className="relative">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-all duration-300 ease-out group-active:scale-95">
          <Smartphone className="h-5 w-5 text-white" />
        </div>
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition-all duration-300"></div>
      </div>
      <div className="flex flex-col group-hover:scale-105 transition-all duration-300 ease-out group-active:scale-95">
        <span className="font-bold text-xl text-gray-900 group-hover:text-blue-600 transition-colors duration-300">Divinely</span>
        <span className="font-montserrat font-bold text-lg text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text -mt-1 group-hover:from-blue-700 group-hover:to-purple-700 transition-all duration-300">
          Mobile
        </span>
      </div>
    </Link>
  );
};

export default HeaderLogo;
