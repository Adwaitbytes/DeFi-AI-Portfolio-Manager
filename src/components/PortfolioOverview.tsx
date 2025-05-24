
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Percent } from 'lucide-react';

interface Token {
  symbol: string;
  name: string;
  balance: number;
  price: number;
  value: number;
  percentage: number;
  change24h: number;
  color: string;
}

interface PortfolioOverviewProps {
  tokens: Token[];
  totalValue: number;
  totalChange24h: number;
}

const PortfolioOverview: React.FC<PortfolioOverviewProps> = ({ tokens, totalValue, totalChange24h }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="glass-card p-3 border border-neon-400/30">
          <p className="text-white font-semibold">{data.name}</p>
          <p className="text-neon-400">{formatCurrency(data.value)}</p>
          <p className="text-gray-300">{data.percentage.toFixed(2)}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Portfolio Summary */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Portfolio Value</h2>
          <div className="flex items-center space-x-2">
            <DollarSign className="w-5 h-5 text-neon-400" />
            <span className="text-neon-400 font-semibold">BNB Chain</span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-3xl font-bold text-white">
              {formatCurrency(totalValue)}
            </p>
            <div className="flex items-center space-x-2 mt-2">
              {totalChange24h >= 0 ? (
                <TrendingUp className="w-4 h-4 text-neon-400" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-400" />
              )}
              <span className={`font-semibold ${totalChange24h >= 0 ? 'text-neon-400' : 'text-red-400'}`}>
                {totalChange24h >= 0 ? '+' : ''}{totalChange24h.toFixed(2)}%
              </span>
              <span className="text-gray-400 text-sm">24h</span>
            </div>
          </div>

          {/* Portfolio Distribution */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-white mb-4">Asset Distribution</h3>
            <div className="space-y-3">
              {tokens.map((token, index) => (
                <div key={token.symbol} className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: token.color }}
                    ></div>
                    <div>
                      <p className="font-semibold text-white">{token.symbol}</p>
                      <p className="text-sm text-gray-400">{formatNumber(token.balance)} tokens</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-white">{formatCurrency(token.value)}</p>
                    <div className="flex items-center space-x-1">
                      <Percent className="w-3 h-3 text-gray-400" />
                      <span className="text-sm text-gray-400">{token.percentage.toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="glass-card p-6">
        <h3 className="text-xl font-bold text-white mb-6">Portfolio Allocation</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={tokens}
                cx="50%"
                cy="50%"
                outerRadius={120}
                innerRadius={60}
                paddingAngle={2}
                dataKey="value"
              >
                {tokens.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                formatter={(value, entry) => (
                  <span style={{ color: entry.color }}>{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PortfolioOverview;
