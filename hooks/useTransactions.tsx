import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { TransactionProps } from '../components/Transaction';
import AuthContext, { AuthContextType } from '../context/AuthContext';

type ErrorMessageType = string | null;
type TransactionsType = TransactionProps[] | [] | null;

type useTransactionsType = () => [
  transactions: TransactionsType,
  errorMessage: ErrorMessageType,
];

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

const useTransactions: useTransactionsType = () => {
  const [ transactions, setTransactions ] = useState<TransactionsType>(null);
  const [ errorMessage, setErrorMessage ] = useState<ErrorMessageType>(null);

  const { signer } = useContext(AuthContext) as AuthContextType;

  useEffect(() => {
    if (!signer) {
      return;
    };

    const getTransactions = async () => {
      try {
        const walletAddress = (await signer.getAddress()).toLowerCase();
        console.log(walletAddress);
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
            apikey: process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY,
          } });
        if (txsUsdcRawData.data.result.length === 0) {
          setTransactions([]);
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
            });
        setTransactions(formattedTransactions);
      } catch (error) {
        if (!(error instanceof Error)) {
          setErrorMessage('Unexpected error');
          return;
        };
        setErrorMessage(error.message);
      }
    };

    getTransactions();
  }, [ signer ]);

  return [ transactions, errorMessage ];
};

export default useTransactions;
