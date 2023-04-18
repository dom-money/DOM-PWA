import React from 'react';
import styled from 'styled-components';

import Title from './Title';
import AmountDisplay from './AmountDisplay';

interface TotalBalanceProps {
  /**
   * Should component display loading skeleton?
   */
  isLoading?: false;
  /**
   * Currency amount
   */
  amount: string;
  /**
   * Should title be 'Available Balance'?
   */
  asAvailableBalance?: boolean;
};

interface LoadingProps {
  /**
   * Should component display loading skeleton?
   */
  isLoading: true;
  /**
   * Should title be 'Available Balance'?
   */
  asAvailableBalance?: boolean;
  amount?: never;
};

type Props = LoadingProps | TotalBalanceProps;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleWithMargin = styled(Title)`
  margin-bottom: 1.188rem;
  margin-top: 1.875rem;
`;

const AmountDisplayWithMargin = styled(AmountDisplay)`
  margin-bottom: 2.875rem;
`;

const TotalBalance = ({ amount, asAvailableBalance, isLoading }: Props) => {
  return (
    <Wrapper>
      <TitleWithMargin text={
        asAvailableBalance ? 'Available Balance' : 'Total Balance'
      }/>
      {
        isLoading ?
        <AmountDisplayWithMargin isLoading size='medium'/> :
        <AmountDisplayWithMargin amount={ amount } size='medium' />
      }
    </Wrapper>
  );
};

export default TotalBalance;
