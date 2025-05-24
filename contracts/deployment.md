
# Smart Contract Deployment Guide for BNB Testnet with Greenfield Integration

## Prerequisites
1. Install Remix IDE (https://remix.ethereum.org/)
2. Install MetaMask and connect to BNB Testnet
3. Get BNB testnet tokens from faucet: https://testnet.bnbchain.org/faucet-smart
4. Set up BNB Greenfield account: https://greenfield.bnbchain.org/

## BNB Testnet Configuration
- Network Name: BSC Testnet
- RPC URL: https://data-seed-prebsc-1-s1.bnbchain.org:8545/
- Chain ID: 97
- Symbol: tBNB
- Block Explorer: https://testnet.bscscan.com/

## BNB Greenfield Integration
- Testnet Gateway: https://gnfd-testnet-sp1.bnbchain.org
- Storage Provider: BSC Testnet SP
- Documentation: https://docs.bnbchain.org/greenfield-docs/

## Deployment Order

### 1. Deploy ImmortalAgent.sol
- This is the main NFT contract for AI agents
- No constructor parameters needed
- Estimated gas: ~2,500,000

### 2. Deploy MemoryStorage.sol
- Handles decentralized memory storage with BNB Greenfield integration
- No constructor parameters needed
- Estimated gas: ~2,200,000

### 3. Deploy PlatformRegistry.sol
- Manages cross-platform connections
- No constructor parameters needed
- Estimated gas: ~2,200,000

## Post-Deployment Setup

### After deploying MemoryStorage:
1. Call `authorizeAgent(IMMORTAL_AGENT_ADDRESS, true)` to allow the agent contract to store memories
2. Configure Greenfield bucket for memory storage:
   ```bash
   gnfd-cmd bucket create --bucket-name "immortal-agent-memories" --primary-sp "BSC Testnet SP"
   ```

### After deploying PlatformRegistry:
1. Register default platforms:
   - `registerPlatform("Web Interface", "web", "https://your-domain.com")`
   - `registerPlatform("Discord Bot", "discord", "discord-bot-endpoint")`
   - `registerPlatform("Telegram Bot", "telegram", "telegram-bot-endpoint")`
   - `registerPlatform("Browser Extension", "browser", "extension-manifest-url")`
   - `registerPlatform("Mobile App", "mobile", "app-store-url")`

## BNB Greenfield Storage Architecture

### Memory Storage Flow:
1. **Agent Memory Creation** → Encrypted locally
2. **Upload to Greenfield** → Store in decentralized bucket
3. **Record on BSC** → Hash and metadata on-chain
4. **Cross-Platform Sync** → Distribute to all connected platforms

### Greenfield Bucket Structure:
```
immortal-agent-memories/
├── agents/
│   ├── {agent-id}/
│   │   ├── conversations/
│   │   ├── facts/
│   │   ├── preferences/
│   │   └── actions/
└── backups/
    └── {agent-id}/
        └── {timestamp}/
```

## Usage Costs (Testnet)
- Create Agent: Free (only gas)
- Store Memory on Greenfield: 0.001 tBNB per memory
- Platform Registration: Free (only gas)
- Agent Connections: Free (only gas)
- Greenfield Storage: Variable based on data size

## Integration with Frontend
Update your environment variables:
```env
VITE_IMMORTAL_AGENT_CONTRACT=0x... (deployed address)
VITE_MEMORY_STORAGE_CONTRACT=0x... (deployed address)
VITE_PLATFORM_REGISTRY_CONTRACT=0x... (deployed address)
VITE_NETWORK_ID=97
VITE_GREENFIELD_ENDPOINT=https://gnfd-testnet-sp1.bnbchain.org
VITE_GREENFIELD_BUCKET=immortal-agent-memories
```

## Security Features
- **Decentralized Storage**: All memory data stored on BNB Greenfield
- **End-to-End Encryption**: Client-side encryption before upload
- **Access Control**: Owner-only access to agent memories
- **Cross-Platform Verification**: Multi-signature validation for platform connections
- **Immutable Records**: On-chain hashes prevent tampering

## Greenfield SDK Integration
```javascript
import { Client } from '@bnb-chain/greenfield-js-sdk';

const client = Client.create({
  endpoint: 'https://gnfd-testnet-sp1.bnbchain.org',
  chainId: 97,
});

// Upload agent memory
const uploadMemory = async (agentId, memoryData) => {
  const objectName = `agents/${agentId}/memories/${Date.now()}.json`;
  const result = await client.object.createObject({
    bucketName: 'immortal-agent-memories',
    objectName: objectName,
    body: memoryData,
  });
  return result.objectId;
};
```

## Gas Optimization Tips
- Batch memory storage when possible
- Use appropriate importance levels (1-10) for memories
- Regularly clean up inactive connections
- Utilize Greenfield's built-in compression
- Implement memory lifecycle management

## Monitoring and Analytics
- Track memory usage per agent
- Monitor cross-platform sync health
- Analyze storage costs and optimization opportunities
- Agent activity and engagement metrics

## Troubleshooting
1. **Greenfield Connection Issues**: Check network connectivity and SP status
2. **Memory Upload Failures**: Verify bucket permissions and storage quotas
3. **Cross-Platform Sync Delays**: Check platform endpoints and authentication
4. **High Gas Costs**: Optimize batch operations and reduce on-chain calls

## Support and Documentation
- BNB Chain Documentation: https://docs.bnbchain.org/
- Greenfield Developer Guide: https://docs.bnbchain.org/greenfield-docs/
- Smart Contract Source: https://github.com/your-repo/immortal-agent-contracts
- Community Discord: https://discord.gg/bnbchain
