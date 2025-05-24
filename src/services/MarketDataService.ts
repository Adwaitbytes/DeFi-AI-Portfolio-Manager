
import axios from 'axios';

export interface TokenPrice {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  last_updated: string;
}

export interface DeFiPool {
  id: string;
  name: string;
  protocol: string;
  chain: string;
  apy: number;
  tvl: number;
  volume_24h: number;
  fees_24h: number;
  il_risk: 'Low' | 'Medium' | 'High';
  tokens: string[];
}

export class MarketDataService {
  private coingeckoApiKey: string;
  private baseUrl: string;
  private wsConnection: WebSocket | null = null;
  private priceCallbacks: ((data: any) => void)[] = [];

  constructor(apiKey: string) {
    this.coingeckoApiKey = apiKey;
    this.baseUrl = 'https://api.coingecko.com/api/v3';
  }

  async getTokenPrices(tokenIds: string[]): Promise<TokenPrice[]> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/coins/markets`,
        {
          params: {
            vs_currency: 'usd',
            ids: tokenIds.join(','),
            order: 'market_cap_desc',
            per_page: 100,
            page: 1,
            sparkline: false,
            price_change_percentage: '24h',
          },
          headers: {
            'X-CG-Pro-API-Key': this.coingeckoApiKey,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Failed to fetch token prices:', error);
      return [];
    }
  }

  async getHistoricalPrices(tokenId: string, days: number = 30): Promise<{ date: string; price: number; volatility: number }[]> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/coins/${tokenId}/market_chart`,
        {
          params: {
            vs_currency: 'usd',
            days: days,
            interval: 'daily',
          },
          headers: {
            'X-CG-Pro-API-Key': this.coingeckoApiKey,
          },
        }
      );

      const prices = response.data.prices;
      return prices.map((price: [number, number], index: number) => {
        const date = new Date(price[0]).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const currentPrice = price[1];
        
        // Calculate volatility as percentage change from previous day
        let volatility = 0;
        if (index > 0) {
          const previousPrice = prices[index - 1][1];
          volatility = Math.abs(((currentPrice - previousPrice) / previousPrice) * 100);
        }

        return {
          date,
          price: currentPrice,
          volatility: volatility,
        };
      });
    } catch (error) {
      console.error('Failed to fetch historical prices:', error);
      return [];
    }
  }

  async getDeFiPools(): Promise<DeFiPool[]> {
    try {
      // Using DeFiLlama API for pool data
      const response = await axios.get('https://yields.llama.fi/pools');
      
      const bscPools = response.data.data
        .filter((pool: any) => pool.chain === 'BSC' && pool.tvlUsd > 1000000) // Filter BSC pools with >1M TVL
        .slice(0, 10) // Top 10 pools
        .map((pool: any) => ({
          id: pool.pool,
          name: pool.symbol || `${pool.project}-${pool.pool.slice(0, 8)}`,
          protocol: pool.project,
          chain: 'BSC',
          apy: pool.apy || 0,
          tvl: pool.tvlUsd,
          volume_24h: pool.volumeUsd1d || 0,
          fees_24h: pool.volumeUsd1d * 0.003 || 0, // Assuming 0.3% fees
          il_risk: this.calculateILRisk(pool.apy),
          tokens: pool.underlyingTokens || [],
        }));

      return bscPools;
    } catch (error) {
      console.error('Failed to fetch DeFi pools:', error);
      // Return mock data as fallback
      return [
        {
          id: 'pancakeswap-bnb-busd',
          name: 'BNB-BUSD',
          protocol: 'PancakeSwap',
          chain: 'BSC',
          apy: 45.67,
          tvl: 125000000,
          volume_24h: 5000000,
          fees_24h: 15000,
          il_risk: 'Low',
          tokens: ['BNB', 'BUSD'],
        },
        {
          id: 'pancakeswap-cake-bnb',
          name: 'CAKE-BNB',
          protocol: 'PancakeSwap',
          chain: 'BSC',
          apy: 78.23,
          tvl: 89000000,
          volume_24h: 3200000,
          fees_24h: 9600,
          il_risk: 'Medium',
          tokens: ['CAKE', 'BNB'],
        },
      ];
    }
  }

  private calculateILRisk(apy: number): 'Low' | 'Medium' | 'High' {
    if (apy < 50) return 'Low';
    if (apy < 100) return 'Medium';
    return 'High';
  }

  async getPortfolioValue(walletAddress: string): Promise<{ totalValue: number; tokens: any[] }> {
    try {
      // Using BSC scan API to get token balances
      const response = await axios.get(
        `https://api.bscscan.com/api?module=account&action=tokentx&address=${walletAddress}&page=1&offset=100&sort=desc&apikey=YourApiKeyToken`
      );

      // For demo purposes, return mock portfolio data
      const mockTokens = [
        { symbol: 'BNB', balance: 12.5, price: 235.67 },
        { symbol: 'CAKE', balance: 450.2, price: 3.42 },
        { symbol: 'BUSD', balance: 1200.0, price: 1.00 },
      ];

      const totalValue = mockTokens.reduce((sum, token) => sum + (token.balance * token.price), 0);

      return {
        totalValue,
        tokens: mockTokens,
      };
    } catch (error) {
      console.error('Failed to fetch portfolio value:', error);
      return { totalValue: 0, tokens: [] };
    }
  }

  connectWebSocket(tokens: string[]): void {
    const wsUrl = 'wss://ws-api.coingecko.com/api/v2/coins/prices';
    
    this.wsConnection = new WebSocket(wsUrl);

    this.wsConnection.onopen = () => {
      console.log('WebSocket connected for real-time prices');
      
      // Subscribe to price updates
      const subscribeMessage = {
        type: 'subscribe',
        channels: [
          {
            name: 'ticker',
            currencies: tokens,
          },
        ],
      };
      
      this.wsConnection?.send(JSON.stringify(subscribeMessage));
    };

    this.wsConnection.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.priceCallbacks.forEach(callback => callback(data));
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
      }
    };

    this.wsConnection.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    this.wsConnection.onclose = () => {
      console.log('WebSocket disconnected');
      // Reconnect after 5 seconds
      setTimeout(() => this.connectWebSocket(tokens), 5000);
    };
  }

  subscribeToPriceUpdates(callback: (data: any) => void): void {
    this.priceCallbacks.push(callback);
  }

  disconnect(): void {
    if (this.wsConnection) {
      this.wsConnection.close();
      this.wsConnection = null;
    }
    this.priceCallbacks = [];
  }
}

export default MarketDataService;
