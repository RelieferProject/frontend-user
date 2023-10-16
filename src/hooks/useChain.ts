import { useState, useEffect } from 'react';
import { getLocal } from '@utils/localStorage';
// import { useWallet } from '@binance-chain/bsc-use-wallet';
import { useWeb3React } from '@web3-react/core';
import getRpcUrl from '@utils/getRpcUrl';

interface AddEthereumChainParameter {
  chainId: string; // A 0x-prefixed hexadecimal string
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string; // 2-6 characters long
    decimals: 18;
  };
  rpcUrls: string[];
  blockExplorerUrls?: string[];
  iconUrls?: string[]; // Currently ignored.
}

declare const window: any;

export function useSwitchChain() {
  useEffect(() => {
    try {
      const { ethereum } = window;
      if(!ethereum) return;
      let networkData: [AddEthereumChainParameter];
      //bsctestnet
      networkData = [
        {
          chainId: import.meta.env.VITE_APP_CHAIN_ID,
          chainName: 'BSCTESTNET',
          rpcUrls: getRpcUrl(),
          nativeCurrency: {
            name: 'ETH',
            symbol: 'ETH',
            decimals: 18,
          },
        },
      ];
      window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: networkData,
      });
    } catch (err) {
      console.error(err);
    }
  }, []);
}
