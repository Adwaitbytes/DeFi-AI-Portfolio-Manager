
import { useState, useEffect } from 'react';

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

export const usePortfolio = (walletAddress: string | null) => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [totalValue, setTotalValue] = useState(0);
  const [totalChange24h, setTotalChange24h] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for demonstration
  const mockTokens: Token[] = [
    {
      symbol: 'BNB',
      name: 'BNB',
      balance: 12.5,
      price: 235.67,
      value: 2945.88,
      percentage: 0,
      change24h: 2.34,
      color: '#F3BA2F'
    },
    {
      symbol: 'CAKE',
      name: 'PancakeSwap',
      balance: 450.2,
      price: 3.42,
      value: 1539.68,
      percentage: 0,
      change24h: -1.25,
      color: '#FD6A85'
    },
    {
      symbol: 'BUSD',
      name: 'Binance USD',
      balance: 1200.0,
      price: 1.00,
      value: 1200.00,
      percentage: 0,
      change24h: 0.01,
      color: '#2B8CEB'
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      balance: 0.85,
      price: 1890.45,
      value: 1606.88,
      percentage: 0,
      change24h: 1.89,
      color: '#627EEA'
    },
    {
      symbol: 'ADA',
      name: 'Cardano',
      balance: 2500.0,
      price: 0.38,
      value: 950.00,
      percentage: 0,
      change24h: -0.78,
      color: '#0033AD'
    }
  ];

  const fetchPortfolioData = async () => {
    if (!walletAddress) return;

    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Calculate percentages and total value
    const total = mockTokens.reduce((sum, token) => sum + token.value, 0);
    
    const tokensWithPercentages = mockTokens.map(token => ({
      ...token,
      percentage: (token.value / total) * 100
    }));

    // Calculate total portfolio change
    const totalChange = tokensWithPercentages.reduce((sum, token) => {
      return sum + (token.change24h * (token.percentage / 100));
    }, 0);

    setTokens(tokensWithPercentages);
    setTotalValue(total);
    setTotalChange24h(totalChange);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPortfolioData();
  }, [walletAddress]);

  return {
    tokens,
    totalValue,
    totalChange24h,
    isLoading,
    refetch: fetchPortfolioData
  };
};
