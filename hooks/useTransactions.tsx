import { useState, useCallback } from 'react';
import axios from 'axios';
import { useInfiniteQuery, InfiniteData } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';
import { useAuthContext } from '../context/AuthContext';
import { useEventListenersContext } from '../context/EventListenersContext';
import { SignerType } from './useAuth';
import { TransactionProps } from '../components/Transaction';
import useDebounce from '../hooks/useDebounce';
import { useTransactionsQueue } from '../context/TransactionsQueueContext';

const DISPLAY_PER_PAGE = 10;
const TRANSACTIONS_PER_REQUEST = 50;
const LOADING_FROM_FETCHED_DELAY = 1000; // ms
const DEBOUNCE_DELAY = 20000; // ms

interface TransactionResponseType {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  nonce: string;
  blockHash: string;
  from: string;
  contractAddress: string;
  to: string;
  value: string;
  tokenName: string;
  tokenSymbol: string;
  tokenDecimal: string;
  transactionIndex: string;
  gas: string;
  gasPrice: string;
  gasUsed: string;
  cumulativeGasUsed: string;
  input: string;
  confirmations: string;
};

export type TransactionsType = {
  transactions: TransactionProps[] | [];
  page: number,
  nextCursor?: number;
};

type GetTransactionsType = (
  signer: SignerType,
  transactionsQueue: ReturnType<typeof useTransactionsQueue>,
  pageParam: number,
  offset?: number,
) => Promise<TransactionsType>

interface FormatAmountArgs {
  amount: string;
  decimals: string;
}

const formatAmount = ({ amount, decimals }: FormatAmountArgs) => {
  const decimalsAsNumber = parseInt(decimals);
  const decimalIndex = amount.length - decimalsAsNumber;
  const amountWithSeparatedDecimals = `${
    amount.slice(0, decimalIndex)
  }.${
    amount.slice(decimalIndex)
  }`;
  return amountWithSeparatedDecimals;
};

const fetchTransactions = async (
    walletAddress: string,
    pageParam: number,
) => {
  return await axios.get('/', {
    baseURL: process.env.NEXT_PUBLIC_ETHERSCAN_BASE_URL,
    params: {
      module: 'account',
      action: 'tokentx',
      contractaddress: process.env.NEXT_PUBLIC_USDC_CONTRACT_ADDRESS,
      address: walletAddress,
      startblock: 0,
      endblock: 9999999999,
      page: pageParam,
      offset: TRANSACTIONS_PER_REQUEST,
      sort: 'desc',
    } });
};

const DOM_CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_DOM_CONTRACT_ADDRESS as string;

const getTransactions: GetTransactionsType = async (
    signer,
    transactionsQueue,
    pageParam,
) => {
  return new Promise(async (resolve, reject) => {
    if (!signer) {
      throw new Error('Signer is not initialized');
    };
    try {
      const walletAddress = (await signer.getAddress()).toLowerCase();

      // Adding an API request to the queue, to ensure ...
      // .. a minimum 5 second delay between requests
      const requestId = uuidv4();
      const txsUsdcRawData = await transactionsQueue.push(
          () => fetchTransactions(walletAddress, pageParam),
          requestId,
      );
      const { status, message } = txsUsdcRawData.data;
      if (status === '0' && message !== 'No transactions found') {
        reject(new Error(txsUsdcRawData.data.result));
        return;
      };
      if (txsUsdcRawData.data.result.length === 0) {
        resolve({
          transactions: [],
          page: pageParam,
          nextCursor: undefined,
        });
        return;
      };
      let nextCursor: number | undefined;
      if (txsUsdcRawData.data.result.length === TRANSACTIONS_PER_REQUEST) {
        nextCursor = pageParam + 1;
      };
      const formattedTransactions = txsUsdcRawData.data.result.map(
          (transaction: TransactionResponseType) => {
            const id = transaction.hash;
            // Converting to number type and milliseconds
            const timestamp = parseInt(transaction.timeStamp) * 1000;
            const amount = formatAmount({
              amount: transaction.value,
              decimals: transaction.tokenDecimal,
            });
            const formattedTransaction = {
              id,
              timestamp,
              amount,
            };
            if (transaction.from === walletAddress) {
              return {
                ...formattedTransaction,
                name: `Transfer to ${transaction.to}`,
                type: 'Transfer',
              };
            };
            if (transaction.to === walletAddress) {
              return {
                ...formattedTransaction,
                name: `Deposit from ${transaction.from}`,
                type: 'Crypto Top Up',
              };
            };
            if (transaction.to === DOM_CONTRACT_ADDRESS) {
              return {
                ...formattedTransaction,
                name: `Wallet to Wealth`,
                type: 'Invest',
              };
            };
            if (transaction.from === DOM_CONTRACT_ADDRESS) {
              return {
                ...formattedTransaction,
                name: `Wealth to Wallet`,
                type: 'Withdraw',
              };
            }
          });
      // Removing undefined values from Transactions Array
      const filteredTransactions = formattedTransactions.filter(
          (transaction: TransactionResponseType) => transaction !== undefined,
      );
      resolve({
        transactions: filteredTransactions,
        page: pageParam,
        nextCursor,
      });
    } catch (error) {
      reject(error);
    };
  });
};

type FormatFetchedTxsType = (
  transactionsData: InfiniteData<TransactionsType>
  ) => TransactionProps[] | [];

type UseTransactionsReturnType =
  // Loading
  | {
    formattedData: undefined;
    handleLoadMoreTransactions: undefined;
    isLoading: true;
    isError: false;
    isLoadingMore: boolean;
  }
  // Error
  | {
    formattedData: undefined;
    handleLoadMoreTransactions: undefined;
    isLoading: false;
    isError: true;
    isLoadingMore: boolean;
  }
  // Success
  | {
    formattedData: TransactionProps[] | [];
    handleLoadMoreTransactions: () => void;
    isLoading: false;
    isError: false;
    isLoadingMore: boolean;
  };

const useTransactions = (): UseTransactionsReturnType => {
  const { signer } = useAuthContext();
  const { walletEvent } = useEventListenersContext();
  const transactionsQueue = useTransactionsQueue();

  const [
    numberOfDisplayedTxs,
    setNumberOfDisplayedTxs,
  ] = useState(DISPLAY_PER_PAGE);
  const [
    isLoadingMoreFromFetched,
    setIsLoadingMoreFromFetched,
  ] = useState(false);

  const debouncedWalletEvent = useDebounce(walletEvent, DEBOUNCE_DELAY);

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
      [ 'transactions', debouncedWalletEvent ],
      // eslint-disable-next-line max-len
      ({ pageParam = 1 }) => getTransactions(signer, transactionsQueue, pageParam),
      {
        // The query will not execute until the signer is initialized
        enabled: !!signer,
        // New data on key change will be swapped without Loading state
        keepPreviousData: true,
        getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
      },
  );

  // Formatting data received from react-query to a flat array of transactions
  const formatFetchedTxs: FormatFetchedTxsType = useCallback(
      (fetchedTransactionsData) => {
        const arrayWithTransactionArrays = fetchedTransactionsData.pages.map(
            (transactionsDataPerPage) => transactionsDataPerPage.transactions,
        );
        return arrayWithTransactionArrays.flat();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [ data ]);

  // Calculating number of transactions to be displayed on the page
  const calculateNumberOfNextTxs = useCallback(
      (transactionsFetchedData: InfiniteData<TransactionsType>) => {
        const formattedTransactions = formatFetchedTxs(transactionsFetchedData);

        // If there are not enough transactions to match the desired amount ...
        // .. per page - returning the number of remaining ...
        // .. (not yet displayed) transactions
        if (
          numberOfDisplayedTxs + DISPLAY_PER_PAGE > formattedTransactions.length
        ) {
          return formattedTransactions.length - numberOfDisplayedTxs;
        } else {
          return DISPLAY_PER_PAGE;
        };
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [ data ]);

  // 'Load More' handler
  const handleLoadMoreTransactions = useCallback(() => {
    // Returning if the initial data isn't available yet
    if (!data) return;

    // Formatting fetched transactions to have a flat array ...
    // .. of transaction objects
    const formattedTransactions = formatFetchedTxs(data);

    // If all fetched transactions are displayed ...
    // .. and there are no more pages to fetch
    if (
      numberOfDisplayedTxs === formattedTransactions.length &&
      !hasNextPage
    ) return;

    // If there are fetched transaction which are not yet being displayed
    if (formattedTransactions.length > numberOfDisplayedTxs) {
      setIsLoadingMoreFromFetched(true);

      // Calculating number of transaction to be added for display
      const numberOfNextTxs = calculateNumberOfNextTxs(data);

      // Adding more transactions for display ...
      // .. from already fetched data, with delay
      setTimeout(
          () => {
            setNumberOfDisplayedTxs(
                (currentNumberOfTxs) => currentNumberOfTxs + numberOfNextTxs,
            );
            setIsLoadingMoreFromFetched(false);
          },
          LOADING_FROM_FETCHED_DELAY,
      );
    };

    // If there are more transactions to fetch
    if (numberOfDisplayedTxs === formattedTransactions.length) {
    // Fetching next page
      fetchNextPage().then(({ data: freshData }) => {
        if (!freshData) return;

        const numberOfNextTxs = calculateNumberOfNextTxs(freshData);

        setNumberOfDisplayedTxs(
            (currentNumberOfTxs) => currentNumberOfTxs + numberOfNextTxs,
        );
      });
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ data, hasNextPage, numberOfDisplayedTxs ]);

  const isLoadingMore = isLoadingMoreFromFetched || isFetchingNextPage;

  if (isLoading) {
    return {
      formattedData: undefined,
      handleLoadMoreTransactions: undefined,
      isLoading: isLoading,
      isError: isError,
      isLoadingMore,
    };
  };

  if (isError) {
    return {
      formattedData: undefined,
      handleLoadMoreTransactions: undefined,
      isLoading: isLoading,
      isError: isError,
      isLoadingMore,
    };
  };

  const formattedTransactions = formatFetchedTxs(data);

  const transactionsToDisplay: TransactionProps[] | [] =
    formattedTransactions.slice(0, numberOfDisplayedTxs);

  return {
    formattedData: transactionsToDisplay,
    handleLoadMoreTransactions,
    isLoading,
    isError,
    isLoadingMore,
  };
};

export default useTransactions;
