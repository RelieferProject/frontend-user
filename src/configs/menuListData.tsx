import { RiTrophyLine, RiDashboardLine, RiWalletLine } from 'react-icons/ri';
import { MdCampaign } from 'react-icons/md';
import { FaHouseUser } from 'react-icons/fa';
import { ImExit } from 'react-icons/im';


const menuListData: any[] = [
  {
    name: 'Dashboard',
    key: 'Dashboard',
    path: '/dashboard/profile',
    icon: <FaHouseUser />,
  },
  {
    name: 'Campaign',
    key: 'campaign',
    path: '/dashboard/campaign',
    icon: <MdCampaign />,
  },
  {
    name: 'Reward',
    key: 'reward',
    path: '/dashboard/mycampaign',
    icon: <RiTrophyLine />,
  },
  {
    name: 'Logout',
    key: 'logout',
    path: '/dashboard/logout',
    icon: <ImExit />,
    isLogout: true,
  },
  // {
  //   name: 'Leaderboard',
  //   key: 'Leaderboard',
  //   path: '/admin/Leaderboard',
  //   icon: <RiTrophyLine />,
  // },
  // {
  //   name: 'My Wallet',
  //   key: 'mywallet',
  //   path: ['/admin/wallet'],
  //   icon: <RiWalletLine />,
  //   isOpen: false,
  //   subMenu: [
  //     {
  //       name: 'Add new',
  //       key: 'addnew',
  //       path: '/admin/wallet/add',
  //     },
  //     {
  //       name: 'Card List',
  //       key: 'cardList',
  //       path: '/admin/wallet/card',
  //     },
  //   ],
  // },
  // {
  //   name: 'Crypto',
  //   key: 'crypto',
  //   path: ['/crypto'],
  //   icon: <RiBitCoinLine />,
  //   isOpen: false,
  //   subMenu: [
  //     {
  //       name: 'Details',
  //       key: 'Details',
  //       path: '/crypto/detail',
  //     },
  //     {
  //       name: 'Staking',
  //       key: 'Staking',
  //       path: '/crypto/staking',
  //     },
  //   ],
  // },
];

export default menuListData;
