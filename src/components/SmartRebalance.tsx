
import React, { useState } from 'react';
import { Zap, Shield, AlertTriangle, CheckCircle, ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RebalanceProps {
  analysis: any;
  onExecuteRebalance: () => void;
  isExecuting: boolean;
  transactionHash: string | null;
}

const SmartRebalance: React.FC<RebalanceProps> = ({ 
  analysis, 
  onExecuteRebalance, 
  isExecuting, 
  transactionHash 
}) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const handleExecute = () => {
    if (!agreedToTerms) return;
    setShowConfirmation(false);
    onExecuteRebalance();
  };

  if (!analysis) {
    return (
      <div className="glass-card p-8 text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-cyber-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 opacity-50">
          <Zap className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Analysis Required</h3>
        <p className="text-gray-400">
          Please run an AI analysis first to get rebalancing recommendations.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Rebalance Overview */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-cyber-600 to-purple-600 rounded-xl flex items-center justify-center animate-glow-pulse">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Smart Rebalance</h2>
              <p className="text-gray-400">Automated portfolio optimization</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-neon-400" />
            <span className="text-neon-400 font-semibold">Smart Contract Protected</span>
          </div>
        </div>

        {/* Rebalance Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <h4 className="font-semibold text-white mb-2">Expected Return</h4>
            <p className="text-2xl font-bold text-neon-400">+12.4%</p>
            <p className="text-sm text-gray-400">Projected annual return</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <h4 className="font-semibold text-white mb-2">Risk Reduction</h4>
            <p className="text-2xl font-bold text-cyber-400">-18%</p>
            <p className="text-sm text-gray-400">Portfolio volatility</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <h4 className="font-semibold text-white mb-2">Gas Fee</h4>
            <p className="text-2xl font-bold text-yellow-400">~$3.50</p>
            <p className="text-sm text-gray-400">Estimated cost</p>
          </div>
        </div>
      </div>

      {/* Rebalance Actions */}
      <div className="glass-card p-6">
        <h3 className="text-xl font-bold text-white mb-4">Proposed Actions</h3>
        <div className="space-y-4">
          {analysis.suggestions?.map((suggestion: any, index: number) => (
            <div key={index} className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    suggestion.type === 'reduce' 
                      ? 'bg-red-600/20 border border-red-400/30' 
                      : 'bg-neon-600/20 border border-neon-400/30'
                  }`}>
                    {suggestion.type === 'reduce' ? (
                      <ArrowRight className="w-5 h-5 text-red-400 rotate-180" />
                    ) : (
                      <ArrowRight className="w-5 h-5 text-neon-400" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{suggestion.action}</p>
                    <p className="text-sm text-gray-400">{suggestion.reason}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${
                    suggestion.type === 'reduce' ? 'text-red-400' : 'text-neon-400'
                  }`}>
                    {suggestion.percentage}%
                  </p>
                  <p className="text-sm text-gray-400">
                    {formatCurrency(suggestion.amount)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Information */}
      <div className="glass-card p-6">
        <h3 className="text-xl font-bold text-white mb-4">Security & Safety</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-neon-600/10 border border-neon-400/30 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="w-5 h-5 text-neon-400" />
              <h4 className="font-semibold text-white">Smart Contract Audited</h4>
            </div>
            <p className="text-gray-300 text-sm">
              Our rebalancing contracts have been audited by leading security firms and are battle-tested.
            </p>
          </div>
          <div className="bg-cyber-600/10 border border-cyber-400/30 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="w-5 h-5 text-cyber-400" />
              <h4 className="font-semibold text-white">Non-Custodial</h4>
            </div>
            <p className="text-gray-300 text-sm">
              Your funds never leave your wallet. All transactions are executed directly from your account.
            </p>
          </div>
        </div>
      </div>

      {/* Execute Rebalance */}
      <div className="glass-card p-6">
        {!transactionHash ? (
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-4 bg-yellow-600/10 border border-yellow-400/30 rounded-xl">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />
              <div>
                <h4 className="font-semibold text-white mb-1">Important Notice</h4>
                <p className="text-gray-300 text-sm">
                  This action will execute multiple transactions to rebalance your portfolio. 
                  Make sure you have sufficient BNB for gas fees.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="w-4 h-4 bg-white/10 border border-white/30 rounded focus:ring-neon-400"
              />
              <label htmlFor="terms" className="text-gray-300 text-sm">
                I understand the risks and agree to execute this rebalance
              </label>
            </div>

            <div className="flex space-x-4">
              <Button
                onClick={() => setShowConfirmation(true)}
                disabled={!agreedToTerms || isExecuting}
                className="cyber-button flex-1"
              >
                {isExecuting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Executing...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    Execute Rebalance
                  </>
                )}
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-neon-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white">Rebalance Executed Successfully!</h3>
            <p className="text-gray-400">Your portfolio has been optimized according to AI recommendations.</p>
            <div className="bg-white/5 rounded-xl p-4 border border-neon-400/30">
              <p className="text-sm text-gray-400 mb-2">Transaction Hash:</p>
              <div className="flex items-center justify-center space-x-2">
                <code className="text-neon-400 font-mono text-sm">{transactionHash}</code>
                <button className="text-neon-400 hover:text-neon-300">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="glass-card p-6 max-w-md w-full border border-neon-400/30">
            <h3 className="text-xl font-bold text-white mb-4">Confirm Rebalance</h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to execute this rebalance? This action cannot be undone.
            </p>
            <div className="flex space-x-4">
              <Button
                onClick={() => setShowConfirmation(false)}
                className="flex-1 bg-white/10 hover:bg-white/20 text-white"
              >
                Cancel
              </Button>
              <Button
                onClick={handleExecute}
                className="cyber-button flex-1"
              >
                <Zap className="w-4 h-4 mr-2" />
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartRebalance;
