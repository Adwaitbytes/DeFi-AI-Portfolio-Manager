
import { useState, useEffect } from 'react';
import { Platform, CrossPlatformState } from '@/types/agent';

export const useCrossPlatform = () => {
  const [state, setState] = useState<CrossPlatformState>({
    platforms: [
      {
        id: 'web',
        name: 'Web Interface',
        type: 'web',
        status: 'connected',
        lastSync: new Date()
      },
      {
        id: 'discord',
        name: 'Discord Bot',
        type: 'discord',
        status: 'disconnected'
      },
      {
        id: 'telegram',
        name: 'Telegram Bot',
        type: 'telegram',
        status: 'disconnected'
      },
      {
        id: 'browser',
        name: 'Browser Extension',
        type: 'browser',
        status: 'disconnected'
      },
      {
        id: 'mobile',
        name: 'Mobile App',
        type: 'mobile',
        status: 'disconnected'
      }
    ],
    activeConnections: 1,
    isSyncing: false,
    lastGlobalSync: new Date()
  });

  const connectPlatform = async (platformId: string) => {
    setState(prev => ({ ...prev, isSyncing: true }));
    
    try {
      // Simulate platform connection
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setState(prev => ({
        ...prev,
        platforms: prev.platforms.map(p => 
          p.id === platformId 
            ? { ...p, status: 'connected', lastSync: new Date() }
            : p
        ),
        activeConnections: prev.activeConnections + 1,
        isSyncing: false,
        lastGlobalSync: new Date()
      }));
      
      console.log(`Connected to platform: ${platformId}`);
    } catch (error) {
      console.error(`Failed to connect to platform ${platformId}:`, error);
      setState(prev => ({ ...prev, isSyncing: false }));
    }
  };

  const disconnectPlatform = async (platformId: string) => {
    setState(prev => ({
      ...prev,
      platforms: prev.platforms.map(p => 
        p.id === platformId 
          ? { ...p, status: 'disconnected', lastSync: undefined }
          : p
      ),
      activeConnections: Math.max(0, prev.activeConnections - 1)
    }));
    
    console.log(`Disconnected from platform: ${platformId}`);
  };

  const syncAllPlatforms = async () => {
    setState(prev => ({ ...prev, isSyncing: true }));
    
    try {
      // Simulate global sync
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setState(prev => ({
        ...prev,
        platforms: prev.platforms.map(p => 
          p.status === 'connected' 
            ? { ...p, lastSync: new Date() }
            : p
        ),
        isSyncing: false,
        lastGlobalSync: new Date()
      }));
      
      console.log('All platforms synced successfully');
    } catch (error) {
      console.error('Failed to sync platforms:', error);
      setState(prev => ({ ...prev, isSyncing: false }));
    }
  };

  return {
    ...state,
    connectPlatform,
    disconnectPlatform,
    syncAllPlatforms
  };
};
