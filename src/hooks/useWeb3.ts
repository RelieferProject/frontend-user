import { useEffect, useState, useRef } from 'react';
import Web3 from 'web3';
import { HttpProviderOptions } from 'web3-core-helpers';
import { provider as ProviderType } from 'web3-core';
import { useWeb3React } from '@web3-react/core';
import getRpcUrl from '@utils/getRpcUrl';

const RPC_URL = getRpcUrl();
const httpProvider = new Web3.providers.HttpProvider(RPC_URL, { timeout: 10000 } as HttpProviderOptions);

/**
 * Provides a web3 instance using the provider provided by useWallet
 * with a fallback of an httpProver
 * Recreate web3 instance only if the ethereum provider change
 */
const useWeb3 = () => {
  const { library: ethereum } = useWeb3React();
  const refEth = useRef(ethereum);
  const [web3, setweb3] = useState(new Web3(ethereum || httpProvider));

  useEffect(() => {
    if (ethereum !== refEth.current) {
      setweb3(new Web3(ethereum || httpProvider));
      refEth.current = ethereum;
    }
  }, [ethereum]);

  return web3;

  // const { library, chainId, ...web3React } = useWeb3React();
  // const refEth = useRef(library);
  // const [provider, setprovider] = useState(library || httpProvider);

  // useEffect(() => {
  //   if (library !== refEth.current) {
  //     setprovider(library || httpProvider);
  //     refEth.current = library;
  //   }
  // }, [library]);

  // return library;
};

export default useWeb3;
