
import React, { useState } from 'react';
import { Brain, AlertTriangle, CheckCircle, TrendingUp, Shield, Zap, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AIAnalysisProps {
  onAnalyze: () => void;
  isAnalyzing: boolean;
  analysis: any;
}

const AIAnalysis: React.FC<AIAnalysisProps> = ({ onAnalyze, isAnalyzing, analysis }) => {
  const [selectedTab, setSelectedTab] = useState('overview');

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'Low':
        return <CheckCircle className="w-5 h-5 text-neon-400" />;
      case 'Medium':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'High':
        return <AlertTriangle className="w-5 h-5 text-red-400" />;
      default:
        return <Shield className="w-5 h-5 text-gray-400" />;
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low':
        return 'text-neon-400';
      case 'Medium':
        return 'text-yellow-400';
      case 'High':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Analysis Header */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-cyber-600 rounded-xl flex items-center justify-center animate-glow-pulse">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">AI Portfolio Analysis</h2>
              <p className="text-gray-400">Powered by advanced machine learning algorithms</p>
            </div>
          </div>
          <Button
            onClick={onAnalyze}
            disabled={isAnalyzing}
            className="cyber-button"
          >
            {isAnalyzing ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                Analyzing...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 mr-2" />
                Analyze Portfolio
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Analysis Results */}
      {analysis && (
        <div className="space-y-6">
          {/* Risk Assessment */}
          <div className="glass-card p-6">
            <h3 className="text-xl font-bold text-white mb-4">Risk Assessment</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex items-center space-x-3 mb-2">
                  {getRiskIcon(analysis.riskLevel)}
                  <span className="font-semibold text-white">Overall Risk</span>
                </div>
                <p className={`text-2xl font-bold ${getRiskColor(analysis.riskLevel)}`}>
                  {analysis.riskLevel}
                </p>
                <p className="text-sm text-gray-400 mt-1">Portfolio risk score</p>
              </div>

              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex items-center space-x-3 mb-2">
                  <TrendingUp className="w-5 h-5 text-cyber-400" />
                  <span className="font-semibold text-white">Volatility</span>
                </div>
                <p className="text-2xl font-bold text-cyber-400">
                  {analysis.volatility}%
                </p>
                <p className="text-sm text-gray-400 mt-1">30-day average</p>
              </div>

              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex items-center space-x-3 mb-2">
                  <Target className="w-5 h-5 text-purple-400" />
                  <span className="font-semibold text-white">Diversification</span>
                </div>
                <p className="text-2xl font-bold text-purple-400">
                  {analysis.diversificationScore}/10
                </p>
                <p className="text-sm text-gray-400 mt-1">Diversification score</p>
              </div>
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="glass-card p-6">
            <h3 className="text-xl font-bold text-white mb-4">AI Recommendations</h3>
            
            {/* Tab Navigation */}
            <div className="flex space-x-4 mb-6">
              {['overview', 'rebalance', 'opportunities'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all capitalize ${
                    selectedTab === tab
                      ? 'bg-neon-600 text-white'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {selectedTab === 'overview' && (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-neon-600/10 to-cyber-600/10 border border-neon-400/30 rounded-xl p-4">
                  <h4 className="font-semibold text-white mb-2">Portfolio Summary</h4>
                  <p className="text-gray-300 leading-relaxed">
                    {analysis.reasoning}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-xl p-4">
                    <h5 className="font-semibold text-white mb-2">Strengths</h5>
                    <ul className="space-y-1">
                      {analysis.strengths?.map((strength: string, index: number) => (
                        <li key={index} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-neon-400" />
                          <span className="text-gray-300 text-sm">{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <h5 className="font-semibold text-white mb-2">Areas for Improvement</h5>
                    <ul className="space-y-1">
                      {analysis.improvements?.map((improvement: string, index: number) => (
                        <li key={index} className="flex items-center space-x-2">
                          <AlertTriangle className="w-4 h-4 text-yellow-400" />
                          <span className="text-gray-300 text-sm">{improvement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'rebalance' && (
              <div className="space-y-4">
                <h4 className="font-semibold text-white">Suggested Rebalancing</h4>
                {analysis.suggestions?.map((suggestion: any, index: number) => (
                  <div key={index} className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-white">{suggestion.action}</span>
                      <span className={`text-sm font-medium ${
                        suggestion.type === 'reduce' ? 'text-red-400' : 'text-neon-400'
                      }`}>
                        {suggestion.percentage}%
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm">{suggestion.reason}</p>
                  </div>
                ))}
              </div>
            )}

            {selectedTab === 'opportunities' && (
              <div className="space-y-4">
                <h4 className="font-semibold text-white">Market Opportunities</h4>
                {analysis.opportunities?.map((opportunity: any, index: number) => (
                  <div key={index} className="bg-gradient-to-r from-purple-600/10 to-cyber-600/10 border border-purple-400/30 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-white">{opportunity.asset}</span>
                      <span className="text-sm font-medium text-purple-400">
                        {opportunity.expectedReturn}% APY
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm mb-2">{opportunity.description}</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-400">Risk:</span>
                      <span className={`text-xs font-medium ${getRiskColor(opportunity.risk)}`}>
                        {opportunity.risk}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Getting Started */}
      {!analysis && !isAnalyzing && (
        <div className="glass-card p-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-cyber-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-float">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Ready for AI Analysis</h3>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            Our advanced AI will analyze your portfolio composition, risk factors, and market conditions to provide personalized recommendations.
          </p>
          <Button onClick={onAnalyze} className="cyber-button">
            <Zap className="w-4 h-4 mr-2" />
            Start AI Analysis
          </Button>
        </div>
      )}
    </div>
  );
};

export default AIAnalysis;
