import React from 'react';
import styled from 'styled-components';

import HeaderGoBack from './HeaderGoBack';
import TotalBalance from './TotalBalance';
import WalletAddress from './WalletAddress';
import Button from './Button';

interface WalletAddressPageRenderProps {
  /**
   * Total Balance Amount
   */
  totalAmount: number;
  /**
   * Wallet Address
   */
  address: string;
  /**
   * 'Copy Address' Button Click handler
   */
  copyAddressButtonOnClick?: () => void;
  /**
   * 'Share' Button Click handler
   */
  shareButtonOnClick?: () => void;
}

const Wrapper = styled.div`
  padding: 1.938rem 0.313rem;
`;

const HeaderWithMargin = styled(HeaderGoBack)`
  margin: 0 2.25rem 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.375rem;
`;

const WalletAddressPageRender = ({
  totalAmount,
  address,
  copyAddressButtonOnClick,
  shareButtonOnClick,
}: WalletAddressPageRenderProps) => {
  return (
    <Wrapper>
      <HeaderWithMargin
        href={'/'}
      />
      <TotalBalance
        amount={totalAmount}
      />
      <WalletAddress address={address}/>
      <ButtonContainer>
        <Button
          label='Copy Address'
          primary
          onClick={copyAddressButtonOnClick}
        />
        <Button
          label='Share'
          onClick={shareButtonOnClick}
        />
      </ButtonContainer>
    </Wrapper>
  );
};

export default WalletAddressPageRender;
