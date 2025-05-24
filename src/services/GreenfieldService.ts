
import CryptoJS from 'crypto-js';

export interface MemoryData {
  id: string;
  type: 'conversation' | 'insight' | 'preference' | 'context' | 'archive';
  content: string;
  timestamp: Date;
  platform?: string;
  metadata?: any;
}

export interface AgentData {
  id: string;
  name: string;
  personality: string;
  avatar: string;
  walletAddress: string;
  createdAt: Date;
  lastActive: Date;
  memoryCount: number;
}

export class GreenfieldService {
  private bucketName: string;
  private encryptionKey: string;
  private isInitialized: boolean = false;

  constructor(config?: { endpoint?: string; chainId?: number }) {
    this.bucketName = 'immortal-agents';
    this.encryptionKey = 'default-encryption-key-change-in-production';
    
    // Note: Greenfield SDK has browser compatibility issues
    // For now, we'll use localStorage as fallback with encryption
    console.log('GreenfieldService initialized with localStorage fallback');
  }

  async initializeBucket(walletAddress: string): Promise<boolean> {
    try {
      console.log('Initializing bucket for wallet:', walletAddress);
      this.isInitialized = true;
      return true;
    } catch (error) {
      console.error('Failed to initialize bucket:', error);
      return false;
    }
  }

  async storeAgentData(walletAddress: string, agentData: AgentData): Promise<string | null> {
    try {
      const encryptedData = this.encryptData(JSON.stringify(agentData));
      const key = `greenfield_agent_${walletAddress}`;
      localStorage.setItem(key, encryptedData);
      
      console.log('Agent data stored (encrypted localStorage fallback)');
      return `mock_tx_${Date.now()}`;
    } catch (error) {
      console.error('Failed to store agent data:', error);
      return null;
    }
  }

  async storeMemory(walletAddress: string, agentId: string, memory: MemoryData): Promise<string | null> {
    try {
      const encryptedContent = this.encryptData(JSON.stringify(memory));
      const key = `greenfield_memory_${agentId}_${memory.id}`;
      localStorage.setItem(key, encryptedContent);
      
      // Update memory index
      const indexKey = `greenfield_memories_${agentId}`;
      const existingIndex = localStorage.getItem(indexKey);
      const memoryIndex = existingIndex ? JSON.parse(existingIndex) : [];
      memoryIndex.unshift(memory.id);
      localStorage.setItem(indexKey, JSON.stringify(memoryIndex));
      
      console.log('Memory stored (encrypted localStorage fallback)');
      return `mock_tx_${Date.now()}`;
    } catch (error) {
      console.error('Failed to store memory:', error);
      return null;
    }
  }

  async retrieveAgentData(walletAddress: string, version: string = 'latest'): Promise<AgentData | null> {
    try {
      const key = `greenfield_agent_${walletAddress}`;
      const encryptedData = localStorage.getItem(key);
      
      if (encryptedData) {
        const decryptedData = this.decryptData(encryptedData);
        return JSON.parse(decryptedData);
      }
      
      return null;
    } catch (error) {
      console.error('Failed to retrieve agent data:', error);
      return null;
    }
  }

  async retrieveMemories(walletAddress: string, agentId: string): Promise<MemoryData[]> {
    try {
      const indexKey = `greenfield_memories_${agentId}`;
      const memoryIndex = localStorage.getItem(indexKey);
      
      if (!memoryIndex) return [];
      
      const memoryIds = JSON.parse(memoryIndex);
      const memories: MemoryData[] = [];
      
      for (const memoryId of memoryIds) {
        const memoryKey = `greenfield_memory_${agentId}_${memoryId}`;
        const encryptedMemory = localStorage.getItem(memoryKey);
        
        if (encryptedMemory) {
          const decryptedMemory = this.decryptData(encryptedMemory);
          memories.push(JSON.parse(decryptedMemory));
        }
      }
      
      return memories;
    } catch (error) {
      console.error('Failed to retrieve memories:', error);
      return [];
    }
  }

  async retrieveMemory(agentId: string, memoryId: string): Promise<MemoryData | null> {
    try {
      const key = `greenfield_memory_${agentId}_${memoryId}`;
      const encryptedData = localStorage.getItem(key);
      
      if (encryptedData) {
        const decryptedData = this.decryptData(encryptedData);
        return JSON.parse(decryptedData);
      }
      
      return null;
    } catch (error) {
      console.error('Failed to retrieve memory:', error);
      return null;
    }
  }

  async listMemories(agentId: string, type?: string): Promise<MemoryData[]> {
    const memories = await this.retrieveMemories('', agentId);
    
    if (type) {
      return memories.filter(memory => memory.type === type);
    }
    
    return memories;
  }

  async deleteMemory(agentId: string, memoryId: string): Promise<boolean> {
    try {
      const key = `greenfield_memory_${agentId}_${memoryId}`;
      localStorage.removeItem(key);
      
      // Update index
      const indexKey = `greenfield_memories_${agentId}`;
      const existingIndex = localStorage.getItem(indexKey);
      if (existingIndex) {
        const memoryIndex = JSON.parse(existingIndex);
        const updatedIndex = memoryIndex.filter((id: string) => id !== memoryId);
        localStorage.setItem(indexKey, JSON.stringify(updatedIndex));
      }
      
      return true;
    } catch (error) {
      console.error('Failed to delete memory:', error);
      return false;
    }
  }

  async getStorageQuota(agentId: string): Promise<{ used: number; total: number; cost: number }> {
    try {
      let totalSize = 0;
      const keys = Object.keys(localStorage);
      
      for (const key of keys) {
        if (key.includes(agentId)) {
          const value = localStorage.getItem(key);
          if (value) {
            totalSize += new Blob([value]).size;
          }
        }
      }

      return {
        used: totalSize,
        total: 1000000, // 1MB default quota
        cost: totalSize * 0.0000001 // Estimated cost in BNB
      };
    } catch (error) {
      console.error('Failed to get storage quota:', error);
      return { used: 0, total: 1000000, cost: 0 };
    }
  }

  private encryptData(data: string): string {
    return CryptoJS.AES.encrypt(data, this.encryptionKey).toString();
  }

  private decryptData(encryptedData: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedData, this.encryptionKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  setEncryptionKey(key: string): void {
    this.encryptionKey = key;
  }

  isConnected(): boolean {
    return this.isInitialized;
  }

  async optimizeStorage(agentId: string): Promise<boolean> {
    try {
      const memories = await this.listMemories(agentId);
      const oldMemories = memories.filter(m => 
        new Date(m.timestamp).getTime() < Date.now() - (30 * 24 * 60 * 60 * 1000) // 30 days old
      );

      if (oldMemories.length > 0) {
        const archive: MemoryData = {
          id: `archive-${Date.now()}`,
          type: 'archive',
          content: JSON.stringify(oldMemories),
          timestamp: new Date(),
          metadata: { count: oldMemories.length }
        };

        await this.storeMemory('', agentId, archive);

        for (const memory of oldMemories) {
          await this.deleteMemory(agentId, memory.id);
        }

        console.log(`Optimized storage: archived ${oldMemories.length} old memories`);
      }

      return true;
    } catch (error) {
      console.error('Failed to optimize storage:', error);
      return false;
    }
  }
}

export default GreenfieldService;
