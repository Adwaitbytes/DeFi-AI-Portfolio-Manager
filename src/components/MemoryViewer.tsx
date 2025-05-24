
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AgentMemory } from '@/types/agent';
import { Brain, MessageCircle, Star, Tag, Clock, Shield } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface MemoryViewerProps {
  memories: AgentMemory[];
  isLoading?: boolean;
}

const MemoryViewer: React.FC<MemoryViewerProps> = ({ memories, isLoading }) => {
  const getMemoryIcon = (type: AgentMemory['type']) => {
    switch (type) {
      case 'conversation':
        return <MessageCircle className="w-4 h-4" />;
      case 'fact':
        return <Brain className="w-4 h-4" />;
      case 'preference':
        return <Star className="w-4 h-4" />;
      case 'action':
        return <Tag className="w-4 h-4" />;
      default:
        return <Brain className="w-4 h-4" />;
    }
  };

  const getMemoryColor = (type: AgentMemory['type']) => {
    switch (type) {
      case 'conversation':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'fact':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'preference':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'action':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  if (isLoading) {
    return (
      <Card className="glass-card h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-neon-400" />
            Decentralized Memory
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-white/10 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-white/5 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-neon-400" />
          Decentralized Memory
          <Badge variant="outline" className="ml-auto text-xs">
            {memories.length} memories
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4 max-h-96 overflow-y-auto">
        {memories.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <Brain className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No memories yet</p>
            <p className="text-sm">Start chatting to create memories</p>
          </div>
        ) : (
          memories.map((memory) => (
            <div
              key={memory.id}
              className="glass-card p-4 space-y-3 hover:bg-white/5 transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Badge className={getMemoryColor(memory.type)}>
                    {getMemoryIcon(memory.type)}
                    <span className="ml-1 capitalize">{memory.type}</span>
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {memory.metadata.platform}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  {memory.encrypted && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Shield className="w-3 h-3 text-green-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Encrypted</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    {memory.metadata.importance}
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-300 line-clamp-3">
                {memory.content}
              </p>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {formatDistanceToNow(memory.metadata.timestamp, { addSuffix: true })}
                </div>
                
                {memory.onChainHash && (
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>On-chain</span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default MemoryViewer;
