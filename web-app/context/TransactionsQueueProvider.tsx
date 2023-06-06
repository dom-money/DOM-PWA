import React from 'react';
import useQueue from '../hooks/useQueue';
import TransactionsQueueContext from './TransactionsQueueContext';

interface Props {
  children: React.ReactNode;
};

const TransactionsQueueProvider = ({ children }: Props) => {
  // 1 allowed request in 5 seconds
  const { ...queueArgs } = useQueue({ maxCalls: 1, timeWindow: 5000 });

  return (
    <TransactionsQueueContext.Provider value={{ ...queueArgs }}>
      { children }
    </TransactionsQueueContext.Provider>
  );
};

export default TransactionsQueueProvider;
