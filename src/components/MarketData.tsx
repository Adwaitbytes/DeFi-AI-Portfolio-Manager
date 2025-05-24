
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, TrendingDown, Activity, Zap, Shield } from 'lucide-react';

interface MarketDataProps {
  priceData: any[];
  topPools: any[];
}

const MarketData: React.FC<MarketDataProps> = ({ priceData, topPools }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('7D');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  return (
    <div className="space-y-6">
      {/* Market Trends */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Market Trends</h2>
          <div className="flex space-x-2">
            {['7D', '1M', '3M'].map((timeframe) => (
              <button
                key={timeframe}
                onClick={() => setSelectedTimeframe(timeframe)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedTimeframe === timeframe
                    ? 'bg-neon-600 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {timeframe}
              </button>
            ))}
          </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={priceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="date" 
                stroke="rgba(255,255,255,0.6)"
                fontSize={12}
              />
              <YAxis 
                stroke="rgba(255,255,255,0.6)"
                fontSize={12}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.9)',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  borderRadius: '12px',
                  color: 'white'
                }}
                formatter={(value: any) => [formatCurrency(value), 'Price']}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#22c55e"
                strokeWidth={3}
                dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#22c55e', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top DeFi Pools */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Top APY DeFi Pools</h2>
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-neon-400" />
            <span className="text-neon-400 font-semibold">BNB Chain</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topPools.map((pool, index) => (
            <div key={pool.name} className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all border border-white/10 hover:border-neon-400/30">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-neon-400 to-cyber-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{pool.symbol}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-white">{pool.name}</p>
                    <p className="text-sm text-gray-400">{pool.protocol}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Shield className="w-4 h-4 text-neon-400" />
                  <span className="text-xs text-neon-400">{pool.risk}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">APY</span>
                  <span className="font-bold text-neon-400">{pool.apy}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">TVL</span>
                  <span className="text-white">{formatCurrency(pool.tvl)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">24h Change</span>
                  <span className={`font-semibold ${pool.change24h >= 0 ? 'text-neon-400' : 'text-red-400'}`}>
                    {formatPercentage(pool.change24h)}
                  </span>
                </div>
              </div>

              <button className="w-full mt-4 bg-gradient-to-r from-neon-600/20 to-cyber-600/20 border border-neon-400/30 text-neon-400 py-2 rounded-lg font-semibold hover:from-neon-600/30 hover:to-cyber-600/30 transition-all">
                View Pool
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Volatility Chart */}
      <div className="glass-card p-6">
        <h2 className="text-2xl font-bold text-white mb-6">Portfolio Volatility</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={priceData.slice(-10)}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="date" 
                stroke="rgba(255,255,255,0.6)"
                fontSize={12}
              />
              <YAxis 
                stroke="rgba(255,255,255,0.6)"
                fontSize={12}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.9)',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  borderRadius: '12px',
                  color: 'white'
                }}
              />
              <Bar dataKey="volatility" fill="url(#volatilityGradient)" />
              <defs>
                <linearGradient id="volatilityGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default MarketData;
