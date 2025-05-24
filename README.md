# Immortal AI Agent Platform

A revolutionary decentralized AI agent platform built on BNB Chain and BNB Greenfield, enabling the creation of sovereign AI companions that persist across all platforms with immortal memory and cross-platform interoperability.

## 🌟 Features

### Core Capabilities
- **Immortal AI Agents**: Create AI agents with persistent identity and memory
- **BNB Greenfield Storage**: Decentralized memory storage with end-to-end encryption
- **Cross-Platform Deployment**: Deploy agents across web, Discord, Telegram, browser extensions, and mobile apps
- **Sovereign Identity**: NFT-based agent ownership with full user control
- **Memory Lifecycle Management**: Intelligent memory importance scoring and retention
- **Real-time Synchronization**: Live sync across all connected platforms

### Advanced Features
- **Portfolio Analysis**: AI-powered DeFi portfolio optimization
- **Smart Rebalancing**: Automated portfolio rebalancing based on AI insights
- **Market Intelligence**: Real-time market data analysis and trends
- **Secure Authentication**: Web3 wallet integration with BNB Chain
- **Responsive Design**: Optimized for all device sizes and screen types

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- MetaMask or compatible Web3 wallet
- BNB testnet tokens ([Get from faucet](https://testnet.bnbchain.org/faucet-smart))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-repo/immortal-ai-agent
   cd immortal-ai-agent
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### First Time Setup

1. **Connect Your Wallet**
   - Click "Connect Wallet" in the top navigation
   - Approve MetaMask connection
   - Switch to BNB Testnet (automatic prompt)

2. **Create Your Agent**
   - Enter agent name and personality
   - Choose avatar (or use default)
   - Confirm transaction (small gas fee)

3. **Start Interacting**
   - Chat with your agent in real-time
   - Watch memories being created and stored
   - Connect additional platforms

## 🏗️ Architecture

### Technology Stack
- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS
- **UI Components**: Shadcn/UI, Radix UI primitives
- **Blockchain**: BNB Smart Chain (BSC), Ethers.js
- **Storage**: BNB Greenfield decentralized storage
- **State Management**: React hooks, TanStack Query
- **Icons**: Lucide React
- **Charts**: Recharts

### Smart Contracts
- **ImmortalAgent.sol**: NFT contract for agent ownership
- **MemoryStorage.sol**: Decentralized memory management
- **PlatformRegistry.sol**: Cross-platform connection registry

### Data Flow
```
User Input → Agent Processing → Memory Creation → Greenfield Upload → On-chain Hash → Cross-platform Sync
```

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file in the project root:

```env
# Smart Contract Addresses (deployed on BNB Testnet)
VITE_IMMORTAL_AGENT_CONTRACT=0x...
VITE_MEMORY_STORAGE_CONTRACT=0x...
VITE_PLATFORM_REGISTRY_CONTRACT=0x...

# Network Configuration
VITE_NETWORK_ID=97
VITE_RPC_URL=https://data-seed-prebsc-1-s1.bnbchain.org:8545/

# BNB Greenfield Configuration
VITE_GREENFIELD_ENDPOINT=https://gnfd-testnet-sp1.bnbchain.org
VITE_GREENFIELD_BUCKET=immortal-agent-memories

# Optional: API Keys for enhanced features
VITE_OPENAI_API_KEY=your_openai_key
VITE_COINGECKO_API_KEY=your_coingecko_key
```

### Network Configuration
The application automatically configures BNB Testnet:
- **Network Name**: BSC Testnet
- **RPC URL**: https://data-seed-prebsc-1-s1.bnbchain.org:8545/
- **Chain ID**: 97
- **Currency**: tBNB
- **Explorer**: https://testnet.bscscan.com/

## 📱 Cross-Platform Integration

### Supported Platforms
1. **Web Interface** (Built-in)
2. **Discord Bot** (Connect via OAuth)
3. **Telegram Bot** (Connect via Bot Token)
4. **Browser Extension** (Chrome/Firefox)
5. **Mobile App** (iOS/Android)

### Platform Connection Process
1. Navigate to the "Cross-Platform" panel
2. Click "Connect" for desired platform
3. Follow platform-specific authentication
4. Wait for sync confirmation
5. Agent is now available on the platform

### Sync Behavior
- **Real-time Memory Sync**: All memories sync across platforms instantly
- **Personality Consistency**: Agent maintains same personality everywhere
- **Context Awareness**: Agent remembers conversations across platforms
- **Preference Persistence**: User preferences sync automatically

## 🔐 Security & Privacy

### Data Protection
- **End-to-End Encryption**: All memories encrypted before storage
- **Client-Side Encryption**: Encryption happens in your browser
- **Zero-Knowledge Architecture**: Platform never sees unencrypted data
- **User-Controlled Keys**: You own your encryption keys

### Smart Contract Security
- **Audited Contracts**: All contracts undergo security audits
- **Owner-Only Access**: Only agent owners can modify their agents
- **Immutable Records**: On-chain hashes prevent tampering
- **Decentralized Storage**: No single point of failure

### Privacy Features
- **Anonymous Agents**: No personal information required
- **Selective Sharing**: Choose what memories to share across platforms
- **Platform Isolation**: Disconnect platforms without losing data
- **Data Portability**: Export agent data at any time

## 💰 Economics & Costs

### Testnet Costs (Free)
- **Agent Creation**: Only gas fees (~$0.01)
- **Memory Storage**: 0.001 tBNB per memory (~$0.0003)
- **Platform Connections**: Only gas fees
- **Cross-platform Sync**: Free

### Mainnet Costs (When Available)
- **Agent Creation**: ~$1-5 depending on gas
- **Memory Storage**: ~$0.01-0.05 per memory
- **Platform Connections**: ~$0.50-2 per platform
- **Greenfield Storage**: Variable based on data size

### Storage Optimization
- **Importance Scoring**: Lower importance memories cost less
- **Compression**: Automatic data compression
- **Lifecycle Management**: Old memories auto-archived
- **Batch Operations**: Multiple operations in single transaction

## 🛠️ Development

### Project Structure
```
src/
├── components/          # React components
│   ├── ui/             # Shadcn/UI components
│   ├── AgentCreation.tsx
│   ├── ImmortalChat.tsx
│   ├── MemoryViewer.tsx
│   └── CrossPlatformPanel.tsx
├── hooks/              # Custom React hooks
│   ├── useWallet.ts
│   ├── useImmortalAgent.ts
│   └── useCrossPlatform.ts
├── pages/              # Page components
│   ├── Index.tsx
│   ├── Analytics.tsx
│   └── Documentation.tsx
├── types/              # TypeScript definitions
├── lib/                # Utility functions
└── contracts/          # Smart contract files
```

### Available Scripts
```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build

# Code Quality
npm run lint             # Run ESLint
npm run type-check       # Run TypeScript checks
npm run format           # Format code with Prettier

# Testing
npm run test             # Run test suite
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Generate coverage report
```

### Adding New Features

1. **Create Component**
   ```bash
   # Create new component file
   touch src/components/NewFeature.tsx
   ```

2. **Add Hook if Needed**
   ```bash
   # Create custom hook
   touch src/hooks/useNewFeature.ts
   ```

3. **Update Types**
   ```typescript
   // Add to src/types/agent.ts
   export interface NewFeature {
     id: string;
     // ... other properties
   }
   ```

4. **Integrate in Main App**
   ```typescript
   // Import and use in src/pages/Index.tsx
   import NewFeature from '@/components/NewFeature';
   ```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the Repository**
   ```bash
   git fork https://github.com/your-repo/immortal-ai-agent
   ```

2. **Create Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make Changes**
   - Follow TypeScript best practices
   - Add tests for new features
   - Update documentation

4. **Commit Changes**
   ```bash
   git commit -m "Add amazing feature"
   ```

5. **Push to Branch**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open Pull Request**
   - Describe changes clearly
   - Include screenshots if UI changes
   - Reference related issues

### Code Style Guidelines
- Use TypeScript for all new code
- Follow existing component patterns
- Add JSDoc comments for public functions
- Use semantic commit messages
- Ensure responsive design compatibility

## 📚 API Documentation

### Agent Management
```typescript
// Create new agent
const agent = await createAgent(name, personality, avatar);

// Add memory to agent
const memory = await addMemory(agentId, type, content, platform);

// Get agent memories
const memories = await getAgentMemories(agentId);
```

### Cross-Platform Sync
```typescript
// Connect platform
await connectPlatform(platformId, credentials);

// Sync all platforms
await syncAllPlatforms();

// Disconnect platform
await disconnectPlatform(platformId);
```

### Greenfield Storage
```typescript
// Upload memory to Greenfield
const objectId = await uploadToGreenfield(encryptedData);

// Retrieve memory from Greenfield
const data = await downloadFromGreenfield(objectId);

// Verify data integrity
const isValid = await verifyIntegrity(memoryId);
```

## 🐛 Troubleshooting

### Common Issues

**"Wallet not connecting"**
- Ensure MetaMask is installed and unlocked
- Check network configuration (should be BSC Testnet)
- Clear browser cache and cookies

**"Agent creation failed"**
- Verify you have sufficient tBNB for gas
- Check smart contract addresses in environment
- Ensure wallet is connected to correct network

**"Memory not syncing"**
- Check internet connection stability
- Verify Greenfield endpoint accessibility
- Try refreshing the page

**"Platform connection timeout"**
- Check platform-specific credentials
- Verify platform endpoint availability
- Ensure firewall isn't blocking connections

### Debug Mode
Enable debug logging by adding to localStorage:
```javascript
localStorage.setItem('debug', 'immortal-agent:*');
```

### Getting Help
- **GitHub Issues**: Report bugs and request features
- **Discord**: Join our community for real-time support
- **Documentation**: Check our comprehensive docs
- **Email**: contact@immortal-agent.com

## 🗺️ Roadmap

### Phase 1 (Current) - Foundation
- ✅ Basic agent creation and management
- ✅ BNB Chain integration
- ✅ Greenfield storage integration
- ✅ Web interface
- ✅ Memory management system

### Phase 2 - Enhanced Intelligence
- 🔄 Advanced AI personality models
- 🔄 Improved conversation context
- 🔄 Multi-language support
- 🔄 Voice interaction capabilities
- 🔄 Enhanced memory categorization

### Phase 3 - Platform Expansion
- 📋 Discord bot deployment
- 📋 Telegram bot integration
- 📋 Browser extension release
- 📋 Mobile app launch
- 📋 API for third-party integrations

### Phase 4 - Advanced Features
- 📋 Agent-to-agent communication
- 📋 Collective intelligence networks
- 📋 Advanced DeFi integrations
- 📋 NFT marketplace for agents
- 📋 DAO governance implementation

### Phase 5 - Ecosystem Growth
- 📋 Mainnet deployment
- 📋 Developer SDK release
- 📋 Partner integrations
- 📋 Enterprise solutions
- 📋 Global scaling

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **BNB Chain Team** for the excellent blockchain infrastructure
- **Greenfield Team** for revolutionary decentralized storage
- **OpenAI** for inspiring AI capabilities
- **Radix UI** for accessible component primitives
- **Tailwind CSS** for utility-first styling
- **React Team** for the robust frontend framework

## 📞 Contact

- **Website**: https://immortal-agent.com
- **Email**: hello@immortal-agent.com
- **Twitter**: [@ImmortalAgent](https://twitter.com/ImmortalAgent)
- **Discord**: [Join our community](https://discord.gg/immortal-agent)
- **GitHub**: [Project Repository](https://github.com/your-repo/immortal-ai-agent)

---

**Built with ❤️ for the decentralized future**

*Creating immortal AI companions that transcend platforms and persist through time.*
