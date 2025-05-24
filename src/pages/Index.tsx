
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import PortfolioOverview from '@/components/PortfolioOverview';
import MarketData from '@/components/MarketData';
import AIAnalysis from '@/components/AIAnalysis';
import SmartRebalance from '@/components/SmartRebalance';
import AgentCreation from '@/components/AgentCreation';
import ImmortalChat from '@/components/ImmortalChat';
import MemoryViewer from '@/components/MemoryViewer';
import CrossPlatformPanel from '@/components/CrossPlatformPanel';
import { useWallet } from '@/hooks/useWallet';
import { usePortfolio } from '@/hooks/usePortfolio';
import { useMarketData } from '@/hooks/useMarketData';
import { useAI } from '@/hooks/useAI';
import { useRebalance } from '@/hooks/useRebalance';
import { useImmortalAgent } from '@/hooks/useImmortalAgent';
import { useCrossPlatform } from '@/hooks/useCrossPlatform';
import { Activity, BarChart3, Brain, Zap, Bot, Database, Globe } from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState('agent');
  
  const wallet = useWallet();
  const portfolio = usePortfolio(wallet.address);
  const marketData = useMarketData();
  const ai = useAI();
  const rebalance = useRebalance();
  const immortalAgent = useImmortalAgent(wallet.address);
  const crossPlatform = useCrossPlatform();

  const handleAnalyzePortfolio = async () => {
    if (portfolio.tokens.length > 0) {
      await ai.analyzePortfolio(portfolio.tokens);
    }
  };

  const handleExecuteRebalance = async () => {
    try {
      await rebalance.executeRebalance();
      portfolio.refetch();
    } catch (error) {
      console.error('Rebalance failed:', error);
    }
  };

  const tabs = [
    { id: 'agent', label: 'AI Agent', icon: Bot },
    { id: 'dashboard', label: 'Portfolio', icon: Activity },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'ai-analysis', label: 'AI Analysis', icon: Brain },
    { id: 'rebalance', label: 'Rebalance', icon: Zap },
  ];

  return (
    <div className="min-h-screen bg-midnight-950 matrix-bg">
      <Navbar
        onConnectWallet={wallet.connectWallet}
        onDisconnectWallet={wallet.disconnectWallet}
        walletAddress={wallet.address}
        isConnecting={wallet.isConnecting}
      />

      <main className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-8 max-w-7xl mx-auto">
        {!wallet.isConnected ? (
          // Welcome Screen
          <div className="text-center py-10 sm:py-20">
            <div className="max-w-4xl mx-auto px-4">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-neon-400 to-cyber-600 rounded-3xl flex items-center justify-center mx-auto mb-6 sm:mb-8 animate-float">
                <Bot className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
              </div>
              
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-neon-400 via-cyber-400 to-purple-400 bg-clip-text text-transparent animate-cyber-slide leading-tight">
                Immortal AI Agent Platform
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed max-w-3xl mx-auto">
                Create your sovereign AI companion that learns, evolves, and persists across all platforms.
                Powered by decentralized memory on BNB Greenfield, cross-platform interoperability, and immortal intelligence.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
                <div className="glass-card p-4 sm:p-6 hover:scale-105 transition-transform">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-neon-600/20 rounded-lg flex items-center justify-center mb-3 sm:mb-4 mx-auto">
                    <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-neon-400" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Immortal AI Agent</h3>
                  <p className="text-gray-400 text-xs sm:text-sm">
                    Create AI agents that persist beyond sessions with sovereign identity and memory
                  </p>
                </div>
                
                <div className="glass-card p-4 sm:p-6 hover:scale-105 transition-transform">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-cyber-600/20 rounded-lg flex items-center justify-center mb-3 sm:mb-4 mx-auto">
                    <Database className="w-5 h-5 sm:w-6 sm:h-6 text-cyber-400" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-2">BNB Greenfield Storage</h3>
                  <p className="text-gray-400 text-xs sm:text-sm">
                    Decentralized memory storage using BNB Greenfield for permanent, encrypted agent memories
                  </p>
                </div>
                
                <div className="glass-card p-4 sm:p-6 hover:scale-105 transition-transform sm:col-span-2 lg:col-span-1">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-3 sm:mb-4 mx-auto">
                    <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Cross-Platform</h3>
                  <p className="text-gray-400 text-xs sm:text-sm">
                    Deploy your agent across web, Discord, Telegram, and more with BitAgent protocol
                  </p>
                </div>
              </div>
              
              <button
                onClick={wallet.connectWallet}
                disabled={wallet.isConnecting}
                className="cyber-button text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto"
              >
                {wallet.isConnecting ? 'Connecting...' : 'Connect Wallet to Create Your Agent'}
              </button>
            </div>
          </div>
        ) : !immortalAgent.agent ? (
          // Agent Creation Screen
          <div className="w-full">
            <AgentCreation
              onCreateAgent={immortalAgent.createAgent}
              isCreating={immortalAgent.isCreating}
            />
          </div>
        ) : (
          // Main Application with Agent
          <div className="w-full">
            {/* Tab Navigation */}
            <div className="glass-card p-2 mb-4 sm:mb-8 sticky top-20 z-40">
              <div className="flex space-x-1 sm:space-x-2 overflow-x-auto scrollbar-hide">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-6 py-2 sm:py-3 rounded-xl font-medium transition-all whitespace-nowrap text-sm sm:text-base ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-neon-600 to-cyber-600 text-white'
                          : 'text-gray-300 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                      <span className="hidden sm:inline">{tab.label}</span>
                      <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tab Content with proper scrolling */}
            <div className="space-y-4 sm:space-y-8 pb-8 overflow-y-auto">
              {activeTab === 'agent' && (
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
                  <div className="xl:col-span-1 order-1">
                    <div className="h-[400px] sm:h-[500px] lg:h-[600px]">
                      <ImmortalChat
                        agent={immortalAgent.agent}
                        onAddMemory={immortalAgent.addMemory}
                      />
                    </div>
                  </div>
                  <div className="xl:col-span-1 order-2">
                    <div className="h-[400px] sm:h-[500px] lg:h-[600px]">
                      <MemoryViewer
                        memories={immortalAgent.memories}
                        isLoading={immortalAgent.isLoading}
                      />
                    </div>
                  </div>
                  <div className="xl:col-span-1 order-3">
                    <div className="h-[400px] sm:h-[500px] lg:h-[600px]">
                      <CrossPlatformPanel
                        platforms={crossPlatform.platforms}
                        activeConnections={crossPlatform.activeConnections}
                        isSyncing={crossPlatform.isSyncing}
                        onConnect={crossPlatform.connectPlatform}
                        onDisconnect={crossPlatform.disconnectPlatform}
                        onSyncAll={crossPlatform.syncAllPlatforms}
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'dashboard' && (
                <div className="space-y-4 sm:space-y-8">
                  <PortfolioOverview
                    tokens={portfolio.tokens}
                    totalValue={portfolio.totalValue}
                    totalChange24h={portfolio.totalChange24h}
                  />
                </div>
              )}

              {activeTab === 'analytics' && (
                <MarketData
                  priceData={marketData.priceData}
                  topPools={marketData.topPools}
                />
              )}

              {activeTab === 'ai-analysis' && (
                <AIAnalysis
                  onAnalyze={handleAnalyzePortfolio}
                  isAnalyzing={ai.isAnalyzing}
                  analysis={ai.analysis}
                />
              )}

              {activeTab === 'rebalance' && (
                <SmartRebalance
                  analysis={ai.analysis}
                  onExecuteRebalance={handleExecuteRebalance}
                  isExecuting={rebalance.isExecuting}
                  transactionHash={rebalance.transactionHash}
                />
              )}
            </div>
          </div>
        )}
      </main>

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-64 sm:h-64 bg-neon-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-cyber-600/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-24 h-24 sm:w-48 sm:h-48 bg-purple-600/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
    </div>
  );
};

export default Index;
