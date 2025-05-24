
import { Client, SpClient } from '@bnb-chain/greenfield-js-sdk';
import CryptoJS from 'crypto-js';

export interface GreenfieldConfig {
  endpoint: string;
  chainId: number;
  privateKey?: string;
}

export class GreenfieldService {
  private client: Client;
  private spClient: SpClient;
  private bucketName: string;
  private encryptionKey: string;

  constructor(config: GreenfieldConfig) {
    this.client = Client.create(config.endpoint, String(config.chainId));
    this.spClient = new SpClient({ endpoint: config.endpoint });
    this.bucketName = 'immortal-agents';
    this.encryptionKey = this.generateEncryptionKey();
  }

  private generateEncryptionKey(): string {
    return CryptoJS.lib.WordArray.random(256/8).toString();
  }

  private encrypt(data: string): string {
    return CryptoJS.AES.encrypt(data, this.encryptionKey).toString();
  }

  private decrypt(encryptedData: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedData, this.encryptionKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  async initializeBucket(walletAddress: string): Promise<boolean> {
    try {
      const bucketName = `immortal-agent-${walletAddress.toLowerCase()}`;
      
      // Check if bucket exists
      try {
        await this.client.bucket.headBucket(bucketName);
        console.log('Bucket already exists:', bucketName);
        return true;
      } catch (error) {
        console.log('Creating new bucket:', bucketName);
      }

      // Create bucket if it doesn't exist
      const createBucketTx = await this.client.bucket.createBucket({
        bucketName,
        primarySpAddress: await this.getPrimaryStorageProvider(),
        paymentAddress: walletAddress,
        visibility: 'VISIBILITY_TYPE_PRIVATE',
        chargedReadQuota: '0',
      });

      const simulateResult = await createBucketTx.simulate();
      console.log('Create bucket simulation result:', simulateResult);

      return true;
    } catch (error) {
      console.error('Failed to initialize bucket:', error);
      return false;
    }
  }

  async storeAgentData(walletAddress: string, agentData: any): Promise<string | null> {
    try {
      const bucketName = `immortal-agent-${walletAddress.toLowerCase()}`;
      const objectName = `agent-${agentData.id}.json`;
      
      const encryptedData = this.encrypt(JSON.stringify(agentData));
      const file = new Blob([encryptedData], { type: 'application/json' });

      const createObjectTx = await this.client.object.createObject({
        bucketName,
        objectName,
        body: {
          name: objectName,
          type: file.type,
          size: file.size,
          content: file,
        },
        txOpts: {
          gasLimit: '300000',
          gasPrice: '5000000000',
        },
      });

      const result = await createObjectTx.broadcast();
      console.log('Agent data stored successfully:', result);
      
      return result.transactionHash;
    } catch (error) {
      console.error('Failed to store agent data:', error);
      return null;
    }
  }

  async storeMemory(walletAddress: string, agentId: string, memory: any): Promise<string | null> {
    try {
      const bucketName = `immortal-agent-${walletAddress.toLowerCase()}`;
      const objectName = `memory-${agentId}-${memory.id}.json`;
      
      const encryptedMemory = this.encrypt(JSON.stringify(memory));
      const file = new Blob([encryptedMemory], { type: 'application/json' });

      const createObjectTx = await this.client.object.createObject({
        bucketName,
        objectName,
        body: {
          name: objectName,
          type: file.type,
          size: file.size,
          content: file,
        },
        txOpts: {
          gasLimit: '300000',
          gasPrice: '5000000000',
        },
      });

      const result = await createObjectTx.broadcast();
      console.log('Memory stored successfully:', result);
      
      return result.transactionHash;
    } catch (error) {
      console.error('Failed to store memory:', error);
      return null;
    }
  }

  async retrieveAgentData(walletAddress: string, agentId: string): Promise<any | null> {
    try {
      const bucketName = `immortal-agent-${walletAddress.toLowerCase()}`;
      const objectName = `agent-${agentId}.json`;

      const object = await this.client.object.getObject({
        bucketName,
        objectName,
      });

      if (object && object.body) {
        const encryptedData = await object.body.text();
        const decryptedData = this.decrypt(encryptedData);
        return JSON.parse(decryptedData);
      }

      return null;
    } catch (error) {
      console.error('Failed to retrieve agent data:', error);
      return null;
    }
  }

  async retrieveMemories(walletAddress: string, agentId: string): Promise<any[]> {
    try {
      const bucketName = `immortal-agent-${walletAddress.toLowerCase()}`;
      
      const objects = await this.client.object.listObjects({
        bucketName,
        prefix: `memory-${agentId}-`,
      });

      const memories = [];
      
      if (objects && objects.objects) {
        for (const obj of objects.objects) {
          try {
            const objectData = await this.client.object.getObject({
              bucketName,
              objectName: obj.objectInfo.objectName,
            });

            if (objectData && objectData.body) {
              const encryptedData = await objectData.body.text();
              const decryptedData = this.decrypt(encryptedData);
              memories.push(JSON.parse(decryptedData));
            }
          } catch (error) {
            console.error('Failed to retrieve memory:', error);
          }
        }
      }

      return memories.sort((a, b) => 
        new Date(b.metadata.timestamp).getTime() - new Date(a.metadata.timestamp).getTime()
      );
    } catch (error) {
      console.error('Failed to retrieve memories:', error);
      return [];
    }
  }

  private async getPrimaryStorageProvider(): Promise<string> {
    // Return a default SP address for BNB Greenfield testnet
    return '0x0000000000000000000000000000000000000000';
  }

  async getStorageQuota(walletAddress: string): Promise<{ used: number; total: number; cost: number }> {
    try {
      const bucketName = `immortal-agent-${walletAddress.toLowerCase()}`;
      
      const objects = await this.client.object.listObjects({
        bucketName,
      });

      let totalSize = 0;
      if (objects && objects.objects) {
        totalSize = objects.objects.reduce((sum, obj) => sum + Number(obj.objectInfo.payloadSize), 0);
      }

      // Convert bytes to MB
      const usedMB = totalSize / (1024 * 1024);
      const totalMB = 100; // 100MB default quota
      const costPerMB = 0.001; // $0.001 per MB per month

      return {
        used: usedMB,
        total: totalMB,
        cost: usedMB * costPerMB
      };
    } catch (error) {
      console.error('Failed to get storage quota:', error);
      return { used: 0, total: 100, cost: 0 };
    }
  }
}

export default GreenfieldService;
