import React from 'react';
import type { NextPage } from 'next';

import MainPageRender from '../components/MainPageRender';

import useUserInfo from '../hooks/useUserInfo';
import useWalletBalance from '../hooks/useWalletBalance';
import AddressQRReader from '../components/AddressQRReader';
import { useRouter } from 'next/router';
import useQRAddressReader from '../hooks/useQRAddressReader';

const MainPage: NextPage = () => {
  const [ userInfo, isUserInfoLoading, hasUserInfoError ] = useUserInfo();
  const [
    walletBalance,
    ,
    isWalletBalanceLoading,
    hasWalletBalanceError,
  ] = useWalletBalance();


  const router = useRouter();

  const [
    isQRDialogOpen,
    handleQRDialogOpen,
    handleQRReaderResult,
    handleQRDialogClose,
  ] = useQRAddressReader({ redirectOnResult: true, router: router });

  if (isUserInfoLoading ||
    hasUserInfoError ||
    isWalletBalanceLoading ||
    hasWalletBalanceError ||
  ) {
    return null;
  };

  console.log(userInfo);

  return (
    <>
      <MainPageRender
        scanQROnClick={handleQRDialogOpen}
        walletAmount={walletBalance}
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
