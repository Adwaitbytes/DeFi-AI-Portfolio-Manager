
export const REBALANCE_CONTRACT_ABI = [
  {
    "inputs": [
      {
        "name": "tokens",
        "type": "address[]"
      },
      {
        "name": "percentages",
        "type": "uint256[]"
      }
    ],
    "name": "rebalancePortfolio",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "user",
        "type": "address"
      }
    ],
    "name": "getPortfolioValue",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

// Mock contract address for BNB Testnet
export const REBALANCE_CONTRACT_ADDRESS = "0x1234567890123456789012345678901234567890";

export const VAULT_MANAGER_ABI = [
  {
    "inputs": [
      {
        "name": "token",
        "type": "address"
      },
      {
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "deposit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "token",
        "type": "address"
      },
      {
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

export const VAULT_MANAGER_ADDRESS = "0x0987654321098765432109876543210987654321";
