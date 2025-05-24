
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AIAgent, AgentMemory } from '@/types/agent';
import { Send, Brain, User } from 'lucide-react';

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
      content: `Hello! I'm ${agent.name}, your immortal AI agent. I remember everything we discuss and can learn from our interactions. How can I help you today?`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAgentResponse = async (userMessage: string): Promise<string> => {
    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
    
    const responses = [
      `Interesting perspective! Let me store this insight: "${userMessage.slice(0, 50)}..." in my decentralized memory. This will help me understand your preferences better.`,
      `I've analyzed your message and added it to my permanent memory chain. Based on your personality, here's what I think...`,
      `Your message has been encrypted and stored on-chain. I can see patterns in how you communicate - this helps me serve you better across all platforms.`,
      `Thanks for sharing that! I'm updating my understanding of your goals. This knowledge will persist across our future interactions, whether on web, Discord, or any other platform.`,
      `I've committed this conversation to my immortal memory. Your preferences are now part of my permanent knowledge base, accessible whenever you need me.`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: `user_${Date.now()}`,
      type: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      // Add user message to memory
      await onAddMemory('conversation', `User: ${userMessage.content}`);

      // Generate agent response
      const agentResponseContent = await generateAgentResponse(userMessage.content);
      
      const agentMessage: Message = {
        id: `agent_${Date.now()}`,
        type: 'agent',
        content: agentResponseContent,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, agentMessage]);

      // Add agent response to memory
      await onAddMemory('conversation', `Agent: ${agentMessage.content}`);

    } catch (error) {
      console.error('Failed to process message:', error);
    } finally {
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
            <p className="text-xs text-gray-400">Immortal AI Agent • Online</p>
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
          
          {isTyping && (
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
            placeholder="Chat with your immortal AI agent..."
            className="glass-card border-neon-400/30"
            disabled={isTyping}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!input.trim() || isTyping}
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
