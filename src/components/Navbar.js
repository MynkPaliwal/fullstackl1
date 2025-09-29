import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-black text-white h-12">
      {/* Top bar with Apple logo and quick links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          {/* Apple Logo */}
          <div className="flex-shrink-0">
            <svg
              className="h-4 w-4 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
          </div>

          {/* Quick Links */}
          <div className="hidden md:flex space-x-6 text-sm">
            <Link to="/store" className="hover:text-gray-300 transition-colors">Find a Store</Link>
            <Link to="/orders" className="hover:text-gray-300 transition-colors">Order Status</Link>
            <Link to="/help" className="hover:text-gray-300 transition-colors">Shopping Help</Link>
            <Link to="/saves" className="hover:text-gray-300 transition-colors">Your Saves</Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-gray-300 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="hidden md:flex space-x-8 py-4">
              <Link to="/" className="text-white hover:text-gray-300 transition-colors font-medium">Store</Link>
              <Link to="/mac" className="text-white hover:text-gray-300 transition-colors font-medium">Mac</Link>
              <Link to="/ipad" className="text-white hover:text-gray-300 transition-colors font-medium">iPad</Link>
              <Link to="/iphone" className="text-white hover:text-gray-300 transition-colors font-medium">iPhone</Link>
              <Link to="/watch" className="text-white hover:text-gray-300 transition-colors font-medium">Watch</Link>
              <Link to="/airpods" className="text-white hover:text-gray-300 transition-colors font-medium">AirPods</Link>
              <Link to="/tv-home" className="text-white hover:text-gray-300 transition-colors font-medium">TV & Home</Link>
              <Link to="/entertainment" className="text-white hover:text-gray-300 transition-colors font-medium">Entertainment</Link>
              <Link to="/accessories" className="text-white hover:text-gray-300 transition-colors font-medium">Accessories</Link>
              <Link to="/support" className="text-white hover:text-gray-300 transition-colors font-medium">Support</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black border-t border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/" className="block px-3 py-2 text-white hover:text-gray-300 transition-colors">Store</Link>
            <Link to="/mac" className="block px-3 py-2 text-white hover:text-gray-300 transition-colors">Mac</Link>
            <Link to="/ipad" className="block px-3 py-2 text-white hover:text-gray-300 transition-colors">iPad</Link>
            <Link to="/iphone" className="block px-3 py-2 text-white hover:text-gray-300 transition-colors">iPhone</Link>
            <Link to="/watch" className="block px-3 py-2 text-white hover:text-gray-300 transition-colors">Watch</Link>
            <Link to="/airpods" className="block px-3 py-2 text-white hover:text-gray-300 transition-colors">AirPods</Link>
            <Link to="/tv-home" className="block px-3 py-2 text-white hover:text-gray-300 transition-colors">TV & Home</Link>
            <Link to="/entertainment" className="block px-3 py-2 text-white hover:text-gray-300 transition-colors">Entertainment</Link>
            <Link to="/accessories" className="block px-3 py-2 text-white hover:text-gray-300 transition-colors">Accessories</Link>
            <Link to="/support" className="block px-3 py-2 text-white hover:text-gray-300 transition-colors">Support</Link>
            <div className="border-t border-gray-800 pt-2 mt-2">
              <Link to="/store" className="block px-3 py-2 text-white hover:text-gray-300 transition-colors text-sm">Find a Store</Link>
              <Link to="/orders" className="block px-3 py-2 text-white hover:text-gray-300 transition-colors text-sm">Order Status</Link>
              <Link to="/help" className="block px-3 py-2 text-white hover:text-gray-300 transition-colors text-sm">Shopping Help</Link>
              <Link to="/saves" className="block px-3 py-2 text-white hover:text-gray-300 transition-colors text-sm">Your Saves</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
