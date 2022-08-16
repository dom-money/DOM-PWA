import React from 'react';
import type { NextPage } from 'next';

import WalletAddressPageRender from '../../components/WalletAddressPageRender';

import useWalletAddress from '../../hooks/useWalletAddress';
import useWalletBalance from '../../hooks/useWalletBalance';

const WalletAddressPage: NextPage = () => {
  const [
    walletAddress,
    isWalletAddressLoading,
    hasWalletAddressError,
  ] = useWalletAddress();

  const [ balance, , isBalanceLoading, hasBalanceError ] = useWalletBalance();

  if (isWalletAddressLoading ||
    hasWalletAddressError ||
    !walletAddress ||
    isBalanceLoading ||
    hasBalanceError) {
    return null;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress).then(()=> {
      alert('Successfully copied wallet address to clipboard');
    });
  };

  const handleAddressShare = async () => {
    if (!navigator[ 'canShare' ]) {
      return;
    };
    try {
      await navigator.share({ text: walletAddress });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <WalletAddressPageRender
      totalAmount={balance}
      address={walletAddress}
      copyAddressButtonOnClick={copyToClipboard}
      shareButtonOnClick={handleAddressShare}
    />
  );
};

export default WalletAddressPage;
