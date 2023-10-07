import { Web3Provider } from '@ethersproject/providers';
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
// import { BscConnector } from '@binance-chain/bsc-connector';
import { ethers } from 'ethers';
import getNodeUrl from './getRpcUrl';

export enum ConnectorNames {
  Injected = 'Injected',
  WalletConnect = 'walletconnect',
  // BSC = 'bsc',
}

const POLLING_INTERVAL = 12000;
const rpcUrl: string = getNodeUrl() || '';
const chainId = parseInt(import.meta.env.VITE_APP_CHAIN_ID!, 10);

const injected = new InjectedConnector({ supportedChainIds: [chainId] });

declare const window: any;

const walletconnect = new WalletConnectConnector({
  // rpc: { [chainId]: getNodeUrl },
  rpc: { [chainId]: rpcUrl },
  qrcode: true,
  // pollingInterval: POLLING_INTERVAL,
});

// const bscConnector = new BscConnector({ supportedChainIds: [chainId] });

export const connectorsByName: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.WalletConnect]: walletconnect,
  // [ConnectorNames.BSC]: bscConnector,
};

export const getLibrary = (provider: any): Web3Provider => {
  const library = new Web3Provider(provider);
  library.pollingInterval = POLLING_INTERVAL;
  // return library;
  return library;
};

/**
 * BSC Wallet requires a different sign method
 * @see https://docs.binance.org/smart-chain/wallet/wallet_api.html#binancechainbnbsignaddress-string-message-string-promisepublickey-string-signature-string
 */
export const signMessage = async (
  provider: any,
  account: string,
  message: string
): Promise<string> => {
  if (window.BinanceChain) {
    const { signature } = await window.BinanceChain.bnbSign(account, message);
    return signature;
  }

  /**
   * Wallet Connect does not sign the message correctly unless you use their method
   * @see https://github.com/WalletConnect/walletconnect-monorepo/issues/462
   */
  if (provider.provider?.wc) {
    const wcMessage = ethers.utils.hexlify(ethers.utils.toUtf8Bytes(message));
    const signature = await provider.provider?.wc.signPersonalMessage([wcMessage, account]);
    return signature;
  }

  return provider.getSigner(account).signMessage(message);
};
