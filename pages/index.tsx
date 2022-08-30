import React from 'react';
import type { NextPage } from 'next';

import MainPageRender from '../components/MainPageRender';

import useUserInfo from '../hooks/useUserInfo';
import useWalletBalance from '../hooks/useWalletBalance';
import useWealthBalance from '../hooks/useWealthBalance';
import AddressQRReader from '../components/AddressQRReader';
import { useRouter } from 'next/router';
import useQRAddressReader from '../hooks/useQRAddressReader';
import useTransactions from '../hooks/useTransactions';

const MainPage: NextPage = () => {
  const [ userInfo, isUserInfoLoading, hasUserInfoError ] = useUserInfo();
  const [
    walletBalance,
    ,
    isWalletBalanceLoading,
    hasWalletBalanceError,
  ] = useWalletBalance();

  const [
    wealthBalance,
    ,
    apy,
    ,
    isWealthBalanceLoading,
    hasWealthBalanceError,
  ] = useWealthBalance();

  const transactions = useTransactions();

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
    isWealthBalanceLoading ||
    hasWealthBalanceError ||
    (transactions.isLoading || transactions.isError)
  ) {
    return <MainPageRender isLoading />;
  };

  return (
    <>
      <MainPageRender
        scanQROnClick={handleQRDialogOpen}
        walletAmount={walletBalance}
        wealthAmount={wealthBalance}
        averageAPY={apy}
        transactions={transactions.data}
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
