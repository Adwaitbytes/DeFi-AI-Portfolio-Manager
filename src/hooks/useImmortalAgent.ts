
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
      console.log('Creating immortal AI agent on BNB Greenfield...');
      await new Promise(resolve => setTimeout(resolve, 3000));
      
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
          },
          {
            id: 'bnb_greenfield',
            name: 'BNB Greenfield Storage',
            type: 'web',
            status: 'connected',
            lastSync: new Date()
          }
        ],
        isActive: true
      };
      
      setAgent(newAgent);
      localStorage.setItem(`agent_${walletAddress}`, JSON.stringify(newAgent));
      console.log('Agent created successfully on BNB Greenfield:', newAgent);
      
      // Create initial memory
      await addMemory('fact', `Agent ${name} created with personality: ${personality}. Ready to serve on BNB Chain with immortal memory capabilities.`, 'bnb_greenfield');
      
    } catch (error) {
      console.error('Failed to create agent:', error);
      throw error;
    } finally {
      setIsCreating(false);
    }
  };

  const addMemory = async (type: AgentMemory['type'], content: string, platform: string = 'web') => {
    if (!agent) return;
    
    console.log(`Storing memory to BNB Greenfield: ${content.substring(0, 50)}...`);
    
    // Simulate BNB Greenfield storage delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const memory: AgentMemory = {
      id: `memory_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      agentId: agent.id,
      type,
      content,
      metadata: {
        platform,
        timestamp: new Date(),
        importance: Math.floor(Math.random() * 10) + 1,
        tags: extractTags(content)
      },
      encrypted: platform === 'bnb_greenfield',
      onChainHash: `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`
    };
    
    setMemories(prev => [memory, ...prev.slice(0, 49)]); // Keep latest 50 memories
    
    // Update agent memory count and last active
    const updatedAgent = { 
      ...agent, 
      memoryCount: agent.memoryCount + 1, 
      lastActive: new Date() 
    };
    setAgent(updatedAgent);
    
    // Store in localStorage (simulating decentralized storage)
    localStorage.setItem(`agent_${walletAddress}`, JSON.stringify(updatedAgent));
    localStorage.setItem(`memories_${agent.id}`, JSON.stringify([memory, ...memories.slice(0, 49)]));
    
    console.log('Memory stored on BNB Greenfield:', memory.id);
    return memory;
  };

  const extractTags = (content: string): string[] => {
    const tags: string[] = [];
    const lowercaseContent = content.toLowerCase();
    
    // Auto-tag based on content
    if (lowercaseContent.includes('defi') || lowercaseContent.includes('yield') || lowercaseContent.includes('farming')) {
      tags.push('defi');
    }
    if (lowercaseContent.includes('portfolio') || lowercaseContent.includes('allocation')) {
      tags.push('portfolio');
    }
    if (lowercaseContent.includes('bnb') || lowercaseContent.includes('chain')) {
      tags.push('bnb-chain');
    }
    if (lowercaseContent.includes('risk') || lowercaseContent.includes('volatile')) {
      tags.push('risk-analysis');
    }
    if (lowercaseContent.includes('cake') || lowercaseContent.includes('pancake')) {
      tags.push('pancakeswap');
    }
    
    return tags;
  };

  const loadAgent = async () => {
    if (!walletAddress) return;
    
    setIsLoading(true);
    
    try {
      console.log('Loading agent from BNB Greenfield...');
      
      const stored = localStorage.getItem(`agent_${walletAddress}`);
      if (stored) {
        const agentData = JSON.parse(stored);
        setAgent(agentData);
        
        // Load memories from BNB Greenfield (simulated)
        const storedMemories = localStorage.getItem(`memories_${agentData.id}`);
        if (storedMemories) {
          const memoriesData = JSON.parse(storedMemories);
          setMemories(memoriesData);
          console.log(`Loaded ${memoriesData.length} memories from BNB Greenfield`);
        }
      }
    } catch (error) {
      console.error('Failed to load agent:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getMemoryInsights = () => {
    if (memories.length === 0) return null;
    
    const conversationMemories = memories.filter(m => m.type === 'conversation').length;
    const factMemories = memories.filter(m => m.type === 'fact').length;
    const preferenceMemories = memories.filter(m => m.type === 'preference').length;
    
    return {
      totalMemories: memories.length,
      conversationMemories,
      factMemories,
      preferenceMemories,
      lastMemoryTime: memories[0]?.metadata.timestamp,
      topTags: getTopTags()
    };
  };

  const getTopTags = () => {
    const tagCounts: { [key: string]: number } = {};
    memories.forEach(memory => {
      memory.metadata.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });
    
    return Object.entries(tagCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([tag, count]) => ({ tag, count }));
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
    addMemory,
    getMemoryInsights
  };
};
