import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🛍️</span>
              <span className="text-2xl font-bold bg-linear-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
                ShopMaster
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Your one-stop destination for everything you need. Quality products, amazing prices, unbeatable service.
            </p>
            <div className="flex gap-3">
              {['📘', '📸', '🐦', '▶️'].map((icon, i) => (
                <button key={i} className="w-9 h-9 bg-gray-800 hover:bg-orange-500 rounded-lg flex items-center justify-center text-lg transition-colors duration-200">
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[['Home', '/'], ['Products', '/products'], ['About', '/about'], ['Support', '/support'], ['Basket', '/basket']].map(([label, path]) => (
                <li key={path}>
                  <Link to={path} className="text-gray-400 hover:text-orange-400 text-sm transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2">📍 123 Commerce St, NY</li>
              <li className="flex items-center gap-2">📞 +1 (555) 123-4567</li>
              <li className="flex items-center gap-2">📧 support@shopmaster.com</li>
              <li className="flex items-center gap-2">🕐 Mon–Sun: 9am – 9pm</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© 2024 ShopMaster. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-orange-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-orange-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
