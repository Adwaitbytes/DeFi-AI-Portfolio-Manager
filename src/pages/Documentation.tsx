
import React from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, Lightbulb, Database, Globe, Code, ShieldCheck, Lock, Zap, Book } from 'lucide-react';

const Documentation = () => {
  return (
    <div className="min-h-screen bg-midnight-950 matrix-bg">
      <Navbar
        onConnectWallet={() => {}}
        walletAddress="0x0000000000000000000000000000000000000000"
        isConnecting={false}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col space-y-8">
          {/* Hero Section */}
          <div className="glass-card border-neon-400/20 p-8 rounded-2xl">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-24 h-24 bg-gradient-to-br from-neon-400 via-cyber-400 to-purple-400 rounded-xl flex items-center justify-center animate-float">
                <Book className="w-12 h-12 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Immortal AI Agent Documentation</h1>
                <p className="text-lg text-gray-300">
                  Complete guide to creating, customizing and deploying your sovereign AI companions.
                </p>
              </div>
            </div>
          </div>

          {/* Table of Contents */}
          <Card className="glass-card border-neon-400/20">
            <CardHeader>
              <CardTitle className="text-xl text-white">Table of Contents</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: 'Getting Started', href: '#getting-started' },
                { title: 'Agent Creation', href: '#agent-creation' },
                { title: 'Memory System', href: '#memory-system' },
                { title: 'Cross-Platform Integration', href: '#cross-platform' },
                { title: 'Security & Privacy', href: '#security-privacy' },
                { title: 'Technical Reference', href: '#technical-reference' }
              ].map((item) => (
                <a 
                  key={item.title} 
                  href={item.href} 
                  className="glass-card border-neon-400/10 p-4 rounded-lg hover:border-neon-400/30 transition-all group"
                >
                  <span className="text-white group-hover:text-neon-400 font-medium transition-colors">
                    {item.title}
                  </span>
                </a>
              ))}
            </CardContent>
          </Card>

          {/* Getting Started */}
          <Card id="getting-started" className="glass-card border-neon-400/20 scroll-mt-20">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center gap-2">
                <Lightbulb className="w-6 h-6 text-neon-400" />
                Getting Started
              </CardTitle>
              <CardDescription className="text-gray-400">
                Everything you need to know to start using the Immortal AI Agent platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-xl text-white mb-2">Overview</h3>
                <p className="text-gray-300">
                  The Immortal AI Agent platform allows you to create AI companions that persist beyond sessions, 
                  maintain memories, and operate across multiple platforms. Unlike traditional chatbots, 
                  these agents have sovereign identities secured by blockchain technology and can learn and evolve over time.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl text-white mb-2">Key Features</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>Persistent agent identity and memory across sessions</li>
                  <li>Cross-platform compatibility (web, Discord, Telegram, browser extensions)</li>
                  <li>On-chain memory storage using the Membase protocol</li>
                  <li>Customizable agent personality and knowledge base</li>
                  <li>End-to-end encrypted conversations and memories</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl text-white mb-2">Requirements</h3>
                <p className="text-gray-300">
                  To use the platform, you'll need:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>A Web3-compatible wallet (MetaMask, Trust Wallet, etc.)</li>
                  <li>A small amount of BNB for gas fees (when storing memories on-chain)</li>
                  <li>Modern web browser (Chrome, Firefox, Safari, Brave)</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Agent Creation */}
          <Card id="agent-creation" className="glass-card border-neon-400/20 scroll-mt-20">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center gap-2">
                <Bot className="w-6 h-6 text-cyber-400" />
                Agent Creation
              </CardTitle>
              <CardDescription className="text-gray-400">
                How to create and customize your AI agent
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-xl text-white mb-2">Creating Your First Agent</h3>
                <ol className="list-decimal list-inside space-y-4 text-gray-300">
                  <li>
                    <span className="font-semibold">Connect your wallet</span>
                    <p className="mt-1 pl-6">
                      Click the "Connect Wallet" button in the top-right corner and select your preferred wallet provider.
                    </p>
                  </li>
                  <li>
                    <span className="font-semibold">Fill in agent details</span>
                    <p className="mt-1 pl-6">
                      Enter a name, select or upload an avatar, and create a personality description for your agent.
                    </p>
                  </li>
                  <li>
                    <span className="font-semibold">Define initial knowledge base</span>
                    <p className="mt-1 pl-6">
                      Upload documents or provide text to serve as your agent's starting knowledge.
                    </p>
                  </li>
                  <li>
                    <span className="font-semibold">Configure memory settings</span>
                    <p className="mt-1 pl-6">
                      Choose which types of memories to store on-chain vs. off-chain and set memory retention parameters.
                    </p>
                  </li>
                  <li>
                    <span className="font-semibold">Deploy your agent</span>
                    <p className="mt-1 pl-6">
                      Complete the creation process and sign the transaction to establish your agent's identity on-chain.
                    </p>
                  </li>
                </ol>
              </div>
              
              <div>
                <h3 className="text-xl text-white mb-2">Personality Customization</h3>
                <p className="text-gray-300">
                  Your agent's personality determines how it interacts with users. 
                  Be detailed in your description, including:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>Communication style (formal, casual, technical, simple)</li>
                  <li>Character traits (helpful, witty, serious, creative)</li>
                  <li>Subject matter expertise and knowledge boundaries</li>
                  <li>Response preferences (concise vs. detailed)</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Memory System */}
          <Card id="memory-system" className="glass-card border-neon-400/20 scroll-mt-20">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center gap-2">
                <Database className="w-6 h-6 text-purple-400" />
                Memory System
              </CardTitle>
              <CardDescription className="text-gray-400">
                How agent memories are stored, categorized and utilized
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-xl text-white mb-2">Memory Types</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="glass-card p-4 border-neon-400/10">
                    <h4 className="text-lg text-white mb-2">Conversation Memories</h4>
                    <p className="text-gray-300">
                      Records of interactions between the agent and users. 
                      These help maintain context across sessions.
                    </p>
                  </div>
                  <div className="glass-card p-4 border-neon-400/10">
                    <h4 className="text-lg text-white mb-2">Factual Memories</h4>
                    <p className="text-gray-300">
                      Specific information the agent has learned that it can recall later, 
                      such as user preferences or important dates.
                    </p>
                  </div>
                  <div className="glass-card p-4 border-neon-400/10">
                    <h4 className="text-lg text-white mb-2">Preference Memories</h4>
                    <p className="text-gray-300">
                      User preferences and settings that help the agent personalize interactions.
                    </p>
                  </div>
                  <div className="glass-card p-4 border-neon-400/10">
                    <h4 className="text-lg text-white mb-2">Action Memories</h4>
                    <p className="text-gray-300">
                      Records of actions the agent has performed on behalf of users, 
                      such as setting reminders or submitting information.
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl text-white mb-2">Memory Storage Options</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg text-white">On-Chain Storage</h4>
                    <p className="text-gray-300">
                      Critical memories can be stored on the BNB Chain using the Membase protocol, 
                      ensuring they are immutable, persistent, and verifiable.
                    </p>
                    <p className="text-gray-300 mt-2">
                      <span className="text-neon-400 font-semibold">Benefits:</span> Maximum persistence, 
                      true ownership, verifiability.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg text-white">Off-Chain Storage</h4>
                    <p className="text-gray-300">
                      Less critical memories can be stored off-chain for cost efficiency 
                      while still maintaining encryption and accessibility.
                    </p>
                    <p className="text-gray-300 mt-2">
                      <span className="text-neon-400 font-semibold">Benefits:</span> Cost-effective, 
                      faster retrieval, suitable for temporary information.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cross-Platform Integration */}
          <Card id="cross-platform" className="glass-card border-neon-400/20 scroll-mt-20">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center gap-2">
                <Globe className="w-6 h-6 text-neon-400" />
                Cross-Platform Integration
              </CardTitle>
              <CardDescription className="text-gray-400">
                Deploy your agent across multiple platforms
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-xl text-white mb-2">Available Platforms</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  <div className="glass-card p-4 border-neon-400/10">
                    <h4 className="text-lg text-white mb-2">Web Interface</h4>
                    <p className="text-gray-300">
                      The primary way to interact with your agent through our web application.
                    </p>
                  </div>
                  <div className="glass-card p-4 border-neon-400/10">
                    <h4 className="text-lg text-white mb-2">Discord Bot</h4>
                    <p className="text-gray-300">
                      Deploy your agent as a Discord bot that can participate in servers and DMs.
                    </p>
                  </div>
                  <div className="glass-card p-4 border-neon-400/10">
                    <h4 className="text-lg text-white mb-2">Telegram Bot</h4>
                    <p className="text-gray-300">
                      Make your agent available through Telegram for mobile conversations.
                    </p>
                  </div>
                  <div className="glass-card p-4 border-neon-400/10">
                    <h4 className="text-lg text-white mb-2">Browser Extension</h4>
                    <p className="text-gray-300">
                      Access your agent directly from your browser while surfing the web.
                    </p>
                  </div>
                  <div className="glass-card p-4 border-neon-400/10">
                    <h4 className="text-lg text-white mb-2">Mobile App</h4>
                    <p className="text-gray-300">
                      Take your agent with you on iOS and Android devices.
                    </p>
                  </div>
                  <div className="glass-card p-4 border-neon-400/10 flex items-center justify-center">
                    <p className="text-gray-400 italic text-center">
                      More platforms coming soon...
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl text-white mb-2">Memory Synchronization</h3>
                <p className="text-gray-300">
                  When your agent operates across multiple platforms, memories are automatically synchronized 
                  through the BitAgent protocol. This ensures a consistent experience regardless of where 
                  the interaction takes place.
                </p>
                <div className="mt-4 glass-card p-4 border-neon-400/10">
                  <h4 className="text-lg text-white mb-1">Synchronization Process</h4>
                  <ol className="list-decimal list-inside space-y-2 text-gray-300">
                    <li>New memories are created on the platform where the interaction occurs</li>
                    <li>The BitAgent protocol encrypts and temporarily stores the memory</li>
                    <li>Memory is propagated to other connected platforms</li>
                    <li>Critical memories are submitted for on-chain storage based on your settings</li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security & Privacy */}
          <Card id="security-privacy" className="glass-card border-neon-400/20 scroll-mt-20">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-cyber-400" />
                Security & Privacy
              </CardTitle>
              <CardDescription className="text-gray-400">
                How your agent and its memories are protected
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-xl text-white mb-2">Encryption</h3>
                <p className="text-gray-300">
                  All agent memories are encrypted using a combination of public and private keys:
                </p>
                <div className="mt-4 glass-card p-4 border-neon-400/10">
                  <h4 className="text-lg text-white mb-1 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-neon-400" />
                    End-to-End Encryption
                  </h4>
                  <p className="text-gray-300">
                    Messages and memories are encrypted using a key derived from your wallet's private key, 
                    ensuring only you can decrypt and access your agent's memories.
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl text-white mb-2">Data Ownership & Control</h3>
                <p className="text-gray-300">
                  You maintain full ownership and control over your agent and its data:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 mt-2">
                  <li>All sensitive data is encrypted with your keys</li>
                  <li>On-chain memories are controlled by your wallet address</li>
                  <li>You can delete or export all agent data at any time</li>
                  <li>No third-party access without your explicit permission</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Technical Reference */}
          <Card id="technical-reference" className="glass-card border-neon-400/20 scroll-mt-20">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center gap-2">
                <Code className="w-6 h-6 text-purple-400" />
                Technical Reference
              </CardTitle>
              <CardDescription className="text-gray-400">
                Developer documentation and API information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-xl text-white mb-2">API Reference</h3>
                <p className="text-gray-300">
                  Technical documentation for integrating with the Immortal AI Agent platform:
                </p>
                <div className="mt-4 glass-card p-4 border-neon-400/10">
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>
                      {`// Example: Creating a new memory via API
const addMemory = async (agentId, memory) => {
  const response = await fetch(
    \`https://api.immortal.ai/agents/\${agentId}/memories\`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': \`Bearer \${yourApiKey}\`
      },
      body: JSON.stringify({
        type: memory.type,
        content: memory.content,
        metadata: memory.metadata,
        encrypted: true
      })
    }
  );
  return response.json();
};`}
                    </code>
                  </pre>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl text-white mb-2">Smart Contracts</h3>
                <p className="text-gray-300">
                  Core smart contracts for the Membase protocol on BNB Chain:
                </p>
                <div className="mt-4 glass-card p-4 border-neon-400/10 space-y-3">
                  <div>
                    <h4 className="text-lg text-white mb-1">MembaseRegistry</h4>
                    <p className="text-gray-300">
                      <span className="text-neon-400 font-mono">0x1a2b3c4d5e6f...</span> - 
                      Manages agent identities and memory access control
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg text-white mb-1">MemoryStorage</h4>
                    <p className="text-gray-300">
                      <span className="text-neon-400 font-mono">0x7a8b9c0d1e2f...</span> - 
                      Handles on-chain storage and retrieval of encrypted memories
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg text-white mb-1">BitAgentProtocol</h4>
                    <p className="text-gray-300">
                      <span className="text-neon-400 font-mono">0x3c4d5e6f7a8b...</span> - 
                      Manages cross-platform synchronization and permissions
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Documentation;
