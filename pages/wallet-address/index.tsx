import React from 'react';
import type { NextPage } from 'next';
import { useSnackbar } from 'notistack';

import WalletAddressPageRender from '../../components/WalletAddressPageRender';

import useWalletAddress from '../../hooks/useWalletAddress';

const WalletAddressPage: NextPage = () => {
  const walletAddress = useWalletAddress();

  const { enqueueSnackbar } = useSnackbar();

  if (walletAddress.isLoading || walletAddress.isError) {
    return <WalletAddressPageRender isLoading />;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress.data.walletAddress).then(()=> {
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
      await navigator.share({ text: walletAddress.data.walletAddress });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <WalletAddressPageRender
      address={walletAddress.data.walletAddress}
      copyAddressButtonOnClick={copyToClipboard}
      shareButtonOnClick={handleAddressShare}
    />
  );
};

export default WalletAddressPage;
