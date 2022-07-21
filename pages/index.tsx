import React from 'react';
import type { NextPage } from 'next';

import MainPageRender from '../components/MainPageRender';

import useUserInfo from '../hooks/useUserInfo';
import useBalance from '../hooks/useBalance';

const MainPage: NextPage = () => {
  const [ userInfo, isUserInfoLoading, hasUserInfoError ]: any = useUserInfo();
  const [ balance, isBalanceLoading, hasBalanceError ] = useBalance();

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
