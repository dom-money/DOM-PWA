import React from 'react';
import styled from 'styled-components';

import Title from './Title';
import AmountDisplay from './AmountDisplay';

interface TotalBalanceProps {
  /**
   * Currency amount
   */
  amount: number;
  /**
   * Should title be 'Available Balance'?
   */
  asAvailableBalance?: boolean;
};

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

const TotalBalance = ({ amount, asAvailableBalance }: TotalBalanceProps) => {
  return (
    <Wrapper>
      <TitleWithMargin text={
        asAvailableBalance ? 'Available Balance' : 'Total Balance'
      }/>
      <AmountDisplayWithMargin
        amount={amount}
        size='medium'
      />
    </Wrapper>
  );
};

export default TotalBalance;
