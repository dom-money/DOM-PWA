import React from 'react';
import type { NextPage } from 'next';
import MainPage from '../components/MainPage';
import useUserInfo from '../hooks/useUserInfo';

const HomePage: NextPage = () => {
  const [ userInfo, isUserInfoLoading, isUserInfoError ]: any = useUserInfo();

  if (isUserInfoLoading || isUserInfoError) {
    return <p>Loading</p>;
  }

  console.log(userInfo);

  return (
    <MainPage
      totalBalanceAmount={45725.06}
      walletAmount={20000.12}
      userName={userInfo.name}
      avatarImageURL={userInfo.profileImage}
    />
  );
};

export default HomePage;
