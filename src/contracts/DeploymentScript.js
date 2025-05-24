
// Deployment script for smart contracts
// Run this with: node DeploymentScript.js

const { ethers } = require('hardhat');

async function main() {
  console.log('Starting deployment of Immortal AI Agent contracts...');
  
  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log('Deploying contracts with account:', deployer.address);
  console.log('Account balance:', (await deployer.getBalance()).toString());

  // Deploy MembaseRegistry
  console.log('\n1. Deploying MembaseRegistry...');
  const MembaseRegistry = await ethers.getContractFactory('MembaseRegistry');
  const membaseRegistry = await MembaseRegistry.deploy();
  await membaseRegistry.deployed();
  console.log('MembaseRegistry deployed to:', membaseRegistry.address);

  // Deploy MemoryStorage
  console.log('\n2. Deploying MemoryStorage...');
  const MemoryStorage = await ethers.getContractFactory('MemoryStorage');
  const memoryStorage = await MemoryStorage.deploy();
  await memoryStorage.deployed();
  console.log('MemoryStorage deployed to:', memoryStorage.address);

  // Deploy BitAgentProtocol
  console.log('\n3. Deploying BitAgentProtocol...');
  const BitAgentProtocol = await ethers.getContractFactory('BitAgentProtocol');
  const bitAgentProtocol = await BitAgentProtocol.deploy();
  await bitAgentProtocol.deployed();
  console.log('BitAgentProtocol deployed to:', bitAgentProtocol.address);

  // Save deployment info
  const deploymentInfo = {
    network: 'BSC Testnet',
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
    contracts: {
      MembaseRegistry: {
        address: membaseRegistry.address,
        txHash: membaseRegistry.deployTransaction.hash
      },
      MemoryStorage: {
        address: memoryStorage.address,
        txHash: memoryStorage.deployTransaction.hash
      },
      BitAgentProtocol: {
        address: bitAgentProtocol.address,
        txHash: bitAgentProtocol.deployTransaction.hash
      }
    }
  };

  console.log('\n=== DEPLOYMENT SUMMARY ===');
  console.log(JSON.stringify(deploymentInfo, null, 2));

  // Verify contracts (optional - requires BSCScan API key)
  if (process.env.BSCSCAN_API_KEY) {
    console.log('\n4. Verifying contracts...');
    
    try {
      await hre.run('verify:verify', {
        address: membaseRegistry.address,
        constructorArguments: [],
      });
      console.log('MembaseRegistry verified');
    } catch (error) {
      console.log('MembaseRegistry verification failed:', error.message);
    }

    try {
      await hre.run('verify:verify', {
        address: memoryStorage.address,
        constructorArguments: [],
      });
      console.log('MemoryStorage verified');
    } catch (error) {
      console.log('MemoryStorage verification failed:', error.message);
    }

    try {
      await hre.run('verify:verify', {
        address: bitAgentProtocol.address,
        constructorArguments: [],
      });
      console.log('BitAgentProtocol verified');
    } catch (error) {
      console.log('BitAgentProtocol verification failed:', error.message);
    }
  }

  console.log('\n=== DEPLOYMENT COMPLETE ===');
  console.log('Update your frontend with these contract addresses!');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
