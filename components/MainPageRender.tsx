import React from 'react';
import styled from 'styled-components';

import Header from './Header';
import InvestButton from './InvestButton';
import TotalBalance from './TotalBalance';
import Wallet from './Wallet';
import Wealth from './Wealth';

interface MainPageRenderProps {
  /**
   * Wallet Balance amount
   */
  walletAmount: number;
  /**
   * Wealth Balance amount
   */
  wealthAmount: number;
  /**
   * Yield value
   */
  yieldValue?: number;
  /**
   * Yield percentage
   */
  yieldValuePercentage?: number;
  /**
   * Average Annual percentage yield value
   */
  averageAPY?: number;
  /**
   * User's name
   */
  userName: string;
  /**
   * URL to Avatar Image
   */
  avatarImageURL?: string;
  /**
   * Is there a notification present?
   */
  isNotificationPresent?: boolean;
}

const Wrapper = styled.div`
  padding: 1.625rem 0.313rem 9.25rem;
`;

const HeaderWithMargin = styled(Header)`
  margin: 0 0.625rem;
`;

const MainPageRender = ({
  walletAmount,
  wealthAmount = 0,
  yieldValue = 0,
  yieldValuePercentage = 0,
  averageAPY = 0,
  userName,
  avatarImageURL,
  isNotificationPresent = false,
}: MainPageRenderProps) => {
  const totalBalanceAmount = walletAmount + wealthAmount;
  return (
    <Wrapper>
      <HeaderWithMargin
        avatarImageURL={avatarImageURL}
        isNotificationPresent={isNotificationPresent}
        userName={userName}
      />
      <TotalBalance
        amount={totalBalanceAmount}
      />
      <Wallet amount={walletAmount}/>
      <Wealth
        amount={wealthAmount}
        yieldValue={yieldValue}
        yieldValuePercentage={yieldValuePercentage}
        averageAPY={averageAPY}
      />
      <InvestButton href='/invest'/>
    </Wrapper>
  );
};

export default MainPageRender;
