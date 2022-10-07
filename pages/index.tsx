import React, { useContext } from 'react';
import type { NextPage } from 'next';

import MainPageRender from '../components/MainPageRender';

import useWalletBalance from '../hooks/useWalletBalance';
import useWealthBalance from '../hooks/useWealthBalance';
import AddressQRReader from '../components/AddressQRReader';
import { useRouter } from 'next/router';
import useQRAddressReader from '../hooks/useQRAddressReader';
import useTransactions from '../hooks/useTransactions';
import AuthContext, { AuthContextType } from '../context/AuthContext';

const MainPage: NextPage = () => {
  const { user } = useContext(AuthContext) as AuthContextType;

  const walletBalance = useWalletBalance();
  const wealthBalance = useWealthBalance();
  const transactions = useTransactions();

  const router = useRouter();

  const [
    isQRDialogOpen,
    handleQRDialogOpen,
    handleQRReaderResult,
    handleQRDialogClose,
  ] = useQRAddressReader({ redirectOnResult: true, router: router });

  if (
    (walletBalance.isLoading || walletBalance.isError) ||
    (wealthBalance.isLoading || wealthBalance.isError) ||
    (transactions.isLoading || transactions.isError)
  ) {
    return <MainPageRender isLoading userName={user.name} />;
  };

  return (
    <>
      <MainPageRender
        scanQROnClick={handleQRDialogOpen}
        walletAmount={walletBalance.data.balanceAsNumber}
        wealthAmount={wealthBalance.data.balanceAsNumber}
        averageAPY={wealthBalance.data.apy}
        transactions={transactions.data}
        userName={user.name}
        avatarImageURL={user.profileImage}
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
