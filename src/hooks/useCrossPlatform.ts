
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
    setState(prev => ({ 
      ...prev, 
      isSyncing: true,
      platforms: prev.platforms.map(p => 
        p.id === platformId 
          ? { ...p, status: 'syncing' }
          : p
      )
    }));
    
    try {
      // Simulate different connection processes for different platforms
      const platform = state.platforms.find(p => p.id === platformId);
      let connectionTime = 2000;
      
      switch (platformId) {
        case 'discord':
          connectionTime = 3000;
          console.log('Connecting to Discord Bot via BNB Greenfield protocol...');
          break;
        case 'telegram':
          connectionTime = 2500;
          console.log('Connecting to Telegram Bot via BNB Greenfield protocol...');
          break;
        case 'browser':
          connectionTime = 1500;
          console.log('Installing Browser Extension via BNB Greenfield sync...');
          break;
        case 'mobile':
          connectionTime = 4000;
          console.log('Syncing with Mobile App via BNB Greenfield network...');
          break;
        default:
          console.log(`Connecting to ${platform?.name}...`);
      }
      
      await new Promise(resolve => setTimeout(resolve, connectionTime));
      
      // Simulate random connection failures for realism
      const shouldFail = Math.random() < 0.2; // 20% chance of failure
      
      if (shouldFail) {
        throw new Error(`Failed to connect to ${platformId}`);
      }
      
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
      
      console.log(`Successfully connected to ${platformId} via BNB Greenfield`);
    } catch (error) {
      console.error(`Failed to connect to platform ${platformId}:`, error);
      setState(prev => ({
        ...prev,
        platforms: prev.platforms.map(p => 
          p.id === platformId 
            ? { ...p, status: 'error' }
            : p
        ),
        isSyncing: false
      }));
      
      // Retry connection after 3 seconds
      setTimeout(() => {
        setState(prev => ({
          ...prev,
          platforms: prev.platforms.map(p => 
            p.id === platformId 
              ? { ...p, status: 'disconnected' }
              : p
          )
        }));
      }, 3000);
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
      console.log('Starting global sync via BNB Greenfield network...');
      
      // Simulate global sync with Greenfield
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
      
      console.log('All platforms synced successfully via BNB Greenfield');
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
