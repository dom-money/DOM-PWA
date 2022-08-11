import { useState, useEffect, useCallback } from 'react';
import { useSnackbar } from 'notistack';
import { ethers } from 'ethers';
import abi from '../utils/DepositManager-ABI.json';

type EthersProviderType = ethers.providers.Web3Provider | null;
type DepositEventListeners = ethers.providers.Listener[] | null;

const CONTRACT_ADDRESS = '0x44Cb030F4E9dbDd869abb0CbF19717974B167e13';

const useEventListeners = (ethersProvider: EthersProviderType) => {
  const [
    depositEventListeners,
    setDepositEventListeners,
  ] = useState<DepositEventListeners>(null);

  const { enqueueSnackbar } = useSnackbar();

  const depositEventListener = useCallback((...args) => {
    const depositAmountAsAString = ethers.utils.formatEther(args[ 2 ]);
    const notificationMessage = `
      Deposit of $${depositAmountAsAString} 
      to your Wealth Wallet was successful!
    `;
    enqueueSnackbar(notificationMessage, { variant: 'success' },
    );
    console.log('Deposit event:', ...args);
  }, []);

  useEffect(() => {
    if (!ethersProvider) {
      return;
    };
    const contractWithProvider = new ethers.Contract(
        CONTRACT_ADDRESS,
        abi,
        ethersProvider,
    );
    contractWithProvider.on('Deposit', depositEventListener);
    setDepositEventListeners(contractWithProvider.listeners('Deposit'));
    return () => {
      contractWithProvider.off('Deposit', depositEventListener);
    };
  }, [ ethersProvider ]);

  return { depositEventListeners };
};

export default useEventListeners;
