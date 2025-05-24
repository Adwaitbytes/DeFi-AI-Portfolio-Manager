
import { useState } from 'react';
import AIService from '@/services/AIService';

export const useAI = () => {
  const [analysis, setAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiService] = useState(() => new AIService('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'));

  const analyzePortfolio = async (tokens: any[]) => {
    setIsAnalyzing(true);
    
    try {
      const marketData = []; // You can pass current market data here
      
      const analysisResult = await aiService.analyzePortfolio({
        portfolioData: tokens,
        marketData: marketData,
        riskTolerance: 'medium'
      });
      
      setAnalysis(analysisResult);
      console.log('AI Analysis completed:', analysisResult);
      
    } catch (error) {
      console.error('AI Analysis failed:', error);
      
      // Fallback analysis
      const totalValue = tokens.reduce((sum, token) => sum + token.value, 0);
      const volatileAssets = tokens.filter(token => 
        token.symbol === 'CAKE' || token.symbol === 'ADA'
      );
      const volatilePercentage = volatileAssets.reduce((sum, token) => sum + token.percentage, 0);
      
      const fallbackAnalysis = {
        riskLevel: volatilePercentage > 50 ? 'High' : volatilePercentage > 30 ? 'Medium' : 'Low',
        volatility: Math.round((volatilePercentage * 0.8 + Math.random() * 10) * 100) / 100,
        diversificationScore: Math.max(1, Math.min(10, Math.round((10 - volatilePercentage / 10) + Math.random() * 2))),
        reasoning: 'AI analysis temporarily unavailable. Using fallback calculation based on portfolio composition.',
        strengths: [
          'Good exposure to BNB ecosystem',
          'Diversified across multiple protocols',
          'Balanced stablecoin allocation'
        ],
        improvements: [
          'Consider real-time AI insights',
          'Optimize yield farming opportunities',
          'Add more DeFi protocol exposure'
        ],
        suggestions: [],
        opportunities: [],
        confidence: 0.6
      };
      
      setAnalysis(fallbackAnalysis);
    } finally {
      setIsAnalyzing(false);
    }
    
    return analysis;
  };

  const detectYieldOpportunities = async (portfolioData: any[], marketData: any[]) => {
    try {
      return await aiService.detectYieldOpportunities(portfolioData, marketData);
    } catch (error) {
      console.error('Failed to detect yield opportunities:', error);
      return [];
    }
  };

  const generateResponse = async (message: string, personality: string, context: any[]) => {
    try {
      return await aiService.generateAgentResponse(message, personality, context);
    } catch (error) {
      console.error('Failed to generate AI response:', error);
      return "I'm processing your message using my decentralized memory. Let me provide you with insights based on my knowledge.";
    }
  };

  return {
    analysis,
    isAnalyzing,
    analyzePortfolio,
    detectYieldOpportunities,
    generateResponse,
    aiService
  };
};
