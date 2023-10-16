import AdminDashboard from '@views/AdminDashboard';
import AdminLeaderboard from '@views/AdminLeaderBoard';
import AdminProfile from '@views/AdminProfile';
import CampaignPage from '@views/Campaign';
import CampaignDetail from '@views/Campaign/CampaignDetail';
import OwnCampaignPage from '@views/Campaign/OwnCampaign';
import Connect from '@views/Connect';
import Home from '@views/Home/Home';
import HomeChain from '@views/Home/HomeChain';
import HomeLogin from '@views/Home/HomeLogin';
import Profile from '@views/Profile';
import Test from '@views/Test';
import Verify from '@views/Verify';
import { createRef } from 'react';
import { Navigate } from 'react-router-dom';

const routes = [
  { path: '/', element: <Home name="Dashboard" />, nodeRef: createRef() },
  {
    path: '/login',
    key: 'Connect',
    name: 'Connect Wallet',
    element: <HomeLogin />,
    nodeRef: createRef(),
  },
  { path: '/chain', element: <HomeChain name="Home Chain" />, nodeRef: createRef() },
  { path: '/verify', element: <Verify name="Verify" />, nodeRef: createRef() },
  // { path: '/*', element: <AdminDashboard name="Dashboard" />, nodeRef: createRef() },
  // { path: '/', key: 'Other', name: 'Other', element: <Navigate to="/admin/dashboard" replace /> },
  { path: '/dashboard/profile', element: <Profile name="Profile" />, nodeRef: createRef() },
  {
    path: '/dashboard/campaign',
    key: 'Connect',
    name: 'Campaign',
    element: <CampaignPage />,
    nodeRef: createRef(),
  },
  {
    path: '/dashboard/mycampaign',
    key: 'mycampaign',
    name: 'Own Campaign',
    element: <OwnCampaignPage />,
    nodeRef: createRef(),
  },
  {
    path: '/dashboard/campaign/:id',
    key: 'detail',
    name: 'Campaign Detail',
    element: <CampaignDetail />,
    nodeRef: createRef(),
  },
  // { path: '/test', key: 'Test', name: 'Test', element: <Test name="Test" />, nodeRef: createRef() },
  { path: '/*', key: 'Other', name: 'Other', element: () => <Navigate to="/profile" /> },

  // admin dashboard
  // {
  //   path: '/admin/dashboard',
  //   key: 'AdminDashboard',
  //   name: 'Dashboard',
  //   element: <AdminDashboard name="Dashboard" />,
  //   nodeRef: createRef(),
  // },
  // {
  //   path: '/admin/profile',
  //   key: 'AdminProfile',
  //   name: 'Profile',
  //   element: <AdminProfile name="Dashboard" />,
  //   nodeRef: createRef(),
  // },
  // {
  //   path: '/admin/Leaderboard',
  //   key: 'Leaderboard',
  //   name: 'Leaderboard',
  //   element: <AdminLeaderboard name="Dashboard" />,
  //   nodeRef: createRef(),
  // },
];

export { routes };
