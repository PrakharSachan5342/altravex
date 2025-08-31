
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Activity } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Trading', path: '/trading' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Market Insights', path: '/market-insights' },
    { name: 'Events', path: '/events' },
    { name: 'Market News', path: '/market-news' },
    { name: 'Contributors', path: '/contributors' },
    { name: 'Leaderboard', path: '/leaderboard' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-black/80 backdrop-blur-lg border-b border-green-500/30 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Activity className="h-8 w-8 text-green-400" />
            <span className="text-white text-xl font-bold bg-gradient-to-r from-green-400 to-purple-400 bg-clip-text text-transparent">
              Altravex.ai
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActive(item.path)
                    ? 'bg-gradient-to-r from-green-500/20 to-purple-500/20 text-white border border-green-500/30'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden bg-black/95 backdrop-blur-lg border-t border-green-500/30">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-3 py-2 rounded-lg text-base font-medium transition-all duration-300 ${
                    isActive(item.path)
                      ? 'bg-gradient-to-r from-green-500/20 to-purple-500/20 text-white border border-green-500/30'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
