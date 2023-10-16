import menuListData from '@configs/menuListData';
import { useAppDispatch } from '@states/hooks';
import { useSideBar } from '@states/layout/hooks';
import { CLOSESIDEBAR, TOGGLESIDEBAR } from '@states/layout/reducer';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import Hamburger from 'hamburger-react';
import logo from '@assets/logo.svg';
import book from '@assets/images/book.png';
import ButtonStyled from '@components/ButtonStyled';
import { useWeb3React } from '@web3-react/core';
import { removeLocal } from '@utils/localStorage';
import useResponsive from '@utils/useResponsive';
import { LOGOUT } from '@states/profile/action';

interface Props {}

const SidebarWrapper = styled.div``;

function LayoutsSidebar(props: Props) {
  const dispatch = useAppDispatch();
  const open = useSideBar();
  const location = useLocation();
  const [state, setState] = useState(menuListData);
  const { deactivate } = useWeb3React();
  const navigate = useNavigate();
  const isMobile = useResponsive('mobileL');

  const checkRoute = (menu: any) => {
    return location.pathname.includes(menu.path);
  };

  const checkRouteSub = (menu: any) => {
    return menu.path.find((e: any) => location.pathname.includes(e));
  };

  const toggle = () => {
    dispatch(TOGGLESIDEBAR());
  };

  useEffect(() => {
    if (isMobile) {
      dispatch(CLOSESIDEBAR());
    }
  }, [location]);

  const logoutClick = () => {
    deactivate();
    dispatch(LOGOUT());
    removeLocal('isLogin');
    // navigate('/connect');
  };

  // const openSubMenu = (index: number) => {
  //   const newMenu = state[index];
  //   newMenu.isOpen = !newMenu.isOpen ? true : false;
  //   setState([...state.slice(0, index), newMenu, ...state.slice(index + 1)]);
  // };

  return (
    <SidebarWrapper className="w-full py-2 flex flex-col items-center relative">
      <div className="fixed z-10 top-0 bg-black bg-opacity-60 h-[3.4rem] w-full max-w-md mx-auto px-screen flex items-center justify-center">
        <div className="flex items-center mb-2">
          <Link to={'/profile'} className="flex items-center">
            <img className="w-8 h-8" src={logo} />
            <h1 className="ml-6 text-white text-xl font-bold">Reliefer</h1>
          </Link>
        </div>
      </div>
      <div className="fixed z-10 bottom-0 h-[3.4rem] w-full max-w-md mx-auto px-screen flex flex-col items-center">
        <div className="w-full h-full grid gradient-purple grid-flow-col">
          {state.map((e, index) =>
            e.isLogout ? (
              <div
                key={e.key}
                onClick={logoutClick}
                className={`w-full h-full relative menu-item overflow-hidden ${
                  checkRoute(e) ? 'menu-item-active' : 'menu-item-unactive'
                }`}
              >
                <div className="w-10 flex justify-center text-2xl">{e.icon}</div>
              </div>
            ) : (
              <Link key={e.key} to={e.path as any}>
                <div
                  className={`w-full h-full relative menu-item overflow-hidden ${
                    checkRoute(e) ? 'menu-item-active' : 'menu-item-unactive'
                  }`}
                >
                  <div className="w-10 flex justify-center text-2xl">{e.icon}</div>
                </div>
              </Link>
            )
          )}
        </div>
      </div>
    </SidebarWrapper>
  );
}

export default LayoutsSidebar;
