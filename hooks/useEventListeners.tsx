import { useState, useEffect, useCallback } from 'react';
import { useSnackbar } from 'notistack';
import { ethers } from 'ethers';
import abi from '../utils/DepositManager-ABI.json';
import genericErc20Abi from '../utils/Erc20.json';
import useWalletAddress from './useWalletAddress';
import { CONTRACT_ADDRESS } from './useContract';
import { TOKEN_USDC_CONTRACT_ADDRESS } from './useWalletBalance';

type EthersProviderType = ethers.providers.Web3Provider | null;
type EventData = object | null;

const useEventListeners = (ethersProvider: EthersProviderType) => {
  const [
    depositToWealthEventData,
    setDepositToWealthEventData,
  ] = useState<EventData>(null);

  const [
    withdrawFromWealthEventData,
    setWithdrawFromWealthEventData,
  ] = useState<EventData>(null);

  const [
    depositToWalletEventData,
    setDepositToWalletEventData,
  ] = useState<EventData>(null);

  const [
    sentFromWalletEventData,
    setSentFromWalletEventData,
  ] = useState<EventData>(null);

  const [ walletAddress ] = useWalletAddress();

  const { enqueueSnackbar } = useSnackbar();

  // 'Deposit to Wealth Wallet' Event Listener Function
  const depositToWealthEventListener = useCallback(
      (tokenId, apy, depositAmount, event) => {
        const depositAmountAsAString = ethers.utils.formatEther(depositAmount);
        const notificationMessage = `
          Deposit of $${depositAmountAsAString} 
          to your Wealth Wallet was successful!
        `;
        enqueueSnackbar(notificationMessage, { variant: 'success' },
        );
        setDepositToWealthEventData(event);
        console.log('Deposit to Wealth Wallet event:', event);
      }, [],
  );

  // 'Withdraw from Wealth Wallet' Event Listener Function
  const withdrawFromWealthEventListener = useCallback(
      (tokenId, owner, withdrawnAmount, remainingAmount, event) => {
        const withdrawnAmountAsAString =
          ethers.utils.formatEther(withdrawnAmount);
        const notificationMessage = `
          Withdrawal of $${withdrawnAmountAsAString} 
          from your Wealth Wallet was successful!
        `;
        enqueueSnackbar(notificationMessage, { variant: 'success' },
        );
        setWithdrawFromWealthEventData(event);
        console.log('Withdrawal from Wealth Wallet event:', event);
      }, [],
  );

  // 'Deposit to Wallet' Event Listener Function
  const depositToWalletEventListener = useCallback(
      (from, to, depositAmount, event) => {
        const depositAmountAsAString =
          ethers.utils.formatUnits(depositAmount, 6);
        const notificationMessage = `
          Deposit of $${depositAmountAsAString} 
          to your Wallet was successful!
        `;
        enqueueSnackbar(notificationMessage, { variant: 'success' },
        );
        setDepositToWalletEventData(event);
        console.log('Deposit to Wallet event:', event);
      }, [],
  );

  // 'Sent From Wallet' Event Listener Function
  const sentFromWalletEventListener = useCallback(
      (from, to, amount, event) => {
        const amountAsAString = ethers.utils.formatUnits(amount, 6);
        const notificationMessage = `
          Successfully sent $${amountAsAString} 
          from your Wallet to ${to}!
        `;
        enqueueSnackbar(notificationMessage, { variant: 'success' },
        );
        setSentFromWalletEventData(event);
        console.log('Sent from Wallet event:', event);
      }, [],
  );

  // Subscription to 'Deposit to Wealth Wallet' and
  // 'Withdraw from Wealth Wallet' Events
  useEffect(() => {
    if (!ethersProvider) {
      return;
    };

    const contractWithProvider = new ethers.Contract(
        CONTRACT_ADDRESS,
        abi,
        ethersProvider,
    );
    // eslint-disable-next-line new-cap
    const filterDepositByAddress = contractWithProvider.filters.Deposit(
        null,
        walletAddress,
    );
    // eslint-disable-next-line new-cap
    const filterWithdrawByAddress = contractWithProvider.filters.Withdraw(
        null,
        walletAddress,
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
  }, [ ethersProvider ]);

  // Subscription to 'Deposit to Wallet' and 'Send From Wallet' Events
  useEffect(() => {
    if (!ethersProvider || !walletAddress) {
      return;
    };

    const contractUSDCWithProvider = new ethers.Contract(
        TOKEN_USDC_CONTRACT_ADDRESS,
        genericErc20Abi,
        ethersProvider,
    );

    // eslint-disable-next-line new-cap
    const filterTo = contractUSDCWithProvider.filters.Transfer(
        null,
        walletAddress,
    );
    // eslint-disable-next-line new-cap
    const filterFrom = contractUSDCWithProvider.filters.Transfer(
        walletAddress,
        null,
    );
    contractUSDCWithProvider.on(filterTo, depositToWalletEventListener);
    contractUSDCWithProvider.on(filterFrom, sentFromWalletEventListener);
    return () => {
      contractUSDCWithProvider.off(filterTo, depositToWalletEventListener);
      contractUSDCWithProvider.off(filterFrom, sentFromWalletEventListener);
    };
  }, [ ethersProvider, walletAddress ]);

  return {
    depositToWealthEventData,
    withdrawFromWealthEventData,
    depositToWalletEventData,
    sentFromWalletEventData,
  };
};

export default useEventListeners;
