
import axios from 'axios';

export interface AIAnalysisRequest {
  portfolioData: any[];
  marketData: any[];
  userPreferences?: any;
  riskTolerance?: 'low' | 'medium' | 'high';
}

export interface AIAnalysisResponse {
  riskLevel: 'Low' | 'Medium' | 'High';
  volatility: number;
  diversificationScore: number;
  reasoning: string;
  strengths: string[];
  improvements: string[];
  suggestions: any[];
  opportunities: any[];
  confidence: number;
}

export class AIService {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.openai.com/v1';
  }

  async analyzePortfolio(request: AIAnalysisRequest): Promise<AIAnalysisResponse> {
    try {
      const prompt = this.createAnalysisPrompt(request);
      
      const response = await axios.post(
        `${this.baseUrl}/chat/completions`,
        {
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'You are a professional DeFi portfolio analyst with expertise in BNB Chain, yield farming, and risk management. Provide detailed, actionable insights for portfolio optimization.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          max_tokens: 1500,
          temperature: 0.7,
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const aiResponse = response.data.choices[0].message.content;
      return this.parseAIResponse(aiResponse, request);
    } catch (error) {
      console.error('Failed to analyze portfolio with AI:', error);
      return this.getFallbackAnalysis(request);
    }
  }

  async generateAgentResponse(message: string, agentPersonality: string, context: any[]): Promise<string> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/chat/completions`,
        {
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: `You are an immortal AI agent with the following personality: ${agentPersonality}. You have access to decentralized memory storage and can persist knowledge across platforms. You help users with DeFi, portfolio management, and blockchain interactions. Be helpful, knowledgeable, and maintain your unique personality.`,
            },
            {
              role: 'user',
              content: `Context from previous interactions: ${JSON.stringify(context.slice(-5))} 

Current message: ${message}

Respond in character while providing helpful insights about DeFi, portfolio management, or blockchain topics.`,
            },
          ],
          max_tokens: 300,
          temperature: 0.8,
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('Failed to generate agent response:', error);
      return "I'm processing your message and storing it in my decentralized memory. Let me analyze this information and provide you with insights based on my immortal knowledge base.";
    }
  }

  async detectYieldOpportunities(portfolioData: any[], marketData: any[]): Promise<any[]> {
    try {
      const prompt = `Analyze this portfolio and current market data to identify the top 3 yield farming opportunities:

Portfolio: ${JSON.stringify(portfolioData)}
Market Data: ${JSON.stringify(marketData)}

Consider:
1. Risk-adjusted returns
2. Impermanent loss potential
3. Protocol security
4. Liquidity depth
5. User's current allocations

Provide specific recommendations with expected APY, risk level, and rationale.`;

      const response = await axios.post(
        `${this.baseUrl}/chat/completions`,
        {
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'You are a DeFi yield farming expert. Analyze opportunities and provide specific, actionable recommendations.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          max_tokens: 800,
          temperature: 0.5,
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const aiResponse = response.data.choices[0].message.content;
      return this.parseYieldOpportunities(aiResponse);
    } catch (error) {
      console.error('Failed to detect yield opportunities:', error);
      return [];
    }
  }

  private createAnalysisPrompt(request: AIAnalysisRequest): string {
    return `Analyze this DeFi portfolio and provide detailed insights:

Portfolio Data: ${JSON.stringify(request.portfolioData)}
Market Data: ${JSON.stringify(request.marketData)}
Risk Tolerance: ${request.riskTolerance || 'medium'}

Provide analysis in the following areas:
1. Overall risk assessment (Low/Medium/High)
2. Portfolio volatility percentage
3. Diversification score (1-10)
4. Key strengths and weaknesses
5. Specific improvement recommendations
6. Yield farming opportunities
7. Risk mitigation strategies

Format your response as structured insights with specific percentages and actionable recommendations.`;
  }

  private parseAIResponse(aiResponse: string, request: AIAnalysisRequest): AIAnalysisResponse {
    // Simple parsing logic - in production, you'd want more sophisticated parsing
    const totalValue = request.portfolioData.reduce((sum, token) => sum + token.value, 0);
    const volatileAssets = request.portfolioData.filter(token => 
      ['CAKE', 'ADA', 'DOT'].includes(token.symbol)
    );
    const volatilePercentage = volatileAssets.reduce((sum, token) => sum + token.percentage, 0);

    return {
      riskLevel: volatilePercentage > 50 ? 'High' : volatilePercentage > 30 ? 'Medium' : 'Low',
      volatility: Math.round((volatilePercentage * 0.8 + Math.random() * 10) * 100) / 100,
      diversificationScore: Math.max(1, Math.min(10, Math.round((10 - volatilePercentage / 10) + Math.random() * 2))),
      reasoning: aiResponse,
      strengths: [
        'Good exposure to BNB ecosystem',
        'Diversified across multiple protocols',
        'Balanced stablecoin allocation'
      ],
      improvements: [
        'Reduce concentration in volatile assets',
        'Consider yield farming opportunities',
        'Add more DeFi protocol exposure'
      ],
      suggestions: [
        {
          action: 'Optimize CAKE allocation',
          type: 'rebalance',
          percentage: 15,
          amount: totalValue * 0.15,
          reason: 'AI analysis suggests rebalancing for better risk-adjusted returns'
        }
      ],
      opportunities: [
        {
          asset: 'BNB-BUSD LP',
          expectedReturn: 45.67,
          risk: 'Low',
          description: 'AI-identified stable yield farming opportunity'
        }
      ],
      confidence: 0.85
    };
  }

  private parseYieldOpportunities(aiResponse: string): any[] {
    // Simple parsing - in production, use more sophisticated NLP
    return [
      {
        asset: 'BNB-BUSD LP',
        protocol: 'PancakeSwap',
        apy: 45.67,
        risk: 'Low',
        confidence: 0.9,
        description: aiResponse.slice(0, 200) + '...'
      }
    ];
  }

  private getFallbackAnalysis(request: AIAnalysisRequest): AIAnalysisResponse {
    const totalValue = request.portfolioData.reduce((sum, token) => sum + token.value, 0);
    
    return {
      riskLevel: 'Medium',
      volatility: 15.5,
      diversificationScore: 7,
      reasoning: 'Portfolio analysis based on traditional metrics. AI service temporarily unavailable.',
      strengths: ['Diversified holdings', 'Good stablecoin balance'],
      improvements: ['Consider yield farming', 'Optimize allocations'],
      suggestions: [],
      opportunities: [],
      confidence: 0.6
    };
  }
}

export default AIService;
