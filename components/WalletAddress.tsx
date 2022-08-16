import React from 'react';
import styled from 'styled-components';
import QRCode from 'react-qr-code';

import GenericContainer from './GenericContainer';

interface WalletAddressProps {
  /**
   * Wallet Address
   */
  address: string;
}

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const QRWrapper = styled.div`
  padding: 0.5rem;
  background-color: #FFFFFF;
`;

const Text = styled.p`
  font-weight: 400;
  font-size: 0.875rem;
  color: #FFFFFF;
  margin: 1.25rem 0 0;
  max-width: 100%;
  overflow-wrap: break-word;
`;

const WalletAddress = ({ address }: WalletAddressProps) => {
  return (
    <GenericContainer
      label='Your Address To Receive Funds'
      content={
        <ContentContainer>
          <QRWrapper>
            <QRCode value={address} size={220} fgColor={'#1A1A1A'} />
          </QRWrapper>
          <Text>{address}</Text>
        </ContentContainer>
      }
    />
  );
};

export default WalletAddress;
