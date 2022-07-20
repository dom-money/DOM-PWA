import React from 'react';
import styled from 'styled-components';

import Header from './Header';
import TotalBalance from './TotalBalance';
import Wallet from './Wallet';
// import Wealth from './Wealth';

interface MainPageRenderProps {
  /**
   * Total Balance amount
   */
  totalBalanceAmount: number;
  /**
   * Wallet Balance amount
   */
  walletAmount: number;
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
  padding: 0 0.313rem;
`;

const HeaderWithMargin = styled(Header)`
  margin: 1.625rem 0.625rem 0;
`;

const MainPageRender = ({
  totalBalanceAmount,
  walletAmount,
  userName,
  avatarImageURL,
  isNotificationPresent = false,
}: MainPageRenderProps) => {
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
    </Wrapper>
  );
};

export default MainPageRender;
