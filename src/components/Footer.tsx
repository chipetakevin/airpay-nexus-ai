
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">AirPay</h3>
            <p className="text-gray-400 mb-4">
              South Africa's leading AI-driven airtime management platform.
            </p>
            <div className="flex space-x-4">
              <span className="text-sm text-gray-400">Follow us:</span>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Quick Access</h4>
            <div className="space-y-2">
              <Link to="/portal" className="block text-gray-400 hover:text-white transition-colors">
                Customer Registration
              </Link>
              <Link to="/portal" className="block text-gray-400 hover:text-white transition-colors">
                Vendor Portal
              </Link>
              <a href="tel:*120*888#" className="block text-gray-400 hover:text-white transition-colors">
                USSD: *120*888#
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Networks</h4>
            <div className="space-y-2 text-gray-400">
              <div>MTN South Africa</div>
              <div>Vodacom</div>
              <div>Cell C</div>
              <div>Telkom Mobile</div>
              <div>Rain Mobile</div>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <div className="space-y-2 text-gray-400">
              <div>support@airpay.co.za</div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 AirPay. All rights reserved. AI-Driven Airtime Management System.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
