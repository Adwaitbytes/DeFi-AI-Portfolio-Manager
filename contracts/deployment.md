
# Smart Contract Deployment Guide for BNB Testnet

## Prerequisites
1. Install Remix IDE (https://remix.ethereum.org/)
2. Install MetaMask and connect to BNB Testnet
3. Get BNB testnet tokens from faucet: https://testnet.bnbchain.org/faucet-smart

## BNB Testnet Configuration
- Network Name: BSC Testnet
- RPC URL: https://data-seed-prebsc-1-s1.bnbchain.org:8545/
- Chain ID: 97
- Symbol: tBNB
- Block Explorer: https://testnet.bscscan.com/

## Deployment Order

### 1. Deploy ImmortalAgent.sol
- This is the main NFT contract for AI agents
- No constructor parameters needed
- Estimated gas: ~2,500,000

### 2. Deploy MemoryStorage.sol
- Handles decentralized memory storage
- No constructor parameters needed
- Estimated gas: ~2,000,000

### 3. Deploy PlatformRegistry.sol
- Manages cross-platform connections
- No constructor parameters needed
- Estimated gas: ~2,200,000

## Post-Deployment Setup

### After deploying MemoryStorage:
1. Call `authorizeAgent(IMMORTAL_AGENT_ADDRESS, true)` to allow the agent contract to store memories

### After deploying PlatformRegistry:
1. Register default platforms:
   - `registerPlatform("Web Interface", "web", "https://your-domain.com")`
   - `registerPlatform("Discord Bot", "discord", "discord-bot-endpoint")`
   - `registerPlatform("Telegram Bot", "telegram", "telegram-bot-endpoint")`

## Usage Costs (Testnet)
- Create Agent: Free (only gas)
- Store Memory: 0.001 tBNB per memory
- Platform Registration: Free (only gas)
- Agent Connections: Free (only gas)

## Integration with Frontend
Update your environment variables:
```
VITE_IMMORTAL_AGENT_CONTRACT=0x... (deployed address)
VITE_MEMORY_STORAGE_CONTRACT=0x... (deployed address)
VITE_PLATFORM_REGISTRY_CONTRACT=0x... (deployed address)
VITE_NETWORK_ID=97
```

## Security Notes
- All contracts are ownable for administrative functions
- Memory storage requires payment to prevent spam
- Platform operators can manage their own platforms
- Agent owners have full control over their agents and memories

## Gas Optimization Tips
- Batch memory storage when possible
- Use appropriate importance levels (1-10) for memories
- Regularly clean up inactive connections
