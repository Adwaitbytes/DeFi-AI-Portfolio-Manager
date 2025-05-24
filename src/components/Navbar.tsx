
import React, { useState } from 'react';
import { Wallet, Menu, X, Activity, BarChart3, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  onConnectWallet: () => void;
  walletAddress: string | null;
  isConnecting: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onConnectWallet, walletAddress, isConnecting }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <nav className="sticky top-0 z-50 glass-card border-b border-neon-400/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-neon-400 to-cyber-600 rounded-xl flex items-center justify-center animate-glow-pulse">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-neon-400 to-cyber-400 bg-clip-text text-transparent">
              DeFi AI Portfolio
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#dashboard" className="text-gray-300 hover:text-neon-400 transition-colors font-medium">
              Dashboard
            </a>
            <a href="#analytics" className="text-gray-300 hover:text-neon-400 transition-colors font-medium">
              Analytics
            </a>
            <a href="#docs" className="text-gray-300 hover:text-neon-400 transition-colors font-medium">
              Docs
            </a>
          </div>

          {/* Wallet Connection */}
          <div className="flex items-center space-x-4">
            {walletAddress ? (
              <div className="glass-card px-4 py-2 neon-border">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-neon-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-mono text-neon-400">
                    {formatAddress(walletAddress)}
                  </span>
                </div>
              </div>
            ) : (
              <Button 
                onClick={onConnectWallet}
                disabled={isConnecting}
                className="cyber-button"
              >
                <Wallet className="w-4 h-4 mr-2" />
                {isConnecting ? 'Connecting...' : 'Connect Wallet'}
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
            <a href="#dashboard" className="block text-gray-300 hover:text-neon-400 transition-colors font-medium">
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-4 h-4" />
                <span>Dashboard</span>
              </div>
            </a>
            <a href="#analytics" className="block text-gray-300 hover:text-neon-400 transition-colors font-medium">
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4" />
                <span>Analytics</span>
              </div>
            </a>
            <a href="#docs" className="block text-gray-300 hover:text-neon-400 transition-colors font-medium">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4" />
                <span>Docs</span>
              </div>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
