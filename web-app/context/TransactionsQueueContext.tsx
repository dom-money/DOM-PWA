import { createContext, useContext } from 'react';
import useQueue from '../hooks/useQueue';

export type TransactionsQueueContextType = ReturnType<typeof useQueue>;

const TransactionsQueueContext = createContext(
  {} as TransactionsQueueContextType,
);

export default TransactionsQueueContext;

export const useTransactionsQueue = () => {
  return useContext(TransactionsQueueContext);
};
