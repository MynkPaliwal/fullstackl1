import React from 'react';
import { Link } from 'react-router-dom';
import appleLogo from '../assets/apple_logo.svg';

const Navbar: React.FC = () => {
    return (
        <nav className={`flex h-12 bg-gray-900 text-white items-center justify-between px-4 sm:px-6 lg:px-8`}>
            <img
                className="h-5 w-4 invert"
                src={appleLogo}
                alt="Apple Logo"
            />

            <div className="hidden md:flex space-x-4">
                <Link to="/store" className="text-white hover:text-gray-300 transition-colors text-sm">
                    Find a Store
                </Link>
                <Link to="/orders" className="text-white hover:text-gray-300 transition-colors text-sm">
                    Order Status
                </Link>
                <Link to="/help" className="text-white hover:text-gray-300 transition-colors text-sm">
                    Shopping Help
                </Link>
                <Link to="/saves" className="text-white hover:text-gray-300 transition-colors text-sm">
                    Your Saves
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
