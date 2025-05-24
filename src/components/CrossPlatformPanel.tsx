
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Platform } from '@/types/agent';
import { 
  Globe, 
  MessageSquare, 
  Send, 
  Chrome, 
  Smartphone, 
  Wifi, 
  WifiOff, 
  RefreshCw,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface CrossPlatformPanelProps {
  platforms: Platform[];
  activeConnections: number;
  isSyncing: boolean;
  onConnect: (platformId: string) => void;
  onDisconnect: (platformId: string) => void;
  onSyncAll: () => void;
}

const CrossPlatformPanel: React.FC<CrossPlatformPanelProps> = ({
  platforms,
  activeConnections,
  isSyncing,
  onConnect,
  onDisconnect,
  onSyncAll
}) => {
  const getPlatformIcon = (type: Platform['type']) => {
    switch (type) {
      case 'web':
        return <Globe className="w-4 h-4" />;
      case 'discord':
        return <MessageSquare className="w-4 h-4" />;
      case 'telegram':
        return <Send className="w-4 h-4" />;
      case 'browser':
        return <Chrome className="w-4 h-4" />;
      case 'mobile':
        return <Smartphone className="w-4 h-4" />;
      default:
        return <Globe className="w-4 h-4" />;
    }
  };

  const getStatusIcon = (status: Platform['status']) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'syncing':
        return <RefreshCw className="w-4 h-4 text-yellow-400 animate-spin" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-400" />;
      default:
        return <WifiOff className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: Platform['status']) => {
    switch (status) {
      case 'connected':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'syncing':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'error':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <Card className="glass-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wifi className="w-5 h-5 text-cyber-400" />
            Cross-Platform Status
          </div>
          <Badge variant="outline" className="text-xs">
            {activeConnections} active
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Sync All Button */}
        <Button
          onClick={onSyncAll}
          disabled={isSyncing}
          className="w-full cyber-button"
          size="sm"
        >
          {isSyncing ? (
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin" />
              Syncing...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              Sync All Platforms
            </div>
          )}
        </Button>

        {/* Platform List */}
        <div className="space-y-3">
          {platforms.map((platform) => (
            <div
              key={platform.id}
              className="glass-card p-3 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getPlatformIcon(platform.type)}
                  <span className="font-medium text-sm">{platform.name}</span>
                </div>
                {getStatusIcon(platform.status)}
              </div>
              
              <div className="flex items-center justify-between">
                <Badge className={getStatusColor(platform.status)}>
                  {platform.status}
                </Badge>
                
                <div className="flex gap-2">
                  {platform.status === 'connected' ? (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onDisconnect(platform.id)}
                      className="text-xs"
                    >
                      Disconnect
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => onConnect(platform.id)}
                      className="text-xs cyber-button"
                      disabled={platform.status === 'syncing'}
                    >
                      Connect
                    </Button>
                  )}
                </div>
              </div>
              
              {platform.lastSync && (
                <p className="text-xs text-gray-500">
                  Last sync: {platform.lastSync.toLocaleTimeString()}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Agent Export/Import */}
        <div className="border-t border-white/10 pt-4 space-y-2">
          <h4 className="text-sm font-semibold text-neon-400">Agent Portability</h4>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="flex-1 text-xs">
              Export Agent
            </Button>
            <Button size="sm" variant="outline" className="flex-1 text-xs">
              Import Config
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CrossPlatformPanel;
