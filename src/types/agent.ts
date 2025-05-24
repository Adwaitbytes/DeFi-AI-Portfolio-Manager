
export interface AIAgent {
  id: string;
  name: string;
  personality: string;
  avatar: string;
  walletAddress: string;
  createdAt: Date;
  lastActive: Date;
  memoryCount: number;
  platforms: Platform[];
  isActive: boolean;
}

export interface AgentMemory {
  id: string;
  agentId: string;
  type: 'conversation' | 'fact' | 'preference' | 'action';
  content: string;
  metadata: {
    platform: string;
    timestamp: Date;
    importance: number;
    tags: string[];
  };
  encrypted: boolean;
  onChainHash?: string;
}

export interface Platform {
  id: string;
  name: string;
  type: 'web' | 'discord' | 'telegram' | 'browser' | 'mobile';
  status: 'connected' | 'disconnected' | 'syncing' | 'error';
  lastSync?: Date;
  config?: any;
}

export interface CrossPlatformState {
  platforms: Platform[];
  activeConnections: number;
  isSyncing: boolean;
  lastGlobalSync: Date;
}
