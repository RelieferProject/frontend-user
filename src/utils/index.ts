import { isAddress } from 'ethers/lib/utils';
import { Contract } from '@ethersproject/contracts';
import type { JsonRpcProvider, JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
import { AddressZero } from '@ethersproject/constants';

export function addressParse(address: String, lenght = 4) {
  return address.slice(0, lenght) + '....' + address.slice(address.length - lenght, address.length);
}

export function getSigner(library: Web3Provider, account?: string) {
  return library.getSigner(account).connectUnchecked();
}

export function getProviderOrSigner(library: Web3Provider, account?: string) {
  return account ? getSigner(library, account) : library;
}

export function getContract(address: string, ABI: any, library: Web3Provider, account?: string) {
  return new Contract(address, ABI, getProviderOrSigner(library, account));
}

export function parseWeiToEther(wei: string) {
  return (+wei / 10 ** 18).toFixed(4);
}

export function parseSecondsToEnglish(seconds) {
  if (isNaN(seconds) || seconds < 0) {
    return 'Invalid input';
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = +(seconds % 60).toFixed(0);

  let result = '';

  if (hours > 0) {
    result += `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
  }

  if (minutes > 0) {
    if (result.length > 0) {
      result += ', ';
    }
    result += `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
  }

  if (remainingSeconds > 0) {
    if (result.length > 0) {
      result += ', and ';
    }
    result += `${remainingSeconds} ${remainingSeconds === 1 ? 'second' : 'seconds'}`;
  }

  return result;
}
