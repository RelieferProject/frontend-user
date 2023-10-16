import LayoutsContainer from '@components/Layouts/LayoutsContainer';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import logo from '@assets/logo.svg';
import Lottie from 'react-lottie';
import ReactLottie from '@components/Base/ReactLottie';

import blockchainLottie from '@assets/lottie/blockchain.json';
import ButtonStyled from '@components/ButtonStyled';
import { useWeb3React } from '@web3-react/core';
import { checkChainId, useSwitchChain } from '@utils/web3Hooks';
import { useNavigate } from 'react-router-dom';
import usePopup from '@hooks/usePopup';

interface Props extends SimpleComponent {}

const HomeChainWrapper = styled.div``;

function HomeChain(props: Props) {
  const { chainId } = useWeb3React();
  const navigate = useNavigate();
  const popup = usePopup();

  const doneCheck = async () => {
    const checkChain = await checkChainId();

    if (checkChain) {
      return navigate('/login');
    } else {
      await popup.error({
        text: 'Please check your network on metamask',
      });
      return;
    }
  };

  return (
    <HomeChainWrapper>
      <div className="flex flex-col items-center min-h-screen justify-center w-full">
        <div className="flex flex-col items-center justify-center">
          <img className="w-22 h-22" src={logo} />
          <h1 className="mt-2 text-3xl text-text-purple font-bold">Reliefer</h1>
        </div>
        <h1 className="my-2 text-xl text-text-purple font-bold">Network Detail</h1>

        <div className='p-6 glass mb-4'>
          <div>
            <b className='text-lg'>Name :</b>
            <p className='text-lg'>Reliefer Chain</p>
          </div>
          <div>
            <b className='text-lg'>RPC URL :</b>
            <p className='text-lg'>{import.meta.env.VITE_APP_NODE_1}</p>
          </div>
          <div>
            <b className='text-lg'>Chain Id :</b>
            <p className='text-lg'>{import.meta.env.VITE_APP_CHAIN_ID}</p>
          </div>
          <div>
            <b className='text-lg'>Currency Symbol :</b>
            <p className='text-lg'>ETH</p>
          </div>
        </div>


        <ButtonStyled color={'secondary'} className="w-full text-xl" onClick={doneCheck}>
          <div className="w-full flex justify-center">Done</div>
        </ButtonStyled>
      </div>
    </HomeChainWrapper>
  );
}

export default HomeChain;
