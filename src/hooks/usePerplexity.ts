
import { useState } from 'react';

const API_KEY = "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";
const MODEL_NAME = "sonar-reasoning-pro";
const API_URL = "https://api.perplexity.ai/chat/completions";

export const usePerplexity = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const askPerplexity = async (question: string, context?: string) => {
    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      // Enhance question for crypto/DeFi context with agent personality
      let enhancedQuestion = question;
      
      if (context) {
        enhancedQuestion = `${context}\n\nUser Question: ${question}`;
      }
      
      if (question.toLowerCase().includes('real-time') || 
          question.toLowerCase().includes('market') || 
          question.toLowerCase().includes('manipulation') || 
          question.toLowerCase().includes('flash loan') || 
          question.toLowerCase().includes('volatile')) {
        enhancedQuestion += "\n\nAdditionally, explain how real-time data accuracy is ensured, how flash loan attacks are mitigated, and how market manipulation is avoided in crypto predictions.";
      }

      const payload = {
        model: MODEL_NAME,
        messages: [
          {
            role: "system",
            content: "You are an advanced immortal AI agent specializing in DeFi and crypto market analysis. You have persistent memory stored on BNB Greenfield and can provide real-time insights with high accuracy. When discussing reliability, explain how market data is verified, filtered, and protected from manipulation. Always provide actionable insights and remember that you are a helpful, intelligent companion that learns and grows. Focus on BNB Chain, DeFi protocols, portfolio management, and provide personalized responses based on the user's needs."
          },
          {
            role: "user",
            content: enhancedQuestion
          }
        ],
        stream: false,
        temperature: 0.2,
        top_p: 0.9,
        max_tokens: 1500
      };

      console.log('Sending request to Perplexity API...');

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      const aiResponse = data.choices[0]?.message?.content;
      
      if (aiResponse) {
        setResponse(aiResponse);
        console.log('Perplexity response received:', aiResponse.substring(0, 100) + '...');
      } else {
        throw new Error('No response from AI');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Perplexity API Error:', err);
      
      // Set a fallback response
      setResponse("I apologize, but I'm currently experiencing connectivity issues. However, I'm still learning from our conversation and will provide better assistance once my connection is restored. This interaction is being saved to my immortal memory for future reference.");
    } finally {
      setIsLoading(false);
    }
  };

  const askForAnalysis = async (dataType: string, data: any) => {
    const analysisPrompt = `Analyze this ${dataType} data and provide actionable insights: ${JSON.stringify(data, null, 2)}. 
    Provide specific recommendations for optimization, risk assessment, and next steps.`;
    
    return askPerplexity(analysisPrompt);
  };

  const clearResponse = () => {
    setResponse(null);
    setError(null);
  };

  return {
    askPerplexity,
    askForAnalysis,
    clearResponse,
    response,
    isLoading,
    error
  };
};
