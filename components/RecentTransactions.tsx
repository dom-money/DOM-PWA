import React, { useState } from 'react';
import styled from 'styled-components';

import CollapsibleContainer from './CollapsibleContainer';
import Transaction, { TransactionProps } from './Transaction';

interface RecentTransactionsProps {
  /**
   * Should component display loading skeleton?
   */
  isLoading?: false;
  /**
   * Array of transactions
   */
  transactions: TransactionProps[] | [];
};

interface LoadingProps {
  /**
   * Should component display loading skeleton?
   */
  isLoading: true;
  /**
   * Array of transactions
   */
  transactions?: never;
};

type TransactionPropsWithLoading = LoadingProps | RecentTransactionsProps;

const Divider = styled.hr`
  border-style: solid;
  border-bottom-width: 1px;
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
  margin-top: 0.938rem;
  margin-bottom: 0.938rem;
  border-color: #1F1F1F;;
`;

const FirstTransactionText = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 1rem;
  text-align: center;
  color: #FFFFFF;
`;

const NoRecentTransactions = () => {
  return (
    <FirstTransactionText>Make your first transaction! ✨</FirstTransactionText>
  );
};

const RenderTransactions = ({ transactions }: RecentTransactionsProps) => {
  return (
    <>
      {transactions.map((transaction) =>
        <React.Fragment key={transaction.id}>
          <Divider />
          <Transaction {...transaction} />
        </React.Fragment>,
      )}
    </>
  );
};

const RecentTransactions = ({
  transactions,
  isLoading,
}: TransactionPropsWithLoading) => {
  const [ isContainerCollapsed, setIsContainerCollapsed ] = useState(false);

  const handleCollapseClick = () => {
    setIsContainerCollapsed(!isContainerCollapsed);
  };

  if (isLoading) {
    return (
      <CollapsibleContainer
        label='Recent Transactions'
        isCollapsed={isContainerCollapsed}
        handleCollapseClick={handleCollapseClick}
        primaryContent={
          <Transaction isLoading />
        }
        secondaryContent={
          <>
            <Divider />
            <Transaction isLoading />
            <Divider />
            <Transaction isLoading />
            <Divider />
            <Transaction isLoading />
            <Divider />
            <Transaction isLoading />
          </>
        }
      />
    );
  }

  const isTransactionsPropEmpty = transactions?.length === 0;
  const shouldDisplaySecondaryContent = transactions?.length <= 1;

  return (
    <CollapsibleContainer
      label='Recent Transactions'
      isCollapsed={
        !shouldDisplaySecondaryContent ? isContainerCollapsed : false
      }
      handleCollapseClick={handleCollapseClick}
      primaryContent={
        isTransactionsPropEmpty ?
        <NoRecentTransactions /> :
        <Transaction {...transactions[ 0 ]} />
      }
      secondaryContent={
        shouldDisplaySecondaryContent ?
        undefined :
        <RenderTransactions transactions={transactions.slice(1)} />
      }
    />
  );
};

export default RecentTransactions;
