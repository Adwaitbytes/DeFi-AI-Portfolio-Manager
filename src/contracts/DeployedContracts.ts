
// Production contract addresses for BSC Testnet
// Update these addresses after deploying your contracts

export const DEPLOYED_CONTRACTS = {
  // BSC Testnet Contract Addresses
  MEMBASE_REGISTRY: '0x0000000000000000000000000000000000000000', // Update after deployment
  MEMORY_STORAGE: '0x0000000000000000000000000000000000000000',   // Update after deployment
  BITAGENT_PROTOCOL: '0x0000000000000000000000000000000000000000', // Update after deployment
  
  // Network Configuration
  NETWORK: {
    chainId: 97,
    name: 'BSC Testnet',
    rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    blockExplorer: 'https://testnet.bscscan.com/',
    nativeCurrency: {
      name: 'tBNB',
      symbol: 'tBNB',
      decimals: 18
    }
  },

  // BNB Greenfield Configuration
  GREENFIELD: {
    endpoint: 'https://gnfd-testnet-sp1.bnbchain.org',
    chainId: 5600,
    explorerUrl: 'https://testnet.greenfieldscan.com/'
  },

  // API Endpoints
  APIS: {
    COINGECKO_BASE_URL: 'https://api.coingecko.com/api/v3',
    DEFI_LLAMA_BASE_URL: 'https://yields.llama.fi',
    PANCAKESWAP_SUBGRAPH: 'https://api.thegraph.com/subgraphs/name/pancakeswap/exchange',
    BSC_SCAN_API: 'https://api.bscscan.com/api'
  },

  // Default Gas Settings
  GAS: {
    gasLimit: 300000,
    gasPrice: '5000000000', // 5 gwei
    maxFeePerGas: '10000000000', // 10 gwei
    maxPriorityFeePerGas: '2000000000' // 2 gwei
  }
};

// ABI exports for frontend integration
export { REBALANCE_CONTRACT_ABI, VAULT_MANAGER_ABI } from './RebalanceContract';

// Contract interaction helpers
export const getContractConfig = (contractName: keyof typeof DEPLOYED_CONTRACTS) => {
  const address = DEPLOYED_CONTRACTS[contractName];
  if (!address || address === '0x0000000000000000000000000000000000000000') {
    throw new Error(`Contract ${contractName} not deployed yet. Please deploy contracts first.`);
  }
  return {
    address,
    gasLimit: DEPLOYED_CONTRACTS.GAS.gasLimit,
    gasPrice: DEPLOYED_CONTRACTS.GAS.gasPrice
  };
};

export const isProductionReady = () => {
  const criticalContracts = [
    DEPLOYED_CONTRACTS.MEMBASE_REGISTRY,
    DEPLOYED_CONTRACTS.MEMORY_STORAGE,
    DEPLOYED_CONTRACTS.BITAGENT_PROTOCOL
  ];
  
  return criticalContracts.every(addr => 
    addr && addr !== '0x0000000000000000000000000000000000000000'
  );
};

// Instructions for deployment:
console.log(`
🚀 DEPLOYMENT INSTRUCTIONS:

1. Install Hardhat:
   npm install --save-dev hardhat @nomiclabs/hardhat-ethers ethers

2. Create hardhat.config.js:
   module.exports = {
     solidity: "0.8.19",
     networks: {
       bscTestnet: {
         url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
         accounts: ["YOUR_PRIVATE_KEY_HERE"],
         chainId: 97
       }
     }
   };

3. Install OpenZeppelin:
   npm install @openzeppelin/contracts

4. Deploy contracts:
   npx hardhat run src/contracts/DeploymentScript.js --network bscTestnet

5. Update contract addresses in DeployedContracts.ts

6. Fund contracts with BNB for rewards:
   - Send 0.1 BNB to MemoryStorage contract
   - Send 0.1 BNB to BitAgentProtocol contract

🔗 Get testnet BNB: https://testnet.binance.org/faucet-smart
📖 Documentation: https://docs.bnbchain.org/docs/getting-started/

After deployment, your platform will have:
✅ Real decentralized storage with BNB Greenfield
✅ Live market data from CoinGecko & DeFiLlama  
✅ AI-powered analysis with OpenAI
✅ Cross-platform agent synchronization
✅ On-chain memory storage and rewards
✅ Production-ready smart contracts
`);
