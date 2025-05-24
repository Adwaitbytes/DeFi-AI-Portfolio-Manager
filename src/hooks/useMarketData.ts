
import { useState, useEffect } from 'react';

export const useMarketData = () => {
  const [priceData, setPriceData] = useState<any[]>([]);
  const [topPools, setTopPools] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock price data for the last 30 days
  const generateMockPriceData = () => {
    const data = [];
    const basePrice = 235;
    let currentPrice = basePrice;
    
    for (let i = 30; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      // Add some realistic price variation
      const change = (Math.random() - 0.5) * 20;
      currentPrice = Math.max(currentPrice + change, basePrice * 0.8);
      
      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        price: Math.round(currentPrice * 100) / 100,
        volatility: Math.abs(change / currentPrice * 100)
      });
    }
    
    return data;
  };

  // Mock DeFi pools data
  const mockTopPools = [
    {
      name: 'BNB-BUSD',
      symbol: 'LP',
      protocol: 'PancakeSwap',
      apy: 45.67,
      tvl: 125000000,
      change24h: 2.34,
      risk: 'Low'
    },
    {
      name: 'CAKE-BNB',
      symbol: 'LP',
      protocol: 'PancakeSwap',
      apy: 78.23,
      tvl: 89000000,
      change24h: -1.45,
      risk: 'Medium'
    },
    {
      name: 'ETH-BUSD',
      symbol: 'LP',
      protocol: 'PancakeSwap',
      apy: 32.89,
      tvl: 67000000,
      change24h: 1.89,
      risk: 'Low'
    },
    {
      name: 'ALPACA-BNB',
      symbol: 'LP',
      protocol: 'Alpaca Finance',
      apy: 156.78,
      tvl: 23000000,
      change24h: 5.67,
      risk: 'High'
    },
    {
      name: 'VENUS-BNB',
      symbol: 'LP',
      protocol: 'Venus',
      apy: 42.34,
      tvl: 45000000,
      change24h: -0.89,
      risk: 'Medium'
    },
    {
      name: 'ADA-BUSD',
      symbol: 'LP',
      protocol: 'PancakeSwap',
      apy: 28.45,
      tvl: 34000000,
      change24h: -0.78,
      risk: 'Low'
    }
  ];

  const fetchMarketData = async () => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setPriceData(generateMockPriceData());
    setTopPools(mockTopPools);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMarketData();
    
    // Update data every 30 seconds
    const interval = setInterval(fetchMarketData, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return {
    priceData,
    topPools,
    isLoading,
    refetch: fetchMarketData
  };
};
