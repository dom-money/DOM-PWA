import React from 'react';
import styled from 'styled-components';

import HeaderGoBack from './HeaderGoBack';
import TotalBalance from './TotalBalance';
import Button from './Button';
import GenericContainer from './GenericContainer';

interface MainProps {
  /**
   * Should component display loading skeleton?
   */
  isLoading?: false;
  /**
   * Available Balance Amount
   */
  availableBalance: string;
  /**
   * Order ID
   */
  orderId: string;
};

interface LoadingProps {
  /**
   * Should component display loading skeleton?
   */
  isLoading: true;
  orderId?: never;
  availableBalance?: never;
};

type Props = MainProps | LoadingProps;

const Wrapper = styled.div`
  padding: 1.625rem 0.313rem;
`;

const HeaderWithMargin = styled(HeaderGoBack)`
  margin: 0 2.25rem 0;
`;

const ButtonWithMargin = styled(Button)`
  width: auto;
  padding-inline: 8rem;
  margin: auto;
  margin-top: 1rem;
`;

const OrderPageRender = ({
  availableBalance,
  orderId,
  isLoading,
}: Props) => {
  if (isLoading) return null;

  return (
    <Wrapper>
      <HeaderWithMargin
        href={ '/' }
      />
      <TotalBalance
        amount={ availableBalance }
        asAvailableBalance
      />
      <GenericContainer
        label={ `Order #${orderId}` }
        content={
          <p style={{ color: 'white' }}>test</p>
        } />
      <ButtonWithMargin
        label='Confirm order'
        primary
      />
    </Wrapper>
  );
};

export default OrderPageRender;
