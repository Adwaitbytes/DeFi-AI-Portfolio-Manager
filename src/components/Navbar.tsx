
import React, { useState } from 'react';
import { Wallet, Menu, X, Activity, BarChart3, BookOpen, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  onConnectWallet: () => void;
  onDisconnectWallet: () => void;
  walletAddress: string | null;
  isConnecting: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ 
  onConnectWallet, 
  onDisconnectWallet, 
  walletAddress, 
  isConnecting 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <nav className="sticky top-0 z-50 glass-card border-b border-neon-400/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-neon-400 to-cyber-600 rounded-xl flex items-center justify-center animate-glow-pulse">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-neon-400 to-cyber-400 bg-clip-text text-transparent hidden sm:block">
                Immortal AI Agent
              </span>
              <span className="text-lg font-bold bg-gradient-to-r from-neon-400 to-cyber-400 bg-clip-text text-transparent sm:hidden">
                AI Agent
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`transition-colors font-medium ${
                location.pathname === '/' 
                  ? 'text-neon-400' 
                  : 'text-gray-300 hover:text-neon-400'
              }`}
            >
              Dashboard
            </Link>
            <Link 
              to="/analytics" 
              className={`transition-colors font-medium ${
                location.pathname === '/analytics' 
                  ? 'text-neon-400' 
                  : 'text-gray-300 hover:text-neon-400'
              }`}
            >
              Analytics
            </Link>
            <Link 
              to="/docs" 
              className={`transition-colors font-medium ${
                location.pathname === '/docs' 
                  ? 'text-neon-400' 
                  : 'text-gray-300 hover:text-neon-400'
              }`}
            >
              Docs
            </Link>
          </div>

          {/* Wallet Connection */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {walletAddress ? (
              <div className="flex items-center space-x-2">
                <div className="glass-card px-3 py-2 neon-border">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-neon-400 rounded-full animate-pulse"></div>
                    <span className="text-xs sm:text-sm font-mono text-neon-400">
                      {formatAddress(walletAddress)}
                    </span>
                  </div>
                </div>
                <Button
                  onClick={onDisconnectWallet}
                  variant="outline"
                  size="sm"
                  className="text-red-400 border-red-400/30 hover:bg-red-400/10"
                >
                  <LogOut className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline">Disconnect</span>
                </Button>
              </div>
            ) : (
              <Button 
                onClick={onConnectWallet}
                disabled={isConnecting}
                className="cyber-button text-sm sm:text-base"
              >
                <Wallet className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">
                  {isConnecting ? 'Connecting...' : 'Connect Wallet'}
                </span>
                <span className="sm:hidden">
                  {isConnecting ? 'Connecting...' : 'Connect'}
                </span>
              </Button>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-300 hover:text-neon-400"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden glass-card border-t border-neon-400/20">
          <div className="px-4 py-3 space-y-3">
            <Link 
              to="/" 
              className={`block transition-colors font-medium flex items-center space-x-2 ${
                location.pathname === '/' 
                  ? 'text-neon-400' 
                  : 'text-gray-300 hover:text-neon-400'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Activity className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
            <Link 
              to="/analytics" 
              className={`block transition-colors font-medium flex items-center space-x-2 ${
                location.pathname === '/analytics' 
                  ? 'text-neon-400' 
                  : 'text-gray-300 hover:text-neon-400'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Analytics</span>
            </Link>
            <Link 
              to="/docs" 
              className={`block transition-colors font-medium flex items-center space-x-2 ${
                location.pathname === '/docs' 
                  ? 'text-neon-400' 
                  : 'text-gray-300 hover:text-neon-400'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <BookOpen className="w-4 h-4" />
              <span>Docs</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
