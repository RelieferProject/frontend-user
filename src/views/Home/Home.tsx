import LayoutsContainer from '@components/Layouts/LayoutsContainer';
import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import logo from '@assets/logo.svg';
import Lottie from 'react-lottie';
import ReactLottie from '@components/Base/ReactLottie';

import blockchainLottie from '@assets/lottie/blockchain.json';
import ButtonStyled from '@components/ButtonStyled';
import { Link } from 'react-router-dom';

interface Props extends SimpleComponent {}

const HomeWrapper = styled.div``;

function Home(props: Props) {
  return (
    <HomeWrapper>
      <div className="flex flex-col items-center min-h-screen justify-center">
        <div className="flex flex-col items-center justify-center">
          <img className="w-22 h-22" src={logo} />
          <h1 className="mt-2 text-3xl text-text-purple font-bold">Reliefer</h1>
        </div>
        <h1 className="mt-2 text-xl text-text-purple font-bold">Welcome To Reliefer Blockchain</h1>
        <ReactLottie json={blockchainLottie} height={300} width={300} />
        <Link className='w-full' to={'/login'}>
          <ButtonStyled color={'secondary'} className="w-full text-xl">
            <div className="flex justify-center">Let's start</div>
          </ButtonStyled>
        </Link>
      </div>
    </HomeWrapper>
  );
}

export default Home;
