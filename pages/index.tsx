import React from 'react';
import type { NextPage } from 'next';

import MainPageRender from '../components/MainPageRender';

import useUserInfo from '../hooks/useUserInfo';
import useUSDCBalance from '../hooks/useUSDCBalance';

const MainPage: NextPage = () => {
  const [ userInfo, isUserInfoLoading, hasUserInfoError ] = useUserInfo();
  const [ balance, isBalanceLoading, hasBalanceError ] = useUSDCBalance();

  if (isUserInfoLoading ||
    hasUserInfoError ||
    isBalanceLoading ||
    hasBalanceError
  ) {
    return null;
  }

  console.log(userInfo);

  return (
    <MainPageRender
      walletAmount={balance}
      wealthAmount={0}
      userName={userInfo.name}
      avatarImageURL={userInfo.profileImage}
    />
  );
};

export default MainPage;
