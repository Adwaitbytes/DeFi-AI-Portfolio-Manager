
import { useState, useEffect } from 'react';
import { AIAgent, AgentMemory, Platform } from '@/types/agent';
import GreenfieldService from '@/services/GreenfieldService';
import AIService from '@/services/AIService';

const greenfieldConfig = {
  endpoint: 'https://gnfd-testnet-sp1.bnbchain.org',
  chainId: 5600, // Greenfield Testnet
};

export const useImmortalAgent = (walletAddress: string | null) => {
  const [agent, setAgent] = useState<AIAgent | null>(null);
  const [memories, setMemories] = useState<AgentMemory[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [greenfieldService, setGreenfieldService] = useState<GreenfieldService | null>(null);
  const [aiService, setAiService] = useState<AIService | null>(null);

  useEffect(() => {
    if (walletAddress) {
      const gfService = new GreenfieldService(greenfieldConfig);
      const aiSvc = new AIService('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');
      
      setGreenfieldService(gfService);
      setAiService(aiSvc);
      
      // Initialize Greenfield bucket
      gfService.initializeBucket(walletAddress).then(success => {
        if (success) {
          console.log('Greenfield bucket initialized successfully');
        }
      });
    }
  }, [walletAddress]);

  const createAgent = async (name: string, personality: string, avatar: string) => {
    if (!walletAddress || !greenfieldService) return;
    
    setIsCreating(true);
    
    try {
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
      
      // Store agent data in Greenfield
      const txHash = await greenfieldService.storeAgentData(walletAddress, newAgent);
      
      if (txHash) {
        console.log('Agent stored in Greenfield with tx:', txHash);
        setAgent(newAgent);
        
        // Also store locally as backup
        localStorage.setItem(`agent_${walletAddress}`, JSON.stringify(newAgent));
      } else {
        // Fallback to local storage
        setAgent(newAgent);
        localStorage.setItem(`agent_${walletAddress}`, JSON.stringify(newAgent));
      }
      
    } catch (error) {
      console.error('Failed to create agent:', error);
      throw error;
    } finally {
      setIsCreating(false);
    }
  };

  const addMemory = async (type: AgentMemory['type'], content: string, platform: string = 'web') => {
    if (!agent || !greenfieldService) return;
    
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
      encrypted: true,
      onChainHash: undefined
    };
    
    try {
      // Store memory in Greenfield
      const txHash = await greenfieldService.storeMemory(walletAddress!, agent.id, memory);
      
      if (txHash) {
        memory.onChainHash = txHash;
        console.log('Memory stored in Greenfield with tx:', txHash);
      }
      
      setMemories(prev => [memory, ...prev]);
      
      // Update agent memory count and last active
      const updatedAgent = { 
        ...agent, 
        memoryCount: agent.memoryCount + 1, 
        lastActive: new Date() 
      };
      setAgent(updatedAgent);
      
      // Store updated agent data
      if (txHash) {
        await greenfieldService.storeAgentData(walletAddress!, updatedAgent);
      }
      
      // Backup to localStorage
      localStorage.setItem(`agent_${walletAddress}`, JSON.stringify(updatedAgent));
      localStorage.setItem(`memories_${agent.id}`, JSON.stringify([memory, ...memories]));
      
    } catch (error) {
      console.error('Failed to add memory:', error);
      
      // Fallback to local storage
      setMemories(prev => [memory, ...prev]);
      localStorage.setItem(`memories_${agent.id}`, JSON.stringify([memory, ...memories]));
    }
    
    return memory;
  };

  const loadAgent = async () => {
    if (!walletAddress || !greenfieldService) return;
    
    setIsLoading(true);
    
    try {
      // Try to load from Greenfield first
      const storedAgents = await greenfieldService.retrieveAgentData(walletAddress, 'latest');
      
      if (storedAgents) {
        setAgent(storedAgents);
        
        // Load memories from Greenfield
        const storedMemories = await greenfieldService.retrieveMemories(walletAddress, storedAgents.id);
        setMemories(storedMemories);
        
        console.log('Agent and memories loaded from Greenfield');
      } else {
        // Fallback to localStorage
        const stored = localStorage.getItem(`agent_${walletAddress}`);
        if (stored) {
          const agentData = JSON.parse(stored);
          setAgent(agentData);
          
          // Load memories from localStorage
          const storedMemories = localStorage.getItem(`memories_${agentData.id}`);
          if (storedMemories) {
            setMemories(JSON.parse(storedMemories));
          }
          
          console.log('Agent loaded from localStorage as fallback');
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
  }, [walletAddress, greenfieldService]);

  return {
    agent,
    memories,
    isCreating,
    isLoading,
    createAgent,
    addMemory,
    greenfieldService,
    aiService
  };
};
