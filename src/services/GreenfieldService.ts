
import CryptoJS from 'crypto-js';
import { Client, VisibilityType, RedundancyType } from '@bnb-chain/greenfield-js-sdk';

export interface MemoryData {
  id: string;
  type: 'conversation' | 'insight' | 'preference' | 'context';
  content: string;
  timestamp: Date;
  platform?: string;
  metadata?: any;
}

export class GreenfieldService {
  private client: Client;
  private bucketName: string;
  private encryptionKey: string;

  constructor() {
    this.client = Client.create('https://gnfd-testnet-sp1.bnbchain.org', '5600');
    this.bucketName = 'immortal-agents';
    this.encryptionKey = 'default-encryption-key-change-in-production';
  }

  async initializeAgent(agentId: string, walletAddress: string): Promise<boolean> {
    try {
      console.log('Initializing agent storage on Greenfield:', agentId);
      
      // Check if bucket exists, create if not
      await this.ensureBucketExists();
      
      // Create agent directory structure
      const agentBucketName = `${this.bucketName}-${agentId.toLowerCase()}`;
      
      try {
        await this.client.bucket.createBucket({
          bucketName: agentBucketName,
          creator: walletAddress,
          visibility: VisibilityType.VISIBILITY_TYPE_PRIVATE,
          chargedReadQuota: BigInt(1000000),
          spInfo: {
            endpoint: 'https://gnfd-testnet-sp1.bnbchain.org'
          }
        });
        
        console.log('Agent bucket created successfully:', agentBucketName);
      } catch (error) {
        console.log('Bucket might already exist, continuing...');
      }
      
      return true;
    } catch (error) {
      console.error('Failed to initialize agent on Greenfield:', error);
      return false;
    }
  }

  async storeMemory(agentId: string, memory: MemoryData): Promise<boolean> {
    try {
      const encryptedContent = this.encryptData(JSON.stringify(memory));
      const objectName = `memories/${memory.type}/${memory.id}.json`;
      const agentBucketName = `${this.bucketName}-${agentId.toLowerCase()}`;
      
      await this.client.object.createObject({
        bucketName: agentBucketName,
        objectName: objectName,
        creator: '0x0000000000000000000000000000000000000000', // Replace with actual wallet
        visibility: VisibilityType.VISIBILITY_TYPE_PRIVATE,
        fileType: 'application/json',
        redundancyType: RedundancyType.REDUNDANCY_EC_TYPE,
        contentLength: BigInt(encryptedContent.length)
      });

      console.log('Memory stored on Greenfield:', objectName);
      return true;
    } catch (error) {
      console.error('Failed to store memory on Greenfield:', error);
      return false;
    }
  }

  async retrieveMemory(agentId: string, memoryId: string): Promise<MemoryData | null> {
    try {
      const agentBucketName = `${this.bucketName}-${agentId.toLowerCase()}`;
      
      const response = await this.client.object.getObject({
        bucketName: agentBucketName,
        objectName: `memories/${memoryId}.json`
      });

      if (response.body) {
        const encryptedContent = await response.body.text();
        const decryptedContent = this.decryptData(encryptedContent);
        return JSON.parse(decryptedContent);
      }
      
      return null;
    } catch (error) {
      console.error('Failed to retrieve memory from Greenfield:', error);
      return null;
    }
  }

  async listMemories(agentId: string, type?: string): Promise<MemoryData[]> {
    try {
      const agentBucketName = `${this.bucketName}-${agentId.toLowerCase()}`;
      const prefix = type ? `memories/${type}/` : 'memories/';
      
      const response = await this.client.object.listObjects({
        bucketName: agentBucketName,
        endpoint: 'https://gnfd-testnet-sp1.bnbchain.org'
      });

      const memories: MemoryData[] = [];
      
      // Note: The SDK structure may vary, using fallback for now
      if (response.body && Array.isArray(response.body)) {
        for (const object of response.body) {
          if (object.objectInfo?.objectName?.startsWith(prefix)) {
            const memory = await this.retrieveMemory(agentId, object.objectInfo.objectName);
            if (memory) memories.push(memory);
          }
        }
      }

      return memories.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    } catch (error) {
      console.error('Failed to list memories from Greenfield:', error);
      return [];
    }
  }

  async deleteMemory(agentId: string, memoryId: string): Promise<boolean> {
    try {
      const agentBucketName = `${this.bucketName}-${agentId.toLowerCase()}`;
      
      await this.client.object.deleteObject({
        bucketName: agentBucketName,
        objectName: `memories/${memoryId}.json`,
        operator: '0x0000000000000000000000000000000000000000' // Replace with actual wallet
      });

      console.log('Memory deleted from Greenfield:', memoryId);
      return true;
    } catch (error) {
      console.error('Failed to delete memory from Greenfield:', error);
      return false;
    }
  }

  async getStorageQuota(agentId: string): Promise<{ used: number; total: number; cost: number }> {
    try {
      const agentBucketName = `${this.bucketName}-${agentId.toLowerCase()}`;
      
      const response = await this.client.object.listObjects({
        bucketName: agentBucketName,
        endpoint: 'https://gnfd-testnet-sp1.bnbchain.org'
      });

      let totalSize = 0;
      if (response.body && Array.isArray(response.body)) {
        totalSize = response.body.reduce((sum, obj) => {
          return sum + (obj.objectInfo?.payloadSize ? Number(obj.objectInfo.payloadSize) : 0);
        }, 0);
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

  private async ensureBucketExists(): Promise<void> {
    try {
      await this.client.bucket.headBucket(this.bucketName);
    } catch (error) {
      // Bucket doesn't exist, create it
      try {
        await this.client.bucket.createBucket({
          bucketName: this.bucketName,
          creator: '0x0000000000000000000000000000000000000000', // Replace with actual wallet
          visibility: VisibilityType.VISIBILITY_TYPE_PRIVATE,
          chargedReadQuota: BigInt(1000000),
          spInfo: {
            endpoint: 'https://gnfd-testnet-sp1.bnbchain.org'
          }
        });
        console.log('Main bucket created:', this.bucketName);
      } catch (createError) {
        console.error('Failed to create bucket:', createError);
      }
    }
  }

  private encryptData(data: string): string {
    return CryptoJS.AES.encrypt(data, this.encryptionKey).toString();
  }

  private decryptData(encryptedData: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedData, this.encryptionKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  // Set custom encryption key for user
  setEncryptionKey(key: string): void {
    this.encryptionKey = key;
  }

  // Get connection status
  isConnected(): boolean {
    return !!this.client;
  }

  // Optimize storage by compressing old memories
  async optimizeStorage(agentId: string): Promise<boolean> {
    try {
      const memories = await this.listMemories(agentId);
      const oldMemories = memories.filter(m => 
        new Date(m.timestamp).getTime() < Date.now() - (30 * 24 * 60 * 60 * 1000) // 30 days old
      );

      // Compress old memories into archive
      if (oldMemories.length > 0) {
        const archive = {
          id: `archive-${Date.now()}`,
          type: 'archive' as const,
          content: JSON.stringify(oldMemories),
          timestamp: new Date(),
          metadata: { count: oldMemories.length }
        };

        await this.storeMemory(agentId, archive);

        // Delete individual old memories
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
