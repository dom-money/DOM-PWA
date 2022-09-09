import React from 'react';
import type { NextPage } from 'next';

import MainPageRender from '../components/MainPageRender';

import useWalletBalance from '../hooks/useWalletBalance';
import useWealthBalance from '../hooks/useWealthBalance';
import AddressQRReader from '../components/AddressQRReader';
import useQRAddressReader from '../hooks/useQRAddressReader';
import useTransactions from '../hooks/useTransactions';
import { useAuthContext } from '../context/AuthContext';
import { sumTwoBalancesOfToken } from '../utils/BigNumberUtils';

const MainPage: NextPage = () => {
  const { user } = useAuthContext();

  const walletBalance = useWalletBalance();
  const wealthBalance = useWealthBalance();
  const transactions = useTransactions();

  const [
    isQRDialogOpen,
    handleQRDialogOpen,
    handleQRReaderResult,
    handleQRDialogClose,
  ] = useQRAddressReader({ redirectOnResult: true });

  if (
    (walletBalance.isLoading || walletBalance.isError) ||
    (wealthBalance.isLoading || wealthBalance.isError) ||
    (transactions.isLoading || transactions.isError)
  ) {
    return <MainPageRender isLoading userName={user.name} />;
  };

  const totalBalance = sumTwoBalancesOfToken(
      walletBalance.data.balanceAsBigNumber,
      wealthBalance.data.balanceAsBigNumber,
      walletBalance.data.tokenDecimals,
  );

  return (
    <>
      <MainPageRender
        scanQROnClick={handleQRDialogOpen}
        totalBalanceAmount={totalBalance}
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
