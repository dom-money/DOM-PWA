import React from 'react';
import styled from 'styled-components';
import QRCode from 'react-qr-code';

import GenericContainer from './GenericContainer';
import { Skeleton } from '@mui/material';

interface WalletAddressProps {
  /**
   * Should component display loading skeleton?
   */
  isLoading?: false;
  /**
   * Wallet Address
   */
  address: string;
};

interface LoadingProps {
  /**
   * Should component display loading skeleton?
   */
  isLoading: true;
  address?: never;
};

type Props = LoadingProps | WalletAddressProps;

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

const WalletAddress = ({ address, isLoading }: Props) => {
  return (
    <GenericContainer
      label='Your Address To Receive Funds'
      content={
        <ContentContainer>
          {
            isLoading ?
            <Skeleton
              variant='rectangular'
              width='14.75rem'
              height='15rem'
              sx={{ bgcolor: 'grey.800' }}
            /> :
            <QRWrapper>
              <QRCode value={address} size={220} fgColor={'#1A1A1A'} />
            </QRWrapper>
          }
          <Text>
            {
              isLoading ?
              <Skeleton
                variant='text'
                width='42ch'
                sx={{ bgcolor: 'grey.800', maxWidth: '100%' }}
              /> :
              address
            }
          </Text>
        </ContentContainer>
      }
    />
  );
};

export default WalletAddress;
