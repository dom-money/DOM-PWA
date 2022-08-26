import React from 'react';
import type { NextPage } from 'next';

import MainPageRender from '../components/MainPageRender';

import useUserInfo from '../hooks/useUserInfo';
import useUSDCBalance from '../hooks/useUSDCBalance';
import AddressQRReader from '../components/AddressQRReader';
import { useRouter } from 'next/router';
import useQRAddressReader from '../hooks/useQRAddressReader';

const MainPage: NextPage = () => {
  const [ userInfo, isUserInfoLoading, hasUserInfoError ] = useUserInfo();
  const [ balance, isBalanceLoading, hasBalanceError ] = useUSDCBalance();

  const router = useRouter();

  const [
    isQRDialogOpen,
    handleQRDialogOpen,
    handleQRReaderResult,
    handleQRDialogClose,
  ] = useQRAddressReader({ redirectOnResult: true, router: router });

  if (isUserInfoLoading ||
    hasUserInfoError ||
    isBalanceLoading ||
    hasBalanceError
  ) {
    return null;
  };

  console.log(userInfo);

  return (
    <>
      <MainPageRender
        scanQROnClick={handleQRDialogOpen}
        walletAmount={balance}
        wealthAmount={0}
        userName={userInfo.name}
        avatarImageURL={userInfo.profileImage}
      />
      <AddressQRReader
        isOpen={isQRDialogOpen}
        onResult={handleQRReaderResult}
        onClose={handleQRDialogClose}
      />
    </>
  );
};

export default MainPage;
