import { useContext } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useAuthContext } from '../context/AuthContext';
import EventListenersContext, {
  EventListenersContextType,
} from '../context/EventListenersContext';
import { SignerType } from './useAuth';
import { TransactionProps } from '../components/Transaction';
import useDebounce from '../hooks/useDebounce';

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

type TransactionsType = TransactionProps[] | [];

type GetTransactionsType = (signer: SignerType) => Promise<TransactionsType>

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

const DOM_CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_DOM_CONTRACT_ADDRESS as string;

const getTransactions: GetTransactionsType = async (signer) => {
  return new Promise(async (resolve, reject) => {
    if (!signer) {
      throw new Error('Signer is not initialized');
    };
    try {
      const walletAddress = (await signer.getAddress()).toLowerCase();
      const txsUsdcRawData = await axios.get('/', {
        baseURL: process.env.NEXT_PUBLIC_ETHERSCAN_BASE_URL,
        params: {
          module: 'account',
          action: 'tokentx',
          contractaddress: process.env.NEXT_PUBLIC_USDC_CONTRACT_ADDRESS,
          address: walletAddress,
          startblock: 0,
          endblock: 99999999,
          page: 1,
          offset: 10,
          sort: 'desc',
        } });
      if (txsUsdcRawData.data.status === '0') {
        reject(new Error(txsUsdcRawData.data.result));
        return;
      }
      if (txsUsdcRawData.data.result.length === 0) {
        resolve([]);
        return;
      };
      const formattedTransactions = txsUsdcRawData.data.result.map(
          (transaction: TransactionResponseType) => {
            if (transaction.from === walletAddress) {
              return {
                id: transaction.hash,
                name: `Transfer to ${transaction.to}`,
                type: 'Transfer',
                timestamp: transaction.timeStamp,
                amount: formatAmount({
                  amount: transaction.value,
                  decimals: transaction.tokenDecimal,
                }),
              };
            };
            if (transaction.to === walletAddress) {
              return {
                id: transaction.hash,
                name: `Deposit from ${transaction.from}`,
                type: 'Crypto Top Up',
                timestamp: transaction.timeStamp,
                amount: formatAmount({
                  amount: transaction.value,
                  decimals: transaction.tokenDecimal,
                }),
              };
            };
            if (transaction.to === DOM_CONTRACT_ADDRESS) {
              return {
                id: transaction.hash,
                name: `Wallet to Wealth`,
                type: 'Invest',
                timestamp: transaction.timeStamp,
                amount: formatAmount({
                  amount: transaction.value,
                  decimals: transaction.tokenDecimal,
                }),
              };
            };
            if (transaction.from === DOM_CONTRACT_ADDRESS) {
              return {
                id: transaction.hash,
                name: `Wealth to Wallet`,
                type: 'Withdraw',
                timestamp: transaction.timeStamp,
                amount: formatAmount({
                  amount: transaction.value,
                  decimals: transaction.tokenDecimal,
                }),
              };
            }
          });
      // Removing undefined values from Transactions Array
      const filteredTransactions = formattedTransactions.filter(
          (transaction: TransactionResponseType) => transaction !== undefined,
      );
      resolve(filteredTransactions);
    } catch (error) {
      reject(error);
    };
  });
};

const useTransactions = () => {
  const { signer } = useAuthContext();

  const {
    walletEvent,
  } = useContext(EventListenersContext) as EventListenersContextType;

  const debouncedWalletEvent = useDebounce(walletEvent, 15000);

  return useQuery(
      [ 'transactions', debouncedWalletEvent ],
      () => getTransactions(signer),
      {
        // The query will not execute until the signer is initialized
        enabled: !!signer,
        // New data on key change will be swapped without Loading state
        keepPreviousData: true,
      },
  );
};

export default useTransactions;
