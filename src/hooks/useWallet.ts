import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

interface WalletState {
  address: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  chainId: number | null;
  balance: string | null;
}

export const useWallet = () => {
  const [walletState, setWalletState] = useState<WalletState>({
    address: null,
    isConnected: false,
    isConnecting: false,
    chainId: null,
    balance: null,
  });

  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      alert('Please install MetaMask to use this application');
      return;
    }

    setWalletState(prev => ({ ...prev, isConnecting: true }));

    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (accounts.length > 0) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        const balance = await provider.getBalance(address);
        const network = await provider.getNetwork();

        setWalletState({
          address,
          isConnected: true,
          isConnecting: false,
          chainId: Number(network.chainId),
          balance: ethers.formatEther(balance),
        });

        // Switch to BNB Smart Chain Testnet if not already connected
        const BSC_TESTNET_CHAIN_ID = '0x61'; // 97 in decimal
        if (Number(network.chainId) !== 97) {
          try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: BSC_TESTNET_CHAIN_ID }],
            });
          } catch (switchError: any) {
            // This error code indicates that the chain has not been added to MetaMask
            if (switchError.code === 4902) {
              try {
                await window.ethereum.request({
                  method: 'wallet_addEthereumChain',
                  params: [
                    {
                      chainId: BSC_TESTNET_CHAIN_ID,
                      chainName: 'BNB Smart Chain Testnet',
                      nativeCurrency: {
                        name: 'tBNB',
                        symbol: 'tBNB',
                        decimals: 18,
                      },
                      rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
                      blockExplorerUrls: ['https://testnet.bscscan.com/'],
                    },
                  ],
                });
              } catch (addError) {
                console.error('Failed to add BSC Testnet:', addError);
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      setWalletState(prev => ({ ...prev, isConnecting: false }));
    }
  };

  const disconnectWallet = () => {
    setWalletState({
      address: null,
      isConnected: false,
      isConnecting: false,
      chainId: null,
      balance: null,
    });
    // Clear any stored data related to the wallet
    localStorage.clear();
  };

  useEffect(() => {
    // Check if wallet is already connected
    const checkConnection = async () => {
      if (typeof window.ethereum !== 'undefined') {
        try {
          const accounts = await window.ethereum.request({
            method: 'eth_accounts',
          });

          if (accounts.length > 0) {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const address = await signer.getAddress();
            const balance = await provider.getBalance(address);
            const network = await provider.getNetwork();

            setWalletState({
              address,
              isConnected: true,
              isConnecting: false,
              chainId: Number(network.chainId),
              balance: ethers.formatEther(balance),
            });
          }
        } catch (error) {
          console.error('Failed to check wallet connection:', error);
        }
      }
    };

    checkConnection();

    // Listen for account changes
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          connectWallet();
        }
      });

      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }

    return () => {
      if (typeof window.ethereum !== 'undefined') {
        window.ethereum.removeAllListeners('accountsChanged');
        window.ethereum.removeAllListeners('chainChanged');
      }
    };
  }, []);

  return {
    ...walletState,
    connectWallet,
    disconnectWallet,
  };
};
