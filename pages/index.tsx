import React from 'react';
import type { NextPage } from 'next';

import MainPageRender from '../components/MainPageRender';
import AddressQRReader from '../components/AddressQRReader';

import { useAuthContext } from '../context/AuthContext';
import useWalletBalance from '../hooks/useWalletBalance';
import useWealthBalance from '../hooks/useWealthBalance';
import useTransactions from '../hooks/useTransactions';
import useQRAddressReader from '../hooks/useQRAddressReader';
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
        walletAmount={walletBalance.data.balanceAsString}
        wealthAmount={wealthBalance.data.balanceAsString}
        averageAPY={wealthBalance.data.apy}
        transactions={transactions.formattedData}
        isLoadingMoreTransactions={transactions.isLoadingMore}
        onLoadMoreTransactions={transactions.handleLoadMoreTransactions}
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
