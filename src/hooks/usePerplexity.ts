
import { useState } from 'react';

const API_KEY = "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";
const MODEL_NAME = "sonar-reasoning-pro";
const API_URL = "https://api.perplexity.ai/chat/completions";

export const usePerplexity = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const askPerplexity = async (question: string) => {
    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      // Enhance question for crypto/DeFi context
      let enhancedQuestion = question;
      if (question.toLowerCase().includes('real-time') || 
          question.toLowerCase().includes('market') || 
          question.toLowerCase().includes('manipulation') || 
          question.toLowerCase().includes('flash loan') || 
          question.toLowerCase().includes('volatile')) {
        enhancedQuestion += " Also include how you ensure real-time data accuracy, deal with flash loan attacks, and avoid manipulation in crypto predictions.";
      }

      const payload = {
        model: MODEL_NAME,
        messages: [
          {
            role: "system",
            content: "You are an intelligent DeFi and crypto market analysis assistant. Provide real-time crypto insights with high accuracy. If the user asks about reliability, flash loans, or volatility, explain how market data is verified, filtered, and protected from manipulation. Always give concise summaries for users. Focus on BNB Chain, DeFi protocols, and portfolio management strategies."
          },
          {
            role: "user",
            content: enhancedQuestion
          }
        ],
        stream: false,
        temperature: 0.2,
        top_p: 0.9,
        max_tokens: 1000
      };

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
      } else {
        throw new Error('No response from AI');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Perplexity API Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const clearResponse = () => {
    setResponse(null);
    setError(null);
  };

  return {
    askPerplexity,
    clearResponse,
    response,
    isLoading,
    error
  };
};
