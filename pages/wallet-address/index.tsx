import React from 'react';
import type { NextPage } from 'next';
import { useSnackbar } from 'notistack';

import WalletAddressPageRender from '../../components/WalletAddressPageRender';

import useWalletAddress from '../../hooks/useWalletAddress';

const WalletAddressPage: NextPage = () => {
  const { data: walletAddress, isLoading, isError } = useWalletAddress();

  const { enqueueSnackbar } = useSnackbar();

  if (isLoading || isError) {
    return <WalletAddressPageRender isLoading />;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress.walletAddress).then(()=> {
      enqueueSnackbar(
          'Successfully copied wallet address to clipboard',
          {
            variant: 'default',
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'center',
            },
          },
      );
    });
  };

  const handleAddressShare = async () => {
    if (!navigator[ 'canShare' ]) {
      return;
    };
    try {
      await navigator.share({ text: walletAddress.walletAddress });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <WalletAddressPageRender
      address={walletAddress.walletAddress}
      copyAddressButtonOnClick={copyToClipboard}
      shareButtonOnClick={handleAddressShare}
    />
  );
};

export default WalletAddressPage;
