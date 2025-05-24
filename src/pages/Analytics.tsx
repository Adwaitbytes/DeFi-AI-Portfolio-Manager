
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { useMarketData } from '@/hooks/useMarketData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from '@/components/ui/chart';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Activity, BarChart3, TrendingUp, DollarSign, AlertTriangle, RefreshCw, Zap } from 'lucide-react';

const Analytics = () => {
  const marketData = useMarketData();
  const [chartRange, setChartRange] = useState<'7d' | '30d' | '90d'>('30d');

  const chartConfig = {
    price: {
      label: 'BNB Price',
      theme: {
        light: '#3b82f6',
        dark: '#60a5fa',
      },
    },
    volatility: {
      label: 'Volatility',
      theme: {
        light: '#ef4444',
        dark: '#f87171',
      },
    },
    tvl: {
      label: 'TVL',
      theme: {
        light: '#22c55e',
        dark: '#4ade80',
      },
    },
  };

  const getPriceData = () => {
    let filteredData = marketData.priceData;
    if (chartRange === '7d') {
      filteredData = marketData.priceData.slice(-7);
    } else if (chartRange === '30d') {
      filteredData = marketData.priceData.slice(-30);
    }
    return filteredData;
  };

  const calculateMarketMetrics = () => {
    const priceData = marketData.priceData;
    if (!priceData.length) return { avgPrice: 0, maxPrice: 0, minPrice: 0, volatility: 0 };

    const prices = priceData.map(d => d.price);
    const avgPrice = prices.reduce((sum, price) => sum + price, 0) / prices.length;
    const maxPrice = Math.max(...prices);
    const minPrice = Math.min(...prices);
    const volatility = priceData.reduce((sum, d) => sum + d.volatility, 0) / priceData.length;

    return { avgPrice, maxPrice, minPrice, volatility };
  };

  const metrics = calculateMarketMetrics();

  return (
    <div className="min-h-screen bg-midnight-950 matrix-bg">
      <Navbar
        onConnectWallet={() => {}}
        onDisconnectWallet={() => {}}
        walletAddress="0x0000000000000000000000000000000000000000"
        isConnecting={false}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Market Analytics</h2>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => marketData.refetch()}
              className="flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh Data
            </Button>
          </div>

          {/* Market Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="glass-card border-neon-400/20 hover:border-neon-400/50 transition-all">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Average Price</CardTitle>
                <DollarSign className="w-4 h-4 text-neon-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">${metrics.avgPrice.toFixed(2)}</div>
                <p className="text-xs text-gray-400">30-day average</p>
              </CardContent>
            </Card>
            
            <Card className="glass-card border-neon-400/20 hover:border-neon-400/50 transition-all">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Price Range</CardTitle>
                <Activity className="w-4 h-4 text-cyber-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">${metrics.minPrice.toFixed(2)} - ${metrics.maxPrice.toFixed(2)}</div>
                <p className="text-xs text-gray-400">30-day low / high</p>
              </CardContent>
            </Card>
            
            <Card className="glass-card border-neon-400/20 hover:border-neon-400/50 transition-all">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Volatility</CardTitle>
                <TrendingUp className="w-4 h-4 text-purple-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{metrics.volatility.toFixed(2)}%</div>
                <p className="text-xs text-gray-400">30-day average</p>
              </CardContent>
            </Card>
            
            <Card className="glass-card border-neon-400/20 hover:border-neon-400/50 transition-all">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Market Trend</CardTitle>
                <Zap className="w-4 h-4 text-neon-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {metrics.avgPrice > 0 ? 'Bullish' : 'Bearish'}
                </div>
                <p className="text-xs text-gray-400">Based on price action</p>
              </CardContent>
            </Card>
          </div>

          {/* Price Chart */}
          <Card className="glass-card border-neon-400/20">
            <CardHeader className="space-y-0 pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium text-white">BNB Price Chart</CardTitle>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant={chartRange === '7d' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setChartRange('7d')}
                    className="h-8"
                  >
                    7D
                  </Button>
                  <Button 
                    variant={chartRange === '30d' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setChartRange('30d')}
                    className="h-8"
                  >
                    30D
                  </Button>
                  <Button 
                    variant={chartRange === '90d' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setChartRange('90d')}
                    className="h-8"
                  >
                    90D
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="h-[300px]">
                <ChartContainer config={chartConfig}>
                  <AreaChart data={getPriceData()}>
                    <defs>
                      <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fill: '#888' }} 
                      axisLine={{ stroke: '#444' }}
                    />
                    <YAxis 
                      tick={{ fill: '#888' }} 
                      axisLine={{ stroke: '#444' }}
                      domain={['auto', 'auto']}
                    />
                    <Tooltip />
                    <Legend />
                    <Area 
                      name="price"
                      type="monotone" 
                      dataKey="price" 
                      stroke="#22c55e" 
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#priceGradient)" 
                    />
                  </AreaChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          {/* Top Pools Table */}
          <Card className="glass-card border-neon-400/20">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-white">Top Liquidity Pools</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pool</TableHead>
                    <TableHead>Protocol</TableHead>
                    <TableHead>APY</TableHead>
                    <TableHead>TVL</TableHead>
                    <TableHead>24h Change</TableHead>
                    <TableHead>Risk</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {marketData.topPools.map((pool) => (
                    <TableRow key={pool.name}>
                      <TableCell className="font-medium text-white">
                        {pool.name}
                      </TableCell>
                      <TableCell>{pool.protocol}</TableCell>
                      <TableCell className="text-neon-400 font-semibold">
                        {pool.apy.toFixed(2)}%
                      </TableCell>
                      <TableCell>
                        ${(pool.tvl / 1000000).toFixed(1)}M
                      </TableCell>
                      <TableCell className={pool.change24h >= 0 ? 'text-neon-400' : 'text-red-500'}>
                        {pool.change24h >= 0 ? '+' : ''}{pool.change24h.toFixed(2)}%
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          pool.risk === 'Low' ? 'bg-green-500/20 text-green-400' :
                          pool.risk === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {pool.risk}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Analytics;
