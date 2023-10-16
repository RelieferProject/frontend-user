import useGetProfile from '@hooks/useGetProfile';
import useVerifyToken from '@hooks/useVerifyToken';
import { useSideBar } from '@states/layout/hooks';
import { useEagerConnect } from '@utils/web3Hooks';
import { useWeb3React } from '@web3-react/core';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import LayoutsHeader from './LayoutsHeader';
import LayoutsParticle from './LayoutsParticle';
import LayoutsSidebar from './LayoutsSidebar';
import { useToken } from '@states/profile/hooks';

interface Props {
  children: React.ReactNode;
}

const LayoutWrapper = styled.div``;

function Layout(props: Props) {
  /* dimming-bg */
  const { active } = useWeb3React();
  const open = useSideBar();
  const navigate = useNavigate();
  const token = useToken();
  const location = useLocation();

  console.log('location', location.pathname);

  useEagerConnect();
  useVerifyToken();
  useGetProfile();
  // const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      if(['/login', '/chain', '/verify'].includes(location.pathname)) return;
      navigate('/');
    } else {
      if(location.pathname.includes('dashboard')) return;
      navigate('/dashboard/profile');
    }
  }, [active, token]);

  // if (!active) {
  //   return (
  //     <LayoutWrapper className="min-h-screen relative">
  //       <LayoutsParticle />
  //       {props.children}
  //     </LayoutWrapper>
  //   );
  // }

  return (
    <LayoutWrapper className="relative bg-gray-300">
      <div
        className={`${
          !token ? 'bg-white' : 'grass-bg'
        } w-full min-h-screen max-w-md mx-auto px-screen relative flex flex-col transition-all items-center`}
      >
        {token && <LayoutsSidebar />}
        <div className="min-h-screen w-full p-4 py-16">{props.children}</div>
      </div>
    </LayoutWrapper>
  );
}

export default Layout;
