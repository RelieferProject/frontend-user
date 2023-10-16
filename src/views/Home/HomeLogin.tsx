import LayoutsContainer from '@components/Layouts/LayoutsContainer';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import logo from '@assets/logo.svg';
import Lottie from 'react-lottie';
import ReactLottie from '@components/Base/ReactLottie';

import walletLottie from '@assets/lottie/wallet.json';
import ButtonStyled from '@components/ButtonStyled';
import { useWeb3React } from '@web3-react/core';
import { checkChainId, checkMetamask, switchChainFunction, useSwitchChain } from '@utils/web3Hooks';
import metamask from '@assets/images/wallet/metamask.svg';
import Web3 from 'web3';
import { setLocal } from '@utils/localStorage';
import { injected, walletconnect } from '@utils/connectors';
import usePopup from '@hooks/usePopup';
import { useNavigate } from 'react-router-dom';

interface Props extends SimpleComponent {}

const HomeLoginWrapper = styled.div``;

const ConnectorNames = {
  Injected: injected,
  WalletConnect: walletconnect,
};

function HomeLogin(props: Props) {
  const { chainId } = useWeb3React();
  const context = useWeb3React<Web3>();
  const { account, activate, deactivate, active } = context;
  const popup = usePopup();
  const navigate = useNavigate();

  // useSwitchChain();

  const onClickConnect = async () => {
    const haveMetamask = await checkMetamask();
    // console.log(haveMetamask);
    if (!haveMetamask) {
      await popup.error({
        text: 'Please install Metamask wallet',
      });
      return;
    }
    // try {
    //   switchChainFunction();
    // } catch (error) {
    //   console.log(error);
    // }
    // console.log('ok');

    const checkChain = await checkChainId();

    if (!checkChain) {
      return navigate('/chain');
    }

    try {
      activate(ConnectorNames.Injected);
      // console.log('ok');
      setLocal('isLogin', true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <HomeLoginWrapper>
      <div className="flex flex-col items-center min-h-screen justify-center">
        <div className="flex flex-col items-center justify-center">
          <img className="w-22 h-22" src={logo} />
          <h1 className="mt-2 text-3xl text-text-purple font-bold">Reliefer</h1>
        </div>
        <div className="flex items-center my-4">
          <h1 className="text-xl text-text-purple font-bold">Login with Metamask Wallet</h1>

          <img className="w-[2rem] ml-2" src={metamask} alt="metamask" />
        </div>

        <ReactLottie json={walletLottie} height={300} width={300} />

        <ButtonStyled color={'secondary'} className="w-full text-xl" onClick={onClickConnect}>
          <div className="flex justify-center">Login</div>
        </ButtonStyled>
      </div>
    </HomeLoginWrapper>
  );
}

export default HomeLogin;
