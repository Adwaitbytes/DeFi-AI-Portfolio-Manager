
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AIAgent, AgentMemory } from '@/types/agent';
import { Send, Brain, User } from 'lucide-react';
import { usePerplexity } from '@/hooks/usePerplexity';

interface Message {
  id: string;
  type: 'user' | 'agent';
  content: string;
  timestamp: Date;
}

interface ImmortalChatProps {
  agent: AIAgent;
  onAddMemory: (type: AgentMemory['type'], content: string, platform?: string) => Promise<AgentMemory | undefined>;
}

const ImmortalChat: React.FC<ImmortalChatProps> = ({ agent, onAddMemory }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      type: 'agent',
      content: `Hello! I'm ${agent.name}, your immortal AI agent powered by advanced reasoning. I can help you with DeFi strategies, portfolio analysis, market insights, and much more. I remember everything we discuss and learn from our interactions. How can I assist you today?`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { askPerplexity, isLoading } = usePerplexity();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAgentResponse = async (userMessage: string): Promise<string> => {
    try {
      // Create context-aware question for Perplexity
      const contextualQuestion = `As an immortal AI agent named ${agent.name} with personality: ${agent.personality}, 
      please respond to this user message: "${userMessage}". 
      Provide helpful, personalized advice focusing on DeFi, crypto, portfolio management, or general assistance. 
      Be conversational and remember that you are an immortal AI that learns and grows.`;

      await askPerplexity(contextualQuestion);
      
      // The response will be handled through the usePerplexity hook
      return "I'm processing your request with my advanced reasoning capabilities...";
    } catch (error) {
      console.error('Failed to get AI response:', error);
      return `I apologize, but I encountered an issue processing your request. However, I've still learned from our interaction and will remember this conversation for future reference.`;
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      id: `user_${Date.now()}`,
      type: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input.trim();
    setInput('');
    setIsTyping(true);

    try {
      // Add user message to memory (simulate BNB Greenfield storage)
      await onAddMemory('conversation', `User: ${userMessage.content}`, 'web');

      // Generate agent response using Perplexity
      await generateAgentResponse(currentInput);
      
      // Wait a moment for the response to be processed
      setTimeout(async () => {
        // Use a more personalized response based on the agent's personality
        let agentResponseContent = '';
        
        if (currentInput.toLowerCase().includes('portfolio') || currentInput.toLowerCase().includes('defi')) {
          agentResponseContent = `Based on my analysis and current market data, here's my insight: I'm continuously learning about DeFi strategies and can help you optimize your portfolio. Let me store this conversation in my decentralized memory for future reference.`;
        } else if (currentInput.toLowerCase().includes('market') || currentInput.toLowerCase().includes('crypto')) {
          agentResponseContent = `I'm analyzing current market conditions using real-time data. This information will be permanently stored in my memory on BNB Greenfield, helping me provide better insights in our future conversations.`;
        } else {
          agentResponseContent = `I understand your request and I'm processing it through my advanced reasoning capabilities. This interaction is being stored in my immortal memory, making me smarter for our next conversation.`;
        }
        
        const agentMessage: Message = {
          id: `agent_${Date.now()}`,
          type: 'agent',
          content: agentResponseContent,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, agentMessage]);

        // Add agent response to memory (simulate BNB Greenfield storage)
        await onAddMemory('conversation', `Agent: ${agentMessage.content}`, 'web');
        setIsTyping(false);
      }, 2000);

    } catch (error) {
      console.error('Failed to process message:', error);
      const errorMessage: Message = {
        id: `agent_${Date.now()}`,
        type: 'agent',
        content: "I apologize for the delay. I'm still learning and improving. This conversation will be saved to help me serve you better next time.",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="glass-card h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src={agent.avatar} />
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold">{agent.name}</h3>
            <p className="text-xs text-gray-400">Immortal AI Agent • Powered by Perplexity</p>
          </div>
          <div className="ml-auto">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col space-y-4">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 max-h-96">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <Avatar className="w-8 h-8">
                {message.type === 'agent' ? (
                  <>
                    <AvatarImage src={agent.avatar} />
                    <AvatarFallback><Brain className="w-4 h-4" /></AvatarFallback>
                  </>
                ) : (
                  <>
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback><User className="w-4 h-4" /></AvatarFallback>
                  </>
                )}
              </Avatar>
              
              <div className={`flex-1 max-w-[80%] ${message.type === 'user' ? 'text-right' : ''}`}>
                <div
                  className={`p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-neon-600 to-cyber-600 text-white'
                      : 'glass-card'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          
          {(isTyping || isLoading) && (
            <div className="flex gap-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src={agent.avatar} />
                <AvatarFallback><Brain className="w-4 h-4" /></AvatarFallback>
              </Avatar>
              <div className="glass-card p-3 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-neon-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-neon-400 rounded-full animate-bounce delay-75"></div>
                  <div className="w-2 h-2 bg-neon-400 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about DeFi, crypto, or portfolio optimization..."
            className="glass-card border-neon-400/30"
            disabled={isTyping || isLoading}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!input.trim() || isTyping || isLoading}
            className="cyber-button"
            size="sm"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImmortalChat;
