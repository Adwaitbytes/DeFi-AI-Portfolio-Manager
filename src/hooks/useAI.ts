
import { useState } from 'react';

export const useAI = () => {
  const [analysis, setAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzePortfolio = async (tokens: any[]) => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock AI analysis based on portfolio composition
    const totalValue = tokens.reduce((sum, token) => sum + token.value, 0);
    const volatileAssets = tokens.filter(token => 
      token.symbol === 'CAKE' || token.symbol === 'ADA'
    );
    const volatilePercentage = volatileAssets.reduce((sum, token) => sum + token.percentage, 0);
    
    const mockAnalysis = {
      riskLevel: volatilePercentage > 50 ? 'High' : volatilePercentage > 30 ? 'Medium' : 'Low',
      volatility: Math.round((volatilePercentage * 0.8 + Math.random() * 10) * 100) / 100,
      diversificationScore: Math.max(1, Math.min(10, Math.round((10 - volatilePercentage / 10) + Math.random() * 2))),
      reasoning: volatilePercentage > 50 
        ? `Your portfolio has ${volatilePercentage.toFixed(1)}% allocated to volatile assets like CAKE and ADA. We recommend reducing exposure to these assets and increasing allocation to stable assets like BUSD for better risk management.`
        : `Your portfolio shows good diversification across different asset classes. Consider optimizing allocation to maximize yield while maintaining current risk levels.`,
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
          action: 'Reduce CAKE allocation',
          type: 'reduce',
          percentage: 15,
          amount: tokens.find(t => t.symbol === 'CAKE')?.value * 0.15 || 0,
          reason: 'High volatility and concentration risk'
        },
        {
          action: 'Increase BUSD allocation',
          type: 'increase',
          percentage: 10,
          amount: totalValue * 0.1,
          reason: 'Improve portfolio stability'
        },
        {
          action: 'Add BNB-BUSD LP',
          type: 'add',
          percentage: 5,
          amount: totalValue * 0.05,
          reason: 'Generate yield with low risk'
        }
      ],
      opportunities: [
        {
          asset: 'BNB-BUSD LP',
          expectedReturn: 45.67,
          risk: 'Low',
          description: 'Stable yield farming with minimal impermanent loss risk'
        },
        {
          asset: 'Venus Lending',
          expectedReturn: 8.45,
          risk: 'Low',
          description: 'Earn interest on BUSD deposits with established protocol'
        },
        {
          asset: 'Alpaca Leveraged Farming',
          expectedReturn: 156.78,
          risk: 'High',
          description: 'High yield opportunity with leverage, suitable for risk-tolerant investors'
        }
      ]
    };
    
    setAnalysis(mockAnalysis);
    setIsAnalyzing(false);
    
    return mockAnalysis;
  };

  return {
    analysis,
    isAnalyzing,
    analyzePortfolio
  };
};
