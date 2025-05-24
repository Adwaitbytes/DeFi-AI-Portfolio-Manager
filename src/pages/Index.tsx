
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
import { usePerplexity } from '@/hooks/usePerplexity';
import { Activity, BarChart3, Brain, Zap, Bot, Database, Globe, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  const [activeTab, setActiveTab] = useState('agent');
  const [perplexityQuestion, setPerplexityQuestion] = useState('');
  
  const wallet = useWallet();
  const portfolio = usePortfolio(wallet.address);
  const marketData = useMarketData();
  const ai = useAI();
  const rebalance = useRebalance();
  const immortalAgent = useImmortalAgent(wallet.address);
  const crossPlatform = useCrossPlatform();
  const perplexity = usePerplexity();

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

  const handlePerplexitySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (perplexityQuestion.trim()) {
      await perplexity.askPerplexity(perplexityQuestion);
    }
  };

  const tabs = [
    { id: 'agent', label: 'AI Agent', icon: Bot },
    { id: 'perplexity', label: 'AI Chat', icon: MessageSquare },
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

      <div className="w-full">
        {!wallet.isConnected ? (
          // Welcome Screen
          <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
            <div className="text-center max-w-4xl mx-auto">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-neon-400 to-cyber-600 rounded-3xl flex items-center justify-center mx-auto mb-6 sm:mb-8 animate-float">
                <Bot className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
              </div>
              
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-neon-400 via-cyber-400 to-purple-400 bg-clip-text text-transparent animate-cyber-slide leading-tight">
                Immortal AI Agent Platform
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed max-w-3xl mx-auto">
                Create your sovereign AI companion that learns, evolves, and persists across all platforms.
                Powered by decentralized memory, cross-platform interoperability, and BNB Chain.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
                <Card className="glass-card border-white/10 hover:scale-105 transition-transform">
                  <CardHeader className="pb-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-neon-600/20 rounded-lg flex items-center justify-center mb-2 mx-auto">
                      <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-neon-400" />
                    </div>
                    <CardTitle className="text-base sm:text-lg text-white text-center">Immortal AI Agent</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-400 text-xs sm:text-sm text-center">
                      Create AI agents that persist beyond sessions with sovereign identity and memory
                    </CardDescription>
                  </CardContent>
                </Card>
                
                <Card className="glass-card border-white/10 hover:scale-105 transition-transform">
                  <CardHeader className="pb-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-cyber-600/20 rounded-lg flex items-center justify-center mb-2 mx-auto">
                      <Database className="w-5 h-5 sm:w-6 sm:h-6 text-cyber-400" />
                    </div>
                    <CardTitle className="text-base sm:text-lg text-white text-center">Decentralized Memory</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-400 text-xs sm:text-sm text-center">
                      On-chain memory storage using Membase for permanent, encrypted agent memories
                    </CardDescription>
                  </CardContent>
                </Card>
                
                <Card className="glass-card border-white/10 hover:scale-105 transition-transform sm:col-span-2 lg:col-span-1">
                  <CardHeader className="pb-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-2 mx-auto">
                      <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                    </div>
                    <CardTitle className="text-base sm:text-lg text-white text-center">Cross-Platform</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-400 text-xs sm:text-sm text-center">
                      Deploy your agent across web, Discord, Telegram, and more with BitAgent protocol
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
              
              <Button
                onClick={wallet.connectWallet}
                disabled={wallet.isConnecting}
                className="cyber-button text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto"
              >
                {wallet.isConnecting ? 'Connecting...' : 'Connect Wallet to Create Your Agent'}
              </Button>
            </div>
          </div>
        ) : !immortalAgent.agent ? (
          // Agent Creation Screen
          <div className="min-h-[calc(100vh-4rem)] p-4 sm:p-8">
            <div className="max-w-7xl mx-auto">
              <AgentCreation
                onCreateAgent={immortalAgent.createAgent}
                isCreating={immortalAgent.isCreating}
              />
            </div>
          </div>
        ) : (
          // Main Application with Agent
          <div className="min-h-[calc(100vh-4rem)] p-4 sm:p-8">
            <div className="max-w-7xl mx-auto">
              {/* Tab Navigation */}
              <div className="glass-card p-2 mb-4 sm:mb-8">
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

              {/* Scrollable Tab Content */}
              <div className="overflow-y-auto max-h-[calc(100vh-12rem)]">
                <div className="space-y-4 sm:space-y-8 pb-8">
                  {activeTab === 'agent' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
                      <div className="lg:col-span-1 h-[400px] sm:h-[500px]">
                        <ImmortalChat
                          agent={immortalAgent.agent}
                          onAddMemory={immortalAgent.addMemory}
                        />
                      </div>
                      <div className="lg:col-span-1 h-[400px] sm:h-[500px]">
                        <MemoryViewer
                          memories={immortalAgent.memories}
                          isLoading={immortalAgent.isLoading}
                        />
                      </div>
                      <div className="lg:col-span-1 h-[400px] sm:h-[500px]">
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
                  )}

                  {activeTab === 'perplexity' && (
                    <Card className="glass-card">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center space-x-2">
                          <MessageSquare className="w-5 h-5 text-neon-400" />
                          <span>AI Chat with Perplexity</span>
                        </CardTitle>
                        <CardDescription>
                          Ask questions about DeFi, crypto markets, and portfolio strategies
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <form onSubmit={handlePerplexitySubmit} className="flex space-x-2">
                          <Input
                            value={perplexityQuestion}
                            onChange={(e) => setPerplexityQuestion(e.target.value)}
                            placeholder="Ask about DeFi strategies, market analysis, or portfolio optimization..."
                            className="flex-1"
                            disabled={perplexity.isLoading}
                          />
                          <Button 
                            type="submit" 
                            disabled={perplexity.isLoading || !perplexityQuestion.trim()}
                            className="cyber-button"
                          >
                            {perplexity.isLoading ? 'Asking...' : 'Ask AI'}
                          </Button>
                        </form>

                        {perplexity.response && (
                          <Card className="bg-neon-950/20 border-neon-400/30">
                            <CardHeader>
                              <CardTitle className="text-neon-400 text-sm">AI Response</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-gray-300 whitespace-pre-wrap text-sm leading-relaxed">
                                {perplexity.response}
                              </p>
                              <Button 
                                onClick={perplexity.clearResponse}
                                variant="outline"
                                size="sm"
                                className="mt-4"
                              >
                                Clear Response
                              </Button>
                            </CardContent>
                          </Card>
                        )}

                        {perplexity.error && (
                          <Card className="bg-red-950/20 border-red-400/30">
                            <CardContent className="pt-6">
                              <p className="text-red-400 text-sm">Error: {perplexity.error}</p>
                            </CardContent>
                          </Card>
                        )}
                      </CardContent>
                    </Card>
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
            </div>
          </div>
        )}
      </div>

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
