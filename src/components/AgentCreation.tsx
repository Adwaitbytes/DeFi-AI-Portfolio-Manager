
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Brain, Sparkles, User } from 'lucide-react';

interface AgentCreationProps {
  onCreateAgent: (name: string, personality: string, avatar: string) => Promise<void>;
  isCreating: boolean;
}

const AgentCreation: React.FC<AgentCreationProps> = ({ onCreateAgent, isCreating }) => {
  const [name, setName] = useState('');
  const [personality, setPersonality] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('/placeholder.svg');

  const avatarOptions = [
    '/placeholder.svg',
    'https://api.dicebear.com/7.x/bottts/svg?seed=agent1',
    'https://api.dicebear.com/7.x/bottts/svg?seed=agent2',
    'https://api.dicebear.com/7.x/bottts/svg?seed=agent3',
    'https://api.dicebear.com/7.x/robots/svg?seed=agent4'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && personality.trim()) {
      await onCreateAgent(name.trim(), personality.trim(), selectedAvatar);
    }
  };

  return (
    <div className="min-h-screen bg-midnight-950 flex items-center justify-center p-4">
      <Card className="glass-card w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-neon-400 to-cyber-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-neon-400 to-cyber-400 bg-clip-text text-transparent">
            Create Your Immortal AI Agent
          </CardTitle>
          <p className="text-gray-400 mt-2">
            Design your sovereign AI companion that will learn, evolve, and persist across all platforms
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Avatar Selection */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-neon-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Agent Avatar
              </label>
              <div className="flex gap-3 flex-wrap justify-center">
                {avatarOptions.map((avatar, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedAvatar(avatar)}
                    className={`p-2 rounded-xl transition-all ${
                      selectedAvatar === avatar
                        ? 'ring-2 ring-neon-400 bg-neon-400/10'
                        : 'hover:bg-white/5'
                    }`}
                  >
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={avatar} />
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                  </button>
                ))}
              </div>
            </div>

            {/* Name Input */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-neon-400">Agent Name</label>
              <Input
                placeholder="e.g., Nova, Cipher, Quantum..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="glass-card border-neon-400/30"
                required
              />
            </div>

            {/* Personality Input */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-neon-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Personality & Purpose
              </label>
              <Textarea
                placeholder="Describe your agent's personality, goals, and how it should behave. For example: 'A helpful DeFi assistant that's analytical but friendly, focused on risk management and yield optimization...'"
                value={personality}
                onChange={(e) => setPersonality(e.target.value)}
                className="glass-card border-neon-400/30 min-h-[120px]"
                required
              />
            </div>

            {/* Create Button */}
            <Button
              type="submit"
              disabled={isCreating || !name.trim() || !personality.trim()}
              className="w-full cyber-button text-lg py-6"
            >
              {isCreating ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating Your Immortal Agent...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Create Immortal Agent
                </div>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentCreation;
