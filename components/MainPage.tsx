import React from 'react';
import styled from 'styled-components';

import Header from './Header';
import TotalBalance from './TotalBalance';
import Wallet from './Wallet';
import Wealth from './Wealth';

interface MainPageProps {
  /**
   * Total Balance amount
   */
  totalBalanceAmount: number;
  /**
   * Wallet Balance amount
   */
  walletAmount: number;
  /**
   * Wallet Balance amount
   */
  walletInactive: boolean;
  /**
   * URL to Avatar Image
   */
  avatarImageURL: string;
   /**
    * Is there a notification present?
    */
  notification?: boolean;
}

const Wrapper = styled.div`
  padding: 0 0.313rem;
`;

const HeaderWithMargin = styled(Header)`
  margin: 2.688rem 0.625rem 0;
`;

const MainPage = ({
  totalBalanceAmount,
  walletAmount,
  walletInactive,
  avatarImageURL,
  notification,
}: MainPageProps) => {
  return (
    <Wrapper>
      <HeaderWithMargin
        avatarImageURL={avatarImageURL}
        notification={notification}
      />
      <TotalBalance
        amount={totalBalanceAmount}
      />
      <Wallet amount={walletAmount} inactive={walletInactive}/>
    </Wrapper>
  );
};

export default MainPage;
