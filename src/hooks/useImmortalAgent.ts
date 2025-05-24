
import { useState, useEffect } from 'react';
import { AIAgent, AgentMemory, Platform } from '@/types/agent';

export const useImmortalAgent = (walletAddress: string | null) => {
  const [agent, setAgent] = useState<AIAgent | null>(null);
  const [memories, setMemories] = useState<AgentMemory[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const createAgent = async (name: string, personality: string, avatar: string) => {
    if (!walletAddress) return;
    
    setIsCreating(true);
    
    try {
      // Simulate agent creation with smart contract interaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newAgent: AIAgent = {
        id: `agent_${Date.now()}`,
        name,
        personality,
        avatar,
        walletAddress,
        createdAt: new Date(),
        lastActive: new Date(),
        memoryCount: 0,
        platforms: [
          {
            id: 'web',
            name: 'Web Interface',
            type: 'web',
            status: 'connected',
            lastSync: new Date()
          }
        ],
        isActive: true
      };
      
      setAgent(newAgent);
      localStorage.setItem(`agent_${walletAddress}`, JSON.stringify(newAgent));
      console.log('Agent created successfully:', newAgent);
      
    } catch (error) {
      console.error('Failed to create agent:', error);
      throw error;
    } finally {
      setIsCreating(false);
    }
  };

  const addMemory = async (type: AgentMemory['type'], content: string, platform: string = 'web') => {
    if (!agent) return;
    
    const memory: AgentMemory = {
      id: `memory_${Date.now()}`,
      agentId: agent.id,
      type,
      content,
      metadata: {
        platform,
        timestamp: new Date(),
        importance: Math.floor(Math.random() * 10) + 1,
        tags: []
      },
      encrypted: false,
      onChainHash: `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`
    };
    
    setMemories(prev => [memory, ...prev]);
    
    // Update agent memory count
    const updatedAgent = { ...agent, memoryCount: agent.memoryCount + 1, lastActive: new Date() };
    setAgent(updatedAgent);
    localStorage.setItem(`agent_${walletAddress}`, JSON.stringify(updatedAgent));
    localStorage.setItem(`memories_${agent.id}`, JSON.stringify([memory, ...memories]));
    
    console.log('Memory added:', memory);
    return memory;
  };

  const loadAgent = async () => {
    if (!walletAddress) return;
    
    setIsLoading(true);
    
    try {
      const stored = localStorage.getItem(`agent_${walletAddress}`);
      if (stored) {
        const agentData = JSON.parse(stored);
        setAgent(agentData);
        
        // Load memories
        const storedMemories = localStorage.getItem(`memories_${agentData.id}`);
        if (storedMemories) {
          setMemories(JSON.parse(storedMemories));
        }
      }
    } catch (error) {
      console.error('Failed to load agent:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAgent();
  }, [walletAddress]);

  return {
    agent,
    memories,
    isCreating,
    isLoading,
    createAgent,
    addMemory
  };
};
