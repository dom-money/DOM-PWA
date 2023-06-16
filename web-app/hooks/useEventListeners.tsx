import { useState, useEffect, useCallback } from 'react';
import { useSnackbar } from 'notistack';
import { ethers } from 'ethers';
import abi from '../utils/DepositManager-ABI.json';
import genericErc20Abi from '../utils/Erc20.json';
import useWalletAddress from './useWalletAddress';
import { useAuthContext } from '../context/AuthContext';
import {
  DOM_CONTRACT_ADDRESS,
  PAYMENT_TOKEN_CONTRACT_ADDRESS,
} from '@/constants';

type EventData = object | null;

const useEventListeners = () => {
  const [ walletEvent, setWalletEvent ] = useState<EventData>(null);
  const [ wealthEvent, setWealthEvent ] = useState<EventData>(null);

  const { provider } = useAuthContext();

  const walletAddress = useWalletAddress();

  const { enqueueSnackbar } = useSnackbar();

  // 'Deposit to Wealth Wallet' Event Listener Function
  const depositToWealthEventListener = useCallback(
      (
          tokenId: ethers.BigNumber,
          owner: string,
          depositAmount: ethers.BigNumber,
          event: EventData,
      ) => {
        const depositAmountAsAString = ethers.utils.formatEther(depositAmount);
        const notificationMessage = `
          Deposit of $${depositAmountAsAString} 
          to your Wealth Wallet was successful!
        `;
        enqueueSnackbar(notificationMessage, { variant: 'success' },
        );
        setWealthEvent(event);
        console.log('Deposit to Wealth Wallet event:', event);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [],
  );

  // 'Withdraw from Wealth Wallet' Event Listener Function
  const withdrawFromWealthEventListener = useCallback(
      (
          tokenId: ethers.BigNumber,
          owner: string,
          withdrawnAmount: ethers.BigNumber,
          remainingAmount: ethers.BigNumber,
          event: EventData,
      ) => {
        const withdrawnAmountAsAString =
          ethers.utils.formatEther(withdrawnAmount);
        const notificationMessage = `
          Withdrawal of $${withdrawnAmountAsAString} 
          from your Wealth Wallet was successful!
        `;
        enqueueSnackbar(notificationMessage, { variant: 'success' },
        );
        setWealthEvent(event);
        console.log('Withdrawal from Wealth Wallet event:', event);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [],
  );

  // 'Deposit to Wallet' Event Listener Function
  const depositToWalletEventListener = useCallback(
      (
          from: string,
          to: string,
          depositAmount: ethers.BigNumber,
          event: EventData,
      ) => {
        const depositAmountAsAString =
          ethers.utils.formatUnits(depositAmount, 6);
        const notificationMessage = `
          Deposit of $${depositAmountAsAString} 
          to your Wallet was successful!
        `;
        enqueueSnackbar(notificationMessage, { variant: 'success' },
        );
        setWalletEvent(event);
        console.log('Deposit to Wallet event:', event);
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [],
  );

  // 'Sent From Wallet' Event Listener Function
  const sentFromWalletEventListener = useCallback(
      (
          from: string,
          to: string,
          amount: ethers.BigNumber,
          event: EventData,
      ) => {
        const amountAsAString = ethers.utils.formatUnits(amount, 6);
        const notificationMessage = `
          Successfully sent $${amountAsAString} 
          from your Wallet to ${to}!
        `;
        enqueueSnackbar(notificationMessage, { variant: 'success' },
        );
        setWalletEvent(event);
        console.log('Sent from Wallet event:', event);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [],
  );

  // Subscription to 'Deposit to Wealth Wallet' and
  // 'Withdraw from Wealth Wallet' Events
  useEffect(() => {
    if (!provider || walletAddress.isLoading || walletAddress.isError) {
      return;
    };

    const contractWithProvider = new ethers.Contract(
        DOM_CONTRACT_ADDRESS,
        abi,
        provider,
    );
    // eslint-disable-next-line new-cap
    const filterDepositByAddress = contractWithProvider.filters.Deposit(
        null,
        walletAddress.data.walletAddress,
    );
    // eslint-disable-next-line new-cap
    const filterWithdrawByAddress = contractWithProvider.filters.Withdraw(
        null,
        walletAddress.data.walletAddress,
    );
    contractWithProvider.on(
        filterDepositByAddress,
        depositToWealthEventListener,
    );
    contractWithProvider.on(
        filterWithdrawByAddress,
        withdrawFromWealthEventListener,
    );
    return () => {
      contractWithProvider.off(
          filterDepositByAddress,
          depositToWealthEventListener,
      );
      contractWithProvider.off(
          filterWithdrawByAddress,
          withdrawFromWealthEventListener,
      );
    };
  }, [
    provider,
    walletAddress.isLoading,
    walletAddress.isError,
    walletAddress.data,
    depositToWealthEventListener,
    withdrawFromWealthEventListener,
  ]);

  // Subscription to 'Deposit to Wallet' and 'Send From Wallet' Events
  useEffect(() => {
    if (!provider || walletAddress.isLoading || walletAddress.isError) {
      return;
    };

    const contractUSDCWithProvider = new ethers.Contract(
        PAYMENT_TOKEN_CONTRACT_ADDRESS,
        genericErc20Abi,
        provider,
    );

    // eslint-disable-next-line new-cap
    const filterTo = contractUSDCWithProvider.filters.Transfer(
        null,
        walletAddress.data.walletAddress,
    );
    // eslint-disable-next-line new-cap
    const filterFrom = contractUSDCWithProvider.filters.Transfer(
        walletAddress.data.walletAddress,
        null,
    );
    contractUSDCWithProvider.on(filterTo, depositToWalletEventListener);
    contractUSDCWithProvider.on(filterFrom, sentFromWalletEventListener);
    return () => {
      contractUSDCWithProvider.off(filterTo, depositToWalletEventListener);
      contractUSDCWithProvider.off(filterFrom, sentFromWalletEventListener);
    };
  }, [
    provider,
    walletAddress.isLoading,
    walletAddress.isError,
    walletAddress.data,
    depositToWalletEventListener,
    sentFromWalletEventListener,
  ]);

  return { walletEvent, wealthEvent };
};

export default useEventListeners;
