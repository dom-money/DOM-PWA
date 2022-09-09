import React, { useState } from 'react';
import styled from 'styled-components';

import CollapsibleContainer from './CollapsibleContainer';
import AmountDisplay from './AmountDisplay';
import Button from './Button';
import IconButton from './IconButton';
import ScanQRIcon from '../styles/icons/ScanQRIcon';

interface WalletProps {
  /**
   * Should component display loading skeleton?
   */
  isLoading?: false;
  /**
   * Currency amount
   */
  amount: string;
  /**
   * Scan QR On Click Handler
   */
  scanQROnClick?: () => void;
};

interface LoadingProps {
  /**
   * Should component display loading skeleton?
   */
  isLoading: true;
  amount?: never;
  scanQROnClick?: never;
};

type Props = LoadingProps | WalletProps;

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.375rem;
`;

const Wallet = ({ amount, scanQROnClick, isLoading }: Props) => {
  const [ isContainerCollapsed, setIsContainerCollapsed ] = useState(false);

  const handleCollapseClick = () => {
    setIsContainerCollapsed(!isContainerCollapsed);
  };

  if (isLoading) {
    return (
      <CollapsibleContainer
        label='Wallet'
        isCollapsed={isContainerCollapsed}
        handleCollapseClick={handleCollapseClick}
        primaryContent={
          <ContentContainer>
            <AmountDisplay isLoading size='small'/>
          </ContentContainer>
        }
        secondaryContent={
          <ButtonContainer>
            <Button label='Top Up' primary asAnchor href='/wallet-address' />
            <Button label='Send' asAnchor href='/send-to-wallet'/>
          </ButtonContainer>
        }
        shouldSecondaryContentBeOutside={true}
      />
    );
  };

  const inactive = amount === '0';

  return (
    <CollapsibleContainer
      label='Wallet'
      isCollapsed={isContainerCollapsed}
      handleCollapseClick={handleCollapseClick}
      primaryContent={
        <ContentContainer>
          <AmountDisplay amount={amount} size='small' inactive={inactive}/>
          <IconButton
            size='large'
            backgroundColor='#020202'
            ariaLabel='Scan QR'
            onClick={scanQROnClick}
            disabled={inactive}
          >
            <ScanQRIcon color='#FFFFFF'/>
          </IconButton>
        </ContentContainer>
      }
      secondaryContent={
        <ButtonContainer>
          <Button label='Top Up' primary asAnchor href='/wallet-address' />
          <Button label='Send' asAnchor href='/send-to-wallet'/>
        </ButtonContainer>
      }
      shouldSecondaryContentBeOutside={true}
    />
  );
};

export default Wallet;
