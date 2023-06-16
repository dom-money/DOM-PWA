import React from 'react';
import type { NextPage } from 'next';
import { useSnackbar } from 'notistack';

import WalletAddressPageRender from '../../components/WalletAddressPageRender';
import { useSafeStore } from '@/store/SafeStore';

const WalletAddressPage: NextPage = () => {
  const safeAddress = useSafeStore((state) => state.safeAddress);

  const { enqueueSnackbar } = useSnackbar();

  if (!safeAddress) {
    return <WalletAddressPageRender isLoading />;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(safeAddress).then(()=> {
      enqueueSnackbar(
          'Successfully copied wallet address to clipboard',
          {
            variant: 'default',
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'center',
            },
            preventDuplicate: true,
          },
      );
    });
  };

  const handleAddressShare = async () => {
    if (!navigator[ 'canShare' ]) {
      return;
    };
    try {
      await navigator.share({ text: safeAddress });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <WalletAddressPageRender
      address={ safeAddress }
      copyAddressButtonOnClick={ copyToClipboard }
      shareButtonOnClick={ handleAddressShare }
    />
  );
};

export default WalletAddressPage;
