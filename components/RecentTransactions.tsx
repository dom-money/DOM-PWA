import React, { useState } from 'react';
import styled from 'styled-components';
import { TransitionGroup, Transition } from 'react-transition-group';
import { TransitionStatus } from 'react-transition-group/Transition';

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
  /**
   * Duration of the transition (in ms), defaults to 500ms
   */
  transitionDuration?: number;
};

interface LoadingProps {
  /**
   * Should component display loading skeleton?
   */
  isLoading: true;
  transactions?: never;
  transitionDuration?: never;
};

type Props = LoadingProps | RecentTransactionsProps;

interface FadeOpacityProps {
  status: TransitionStatus;
  transitionDuration: number;
};

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

const opacityFromTransitionStatus = (status: TransitionStatus) => {
  switch (status) {
    case 'entering':
      return `
        position: absolute;
        width: 100%;
        opacity: 0;
      `;
    case 'entered':
      return `
        opacity: 1;
      `;
    case 'exiting':
      return `
        opacity: 0;
      `;
    case 'exited':
      return `
        opacity: 0;
      `;
  }
};

const FadeOpacity = styled.div<FadeOpacityProps>`
  transition: opacity ${(props) => props.transitionDuration}ms ease-in-out;
  ${(props) => opacityFromTransitionStatus(props.status)};
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
  transitionDuration = 500,
}: Props) => {
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
        <div style={{ overflow: 'hidden', position: 'relative' }}>
          <TransitionGroup component={null}>
            <Transition
              key={transactions[ 0 ]?.id ?? 'no-recent-transactions'}
              timeout={transitionDuration}
            >
              {(status) => (
                <FadeOpacity
                  status={status}
                  transitionDuration={transitionDuration}
                >
                  {
                    isTransactionsPropEmpty ?
                    <NoRecentTransactions /> :
                    <Transaction {...transactions[ 0 ]} />
                  }
                </FadeOpacity>
              )}
            </Transition>
          </TransitionGroup>
        </div>
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
