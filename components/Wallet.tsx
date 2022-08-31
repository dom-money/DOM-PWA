import React, { useState } from 'react';
import styled from 'styled-components';

import CollapsibleContainer from './CollapsibleContainer';
import AmountDisplay from './AmountDisplay';
import Button from './Button';
import IconButton from './IconButton';
import ScanQRIcon from '../styles/icons/ScanQRIcon';

interface WalletProps {
  /**
   * Currency amount
   */
  amount: number;
  /**
   * Scan QR On Click Handler
   */
  scanQROnClick?: () => void;
};

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.375rem;
`;

const Wallet = ({
  amount,
  scanQROnClick,
}: WalletProps) => {
  const [ isContainerCollapsed, setIsContainerCollapsed ] = useState(false);

  const handleCollapseClick = () => {
    setIsContainerCollapsed(!isContainerCollapsed);
  };

  const inactive = amount === 0;

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
